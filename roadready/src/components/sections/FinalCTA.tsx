"use client";

import { useReveal } from "@/lib/hooks";
import Image from "next/image";

function FinalCTA({ onEnquire }: { onEnquire: () => void }) {
  const { ref, revealed } = useReveal();

  const careerPaths = [
    { role: "Owner-Operator", earnings: "£50k - £85k+" },
    { role: "Heavy Haulage Driver", earnings: "£50k - £75k+" },
    { role: "Specialist / ADR Driver", earnings: "£45k - £65k+" },
    { role: "Fleet Manager", earnings: "£40k - £60k+" },
    { role: "International Haulage", earnings: "£45k - £60k+" },
    { role: "Long-Haul Trunking", earnings: "£40k - £55k+" },
  ];

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-slate-950 border-t border-slate-800">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay">
        <Image
          src="https://images.unsplash.com/photo-1541882822188-7ee24075f1ec?auto=format&fit=crop&q=80&w=1920"
          alt="Happy successful truck driver"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950 pointer-events-none" />

      <div
        ref={ref}
        className={`relative ${!revealed ? "opacity-0 translate-y-5" : "animate-reveal-up"}`}
      >
        {/* Full viewport-width headline band — image edge-to-edge; copy stays padded */}
        <div className="relative mb-8 sm:mb-10 w-screen max-w-[100vw] left-1/2 -translate-x-1/2 overflow-hidden min-h-[220px] sm:min-h-[260px] lg:min-h-[300px] flex items-center py-14 sm:py-16 lg:py-20">
          <div className="absolute inset-0" aria-hidden>
            <Image
              src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1920"
              alt="HGV training and career progression"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-slate-950/75" />
          </div>
          <h2 className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight text-center leading-tight">
            A pathway to{" "}
            <span className="block mt-2 sm:mt-3 text-amber-400 uppercase tracking-[0.12em] sm:tracking-[0.16em]">
              LIFE CHANGING PROGRESSION
            </span>
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto mb-14">
          <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4">
            <p className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">
              Real Progression
            </p>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              Many drivers build on a first licence with extra categories, endorsements, or fleet roles over time. What you start with doesn&apos;t have to be where you stop.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto mb-16 text-left">
          {careerPaths.map((path) => (
            <div key={path.role} className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-sm hover:border-slate-600 transition-colors duration-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-white text-lg">{path.role}</h3>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/20 text-amber-400 font-bold text-sm px-3.5 py-1.5 rounded-full shadow-inner">
                Est. earnings: {path.earnings}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-md relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl text-white mb-4 font-bold font-heading">
              Ready for a fresh start?
            </h3>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              If you want a career with real progression and financial security — <span className="text-white font-semibold flex-1">this is where it begins</span>.
            </p>
            <button
              onClick={onEnquire}
              className="inline-flex items-center justify-center w-full sm:w-auto gap-2 px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white text-lg sm:text-xl font-bold rounded-full transition-colors duration-200 shadow-md border-2 border-emerald-500"
            >
              Start Your New Chapter
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

export default FinalCTA;
