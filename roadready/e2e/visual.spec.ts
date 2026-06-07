import { test, expect, settle } from "./fixtures";

// Tagged @visual — only runs via `npm run test:visual` (production build).
// Baselines are Linux-generated and committed; see e2e/README.md. macOS baselines
// will NOT match CI's Linux renderer, so don't commit *-darwin.png.
test.describe("@visual", () => {
  test("homepage full page", async ({ page }) => {
    test.setTimeout(60_000); // full-page capture of a tall page + image settling
    await page.goto("/");
    await settle(page);

    // Full-page screenshots need below-the-fold (lazy) images loaded first, or the
    // capture is nondeterministic. Scroll through to trigger loading, then wait for
    // images to settle — bounded per image so a never-settling one can't hang us.
    await page.evaluate(async () => {
      const vh = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += vh) {
        window.scrollTo(0, y);
        await new Promise<void>((r) => setTimeout(() => r(), 100));
      }
      window.scrollTo(0, 0);
      await Promise.all(
        Array.from(document.images)
          .filter((img) => !img.complete)
          .map(
            (img) =>
              new Promise<void>((r) => {
                const done = () => r();
                img.addEventListener("load", done, { once: true });
                img.addEventListener("error", done, { once: true });
                setTimeout(done, 3000);
              }),
          ),
      );
    });
    await settle(page);

    // Full-page capture catches below-the-fold changes too. Mask the sticky mobile
    // CTA — it slides in on scroll and is otherwise nondeterministic full-page.
    await expect(page).toHaveScreenshot("homepage-full.png", {
      fullPage: true,
      animations: "disabled",
      mask: [page.getByTestId("sticky-mobile-cta")],
    });
  });
});
