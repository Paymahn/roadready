import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { EnquiryProvider } from "@/context/EnquiryContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "RoadReady — HGV & Forklift Training | Your Licence Pays For Itself",
  description:
    "Ethical, transparent HGV and forklift training. 94% first-time pass rate, no hidden fees, job placement support. From £35/week. Enquire today.",
  keywords: "HGV training, forklift training, HGV licence, CPC training, driver training UK",
  openGraph: {
    title: "RoadReady — HGV & Forklift Training",
    description:
      "Your licence pays for itself. 94% pass rate, no hidden fees, job placement included.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <EnquiryProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <EnquiryModal />
        </EnquiryProvider>
      </body>
    </html>
  );
}
