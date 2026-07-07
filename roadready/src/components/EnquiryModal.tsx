"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useEnquiry } from "@/context/EnquiryContext";
import { CONTACT } from "@/lib/contact";
import { courses } from "@/lib/data";
import { postEnquiry } from "@/lib/submit-enquiry";
import { hasSubmittedEnquiry } from "@/lib/enquiry-session";
import TurnstileWidget from "@/components/TurnstileWidget";

const inputClass = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all min-h-[44px] text-sm";
const labelClass = "block text-sm font-semibold text-slate-700 mb-1.5";

export default function EnquiryModal() {
    const { isOpen, preselectedCourse, closeEnquiry } = useEnquiry();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [formStartedAt, setFormStartedAt] = useState(() => Date.now());
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [turnstileKey, setTurnstileKey] = useState(0);
    const [form, setForm] = useState({ name: "", phone: "", email: "", course: "", message: "", website: "" });

    useEffect(() => {
        if (preselectedCourse) setForm((f) => ({ ...f, course: preselectedCourse }));
    }, [preselectedCourse]);

    useEffect(() => {
        if (isOpen) setFormStartedAt(Date.now());
    }, [isOpen]);

    // Already submitted this visit (via ANY form — inline, landing, contact, or this modal
    // earlier) → open on the thanks state instead of inviting a duplicate. Runs on every open:
    // the close-reset below clears `submitted` after the exit animation.
    useEffect(() => {
        if (isOpen && hasSubmittedEnquiry()) setSubmitted(true);
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            const t = setTimeout(() => {
                setSubmitted(false);
                setForm({ name: "", phone: "", email: "", course: "", message: "", website: "" });
            }, 350);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSubmitError(null);
        try {
            const result = await postEnquiry({
                body: { ...form, formStartedAt },
                formType: "modal",
                courseSlug: form.course || undefined,
                turnstileToken: turnstileToken ?? undefined,
            });
            if (!result.ok) {
                setSubmitError(result.error);
                return;
            }
            setSubmitted(true);
        } catch {
            setSubmitError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
            // Tokens are single-use — remount the widget for a fresh one on any retry.
            setTurnstileToken(null);
            setTurnstileKey((k) => k + 1);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60]">
            <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={closeEnquiry} />

            <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl animate-slide-right overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-6 py-5">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Get Your Free Quote</h2>
                            <p className="text-sm text-slate-600 mt-0.5">We aim to call you back the same working day</p>
                        </div>
                        <button
                            onClick={closeEnquiry}
                            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
                            aria-label="Close"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-slate-100">
                        {["DVSA-aligned training", "Honest advice", "Quick callback"].map((t) => (
                            <span key={t} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">
                                <svg className="w-3 h-3 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="p-6">
                    {submitted ? (
                        <div className="text-center py-14 animate-fade-in">
                            <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-5">
                                <svg className="w-8 h-8 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Enquiry Sent!</h3>
                            <p className="text-slate-700 mb-8 max-w-xs mx-auto font-medium">
                                We aim to be in touch the same working day. Check your phone for our call.
                            </p>
                            <button
                                onClick={closeEnquiry}
                                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-700 text-white text-sm font-semibold rounded-full transition-colors min-h-[44px]"
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
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
                            <div>
                                <label htmlFor="eq-name" className={labelClass}>Full Name *</label>
                                <input
                                    id="eq-name" type="text" required
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className={inputClass} placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label htmlFor="eq-phone" className={labelClass}>Phone Number *</label>
                                <input
                                    id="eq-phone" type="tel" required
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    className={inputClass} placeholder="07XXX XXXXXX"
                                />
                            </div>

                            <div>
                                <label htmlFor="eq-email" className={labelClass}>Email</label>
                                <input
                                    id="eq-email" type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className={inputClass} placeholder="you@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="eq-course" className={labelClass}>Interested In</label>
                                <select
                                    id="eq-course"
                                    value={form.course}
                                    onChange={(e) => setForm({ ...form, course: e.target.value })}
                                    className={inputClass}
                                >
                                    <option value="">Select a course...</option>
                                    {courses.map((c) => (
                                        <option key={c.slug} value={c.slug}>{c.title}</option>
                                    ))}
                                    <option value="other">Not sure yet</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="eq-message" className={labelClass}>Message (optional)</label>
                                <textarea
                                    id="eq-message" rows={3}
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    className={`${inputClass} resize-none`}
                                    placeholder="Any questions?"
                                />
                            </div>

                            <p className="text-xs text-center text-slate-600 font-medium">Takes 30 seconds. No obligation.</p>

                            {submitError ? (
                                <p className="text-sm text-center text-red-600 font-medium" role="alert">{submitError}</p>
                            ) : null}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-slate-900 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-200 hover:shadow-lg active:scale-[0.98] min-h-[48px] text-base"
                            >
                                {loading ? "Sending..." : "Send Enquiry"}
                            </button>

                            <p className="text-xs text-center text-slate-600 font-medium">
                                Or call us:{" "}
                                <a href={`tel:${CONTACT.phone.raw}`} className="text-slate-800 font-bold hover:text-slate-900">
                                    {CONTACT.phone.display}
                                </a>
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
