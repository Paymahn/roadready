import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CONTACT } from "@/lib/contact";
import { courses } from "@/lib/data";
import LandingEnquiryForm from "@/components/landing/LandingEnquiryForm";
import CookiePreferencesButton from "@/components/CookiePreferencesButton";

// Meta ads landing page — the main site compacted into one converting page covering ALL
// courses (Cat C, C+E, ADR, CPC, combo). Lives OUTSIDE the (site) route group: no nav,
// no sticky CTA, minimal footer. Consent banner, Meta Pixel (PageView), attribution capture
// and the Lead event all come from the root layout, identical to every other route.
//
// Copy rules (special ad category + the compliance standing bar): framed around TRAINING
// and LICENSING only — no career/job/earnings language in headlines or section headers,
// no uncited numbers, no displayed prices (quote-led; data.ts `price` is the internal
// lead-value proxy, NOT a customer price). Section backgrounds use the main site's own
// imagery, faded into the section colour — swap the files to restyle (AI brand imagery
// can drop into the same slots later).

export const metadata: Metadata = {
    title: "HGV Training — Cat C, C+E, ADR & CPC",
    description:
        "HGV training arranged end to end: medical, theory test, practical training and DVSA test, across the UK. Free quote, no obligation.",
    // Paid-traffic page: keep it out of organic search; the main site carries SEO.
    robots: { index: false, follow: false },
    openGraph: {
        title: "HGV Training — Cat C, C+E, ADR & CPC | RoadReady",
        description: "HGV training arranged end to end, across the UK. Free quote, no obligation.",
        url: "https://roadreadyhgv.com/hgv-training",
    },
};

const TRUST_BULLETS = [
    "Experienced team across HGV & ADR training",
    "Nationwide partner network — training near you",
    "Medical, theory and DVSA test bookings arranged for you",
    "Real people on every call — no pressure, no hard sell",
];

const STEPS = [
    {
        title: "Free quote",
        body: "Tell us which licence you're after — or let us help you choose. We aim to call you back the same day.",
    },
    {
        title: "Medical",
        body: "A short D4 medical with a doctor — we arrange the referral and tell you what to bring.",
    },
    {
        title: "Theory test",
        body: "Multiple-choice and hazard perception. Preparation materials are included.",
    },
    {
        title: "Practical training",
        body: "A focused block with an approved instructor through our partner network — length depends on your course.",
    },
    {
        title: "DVSA test & licence",
        body: "Booked for you. Pass, and the new category goes on your licence.",
    },
];

const FAQS = [
    {
        q: "Which licence do I need?",
        a: "Cat C covers rigid trucks and is the usual starting point. Cat C+E adds articulated vehicles — and direct access means you can train for C+E without doing Cat C first. The combo takes you from car licence to full artic in one booking, ADR adds dangerous goods, and CPC keeps existing drivers legal. Not sure? That's exactly what the first call is for.",
    },
    {
        q: "How much does it cost?",
        a: "It depends on the course, your location and what your package includes, so we quote individually rather than publish a one-size-fits-all number. The quote is free, specific to you, and there's no obligation either way.",
    },
    {
        q: "Can I spread the cost?",
        a: "Often, yes — staged payment structures are available depending on your situation, discussed case by case. Tell us what works for your budget on the call and we'll be upfront about what's realistic.",
    },
    {
        q: "What's included in a package?",
        a: "It varies by course — as a guide, Cat C and C+E packages typically include theory test preparation, five days' practical training, the medical referral and the DVSA test fee. Your quote lists exactly what's covered so there are no surprises.",
    },
    {
        q: "Do I need a Cat C licence before C+E?",
        a: "No. Since the rules changed, you can train and test for Cat C+E directly. You'll need a full car licence, a provisional entitlement (we'll walk you through applying), a passed medical and the theory tests — all of which we arrange and sequence for you.",
    },
];

export default function HgvTrainingLandingPage() {
    return (
        <div className="bg-slate-50">
            {/* Top bar — logo (deliberately unlinked) + phone. Not a <nav>: there is no
                navigation on this page by design; the phone link is a conversion path. */}
            <header className="bg-slate-950">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <Image
                        src="/images/roadready-logo.png"
                        alt="RoadReady HGV"
                        width={240}
                        height={72}
                        className="h-16 sm:h-20 w-auto invert hue-rotate-180"
                        priority
                    />
                    <a
                        href={`tel:${CONTACT.phone.raw}`}
                        className="flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition-colors"
                    >
                        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{CONTACT.phone.display}</span>
                    </a>
                </div>
            </header>

            <main>
                {/* Hero + form above the fold */}
                <section className="relative overflow-hidden bg-slate-950 text-white">
                    <Image
                        src="/images/hgvdepot.jpg"
                        alt=""
                        aria-hidden
                        fill
                        priority
                        className="object-cover object-center opacity-[0.15] mix-blend-overlay"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950" aria-hidden />
                    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-16 lg:pb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
                        <div>
                            <p className="text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-3">
                                RoadReady · HGV & ADR Training
                            </p>
                            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
                                Get your HGV licence — Cat C, C+E and beyond
                            </h1>
                            <p className="text-white/80 text-lg leading-relaxed mb-6 max-w-xl">
                                RoadReady arranges your medical, theory test, practical training and DVSA
                                test — one point of contact from first call to full licence.
                            </p>
                            <ul className="space-y-3">
                                {TRUST_BULLETS.map((b) => (
                                    <li key={b} className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-white/90">{b}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div id="enquire" className="scroll-mt-6">
                            <LandingEnquiryForm />
                        </div>
                    </div>
                </section>

                {/* Compact course strip — straight from the catalogue (data.ts), no prices */}
                <section className="py-14 lg:py-20">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight text-center mb-3">
                            Training we arrange
                        </h2>
                        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10">
                            Every course is quoted individually and arranged end to end — tell us where
                            you&apos;re starting from and we&apos;ll map the route.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {courses.map((c) => (
                                <div key={c.slug} className="flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                                    <span className="self-start inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-0.5 text-xs font-semibold mb-3">
                                        {c.category}
                                    </span>
                                    <h3 className="font-bold text-lg text-slate-900 mb-1">{c.title}</h3>
                                    <p className="text-xs font-medium text-slate-500 mb-3">{c.duration}</p>
                                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{c.description}</p>
                                    <a
                                        href="#enquire"
                                        className="mt-auto text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                                    >
                                        Enquire about this course →
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Condensed journey */}
                <section className="relative overflow-hidden py-14 lg:py-20 bg-white border-y border-slate-200">
                    <Image
                        src="/images/hgvcatc.jpg"
                        alt=""
                        aria-hidden
                        fill
                        className="object-cover object-center opacity-[0.06]"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-white" aria-hidden />
                    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight text-center mb-10">
                            Your route to a licence with RoadReady
                        </h2>
                        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                            {STEPS.map((s, i) => (
                                <li key={s.title} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white text-sm font-bold mb-3">
                                        {i + 1}
                                    </span>
                                    <h3 className="font-bold text-slate-900 mb-1">{s.title}</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">{s.body}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* Demand + brand — short, qualitative, licence-framed */}
                <section className="relative overflow-hidden py-14 lg:py-16">
                    <Image
                        src="/images/hgvcatcce.jpg"
                        alt=""
                        aria-hidden
                        fill
                        className="object-cover object-center opacity-[0.07]"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-50/70 to-slate-50" aria-hidden />
                    <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="font-heading text-3xl font-bold text-slate-900 tracking-tight mb-4">
                            Why train now?
                        </h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            The UK has had a shortage of qualified HGV drivers for years, and more goods
                            need to move every year. Lorries carry most of what the country eats, builds
                            and buys — and the right licence is the qualification that opens it up.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            RoadReady is a UK training brokerage: we organise the whole route through our
                            nationwide partner network and stay your single point of contact —
                            straightforward advice, no hard sell.
                        </p>
                    </div>
                </section>

                {/* FAQs */}
                <section className="relative overflow-hidden py-14 lg:py-20 bg-white border-y border-slate-200">
                    <Image
                        src="/images/faq-header.jpg"
                        alt=""
                        aria-hidden
                        fill
                        className="object-cover object-center opacity-[0.06]"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-white/75 to-white" aria-hidden />
                    <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="font-heading text-3xl font-bold text-slate-900 tracking-tight text-center mb-8">
                            Common questions
                        </h2>
                        <div className="space-y-3">
                            {FAQS.map((f) => (
                                <details key={f.q} className="group bg-white rounded-xl border border-slate-200 shadow-sm">
                                    <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 font-semibold text-slate-900">
                                        {f.q}
                                        <svg className="w-4 h-4 text-slate-400 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                                        </svg>
                                    </summary>
                                    <p className="px-5 pb-5 text-slate-600 leading-relaxed">{f.a}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Repeat CTA — anchors back to the form (no modal on this page) */}
                <section className="relative overflow-hidden py-14 lg:py-20 bg-slate-950">
                    <Image
                        src="/images/hgvcatce.jpg"
                        alt=""
                        aria-hidden
                        fill
                        className="object-cover object-center opacity-[0.15] mix-blend-overlay"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/50 to-slate-950" aria-hidden />
                    <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
                            Ready to get your HGV licence?
                        </h2>
                        <p className="text-white/80 mb-7">
                            Two fields, one callback, zero obligation — RoadReady talks you through the
                            route and the quote.
                        </p>
                        <a
                            href="#enquire"
                            className="inline-block px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all duration-200 hover:shadow-lg active:scale-95"
                        >
                            Get My Free Quote
                        </a>
                    </div>
                </section>
            </main>

            {/* Minimal footer — brand, phone, privacy, main-site link. No nav menu by design. */}
            <footer className="bg-slate-950 border-t border-slate-800">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex justify-center">
                    <Image
                        src="/images/roadready-logo.png"
                        alt="RoadReady HGV"
                        width={240}
                        height={72}
                        className="h-14 w-auto invert hue-rotate-180 opacity-80"
                    />
                </div>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/60">
                    <a href={`tel:${CONTACT.phone.raw}`} className="hover:text-white transition-colors font-medium">
                        {CONTACT.phone.display}
                    </a>
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                        <Link href="/privacy" className="hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        {/* PECR: consent must be revocable as easily as it was given — the
                            banner shows on this route, so the re-open control must too. */}
                        <CookiePreferencesButton />
                        <Link href="/" className="hover:text-white transition-colors">
                            Visit roadreadyhgv.com
                        </Link>
                    </div>
                    <p className="text-center">
                        © {new Date().getFullYear()} RoadReady
                        <span className="block mt-1">VAT registered. VAT number GB 519306788.</span>
                    </p>
                </div>
            </footer>
        </div>
    );
}
