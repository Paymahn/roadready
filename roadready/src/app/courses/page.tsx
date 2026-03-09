"use client";

import { useState } from "react";
import Image from "next/image";
import { useEnquiry } from "@/context/EnquiryContext";
import { courses, type Course } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import CourseCategoryIcon from "@/components/CourseCategoryIcon";

const categories = ["All", "HGV", "Forklift", "CPC"] as const;

const COURSE_BADGES: Record<string, { text: string; color: string }> = {
    "hgv-cat-c-ce-combo": { text: "Most Popular", color: "bg-amber-400 text-slate-950" },
    "hgv-cat-c": { text: "94% Pass Rate", color: "bg-emerald-500 text-white" },
    "hgv-cat-ce": { text: "Highest Earner", color: "bg-emerald-600 text-white" },
    "forklift-counterbalance": { text: "Fast Track", color: "bg-violet-500 text-white" },
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
                <div className="relative rounded-[2.5rem] overflow-hidden pt-16 pb-12 sm:pt-20 sm:pb-16 px-6 sm:px-10 lg:px-16 shadow-2xl border border-slate-700/50">
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

                        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white mb-6 font-heading tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                            Our Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200 drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]">Courses</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-14 drop-shadow-md">
                            Everything included. No hidden fees. Enquire for details on any course to get started on your new career path today.
                        </p>

                        {/* 4 Big Selling Points Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-6xl mx-auto">
                            {/* DVSA Approved */}
                            <div className="flex flex-col items-center text-center gap-3 bg-slate-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl hover:-translate-y-1 hover:bg-slate-900/80 hover:border-emerald-500/30 transition-all duration-300">
                                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 mb-1">
                                    <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="block text-lg font-extrabold text-white tracking-wide mb-1">DVSA Approved</span>
                                    <span className="block text-sm text-slate-400 font-medium">Highest standard training</span>
                                </div>
                            </div>

                            {/* All-Inclusive */}
                            <div className="flex flex-col items-center text-center gap-3 bg-slate-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl hover:-translate-y-1 hover:bg-slate-900/80 hover:border-amber-400/30 transition-all duration-300">
                                <div className="w-12 h-12 rounded-full bg-amber-400/20 flex items-center justify-center border border-amber-400/30 mb-1">
                                    <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="block text-lg font-extrabold text-white tracking-wide mb-1">All-Inclusive</span>
                                    <span className="block text-sm text-slate-400 font-medium">No hidden fees ever</span>
                                </div>
                            </div>

                            {/* Unrivalled Support */}
                            <div className="flex flex-col items-center text-center gap-3 bg-slate-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl hover:-translate-y-1 hover:bg-slate-900/80 hover:border-blue-400/30 transition-all duration-300">
                                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 mb-1">
                                    <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="block text-lg font-extrabold text-white tracking-wide mb-1">Unrivalled Support</span>
                                    <span className="block text-sm text-slate-400 font-medium">We're with you 24/7</span>
                                </div>
                            </div>

                            {/* We handle everything */}
                            <div className="flex flex-col items-center text-center gap-3 bg-slate-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl hover:-translate-y-1 hover:bg-slate-900/80 hover:border-violet-400/30 transition-all duration-300">
                                <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center border border-violet-500/30 mb-1">
                                    <svg className="w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m9-6h-6m6 0a2 2 0 012 2v10a2 2 0 01-2 2h-6m6-0H9m12-10V4h-6m-6 0v2m0 8h6m-6-0v6" />
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

            <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2.5 text-sm font-bold rounded-full transition-all duration-300 shadow-md ${activeCategory === cat
                            ? "bg-amber-400 text-slate-950 shadow-amber-400/20 scale-105"
                            : "bg-slate-800 text-slate-300 hover:text-white border border-slate-700 hover:border-amber-400/50 hover:bg-slate-700"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

    return (
        <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-3xl overflow-hidden hover:border-amber-400/50 hover:shadow-2xl hover:shadow-emerald-900/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col group">

            {/* Corner Ribbon */}
            {badge && (
                <div className="absolute top-0 right-0 z-10 overflow-hidden w-32 h-32 pointer-events-none">
                    <div className={`absolute top-7 -right-7 w-40 text-center transform rotate-45 text-[11px] font-extrabold tracking-wider uppercase py-1.5 shadow-lg ${badge.color}`}>
                        {badge.text}
                    </div>
                </div>
            )}

            <div className="h-32 bg-gradient-to-br from-slate-800 to-slate-900/40 flex flex-col items-center justify-center relative border-b border-slate-700/50">
                <CourseCategoryIcon category={course.category} className="w-12 h-12 text-emerald-400 mb-2 group-hover:scale-110 group-hover:text-amber-400 transition-all duration-300" />
                <span className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-950/50 text-emerald-400 rounded-full border border-emerald-500/30">
                    {course.category}
                </span>
            </div>

            <div className="p-6 sm:p-8 flex flex-col flex-1">
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
                        All-inclusive · {course.duration}
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
