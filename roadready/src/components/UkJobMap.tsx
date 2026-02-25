"use client";

import { useState } from "react";
import { REGION_PATHS } from "@/lib/ukMapPaths";

// Region config: vacancies, sub-areas, and pin position on the SVG map
// Pin positions (cx, cy) are in the 500×700 viewBox coordinate space
// Derived from computed centroids: x=(lon+8)/10*500, y=(61.5-lat)/12*700
const REGIONS = [
  {
    id: "Scotland",
    name: "Scotland",
    vacancies: 4800,
    includes: "Glasgow, Edinburgh, Aberdeen",
    // Glasgow centroid approx: lon=-4.2, lat=56.8
    pin: { cx: 191, cy: 217 },
  },
  {
    id: "North East",
    name: "North East",
    vacancies: 3100,
    includes: "Newcastle, Sunderland, Durham",
    // lon=-1.43, lat=54.82
    pin: { cx: 329, cy: 306 },
  },
  {
    id: "North West",
    name: "North West",
    vacancies: 6800,
    includes: "Manchester, Liverpool, Lancashire",
    // lon=-2.65, lat=53.72
    pin: { cx: 268, cy: 370 },
  },
  {
    id: "Yorkshire",
    name: "Yorkshire",
    vacancies: 5200,
    includes: "Leeds, Sheffield, Bradford, Hull",
    // lon=-1.25, lat=53.82
    pin: { cx: 338, cy: 364 },
  },
  {
    id: "East Midlands",
    name: "East Midlands",
    vacancies: 4200,
    includes: "Nottingham, Leicester, Derby",
    // lon=-0.93, lat=52.75
    pin: { cx: 354, cy: 426 },
  },
  {
    id: "West Midlands",
    name: "West Midlands",
    vacancies: 6100,
    includes: "Birmingham, Coventry, Wolverhampton",
    // lon=-1.94, lat=52.42
    pin: { cx: 303, cy: 445 },
  },
  {
    id: "East of England",
    name: "East of England",
    vacancies: 4800,
    includes: "Cambridge, Norwich, Essex",
    // lon=0.41, lat=52.04
    pin: { cx: 421, cy: 467 },
  },
  {
    id: "London",
    name: "London",
    vacancies: 8200,
    includes: "Greater London boroughs",
    // lon=-0.12, lat=51.50
    pin: { cx: 394, cy: 499 },
  },
  {
    id: "South East",
    name: "South East",
    vacancies: 7200,
    includes: "Kent, Surrey, Sussex, Hampshire",
    // lon=-0.24, lat=51.14
    pin: { cx: 388, cy: 520 },
  },
  {
    id: "South West",
    name: "South West",
    vacancies: 4100,
    includes: "Bristol, Plymouth, Devon, Cornwall",
    // lon=-2.92, lat=51.14
    pin: { cx: 255, cy: 520 },
  },
  {
    id: "Wales",
    name: "Wales",
    vacancies: 2800,
    includes: "Cardiff, Swansea, Newport",
    // lon=-3.70, lat=52.30
    pin: { cx: 216, cy: 454 },
  },
  {
    id: "Northern Ireland",
    name: "Northern Ireland",
    vacancies: 1900,
    includes: "Belfast, Derry",
    // lon=-6.70, lat=54.70
    pin: { cx: 66, cy: 313 },
  },
] as const;

const REGION_COLORS: Record<string, { fill: string; hover: string; active: string }> = {
  Scotland: { fill: "#1A3D2B", hover: "#2D5C40", active: "#10B981" },
  "North East": { fill: "#1A3D2B", hover: "#2D5C40", active: "#10B981" },
  "North West": { fill: "#1E3828", hover: "#2D5C40", active: "#10B981" },
  Yorkshire: { fill: "#1A3D2B", hover: "#2D5C40", active: "#10B981" },
  "East Midlands": { fill: "#1A3D2B", hover: "#2D5C40", active: "#10B981" },
  "West Midlands": { fill: "#1E3828", hover: "#2D5C40", active: "#10B981" },
  "East of England": { fill: "#1A3D2B", hover: "#2D5C40", active: "#10B981" },
  London: { fill: "#1E3828", hover: "#2D5C40", active: "#10B981" },
  "South East": { fill: "#1A3D2B", hover: "#2D5C40", active: "#10B981" },
  "South West": { fill: "#1E3828", hover: "#2D5C40", active: "#10B981" },
  Wales: { fill: "#162E20", hover: "#2D5C40", active: "#10B981" },
  "Northern Ireland": { fill: "#162E20", hover: "#2D5C40", active: "#10B981" },
};

export default function UkJobMap() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const activeId = hoveredId || selectedId;
  const activeRegion = REGIONS.find((r) => r.id === activeId);

  function handleRegionClick(id: string) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start w-full max-w-5xl mx-auto">
      {/* SVG Map */}
      <div className="w-full lg:w-[55%] shrink-0">
        <svg
          viewBox="0 0 500 700"
          className="w-full h-auto"
          style={{ maxHeight: "600px" }}
        >
          <rect width="500" height="700" fill="transparent" />

          {/* Region fill layers */}
          {Object.entries(REGION_PATHS).map(([regionName, paths]) => {
            const isActive = activeId === regionName;
            const colors = REGION_COLORS[regionName] ?? { fill: "#1A3D2B", hover: "#2D5C40", active: "#10B981" };
            return (
              <g key={regionName}>
                {paths.map((d, i) => (
                  <path
                    key={i}
                    d={d}
                    fill={isActive ? colors.active : colors.fill}
                    stroke="#0D2B1F"
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

          {/* Vacancy labels — shown on hover/click at the region centroid */}
          {REGIONS.map((r) => {
            const isActive = activeId === r.id;
            if (!isActive) return null;
            return (
              <g key={`label-${r.id}`} style={{ pointerEvents: "none" }}>
                {/* Background pill */}
                <rect
                  x={r.pin.cx - 32}
                  y={r.pin.cy - 14}
                  width={64}
                  height={28}
                  rx={14}
                  fill="#0F172A"
                  fillOpacity={0.85}
                  stroke="#FBBF24"
                  strokeWidth={1.5}
                />
                {/* Vacancy count text */}
                <text
                  x={r.pin.cx}
                  y={r.pin.cy + 5}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="bold"
                  fill="#FBBF24"
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
          <div className="p-6 rounded-2xl bg-slate-800/80 border-2 border-amber-500/40 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="font-heading text-2xl font-bold text-white">{activeRegion.name}</h3>
                <p className="text-slate-400 text-sm mt-1">{activeRegion.includes}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-4xl font-extrabold text-amber-400">
                  {activeRegion.vacancies.toLocaleString()}+
                </div>
                <div className="text-slate-500 text-xs mt-0.5">HGV vacancies</div>
              </div>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500"
                style={{ width: `${(activeRegion.vacancies / 8200) * 100}%` }}
              />
            </div>
            <p className="text-slate-500 text-xs mt-1.5">Relative to highest region (London: 8,200)</p>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700 flex items-center justify-center min-h-[160px]">
            <p className="text-slate-500 text-sm text-center">Hover or click a region on the map</p>
          </div>
        )}

        {/* All regions list */}
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
                className={`text-left px-3 py-2.5 rounded-xl border transition-all duration-150 text-sm
                  ${isActive
                    ? "bg-amber-500/15 border-amber-400/50 text-white"
                    : "bg-slate-800/40 border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
                  }`}
              >
                <span className="font-semibold block truncate">{r.name}</span>
                <span className={`text-xs font-bold ${isActive ? "text-amber-400" : "text-slate-500"}`}>
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
      </div>
    </div>
  );
}
