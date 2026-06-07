"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useConsent } from "@/context/ConsentContext";

export default function ConsentBanner() {
  const { isBannerOpen, acceptAll, rejectAll } = useConsent();

  // Return focus to wherever it was when the banner closes (e.g. the footer
  // "Cookie preferences" link that reopened it). Harmless on first auto-appear.
  useEffect(() => {
    if (!isBannerOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    return () => previouslyFocused?.focus?.();
  }, [isBannerOpen]);

  if (!isBannerOpen) return null;

  return (
    // Non-modal: a bottom bar that doesn't block the rest of the page. z-[55] sits
    // above the sticky mobile CTA (z-50) and below the enquiry modal (z-[60]).
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[55] p-3 sm:p-4 animate-slide-up motion-reduce:animate-none"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_-6px_30px_rgba(0,0,0,0.25)] sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <p className="flex-1 text-sm leading-relaxed text-slate-800">
            We use cookies to measure our advertising. You can accept or reject this.{" "}
            <Link
              href="/privacy#cookies"
              className="font-semibold text-slate-900 underline underline-offset-2 hover:text-emerald-700"
            >
              Learn more
            </Link>
            .
          </p>
          {/* Equal prominence (ICO): both buttons are pixel-identical, distinguished only by label. */}
          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={rejectAll}
              className="min-h-[44px] flex-1 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-slate-800 sm:flex-none"
            >
              Reject all
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="min-h-[44px] flex-1 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-slate-800 sm:flex-none"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
