"use client";

import { useState } from "react";
import Image from "next/image";
import { useReveal } from "@/lib/hooks";

const faqs = [
  {
    q: "I have bad credit — will that stop me from enrolling?",
    a: "Not automatically. We’ll look at your situation and explain which routes might be realistic before you commit.",
  },
  {
    q: "I've been rejected for finance before. Is it worth trying again?",
    a: "Sometimes yes — different lenders and products exist. We’ll be upfront if we don’t think there’s a fit.",
  },
  {
    q: "I'm on a low income. Are there options for me?",
    a: "We can talk through staged payments and what funding or employer support might apply. No two cases are identical.",
  },
  {
    q: "What if I can't afford the full course upfront?",
    a: "Most people don’t pay everything in one go. We’ll outline a structure that matches what you tell us about your budget.",
  },
  {
    q: "How does the consultation work? Is there any obligation?",
    a: "It’s a conversation to check fit and next steps. You decide whether to go ahead — we won’t pressure you.",
  },
  {
    q: "How quickly can I get started once approved?",
    a: "Timing depends on course, location, and test availability. After approval we’ll give you a realistic window.",
  },
];

/** Background for the FAQ title block — replace `public/images/faq-header.jpg` with your asset. */
const FAQ_HEADER_IMAGE = "/images/faq-header.jpg";

function FAQ() {
  const { ref, revealed } = useReveal();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative bg-slate-950 overflow-hidden">
      {/* Aesthetic background image */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay">
        <Image
          src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1920"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/60 to-slate-950 pointer-events-none" />

      <div
        ref={ref}
        className={`relative ${!revealed ? "opacity-0 translate-y-5" : "animate-reveal-up"}`}
      >
        {/* Full viewport-width header band — image edge-to-edge; copy stays padded + max-width for readability */}
        <div className="relative mb-14 w-screen max-w-[100vw] left-1/2 -translate-x-1/2 overflow-hidden min-h-[220px] sm:min-h-[260px] lg:min-h-[300px] pt-20 lg:pt-28">
          <div className="absolute inset-0" aria-hidden>
            <Image
              src={FAQ_HEADER_IMAGE}
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority={false}
            />
            <div className="absolute inset-0 bg-slate-950/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/40" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-12 text-center sm:py-14 lg:py-16">
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-sm">
              Finance worries?
            </h2>
            <p className="mt-3 sm:mt-4 font-heading text-xl sm:text-2xl lg:text-3xl font-semibold text-amber-400 leading-snug max-w-2xl mx-auto drop-shadow-sm">
              We can talk it through.
            </p>
            <p className="mt-5 sm:mt-6 text-slate-300 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
              Bad credit, tight budgets, or past declines don&apos;t always rule training out. We&apos;ll be honest about what&apos;s possible.
            </p>
          </div>
        </div>

        {/* Accordion + trust — constrained column; hero above is full viewport width */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-slate-700 rounded-xl overflow-hidden bg-slate-900"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 text-left gap-4 min-h-[48px]"
                >
                  <span className="text-white font-semibold text-base sm:text-lg leading-snug">{faq.q}</span>
                  <span className={`shrink-0 w-7 h-7 rounded-full border border-amber-400/50 flex items-center justify-center transition-transform duration-300 ${open === i ? "rotate-45 bg-amber-400/10" : ""}`}>
                    <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                <div className={`grid transition-all duration-400 ease-in-out ${open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="px-4 pb-5 sm:px-6 sm:pb-6 text-slate-400 leading-relaxed text-sm sm:text-base">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust nudge */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3 text-slate-400 text-sm">
              <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              No obligation consultation
            </div>
            <div className="flex items-center gap-3 text-slate-400 text-sm">
              <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              All credit situations considered
            </div>
            <div className="flex items-center gap-3 text-slate-400 text-sm">
              <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Nationwide school network
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
