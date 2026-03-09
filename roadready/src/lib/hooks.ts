"use client";

import { useState, useEffect, useRef } from "react";

// Animated counter hook
export function useCountUp(target: number, duration = 2000) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setStarted(true); },
            { threshold: 0.3 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        if (!started) return;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const interval = setInterval(() => {
            current += increment;
            if (current >= target) { setCount(target); clearInterval(interval); }
            else { setCount(Math.floor(current * 10) / 10); }
        }, duration / steps);
        return () => clearInterval(interval);
    }, [started, target, duration]);

    return { count, ref };
}

// Scroll-reveal hook: when element enters viewport, set revealed to true for animation
export function useReveal(opts?: { threshold?: number; rootMargin?: string }) {
    const [revealed, setRevealed] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
            { threshold: opts?.threshold ?? 0.15, rootMargin: opts?.rootMargin ?? "0px 0px -40px 0px" }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [opts?.threshold, opts?.rootMargin]);
    return { ref, revealed };
}
