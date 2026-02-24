"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useEnquiry } from "@/context/EnquiryContext";
import { courses, stats, howItWorksSteps, comparisonRows, shortageStats, trainingLocations, successStories } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import CourseCategoryIcon from "@/components/CourseCategoryIcon";

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
      <ROICalculator onEnquire={openEnquiry} />
      <CoursePreview onEnquire={openEnquiry} />
      <NationwideTraining />
      <HowItWorks />
      <SuccessStories />
      <ComparisonSection />
      <FinalCTA onEnquire={openEnquiry} />
    </>
  );
}

// ── HERO ────────────────────────────────────────────────
function HeroSection({ onEnquire }: { onEnquire: () => void }) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 grain">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-white to-slate-200/50" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
        <div className="max-w-3xl">
          {/* Trust badge strip */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500 mb-6 animate-fade-in">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              DVSA Approved
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              4.9 Google Rating
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              10+ Years in the Industry
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 backdrop-blur-sm border border-blue-600/20 rounded-full text-sm font-semibold text-blue-600 mb-6 animate-fade-in shadow-sm">
            <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse-soft" />
            Now Accepting Bookings — Spring 2026
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-dark leading-[1.08] tracking-tight mb-3 animate-slide-up">
            Your New Career{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              Starts With Us
            </span>
          </h1>

          <p className="font-heading text-xl sm:text-2xl font-bold text-slate-600 mb-6 animate-slide-up tracking-tight">
            Your licence pays for itself.
          </p>

          <p className="text-lg sm:text-xl text-slate-500 leading-relaxed mb-8 max-w-xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
            You&apos;re not just a number here — you&apos;re someone building a better life, and we want that for you. With over a decade of industry experience, <a href="#study-tools" className="font-semibold text-blue-600 hover:text-blue-500 underline decoration-blue-600/30 hover:decoration-blue-600 transition-colors">our own free study materials</a>, and real career support, <span className="font-semibold text-dark">we&apos;re with you every step of the way</span> — from first enquiry to first day on the job.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <button
              onClick={onEnquire}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white text-lg font-semibold rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-blue-600/25 active:scale-95 min-h-[48px]"
            >
              Start Your Journey
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <a
              href="#roi-calculator"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/80 hover:bg-white border border-slate-800/50 text-dark text-lg font-medium rounded-full transition-all duration-200 backdrop-blur-sm min-h-[48px]"
            >
              See The Numbers
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-10 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <span className="inline-flex items-center gap-2.5 px-6 py-3 bg-blue-600/10 text-blue-700 text-base font-bold rounded-full border border-blue-600/25 shadow-sm">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              94% first-time pass rate
            </span>
            <a href="#study-tools" className="inline-flex items-center gap-2.5 px-6 py-3 bg-blue-600/10 text-blue-700 text-base font-bold rounded-full border border-blue-600/25 shadow-sm hover:bg-blue-600/20 transition-colors">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Free study materials
            </a>
            <span className="inline-flex items-center gap-2.5 px-6 py-3 bg-blue-600/10 text-blue-700 text-base font-bold rounded-full border border-blue-600/25 shadow-sm">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Job placement support
            </span>
          </div>
        </div>

        {/* Frosted glass stats card — desktop */}
        <div className="hidden lg:block w-full max-w-sm shrink-0">
          <div className="bg-white/70 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 shadow-xl shadow-slate-900/5 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">Why trainees choose us</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">First-time pass rate</span>
                <span className="text-2xl font-bold text-blue-600">94%</span>
              </div>
              <div className="h-px bg-slate-800/50" />
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Avg. salary uplift</span>
                <span className="text-2xl font-bold text-dark">£14k</span>
              </div>
              <div className="h-px bg-slate-800/50" />
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Payback period</span>
                <span className="text-2xl font-bold text-blue-600">&lt;8 wks</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#roi-calculator" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors" aria-label="Scroll to calculator">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <svg className="w-5 h-5 animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </section>
  );
}

// ── TRUST STRIP ─────────────────────────────────────────
function TrustStrip() {
  return (
    <section className="relative py-14 lg:py-16 bg-dark">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {stats.map((stat) => {
            const { count, ref } = useCountUp(stat.value);
            return (
              <div key={stat.label} ref={ref} className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-1">
                  {stat.value % 1 !== 0 ? count.toFixed(1) : Math.floor(count)}
                  <span className="text-amber-400">{stat.suffix}</span>
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            );
          })}
        </div>
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          <span className="flex items-center gap-2 text-sm text-white/70">
            <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            DVSA Approved
          </span>
          <span className="flex items-center gap-2 text-sm text-white/70">
            <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            JAUPT Registered
          </span>
          <span className="flex items-center gap-2 text-sm text-white/70">
            <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            RTITB Accredited
          </span>
        </div>
      </div>
    </section>
  );
}

// ── ROI CALCULATOR ──────────────────────────────────────
function ROICalculator({ onEnquire }: { onEnquire: () => void }) {
  const { ref, revealed } = useReveal();
  const [currentSalary, setCurrentSalary] = useState(24000);

  const hgvAvg = 38000;
  const monthlyUplift = Math.max(0, Math.round((hgvAvg - currentSalary) / 12));
  const yearOneExtra = Math.max(0, hgvAvg - currentSalary);
  const fiveYearExtra = yearOneExtra * 5;

  return (
    <section id="roi-calculator" className="py-20 lg:py-28">
      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${!revealed ? "opacity-0 translate-y-5" : "animate-reveal-up"}`}>
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark mb-3 tracking-tight">
            What Could You Be{" "}
            <span className="text-blue-600">Earning?</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Slide to your current salary and see the potential uplift as a qualified HGV driver.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-dark">Your current salary</label>
              <span className="text-lg font-bold text-dark">{formatCurrency(currentSalary)}</span>
            </div>
            <input
              type="range"
              min={16000}
              max={40000}
              step={500}
              value={currentSalary}
              onChange={(e) => setCurrentSalary(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-blue-500/30"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>£16,000</span>
              <span>£40,000</span>
            </div>
          </div>

          <div className="bg-blue-600/5 border border-blue-600/15 rounded-xl p-4 mb-6 text-center">
            <div className="text-sm text-slate-500 mb-1">Average HGV driver salary</div>
            <div className="text-3xl font-extrabold text-blue-600">£38,000</div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <ResultCard label="Extra / month" value={formatCurrency(monthlyUplift)} highlight />
            <ResultCard label="Extra in Year 1" value={formatCurrency(yearOneExtra)} />
            <ResultCard label="Extra over 5 years" value={formatCurrency(fiveYearExtra)} />
          </div>

          <button
            onClick={onEnquire}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/25 active:scale-[0.98] min-h-[48px]"
          >
            Start Earning More →
          </button>
        </div>
      </div>
    </section>
  );
}

function ResultCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center">
      <div className={`text-xl sm:text-2xl font-bold mb-1 ${highlight ? "text-blue-600" : "text-dark"}`}>
        {value}
      </div>
      <div className="text-xs text-slate-400">{label}</div>
    </div>
  );
}

// ── COURSE PREVIEW ──────────────────────────────────────
function CoursePreview({ onEnquire }: { onEnquire: (course?: string) => void }) {
  const { ref, revealed } = useReveal();
  const topCourses = courses.filter((c) => ["hgv-cat-c", "hgv-cat-ce", "forklift-counterbalance", "hgv-cat-c-ce-combo"].includes(c.slug));

  return (
    <section className="py-20 lg:py-28 bg-white/50">
      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${!revealed ? "opacity-0 translate-y-5" : "animate-reveal-up"}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark mb-3 tracking-tight">Our Courses</h2>
            <p className="text-slate-400">Everything included. Enquire for details on any course.</p>
          </div>
          <Link
            href="/courses"
            className="mt-4 sm:mt-0 text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors inline-flex items-center gap-1"
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
              className="group bg-white border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-600/30 hover:shadow-lg hover:shadow-blue-600/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-800/20 flex items-center justify-center relative">
                <CourseCategoryIcon category={course.category} className="w-12 h-12 text-blue-600" />
                {course.slug === "hgv-cat-c-ce-combo" && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 text-xs font-bold bg-amber-500/15 text-amber-600 rounded-full border border-amber-500/30">
                    Most Popular
                  </span>
                )}
                {course.slug !== "hgv-cat-c-ce-combo" && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 text-xs font-medium bg-blue-600/10 text-blue-600 rounded-full border border-blue-600/20">
                    {course.category}
                  </span>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-dark mb-1 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{course.description}</p>

                <p className="text-xs text-slate-500 mb-4">
                  All-inclusive · {course.duration}
                </p>

                <button
                  onClick={() => onEnquire(course.slug)}
                  className="w-full py-2.5 bg-blue-600/10 hover:bg-blue-600 text-blue-600 hover:text-white text-sm font-semibold rounded-full border border-blue-600/20 hover:border-transparent transition-all duration-200"
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
  const c = className ?? "w-8 h-8 text-blue-600";
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

// ── HOW IT WORKS ────────────────────────────────────────
function HowItWorks() {
  const { ref, revealed } = useReveal();
  return (
    <section className="py-20 lg:py-28">
      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${!revealed ? "opacity-0 translate-y-5" : "animate-reveal-up"}`}>
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark mb-3 tracking-tight">
            From Enquiry to Licence in 4 Steps
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            We guide you through every stage. No confusion, no surprises.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorksSteps.map((step, i) => (
            <div key={step.step} className="relative text-center group">
              {i < howItWorksSteps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-slate-800 to-transparent" />
              )}
              <div className="w-20 h-20 rounded-2xl bg-white border border-slate-800 flex items-center justify-center mx-auto mb-4 group-hover:border-blue-600/30 group-hover:shadow-lg group-hover:shadow-blue-600/5 transition-all duration-300">
                <StepIcon keyName={step.iconKey} className="w-8 h-8 text-blue-600" />
              </div>
              <div className="inline-flex items-center gap-1.5 mb-2">
                <span className="text-xs font-bold text-blue-600 bg-blue-600/10 px-2 py-0.5 rounded-full">Step {step.step}</span>
              </div>
              <h3 className="text-lg font-bold text-dark mb-1">{step.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
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
            <div key={i} ref={stat.ref} className="bg-white border-2 border-amber-400/60 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg hover:border-amber-400 transition-all duration-300">
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

        <div className="text-center">
          <button
            onClick={onEnquire}
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white text-lg font-semibold rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-blue-600/25 active:scale-95"
          >
            Start Your Journey
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

// ── CAREER SUPPORT ──────────────────────────────────────
function CareerSupport() {
  const { ref, revealed } = useReveal();
  const cards = [
    {
      title: "CV & Application Support",
      description: "Professional CV templates tailored to logistics, application coaching, and help writing cover letters that actually get read.",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      ),
    },
    {
      title: "Industry Contacts",
      description: "We've built relationships with major haulage firms, agencies, and logistics companies. We don't just train you — we introduce you.",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      ),
    },
    {
      title: "Interview Preparation",
      description: "Know what employers look for. We'll coach you on industry-specific questions, what to wear, what to bring, and how to stand out.",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
        </svg>
      ),
    },
    {
      title: "Ongoing Support",
      description: "Your relationship with us doesn't end when you pass. Need advice 6 months in? We're still here. That's what 'every step of the way' actually means.",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white/50">
      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${!revealed ? "opacity-0 translate-y-5" : "animate-reveal-up"}`}>
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600/10 text-blue-600 text-sm font-semibold rounded-full border border-blue-600/20 mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            With you every step
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark mb-3 tracking-tight">
            Not Just Qualified —{" "}
            <span className="text-blue-600">Hireable</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            A licence gets you started. We make sure you&apos;re a candidate employers actually want. CV support, industry contacts, interview coaching — and we don&apos;t stop when you pass.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div key={card.title} className="group bg-white border border-slate-800 rounded-2xl p-6 hover:border-blue-600/30 hover:shadow-lg hover:shadow-blue-600/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600/15 transition-colors">
                {card.icon}
              </div>
              <h3 className="font-bold text-dark mb-2 group-hover:text-blue-600 transition-colors">{card.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{card.description}</p>
            </div>
          ))}
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
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600/10 text-blue-600 text-sm font-semibold rounded-full border border-blue-600/20 mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            {trainingLocations.length} locations
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark mb-3 tracking-tight">
            Training Centres{" "}
            <span className="text-blue-600">Across the UK</span>
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
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-800 rounded-xl text-dark placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
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
              className="snap-start shrink-0 w-56 bg-white border border-slate-800 rounded-2xl p-5 hover:border-blue-600/30 hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <h3 className="font-bold text-dark group-hover:text-blue-600 transition-colors">{loc.city}</h3>
              </div>
              <div className="text-xs text-slate-400 mb-3">{loc.region}</div>
              <div className="flex flex-wrap gap-1.5">
                {loc.courses.map((c) => (
                  <span key={c} className="text-[10px] font-medium px-2 py-0.5 bg-blue-600/8 text-blue-600 rounded-full border border-blue-600/15">{c}</span>
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
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-slate-500 border-slate-800 hover:border-blue-600/30 hover:text-blue-600"
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
        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 0 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
        </svg>
      ),
      badge: "Free with every course",
      badgeColor: "bg-blue-600/10 text-blue-600 border-blue-600/20",
    },
    {
      title: "User Hub",
      description: "Your personal dashboard to track study progress, review weak areas, access all learning tools, and manage your entire training journey — from first enquiry to first day on the job.",
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      ),
      badge: "Coming Soon",
      badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    },
    {
      title: "Driver Wellness Hub",
      description: "We\u2019re championing physical and mental health in the driving industry. Back care, nutrition on the road, sleep hygiene, mental health check-ins, and financial planning — because your wellbeing matters as much as your licence.",
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      ),
      badge: "Coming Soon",
      badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    },
  ];

  return (
    <section id="study-tools" className="py-20 lg:py-28 bg-white/50">
      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${!revealed ? "opacity-0 translate-y-5" : "animate-reveal-up"}`}>
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600/10 text-blue-600 text-sm font-semibold rounded-full border border-blue-600/20 mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
            </svg>
            Built by us, constantly updated
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark mb-3 tracking-tight">
            We Create Our Own{" "}
            <span className="text-blue-600">Study Materials</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Most schools hand you a textbook. We built AI-powered study tools backed by cognitive science — included free with every course, and we never stop improving them.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.title}
              className="group relative bg-white border border-slate-800 rounded-2xl p-6 lg:p-8 hover:border-blue-600/30 hover:shadow-lg hover:shadow-blue-600/5 hover:-translate-y-1 transition-all duration-300"
            >
              <span className={`absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full border ${tool.badgeColor}`}>
                {tool.badge}
              </span>
              <div className="w-14 h-14 rounded-xl bg-blue-600/10 flex items-center justify-center mb-5 group-hover:bg-blue-600/15 transition-colors">
                {tool.icon}
              </div>
              <h3 className="text-lg font-bold text-dark mb-2 group-hover:text-blue-600 transition-colors">
                {tool.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {tool.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-sm text-slate-400">
            Based on the Ebbinghaus forgetting curve — proven to improve long-term retention by up to 400% vs traditional study methods
          </p>
        </div>
      </div>
    </section>
  );
}

// ── SUCCESS STORIES ─────────────────────────────────────
function SuccessStories() {
  const { ref, revealed } = useReveal();
  const featured = successStories.find((s) => s.featured);
  const others = successStories.filter((s) => !s.featured);

  return (
    <section id="success-stories" className="py-20 lg:py-28 bg-white/50">
      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${!revealed ? "opacity-0 translate-y-5" : "animate-reveal-up"}`}>
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600/10 text-blue-600 text-sm font-semibold rounded-full border border-blue-600/20 mb-4">
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
          <div className="bg-white border border-slate-800 rounded-2xl p-6 lg:p-10 shadow-sm mb-8 relative overflow-hidden">
            <span className="absolute top-6 right-6 text-8xl font-heading text-slate-800/5 leading-none">&quot;</span>
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {getInitials(featured.name)}
                  </div>
                  <div>
                    <div className="font-bold text-dark text-lg">{featured.name}</div>
                    <div className="text-sm text-slate-500">{featured.course} · {featured.graduateDate}</div>
                  </div>
                  <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-blue-600/10 text-blue-600 rounded-full border border-blue-600/20">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    Verified Graduate
                  </span>
                </div>
                <blockquote className="text-dark text-lg leading-relaxed mb-5">&quot;{featured.quote}&quot;</blockquote>
                <p className="text-sm text-slate-500 mb-5">{featured.whereNow}</p>
                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Before</div>
                    <div className="text-sm text-slate-500">{featured.beforeRole} · <span className="line-through">{formatCurrency(featured.beforeSalary)}</span></div>
                  </div>
                  <svg className="w-5 h-5 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  <div>
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1 font-semibold">After</div>
                    <div className="text-sm font-bold text-dark">{featured.afterRole} · <span className="text-blue-600">{formatCurrency(featured.afterSalary)}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other stories */}
        <div className="grid md:grid-cols-3 gap-6">
          {others.map((s) => (
            <div key={s.name} className="bg-white border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col relative overflow-hidden hover:border-blue-600/30 hover:shadow-lg transition-all duration-300">
              <span className="absolute top-5 right-5 text-5xl font-heading text-slate-800/5 leading-none">&quot;</span>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: s.rating }).map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-dark leading-relaxed mb-4 flex-1 text-sm">&quot;{s.quote}&quot;</blockquote>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 font-semibold text-sm shrink-0">
                  {getInitials(s.name)}
                </div>
                <div>
                  <div className="font-bold text-dark text-sm">{s.name}</div>
                  <div className="text-xs text-slate-500">{s.beforeRole} → {s.afterRole}</div>
                </div>
              </div>
              <div className="text-xs text-slate-500 mb-3">{s.whereNow}</div>
              <div className="pt-3 border-t border-slate-800/50 flex items-center gap-2 text-sm">
                <span className="text-slate-400 line-through">{s.beforeSalary > 0 ? formatCurrency(s.beforeSalary) : "Unemployed"}</span>
                <span className="text-slate-400">→</span>
                <span className="text-blue-600 font-bold">{formatCurrency(s.afterSalary)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://www.google.com/maps/place/RoadReady"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
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

// ── COMPARISON TABLE ────────────────────────────────────
function ComparisonSection() {
  const { ref, revealed } = useReveal();
  return (
    <section className="py-20 lg:py-28">
      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${!revealed ? "opacity-0 translate-y-5" : "animate-reveal-up"}`}>
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark mb-3 tracking-tight">Why Choose RoadReady?</h2>
          <p className="text-slate-400 max-w-lg mx-auto">See how we compare to the average training school.</p>
        </div>

        <div className="max-w-2xl mx-auto overflow-hidden rounded-2xl border border-slate-800 bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-950">
                <th className="text-left text-sm font-medium text-slate-400 px-6 py-4">Feature</th>
                <th className="text-center text-sm font-bold text-blue-600 px-6 py-4 bg-blue-600/5">RoadReady</th>
                <th className="text-center text-sm font-bold text-red-500 px-6 py-4 bg-red-500/8">Typical School</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-slate-950"}>
                  <td className="px-6 py-3.5 text-sm text-dark">{row.feature}</td>
                  <td className="px-6 py-3.5 text-sm text-center font-medium text-blue-600">
                    {row.usYes ? (
                      <span className="inline-flex items-center justify-center gap-1.5">
                        <CheckIcon className="w-4 h-4 text-blue-600" /> {row.us}
                      </span>
                    ) : (
                      row.us
                    )}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-center text-red-400 bg-red-500/3">
                    {row.themYes ? (
                      <span className="inline-flex items-center justify-center gap-1.5">
                        <CheckIcon className="w-4 h-4 text-red-400" /> {row.them}
                      </span>
                    ) : ["Not offered", "Weekdays only"].includes(row.them) ? (
                      <span className="inline-flex items-center justify-center gap-1.5">
                        <XIcon className="w-4 h-4 text-red-500 shrink-0" /> <span className="text-red-500 font-medium">{row.them}</span>
                      </span>
                    ) : (
                      <span className="text-red-400">{row.them}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ── FINAL CTA ───────────────────────────────────────────
function FinalCTA({ onEnquire }: { onEnquire: () => void }) {
  const { ref, revealed } = useReveal();
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-blue-500/3 to-transparent" />
      <div ref={ref} className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${!revealed ? "opacity-0 translate-y-5" : "animate-reveal-up"}`}>
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark mb-4 tracking-tight">
          This Licence Opens{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">An Entire Career</span>
        </h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8">
          It&apos;s not just a licence — it&apos;s the entry point to a whole new field. Our graduates have gone on to build careers including:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 max-w-xl mx-auto mb-10 text-left">
          {["Long-haul driver", "Fleet manager", "Owner-operator", "Driving instructor", "Logistics coordinator", "Warehouse manager"].map((role) => (
            <div key={role} className="flex items-center gap-2 text-dark font-medium">
              <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              {role}
            </div>
          ))}
        </div>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10">
          If you&apos;re ready for a fresh start and a career with real progression — <span className="font-semibold text-dark">this is where it begins</span>.
        </p>
        <button
          onClick={onEnquire}
          className="inline-flex items-center gap-2 px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white text-lg font-semibold rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-blue-600/25 active:scale-95"
        >
          Start Your New Chapter
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
