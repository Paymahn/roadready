"use client";

import { courses } from "@/lib/data";
import { useEnquiryForm } from "@/lib/use-enquiry-form";
import TurnstileWidget from "@/components/TurnstileWidget";

const inputClass = "w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all min-h-[44px] text-sm shadow-sm";

export default function InlineEnquiryForm() {
    const { submitted, loading, submitError, form, setForm, handleSubmit, startCorrection, turnstileKey, setTurnstileToken } =
        useEnquiryForm("inline");

    if (submitted) {
        return (
            <div className="bg-emerald-50 border-y border-emerald-100 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-3">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Enquiry Received!</h3>
                    <p className="text-slate-600 font-medium">We&apos;ll be in touch as soon as we can.</p>
                    <p className="text-sm text-slate-500 mt-3">
                        Made a mistake in your details?{" "}
                        <button onClick={startCorrection} className="underline underline-offset-2 font-medium hover:text-slate-700">
                            Submit again here
                        </button>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <section className="relative mx-4 sm:mx-8 lg:mx-auto max-w-6xl bg-white rounded-2xl border border-slate-200 shadow-md p-8 sm:p-12 my-12 overflow-hidden">
            <div className="relative">
                <div className="text-center mb-8">
                    <p className="text-slate-500 text-sm font-medium mb-2">Training across the UK</p>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 font-heading tracking-tight">
                        Get a <span className="text-emerald-700">free quote</span>
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                        Leave your name, number, and course interest. We&apos;ll call or email with next steps — no obligation.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                    {/* 2x2 on tablet, single row on desktop — the optional email made a
                        one-row-with-button layout too cramped. Mobile stays stacked. */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
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
                        {/* Optional — format checks (browser + server) only apply when non-empty. */}
                        <input
                            type="email"
                            aria-label="Email (optional — for your quote and info pack)"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className={inputClass}
                            placeholder="Email (optional)"
                        />
                        <select
                            value={form.course}
                            onChange={(e) => setForm({ ...form, course: e.target.value })}
                            className={inputClass}
                            aria-label="Select a course"
                        >
                            <option value="">Select a course...</option>
                            {courses.map((c) => (
                                <option key={c.slug} value={c.slug}>{c.title}</option>
                            ))}
                            <option value="other">Not sure yet</option>
                        </select>
                    </div>
                    <div className="mt-4 flex justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full md:w-auto px-10 py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-200 hover:shadow-lg active:scale-95 min-h-[44px] whitespace-nowrap"
                        >
                            {loading ? "Sending..." : "Get Free Quote"}
                        </button>
                    </div>
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
                    {submitError ? (
                        <p className="text-center text-sm text-red-600 font-medium mt-4" role="alert">
                            {submitError}
                        </p>
                    ) : null}
                    <p className="text-center text-sm text-slate-500 mt-5">
                        Quick form. You choose whether to go ahead.
                    </p>
                </form>
            </div>
        </section>
    );
}
