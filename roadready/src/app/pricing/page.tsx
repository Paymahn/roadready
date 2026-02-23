"use client";

import { useState } from "react";
import { useEnquiry } from "@/context/EnquiryContext";
import { courses, faqItems, comparisonRows } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import CourseCategoryIcon from "@/components/CourseCategoryIcon";

export default function PricingPage() {
    const { openEnquiry } = useEnquiry();
    return (
        <div className="pt-24 pb-20 lg:pt-32 lg:pb-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-4 font-heading">Transparent Pricing</h1>
                    <p className="text-lg text-slate-500 max-w-xl mx-auto">
                        No hidden fees, ever. What you see is what you pay. Every price includes theory prep, practical training, and DVSA test fees.
                    </p>
                </div>
                <PricingTable onEnquire={openEnquiry} />
                <SpreadTheCost />
                <ComparisonTable />
                <FAQSection />
                <ReferralBanner onEnquire={openEnquiry} />
            </div>
        </div>
    );
}

function PricingTable({ onEnquire }: { onEnquire: (course?: string) => void }) {
    return (
        <div className="mb-20 overflow-x-auto">
            <div className="min-w-[640px]">
                <div className="bg-white border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-800">
                                <th className="text-left text-sm font-medium text-slate-400 px-6 py-4">Course</th>
                                <th className="text-center text-sm font-medium text-slate-400 px-4 py-4">Duration</th>
                                <th className="text-center text-sm font-medium text-slate-400 px-4 py-4">Full Price</th>
                                <th className="text-center text-sm font-medium text-slate-400 px-4 py-4">Retest</th>
                                <th className="text-center text-sm font-medium text-slate-400 px-4 py-4">From/week</th>
                                <th className="text-center text-sm font-medium text-slate-400 px-4 py-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course) => (
                                <tr key={course.slug} className={`border-b border-slate-800/50 last:border-0 hover:bg-slate-950/50 transition-colors ${course.slug === "hgv-cat-c-ce-combo" ? "bg-blue-600/10 border-l-4 border-l-blue-600" : ""}`}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 flex items-center justify-center shrink-0">
                                                <CourseCategoryIcon category={course.category} className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-dark text-sm">{course.title}</div>
                                                {course.slug === "hgv-cat-c-ce-combo" && (
                                                    <span className="inline-block mt-0.5 px-2 py-0.5 text-[10px] font-bold bg-amber-500/15 text-amber-600 rounded-full border border-amber-500/30">BEST VALUE</span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-center text-sm text-slate-500">{course.duration}</td>
                                    <td className="px-4 py-4 text-center text-sm font-bold text-dark">{formatCurrency(course.price)}</td>
                                    <td className="px-4 py-4 text-center text-sm text-blue-600 font-medium">{course.retestPrice > 0 ? formatCurrency(course.retestPrice) : "N/A"}</td>
                                    <td className="px-4 py-4 text-center text-sm text-slate-400">£{course.weeklyFrom}</td>
                                    <td className="px-4 py-4 text-center">
                                        <button onClick={() => onEnquire(course.slug)} className="px-4 py-1.5 text-xs font-semibold bg-blue-600/10 hover:bg-blue-600 text-blue-600 hover:text-white rounded-full border border-blue-600/20 hover:border-transparent transition-all duration-200">Enquire</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function SpreadTheCost() {
    const [selectedSlug, setSelectedSlug] = useState("hgv-cat-ce");
    const [months, setMonths] = useState(6);
    const course = courses.find((c) => c.slug === selectedSlug);
    const total = course?.price ?? 0;
    const monthly = Math.ceil(total / months);
    const weekly = Math.ceil(total / (months * 4.33));

    return (
        <section className="mb-20">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-dark mb-2 font-heading">Spread The Cost</h2>
                <p className="text-slate-500">See how affordable your training really is.</p>
            </div>
            <div className="max-w-lg mx-auto bg-white border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="mb-6">
                    <label className="block text-sm font-medium text-dark mb-2">Select course</label>
                    <select value={selectedSlug} onChange={(e) => setSelectedSlug(e.target.value)} className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]">
                        {courses.map((c) => (<option key={c.slug} value={c.slug}>{c.title} — {formatCurrency(c.price)}</option>))}
                    </select>
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-dark mb-2">Payment period</label>
                    <div className="flex gap-3">
                        {[3, 6].map((m) => (
                            <button key={m} onClick={() => setMonths(m)} className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 min-h-[44px] ${months === m ? "bg-blue-600 text-white" : "bg-slate-950 text-slate-500 hover:text-dark border border-slate-800"}`}>{m} months</button>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-1">{formatCurrency(weekly)}</div>
                        <div className="text-xs text-slate-500">per week</div>
                    </div>
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-dark mb-1">{formatCurrency(monthly)}</div>
                        <div className="text-xs text-slate-500">per month</div>
                    </div>
                </div>
                <p className="text-center text-sm text-slate-500">That&apos;s less than a daily coffee and lunch.</p>
            </div>
        </section>
    );
}

function ComparisonTable() {
    return (
        <section className="mb-20">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-dark mb-2 font-heading">Us vs The Rest</h2>
                <p className="text-slate-500">See what you&apos;re actually getting for your money.</p>
            </div>
            <div className="max-w-2xl mx-auto overflow-hidden rounded-2xl border border-slate-800 bg-white shadow-sm">
                <table className="w-full">
                    <thead><tr className="bg-slate-950"><th className="text-left text-sm font-medium text-slate-500 px-6 py-4">Feature</th><th className="text-center text-sm font-bold text-blue-600 px-6 py-4 bg-blue-600/5">RoadReady</th><th className="text-center text-sm font-medium text-slate-500 px-6 py-4">Typical School</th></tr></thead>
                    <tbody>
                        {comparisonRows.map((row, i) => (
                            <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-slate-950"}>
                                <td className="px-6 py-3.5 text-sm text-dark">{row.feature}</td>
                                <td className="px-6 py-3.5 text-sm text-center font-medium text-blue-600">
                                    {row.usYes ? <span className="inline-flex items-center justify-center gap-1.5"><svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>{row.us}</span> : row.us}
                                </td>
                                <td className="px-6 py-3.5 text-sm text-center text-slate-500">
                                    {row.themYes ? <span className="inline-flex items-center justify-center gap-1.5"><svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>{row.them}</span> : ["Not offered", "Full upfront only", "Weekdays only"].includes(row.them) ? <span className="inline-flex items-center justify-center gap-1.5"><svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>{row.them}</span> : row.them}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

function FAQSection() {
    const [openIdx, setOpenIdx] = useState<number | null>(null);
    return (
        <section className="mb-20">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#1E3A2B] mb-2">Common Questions</h2>
                <p className="text-slate-400">Everything you need to know before booking.</p>
            </div>
            <div className="max-w-2xl mx-auto space-y-3">
                {faqItems.map((item, i) => (
                    <div key={i} className="bg-white border border-slate-800 rounded-xl overflow-hidden hover:border-blue-600/30 transition-colors shadow-sm">
                        <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left">
                            <span className="text-sm font-medium text-[#1E3A2B] pr-4">{item.question}</span>
                            <svg className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${openIdx === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {openIdx === i && (
                            <div className="px-6 pb-4 animate-fade-in">
                                <p className="text-sm text-slate-500 leading-relaxed">{item.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

function ReferralBanner({ onEnquire }: { onEnquire: () => void }) {
    return (
        <div className="bg-gradient-to-r from-blue-600/10 via-blue-500/5 to-transparent border border-blue-600/20 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-dark mb-2 font-heading">Know Someone Who Needs a Licence?</h3>
            <p className="text-slate-500 mb-6 max-w-lg mx-auto">
                Refer a friend and you both get <span className="text-blue-600 font-bold">£50 off</span>. There&apos;s no limit — refer 10 friends, save £500.
            </p>
            <button onClick={onEnquire} className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/25 active:scale-95">Get Started</button>
        </div>
    );
}
