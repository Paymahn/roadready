import { getStoredAttribution } from "@/lib/attribution";
import { trackMetaLead, type MetaLeadParams } from "@/lib/meta-pixel";

export type EnquiryFormType = MetaLeadParams["content_category"];

export type PostEnquiryOptions = {
  body: Record<string, unknown>;
  formType: EnquiryFormType;
  courseSlug?: string;
};

export type PostEnquiryResult =
  | { ok: true; leadStored: boolean }
  | { ok: false; error: string };

export async function postEnquiry({ body, formType, courseSlug }: PostEnquiryOptions): Promise<PostEnquiryResult> {
  const eventId =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const attribution = getStoredAttribution();

  const res = await fetch("/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...body,
      eventId,
      formType,
      attribution,
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

  if (leadStored) {
    trackMetaLead({
      content_category: formType,
      content_name: courseSlug || undefined,
      event_id: eventId,
    });
  }

  return { ok: true, leadStored };
}
