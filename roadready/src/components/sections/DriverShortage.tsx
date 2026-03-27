"use client";

import { useState } from "react";
import Image from "next/image";
import { useReveal, useCountUp } from "@/lib/hooks";
import UkJobMap from "@/components/UkJobMap";

const PLACEMENT_ITEMS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    label: "Industry Contacts",
    body: "We have direct relationships with major haulage firms, logistics companies, and agencies across the UK. When you're ready, we make introductions.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    label: "CV Reviews",
    body: "Logistics employers look for specific things. Our team reviews your CV to make sure it speaks their language — and gets you to interview.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    label: "Interview Preparation",
    body: "We coach you on what employers tend to ask, what to wear, what to bring, and how to present yourself clearly. We focus on practical prep — not promises about timelines.",
  },
];

const CONTEXT_BLOCKS = [
  {
    title: "Driver shortage",
    titleClass: "text-red-400",
    body: "Higher energy demand and a growing population mean more goods and services need to move. Skilled drivers have never been more in demand.",
  },
  {
    title: "60,000+ unfilled roles",
    titleClass: "text-sky-300",
    body: "Industry estimates put unfilled HGV vacancies in the tens of thousands nationwide. Employers are competing for qualified drivers — the right licence opens real options.",
  },
  {
    title: "Logistics is growing",
    titleClass: "text-emerald-400",
    body: "While many sectors slow down, logistics keeps expanding. The tech boom relies on hardware, data centres, and complex supply chains — and those resources move on roads and through warehouses. Few industries sit closer to sustained growth.",
  },
  {
    title: "Truck driving won’t be automated anytime soon",
    titleClass: "text-amber-400",
    body: "The industry is safe from near-term AI disruption: fully driverless HGVs on UK roads aren’t a realistic prospect yet. The work demands judgement, awareness, and responsibility in live traffic — skills that keep professional drivers essential for the foreseeable future.",
  },
] as const;

function DriverShortage({ onEnquire }: { onEnquire: () => void }) {
  const { ref, revealed } = useReveal();
  const stat1 = useCountUp(60000, 2500);
  const stat2 = useCountUp(60, 2000);
  const stat3 = useCountUp(12, 1800);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const statItems = [
    { ...stat1, label: "Unfilled HGV positions across the UK (industry figures)", suffix: "+", prefix: "", color: "text-red-500" },
    { ...stat2, label: "Partner training locations we can place you with", suffix: "+", prefix: "", color: "text-emerald-600" },
    { ...stat3, label: "Illustrative year-on-year sector growth context", suffix: "%", prefix: "", color: "text-emerald-600" },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 opacity-[0.08]">
        <Image
          src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1920"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-slate-950/90" />

      {/* Context — headline + supporting copy */}
      <div className="relative bg-slate-950/90 border-y border-slate-800 py-8 sm:py-10 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-x-12 lg:gap-y-10">
          {CONTEXT_BLOCKS.map((block) => (
            <div key={block.title}>
              <h3 className={`font-heading text-base sm:text-lg font-bold tracking-tight mb-2 ${block.titleClass}`}>
                {block.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">{block.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div ref={ref} className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 ${!revealed ? "opacity-0 translate-y-5" : "animate-reveal-up"}`}>
        {/* Full-bleed header band — matches other edge-to-edge imagery */}
        <div className="relative mb-16 w-screen max-w-[100vw] left-1/2 -translate-x-1/2 overflow-hidden py-14 px-4 sm:py-16 sm:px-6 lg:py-20 lg:px-8 min-h-[280px] sm:min-h-[320px] flex items-center">
          <div className="absolute inset-0">
            <Image
              src="/images/hgvdepot.jpg"
              alt="RoadReady HGV depot and logistics yard"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-slate-950/80" />
          </div>
          <div className="relative z-10 w-full max-w-7xl mx-auto text-center">
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight">
              The UK Needs{" "}
              <span className="text-amber-400">60,000+ Drivers</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              The logistics industry can&apos;t find enough qualified drivers. Companies are raising salaries, signing bonuses, and benefits to attract talent. If you&apos;ve ever thought about a career change — this is the window. Get qualified now, and you&apos;ll enter a market where employers compete for <span className="text-white font-semibold">you</span>.
            </p>
          </div>
        </div>

        {/* Stats — industrial brutalist grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto mb-16 border-4 border-emerald-400/60">
          {statItems.map((stat, i) => (
            <div
              key={i}
              ref={stat.ref}
              className={`p-6 sm:p-8 text-center bg-slate-950 ${
                i === 1 ? "border-y-4 sm:border-y-0 sm:border-x-4 border-emerald-400/60" : ""
              }`}
            >
              <div className="text-5xl sm:text-6xl font-black tracking-tighter mb-3 text-white leading-none">
                {stat.prefix}
                {stat.count >= 1000 ? Math.round(stat.count).toLocaleString() : Math.round(stat.count)}
                <span className="text-amber-400">{stat.suffix}</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-400 font-bold uppercase tracking-wider leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="mb-14">
          <UkJobMap />
        </div>

        {/* Industry Placement — expandable cards */}
        <div className="mb-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PLACEMENT_ITEMS.map(({ icon, label, body }) => {
            const isOpen = expandedCard === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setExpandedCard(isOpen ? null : label)}
                className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 text-left shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    {icon}
                  </div>
                  <span className="font-bold text-slate-900 text-lg flex-1">{label}</span>
                  <svg className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"}`}>
                  <div className="overflow-hidden">
                    <p className="text-slate-600 leading-relaxed text-sm">{body}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={onEnquire}
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white text-lg font-semibold rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-emerald-600/25 active:scale-95"
          >
            Start Your Journey
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 mt-6">
            <div className="flex items-center gap-2 text-white/60">
              <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
              <span className="text-xs font-medium">256-bit Bank-Grade Encryption</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              <span className="text-xs font-medium">Training aligned with DVSA standards</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg>
              <span className="text-xs font-medium">Zero Hidden Fees. 100% Secure.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DriverShortage;
