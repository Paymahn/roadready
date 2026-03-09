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

      <div ref={ref} className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${!revealed ? "opacity-0 translate-y-5" : "animate-reveal-up"}`}>
        <div className="relative inline-block rounded-2xl overflow-hidden mb-6 px-8 py-8 w-full max-w-3xl mx-auto">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1200"
              alt=""
              fill
              className="object-cover"
              sizes="800px"
            />
            <div className="absolute inset-0 bg-slate-950/75" />
          </div>
          <h2 className="relative font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            This Licence Opens{" "}
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">An Entire Career</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto mb-14">
          <p className="text-xl text-slate-300 leading-relaxed mb-6">
            It&apos;s not just a licence — it&apos;s the entry point to a whole new field.
          </p>
          <div className="inline-block bg-white/5 border border-amber-400/20 rounded-xl p-6 sm:p-8 backdrop-blur-sm text-left shadow-lg max-w-2xl mx-auto">
            <div className="flex items-start gap-4">
              <svg className="w-7 h-7 text-amber-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <div>
                <p className="text-white font-extrabold text-lg sm:text-xl mb-2">Real Progression</p>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  Many of our graduates who started exactly where you are today have quickly progressed up this very ladder to build secure, high-earning lives for themselves. The ceiling is higher than you think.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto mb-16 text-left">
          {careerPaths.map((path) => (
            <div key={path.role} className="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-2xl p-6 shadow-xl hover:border-amber-400/40 hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-amber-400/10 group-hover:border-amber-400/30 transition-all duration-300">
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
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          {/* subtle glow behind CTA */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-500/10 blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl text-white mb-4 font-bold font-heading">
              Ready for a fresh start?
            </h3>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              If you want a career with real progression and financial security — <span className="text-white font-semibold flex-1">this is where it begins</span>.
            </p>
            <button
              onClick={onEnquire}
              className="inline-flex items-center justify-center w-full sm:w-auto gap-2 px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white text-lg sm:text-xl font-bold rounded-full transition-all duration-200 shadow-lg shadow-emerald-900/50 hover:shadow-emerald-600/50 border-2 border-emerald-500 animate-[pulse-soft_2s_ease-in-out_infinite]"
            >
              Start Your New Chapter
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FinalCTA;
