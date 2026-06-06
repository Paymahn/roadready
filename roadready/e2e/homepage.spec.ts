import { test, expect, settle } from "./fixtures";

test.describe("homepage", () => {
  test("loads with the hero CTA and correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/RoadReady/i);
    await expect(page.getByRole("button", { name: /get free quote/i }).first()).toBeVisible();
  });

  test("has no horizontal scroll", async ({ page }) => {
    await page.goto("/");
    await settle(page);
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    // Allow 1px for sub-pixel rounding.
    expect(
      scrollWidth,
      `horizontal overflow: scrollWidth ${scrollWidth} > clientWidth ${clientWidth}`,
    ).toBeLessThanOrEqual(clientWidth + 1);
  });

  test("hero CTA opens the enquiry modal", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /get free quote/i }).first().click();
    await expect(page.getByRole("heading", { name: /get your free quote/i })).toBeVisible();
  });
});
