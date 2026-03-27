"use client";

import { useState } from "react";
import { REGION_PATHS } from "@/lib/ukMapPaths";

const REGIONS = [
  { id: "Scotland", name: "Scotland", vacancies: 4800, includes: "Glasgow, Edinburgh, Aberdeen", pin: { cx: 191, cy: 217 } },
  { id: "North East", name: "North East", vacancies: 3100, includes: "Newcastle, Sunderland, Durham", pin: { cx: 329, cy: 306 } },
  { id: "North West", name: "North West", vacancies: 6800, includes: "Manchester, Liverpool, Lancashire", pin: { cx: 268, cy: 370 } },
  { id: "Yorkshire", name: "Yorkshire", vacancies: 5200, includes: "Leeds, Sheffield, Bradford, Hull", pin: { cx: 338, cy: 364 } },
  { id: "East Midlands", name: "East Midlands", vacancies: 4200, includes: "Nottingham, Leicester, Derby", pin: { cx: 354, cy: 426 } },
  { id: "West Midlands", name: "West Midlands", vacancies: 6100, includes: "Birmingham, Coventry, Wolverhampton", pin: { cx: 303, cy: 445 } },
  { id: "East of England", name: "East of England", vacancies: 4800, includes: "Cambridge, Norwich, Essex", pin: { cx: 421, cy: 467 } },
  { id: "London", name: "London", vacancies: 8200, includes: "Greater London boroughs", pin: { cx: 394, cy: 499 } },
  { id: "South East", name: "South East", vacancies: 7200, includes: "Kent, Surrey, Sussex, Hampshire", pin: { cx: 388, cy: 520 } },
  { id: "South West", name: "South West", vacancies: 4100, includes: "Bristol, Plymouth, Devon, Cornwall", pin: { cx: 255, cy: 520 } },
  { id: "Wales", name: "Wales", vacancies: 2800, includes: "Cardiff, Swansea, Newport", pin: { cx: 216, cy: 454 } },
  { id: "Northern Ireland", name: "Northern Ireland", vacancies: 1900, includes: "Belfast, Derry", pin: { cx: 66, cy: 313 } },
] as const;

const DEFAULT_COLOR = { fill: "#334155", active: "#38BDF8" };

export default function UkJobMap() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const activeId = hoveredId || selectedId;
  const activeRegion = REGIONS.find((r) => r.id === activeId);

  function handleRegionClick(id: string) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start w-full max-w-6xl mx-auto">
      {/* SVG Map */}
      <div className="w-full lg:w-[60%] shrink-0">
        <svg viewBox="0 0 500 700" className="w-full h-auto" style={{ maxHeight: "640px" }}>
          <rect width="500" height="700" fill="transparent" />

          {Object.entries(REGION_PATHS).map(([regionName, paths]) => {
            const isActive = activeId === regionName;
            return (
              <g key={regionName}>
                {paths.map((d, i) => (
                  <path
                    key={i}
                    d={d}
                    fill={isActive ? DEFAULT_COLOR.active : DEFAULT_COLOR.fill}
                    stroke="#1E293B"
                    strokeWidth="0.8"
                    opacity={isActive ? 0.9 : 0.75}
                    style={{ transition: "fill 0.2s, opacity 0.2s" }}
                    onClick={() => handleRegionClick(regionName)}
                    onMouseEnter={() => setHoveredId(regionName)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="cursor-pointer"
                  />
                ))}
              </g>
            );
          })}

          {/* Vacancy labels on hover/click */}
          {REGIONS.map((r) => {
            if (activeId !== r.id) return null;
            return (
              <g key={`label-${r.id}`} style={{ pointerEvents: "none" }}>
                <rect
                  x={r.pin.cx - 32}
                  y={r.pin.cy - 14}
                  width={64}
                  height={28}
                  rx={14}
                  fill="#0F172A"
                  fillOpacity={0.9}
                  stroke="#38BDF8"
                  strokeWidth={1.5}
                />
                <text
                  x={r.pin.cx}
                  y={r.pin.cy + 5}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="bold"
                  fill="#38BDF8"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  {r.vacancies.toLocaleString()}+
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Info panel */}
      <div className="w-full lg:flex-1 flex flex-col gap-4">
        <p className="text-slate-400 text-sm">Hover over a region to see vacancy details</p>

        {activeRegion ? (
          <div className="p-6 bg-slate-950 border-2 border-emerald-400">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-heading text-2xl font-black text-white uppercase tracking-tight">{activeRegion.name}</h3>
                <p className="text-slate-400 text-sm font-bold mt-1">{activeRegion.includes}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-4xl font-black text-emerald-400 tracking-tighter">
                  {activeRegion.vacancies.toLocaleString()}<span className="text-amber-400">+</span>
                </div>
                <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-0.5">HGV vacancies</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-slate-950 border-2 border-slate-700 flex items-center justify-center min-h-[160px]">
            <p className="text-slate-500 text-sm text-center font-bold uppercase tracking-wider">Hover or click a region on the map</p>
          </div>
        )}

        {/* Region buttons */}
        <div className="grid grid-cols-2 gap-2">
          {REGIONS.map((r) => {
            const isActive = activeId === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onMouseEnter={() => setHoveredId(r.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleRegionClick(r.id)}
                className={`text-left px-3 py-2.5 border-2 transition-all duration-100 text-sm ${
                  isActive
                    ? "bg-slate-900 border-emerald-400 text-white"
                    : "bg-slate-950 border-slate-700 text-slate-300 hover:border-slate-400 hover:text-white"
                }`}
              >
                <span className="font-black block truncate uppercase tracking-wide text-xs">{r.name}</span>
                <span className={`text-xs font-bold tabular-nums ${isActive ? "text-emerald-400" : "text-slate-500"}`}>
                  {r.vacancies.toLocaleString()}+
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-slate-600 text-xs mt-1">
          Total UK: <span className="font-bold text-slate-400">
            {REGIONS.reduce((s, r) => s + r.vacancies, 0).toLocaleString()}+
          </span> unfilled HGV positions
        </p>
        <p className="text-slate-500 text-xs mt-3 leading-relaxed max-w-xl">
          Regional figures are illustrative for comparison — not live vacancy data. Official labour-market stats vary by source and date.
        </p>
      </div>
    </div>
  );
}
