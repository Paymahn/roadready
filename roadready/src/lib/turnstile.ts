import "server-only";

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const VERIFY_TIMEOUT_MS = 5000;

export type TurnstileVerdict = "pass" | "fail" | "unconfigured" | "unavailable";

// Verifies a Turnstile token with Cloudflare. The verdict tells the caller how to react:
//   "unconfigured" → TURNSTILE_SECRET_KEY not set → feature is OFF, skip the gate entirely
//   "fail"         → Cloudflare rejected it (missing / invalid / expired / forged) → block
//   "pass"         → Cloudflare confirmed a real token → allow
//   "unavailable"  → couldn't reach Cloudflare (timeout / infra error) → caller FAILS OPEN,
//                    because a Cloudflare outage must never block a real lead.
export async function verifyTurnstile(token: string, ip?: string): Promise<TurnstileVerdict> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return "unconfigured";
  if (!token) return "fail"; // configured but no token → a direct POST / bot → reject

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  if (ip) body.set("remoteip", ip);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), VERIFY_TIMEOUT_MS);
  try {
    const res = await fetch(SITEVERIFY_URL, { method: "POST", body, signal: controller.signal });
    if (!res.ok) return "unavailable"; // Cloudflare 5xx etc. → fail open
    const data = (await res.json()) as { success?: boolean };
    return data.success === true ? "pass" : "fail";
  } catch {
    return "unavailable"; // abort (timeout) or network error → fail open
  } finally {
    clearTimeout(timer);
  }
}
