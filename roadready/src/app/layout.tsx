import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { EnquiryProvider } from "@/context/EnquiryContext";
import { ConsentProvider } from "@/context/ConsentContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AttributionCapture from "@/components/AttributionCapture";
import EnquiryModal from "@/components/EnquiryModal";
import MetaPixel from "@/components/MetaPixel";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ConsentBanner from "@/components/ConsentBanner";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://roadreadyhgv.com"),
  title: {
    default: "RoadReady — HGV & ADR Training",
    template: "%s | RoadReady",
  },
  description:
    "HGV and ADR training that gets you licensed and into work. Honest advice on courses, finance, and what comes next. UK-wide partner network, no hard sell.",
  keywords: [
    "HGV training",
    "ADR training",
    "HGV licence",
    "CPC training",
    "driver training UK",
    "HGV Cat C",
    "HGV Cat C+E",
    "lorry driver training",
    "Cat C licence",
    "Cat CE licence",
  ],
  openGraph: {
    title: "RoadReady — HGV & ADR Training",
    description:
      "Honest advice on HGV and ADR training — courses, finance, and what comes next. UK-wide partner network, no hard sell.",
    type: "website",
    siteName: "RoadReady",
    locale: "en_GB",
    url: "https://roadreadyhgv.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "RoadReady — HGV & ADR Training",
    description: "HGV and ADR training with honest advice on courses, finance, and what comes next. No hard sell.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    other: {
      "facebook-domain-verification": "6etwx75umokl9e7iwcdi5j07k89yyp",
    },
  },
  other: {
    "theme-color": "#0B2419",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${nunito.variable} font-sans antialiased`}>
        <ConsentProvider>
          <MetaPixel />
          <EnquiryProvider>
            <AttributionCapture />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <EnquiryModal />
            <StickyMobileCTA />
          </EnquiryProvider>
          <ConsentBanner />
        </ConsentProvider>
        {/* Cookieless, GDPR-clean — rendered outside ConsentProvider, not consent-gated. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
