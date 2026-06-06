import { test, expect, settle } from "./fixtures";

// Tagged @visual — only runs via `npm run test:visual` (production build).
// Baselines are Linux-generated and committed; see e2e/README.md. macOS baselines
// will NOT match CI's Linux renderer, so don't commit *-darwin.png.
test.describe("@visual", () => {
  test("homepage above-the-fold", async ({ page }) => {
    await page.goto("/");
    await settle(page);
    // Viewport (not full-page) screenshot avoids scroll-triggered UI (the sticky CTA).
    await expect(page).toHaveScreenshot("homepage-hero.png", { animations: "disabled" });
  });
});
