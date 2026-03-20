"use client";

import Image from "next/image";

const USP_ITEMS = [
  "Experienced team across HGV & ADR training",
  "Straightforward advice — no hard sell",
  "Nationwide partner network for practical training",
  "Support from enquiry through to test day",
  "Finance options discussed on a case-by-case basis",
];

function HeroSection({ onEnquire }: { onEnquire: () => void }) {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      <Image
        src="/images/unnamed.jpg"
        alt="RoadReady HGV on the motorway"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Base dim for headline contrast */}
      <div className="absolute inset-0 bg-slate-950/50" aria-hidden />
      {/* Stronger fade toward bottom (and bottom-right) to soften AI tool watermark */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent from-[8%] via-[42%]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_70%_at_100%_100%,rgb(2_6_23/0.97)_0%,rgb(2_6_23/0.45)_45%,transparent_72%)]"
        aria-hidden
      />
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
        <div className="flex flex-col gap-6 lg:gap-8 flex-1">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Your New Career Starts With{" "}
            <span className="block mt-1 text-amber-400 font-black uppercase">RoadReady</span>
          </h1>

          {/* USP box — shows between headline and button on mobile, beside on desktop */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-5 lg:hidden">
            <ul className="space-y-2.5">
              {USP_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-4 text-base sm:text-lg font-medium text-white tracking-wide drop-shadow-sm">
                  <svg className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <button
              onClick={onEnquire}
              className="w-full sm:w-auto px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-lg sm:text-xl rounded-full border-2 border-amber-400 transition-colors"
            >
              GET FREE QUOTE
            </button>
          </div>
        </div>

        {/* USP box — desktop only, right side */}
        <div className="hidden lg:block bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-6 max-w-sm">
          <ul className="space-y-3">
            {USP_ITEMS.map((item) => (
              <li key={item} className="flex items-start gap-4 text-base lg:text-lg font-medium text-white tracking-wide drop-shadow-sm">
                <svg className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Gold bar on top */}
      <div className="absolute bottom-[1px] left-0 right-0 h-[5px] z-20 bg-amber-500" />
      {/* Thin white line beneath */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] z-20 bg-white" />
    </section>
  );
}

export default HeroSection;
