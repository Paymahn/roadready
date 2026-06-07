"use client";

import { useConsent } from "@/context/ConsentContext";

// Footer control that reopens the consent banner so a visitor can change their choice.
export default function CookiePreferencesButton() {
  const { openBanner } = useConsent();
  return (
    <button
      type="button"
      onClick={openBanner}
      className="text-left text-sm text-white/60 transition-colors hover:text-emerald-400"
    >
      Cookie preferences
    </button>
  );
}
