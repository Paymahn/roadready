import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendMetaLeadCapi } from "@/lib/meta-capi";

// Unit-test the REAL sendMetaLeadCapi (not mocked) by capturing the POST body, to prove
// value/currency land inside custom_data (Meta's spec) — not at the event top level.
type CapiEvent = Record<string, unknown> & {
  custom_data?: { value?: number; currency?: string };
};
type CapiBody = { data: CapiEvent[] };

let lastBody: CapiBody | null = null;

beforeEach(() => {
  vi.clearAllMocks();
  lastBody = null;
  // sendMetaLeadCapi reads these at call time and returns early without them.
  process.env.META_CAPI_ACCESS_TOKEN = "test-token";
  process.env.META_PIXEL_ID = "0000000000";
  vi.stubGlobal(
    "fetch",
    vi.fn(async (_url: string | URL | Request, init?: { body?: string }) => {
      lastBody = init?.body ? (JSON.parse(init.body) as CapiBody) : null;
      return new Response(JSON.stringify({ events_received: 1 }), { status: 200 });
    }),
  );
});

const baseArgs = {
  eventId: "evt-1",
  eventSourceUrl: "https://www.roadreadyhgv.com/",
  phone: "07700900000",
  clientIp: "1.2.3.4",
  userAgent: "test-agent",
};

describe("sendMetaLeadCapi — value/currency placement", () => {
  it("puts value + currency INSIDE custom_data, not at the event top level", async () => {
    await sendMetaLeadCapi({ ...baseArgs, value: 3000, currency: "GBP" });
    const event = lastBody!.data[0];
    expect(event.custom_data).toEqual({ value: 3000, currency: "GBP" });
    expect(event.value).toBeUndefined();
    expect(event.currency).toBeUndefined();
    expect(event.event_name).toBe("Lead");
  });

  it("omits custom_data entirely when no value is given", async () => {
    await sendMetaLeadCapi({ ...baseArgs });
    const event = lastBody!.data[0];
    expect(event.custom_data).toBeUndefined();
  });
});
