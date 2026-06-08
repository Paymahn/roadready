import { describe, it, expect, vi, beforeEach, afterEach, type MockInstance } from "vitest";

// Mock next/server: keep the real NextRequest/NextResponse, but stub `after` (it throws
// outside a request scope) with a fn that CAPTURES the scheduled callback — so we can assert
// the CAPI is deferred post-response (not run inline) and run it on demand via flushAfter().
vi.mock("next/server", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next/server")>();
  return { ...actual, after: vi.fn() };
});

// Mock the Meta CAPI so we can assert whether/how it's called, without touching Meta.
vi.mock("@/lib/meta-capi", () => ({
  sendMetaLeadCapi: vi.fn().mockResolvedValue(undefined),
}));

import { NextRequest, after } from "next/server";
import { sendMetaLeadCapi } from "@/lib/meta-capi";
import { POST } from "@/app/api/enquiry/route";

let crmCalls: string[] = [];
let crmBehavior: "ok" | "non-ok" | "throw" = "ok";
let errSpy: MockInstance;

beforeEach(() => {
  vi.clearAllMocks();
  crmCalls = [];
  crmBehavior = "ok";
  vi.spyOn(console, "log").mockImplementation(() => {});
  errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  // CRM forward is a server-side global fetch; behaviour is switched per test via crmBehavior.
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string | URL | Request) => {
      crmCalls.push(String(url));
      if (crmBehavior === "throw") throw new Error("simulated CRM abort/network failure");
      if (crmBehavior === "non-ok") return new Response("upstream error", { status: 500 });
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }),
  );
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

let seq = 0;
// Unique name/phone/IP per request dodges the route's per-IP rate limit and payload dedup.
function enquiry(consent: boolean, course?: string): NextRequest {
  seq += 1;
  return new NextRequest("https://www.roadreadyhgv.com/api/enquiry", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": `10.0.0.${seq}` },
    body: JSON.stringify({
      name: `Tester ${seq}`,
      phone: `077009000${seq}`,
      eventId: `evt-${seq}`,
      formType: "inline",
      formStartedAt: Date.now() - 5000, // older than MIN_FORM_FILL_MS
      consent,
      ...(course !== undefined && { course }),
    }),
  });
}

// Run the CAPI callback(s) the route scheduled via after().
async function flushAfter() {
  for (const call of vi.mocked(after).mock.calls) {
    await (call[0] as () => unknown)();
  }
}

describe("POST /api/enquiry — CRM capture, CAPI deferred to after()", () => {
  it("CRM ok → 200; CAPI deferred (not inline), then carries value 3000/GBP on flush", async () => {
    const res = await POST(enquiry(true, "hgv-cat-ce"));
    expect(res.status).toBe(200);
    expect(crmCalls.length).toBe(1);
    expect(sendMetaLeadCapi).not.toHaveBeenCalled(); // deferred, not run inline
    expect(after).toHaveBeenCalledTimes(1); // CAPI scheduled post-response
    await flushAfter();
    expect(sendMetaLeadCapi).toHaveBeenCalledWith(
      expect.objectContaining({ value: 3000, currency: "GBP" }),
    );
  });

  it("CPC → CAPI (on flush) carries value 75 + GBP", async () => {
    await POST(enquiry(true, "cpc-periodic-training"));
    await flushAfter();
    expect(sendMetaLeadCapi).toHaveBeenCalledWith(
      expect.objectContaining({ value: 75, currency: "GBP" }),
    );
  });

  it("general enquiry (course='other') → CAPI (on flush) has no value/currency", async () => {
    await POST(enquiry(true, "other"));
    await flushAfter();
    const arg = vi.mocked(sendMetaLeadCapi).mock.calls[0]?.[0];
    expect(arg?.value).toBeUndefined();
    expect(arg?.currency).toBeUndefined();
  });

  it("consent=false → CRM still forwarded + success, but NO CAPI scheduled", async () => {
    const res = await POST(enquiry(false, "hgv-cat-ce"));
    expect(res.status).toBe(200);
    expect(crmCalls.length).toBe(1); // CRM forward is unconditional
    expect(after).not.toHaveBeenCalled();
  });
});

describe("POST /api/enquiry — graceful CRM failure (no 502, recoverable)", () => {
  it("CRM timeout/abort/throw → 503 (NOT 502), phone in message, LEAD_CAPTURE_FAILED logged, no CAPI", async () => {
    crmBehavior = "throw";
    const res = await POST(enquiry(true, "hgv-cat-ce"));
    expect(res.status).toBe(503);
    expect(res.status).not.toBe(502);
    const body = (await res.json()) as { error: string };
    expect(body.error).toContain("0330 043 7166"); // phone surfaced for a down-CRM
    expect(errSpy).toHaveBeenCalledWith("LEAD_CAPTURE_FAILED", expect.stringContaining("Tester"));
    expect(after).not.toHaveBeenCalled(); // no CAPI when capture failed
    expect(sendMetaLeadCapi).not.toHaveBeenCalled();
  });

  it("CRM responds non-ok → 503 graceful (not 502), full lead logged for recovery", async () => {
    crmBehavior = "non-ok";
    const res = await POST(enquiry(true, "hgv-cat-ce"));
    expect(res.status).toBe(503);
    expect(errSpy).toHaveBeenCalledWith("LEAD_CAPTURE_FAILED", expect.any(String));
  });
});

describe("POST /api/enquiry — CAPI never affects the user response", () => {
  it("CAPI rejecting in after() doesn't change the already-sent 200 and doesn't throw out", async () => {
    vi.mocked(sendMetaLeadCapi).mockRejectedValueOnce(new Error("CAPI down"));
    const res = await POST(enquiry(true, "hgv-cat-ce"));
    expect(res.status).toBe(200); // response already returned, independent of CAPI
    await expect(flushAfter()).resolves.toBeUndefined(); // the .catch swallows the CAPI failure
  });
});
