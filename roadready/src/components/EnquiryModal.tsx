"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useEnquiry } from "@/context/EnquiryContext";
import { courses } from "@/lib/data";

export default function EnquiryModal() {
    const { isOpen, preselectedCourse, closeEnquiry } = useEnquiry();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        course: "",
        message: "",
    });

    useEffect(() => {
        if (preselectedCourse) {
            setForm((f) => ({ ...f, course: preselectedCourse }));
        }
    }, [preselectedCourse]);

    useEffect(() => {
        if (!isOpen) {
            const t = setTimeout(() => {
                setSubmitted(false);
                setForm({ name: "", phone: "", email: "", course: "", message: "" });
            }, 350);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fetch("/api/enquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            setSubmitted(true);
        } catch {
            // silent for now
        }
        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60]">
            <div
                className="absolute inset-0 bg-dark/30 backdrop-blur-sm"
                onClick={closeEnquiry}
            />

            <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-slate-800 shadow-2xl animate-slide-right overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-white border-b border-slate-800 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-dark">Get Started</h2>
                            <p className="text-sm text-slate-500">We&apos;ll call you back within 2 hours</p>
                        </div>
                        <button
                            onClick={closeEnquiry}
                            className="p-2 text-slate-400 hover:text-dark hover:bg-slate-200/50 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                            aria-label="Close"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 pt-3 border-t border-slate-800/50 text-xs text-slate-500">
                        <span className="flex items-center gap-1">DVSA Approved</span>
                        <span>·</span>
                        <span>No hidden fees</span>
                        <span>·</span>
                        <span>2hr callback</span>
                    </div>
                </div>

                <div className="p-6">
                    {submitted ? (
                        <div className="text-center py-12 animate-fade-in">
                            <div className="w-16 h-16 rounded-full bg-blue-600/10 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-dark mb-2">Enquiry Sent!</h3>
                            <p className="text-slate-500 mb-6">
                                We&apos;ll be in touch within 2 hours. Check your phone for our call.
                            </p>
                            <button
                                onClick={closeEnquiry}
                                className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-dark text-sm font-medium rounded-full transition-colors min-h-[44px]"
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="eq-name" className="block text-sm font-medium text-dark mb-1.5">
                                    Full Name *
                                </label>
                                <input
                                    id="eq-name"
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-dark placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[44px]"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label htmlFor="eq-phone" className="block text-sm font-medium text-dark mb-1.5">
                                    Phone Number *
                                </label>
                                <input
                                    id="eq-phone"
                                    type="tel"
                                    required
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-dark placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[44px]"
                                    placeholder="07XXX XXXXXX"
                                />
                            </div>

                            <div>
                                <label htmlFor="eq-email" className="block text-sm font-medium text-dark mb-1.5">
                                    Email
                                </label>
                                <input
                                    id="eq-email"
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-dark placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[44px]"
                                    placeholder="you@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="eq-course" className="block text-sm font-medium text-dark mb-1.5">
                                    Interested In
                                </label>
                                <select
                                    id="eq-course"
                                    value={form.course}
                                    onChange={(e) => setForm({ ...form, course: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[44px]"
                                >
                                    <option value="">Select a course...</option>
                                    {courses.map((c) => (
                                        <option key={c.slug} value={c.slug}>
                                            {c.title}
                                        </option>
                                    ))}
                                    <option value="other">Not sure yet</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="eq-message" className="block text-sm font-medium text-dark mb-1.5">
                                    Message (optional)
                                </label>
                                <textarea
                                    id="eq-message"
                                    rows={3}
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-dark placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                    placeholder="Any questions?"
                                />
                            </div>

                            <p className="text-xs text-center text-slate-500">Takes 30 seconds. No obligation.</p>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/25 active:scale-[0.98] min-h-[48px]"
                            >
                                {loading ? "Sending..." : "Send Enquiry"}
                            </button>

                            <p className="text-xs text-center text-slate-500">
                                Or call us directly:{" "}
                                <a href="tel:+4401234567890" className="text-blue-600 hover:text-blue-500">
                                    01234 567 890
                                </a>
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
