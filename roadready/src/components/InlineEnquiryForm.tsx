"use client";

import { useState, type FormEvent } from "react";
import { courses } from "@/lib/data";

const inputClass = "w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all min-h-[44px] text-sm shadow-sm";

export default function InlineEnquiryForm() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: "", phone: "", course: "" });

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
        } catch { /* silent */ }
        setLoading(false);
    };

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
                    <p className="text-slate-600 font-medium">We'll be in touch within 2 hours to discuss your training.</p>
                </div>
            </div>
        );
    }

    return (
        <section className="relative mx-4 sm:mx-8 lg:mx-auto max-w-6xl bg-gradient-to-br from-white via-slate-50 to-emerald-50/50 rounded-2xl sm:rounded-[2rem] border-2 border-emerald-500/20 shadow-2xl p-8 sm:p-12 my-12 overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500" />

            <div className="relative">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <span className="text-emerald-700 font-extrabold uppercase tracking-widest text-sm">Nationwide Training</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-2 font-heading tracking-tight">
                        We Train <span className="text-emerald-600">Everywhere</span>. Start Today.
                    </h2>
                    <p className="text-slate-600 font-medium text-sm sm:text-base max-w-2xl mx-auto">
                        We have 60+ training centres across the UK. Leave your details below and our team will get back to you within 2 hours to get you booked in.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                required
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className={inputClass}
                                placeholder="Your full name *"
                            />
                        </div>
                        <div className="flex-1">
                            <input
                                type="tel"
                                required
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                className={inputClass}
                                placeholder="Phone number *"
                            />
                        </div>
                        <div className="flex-1">
                            <select
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
                        <button
                            type="submit"
                            disabled={loading}
                            className="md:w-auto px-8 py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-200 hover:shadow-lg active:scale-95 min-h-[44px] whitespace-nowrap"
                        >
                            {loading ? "Sending..." : "Get Free Quote"}
                        </button>
                    </div>
                    <p className="text-center text-sm text-slate-800 mt-5 font-extrabold tracking-wide uppercase drop-shadow-sm">
                        Takes 30 seconds. No obligation to book.
                    </p>
                </form>
            </div>
        </section>
    );
}
