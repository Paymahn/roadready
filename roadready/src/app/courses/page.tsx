"use client";

import { useState } from "react";
import { useEnquiry } from "@/context/EnquiryContext";
import { courses, type Course } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import CourseCategoryIcon from "@/components/CourseCategoryIcon";

const categories = ["All", "HGV", "Forklift", "CPC"] as const;

export default function CoursesPage() {
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
    const { openEnquiry } = useEnquiry();

    const filtered = activeCategory === "All"
        ? courses
        : courses.filter((c) => c.category === activeCategory);

    return (
        <div className="pt-24 pb-20 lg:pt-32 lg:pb-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500 mb-6">
                    <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        DVSA Approved
                    </span>
                    <span className="flex items-center gap-1.5">Everything included · All-inclusive</span>
                </div>
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-4 font-heading">Our Courses</h1>
                    <p className="text-lg text-slate-500 max-w-xl mx-auto">
                        Everything included. Enquire for details on any course.
                    </p>
                </div>

                <div className="flex items-center justify-center gap-2 mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${activeCategory === cat
                                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                                : "bg-white text-slate-400 hover:text-dark border border-slate-800 hover:border-emerald-600/30"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

                <div className="text-center mt-16">
                    <p className="text-slate-400 mb-4">Not sure which course is right for you?</p>
                    <button
                        onClick={() => openEnquiry()}
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-emerald-600/25 active:scale-95"
                    >
                        Talk To Us — We&apos;ll Help You Choose
                    </button>
                </div>
            </div>
        </div>
    );
}

function CourseCard({
    course, isExpanded, onToggle, onEnquire,
}: {
    course: Course; isExpanded: boolean; onToggle: () => void; onEnquire: () => void;
}) {
    return (
        <div className="bg-white border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/5 hover:-translate-y-0.5 transition-all duration-300 flex flex-col shadow-sm">
            <div className="h-28 bg-gradient-to-br from-slate-100 to-slate-800/20 flex items-center justify-center relative">
                <CourseCategoryIcon category={course.category} className="w-11 h-11 text-emerald-600" />
                <span className="absolute top-3 right-3 px-2 py-0.5 text-xs font-medium bg-emerald-600/10 text-emerald-600 rounded-full border border-emerald-600/20">
                    {course.category}
                </span>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <h2 className="text-xl font-bold text-dark mb-2">{course.title}</h2>
                <p className="text-sm text-slate-400 mb-4 flex-1">{course.description}</p>

                <div className="mb-4">
                    <p className="text-xs text-slate-400">All-inclusive · {course.duration}</p>
                </div>

                <button onClick={onToggle} className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-500 transition-colors mb-4">
                    {isExpanded ? "Hide details" : "View details"}
                    <svg className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isExpanded && (
                    <div className="mb-4 space-y-3 animate-fade-in">
                        <div>
                            <h4 className="text-xs font-semibold text-dark uppercase tracking-wider mb-2">What&apos;s Included</h4>
                            <ul className="space-y-1.5">
                                {course.includes.map((item) => (
                                    <li key={item} className="flex items-start gap-2 text-sm text-slate-400">
                                        <svg className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xs font-semibold text-dark uppercase tracking-wider mb-2">Modules</h4>
                            <ul className="space-y-1">
                                {course.modules.map((mod) => (
                                    <li key={mod} className="text-sm text-slate-400 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full shrink-0" />
                                        {mod}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <button onClick={onEnquire} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-emerald-600/25 active:scale-[0.98] mt-auto min-h-[44px]">
                    Enquire About This Course
                </button>
            </div>
        </div>
    );
}
