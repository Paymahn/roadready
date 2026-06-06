"use client";

import { stats } from "@/lib/data";
import { useCountUp } from "@/lib/hooks";

function StatCounter({ stat }: { stat: (typeof stats)[number] }) {
  const { count, ref } = useCountUp(stat.value);
  return (
    <div ref={ref} className="text-center group">
      <div className="inline-flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl px-6 py-5 w-full hover:bg-white/8 hover:border-amber-400/30 transition-all duration-300">
        <div className="text-4xl sm:text-5xl font-extrabold text-white mb-1 tracking-tight">
          {stat.value % 1 !== 0 ? count.toFixed(1) : Math.floor(count)}
          <span className="text-amber-400">{stat.suffix}</span>
        </div>
        <div className="text-xs font-medium text-white/50 uppercase tracking-widest mt-1">{stat.label}</div>
      </div>
    </div>
  );
}

function TrustStrip() {
  return (
    <section className="relative py-16 lg:py-20" style={{ background: "#0A2318" }}>
      {/* Top amber accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5" />
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {stats.map((stat) => (
            <StatCounter key={stat.label} stat={stat} />
          ))}
        </div>

        {/* Accreditations row */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <span className="text-xs font-semibold text-white/30 uppercase tracking-widest mr-2">Accredited by</span>
          {[
            {
              label: "DVSA Approved",
              icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
            },
            {
              label: "JAUPT Registered",
              icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />,
            },
            {
              label: "RTITB Accredited",
              icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />,
            },
          ].map((badge) => (
            <span
              key={badge.label}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400/10 border border-amber-400/40 rounded-full text-sm font-bold text-amber-300 hover:bg-amber-400/15 hover:border-amber-400/60 transition-all duration-200"
            >
              <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {badge.icon}
              </svg>
              {badge.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustStrip;
