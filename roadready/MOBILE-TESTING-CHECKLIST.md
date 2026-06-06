# RoadReady — Manual Mobile Testing Checklist

Run this before **any** production deploy. Use a **real phone on cellular** (not office wifi).
Most ad traffic is mobile — this is the journey your paid clicks actually take.

> The automated tests (Playwright / axe / Lighthouse) catch regressions in CI.
> This checklist catches the things only a human on a real device can feel:
> tap response, scroll smoothness, keyboard behaviour, real-world network.

---

## Test devices (aim for at least one of each)

- [ ] **iPhone (Safari)** — iOS is ~half of UK mobile traffic
- [ ] **Android (Chrome)**
- [ ] **Smallest realistic screen** (iPhone SE / ~375px) — layouts break here first
- [ ] **On 4G/5G, not wifi** — real ad-click conditions (slower, flakier)

---

## Every page — universal checks

- [ ] **NO horizontal scroll** — swipe left/right; the page must not move sideways *(known past bug from full-bleed sections)*
- [ ] No text overflowing its container or getting cut off
- [ ] Nothing peeking off the right edge of the screen
- [ ] Images load, none broken, none stretched/squashed
- [ ] No big layout jump as the page finishes loading (content doesn't shove down)
- [ ] Smooth scrolling, no jank/stutter
- [ ] Tap targets feel big enough (~44px) and aren't crammed together
- [ ] Readable without pinch-zoom; tapping a form field does **NOT** auto-zoom the page

---

## Homepage (`/`)

- [ ] Hero headline + USP list render correctly, not truncated
- [ ] Hero **"GET FREE QUOTE"** button is visible above the fold and opens the enquiry panel
- [ ] **Sticky mobile CTA bar** ("Enquire Now") slides up after scrolling and its button works
- [ ] Sticky CTA phone button dials correctly
- [ ] Inline "Get a free quote" form renders with all fields tappable
- [ ] Course preview cards display and link through
- [ ] FAQ items expand/collapse on tap
- [ ] Final CTA section button works
- [ ] All sections stack cleanly — no overlap, no clipped corners

---

## Navigation

- [ ] Hamburger menu opens and closes
- [ ] Every nav link lands on the right page
- [ ] Logo returns to the homepage

---

## Enquiry form — the money path (test BOTH entry points)

- [ ] **Inline form** (on homepage): fill name + phone, pick a course, submit
- [ ] **Modal form** (opens from any "Enquire"/"Get Quote" button): opens, scrolls if taller than screen, closes via the **X** and via tapping the dark backdrop
- [ ] Phone field shows the **number pad**; email field shows the **@ keyboard**
- [ ] Leaving a required field empty shows a clear error (doesn't submit silently)
- [ ] Submitting a valid form shows the success state ("Enquiry Received!" / "Enquiry Sent!")
- [ ] Submitting while offline fails gracefully (clear error, nothing silently lost)
- [ ] *(After the cookie banner lands)* form still submits with consent **Accepted** AND **Rejected**

---

## Footer & contact

- [ ] Phone link **dials the correct number** when tapped (verify the +44 format)
- [ ] Email link opens the mail app
- [ ] Footer links go somewhere real — **no dead `#` links** (known: social icons + "Terms of Service" placeholders)
- [ ] *(After P2)* "Cookie preferences" link re-opens the consent banner
- [ ] VAT registration line is present in the footer

---

## Other routes

- [ ] `/courses` — cards render, every price shows **"inc VAT"**, links work, no h-scroll
- [ ] `/contact` — form works, no h-scroll
- [ ] `/privacy` — readable, links work

---

## Orientation & resilience

- [ ] Rotate one page to **landscape** — nothing breaks catastrophically
- [ ] Browser **back** button behaves
- [ ] **Reload** mid-page — no broken/stuck state

---

## Sign-off

| Field | Value |
| --- | --- |
| Tester | |
| Device / OS / Browser | |
| Network (wifi / 4G / 5G) | |
| Date | |
| Git commit / preview URL | |

- [ ] **End-to-end critical path works:** open site → read the offer → submit an enquiry → see success
