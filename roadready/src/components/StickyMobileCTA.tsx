"use client";

import { useState, useEffect } from "react";
import { useEnquiry } from "@/context/EnquiryContext";

export default function StickyMobileCTA() {
    const [visible, setVisible] = useState(false);
    const { openEnquiry } = useEnquiry();

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 600);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div
            className={`fixed bottom-0 inset-x-0 z-50 lg:hidden transition-all duration-300 ${visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-full opacity-0 pointer-events-none"
                }`}
        >
            <div className="bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-3 flex items-center gap-3">
                <button
                    onClick={() => openEnquiry()}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base rounded-full transition-all duration-200 active:scale-95 min-h-[48px]"
                >
                    Enquire Now
                </button>
                <a
                    href="tel:+4401234567890"
                    className="shrink-0 w-12 h-12 rounded-full border-2 border-emerald-600 flex items-center justify-center text-emerald-600 hover:bg-emerald-50 transition-colors"
                    aria-label="Call us"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                </a>
            </div>
        </div>
    );
}
