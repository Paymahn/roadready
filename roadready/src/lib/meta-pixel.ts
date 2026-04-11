declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export type MetaLeadParams = {
  content_name?: string;
  content_category: "inline" | "modal" | "contact";
  event_id: string;
};

export function trackMetaLead(params: MetaLeadParams): void {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq(
    "track",
    "Lead",
    {
      content_name: params.content_name || undefined,
      content_category: params.content_category,
    },
    { eventID: params.event_id },
  );
}
