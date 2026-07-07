"use client";

import { useEffect, useState, type FormEvent } from "react";
import { postEnquiry, type EnquiryFormType } from "@/lib/submit-enquiry";
import { hasSubmittedEnquiry } from "@/lib/enquiry-session";

// Shared machinery for every enquiry form variant: field state, honeypot, fill-time stamp,
// single-use Turnstile token management, and the postEnquiry orchestration (client Lead
// pixel + server forward). Markup stays in each form component; this owns the behaviour.
//
// `lockedCourseSlug` pins the submission to one course (the ads landing page) — the form
// then renders the course as static text instead of a dropdown, and the Lead event still
// carries that course's value via courseLeadValue.
export function useEnquiryForm(formType: EnquiryFormType, lockedCourseSlug?: string) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formStartedAt] = useState(() => Date.now());
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);
  // email is optional everywhere; the API omits it from the CRM forward when empty.
  const [form, setForm] = useState({ name: "", phone: "", email: "", course: "", website: "" });

  // Already submitted this visit (any form variant) → open on the thanks state instead of
  // inviting a duplicate. Effect, not initial state: sessionStorage isn't there during SSR,
  // and flipping post-hydration keeps server and client markup identical.
  useEffect(() => {
    if (hasSubmittedEnquiry()) setSubmitted(true);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError(null);
    try {
      const course = lockedCourseSlug ?? form.course;
      const result = await postEnquiry({
        body: { ...form, course, formStartedAt },
        formType,
        courseSlug: course || undefined,
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

  return {
    submitted,
    loading,
    submitError,
    form,
    setForm,
    handleSubmit,
    turnstileKey,
    setTurnstileToken,
  };
}
