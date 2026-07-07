import { describe, it, expect, beforeEach, vi } from "vitest";
import { markEnquirySubmitted, hasSubmittedEnquiry, clearEnquirySubmitted } from "@/lib/enquiry-session";

// Minimal sessionStorage stub — vitest runs in a node environment.
function stubStorage(overrides?: Partial<Storage>) {
  const store = new Map<string, string>();
  const storage = {
    getItem: (k: string) => (store.has(k) ? (store.get(k) as string) : null),
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
    ...overrides,
  } as Storage;
  vi.stubGlobal("sessionStorage", storage);
  return store;
}

beforeEach(() => {
  vi.unstubAllGlobals();
});

describe("enquiry-session flag", () => {
  it("is unset by default", () => {
    stubStorage();
    expect(hasSubmittedEnquiry()).toBe(false);
  });

  it("mark → has reports true, storing a timestamp", () => {
    const store = stubStorage();
    markEnquirySubmitted();
    expect(hasSubmittedEnquiry()).toBe(true);
    const stored = store.get("rr_enquiry_submitted_at");
    expect(stored).toBeTruthy();
    expect(Number.isNaN(Date.parse(stored as string))).toBe(false);
  });

  it("clear (the correction path) resets the flag so the form re-renders", () => {
    stubStorage();
    markEnquirySubmitted();
    expect(hasSubmittedEnquiry()).toBe(true);
    clearEnquirySubmitted();
    expect(hasSubmittedEnquiry()).toBe(false);
  });

  it("never throws when storage is unavailable (SSR / private browsing)", () => {
    // No sessionStorage global at all (SSR shape).
    expect(() => markEnquirySubmitted()).not.toThrow();
    expect(hasSubmittedEnquiry()).toBe(false);

    // Storage present but throwing (private-browsing quota shape).
    stubStorage({
      getItem: () => {
        throw new Error("denied");
      },
      setItem: () => {
        throw new Error("denied");
      },
    });
    expect(() => markEnquirySubmitted()).not.toThrow();
    expect(hasSubmittedEnquiry()).toBe(false);
  });
});
