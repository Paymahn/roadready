import { test as base, expect, type Page } from "@playwright/test";

/**
 * Shared fixture:
 *  - stubs the Meta Pixel (`fbq`) so tests don't depend on cookie consent and the
 *    client-side Lead event is a harmless no-op;
 *  - blocks the external Meta Pixel script so the suite is hermetic (works offline / in CI).
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript(() => {
      const w = window as unknown as { fbq: (...args: unknown[]) => void; _fbq: unknown };
      w.fbq = () => {};
      w._fbq = w.fbq;
      // Dismiss the cookie banner so it never interferes with functional/visual
      // tests; consent behaviour itself is covered by consent.spec.ts.
      document.cookie = "rr_consent=rejected; path=/";
    });
    await page.route(/connect\.facebook\.net/, (route) => route.abort());
    await use(page);
  },
});

export { expect };

/** Wait for web fonts to finish loading so layout and screenshots are stable. */
export async function settle(page: Page): Promise<void> {
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
}
