declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export type MetaLeadParams = {
  content_name?: string;
  content_category: "inline" | "modal" | "contact";
  event_id: string;
  /** Internal Lead-value proxy (course price). Omitted for general enquiries. */
  value?: number;
  currency?: string;
};

export function trackMetaLead(params: MetaLeadParams): void {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  const customData: Record<string, unknown> = {
    content_name: params.content_name || undefined,
    content_category: params.content_category,
  };
  // Attach value/currency only when we have a course-derived value (general enquiries omit).
  if (params.value !== undefined) {
    customData.value = params.value;
    customData.currency = params.currency;
  }
  window.fbq("track", "Lead", customData, { eventID: params.event_id });
}
