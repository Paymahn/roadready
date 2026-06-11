"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { CONTACT } from "@/lib/contact";
import { courses } from "@/lib/data";
import { postEnquiry } from "@/lib/submit-enquiry";
import TurnstileWidget from "@/components/TurnstileWidget";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [formStartedAt] = useState(() => Date.now());
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [turnstileKey, setTurnstileKey] = useState(0);
    const [form, setForm] = useState({
        name: "", phone: "", email: "", course: "", message: "", hearAbout: "", website: "",
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSubmitError(null);
        try {
            const result = await postEnquiry({
                body: { ...form, formStartedAt },
                formType: "contact",
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

    const inputClass = "w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all min-h-[44px] shadow-inner";

    return (
        <div className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 min-h-screen border-t border-slate-800">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1920"
                    alt="Customer Support / Communication"
                    fill
                    className="object-cover object-center"
                    sizes="100vw"
                    priority
                />
            </div>
            {/* Dark warm gradient overlay */}
            <div className="absolute inset-0 bg-slate-950/85 mix-blend-multiply z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/90 to-slate-950 z-10" />

            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 font-heading tracking-tight">
                        Contact <span className="text-amber-400">RoadReady</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
                        Send an enquiry and we&apos;ll get back to you as soon as we can — usually the same working day.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
                    <div className="lg:col-span-3">
                        {submitted ? (
                            <div className="bg-slate-900/60 backdrop-blur-2xl border border-emerald-500/40 rounded-[2.5rem] p-12 lg:p-16 text-center animate-fade-in shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                                <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-8 border-2 border-emerald-500/50 shadow-lg shadow-emerald-500/20">
                                    <svg className="w-12 h-12 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <h2 className="text-4xl font-black text-white mb-4">You&apos;re On Your Way!</h2>
                                <p className="text-emerald-400 font-bold text-xl mb-3">Your enquiry has been received securely.</p>
                                <p className="text-slate-300 text-lg">We aim to call you back the same working day to discuss your next steps.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="bg-slate-900/60 backdrop-blur-2xl border border-slate-700/50 rounded-[2.5rem] p-8 sm:p-12 space-y-7 shadow-[0_0_40px_rgba(0,0,0,0.3)] relative overflow-hidden">
                                {/* Subtle glowing gradient circle behind form */}
                                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
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

                                <div className="relative z-10 border-b border-slate-700/50 pb-6 mb-2">
                                    <h2 className="text-3xl font-black text-white tracking-tight mb-2">Send Us an Enquiry</h2>
                                    <p className="text-base text-slate-400 font-medium tracking-wide">Leave your details and we&apos;ll handle the rest.</p>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="ct-name" className="block text-sm font-bold text-slate-300 mb-2 tracking-wide">Full Name *</label>
                                        <input id="ct-name" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Your name" />
                                    </div>
                                    <div>
                                        <label htmlFor="ct-phone" className="block text-sm font-bold text-slate-300 mb-2 tracking-wide">Phone Number *</label>
                                        <input id="ct-phone" type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="07XXX XXXXXX" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="ct-email" className="block text-sm font-bold text-slate-300 mb-2 tracking-wide">Email</label>
                                    <input id="ct-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="you@email.com" />
                                </div>

                                <div>
                                    <label htmlFor="ct-course" className="block text-sm font-bold text-slate-300 mb-2 tracking-wide">Interested In</label>
                                    <select id="ct-course" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} className={inputClass}>
                                        <option value="">Select a course...</option>
                                        {courses.map((c) => (<option key={c.slug} value={c.slug}>{c.title}</option>))}
                                        <option value="other">Not sure yet</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="ct-hear" className="block text-sm font-bold text-slate-300 mb-2 tracking-wide">How did you hear about us?</label>
                                    <select id="ct-hear" value={form.hearAbout} onChange={(e) => setForm({ ...form, hearAbout: e.target.value })} className={inputClass}>
                                        <option value="">Select...</option>
                                        <option value="google">Google search</option>
                                        <option value="friend">Friend / family referral</option>
                                        <option value="social">Social media</option>
                                        <option value="employer">Employer recommendation</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="ct-message" className="block text-sm font-bold text-slate-300 mb-2 tracking-wide">Message (optional)</label>
                                    <textarea id="ct-message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputClass} resize-none min-h-[120px]`} placeholder="Any questions or specific requirements?" />
                                </div>

                                {submitError ? (
                                    <p className="text-sm text-red-400 font-semibold text-center" role="alert">{submitError}</p>
                                ) : null}
                                <button type="submit" disabled={loading} className="w-full mt-4 py-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-lg rounded-xl transition-all duration-200 shadow-xl shadow-emerald-900/50 hover:shadow-emerald-500/30 active:scale-[0.98] border-2 border-emerald-500">
                                    {loading ? "Sending..." : "Send Enquiry"}
                                </button>
                            </form>
                        )}
                    </div>

                    <div className="lg:col-span-2 space-y-6 pt-2">
                        {/* Phone */}
                        <div className="bg-slate-900/70 backdrop-blur-2xl border border-slate-700/50 rounded-3xl p-8 sm:p-10 shadow-2xl hover:border-amber-400/40 hover:-translate-y-1 transition-all duration-300 group">
                            <div className="flex items-center gap-5 mb-5">
                                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/40 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-400/20 group-hover:border-amber-400/40 transition-all duration-300">
                                    <svg className="w-7 h-7 text-emerald-400 group-hover:text-amber-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </div>
                                <div>
                                    <h3 className="font-black text-white text-xl tracking-tight">Call Us</h3>
                                    <p className="text-sm font-semibold text-slate-400">Mon–Sat, 8am–6pm</p>
                                </div>
                            </div>
                            <a href={`tel:${CONTACT.phone.raw}`} className="text-3xl font-black text-emerald-400 hover:text-amber-400 transition-colors block mt-3 drop-shadow-md">{CONTACT.phone.display}</a>
                        </div>

                        {/* Callback */}
                        <div className="bg-slate-900/70 backdrop-blur-2xl border border-slate-700/50 rounded-3xl p-8 sm:p-10 shadow-2xl hover:border-amber-400/40 hover:-translate-y-1 transition-all duration-300 group">
                            <div className="flex items-center gap-5 mb-5">
                                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/40 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-400/20 group-hover:border-amber-400/40 transition-all duration-300">
                                    <svg className="w-7 h-7 text-emerald-400 group-hover:text-amber-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <div>
                                    <h3 className="font-black text-white text-xl tracking-tight">Request a Callback</h3>
                                    <p className="text-sm font-semibold text-slate-400">Pick a time that suits you</p>
                                </div>
                            </div>
                            <p className="text-slate-300 leading-relaxed text-base">Let us know your preferred time in the form, and an expert will call you exactly then.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
