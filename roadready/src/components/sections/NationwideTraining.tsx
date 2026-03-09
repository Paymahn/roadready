"use client";

import { useState, useRef } from "react";
import { trainingLocations } from "@/lib/data";
import { useReveal } from "@/lib/hooks";

function NationwideTraining() {
  const { ref, revealed } = useReveal();
  const [search, setSearch] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = search.trim()
    ? trainingLocations.filter(
      (l) =>
        l.city.toLowerCase().includes(search.toLowerCase()) ||
        l.region.toLowerCase().includes(search.toLowerCase())
    )
    : trainingLocations;

  const regions = [...new Set(trainingLocations.map((l) => l.region))];

  return (
    <section className="py-20 lg:py-28">
      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${!revealed ? "opacity-0 translate-y-5" : "animate-reveal-up"}`}>
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-600/10 text-emerald-600 text-sm font-semibold rounded-full border border-emerald-600/20 mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            {trainingLocations.length} locations
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark mb-3 tracking-tight">
            Training Centres{" "}
            <span className="text-emerald-600">Across the UK</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto mb-8">
            Wherever you are, we&apos;re nearby. Search for your nearest centre or scroll through our nationwide network.
          </p>

          {/* Search input */}
          <div className="max-w-md mx-auto relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by city or region..."
              className="w-full pl-12 pr-4 py-3.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
              </button>
            )}
          </div>
        </div>

        {/* Scrolling location cards */}
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
          {filtered.map((loc) => (
            <div
              key={loc.city}
              className="snap-start shrink-0 w-56 bg-slate-800 border border-slate-700 rounded-2xl p-5 hover:border-emerald-500/50 hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <h3 className="font-bold text-dark group-hover:text-emerald-600 transition-colors">{loc.city}</h3>
              </div>
              <div className="text-xs text-slate-400 mb-3">{loc.region}</div>
              <div className="flex flex-wrap gap-1.5">
                {loc.courses.map((c) => (
                  <span key={c} className="text-[10px] font-medium px-2 py-0.5 bg-emerald-600/8 text-emerald-600 rounded-full border border-emerald-600/15">{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-10">
            <p className="text-slate-400">No locations found for &quot;{search}&quot;. Try a different search.</p>
          </div>
        )}

        {/* Region summary strip */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => setSearch(r)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-200 ${search === r
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-slate-800 text-slate-400 border-slate-700 hover:border-emerald-500/50 hover:text-emerald-400"
                }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}


export default NationwideTraining;
