# Testing & quality safeguards

Automated checks that run locally and in CI. The goal is to catch mobile regressions before
they reach paid ad traffic — most visitors are on a phone.

> **Repo layout:** the Next.js app lives in the `roadready/` subdirectory of the git repo, so
> run all `npm` scripts from `roadready/`. The CI workflow sits at the **repo root**
> (`.github/workflows/ci.yml`) because GitHub only reads workflows there; its jobs `cd` into
> `roadready/` automatically via `working-directory`.

## Quick start

```bash
npm run test             # functional + accessibility (Playwright, dev server) — fast
npm run typecheck        # tsc --noEmit
npm run lint             # eslint
npm run test:visual      # pixel-diff screenshots (production build) — see "Visual" below
npm run test:lighthouse  # Lighthouse mobile budgets (production build)
npm run test:ui          # Playwright UI mode — great for debugging a failing test
```

`npm run test` is the quick pre-push check. It auto-starts `next dev`, runs the functional +
a11y specs across mobile (375) / tablet (768) / desktop (1280), then tears the server down.

## What runs where

| Check | Local script | CI job | Blocks merge? |
| --- | --- | --- | --- |
| Lint | `npm run lint` | `quality` | ✅ yes |
| Typecheck | `npm run typecheck` | `quality` | ✅ yes |
| Build | `npm run build` | `quality` | ✅ yes |
| Functional + a11y | `npm run test` | `e2e` | ✅ yes |
| Visual regression | `npm run test:visual` | `visual` | ⚠️ informational until baselines committed |
| Lighthouse | `npm run test:lighthouse` | `lighthouse` | ⚠️ informational (warnings) |

In GitHub branch protection, make **`quality`** and **`e2e`** required status checks. Leave
`visual` and `lighthouse` optional until you've lived with them for a week or two — that
keeps noisy/slow checks from blocking merges.

## Functional + accessibility (`e2e/*.spec.ts`)

- `homepage.spec.ts` — no horizontal scroll at all three breakpoints (the known past bug),
  hero CTA visible, hero CTA opens the enquiry modal.
- `enquiry.spec.ts` — the money path. Mocks `POST /api/enquiry` so it never touches the real
  CRM/Meta, fills and submits the inline form and the modal form, asserts the success state,
  and checks a server error is surfaced to the user.
- `a11y.spec.ts` — runs axe-core on `/`, `/contact`, `/courses`; fails on any
  `critical`/`serious` violation (missing labels, accessible names, structure).
  Pre-existing `color-contrast` issues are reported as a non-blocking backlog
  (`KNOWN_BACKLOG` in the spec) — fix them, then remove the id to make them block.

The Meta Pixel is stubbed and `connect.facebook.net` is blocked (see `fixtures.ts`) so tests
are hermetic and don't depend on cookie consent.

## Visual regression (`e2e/visual.spec.ts`, tagged `@visual`)

Pixel screenshots are **OS-dependent** — a baseline made on macOS will not match CI's Linux
renderer (different font anti-aliasing). So baselines are generated in the official Playwright
Linux container and committed to the repo. Do **not** commit `*-darwin.png` baselines.

Generate / update Linux baselines locally via Docker (needs Docker Desktop):

```bash
docker run --rm -v "$PWD":/work -w /work mcr.microsoft.com/playwright:v1.60.0-noble \
  bash -lc "npm ci && npm run test:visual:update"
git add e2e/visual.spec.ts-snapshots
```

When an intentional design change makes the `visual` job fail: review the diff in the
`visual-snapshots` CI artifact, regenerate baselines with the command above, and commit them.

## Lighthouse budgets (`lighthouserc.json`)

Runs the mobile preset (simulated mid-tier phone on throttled 4G), median of 3 runs.

| Metric | Target | Plain English |
| --- | --- | --- |
| LCP | < 2.5s (hard-fail > 4s) | Time for the biggest above-the-fold element to appear. Slow LCP = bounced ad clicks. |
| FCP | < 1.8s | Time until anything paints. |
| CLS | < 0.1 (hard-fail > 0.25) | How much the page jumps while loading — high = mis-taps. |
| TBT | < 300ms | How long the page is unresponsive to taps while JS runs. |
| JS transferred | < 300KB | Script weight. |
| Page weight | < 1.6MB | Total — images dominate; use next/image + AVIF/WebP. |

Most assertions are warnings; only egregious LCP/CLS fail the job, so everyday perf noise
won't block merges. Tighten thresholds (and flip warnings to errors) once you know the site's
real numbers — `lhci` prints a temporary public report URL each run.

## Pointing CI at a Vercel preview (optional, later)

Set `PLAYWRIGHT_BASE_URL=https://<preview>.vercel.app` and Playwright skips its own server and
tests the real deployment (more production-like — real CDN/edge). Point `lighthouserc.json`'s
`url` at the same preview to measure the deployed site instead of an in-runner build.
