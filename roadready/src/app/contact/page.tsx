"use client";

import { useState, type FormEvent } from "react";
import { courses } from "@/lib/data";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "", phone: "", email: "", course: "", message: "", hearAbout: "",
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
            setSubmitted(true);
        } catch { /* silent */ }
        setLoading(false);
    };

    const inputClass = "w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-dark placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[44px]";

    return (
        <div className="pt-24 pb-20 lg:pt-32 lg:pb-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <h1 className="text-4xl sm:text-5xl font-bold text-[#1E3A2B] mb-4">Get In Touch</h1>
                    <p className="text-lg text-slate-400 max-w-xl mx-auto">
                        Ready to start? Send us an enquiry and we&apos;ll call you back within 2 hours. Or reach us directly by phone.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
                    <div className="lg:col-span-3">
                        {submitted ? (
                            <div className="bg-white border border-slate-800 rounded-2xl p-12 text-center animate-fade-in shadow-sm">
                                <div className="w-16 h-16 rounded-full bg-blue-600/10 flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <h2 className="text-2xl font-bold text-dark mb-2">Enquiry Sent!</h2>
                                <p className="text-slate-500 mb-2">Thanks for getting in touch.</p>
                                <p className="text-slate-500">We&apos;ll call you back within 2 hours during business hours.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="bg-white border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
                                <h2 className="text-xl font-bold text-dark mb-1">Send Us an Enquiry</h2>
                                <p className="text-sm text-slate-500 mb-4">All fields marked with * are required.</p>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="ct-name" className="block text-sm font-medium text-dark mb-1.5">Full Name *</label>
                                        <input id="ct-name" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Your name" />
                                    </div>
                                    <div>
                                        <label htmlFor="ct-phone" className="block text-sm font-medium text-dark mb-1.5">Phone Number *</label>
                                        <input id="ct-phone" type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="07XXX XXXXXX" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="ct-email" className="block text-sm font-medium text-dark mb-1.5">Email</label>
                                    <input id="ct-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="you@email.com" />
                                </div>

                                <div>
                                    <label htmlFor="ct-course" className="block text-sm font-medium text-dark mb-1.5">Interested In</label>
                                    <select id="ct-course" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} className={inputClass}>
                                        <option value="">Select a course...</option>
                                        {courses.map((c) => (<option key={c.slug} value={c.slug}>{c.title}</option>))}
                                        <option value="other">Not sure yet</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="ct-hear" className="block text-sm font-medium text-dark mb-1.5">How did you hear about us?</label>
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
                                    <label htmlFor="ct-message" className="block text-sm font-medium text-dark mb-1.5">Message (optional)</label>
                                    <textarea id="ct-message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputClass} resize-none min-h-[100px]`} placeholder="Any questions or specific requirements?" />
                                </div>

                                <button type="submit" disabled={loading} className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/25 active:scale-[0.98] min-h-[48px]">
                                    {loading ? "Sending..." : "Send Enquiry"}
                                </button>
                            </form>
                        )}
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        {/* Phone */}
                        <div className="bg-white border border-slate-800 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-blue-600/10 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-dark">Call Us</h3>
                                    <p className="text-sm text-slate-500">Mon–Sat, 8am–6pm</p>
                                </div>
                            </div>
                            <a href="tel:+4401234567890" className="text-xl font-bold text-dark hover:text-blue-600 transition-colors">01234 567 890</a>
                        </div>

                        {/* Callback */}
                        <div className="bg-white border border-slate-800 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-blue-600/10 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-dark">Request a Callback</h3>
                                    <p className="text-sm text-slate-500">Pick a time that suits you</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-500">Let us know your preferred time in the enquiry form and we&apos;ll call you then.</p>
                        </div>

                        {/* Map */}
                        <div className="bg-white border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                            <div className="p-6 pb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-600/10 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-dark">Training Centre</h3>
                                        <p className="text-sm text-slate-500">Midlands, UK</p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-48 bg-slate-100 flex items-center justify-center text-slate-500 text-sm">
                                <span>Google Maps embed — update with real address</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
