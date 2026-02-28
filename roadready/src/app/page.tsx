"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useEnquiry } from "@/context/EnquiryContext";
import { courses, stats, howItWorksSteps, extraStepBoardSteps, comparisonRows, shortageStats, trainingLocations, successStories } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import CourseCategoryIcon from "@/components/CourseCategoryIcon";
import UkJobMap from "@/components/UkJobMap";

// Animated counter hook
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(interval); }
      else { setCount(Math.floor(current * 10) / 10); }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [started, target, duration]);

  return { count, ref };
}

// Scroll-reveal hook: when element enters viewport, set revealed to true for animation
function useReveal(opts?: { threshold?: number; rootMargin?: string }) {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
      { threshold: opts?.threshold ?? 0.15, rootMargin: opts?.rootMargin ?? "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [opts?.threshold, opts?.rootMargin]);
  return { ref, revealed };
}

export default function HomePage() {
  const { openEnquiry } = useEnquiry();
  return (
    <>
      <HeroSection onEnquire={openEnquiry} />
      <TrustStrip />
      <CareerSupport />
      <StudyTools />
      <DriverShortage onEnquire={openEnquiry} />

      <CoursePreview onEnquire={openEnquiry} />
      <NationwideTraining />

      <SuccessStories />
      <FinalCTA onEnquire={openEnquiry} />
    </>
  );
}

// ── HERO ────────────────────────────────────────────────
// ── HERO ADVANTAGE TABS DATA ────────────────────────────
const ADVANTAGES = [
  {
    keyword: "Affordable",
    subheading: "Transparent pricing. No hidden fees.",
    detail: "We leverage our industry networks and long-standing contacts to negotiate the best rates — and pass those savings directly to you. Every quote is upfront, fully itemised, and includes everything you need. No surprise charges, no 'extras' at the end. What we quote is what you pay.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200",
    accent: "emerald",
  },
  {
    keyword: "Full Support",
    subheading: "From first enquiry to first payday.",
    detail: "We have a proven track record of guiding people from their very first phone call to becoming fully qualified, paid drivers. We handle the paperwork, book your medicals, schedule your training, and stay by your side through every test and milestone. You're never left figuring it out alone.",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1200",
    accent: "amber",
  },
  {
    keyword: "Customer Service",
    subheading: "You're starting a new chapter — we make it seamless.",
    detail: "Changing careers can feel overwhelming, but it doesn't have to be. Our team is available 7 days a week, responds within hours, and treats every trainee like family. Real people, real answers, real care — from your first question to your hundredth.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200",
    accent: "white",
  },
  {
    keyword: "Job Placement",
    subheading: "Your licence is just the beginning.",
    detail: "We don't disappear once you pass. Our career team helps you build a professional CV tailored to logistics, connects you with our network of haulage firms and agencies, and coaches you through interviews. We stay until you're employed — and even after.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
    accent: "slate",
  },
] as const;

const ACCENT_STYLES: Record<string, { active: string; idle: string; text: string; indicator: string }> = {
  emerald: { active: "border-amber-400 bg-white shadow-lg", idle: "border-slate-200 bg-white/90 hover:border-amber-300 hover:bg-white hover:shadow-sm", text: "text-emerald-400", indicator: "bg-amber-400" },
  amber: { active: "border-amber-400 bg-white shadow-lg", idle: "border-slate-200 bg-white/90 hover:border-amber-300 hover:bg-white hover:shadow-sm", text: "text-amber-400", indicator: "bg-amber-400" },
  white: { active: "border-amber-400 bg-white shadow-lg", idle: "border-slate-200 bg-white/90 hover:border-amber-300 hover:bg-white hover:shadow-sm", text: "text-white", indicator: "bg-amber-400" },
  slate: { active: "border-amber-400 bg-white shadow-lg", idle: "border-slate-200 bg-white/90 hover:border-amber-300 hover:bg-white hover:shadow-sm", text: "text-slate-300", indicator: "bg-amber-400" },
};

function HeroSection({ onEnquire }: { onEnquire: () => void }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = ADVANTAGES[activeIdx];
  const accentStyle = ACCENT_STYLES[active.accent];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 grain">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        {/* Full-width header spanning the top */}
        <div className="text-center mb-16 lg:mb-20 animate-slide-up">
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[1.1] tracking-tight">
            Your New Career Starts With<br className="hidden sm:block" />
            <span className="block mt-2 lg:mt-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 font-sans font-black uppercase tracking-tighter drop-shadow-md text-6xl sm:text-7xl lg:text-[6.5rem] xl:text-[8rem] leading-none">
              RoadReady
            </span>
          </h1>
        </div>

        {/* Success stories banner */}
        <a
          href="#success-stories"
          className="group relative block w-full overflow-hidden rounded-2xl py-5 sm:py-7 px-6 text-center mb-14 transition-all duration-300 hover:scale-[1.02] animate-slide-up shadow-lg hover:shadow-xl"
          style={{ animationDelay: "0.05s", background: "linear-gradient(135deg, #ffffff 0%, #FEF3C7 50%, #ffffff 100%)" }}
        >
          {/* Shimmer sweep */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          <span className="relative font-heading text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight" style={{ color: "#0B2419" }}>
            Our latest success stories!&nbsp;
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </span>
        </a>

        {/* Section title */}
        <div className="flex items-center gap-5 justify-center mb-12 animate-slide-up" style={{ animationDelay: "0.05s" }}>
          <div className="h-px bg-gradient-to-r from-transparent to-white/20 w-24 sm:w-40" />
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-amber-400 tracking-wide text-center uppercase">
            The RoadReady Advantage
          </h2>
          <div className="h-px bg-gradient-to-l from-transparent to-white/20 w-24 sm:w-40" />
        </div>

        {/* Interactive tabbed layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 animate-slide-up" style={{ animationDelay: "0.1s" }}>

          {/* Left Column: Keyword Tabs */}
          {/* Mobile: horizontal scroll row  |  Desktop: vertical stack */}
          <div className="w-full lg:w-[38%] shrink-0">
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 snap-x snap-mandatory lg:snap-none scrollbar-hide">
              {ADVANTAGES.map((adv, idx) => {
                const isActive = activeIdx === idx;
                const style = ACCENT_STYLES[adv.accent];
                return (
                  <button
                    key={adv.keyword}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    className={`group relative text-left rounded-2xl border-2 p-5 sm:p-6 transition-all duration-300 snap-start shrink-0 w-[75vw] sm:w-auto outline-none ${isActive ? style.active : style.idle}`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 rounded-r-full bg-amber-400 hidden lg:block" />
                    )}
                    <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight mb-1 transition-colors" style={{ color: "#0B2419" }}>
                      {adv.keyword}
                    </h3>
                    <p className={`text-sm sm:text-base font-medium leading-snug transition-colors ${isActive ? "text-gray-600" : "text-gray-500 group-hover:text-gray-600"}`}>
                      {adv.subheading}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Image + Glass Text Overlay */}
          <div className="w-full lg:flex-1 relative">
            <div className="relative w-full rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-white/10 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
              {/* Swappable Image */}
              {ADVANTAGES.map((adv, idx) => (
                <img
                  key={adv.keyword}
                  src={adv.image}
                  alt={adv.keyword}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${activeIdx === idx ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              {/* Dark gradient for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

              {/* Glass Text Panel — pinned to bottom */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                <div className="backdrop-blur-xl bg-white/[0.07] border border-white/[0.12] rounded-2xl p-5 sm:p-7 shadow-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-2 h-2 rounded-full ${accentStyle.indicator}`} />
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white/50">
                      The RoadReady Promise
                    </span>
                  </div>
                  <p className="text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed font-medium">
                    {active.detail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-14 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <button
            onClick={onEnquire}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white text-lg font-semibold rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-emerald-600/25 active:scale-95 min-h-[48px]"
          >
            Start Your Journey
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <a
            href="#courses"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent hover:bg-white/10 border border-white/30 text-white text-lg font-medium rounded-full transition-all duration-200 backdrop-blur-sm min-h-[48px]"
          >
            View Courses
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 mt-8 animate-slide-up" style={{ animationDelay: "0.25s" }}>
          <div className="flex items-center gap-2 text-white/60">
            <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
            <span className="text-xs font-medium">256-bit Bank-Grade Encryption</span>
          </div>
          <div className="flex items-center gap-2 text-white/60">
            <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            <span className="text-xs font-medium">DVSA-Compliant Infrastructure</span>
          </div>
          <div className="flex items-center gap-2 text-white/60">
            <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg>
            <span className="text-xs font-medium">Zero Hidden Fees. 100% Secure.</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#courses" className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 hover:text-white/80 transition-colors" aria-label="Scroll down">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <svg className="w-5 h-5 animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </section >
  );
}

// ── TRUST STRIP ─────────────────────────────────────────
function TrustStrip() {
  return (
    <section className="relative py-16 lg:py-20" style={{ background: "#0A2318" }}>
      {/* Top amber accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {stats.map((stat) => {
            const { count, ref } = useCountUp(stat.value);
            return (
              <div key={stat.label} ref={ref} className="text-center group">
                <div className="inline-flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl px-6 py-5 w-full hover:bg-white/8 hover:border-amber-400/30 transition-all duration-300">
                  <div className="text-4xl sm:text-5xl font-extrabold text-white mb-1 tracking-tight">
                    {stat.value % 1 !== 0 ? count.toFixed(1) : Math.floor(count)}
                    <span className="text-amber-400">{stat.suffix}</span>
                  </div>
                  <div className="text-xs font-medium text-white/50 uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
              </div>
            );
          })}
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


// ── COURSE PREVIEW ──────────────────────────────────────
function CoursePreview({ onEnquire }: { onEnquire: (course?: string) => void }) {
  const { ref, revealed } = useReveal();
  const topCourses = courses.filter((c) => ["hgv-cat-c", "hgv-cat-ce", "forklift-counterbalance", "hgv-cat-c-ce-combo"].includes(c.slug));

  return (
    <section className="py-20 lg:py-28 bg-slate-900">
      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${!revealed ? "opacity-0 translate-y-5" : "animate-reveal-up"}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
          <div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-3 tracking-tight">Our Courses</h2>
            <p className="text-lg text-slate-400">Everything included. Enquire for details on any course.</p>
          </div>
          <Link
            href="/courses"
            className="mt-4 sm:mt-0 text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors inline-flex items-center gap-1"
          >
            View all courses
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {topCourses.map((course) => (
            <div
              key={course.slug}
              className="group bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-400/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-44 relative flex items-center justify-center overflow-hidden">
                <img
                  src={
                    course.slug === "hgv-cat-c" ? "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800" :
                      course.slug === "hgv-cat-ce" ? "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800" :
                        course.slug === "hgv-cat-c-ce-combo" ? "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800" :
                          "https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&q=80&w=800"
                  }
                  alt={course.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/30 transition-colors" />
                <CourseCategoryIcon category={course.category} className="w-10 h-10 text-white relative z-10" />

                {course.slug === "hgv-cat-c-ce-combo" && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-white rounded-full shadow-md z-10">
                    Most Popular
                  </span>
                )}
                {course.slug !== "hgv-cat-c-ce-combo" && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-white/90 text-dark rounded-full shadow-md z-10 backdrop-blur-sm">
                    {course.category}
                  </span>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{course.description}</p>

                <p className="text-xs text-slate-500 mb-4">
                  All-inclusive · {course.duration}
                </p>

                <button
                  onClick={() => onEnquire(course.slug)}
                  className="w-full py-3 bg-emerald-600/10 hover:bg-emerald-600 text-emerald-400 hover:text-white text-base font-bold rounded-full border border-emerald-600/20 hover:border-transparent transition-all duration-200"
                >
                  Enquire
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

// Step icon SVG by key
function StepIcon({ keyName, className }: { keyName: "phone" | "medical" | "train" | "drive"; className?: string }) {
  const c = className ?? "w-8 h-8 text-emerald-600";
  switch (keyName) {
    case "phone":
      return (
        <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      );
    case "medical":
      return (
        <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    case "train":
      return (
        <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      );
    case "drive":
      return (
        <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l-3 3m0 0l-3-3m3 3V14" />
        </svg>
      );
    default:
      return null;
  }
}


// Avatar initials from "Dave M." -> "DM"
function getInitials(name: string) {
  return name
    .split(/[\s.]+/)
    .filter(Boolean)
    .map((s) => s[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ── DRIVER SHORTAGE ─────────────────────────────────────
function DriverShortage({ onEnquire }: { onEnquire: () => void }) {
  const { ref, revealed } = useReveal();
  const stat1 = useCountUp(60000, 2500);
  const stat2 = useCountUp(38, 2000);
  const stat3 = useCountUp(89, 2000);
  const stat4 = useCountUp(12, 1800);

  const statItems = [
    { ...stat1, label: "Unfilled HGV positions in the UK", suffix: "+", prefix: "" },
    { ...stat2, label: "Average HGV driver salary", suffix: "k", prefix: "£" },
    { ...stat3, label: "Graduates employed within 4 weeks", suffix: "%", prefix: "" },
    { ...stat4, label: "Industry growth forecast", suffix: "%", prefix: "" },
  ];

  const statColors = ["text-red-600", "text-emerald-600", "text-emerald-600", "text-emerald-600"];

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/8 via-red-500/3 to-transparent" />
      <div ref={ref} className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${!revealed ? "opacity-0 translate-y-5" : "animate-reveal-up"}`}>
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/15 text-red-600 text-sm font-bold rounded-full border border-red-500/30 mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
            National driver shortage
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark mb-4 tracking-tight">
            The UK Needs{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">60,000+ Drivers</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            There&apos;s never been a better time to get qualified. The logistics industry is desperate for drivers — and the salaries reflect it. Your opportunity starts here.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statItems.map((stat, i) => (
            <div key={i} ref={stat.ref} className="bg-slate-800 border-2 border-amber-400/40 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg hover:border-amber-400 transition-all duration-300">
              <div className={`text-3xl sm:text-4xl font-extrabold mb-2 flex items-center justify-center gap-1 ${statColors[i]}`}>
                {stat.prefix}{stat.count >= 1000 ? `${Math.round(stat.count).toLocaleString()}` : Math.round(stat.count)}{stat.suffix}
                {i === 3 && (
                  <svg className="w-6 h-6 text-emerald-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                )}
              </div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-12">
          <UkJobMap />
        </div>

        {/* Industry Placement Strip */}
        <div className="mb-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
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
              body: "We coach you on exactly what employers ask, what to wear, what to bring, and how to stand out. 89% of our graduates land a role within 4 weeks.",
            },
          ].map(({ icon, label, body }) => (
            <div key={label} className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-400 flex items-center justify-center shrink-0">
                  {icon}
                </div>
                <span className="font-bold text-white text-lg">{label}</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-sm">{body}</p>
            </div>
          ))}
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

          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 mt-6">
            <div className="flex items-center gap-2 text-white/60">
              <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
              <span className="text-xs font-medium">256-bit Bank-Grade Encryption</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              <span className="text-xs font-medium">DVSA-Compliant Infrastructure</span>
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

// Icon for Extra Step Board (standard + extra keys)
function ExtraStepBoardIcon({ keyName, className }: { keyName: "phone" | "medical" | "train" | "drive" | "cv" | "contacts" | "interview" | "support"; className?: string }) {
  const c = className ?? "w-7 h-7";
  const svg = (path: React.ReactNode) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>{path}</svg>;
  switch (keyName) {
    case "phone":
      return svg(<path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />);
    case "medical":
      return svg(<path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />);
    case "train":
      return svg(<path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />);
    case "drive":
      return svg(<path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l-3 3m0 0l-3-3m3 3V14" />);
    case "cv":
      return svg(<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />);
    case "contacts":
      return svg(<path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />);
    case "interview":
      return svg(<path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />);
    case "support":
      return svg(<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />);
    default:
      return null;
  }
}

// Step 1–4 copy: what it is + how RoadReady shines
const STEP_BENEFITS: Record<number, { description: string; roadreadyShine: string }> = {
  1: {
    description: "You tell us which licence you need. We take it from there — no endless forms, no waiting in the dark.",
    roadreadyShine: "We call you back within 2 hours. A real person, every time. You’re not a number; you’re the start of a career we care about.",
  },
  2: {
    description: "Booking your D4 medical is a requirement. Knowing where to go, what to bring, and what to expect shouldn’t be a puzzle.",
    roadreadyShine: "We tell you exactly where to go and how to prepare. One less thing to worry about — so you can focus on getting ready to drive.",
  },
  3: {
    description: "Theory and practical training with instructors who know the test and the industry. This is where your licence is won.",
    roadreadyShine: "Expert instructors and a 94% first-time pass rate. We prepare you properly so you pass once and move on.",
  },
  4: {
    description: "Pass your test, get your licence. For many providers, that’s where the story ends.",
    roadreadyShine: "With us it’s just the beginning. Job placement support, CV help, and industry contacts — we help you get into work, not just get a certificate.",
  },
};

// ── CAREER SUPPORT (Extra Step Board) ──────────────────────────────────────
function CareerSupport() {
  const { ref, revealed } = useReveal();
  const [selectedStepNum, setSelectedStepNum] = useState<number | null>(1);
  const firstFourSteps = extraStepBoardSteps.filter((s) => s.step <= 4);
  const selectedStep = selectedStepNum !== null ? firstFourSteps.find((s) => s.step === selectedStepNum) : null;
  const benefit = selectedStepNum !== null ? STEP_BENEFITS[selectedStepNum] : null;

  return (
    <section className="py-20 lg:py-28">
      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${!revealed ? "opacity-0 translate-y-5" : "animate-reveal-up"}`}>
        {/* Headline and subtitle over the box */}
        <div className="text-center mb-10">
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
            We go the extra step for you
          </h2>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            From first enquiry to first day on the job. Click a step to see what it means — and where we go further.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-2xl shadow-2xl">
          {/* Column 1: White — steps 1–4 only, premium, clickable */}
          <div className="bg-white p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-black tracking-tight text-center mb-8">
              Your journey
            </h3>
            <div className="space-y-1">
              {firstFourSteps.map((step) => {
                const isSelected = selectedStepNum === step.step;
                return (
                  <button
                    key={step.step}
                    type="button"
                    onClick={() => setSelectedStepNum(step.step)}
                    className={`w-full text-left flex items-center gap-5 sm:gap-6 py-4 sm:py-5 px-4 sm:px-5 rounded-xl transition-all duration-200 border-2 ${isSelected ? "border-black bg-black/5" : "border-transparent hover:border-black/20 hover:bg-black/[0.02]"
                      }`}
                  >
                    <span
                      className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight tabular-nums ${isSelected ? "text-black" : "text-black/50"
                        }`}
                    >
                      {step.step}
                    </span>
                    <span
                      className={`font-semibold text-lg sm:text-xl lg:text-2xl tracking-tight ${isSelected ? "text-black" : "text-black/70"
                        }`}
                    >
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column 2: Gold — what the step is + RoadReady shines */}
          <div className="bg-amber-500/95 text-black p-8 sm:p-10 lg:p-12 flex flex-col justify-center min-h-[320px]">
            {selectedStep && benefit ? (
              <div className="animate-reveal-up text-center">
                <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-black tracking-tight mb-4">
                  Step {selectedStep.step} — {selectedStep.title}
                </h3>
                <p className="text-black/80 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
                  {benefit.description}
                </p>
                <div className="pt-6 border-t-2 border-amber-600/40 max-w-xl mx-auto">
                  <p className="text-sm font-bold uppercase tracking-widest text-amber-800/90 mb-3">
                    Where RoadReady shines
                  </p>
                  <p className="text-black font-semibold text-lg sm:text-xl leading-relaxed">
                    {benefit.roadreadyShine}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-black/60 text-lg text-center">Select a step to see what it involves and how we help.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── NATIONWIDE TRAINING ─────────────────────────────────
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

// ── STUDY TOOLS ─────────────────────────────────────────
function StudyTools() {
  const { ref, revealed } = useReveal();
  const tools = [
    {
      title: "Spaced Repetition Study Tool",
      description: "Our AI-powered tool uses the Ebbinghaus forgetting curve and Leitner system — the same science behind Duolingo and Anki. Questions you struggle with come back more often. 15 minutes a day beats 5 hours of cramming. Included free with every course, forever.",
      icon: (
        <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 0 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
        </svg>
      ),
      badge: "Free with every course",
      badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    },
    {
      title: "User Hub",
      description: "Your personal dashboard to track study progress, review weak areas, access all learning tools, and manage your entire training journey — from first enquiry to first day on the job.",
      icon: (
        <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      ),
      badge: "Coming Soon",
      badgeColor: "bg-slate-700/50 text-slate-400 border-slate-600",
    },
    {
      title: "Driver Wellness Hub",
      description: "We\u2019re championing physical and mental health in the driving industry. Back care, nutrition on the road, sleep hygiene, mental health check-ins, and financial planning — because your wellbeing matters as much as your licence.",
      icon: (
        <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      ),
      badge: "Coming Soon",
      badgeColor: "bg-slate-700/50 text-slate-400 border-slate-600",
    },
  ];

  return (
    <section id="study-tools" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Dark green background matching site theme */}
      <div className="absolute inset-0 grain">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${!revealed ? "opacity-0 translate-y-5" : "animate-reveal-up"}`}>
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 lg:items-start">
          {/* Image — repositioned to left on desktop, top on mobile */}
          <div className="w-full lg:w-[42%] order-2 lg:order-1 shrink-0">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/10 to-emerald-500/10 rounded-[2rem] blur-2xl" />
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
                alt="RoadReady Study App Interface"
                className="relative w-full h-auto rounded-2xl shadow-2xl ring-1 ring-white/10 object-cover aspect-[4/3] lg:aspect-[3/4]"
              />
            </div>
          </div>

          {/* Content side */}
          <div className="w-full lg:flex-1 order-1 lg:order-2">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[3.5rem] font-bold text-white leading-[1.15] tracking-tight mb-6">
              We Create Our Own{" "}
              <span className="font-heading text-amber-400 block mt-2 text-5xl sm:text-6xl lg:text-7xl xl:text-[4rem]">
                Study Materials
              </span>
            </h2>

            <p className="text-xl sm:text-2xl text-slate-400 leading-relaxed max-w-2xl mb-12">
              Most schools hand you a textbook. We built AI-powered study tools backed by cognitive science — included free with every course, and we never stop improving them.
            </p>

            <div className="space-y-10">
              {tools.map((tool) => (
                <div key={tool.title} className="flex gap-6 p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
                  <div className="w-14 h-14 shrink-0 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    {tool.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-white">{tool.title}</h3>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${tool.badgeColor}`}>
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-slate-400 text-lg leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-slate-700/50">
              <p className="text-slate-500 text-base max-w-xl">
                Based on the Ebbinghaus forgetting curve — proven to improve long-term retention by up to 400% vs traditional study methods.
              </p>
            </div>
          </div>
        </div>
      </div >
    </section >
  );
}

// ── SUCCESS STORIES ─────────────────────────────────────
function SuccessStories() {
  const { ref, revealed } = useReveal();
  const featured = successStories.find((s) => s.featured);
  const others = successStories.filter((s) => !s.featured);
  const [expandedStory, setExpandedStory] = useState<string | null>(null);

  const toggleStory = (name: string) => {
    setExpandedStory((prev) => (prev === name ? null : name));
  };

  const firstName = (name: string) => name.split(" ")[0];

  return (
    <section id="success-stories" className="py-20 lg:py-28 bg-slate-900">
      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${!revealed ? "opacity-0 translate-y-5" : "animate-reveal-up"}`}>
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-600/10 text-emerald-600 text-sm font-semibold rounded-full border border-emerald-600/20 mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            Graduate profiles
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark mb-3 tracking-tight">Career Transformations</h2>
          <p className="text-slate-500 max-w-lg mx-auto">Real people who changed their lives through RoadReady. Here&apos;s where they are now.</p>
        </div>

        {/* Featured story */}
        {featured && (
          <div className="bg-blue-50 border border-blue-200/60 rounded-2xl p-6 lg:p-10 shadow-sm mb-8 relative overflow-hidden">
            <span className="absolute top-6 right-6 text-8xl font-heading text-blue-200/20 leading-none">&quot;</span>
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img src={featured.image} alt={featured.name} className="w-16 h-16 rounded-full object-cover shadow-md shrink-0 border-2 border-white" />
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{featured.name}</div>
                    <div className="text-sm text-gray-600">{featured.course} · {featured.graduateDate}</div>
                  </div>
                  <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-emerald-600/15 text-emerald-800 rounded-full border border-emerald-600/30">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    Verified Graduate
                  </span>
                </div>
                <blockquote className="text-gray-800 text-lg leading-relaxed mb-5">&quot;{featured.quote}&quot;</blockquote>
                <p className="text-sm text-gray-600 mb-5">{featured.whereNow}</p>
                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Before</div>
                    <div className="text-sm text-gray-600">{featured.beforeRole} · <span className="line-through">{formatCurrency(featured.beforeSalary)}</span></div>
                  </div>
                  <svg className="w-5 h-5 text-emerald-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  <div>
                    <div className="text-xs text-emerald-700 uppercase tracking-wider mb-1 font-semibold">After</div>
                    <div className="text-sm font-bold text-gray-900">{featured.afterRole} · <span className="text-emerald-700">{formatCurrency(featured.afterSalary)}</span></div>
                  </div>
                </div>

                {/* Story link — own line, bigger */}
                <div className="pt-4 border-t border-blue-200/60">
                  <button
                    onClick={() => toggleStory(featured.name)}
                    className="inline-flex items-center gap-2.5 text-base font-bold text-emerald-800 hover:text-emerald-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>
                    {expandedStory === featured.name ? `Close ${firstName(featured.name)}'s Story` : `Read ${firstName(featured.name)}'s Story`}
                    <svg className={`w-5 h-5 transition-transform duration-200 ${expandedStory === featured.name ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded Q&A panel */}
            <div className={`grid transition-all duration-500 ease-in-out ${expandedStory === featured.name ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0"}`}>
              <div className="overflow-hidden">
                <div className="bg-white rounded-2xl p-6 lg:p-8 border border-blue-200/60">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <img src={featured.imageLarge} alt={featured.name} className="w-full lg:w-48 h-48 lg:h-auto object-cover rounded-xl shadow-md shrink-0" />
                    <div className="flex-1 space-y-6">
                      {featured.storyQA.map((qa, i) => (
                        <div key={i}>
                          <h4 className="text-sm font-bold text-gray-900 mb-1.5 flex items-center gap-2">
                            <span className="w-5 h-5 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">Q</span>
                            {qa.question}
                          </h4>
                          <p className="text-sm text-gray-600 leading-relaxed pl-7">{qa.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other stories — cards only, no expansion inside grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {others.map((s) => {
            const isFemale = ["Sarah", "Priya"].some((n) => s.name.startsWith(n));
            const cardBg = isFemale ? "bg-pink-50 border-pink-200/60" : "bg-blue-50 border-blue-200/60";
            const quoteTint = isFemale ? "text-pink-200/20" : "text-blue-200/20";
            const borderTint = isFemale ? "border-pink-200/60" : "border-blue-200/60";

            return (
              <div key={s.name} className={`${cardBg} border rounded-2xl p-6 shadow-sm flex flex-col relative overflow-hidden hover:shadow-lg transition-all duration-300`}>
                <span className={`absolute top-5 right-5 text-5xl font-heading ${quoteTint} leading-none`}>&quot;</span>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: s.rating }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-gray-800 leading-relaxed mb-4 flex-1 text-sm">&quot;{s.quote}&quot;</blockquote>
                <div className="flex items-center gap-3 mb-3">
                  <img src={s.image} alt={s.name} className="w-12 h-12 rounded-full object-cover shadow-sm shrink-0" />
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{s.name}</div>
                    <div className="text-xs text-gray-600">{s.beforeRole} → {s.afterRole}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-600 mb-3">{s.whereNow}</div>
                <div className="pt-3 border-t border-gray-200 flex items-center gap-2 text-sm mb-4">
                  <span className="text-gray-500 line-through">{s.beforeSalary > 0 ? formatCurrency(s.beforeSalary) : "Unemployed"}</span>
                  <span className="text-gray-500">→</span>
                  <span className="text-emerald-700 font-bold">{formatCurrency(s.afterSalary)}</span>
                </div>

                {/* Story link — own line, prominent */}
                <button
                  onClick={() => toggleStory(s.name)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                  {expandedStory === s.name ? `Close ${firstName(s.name)}'s Story` : `Read ${firstName(s.name)}'s Story`}
                  <svg className={`w-4 h-4 transition-transform duration-200 ${expandedStory === s.name ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>

        {/* Expanded Q&A — rendered OUTSIDE the grid so it doesn't affect other cards */}
        {others.map((s) => {
          const isExpanded = expandedStory === s.name;
          return (
            <div key={`story-${s.name}`} className={`grid transition-all duration-500 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0"}`}>
              <div className="overflow-hidden">
                <div className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 shadow-sm">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex flex-col items-center gap-3 shrink-0">
                      <img src={s.imageLarge} alt={s.name} className="w-full lg:w-48 h-48 lg:h-auto object-cover rounded-xl shadow-md" />
                      <div className="text-center">
                        <div className="font-bold text-gray-900">{s.name}</div>
                        <div className="text-xs text-gray-600">{s.course}</div>
                      </div>
                    </div>
                    <div className="flex-1 space-y-6">
                      {s.storyQA.map((qa, i) => (
                        <div key={i}>
                          <h4 className="text-sm font-bold text-gray-900 mb-1.5 flex items-center gap-2">
                            <span className="w-5 h-5 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">Q</span>
                            {qa.question}
                          </h4>
                          <p className="text-sm text-gray-600 leading-relaxed pl-7">{qa.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="text-center mt-10">
          <a
            href="https://www.google.com/maps/place/RoadReady"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62Z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" />
            </svg>
            Read all reviews on Google
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}


// ── FINAL CTA ───────────────────────────────────────────
function FinalCTA({ onEnquire }: { onEnquire: () => void }) {
  const { ref, revealed } = useReveal();

  const careerPaths = [
    { role: "Long-haul driver", earnings: "£35k - £50k+" },
    { role: "Owner-operator", earnings: "£50k - £85k+" },
    { role: "Fleet manager", earnings: "£40k - £60k" },
    { role: "Driving instructor", earnings: "£35k - £45k" },
    { role: "Logistics coordinator", earnings: "£30k - £40k" },
    { role: "Warehouse manager", earnings: "£35k - £50k" },
  ];

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-slate-50 border-t border-slate-200/50">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 via-emerald-500/3 to-transparent" />
      <div ref={ref} className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${!revealed ? "opacity-0 translate-y-5" : "animate-reveal-up"}`}>
        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
          This Licence Opens{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">An Entire Career</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
          It&apos;s not just a licence — it&apos;s the entry point to a whole new field. Our graduates have gone on to build highly rewarding careers including:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16 text-left">
          {careerPaths.map((path) => (
            <div key={path.role} className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 text-xl">{path.role}</h3>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-gray-700 font-semibold text-sm px-3.5 py-1.5 rounded-full">
                <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Est. earnings: {path.earnings}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-emerald-100 shadow-xl shadow-emerald-900/5">
          <p className="text-xl sm:text-2xl text-gray-700 mb-8 font-medium leading-relaxed">
            If you&apos;re ready for a fresh start and a career with real progression — <span className="font-bold text-emerald-800">this is where it begins</span>.
          </p>
          <button
            onClick={onEnquire}
            className="inline-flex items-center gap-2 px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white text-xl font-bold rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-emerald-600/25 active:scale-95"
          >
            Start Your New Chapter
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
