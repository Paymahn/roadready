"use client";

import Image from "next/image";
import Link from "next/link";
import { courses } from "@/lib/data";
import { useReveal } from "@/lib/hooks";
import CourseCategoryIcon from "@/components/CourseCategoryIcon";

const COURSE_BADGES: Record<string, { label: string; color: string; textColor: string }> = {
  "hgv-cat-c": { label: "Beginner Friendly", color: "bg-sky-500", textColor: "text-white" },
  "hgv-cat-ce": { label: "Career Upgrade", color: "bg-emerald-600", textColor: "text-white" },
  "forklift-counterbalance": { label: "Fast Track", color: "bg-violet-600", textColor: "text-white" },
  "hgv-cat-c-ce-combo": { label: "Most Popular", color: "bg-amber-500", textColor: "text-slate-950" },
};

function CoursePreview({ onEnquire }: { onEnquire: (course?: string) => void }) {
  const { ref, revealed } = useReveal();
  const topCourses = courses.filter((c) => ["hgv-cat-c", "hgv-cat-ce", "forklift-counterbalance", "hgv-cat-c-ce-combo"].includes(c.slug));

  return (
    <section className="py-20 lg:py-28 bg-slate-900">
      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${!revealed ? "opacity-0 translate-y-5" : "animate-reveal-up"}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
          <div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-3 tracking-tight">Our Courses</h2>
            <p className="text-lg text-slate-400">Everything included. Enquire for details on any course.</p>
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
            const badge = COURSE_BADGES[course.slug];
            const isCombo = course.slug === "hgv-cat-c-ce-combo";
            return (
              <div
                key={course.slug}
                className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full ${isCombo ? "ring-2 ring-amber-400" : "border border-slate-200"
                  }`}
              >
                <div className="h-44 relative flex items-center justify-center overflow-hidden shrink-0">
                  <Image
                    src={
                      course.slug === "hgv-cat-c" ? "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800" :
                        course.slug === "hgv-cat-ce" ? "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800" :
                          course.slug === "hgv-cat-c-ce-combo" ? "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800" :
                            "https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&q=80&w=800"
                    }
                    alt={course.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/30 transition-colors" />
                  <CourseCategoryIcon category={course.category} className="w-10 h-10 text-white relative z-10" />

                  {badge && (
                    <span className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${badge.color} ${badge.textColor} rounded-full shadow-lg z-10 flex items-center gap-1`}>
                      {isCombo && (
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      )}
                      {badge.label}
                    </span>
                  )}

                  <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-900 rounded-full shadow-md z-10">
                    {course.category}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{course.description}</p>

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
