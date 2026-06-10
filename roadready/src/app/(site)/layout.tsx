import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import StickyMobileCTA from "@/components/StickyMobileCTA";

// Site chrome for the standard pages. The Meta ads landing page lives OUTSIDE this group
// (app/cat-ce-direct-access) so it renders with no nav, no sticky CTA and its own minimal
// footer — while still inheriting the root layout's consent + tracking stack.
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <EnquiryModal />
      <StickyMobileCTA />
    </>
  );
}
