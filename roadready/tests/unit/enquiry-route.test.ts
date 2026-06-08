import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// Mock the Meta CAPI module so we can assert whether it fires — without touching Meta. It's
// a server-side fetch (invisible to Playwright), which is exactly why this is a unit test.
vi.mock("@/lib/meta-capi", () => ({
  sendMetaLeadCapi: vi.fn().mockResolvedValue(undefined),
}));

import { sendMetaLeadCapi } from "@/lib/meta-capi";
import { POST } from "@/app/api/enquiry/route";

const crmCalls: string[] = [];

beforeEach(() => {
  vi.clearAllMocks();
  crmCalls.length = 0;
  // The CRM forward is a server-side global fetch; stub it to a 200 so the handler runs
  // through to the CAPI decision. CAPI is mocked above, so this stub only sees the CRM call.
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string | URL | Request) => {
      crmCalls.push(String(url));
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }),
  );
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
      formStartedAt: Date.now() - 5000, // older than MIN_FORM_FILL_MS, so not rejected as too fast
      consent,
      ...(course !== undefined && { course }),
    }),
  });
}

describe("POST /api/enquiry — consent gates Meta CAPI, never the CRM forward", () => {
  it("consent=true → lead forwarded to CRM AND CAPI fired", async () => {
    const res = await POST(enquiry(true));
    expect(res.status).toBe(200);
    expect(crmCalls).toContain("https://crm.test/enquiry"); // CRM forward happened
    expect(sendMetaLeadCapi).toHaveBeenCalledTimes(1); // CAPI fired
  });

  it("consent=false → lead STILL forwarded to CRM, CAPI NOT fired", async () => {
    const res = await POST(enquiry(false));
    expect(res.status).toBe(200);
    expect(crmCalls).toContain("https://crm.test/enquiry"); // identical UX: CRM still gets the lead
    expect(sendMetaLeadCapi).not.toHaveBeenCalled(); // CAPI suppressed
  });
});

describe("POST /api/enquiry — Lead value reflects the course (internal proxy)", () => {
  it("Cat C+E enquiry → CAPI Lead carries value 3000 + GBP", async () => {
    await POST(enquiry(true, "hgv-cat-ce"));
    expect(sendMetaLeadCapi).toHaveBeenCalledWith(
      expect.objectContaining({ value: 3000, currency: "GBP" }),
    );
  });

  it("CPC enquiry → CAPI Lead carries value 75 + GBP", async () => {
    await POST(enquiry(true, "cpc-periodic-training"));
    expect(sendMetaLeadCapi).toHaveBeenCalledWith(
      expect.objectContaining({ value: 75, currency: "GBP" }),
    );
  });

  it("general enquiry (course='other') → CAPI Lead fires with NO value/currency, CRM still forwarded", async () => {
    await POST(enquiry(true, "other"));
    expect(sendMetaLeadCapi).toHaveBeenCalledTimes(1);
    const arg = vi.mocked(sendMetaLeadCapi).mock.calls[0]?.[0];
    expect(arg?.value).toBeUndefined();
    expect(arg?.currency).toBeUndefined();
    expect(crmCalls).toContain("https://crm.test/enquiry");
  });
});
