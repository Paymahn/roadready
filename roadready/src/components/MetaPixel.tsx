"use client";

import { useEffect } from "react";
import { useConsent } from "@/context/ConsentContext";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

const pixelSnippet = (id: string) => `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${id}');
fbq('track','PageView');`;

function teardownPixel() {
  document.getElementById("meta-pixel")?.remove();
  document.querySelectorAll('script[src*="fbevents.js"]').forEach((s) => s.remove());
  const w = window as unknown as { fbq?: unknown; _fbq?: unknown };
  delete w.fbq;
  delete w._fbq;
}

export default function MetaPixel() {
  const { hasConsent } = useConsent();

  // Load the pixel ONLY once the visitor has accepted, and tear it fully down if
  // consent is later withdrawn (accept → reject) so no further events can fire — not
  // just on the next reload. Re-accepting re-injects a fresh loader. Nothing is ever
  // rendered, and there is no <noscript> (it would fire with JS off / before consent,
  // which is non-compliant; the server-side CAPI covers attribution).
  useEffect(() => {
    if (!PIXEL_ID) return;

    if (hasConsent) {
      if (document.getElementById("meta-pixel")) return; // already loaded
      const script = document.createElement("script");
      script.id = "meta-pixel";
      script.textContent = pixelSnippet(PIXEL_ID);
      document.head.appendChild(script);
    } else if (document.getElementById("meta-pixel")) {
      teardownPixel(); // only when it was actually loaded
    }
  }, [hasConsent]);

  return null;
}
