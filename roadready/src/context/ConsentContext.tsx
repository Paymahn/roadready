"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { getStoredConsent, storeConsent, type ConsentValue } from "@/lib/consent";

interface ConsentContextType {
  /** "accepted" | "rejected" | null (null = no decision yet). */
  consent: ConsentValue | null;
  /** True only when the visitor has explicitly accepted — gates the Meta Pixel/CAPI. */
  hasConsent: boolean;
  /** Whether the consent banner should be shown. */
  isBannerOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  /** Re-open the banner (e.g. from the footer "Cookie preferences" link). */
  openBanner: () => void;
}

const ConsentContext = createContext<ConsentContextType | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentValue | null>(null);
  const [isBannerOpen, setIsBannerOpen] = useState(false);

  // Read the stored choice after mount (cookie is client-only). Until then the banner
  // stays hidden and hasConsent is false, so nothing fires before we know. Syncing a
  // client-only value into state after mount is the hydration-safe SSR pattern (avoids
  // a banner flash for returning users); the set-state-in-effect rule doesn't model it.
  useEffect(() => {
    const stored = getStoredConsent();
    /* eslint-disable react-hooks/set-state-in-effect */
    setConsent(stored);
    setIsBannerOpen(stored === null);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const acceptAll = useCallback(() => {
    storeConsent("accepted");
    setConsent("accepted");
    setIsBannerOpen(false);
  }, []);

  const rejectAll = useCallback(() => {
    storeConsent("rejected");
    setConsent("rejected");
    setIsBannerOpen(false);
  }, []);

  const openBanner = useCallback(() => setIsBannerOpen(true), []);

  return (
    <ConsentContext.Provider
      value={{ consent, hasConsent: consent === "accepted", isBannerOpen, acceptAll, rejectAll, openBanner }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}
