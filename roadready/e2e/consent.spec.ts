import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "./fixtures";

// The shared fixture sets rr_consent=rejected (so the banner doesn't interfere with
// other specs). These tests need the banner visible, so clear it first — this init
// script runs after the fixture's, leaving no consent cookie → the banner shows.
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    document.cookie = "rr_consent=; path=/; max-age=0";
  });
});

const banner = (page: import("@playwright/test").Page) =>
  page.getByRole("dialog", { name: /cookie consent/i });

test("banner shows on first visit with no critical/serious a11y issues", async ({ page }) => {
  await page.goto("/");
  await expect(banner(page)).toBeVisible();
  const { violations } = await new AxeBuilder({ page })
    .include('[aria-label="Cookie consent"]')
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  const serious = violations.filter((v) => v.impact === "critical" || v.impact === "serious");
  expect(serious, JSON.stringify(serious.map((v) => v.id))).toEqual([]);
});

test("accept all dismisses the banner and stores consent=accepted", async ({ page }) => {
  await page.goto("/");
  await banner(page).getByRole("button", { name: /accept all/i }).click();
  await expect(banner(page)).toHaveCount(0);
  const cookie = (await page.context().cookies()).find((c) => c.name === "rr_consent");
  expect(cookie?.value).toBe("accepted");
});

test("reject all dismisses the banner and stores consent=rejected", async ({ page }) => {
  await page.goto("/");
  await banner(page).getByRole("button", { name: /reject all/i }).click();
  await expect(banner(page)).toHaveCount(0);
  const cookie = (await page.context().cookies()).find((c) => c.name === "rr_consent");
  expect(cookie?.value).toBe("rejected");
});
