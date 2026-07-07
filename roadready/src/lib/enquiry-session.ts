// Session-wide "already submitted" flag — kills the same-visit double-submit pattern where a
// visitor fills the modal AND the inline form minutes apart (each was a separate lead row and a
// separate Meta Lead event). Set once any form submits successfully; every form variant checks
// it on mount and renders its thanks state instead of a fresh form.
//
// sessionStorage on purpose: the flag should die with the tab ("rest of the visit"), same
// storage scope as the attribution capture. Not consent-gated data — it holds only a timestamp,
// no user details. All access is try/catch-guarded: storage can throw (private browsing,
// disabled storage) and a form must never break over a convenience flag.

const KEY = "rr_enquiry_submitted_at";

export function markEnquirySubmitted(): void {
  try {
    sessionStorage.setItem(KEY, new Date().toISOString());
  } catch {
    /* storage unavailable — the per-form local state still shows the thanks screen */
  }
}

export function hasSubmittedEnquiry(): boolean {
  try {
    return sessionStorage.getItem(KEY) != null;
  } catch {
    return false;
  }
}

// The correction path: "made a mistake in your details? submit again" clears the flag so the
// form re-renders. The default thanks state stops ACCIDENTAL doubles; this keeps a DELIBERATE
// correction (wrong phone number typed — it happens) one click away. The corrected submission
// re-marks the session, and the CRM's repeat detection ties it back to the original lead.
export function clearEnquirySubmitted(): void {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* storage unavailable — nothing to clear */
  }
}
