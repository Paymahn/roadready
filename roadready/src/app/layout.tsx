import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { EnquiryProvider } from "@/context/EnquiryContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import StickyMobileCTA from "@/components/StickyMobileCTA";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://roadready.co.uk"),
  title: {
    default: "RoadReady — HGV & ADR Training | Your Licence Pays For Itself",
    template: "%s | RoadReady",
  },
  description:
    "Ethical, transparent HGV and ADR training. No hidden fees, job placement support. From £35/week. Enquire today.",
  keywords: [
    "HGV training",
    "ADR training",
    "HGV licence",
    "CPC training",
    "driver training UK",
    "HGV Class C",
    "HGV Class CE",
    "lorry driver training",
    "Cat C licence",
    "Cat CE licence",
  ],
  openGraph: {
    title: "RoadReady — HGV & ADR Training",
    description:
      "Your licence pays for itself. No hidden fees, job placement included.",
    type: "website",
    siteName: "RoadReady",
    locale: "en_GB",
    url: "https://roadready.co.uk",
  },
  twitter: {
    card: "summary_large_image",
    title: "RoadReady — HGV & ADR Training",
    description: "No hidden fees, job placement included. Enquire today.",
  },
  robots: {
    index: true,
    follow: true,
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
        <EnquiryProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <EnquiryModal />
          <StickyMobileCTA />
        </EnquiryProvider>
      </body>
    </html>
  );
}
