"use client";

import { useState } from "react";
import Image from "next/image";
import { useEnquiry } from "@/context/EnquiryContext";
import { courses, type Course } from "@/lib/data";
const categories = ["All", "HGV", "CPC", "ADR"] as const;

/** Course card hero thumbnails — files in public/images */
const COURSE_CARD_IMAGES: Record<string, string> = {
    "hgv-cat-c": "/images/hgvcatc.jpg",
    "hgv-cat-ce": "/images/hgvcatce.jpg",
    "adr-dangerous-goods": "/images/hgvadr.jpg",
    "hgv-cat-c-ce-combo": "/images/hgvcatcce.jpg",
    "cpc-periodic-training": "/images/unnamed.jpg",
};

const COURSE_BADGES: Record<string, { text: string; color: string }> = {
    "hgv-cat-c-ce-combo": { text: "Most Popular", color: "bg-amber-400 text-slate-950" },
    "hgv-cat-c": { text: "Core licence", color: "bg-emerald-600 text-white" },
    "hgv-cat-ce": { text: "Artic upgrade", color: "bg-emerald-700 text-white" },
    "adr-dangerous-goods": { text: "Enrolling", color: "bg-amber-500 text-slate-950" },
};

export default function CoursesPage() {
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
    const { openEnquiry } = useEnquiry();

    const filtered = activeCategory === "All"
        ? courses
        : courses.filter((c) => c.category === activeCategory);

    return (
        <div className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 bg-slate-950 min-h-screen border-t border-slate-800">
            {/* Background Texture for the bottom half */}
            <div className="absolute inset-x-0 bottom-0 top-[60vh] opacity-[0.08] mix-blend-overlay border-none pointer-events-none">
                <Image
                    src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1920"
                    alt="Trucks on road"
                    fill
                    className="object-cover object-center"
                    sizes="100vw"
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                {/* Hero Banner with Background Image */}
                <div className="relative rounded-2xl overflow-hidden pt-16 pb-12 sm:pt-20 sm:pb-16 px-6 sm:px-10 lg:px-16 shadow-md border border-slate-700/50">
                    {/* Dark gradient overlay on top of the image */}
                    <div className="absolute inset-0 bg-slate-950/75 mix-blend-multiply z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/40 z-10" />

                    {/* The Background Image itself */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=1920"
                            alt="HGV Driving"
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 1280px) 100vw, 1280px"
                            priority
                        />
                    </div>

                    <div className="relative z-20 flex flex-col items-center text-center">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-bold uppercase tracking-widest mb-6">
                            Start Your Journey
                        </span>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 font-heading tracking-tight">
                            Our <span className="text-amber-400">Courses</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-14">
                            Enquire for details on any course — we&apos;ll talk you through the route and
                            get you started.
                        </p>

                        {/* 4 Big Selling Points Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-6xl mx-auto">
                            {/* DVSA Approved */}
                            <div className="flex flex-col items-center text-center gap-3 bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-sm hover:border-slate-600 transition-colors duration-200">
                                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 mb-1">
                                    <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="block text-lg font-bold text-white tracking-wide mb-1">DVSA-focused training</span>
                                    <span className="block text-sm text-slate-400 font-medium">Geared to test requirements</span>
                                </div>
                            </div>

                            {/* All-Inclusive */}
                            <div className="flex flex-col items-center text-center gap-3 bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-sm hover:border-slate-600 transition-colors duration-200">
                                <div className="w-12 h-12 rounded-full bg-amber-400/20 flex items-center justify-center border border-amber-400/30 mb-1">
                                    <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="block text-lg font-extrabold text-white tracking-wide mb-1">Upfront pricing</span>
                                    <span className="block text-sm text-slate-400 font-medium">Costs explained before you book</span>
                                </div>
                            </div>

                            {/* Unrivalled Support */}
                            <div className="flex flex-col items-center text-center gap-3 bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-sm hover:border-slate-600 transition-colors duration-200">
                                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 mb-1">
                                    <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="block text-lg font-bold text-white tracking-wide mb-1">Human support</span>
                                    <span className="block text-sm text-slate-400 font-medium">Office hours — we respond as soon as we can</span>
                                </div>
                            </div>

                            {/* We handle everything — calm / rest (less stress) */}
                            <div className="flex flex-col items-center text-center gap-3 bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-sm hover:border-slate-600 transition-colors duration-200">
                                <div className="w-12 h-12 rounded-full bg-sky-500/15 flex items-center justify-center border border-sky-400/35 mb-1">
                                    <svg className="w-6 h-6 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="block text-lg font-extrabold text-white tracking-wide mb-1">Stress-Free</span>
                                    <span className="block text-sm text-slate-400 font-medium">We take care of it all</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
                <div className="flex flex-col gap-4 border-b border-slate-800 pb-4 md:pb-0 md:flex-row md:items-end md:justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Browse by category
                    </p>
                    <div className="md:hidden">
                        <label htmlFor="course-category" className="sr-only">
                            Course category
                        </label>
                        <select
                            id="course-category"
                            value={activeCategory}
                            onChange={(e) => setActiveCategory(e.target.value)}
                            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm font-semibold text-white shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat === "All" ? "All categories" : cat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div
                        role="radiogroup"
                        aria-label="Course category"
                        className="hidden md:flex gap-0 -mb-px min-w-0 overflow-x-auto pb-px [scrollbar-width:thin]"
                    >
                        {categories.map((cat) => {
                            const selected = activeCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    type="button"
                                    role="radio"
                                    aria-checked={selected}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`relative shrink-0 px-1 py-2.5 mr-8 last:mr-0 text-sm font-semibold transition-colors border-b-2 -mb-px ${selected
                                        ? "text-white border-amber-400"
                                        : "text-slate-500 border-transparent hover:text-slate-200 hover:border-slate-600"
                                        }`}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((course) => (
                    <CourseCard
                        key={course.slug}
                        course={course}
                        isExpanded={expandedSlug === course.slug}
                        onToggle={() => setExpandedSlug(expandedSlug === course.slug ? null : course.slug)}
                        onEnquire={() => openEnquiry(course.slug)}
                    />
                ))}
            </div>

            <div className="text-center mt-20">
                <p className="text-slate-400 mb-5 text-lg">Not sure which course is right for you?</p>
                <button
                    onClick={() => openEnquiry()}
                    className="inline-flex items-center gap-3 px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg rounded-full transition-all duration-200 shadow-xl shadow-emerald-900/50 hover:shadow-emerald-500/30 active:scale-95 border-2 border-emerald-500"
                >
                    Talk To Us — We&apos;ll Help You Choose
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

function CourseCard({
    course, isExpanded, onToggle, onEnquire,
}: {
    course: Course; isExpanded: boolean; onToggle: () => void; onEnquire: () => void;
}) {
    const badge = COURSE_BADGES[course.slug];
    const isAdr = course.slug === "adr-dangerous-goods";
    const headerImage = COURSE_CARD_IMAGES[course.slug] ?? "/images/unnamed.jpg";

    return (
        <div
            className={`relative rounded-2xl overflow-hidden transition-colors duration-200 flex flex-col group bg-gradient-to-b from-emerald-900/25 via-slate-900 to-slate-950 ${
                isAdr
                    ? "border-2 border-amber-400 ring-2 ring-amber-400/50 shadow-[0_0_28px_rgba(234,179,8,0.2)] hover:border-amber-300"
                    : "border border-slate-700 hover:border-slate-600"
            }`}
        >

            {/* Corner Ribbon */}
            {badge && (
                <div className="absolute top-0 right-0 z-10 overflow-hidden w-32 h-32 pointer-events-none">
                    <div className={`absolute top-7 -right-7 w-40 text-center transform rotate-45 text-[11px] font-extrabold tracking-wider uppercase py-1.5 shadow-lg ${badge.color}`}>
                        {badge.text}
                    </div>
                </div>
            )}

            <div className="relative h-36 sm:h-40 shrink-0 border-b border-slate-700/50 overflow-hidden">
                <Image
                    src={headerImage}
                    alt=""
                    aria-hidden
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/35 to-emerald-950/20 pointer-events-none" />
                <span className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-950/75 text-emerald-300 rounded-full border border-emerald-500/40 backdrop-blur-[2px]">
                    {course.category}
                </span>
            </div>

            <div className="p-6 sm:p-8 flex flex-col flex-1 bg-gradient-to-b from-emerald-950/15 to-transparent">
                <h2 className="text-2xl font-extrabold text-white mb-3 group-hover:text-emerald-400 transition-colors">{course.title}</h2>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed flex-1">{course.description}</p>

                {course.careers && (
                    <div className="mb-6">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2.5">Career Avenues</p>
                        <div className="flex flex-wrap gap-2">
                            {course.careers.map((career) => (
                                <span key={career} className="text-[11px] bg-slate-800/80 text-slate-300 font-semibold px-2.5 py-1 rounded border border-slate-700">
                                    {career}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mb-6 mt-auto">
                    <div className="flex items-center gap-2.5 text-sm font-medium text-slate-300 bg-white/5 border border-white/5 px-4 py-3 rounded-xl">
                        <svg className="w-5 h-5 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {course.duration}
                    </div>
                </div>

                <button onClick={onToggle} className="flex items-center gap-1.5 text-sm font-bold text-emerald-400 hover:text-amber-400 transition-colors mb-6">
                    {isExpanded ? "Hide full details" : "View full details"}
                    <svg className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isExpanded && (
                    <div className="mb-6 space-y-5 animate-fade-in bg-slate-950/50 p-5 rounded-2xl border border-slate-800/80">
                        <div>
                            <h4 className="text-[11px] font-extrabold text-slate-200 uppercase tracking-widest mb-3">What&apos;s Included</h4>
                            <ul className="space-y-2.5">
                                {course.includes.map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm text-slate-400">
                                        <svg className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[11px] font-extrabold text-slate-200 uppercase tracking-widest mb-3">Modules</h4>
                            <ul className="space-y-2">
                                {course.modules.map((mod) => (
                                    <li key={mod} className="text-sm text-slate-400 flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0 mt-1.5" />
                                        {mod}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <button onClick={onEnquire} className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white text-base font-bold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-900/50 hover:shadow-emerald-500/30 active:scale-[0.98] border-2 border-emerald-500">
                    Enquire About This Course
                </button>
            </div>
        </div>
    );
}
