// First-party consent cookie (UK PECR / GDPR). Binary choice: the visitor has
// either accepted all cookies (Meta Pixel allowed) or rejected non-essential ones.
// The cookie is written ONLY on an explicit choice — never as a default on load.

export type ConsentValue = "accepted" | "rejected";

const COOKIE_NAME = "rr_consent";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // ~6 months

/** The stored choice, or null if the visitor hasn't decided yet. */
export function getStoredConsent(): ConsentValue | null {
  if (typeof document === "undefined") return null;
  const entry = document.cookie.split("; ").find((row) => row.startsWith(`${COOKIE_NAME}=`));
  if (!entry) return null;
  const value = entry.slice(COOKIE_NAME.length + 1);
  return value === "accepted" || value === "rejected" ? value : null;
}

/**
 * Persist an explicit choice. `Secure` is added on HTTPS only, so the cookie still
 * works in local dev (http://localhost); production is always HTTPS, hence Secure.
 */
export function storeConsent(value: ConsentValue): void {
  if (typeof document === "undefined") return;
  const secure = typeof location !== "undefined" && location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${value}; Max-Age=${MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`;
}
