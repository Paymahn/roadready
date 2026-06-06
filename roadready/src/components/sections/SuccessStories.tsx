"use client";

import { useState } from "react";
import Image from "next/image";
import { successStories } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { useReveal } from "@/lib/hooks";

function SuccessStories() {
  const { ref, revealed } = useReveal();
  const featured = successStories.find((s) => s.featured);
  const others = successStories.filter((s) => !s.featured);
  const [expandedStory, setExpandedStory] = useState<string | null>(null);

  const toggleStory = (name: string) => {
    setExpandedStory((prev) => (prev === name ? null : name));
  };

  const firstName = (name: string) => name.split(" ")[0];

  return (
    <section id="success-stories" className="bg-slate-900">
      {/* Image header banner */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1920"
          alt="Graduates shaking hands"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-slate-900/65" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
            Real Results with{" "}
            <span className="text-amber-400 font-black uppercase">RoadReady</span>
          </h2>
          <p className="mt-4 text-slate-300 max-w-lg text-base sm:text-lg">Real people who changed their lives. Here&apos;s where they are now.</p>
        </div>
      </div>

      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 ${!revealed ? "opacity-0 translate-y-5" : "animate-reveal-up"}`}>
        {/* Featured story */}
        {featured && (
          <div className="bg-blue-50 border border-blue-200/60 rounded-2xl p-6 lg:p-10 shadow-sm mb-8 relative overflow-hidden">
            <span className="absolute top-6 right-6 text-8xl font-heading text-blue-200/20 leading-none">&quot;</span>
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Image src={featured.image} alt={featured.name} width={64} height={64} className="w-16 h-16 rounded-full object-cover shadow-md shrink-0 border-2 border-white" />
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{featured.name}</div>
                    <div className="text-sm text-gray-600">{featured.course} · {featured.graduateDate}</div>
                  </div>
                  <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-emerald-600/15 text-emerald-800 rounded-full border border-emerald-600/30">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    Verified Graduate
                  </span>
                </div>
                <blockquote className="text-gray-800 text-lg leading-relaxed mb-5">&quot;{featured.quote}&quot;</blockquote>
                <p className="text-sm text-gray-600 mb-5">{featured.whereNow}</p>
                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Before</div>
                    <div className="text-sm text-gray-600">{featured.beforeRole} · <span className="line-through">{formatCurrency(featured.beforeSalary)}</span></div>
                  </div>
                  <svg className="w-5 h-5 text-emerald-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  <div>
                    <div className="text-xs text-emerald-700 uppercase tracking-wider mb-1 font-semibold">After</div>
                    <div className="text-sm font-bold text-gray-900">{featured.afterRole} · <span className="text-emerald-700">{formatCurrency(featured.afterSalary)}</span></div>
                  </div>
                </div>

                {/* Story link — own line, bigger */}
                <div className="pt-4 border-t border-blue-200/60">
                  <button
                    onClick={() => toggleStory(featured.name)}
                    className="inline-flex items-center gap-2.5 text-base font-bold text-emerald-800 hover:text-emerald-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>
                    {expandedStory === featured.name ? `Close ${firstName(featured.name)}'s Story` : `Read ${firstName(featured.name)}'s Story`}
                    <svg className={`w-5 h-5 transition-transform duration-200 ${expandedStory === featured.name ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded Q&A panel */}
            <div className={`grid transition-all duration-500 ease-in-out ${expandedStory === featured.name ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0"}`}>
              <div className="overflow-hidden">
                <div className="bg-white rounded-2xl p-6 lg:p-8 border border-blue-200/60">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <Image src={featured.imageLarge} alt={featured.name} width={192} height={192} className="w-full lg:w-48 h-48 lg:h-auto object-cover rounded-xl shadow-md shrink-0" />
                    <div className="flex-1 space-y-6">
                      {featured.storyQA.map((qa, i) => (
                        <div key={i}>
                          <h4 className="text-sm font-bold text-gray-900 mb-1.5 flex items-center gap-2">
                            <span className="w-5 h-5 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">Q</span>
                            {qa.question}
                          </h4>
                          <p className="text-sm text-gray-600 leading-relaxed pl-7">{qa.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other stories — cards only, no expansion inside grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {others.map((s) => {
            const isFemale = ["Sarah", "Priya"].some((n) => s.name.startsWith(n));
            const cardBg = isFemale ? "bg-pink-50 border-pink-200/60" : "bg-blue-50 border-blue-200/60";
            const quoteTint = isFemale ? "text-pink-200/20" : "text-blue-200/20";

            return (
              <div key={s.name} className={`${cardBg} border rounded-2xl p-6 shadow-sm flex flex-col relative overflow-hidden hover:shadow-lg transition-all duration-300`}>
                <span className={`absolute top-5 right-5 text-5xl font-heading ${quoteTint} leading-none`}>&quot;</span>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: s.rating }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-gray-800 leading-relaxed mb-4 flex-1 text-sm">&quot;{s.quote}&quot;</blockquote>
                <div className="flex items-center gap-3 mb-3">
                  <Image src={s.image} alt={s.name} width={48} height={48} className="w-12 h-12 rounded-full object-cover shadow-sm shrink-0" />
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{s.name}</div>
                    <div className="text-xs text-gray-600">{s.beforeRole} → {s.afterRole}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-600 mb-3">{s.whereNow}</div>
                <div className="pt-3 border-t border-gray-200 flex items-center gap-2 text-sm mb-4">
                  <span className="text-gray-500 line-through">{s.beforeSalary > 0 ? formatCurrency(s.beforeSalary) : "Unemployed"}</span>
                  <span className="text-gray-500">→</span>
                  <span className="text-emerald-700 font-bold">{formatCurrency(s.afterSalary)}</span>
                </div>

                {/* Story link — own line, prominent */}
                <button
                  onClick={() => toggleStory(s.name)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                  {expandedStory === s.name ? `Close ${firstName(s.name)}'s Story` : `Read ${firstName(s.name)}'s Story`}
                  <svg className={`w-4 h-4 transition-transform duration-200 ${expandedStory === s.name ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>

        {/* Expanded Q&A — rendered OUTSIDE the grid so it doesn't affect other cards */}
        {others.map((s) => {
          const isExpanded = expandedStory === s.name;
          return (
            <div key={`story-${s.name}`} className={`grid transition-all duration-500 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0"}`}>
              <div className="overflow-hidden">
                <div className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 shadow-sm">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex flex-col items-center gap-3 shrink-0">
                      <Image src={s.imageLarge} alt={s.name} width={192} height={192} className="w-full lg:w-48 h-48 lg:h-auto object-cover rounded-xl shadow-md" />
                      <div className="text-center">
                        <div className="font-bold text-gray-900">{s.name}</div>
                        <div className="text-xs text-gray-600">{s.course}</div>
                      </div>
                    </div>
                    <div className="flex-1 space-y-6">
                      {s.storyQA.map((qa, i) => (
                        <div key={i}>
                          <h4 className="text-sm font-bold text-gray-900 mb-1.5 flex items-center gap-2">
                            <span className="w-5 h-5 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">Q</span>
                            {qa.question}
                          </h4>
                          <p className="text-sm text-gray-600 leading-relaxed pl-7">{qa.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="text-center mt-10">
          <a
            href="https://www.google.com/maps/place/RoadReady"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62Z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" />
            </svg>
            Read all reviews on Google
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default SuccessStories;
