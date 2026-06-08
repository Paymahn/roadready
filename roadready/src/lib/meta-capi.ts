import { createHash } from "node:crypto";

type SendLeadEventArgs = {
  eventId: string;
  eventSourceUrl: string;
  email?: string;
  phone: string;
  clientIp: string;
  userAgent: string;
  /** Internal Lead-value proxy + currency. Omitted for general enquiries. */
  value?: number;
  currency?: string;
};

function hashSha256(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function normalizePhoneDigits(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("0") && digits.length >= 10) {
    return `44${digits.slice(1)}`;
  }
  return digits;
}

// Bound the CAPI POST so a slow Graph API can't hang the caller. CAPI runs in `after()`
// (post-response) so it never blocks the user, but the timeout still frees the function.
const CAPI_TIMEOUT_MS = 3000;

async function postToCapi(url: string, body: string): Promise<void> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CAPI_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      signal: controller.signal,
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("Meta CAPI request failed", res.status, text);
    }
  } catch (err) {
    console.error("Meta CAPI request aborted/errored", err);
  } finally {
    clearTimeout(timer);
  }
}

export async function sendMetaLeadCapi(args: SendLeadEventArgs): Promise<void> {
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  const pixelId = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!token || !pixelId) return;

  const userData: Record<string, string | string[]> = {};
  if (args.clientIp && args.clientIp !== "unknown") {
    userData.client_ip_address = args.clientIp;
  }
  if (args.userAgent) {
    userData.client_user_agent = args.userAgent;
  }

  if (args.email) {
    userData.em = [hashSha256(args.email.trim().toLowerCase())];
  }
  const phoneDigits = normalizePhoneDigits(args.phone);
  if (phoneDigits) {
    userData.ph = [hashSha256(phoneDigits)];
  }

  const eventTime = Math.floor(Date.now() / 1000);
  const event: Record<string, unknown> = {
    event_name: "Lead",
    event_time: eventTime,
    event_id: args.eventId,
    event_source_url: args.eventSourceUrl,
    action_source: "website",
    user_data: userData,
  };
  // value + currency belong in custom_data (Meta's spec), not at the event top level.
  if (args.value !== undefined) {
    event.custom_data = { value: args.value, currency: args.currency };
  }
  const payload = { data: [event] };

  const url = new URL(`https://graph.facebook.com/v21.0/${pixelId}/events`);
  url.searchParams.set("access_token", token);

  await postToCapi(url.toString(), JSON.stringify(payload));
}

// ── Phase 3 scaffolding: offline-conversion (Purchase) sync ──────────────────
// NOT WIRED. Phase 3 (CRM offline-conversion sync) will call sendMetaPurchaseCapi when a
// deposit/balance payment lands. Deterministic event IDs let the same payment dedupe
// against any browser event and stay idempotent across retries.

export function purchaseEventId(kind: "deposit" | "balance", driverId: string): string {
  return `purchase-${kind}-${driverId}`;
}

type SendPurchaseEventArgs = {
  eventId: string;
  eventSourceUrl: string;
  value: number;
  currency: string;
  email?: string;
  phone?: string;
  clientIp?: string;
  userAgent?: string;
};

export async function sendMetaPurchaseCapi(args: SendPurchaseEventArgs): Promise<void> {
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  const pixelId = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!token || !pixelId) return;

  const userData: Record<string, string | string[]> = {};
  if (args.clientIp && args.clientIp !== "unknown") userData.client_ip_address = args.clientIp;
  if (args.userAgent) userData.client_user_agent = args.userAgent;
  if (args.email) userData.em = [hashSha256(args.email.trim().toLowerCase())];
  const phoneDigits = args.phone ? normalizePhoneDigits(args.phone) : "";
  if (phoneDigits) userData.ph = [hashSha256(phoneDigits)];

  const payload = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: args.eventId,
        event_source_url: args.eventSourceUrl,
        // Phase 3: set action_source appropriately for an offline payment (e.g. "system_generated").
        action_source: "website",
        user_data: userData,
        custom_data: { value: args.value, currency: args.currency },
      },
    ],
  };

  const url = new URL(`https://graph.facebook.com/v21.0/${pixelId}/events`);
  url.searchParams.set("access_token", token);
  await postToCapi(url.toString(), JSON.stringify(payload));
}
