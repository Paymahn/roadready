"use client";

import { useEnquiryForm } from "@/lib/use-enquiry-form";
import TurnstileWidget from "@/components/TurnstileWidget";

const inputClass =
    "w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all min-h-[44px] text-sm shadow-sm";

// Compact card variant of the enquiry form for the ads landing page: the course is locked
// to the page's course (static line, no dropdown — fewer decisions on cold traffic), and
// submissions are tagged formType "landing" so page → Lead conversion is measurable in the
// CRM and in Meta separately from the homepage inline form.
export default function LandingEnquiryForm({
    courseSlug,
    courseTitle,
}: {
    courseSlug: string;
    courseTitle: string;
}) {
    const { submitted, loading, submitError, form, setForm, handleSubmit, turnstileKey, setTurnstileToken } =
        useEnquiryForm("landing", courseSlug);

    if (submitted) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 text-center animate-fade-in">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-3">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Enquiry Received!</h3>
                <p className="text-slate-600 font-medium">
                    We&apos;ll call you about your {courseTitle} training as soon as we can.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-1 font-heading tracking-tight">
                Get your <span className="text-emerald-700">free quote</span>
            </h2>
            <p className="text-slate-600 text-sm mb-5">
                Leave your name and number — we aim to call you back the same day.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    required
                    aria-label="Your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                    placeholder="Your full name *"
                />
                <input
                    type="tel"
                    required
                    aria-label="Phone number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputClass}
                    placeholder="Phone number *"
                />
                <p className="text-sm text-slate-500 px-1">
                    Course: <span className="font-semibold text-slate-700">{courseTitle}</span>
                </p>
                <input
                    type="text"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                />
                <TurnstileWidget key={turnstileKey} onToken={setTurnstileToken} />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-8 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-200 hover:shadow-lg active:scale-95 min-h-[48px]"
                >
                    {loading ? "Sending..." : "Get My Free Quote"}
                </button>
                {submitError ? (
                    <p className="text-sm text-red-600 font-medium" role="alert">
                        {submitError}
                    </p>
                ) : null}
                <p className="text-xs text-slate-500">
                    No obligation. We&apos;ll only use your details to contact you about training.
                </p>
            </form>
        </div>
    );
}
