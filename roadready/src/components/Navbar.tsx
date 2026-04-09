"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useEnquiry } from "@/context/EnquiryContext";
import { CONTACT } from "@/lib/contact";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    // { href: "/#success-stories", label: "Success Stories" }, // restore when SuccessStories section is live
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
                        ? "bg-slate-950/95 backdrop-blur-xl shadow-sm border-b border-white/10"
                        : "bg-transparent"
                )}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        <Link href="/" className="flex items-center group">
                            <Image
                                src="/images/roadready-logo.png"
                                alt="RoadReady HGV"
                                width={240}
                                height={72}
                                className="h-16 sm:h-20 w-auto group-hover:opacity-90 transition-opacity invert hue-rotate-180"
                                priority
                            />
                        </Link>

                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            <a href={`tel:${CONTACT.phone.raw}`} className="hidden lg:inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-white transition-colors">
                                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                <span>{CONTACT.phone.display}</span>
                            </a>
                            <button
                                onClick={() => openEnquiry()}
                                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-emerald-600/25 active:scale-95 min-h-[44px]"
                            >
                                Enquire Now
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>

                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="md:hidden p-2 text-white hover:text-amber-400 rounded-lg hover:bg-white/5 transition-colors"
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

            {mobileOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} aria-hidden />
                    <div className="absolute top-0 right-0 bottom-0 w-full max-w-xs bg-slate-900 shadow-2xl border-l border-white/10 flex flex-col pt-20 px-6 animate-slide-right">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="py-3.5 text-lg font-medium text-white hover:text-amber-400 transition-colors border-b border-white/10 last:border-0"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <a href={`tel:${CONTACT.phone.raw}`} className="py-3.5 text-lg font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            {CONTACT.phone.display}
                        </a>
                        <button
                            onClick={() => { setMobileOpen(false); openEnquiry(); }}
                            className="mt-6 w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-full transition-all duration-200 min-h-[48px]"
                        >
                            Enquire Now
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
