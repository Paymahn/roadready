"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface EnquiryContextType {
    isOpen: boolean;
    preselectedCourse: string;
    openEnquiry: (course?: string) => void;
    closeEnquiry: () => void;
}

const EnquiryContext = createContext<EnquiryContextType | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [preselectedCourse, setPreselectedCourse] = useState("");

    const openEnquiry = useCallback((course?: string) => {
        // Guard: several CTAs wire this directly as onClick={openEnquiry}, so React
        // passes the click event as `course`. Only accept real string slugs — otherwise
        // the event object lands in form state and breaks JSON.stringify on submit.
        setPreselectedCourse(typeof course === "string" ? course : "");
        setIsOpen(true);
        document.body.style.overflow = "hidden";
    }, []);

    const closeEnquiry = useCallback(() => {
        setIsOpen(false);
        setPreselectedCourse("");
        document.body.style.overflow = "";
    }, []);

    return (
        <EnquiryContext.Provider value={{ isOpen, preselectedCourse, openEnquiry, closeEnquiry }}>
            {children}
        </EnquiryContext.Provider>
    );
}

export function useEnquiry() {
    const ctx = useContext(EnquiryContext);
    if (!ctx) throw new Error("useEnquiry must be used within EnquiryProvider");
    return ctx;
}
