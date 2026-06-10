import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "./fixtures";

// Catch the big stuff: missing labels, accessible names, structure, contrast.
// Fails only on critical/serious — not a full WCAG audit.
const ROUTES = ["/", "/contact", "/courses", "/cat-ce-direct-access"];

// Pre-existing debt that is reported but not yet blocking, so the suite can gate on
// real regressions today. Fix these, then remove the id to make them block too.
// See e2e/README.md.
const KNOWN_BACKLOG = new Set(["color-contrast"]);

for (const route of ROUTES) {
  test(`no critical or serious a11y violations on ${route}`, async ({ page }, testInfo) => {
    await page.goto(route);
    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const seriousOrWorse = violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );
    const blocking = seriousOrWorse.filter((v) => !KNOWN_BACKLOG.has(v.id));
    const backlog = seriousOrWorse.filter((v) => KNOWN_BACKLOG.has(v.id));

    // Surface known debt in the report without failing the build.
    if (backlog.length) {
      const note = backlog.map((v) => `${v.id} (${v.impact}, ${v.nodes.length} node(s))`).join("; ");
      testInfo.annotations.push({ type: "a11y-backlog", description: `${route}: ${note}` });
    }

    const summary = blocking
      .map((v) => `  • [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} node(s))`)
      .join("\n");
    expect(blocking, `Blocking a11y violations on ${route}:\n${summary}`).toEqual([]);
  });
}
