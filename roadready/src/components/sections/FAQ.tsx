"use client";

import { useState } from "react";
import Image from "next/image";
import { useReveal } from "@/lib/hooks";

const faqs = [
  {
    q: "I have bad credit — will that stop me from enrolling?",
    a: "No. We've helped hundreds of students with poor credit history get into training. Our team works with a wide network of schools and financing partners who understand that a credit score doesn't define your work ethic or your future.",
  },
  {
    q: "I've been rejected for finance before. Is it worth trying again?",
    a: "Absolutely. A previous rejection doesn't close the door here. We assess your full situation — not just a number — and have specialist options that standard lenders simply don't offer. Many of our graduates were rejected elsewhere before coming to us.",
  },
  {
    q: "I'm on a low income. Are there options for me?",
    a: "Yes. We have income-based payment plans, deferred start options, and in some cases government-backed funding pathways. Our advisors will map out what's realistic for your situation with zero pressure.",
  },
  {
    q: "What if I can't afford the full course upfront?",
    a: "Very few of our students pay upfront. We offer flexible payment schedules designed to start small and grow as your income does once you're licensed and working.",
  },
  {
    q: "How does the consultation work? Is there any obligation?",
    a: "None at all. You speak with one of our experienced advisors, we understand your position, and we tell you honestly what we can do. No hard sell, no hidden fees discussed down the line — everything is laid out clearly from the start.",
  },
  {
    q: "How quickly can I get started once approved?",
    a: "Most students are placed into a school within 1–2 weeks of their consultation. We have partner schools nationally, so location and timing rarely hold anyone back.",
  },
];

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
        className={`relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 ${!revealed ? "opacity-0 translate-y-5" : "animate-reveal-up"}`}
      >
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-amber-400 font-semibold uppercase tracking-widest text-sm mb-3">We've heard it all before</p>
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Finance worries?{" "}
            <span className="text-amber-400 bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200 sm:text-transparent">We've got you.</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-base sm:text-lg">
            Our team has helped people in every financial situation. Bad credit, low income, prior rejections — none of it is a dealbreaker.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-slate-700 rounded-2xl overflow-hidden bg-slate-900/60 backdrop-blur-sm"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
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
                  <p className="px-6 pb-6 text-slate-400 leading-relaxed text-sm sm:text-base">{faq.a}</p>
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
    </section>
  );
}

export default FAQ;
