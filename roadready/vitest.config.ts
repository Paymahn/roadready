import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

// Unit tests for server-side logic (e.g. the enquiry API route). Playwright covers the
// browser/E2E layer but can't observe server-side fetches — the CRM forward and Meta CAPI
// run inside the Next server process — so those are asserted here instead. `include` is
// scoped to tests/ so Playwright's e2e/*.spec.ts files are never picked up by vitest.
export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    // route.ts captures these at module load, so they must exist before the test imports it.
    env: {
      CRM_ENQUIRY_URL: "https://crm.test/enquiry",
      CRM_ENQUIRY_TOKEN: "test-token",
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      // `server-only` is a compiler-enforced marker: Next resolves it internally during
      // builds (it isn't an installed package), so vitest's real node resolution can't
      // find it. Alias it to an inert stub — the unit suite imports server modules directly.
      "server-only": fileURLToPath(new URL("./tests/stubs/server-only.ts", import.meta.url)),
    },
  },
});
