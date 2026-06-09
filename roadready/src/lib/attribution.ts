const STORAGE_KEY = "rr_attr";

export type StoredAttribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  fbclid?: string;
  referrer?: string;
};

export function captureAttributionFromUrl(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const keys = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "fbclid",
    ] as const;
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const parsed: StoredAttribution = raw ? (JSON.parse(raw) as StoredAttribution) : {};
    let changed = false;
    for (const k of keys) {
      const v = params.get(k);
      if (v && !parsed[k]) {
        parsed[k] = v;
        changed = true;
      }
    }
    // Capture the external referrer once, on first landing (ignore navigations within our site).
    if (!parsed.referrer && document.referrer && !document.referrer.startsWith(window.location.origin)) {
      parsed.referrer = document.referrer;
      changed = true;
    }
    if (changed) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }
  } catch {
    /* ignore */
  }
}

export function getStoredAttribution(): StoredAttribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as StoredAttribution;
  } catch {
    return {};
  }
}
