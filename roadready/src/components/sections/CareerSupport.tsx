"use client";

import { useState } from "react";
import Image from "next/image";
import { extraStepBoardSteps } from "@/lib/data";
import { useReveal } from "@/lib/hooks";

const BACKDROP_IMAGE = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1920";

const STEP_ICONS: Record<number, React.ReactNode> = {
  1: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  2: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  3: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
  4: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  5: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),
};

const STEP_BENEFITS: Record<number, { description: string; roadreadyShine: string }> = {
  1: {
    description: "You tell us which licence you need. We take it from there — no endless forms, no waiting in the dark.",
    roadreadyShine:
      "We aim to call you back the same day. A real person, every time — you're not a number. We care about your progression from first call through training and into work, not just closing a sale.",
  },
  2: {
    description: "Booking your D4 medical is a requirement. Knowing where to go, what to bring, and what to expect shouldn't be a puzzle.",
    roadreadyShine:
      "We're easy to work with: we tell you exactly where to go and how to prepare, and we move quickly to get your medical booked so you're not left chasing dates. Less admin, less stress — so you can focus on getting ready to drive.",
  },
  3: {
    description: "Theory and practical training with instructors who know the test and the industry. This is where your licence is won.",
    roadreadyShine:
      "We take every placement seriously — the right learner and the right instructor matter. Alongside quality instruction, you get extra learning resources and study help so you're supported preparing for theory and practical tests, not just turning up on the day.",
  },
  4: {
    description: "Pass your test, get your licence. For many providers, that's where the story ends.",
    roadreadyShine:
      "With us, your licence isn't where we leave you. We offer support with job search, CV guidance, and useful industry contacts where we can — practical next steps toward work, not only handing over a certificate. Hiring is always down to employers and the roles available; we focus on honest guidance and backup, not promises we can't keep.",
  },
  5: {
    description: "Your licence is the beginning. Getting into work means CVs, interviews, and knowing where the opportunities are — we help with all of it.",
    roadreadyShine:
      "We offer hands-on CV support tailored to logistics, connections to an experienced recruiter with links across the industry, and we actively keep an eye on new driver schemes and employer programmes that could benefit you. We do this because we know what you've invested to get here — and we want to see it pay off. Final hiring decisions always sit with employers; our job is to put you in the strongest position we can.",
  },
};

function CareerSupport() {
  const { ref, revealed } = useReveal();
  const [selectedStepNum, setSelectedStepNum] = useState<number>(1);
  const steps = extraStepBoardSteps.filter((s) => s.step <= 5);
  const selectedStep = steps.find((s) => s.step === selectedStepNum);
  const benefit = STEP_BENEFITS[selectedStepNum];

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden border border-white/15">
      <div className="absolute inset-0">
        <Image src={BACKDROP_IMAGE} alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-slate-950/80" />
      </div>
      <div ref={ref} className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${!revealed ? "opacity-0 translate-y-5" : "animate-reveal-up"}`}>
        <div className="text-center mb-14">
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
            We go the extra step for you
          </h2>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            From first enquiry to first day on the job. Click a step to see what it means — and where we go further.
          </p>
        </div>

        {/* Progress bar */}
        <div className="hidden sm:flex items-center justify-center max-w-2xl mx-auto mb-14">
          {steps.map((step, i) => (
            <div key={step.step} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => setSelectedStepNum(step.step)}
                className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center font-heading font-black text-lg transition-all duration-300 shrink-0 ${
                  step.step === selectedStepNum
                    ? "bg-amber-400 text-slate-950 ring-4 ring-amber-400/30 scale-110 shadow-lg shadow-amber-400/25"
                    : step.step < selectedStepNum
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-700 text-slate-400 hover:bg-slate-600"
                }`}
              >
                {step.step < selectedStepNum ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.step
                )}
              </button>
              {i < steps.length - 1 && (
                <div className="flex-1 h-1 mx-1">
                  <div
                    className={`h-full rounded-full transition-colors duration-300 ${
                      step.step < selectedStepNum ? "bg-emerald-600" : "bg-slate-700"
                    }`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main content card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-2xl shadow-2xl border border-amber-500/40">
          {/* Left — step list */}
          <div className="bg-white p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
            <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-10 text-center">
              <span style={{ color: "#0B2419" }}>Your </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-400">Journey</span>
            </h3>
            <div className="relative w-full max-w-sm mx-auto">
              {/* Vertical connector line */}
              <div className="absolute left-7 top-8 bottom-8 w-px bg-gray-200" />

              <div className="space-y-1">
                {steps.map((step) => {
                  const isSelected = selectedStepNum === step.step;
                  const isPast = step.step < selectedStepNum;
                  return (
                    <button
                      key={step.step}
                      type="button"
                      onClick={() => setSelectedStepNum(step.step)}
                      className={`relative w-full flex items-center gap-5 py-4 px-4 rounded-xl transition-all duration-200 ${
                        isSelected
                          ? "bg-amber-50 shadow-md"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                          isSelected
                            ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-300/40"
                            : isPast
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {isPast ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className="font-heading font-black text-sm">{step.step}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className={`shrink-0 transition-colors ${isSelected ? "text-amber-600" : isPast ? "text-emerald-600" : "text-gray-300"}`}>
                          {STEP_ICONS[step.step]}
                        </span>
                        <span
                          className={`font-bold text-lg sm:text-xl tracking-tight transition-colors ${
                            isSelected ? "text-gray-900" : isPast ? "text-gray-700" : "text-gray-400"
                          }`}
                        >
                          {step.title}
                        </span>
                      </div>
                      {isSelected && (
                        <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right — detail panel */}
          <div className="bg-gradient-to-br from-amber-500 to-amber-400 text-black p-8 sm:p-10 lg:p-12 flex flex-col justify-center min-h-[380px]">
            {selectedStep && benefit && (
              <div key={selectedStepNum} className="animate-reveal-up text-center">
                {/* Step label — inline: Step + number + of 4 */}
                <div className="mb-6 flex justify-center w-full px-2">
                  <div className="flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-black/55">
                      Step
                    </span>
                    <span className="font-heading text-2xl font-black text-black/90 tabular-nums leading-none">
                      {selectedStep.step}
                    </span>
                    <span className="text-xs font-semibold text-black/70">of 5</span>
                  </div>
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-black tracking-tight mb-4 px-2">
                  {selectedStep.title}
                </h3>
                <p className="text-black/75 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto px-2">
                  {benefit.description}
                </p>
                <div className="pt-6 border-t-2 border-amber-600/30 px-2">
                  <p className="text-xs sm:text-sm font-black uppercase tracking-[0.18em] sm:tracking-[0.22em] text-slate-900 mb-4">
                    THE ROADREADY DIFFERENCE
                  </p>
                  <p className="text-black font-semibold text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl mx-auto">
                    {benefit.roadreadyShine}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CareerSupport;
