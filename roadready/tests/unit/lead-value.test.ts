import { describe, it, expect } from "vitest";
import { courseLeadValue, LEAD_VALUE_CURRENCY } from "@/lib/data";

describe("courseLeadValue — course slug → internal Lead-value proxy", () => {
  it("maps known course slugs to their price proxy", () => {
    expect(courseLeadValue("hgv-cat-c")).toBe(2300);
    expect(courseLeadValue("hgv-cat-ce")).toBe(3000);
    expect(courseLeadValue("hgv-cat-c-ce-combo")).toBe(5000);
    expect(courseLeadValue("adr-dangerous-goods")).toBe(650);
    expect(courseLeadValue("cpc-periodic-training")).toBe(75);
  });

  it("returns undefined for general / unknown enquiries (so callers omit value)", () => {
    expect(courseLeadValue("other")).toBeUndefined();
    expect(courseLeadValue("")).toBeUndefined();
    expect(courseLeadValue(undefined)).toBeUndefined();
    expect(courseLeadValue("not-a-real-slug")).toBeUndefined();
  });

  it("uses GBP", () => {
    expect(LEAD_VALUE_CURRENCY).toBe("GBP");
  });
});
