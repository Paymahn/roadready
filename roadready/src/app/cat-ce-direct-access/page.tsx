import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CONTACT } from "@/lib/contact";
import { courses } from "@/lib/data";
import LandingEnquiryForm from "@/components/landing/LandingEnquiryForm";
import CookiePreferencesButton from "@/components/CookiePreferencesButton";

// Meta ads landing page — Cat C+E direct access. Lives OUTSIDE the (site) route group:
// no nav, no sticky CTA, minimal footer. Consent banner, Meta Pixel (PageView), attribution
// capture and the Lead event all come from the root layout, identical to every other route.
//
// Copy rules (special ad category + the compliance standing bar): framed around TRAINING
// and LICENSING only — no career/job/earnings language in headlines or section headers,
// no uncited numbers, no displayed prices (quote-led; data.ts `price` is the internal
// lead-value proxy, NOT a customer price).

const COURSE_SLUG = "hgv-cat-ce";
const course = courses.find((c) => c.slug === COURSE_SLUG)!;
const COURSE_TITLE = course.title; // "HGV Category C+E"

export const metadata: Metadata = {
    title: "HGV Cat C+E Training — Direct Access",
    description:
        "Direct-access Cat C+E training arranged end to end: medical, theory test, 5 days' practical training and DVSA test. Free quote, no obligation.",
    // Paid-traffic page: keep it out of organic search; the main site carries SEO.
    robots: { index: false, follow: false },
    openGraph: {
        title: "HGV Cat C+E Training — Direct Access | RoadReady",
        description:
            "Direct-access Cat C+E training arranged end to end. Free quote, no obligation.",
        url: "https://roadreadyhgv.com/cat-ce-direct-access",
    },
};

const TRUST_BULLETS = [
    "Direct access — no Cat C licence needed first",
    "Medical, theory and DVSA test bookings arranged for you",
    `${course.duration} at approved training centres across the UK`,
    "Straightforward advice from a real person — no pressure, no obligation",
];

const STEPS = [
    {
        title: "Medical",
        body: "A short D4 medical with a doctor — we arrange the referral for you.",
    },
    {
        title: "Theory test",
        body: "Multiple-choice and hazard perception. Preparation materials are included.",
    },
    {
        title: "Practical training",
        body: "Five days with an approved instructor: trailer coupling, reversing and road driving with an articulated vehicle.",
    },
    {
        title: "DVSA test",
        body: "Booked for you, with the test fee included in your package.",
    },
    {
        title: "Licence in hand",
        body: "C+E added to your licence — qualified for the largest vehicle combinations on UK roads.",
    },
];

const FAQS = [
    {
        q: "Do I need a Cat C licence first?",
        a: "No. Since the rules changed, you can train and test for Cat C+E directly. You'll need a full car licence, a provisional C+E entitlement (we'll walk you through applying), a passed medical, and the theory tests — all of which we arrange and sequence for you.",
    },
    {
        q: "How much does it cost?",
        a: "It depends on your location, test availability and what your package includes, so we quote individually rather than publish a one-size-fits-all number. The quote is free, specific to you, and there's no obligation either way.",
    },
    {
        q: "Can I spread the cost?",
        a: "Often, yes — staged payment structures are available depending on your situation. Tell us what works for your budget on the call and we'll be upfront about what's realistic.",
    },
    {
        q: "What's included in the training package?",
        a: `Typically: ${course.includes.map((s) => s.toLowerCase()).join(", ")}. Your quote will list exactly what's covered so there are no surprises.`,
    },
];

export default function CatCeDirectAccessPage() {
    return (
        <div className="bg-slate-50">
            {/* Top bar — logo (deliberately unlinked) + phone. Not a <nav>: there is no
                navigation on this page by design; the phone link is a conversion path. */}
            <header className="bg-slate-950">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                    <Image
                        src="/images/roadready-logo.png"
                        alt="RoadReady HGV"
                        width={240}
                        height={72}
                        className="h-12 sm:h-14 w-auto invert hue-rotate-180"
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
                <section className="bg-slate-950 text-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-16 lg:pb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
                        <div>
                            <p className="text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-3">
                                Cat C+E · Direct Access
                            </p>
                            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
                                Get your Cat C+E licence — without doing Cat C first
                            </h1>
                            <p className="text-white/80 text-lg leading-relaxed mb-6 max-w-xl">
                                We arrange your medical, theory test, practical training and DVSA test —
                                one point of contact from first call to full licence.
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
                            <LandingEnquiryForm courseSlug={COURSE_SLUG} courseTitle={COURSE_TITLE} />
                        </div>
                    </div>
                </section>

                {/* Condensed 5-step journey */}
                <section className="py-14 lg:py-20">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight text-center mb-10">
                            Your route to a C+E licence
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

                {/* Why C+E — short, qualitative, licence-framed */}
                <section className="py-14 lg:py-16 bg-white border-y border-slate-200">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="font-heading text-3xl font-bold text-slate-900 tracking-tight mb-4">
                            Why go straight to C+E?
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            Articulated lorries move most of what the UK eats, builds and buys, and the
                            C+E licence covers the largest vehicle combinations on the road. Direct access
                            means one course and one practical test instead of two — less time training,
                            less cost duplicated, and the highest licence category at the end of it.
                        </p>
                    </div>
                </section>

                {/* Finance FAQs */}
                <section className="py-14 lg:py-20">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="font-heading text-3xl font-bold text-slate-900 tracking-tight text-center mb-8">
                            Costs and paying for training
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
                <section className="py-14 lg:py-20 bg-slate-950">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
                            Ready to get your C+E licence?
                        </h2>
                        <p className="text-white/80 mb-7">
                            Two fields, one callback, zero obligation — we&apos;ll talk you through the
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

            {/* Minimal footer — phone, privacy, main-site link. No nav menu by design. */}
            <footer className="bg-slate-950 border-t border-slate-800">
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
                    <p>© {new Date().getFullYear()} RoadReady</p>
                </div>
            </footer>
        </div>
    );
}
