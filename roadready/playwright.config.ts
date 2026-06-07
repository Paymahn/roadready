import { defineConfig, type PlaywrightTestConfig } from "@playwright/test";

/**
 * Playwright config for RoadReady.
 *
 * Server strategy:
 *  - Local quick checks (`npm run test`): runs against `next dev` for speed.
 *  - CI and visual runs: production build (`next build && next start`) — what users
 *    actually get, and free of the Next.js dev overlay that would pollute screenshots.
 *  - Set PLAYWRIGHT_BASE_URL (e.g. a Vercel preview URL) and Playwright tests that
 *    deployment directly instead of starting its own server.
 *
 * Viewports map to the site's Tailwind breakpoints: 375 (mobile) / 768 (tablet) /
 * 1280 (desktop). Most ad traffic is mobile, so `mobile` is the primary project.
 */
const PROD = !!process.env.PW_PROD;
const CI = !!process.env.CI;
const EXTERNAL = process.env.PLAYWRIGHT_BASE_URL;
const useProdServer = PROD || CI;
const PORT = Number(process.env.PORT ?? (PROD ? 3100 : 3000));
const baseURL = EXTERNAL ?? `http://localhost:${PORT}`;

const config: PlaywrightTestConfig = {
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 2 : 0,
  workers: CI ? 1 : undefined,
  reporter: CI ? [["list"], ["html", { open: "never" }]] : "list",
  expect: {
    // Visual diffs: tolerate a tiny fraction of pixels (anti-aliasing noise).
    toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: "disabled" },
  },
  use: {
    baseURL,
    trace: "on-first-retry",
    // prefers-reduced-motion stabilises CSS transitions for screenshots / assertions.
    contextOptions: { reducedMotion: "reduce" },
  },
  projects: [
    {
      name: "mobile",
      use: { browserName: "chromium", viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true },
    },
    {
      name: "tablet",
      use: { browserName: "chromium", viewport: { width: 768, height: 1024 }, hasTouch: true },
    },
    {
      name: "desktop",
      use: { browserName: "chromium", viewport: { width: 1280, height: 800 } },
    },
  ],
  webServer: EXTERNAL
    ? undefined
    : {
        command: useProdServer ? `npm run build && npm run start -- -p ${PORT}` : "npm run dev",
        url: baseURL,
        reuseExistingServer: !CI && !PROD,
        timeout: 240_000,
        // A dummy pixel id so MetaPixel has something to load in tests (pixel.spec.ts
        // verifies the consent gate). Intercepted in tests — never hits Meta.
        env: { NEXT_PUBLIC_META_PIXEL_ID: "0000000000" },
      },
};

export default defineConfig(config);
