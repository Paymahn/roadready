import { getStoredAttribution, readMetaCookies } from "@/lib/attribution";
import { trackMetaLead, type MetaLeadParams } from "@/lib/meta-pixel";
import { getStoredConsent } from "@/lib/consent";
import { courseLeadValue, LEAD_VALUE_CURRENCY } from "@/lib/data";

export type EnquiryFormType = MetaLeadParams["content_category"];

export type PostEnquiryOptions = {
  body: Record<string, unknown>;
  formType: EnquiryFormType;
  courseSlug?: string;
  turnstileToken?: string;
};

export type PostEnquiryResult =
  | { ok: true; leadStored: boolean }
  | { ok: false; error: string };

export async function postEnquiry({ body, formType, courseSlug, turnstileToken }: PostEnquiryOptions): Promise<PostEnquiryResult> {
  const eventId =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  // URL-derived attribution from landing + Meta's cookies read live at submit (they only
  // exist once the consented pixel has run, and can appear later than the landing capture).
  const attribution = { ...getStoredAttribution(), ...readMetaCookies() };
  // Read consent at submit time (not page load) so a late accept is captured.
  const consent = getStoredConsent() === "accepted";

  const res = await fetch("/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...body,
      eventId,
      formType,
      attribution,
      consent,
      turnstileToken,
    }),
  });

  let data: { success?: boolean; leadStored?: boolean; error?: string } = {};
  try {
    data = (await res.json()) as typeof data;
  } catch {
    /* ignore */
  }

  if (!res.ok) {
    return { ok: false, error: data.error || "Something went wrong. Please try again." };
  }

  const leadStored = data.leadStored === true;

  // Only fire the client-side Lead event when consent was given (the pixel isn't even
  // loaded otherwise). The CRM forward is unconditional and handled server-side.
  if (leadStored && consent) {
    const value = courseLeadValue(courseSlug);
    trackMetaLead({
      content_category: formType,
      content_name: courseSlug || undefined,
      event_id: eventId,
      value,
      currency: value !== undefined ? LEAD_VALUE_CURRENCY : undefined,
    });
  }

  return { ok: true, leadStored };
}
