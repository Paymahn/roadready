import { test, expect, settle } from "./fixtures";

// Meta ads landing page (/cat-ce-direct-access): chrome-free by design — no site nav,
// no sticky CTA, minimal footer. Consent + pixel gating on this route is covered in
// pixel.spec.ts (bare test, real banner); a11y.spec.ts includes the route in its sweep.

const ROUTE = "/cat-ce-direct-access";

test.describe("meta ads landing page", () => {
  test("renders the licence-framed hero with the locked-course enquiry form", async ({ page }) => {
    await page.goto(ROUTE);
    await expect(page).toHaveTitle(/cat c\+e/i);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/cat c\+e licence/i);
    await expect(page.getByLabel(/your full name/i)).toBeVisible();
    await expect(page.getByLabel(/phone number/i)).toBeVisible();
    // Course is locked to the page's course — static text, no dropdown.
    await expect(page.getByText("HGV Category C+E").first()).toBeVisible();
    await expect(page.getByRole("combobox")).toHaveCount(0);
    await expect(page.getByRole("button", { name: /get my free quote/i })).toBeVisible();
  });

  test("has no site navigation — the page's one job is the form", async ({ page }) => {
    await page.goto(ROUTE);
    await expect(page.locator("nav")).toHaveCount(0);
    await expect(page.getByRole("link", { name: /^courses$/i })).toHaveCount(0);
    await expect(page.getByRole("link", { name: /^contact$/i })).toHaveCount(0);
    // The deliberate escape hatches remain: privacy + main-site link in the footer.
    await expect(page.getByRole("link", { name: /privacy policy/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /visit roadreadyhgv\.com/i })).toBeVisible();
    // PECR: consent stays revocable on this route too.
    await expect(page.getByRole("button", { name: /cookie preferences/i })).toBeVisible();
  });

  test("has no horizontal scroll", async ({ page }) => {
    await page.goto(ROUTE);
    await settle(page);
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(
      scrollWidth,
      `horizontal overflow: scrollWidth ${scrollWidth} > clientWidth ${clientWidth}`,
    ).toBeLessThanOrEqual(clientWidth + 1);
  });

  test("repeat CTA anchors back to the enquiry form", async ({ page }) => {
    await page.goto(ROUTE);
    await settle(page);
    await page.getByRole("link", { name: /get my free quote/i }).click();
    await expect(page.getByLabel(/your full name/i)).toBeInViewport();
  });
});
