# Supremo Website — UI Audit vs PRD

**Date:** 2026-05-18
**Scope:** Frontend UI only. Backend, APIs and real data wiring are **out of scope** — hardcoded/dummy data is treated as acceptable for this stage.
**Stack:** Next.js 16 + React 19 (App Router)

---

## Legend

| Symbol | Meaning |
|--------|---------|
| ✅ Done | Built, looks good, matches PRD intent |
| 🟡 Partial | Exists but incomplete or off-spec |
| ❌ Missing | Page/section not built |
| ⚠️ Fix | Built but has a UI problem worth fixing |

---

## 1. Executive Summary

The UI is **high quality and on-brand** — premium industrial look, consistent blue corporate palette, strong typography, clean layouts. The five core pages (Home, About, Products, Manufacturing, Dealership, Contact) are well-designed and responsive.

**UI gaps against the PRD:**

1. **Home Hero has no headline and no CTA buttons.** `Hero.tsx` is *only* an animated water canvas + a "Scroll" cue. The PRD explicitly requires hero CTAs: *Become Dealer, Download Catalogue, Contact Us*. This is the single most important fix.
2. **Three page types are missing:** Blog/Knowledge Center, Gallery/Media, and dedicated per-category + per-product pages.
3. **A few smaller UI gaps:** map is a placeholder (not embedded), no real product photography, missing home "Dealer Network" section.

**UI completion: ~70%.** Design quality is excellent; the gap is missing pages and the empty hero.

---

## 2. Page-by-Page UI Comparison

| PRD Page | Status | UI Notes |
|----------|--------|----------|
| **Home** | 🟡 Partial | All section components exist (Intro, Categories, WhyUs, Manufacturing, FeaturedProducts, DealerCTA, Certifications, Testimonials, BigCTA) — but the **Hero is empty of content** (see §4). No dedicated "Dealer Network" section or home "Contact" section per PRD. |
| **About Us** | ✅ Done | Excellent. Hero, stats strip, company story, vision/mission, timeline, manufacturing glance, values, certifications, CTA. Covers every PRD point. |
| **Product Categories** | 🟡 Partial | One `/products` page with sticky anchor nav (Tanks, Pipes, Accessories, Planters, Commercial). Looks great — but PRD wants **separate dedicated category pages**, not anchors on one page. |
| **Individual Product Pages** | ❌ Missing | No per-product page. "Enquire Now" just links to `/contact`. PRD requires product pages with images, specs, sizes, colors, brochure, inquiry form, related products. |
| **Dealership** | ✅ Done | Strongest page. Hero, benefits grid, numbers strip, 4-step process, application form (all 7 PRD fields), testimonials, FAQ accordion, contact strip. |
| **Manufacturing** | ✅ Done | Excellent. Hero, facility stats, technology grid, process steps, QC tests, plant locations, warehousing/logistics, certifications, CTA. Covers every PRD point. |
| **Gallery / Media** | ❌ Missing | No page. PRD wants factory images, product shoots, events, dealer meets, videos. |
| **Blog / Knowledge Center** | ❌ Missing | No page, no article list/detail layout. |
| **Contact** | ✅ Done | Form, contact details, branches, social links, business hours, WhatsApp CTA. Map is a styled placeholder (see §5). |

---

## 3. Shared UI Components

| Component | Status | Notes |
|-----------|--------|-------|
| Navbar | ✅ Done | Transparent-on-home / solid-on-scroll, centered nav, "Become a Dealer" CTA, animated hamburger + mobile dropdown. Polished. |
| Footer | ✅ Done | Present and wired into `(main)` layout. |
| FAB (WhatsApp) | ✅ Done | Floating WhatsApp button with ripple + float animation. Satisfies PRD "sticky inquiry button". |
| Hero | ⚠️ Fix | Animated canvas only — **no text, no CTAs** (see §4). |
| Other home sections | ✅ Done | Intro, Categories, WhyUs, Manufacturing, FeaturedProducts, DealerCTA, Certifications, Testimonials, BigCTA all present. |

---

## 4. Critical UI Issue — Empty Home Hero

`src/components/Hero.tsx` renders a full-screen animated water canvas and a "Scroll" cue — **nothing else**. There is no:

- Headline / value proposition
- Sub-headline
- CTA buttons

The PRD's "Hero Banner Requirements" explicitly list **three CTA buttons: Become Dealer, Download Catalogue, Contact Us**. A visitor landing on the homepage currently sees an animation with no message and no action.

**Fix:** Overlay hero content on the canvas — a strong headline (e.g. *"Built to Hold India's Water"*), a one-line sub-headline, and the three PRD CTA buttons. The canvas stays as the background.

---

## 5. Smaller UI Gaps & Fixes

| Item | Status | Notes |
|------|--------|-------|
| Embedded Google Map | 🟡 Partial | Contact page map is a CSS-grid placeholder linking out to Maps. PRD wants an embedded map — drop in a Google Maps `<iframe>`. |
| Real product imagery | ⚠️ Fix | All product/factory visuals are inline SVG illustrations. PRD demands "large product visuals" and warns against a cheap look — plan for real photography slots (use `next/image`). |
| Catalogue download | 🟡 Partial | Buttons link to `/catalogue.pdf`. Ensure the file exists in `/public`, or build a catalogue download UI. |
| Home "Dealer Network" section | ❌ Missing | PRD home list includes a Dealer Network section (e.g. India map / 22-states presence). Not on the homepage. |
| Home "Contact Section" | 🟡 Partial | PRD lists a contact block on the home page; currently only the Footer covers contact. |
| Per-product inquiry form | ❌ Missing | PRD wants an inquiry form on each product page; currently "Enquire Now" routes to `/contact`. |

---

## 6. Design Language vs PRD Style Brief

The PRD asks for: premium industrial look, modern corporate feel, clean layout, large visuals, strong typography, minimal-but-powerful UI — and to *avoid* cheap-template look, over-animation, clutter, low-quality imagery.

| PRD Style Requirement | Status | Notes |
|-----------------------|--------|-------|
| Premium / corporate / industrial feel | ✅ Done | Consistent dark-blue palette, grid overlays, confident typography. |
| Clean, uncluttered layout | ✅ Done | Generous whitespace, clear section rhythm. |
| Strong typography | ✅ Done | Plus Jakarta Sans (display) + Inter (body), clamp-based fluid sizing. |
| Full-width banners | ✅ Done | Every page hero is full-bleed. |
| Strong dealer CTA | ✅ Done | Dealer CTAs in navbar, sections, and dedicated page. |
| CTA in every major section | ✅ Done | Call / Become Dealer / Download / Get Quote used throughout. |
| Large product visuals | ⚠️ Fix | Currently SVG illustrations — needs real photography. |
| Avoid over-animation | ⚠️ Watch | Hero water canvas runs a continuous `requestAnimationFrame` loop. Looks premium but is heavy — consider pausing off-screen / reducing on mobile / `prefers-reduced-motion`. |

---

## 7. Responsiveness

| Item | Status | Notes |
|------|--------|-------|
| Mobile layout utilities | ✅ Done | `mob-1col`, `mob-scroll`, `mob-hide`, `mob-show`, `mob-gap-*`, `mob-card-*` applied consistently. |
| Mobile navigation | ✅ Done | Hamburger + animated dropdown + backdrop. |
| Responsive grids | ✅ Done | 4/5-col product grids collapse via `mob-*`. |
| Real-device testing | 🟡 Verify | Test the products page horizontal `mob-scroll` and the heavy hero canvas on actual phones. |

---

## 8. Admin Panel UI (data wiring out of scope)

As a UI prototype the admin panel is in good shape — clean sidebar, header, stat cards, tables with search/filter, modals. All pages exist (Dashboard, Products, Dealers, Inquiries, Settings, Login) and run on hardcoded arrays, which is acceptable for this stage.

UI-only observations:
- Sidebar is sticky and polished. ✅
- Tables/filters/modals look professional. ✅
- Per PRD, the admin should also surface **Blog** and **Media** management screens — currently no UI for either. ❌

---

## 9. What's Done Well

- Design language strongly matches the PRD's premium-industrial brief.
- About, Manufacturing and Dealership pages are comprehensive and cover every PRD bullet.
- Component architecture is clean and modular.
- Responsive utilities applied consistently.
- CTA placement is excellent throughout.
- Navbar and FAB are genuinely polished micro-interactions.

---

## 10. Prioritized UI Recommendations

### Priority 1 — Fix the homepage
1. Add headline + sub-headline + 3 CTA buttons (Become Dealer / Download Catalogue / Contact Us) overlaid on the hero canvas.
2. Add a "Dealer Network" section to the homepage (India presence / 22-states).

### Priority 2 — Build missing pages (UI with dummy data)
3. **Dedicated category pages** — one page per category, plus **individual product detail pages** (specs, sizes, colors, brochure button, inquiry form, related products).
4. **Blog / Knowledge Center** — article list page + article detail layout.
5. **Gallery / Media** — image grid + video section.

### Priority 3 — UI polish
6. Embed a real Google Maps `<iframe>` on the Contact page.
7. Add real product/factory photography slots via `next/image`.
8. Add `prefers-reduced-motion` handling + off-screen pause for the hero canvas.
9. Add admin **Blog** and **Media** management screens (dummy data).

---

## 11. UI Completion Estimate

| Area | Approx. Complete |
|------|------------------|
| Design language / visual quality | ~90% |
| Core pages built (About, Mfg, Dealership, Contact) | ~95% |
| Homepage (hero gap) | ~65% |
| Products (category + product pages missing) | ~50% |
| Blog + Gallery pages | 0% |
| Admin panel UI | ~75% |
| Responsiveness | ~85% |
| **Overall UI delivery** | **~70%** |

**Bottom line:** The visual craft is excellent and the built pages are strong. To reach PRD parity on the UI, the priorities are: fill the empty hero, and build the three missing page types (category/product, blog, gallery).
