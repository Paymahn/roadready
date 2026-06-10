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

// Meta's first-party cookies: _fbp (set by the pixel once consent loads it) and _fbc (set
// when a click id is present). Read LIVE at submit time, not at landing — both can appear
// after the page loads (consent accepted mid-session, _fbc written on a later navigation).
// These are the strongest browser-side CAPI match keys after email/phone.
export type MetaCookieAttribution = { fbp?: string; fbc?: string };

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  try {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : undefined;
  } catch {
    return undefined;
  }
}

export function readMetaCookies(): MetaCookieAttribution {
  const out: MetaCookieAttribution = {};
  const fbp = readCookie("_fbp");
  const fbc = readCookie("_fbc");
  if (fbp) out.fbp = fbp;
  if (fbc) out.fbc = fbc;
  return out;
}
