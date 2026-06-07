import { test, expect, type Page } from "@playwright/test";

// Bare Playwright test (NOT ./fixtures): fbq isn't stubbed and no consent cookie is
// pre-set, so we observe the real gating. The pixel loader (connect.facebook.net) is
// intercepted so nothing leaves the machine. NEXT_PUBLIC_META_PIXEL_ID comes from the
// webServer env in playwright.config.ts.

const fbqType = (page: Page) =>
  page.evaluate(() => typeof (window as unknown as { fbq?: unknown }).fbq);

async function trackPixelRequests(page: Page): Promise<string[]> {
  const requests: string[] = [];
  await page.route(/connect\.facebook\.net/, (route) => {
    requests.push(route.request().url());
    return route.fulfill({ status: 200, contentType: "application/javascript", body: "" });
  });
  return requests;
}

const banner = (page: Page) => page.getByRole("dialog", { name: /cookie consent/i });

test("meta pixel network request fires only after consent is accepted", async ({ page }) => {
  const requests = await trackPixelRequests(page);
  await page.goto("/");
  await expect(banner(page)).toBeVisible();
  expect(requests, "no pixel request before consent").toHaveLength(0);

  await banner(page).getByRole("button", { name: /accept all/i }).click();
  await expect.poll(() => requests.length, { message: "request after Accept", timeout: 5000 }).toBeGreaterThan(0);
});

test("pixel tears down on reject and re-loads on re-accept", async ({ page }) => {
  const requests = await trackPixelRequests(page);
  await page.goto("/");

  // 1. Accept → pixel loads, fbq exists.
  await banner(page).getByRole("button", { name: /accept all/i }).click();
  await expect.poll(() => requests.length).toBeGreaterThan(0);
  await expect(page.locator("#meta-pixel")).toHaveCount(1);
  await expect.poll(() => fbqType(page)).toBe("function");
  const afterAccept = requests.length;

  // 2. Reopen from the footer → Reject → pixel torn down, fbq gone, no new requests.
  await page.getByRole("button", { name: /cookie preferences/i }).click();
  await banner(page).getByRole("button", { name: /reject all/i }).click();
  await expect(page.locator("#meta-pixel")).toHaveCount(0);
  await expect.poll(() => fbqType(page)).toBe("undefined");
  await page.waitForTimeout(300);
  expect(requests.length, "no requests after teardown").toBe(afterAccept);

  // 3. Reopen → Accept again → pixel re-loads fresh.
  await page.getByRole("button", { name: /cookie preferences/i }).click();
  await banner(page).getByRole("button", { name: /accept all/i }).click();
  await expect(page.locator("#meta-pixel")).toHaveCount(1);
  await expect.poll(() => requests.length).toBeGreaterThan(afterAccept);
  await expect.poll(() => fbqType(page)).toBe("function");
});
