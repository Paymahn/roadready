"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useEnquiry } from "@/context/EnquiryContext";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { openEnquiry } = useEnquiry();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    scrolled
                        ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-800/20"
                        : "bg-transparent"
                )}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo — shield-style */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-9 h-9 flex items-center justify-center text-white font-bold text-sm group-hover:opacity-90 transition-opacity" style={{ clipPath: "polygon(50% 0%, 100% 20%, 100% 80%, 50% 100%, 0% 80%, 0% 20%)", background: "linear-gradient(135deg, var(--color-blue-500), var(--color-blue-700))" }}>
                                RR
                            </div>
                            <span className="text-xl font-bold text-dark">
                                Road<span className="text-blue-600">Ready</span>
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-blue-600 rounded-lg hover:bg-blue-600/5 transition-all duration-200"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Phone + CTA + Mobile Toggle */}
                        <div className="flex items-center gap-3">
                            <a href="tel:+4401234567890" className="hidden lg:inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors">
                                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                <span>01234 567 890</span>
                            </a>
                            <button
                                onClick={() => openEnquiry()}
                                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/25 active:scale-95 min-h-[44px]"
                            >
                                Enquire Now
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>

                            {/* Mobile hamburger */}
                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="md:hidden p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-600/5 transition-colors"
                                aria-label="Toggle menu"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    {mobileOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu — slide-in from right */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div className="absolute inset-0 bg-dark/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} aria-hidden />
                    <div className="absolute top-0 right-0 bottom-0 w-full max-w-xs bg-white shadow-2xl border-l border-slate-800/30 flex flex-col pt-20 px-6 animate-slide-right">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="py-3 text-lg font-medium text-dark hover:text-blue-600 transition-colors border-b border-slate-800/30 last:border-0"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <a href="tel:+4401234567890" className="py-3 text-lg font-medium text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-2">
                            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            01234 567 890
                        </a>
                        <button
                            onClick={() => { setMobileOpen(false); openEnquiry(); }}
                            className="mt-6 w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all duration-200 min-h-[48px]"
                        >
                            Enquire Now
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
