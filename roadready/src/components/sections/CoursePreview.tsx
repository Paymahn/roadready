"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { courses } from "@/lib/data";
import { useReveal } from "@/lib/hooks";

/** Homepage course cards — images in public/images */
const PREVIEW_IMAGES: Record<string, string> = {
  "hgv-cat-c": "/images/hgvcatc.jpg",
  "hgv-cat-ce": "/images/hgvcatce.jpg",
  "adr-dangerous-goods": "/images/hgvadr.jpg",
  "hgv-cat-c-ce-combo": "/images/hgvcatcce.jpg",
};

/** Short label shown in the top bar (no pill UI) */
const COURSE_TAGS: Record<string, string> = {
  "hgv-cat-c": "Beginner friendly",
  "hgv-cat-ce": "Career upgrade",
  "adr-dangerous-goods": "Enrolling now · booming sector",
  "hgv-cat-c-ce-combo": "Most popular",
};

function CoursePreview({ onEnquire }: { onEnquire: (course?: string) => void }) {
  const { ref, revealed } = useReveal();
  const [descExpanded, setDescExpanded] = useState<Record<string, boolean>>({});
  const topCourses = courses.filter((c) =>
    ["hgv-cat-c", "hgv-cat-ce", "adr-dangerous-goods", "hgv-cat-c-ce-combo"].includes(c.slug),
  );

  return (
    <section className="py-20 lg:py-28 bg-slate-900">
      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${!revealed ? "opacity-0 translate-y-5" : "animate-reveal-up"}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
          <div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-3 tracking-tight">Our Courses</h2>
            <p className="text-lg text-slate-400">Enquire for details on any course.</p>
          </div>
          <Link
            href="/courses"
            className="mt-4 sm:mt-0 text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors inline-flex items-center gap-1"
          >
            View all courses
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {topCourses.map((course) => {
            const tag = COURSE_TAGS[course.slug];
            const isCombo = course.slug === "hgv-cat-c-ce-combo";
            const isAdr = course.slug === "adr-dangerous-goods";
            const descOpen = descExpanded[course.slug] ?? false;
            return (
              <div
                key={course.slug}
                className={`group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col h-full ${
                  isAdr
                    ? "border-2 border-amber-400 ring-2 ring-amber-400/60 shadow-[0_0_24px_rgba(234,179,8,0.25)]"
                    : isCombo
                      ? "ring-2 ring-amber-400"
                      : "border border-slate-200"
                }`}
              >
                {/* Full-width meta bar — tag only (no category row) so all cards align; indigo vs amber */}
                <div
                  className={`w-full shrink-0 border-b px-3 py-3 sm:px-4 sm:py-3.5 ${
                    isAdr
                      ? "border-amber-900/50 bg-amber-950 text-amber-50"
                      : "border-indigo-900/60 bg-indigo-950 text-indigo-50"
                  }`}
                >
                  <div className="flex w-full flex-col items-center justify-center text-center">
                    {tag && (
                      <span
                        className={`text-sm sm:text-base font-semibold leading-snug ${
                          isAdr ? "text-amber-200" : "text-indigo-200"
                        }`}
                      >
                        {tag}
                      </span>
                    )}
                  </div>
                </div>

                <div className="h-44 relative overflow-hidden shrink-0">
                  <Image
                    src={PREVIEW_IMAGES[course.slug] ?? "/images/unnamed.jpg"}
                    alt={course.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/30 transition-colors" />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">
                    {course.title}
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setDescExpanded((prev) => ({
                        ...prev,
                        [course.slug]: !prev[course.slug],
                      }))
                    }
                    aria-expanded={descOpen}
                    className="mb-4 w-full rounded-lg px-1 py-2.5 text-left transition-colors hover:bg-slate-50 active:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:py-1.5 min-h-[44px] sm:min-h-0 flex flex-col justify-center"
                  >
                    <span
                      className={`text-sm text-gray-600 leading-relaxed ${descOpen ? "" : "line-clamp-3"}`}
                    >
                      {course.description}
                    </span>
                    <span className="mt-2 text-xs font-semibold text-indigo-600 underline decoration-indigo-600/40 underline-offset-2 sm:mt-1.5">
                      {descOpen ? "Show less" : "Read full description"}
                    </span>
                  </button>
                  {isAdr && (
                    <p className="text-xs font-semibold text-amber-800 mb-4 -mt-1 leading-relaxed">
                      ADR is one of the fastest-growing areas in UK logistics — specialist loads and compliance needs mean qualified drivers are in short supply. Get ahead while training places are available.
                    </p>
                  )}

                  {course.careers && (
                    <div className="mb-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-900 mb-1.5">Career Avenues</p>
                      <div className="flex flex-wrap gap-1.5">
                        {course.careers.slice(0, 3).map((career) => (
                          <span key={career} className="text-[10px] bg-slate-50 text-slate-700 font-medium px-2 py-0.5 rounded border border-slate-200/60">
                            {career}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-gray-500 mb-4 mt-auto">
                    All-inclusive · {course.duration}
                  </p>

                  <button
                    onClick={() => onEnquire(course.slug)}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-base font-bold rounded-full transition-all duration-200"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CoursePreview;
