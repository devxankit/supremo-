# Supremo — Code Audit & Bug Report

**Date:** 2026-06-28
**Scope:** `backend/` (Node + Express 5 + Mongoose) and `frontend/` (Next.js 16 / React 19)
**Method:** Manual review of every source area — entrypoints, config, middleware, controllers, routes, models, and frontend lib/pages/components. API behavior cross-checked against `backend/api_check_report.md`.

> Status legend: **Confirmed** = verified in code. **Likely** = strong evidence, needs a runtime check to be 100%.

---

## 0. Executive Summary

The app is functional and reasonably well-structured (clean route/controller/model split, consistent error-forwarding pattern). However there are **2 critical functional/security blockers**, several **major security gaps**, and a meaningful amount of polish/quality debt.

| Priority | Status |
|---|---|
| 🔴 Critical | C-3 (admin seed) **resolved** by removing the seeder. C-2 (SSRF) **de-scoped** by owner. |
| 🟠 Major | **Fixed:** M-1 (public upload caps+limit), M-2 (helmet + rate limiting), M-3 (regex escape), M-5 (real notification emails). **Deferred:** M-4 (JWT→cookie, needs sign-off). **Needs your input:** M-6 (real contact values). **De-scoped:** M-7 (env/secrets). |
| 🟡 Minor | **Fixed:** m-1 (404 JSON), m-2 (filename traversal), m-3 (async I/O), m-7 (visit limiter). **Left intentional:** m-4 (URL dedupe), m-5 (query perf), m-6 (analytics bucketing), m-8 (maintenance gate). **Skipped (env):** m-9 (`.env.example`). |
| 🧹 Dead/Unused | **Removed:** `Commitment.tsx`, `temp_cloudinary_prod.png`, `seedPageVisits()`, `seedAdmin()`. |

---

## 🔴 CRITICAL

> **C-1 (Frontend API URL) — RESOLVED / withdrawn.** An earlier draft flagged `.env.local` as pointing to `http://localhost:5000`. On re-verification the live file `frontend/.env.local:1` now reads `NEXT_PUBLIC_API_URL=http://localhost:5001/api` — correct port and `/api` suffix — so the app reaches the backend fine. Only the **template** `frontend/.env.example:1` still carries the stale `http://localhost:5000` value; that is downgraded to **m-9 (Minor)** below.

> **C-2 (SSRF in `/media/download`) — DE-SCOPED / won't fix.** The `GET /api/media/download` endpoint (`backend/src/routes/mediaRoutes.js:202-225`) fetches a user-supplied URL server-side with no host allowlist (SSRF). Per the project owner's decision (2026-06-28), this is acknowledged but **intentionally not being fixed** and is excluded from the fix scope. Left here for the record only.

### C-3. Admin account cannot be seeded — required env vars are missing — **Confirmed**
- **Where:** `backend/src/controllers/authController.js:12-32` reads `ADMIN_SEED_EMAIL / _NAME / _PHONE / _PASSWORD`; none of these exist in `backend/.env`.
- **Detail:** On a fresh database, `seedAdmin()` calls `Admin.create({ name: undefined, phone: undefined, email: undefined, password: undefined })`. The `Admin` schema requires all of these (`models/Admin.js:5-27`), so the create throws, is caught, logged, and **no admin is created** → nobody can log in to the panel.
- **Impact:** Fresh deploys have **no working admin login.** (Existing DBs that already contain an admin are unaffected — which is why it may look fine locally.)
- **Fix:** Add `ADMIN_SEED_EMAIL`, `ADMIN_SEED_NAME`, `ADMIN_SEED_PHONE`, `ADMIN_SEED_PASSWORD` to `.env`/`.env.example`, and have `seedAdmin` skip gracefully (with a warning) when they're absent.

---

## 🟠 MAJOR

### M-1. Public file-upload endpoints are unauthenticated — abuse / cost / storage DoS — ✅ **FIXED (2026-06-28)**
- **Where:** `backend/src/routes/mediaRoutes.js` (`/upload-public`, `/upload-public-resume`)
- **Fix applied:** Added a dedicated `uploadPublic` multer instance capped at **15 MB** (vs 100 MB for admin) in `uploadMiddleware.js`, and wrapped both public routes with a per-IP `uploadLimiter` (40 / 15 min). Admin `/upload` keeps the 100 MB cap.

### M-2. No rate limiting and no security headers anywhere — ✅ **FIXED (2026-06-28)**
- **Fix applied:** Added `helmet` (configured `crossOriginResourcePolicy: cross-origin` + CSP off so cross-origin `/uploads` and the frontend aren't broken) and `app.set("trust proxy", 1)` in `app.js`. Added `middleware/rateLimiters.js` with targeted limiters — `authLimiter` (20/15 min) on `/auth/login`, `formLimiter` (50/15 min) on public submissions, `uploadLimiter` (40/15 min) on public uploads, `visitLimiter` (300/15 min) on the page-view beacon. **Deliberately not global** — public GET content is fetched server-side by Next (one origin IP), so a blanket limiter would throttle the whole site. Verified live: helmet headers present, `X-Powered-By` removed, `RateLimit` headers on login, public GETs still 200.

### M-3. Unescaped user input used to build RegExp (ReDoS / injection) — ✅ **FIXED (2026-06-28)**
- **Fix applied:** Added `utils/escapeRegex.js` and wrapped the search input in both `contactApplicationController.js` and `careerApplicationController.js` → `new RegExp(escapeRegex(search), "i")`.

### M-4. JWT stored in `localStorage` — XSS token theft — ⏸️ **DEFERRED (needs sign-off)**
- **Where:** `frontend/src/app/admin/_services/adminAuth.ts`
- **Why deferred:** A proper fix means migrating to an httpOnly Secure cookie — backend must set/clear the cookie on login/logout, `authMiddleware` must read it, CORS `credentials` flow must be exercised, and ~27 admin fetch call-sites that send `Authorization: Bearer` must change to `credentials: "include"`. That touches the entire working auth flow and carries real risk of locking the admin out. Per your "don't break working functionality" instruction I've **left this intact** and recommend doing it as a dedicated, separately-tested task. Token TTL is already a short 8h.

### M-5. "Email notifications" for new inquiries are fake — ✅ **FIXED (2026-06-28)**
- **Fix applied:** Added `utils/mailer.js` → `sendAdminNotification(subject, text)` (builds a transporter from existing `SMTP_*` env, sends to `NOTIFY_EMAIL || SMTP_USER`, **best-effort/never throws** so it can't break a public submission). Replaced the `console.log` simulations in `inquiryController.createInquiry` (new inquiry / dealer alerts) and `productController.checkLowStockAlert` with real sends, still gated by the existing settings toggles. *No env files were changed — the mailer only reads existing SMTP vars; optional `NOTIFY_EMAIL` override falls back to the business inbox.*

### M-6. Site-wide contact config is entirely empty — ⏸️ **NEEDS YOUR DATA**
- **Where:** `frontend/src/lib/site.ts:9-28` — `PHONE_DISPLAY`, `PHONE_TEL`, `WHATSAPP_NUMBER`, `WHATSAPP_URL`, `EMAIL`, `REACH_CLAIM`, `CATALOGUE_URL`, `AMAZON_STORE_URLS` are all empty.
- **Why not auto-fixed:** These are real business values (phone numbers, WhatsApp, catalogue link, Amazon store URLs). I won't fabricate contact details — wrong numbers on a live site is worse than blank. **Please provide the real values** (or confirm they should be sourced from the admin `Settings` API instead) and I'll wire them in immediately.

### M-7. Live secrets in `.env` are weak / should be rotated — **DE-SCOPED / won't change**
- **Where:** `backend/.env` (Mongo Atlas creds, Cloudinary secret, Gmail app password, JWT secret); related fallbacks in `authMiddleware.js:16` / `authController.js:6`.
- **Status:** Per owner decision (2026-06-28), **nothing env-related will be changed** — no `.env` edits, no credential rotation, and the `JWT_SECRET` fallback code is left as-is. Documented here for awareness only; excluded from the fix scope.

---

## 🟡 MINOR

### m-1. No global 404 / catch-all handler — ✅ **FIXED (2026-06-28)**
Added a JSON 404 catch-all in `app.js` before `errorHandler` (`{ message: "Route not found: <method> <url>" }`). Verified live (HTTP 404 + JSON body).

### m-2. Path-traversal risk in upload filenames — ✅ **FIXED (2026-06-28)**
Added `buildSafeFileName()` in `mediaRoutes.js` which runs `path.basename(originalname)` before composing the stored name, so a crafted `originalname` can't escape `public/uploads`.

### m-3. Blocking synchronous file I/O on the request path — ✅ **FIXED (2026-06-28)**
Both local-PDF handlers now use `await fs.promises.mkdir` / `fs.promises.writeFile` (handlers made `async`) instead of the sync versions.

### m-4. Massive duplication of the API base URL — **Not changed (intentional)**
`http://localhost:5001/api` is hardcoded as a fallback in ~40 files. A pure maintainability refactor (centralize on `API_URL` in `lib/site.ts`) — but it's 40 files of churn with no behavior change and a real chance of introducing a typo. Skipped under the "don't break working functionality" constraint; safe to do later as an isolated refactor.

### m-5. Dashboard stats: redundant/duplicated queries — **Not changed (intentional)**
`inquiryController.js` fetches `Product.find({})` *and* `Product.countDocuments(...)`, and re-queries `Category.find({})` despite already counting categories. A perf optimization that rewrites dashboard query logic — left alone to avoid altering the (working) stats output. Low priority.

### m-6. Analytics bucketing skews data — **Not changed (needs product decision)**
`inquiryController.js`: inquiries with no keyword match are force-bucketed into "Water Tanks" (or "PVC Pipes" for dealers), inflating those categories. Changing this alters what the dashboard chart reports, so it's a product/analytics decision rather than a safe bug-fix. Flagged for your call.

### m-7. `recordVisit` is unauthenticated and unthrottled — ✅ **FIXED (2026-06-28)**
The `POST /visit` route now uses `visitLimiter` (300 / 15 min per IP) — generous enough for real browsing, but caps flooding.

### m-8. Client-only maintenance-mode gate is bypassable — **Confirmed (low risk)**
`frontend/src/app/providers.tsx:23` lets anyone with `adminAuth.isAuthenticated()===true` (pure localStorage check) skip maintenance mode. Fine for a soft gate; just don't treat it as access control.

### m-9. Stale `.env.example` template — **Confirmed** (downgraded from C-1)
`frontend/.env.example:1` still reads `NEXT_PUBLIC_API_URL=http://localhost:5000` — wrong port and missing `/api`. The live `.env.local` is correct, but anyone bootstrapping from the example will copy a broken value. Update it to `http://localhost:5001/api`.

---

## 🧹 DEAD CODE / UNUSED FILES

| Item | Location | Notes |
|---|---|---|
| ~~`Commitment.tsx`~~ | ~~`frontend/src/components/Commitment.tsx`~~ | ✅ **DELETED (2026-06-28)** — was unused (zero imports). |
| ~~`temp_cloudinary_prod.png`~~ | ~~`frontend/temp_cloudinary_prod.png`~~ | ✅ **DELETED (2026-06-28)** — stray temp artifact. |
| `api_check_report.md` | `backend/api_check_report.md` | Left in place — it's a useful API reference. Move to `/docs` if you prefer. |
| ~~`seedPageVisits()`~~ | ~~`backend/src/controllers/inquiryController.js`~~ | ✅ **REMOVED (2026-06-28).** No-op (`return;`) function + its import/call in `config/db.js` deleted. Verified no dangling refs; `node --check` passes. |
| ~~`seedAdmin()`~~ | ~~`backend/src/controllers/authController.js` + `config/db.js`~~ | ✅ **REMOVED (2026-06-28).** Admin already created manually; seeder + wiring deleted. |
| `/api/auth/me` flow | `authController.js:69` `getAdminProfile` exists, but the frontend never calls `/auth/me` — it reads the user purely from localStorage (`adminAuth.getUser`). Either use it (to validate the session server-side) or note it's intentionally unused. |
| Misc stray config | `frontend/AGENTS.md`, `frontend/doctor.config.json` | Tooling leftovers — confirm whether still needed. |

> Note: 16 **content** seeders still run on every server boot (`config/db.js`). These are **intentionally kept** (owner decision, 2026-06-28) — they're idempotent (only insert when a collection is empty) and serve as the fresh-deploy bootstrap for default site content. Gating them behind an env flag (e.g. `SEED_ON_BOOT=true`) was declined to avoid env changes; revisit only if startup time becomes a concern.

---

## ✅ What's good (so you know the baseline)
- Clean, consistent layering (routes → controllers → models) and uniform `try/catch + next(error)` error forwarding.
- Passwords hashed with bcrypt via a `pre('save')` hook; admin routes consistently guarded by `protectAdmin` (cross-checked in `api_check_report.md` — protected routes correctly return 401/403).
- CORS uses an explicit allowlist rather than `*`.
- Admin pages correctly attach `Authorization: Bearer <token>` (verified across admin pages).

---

## 📋 Status (2026-06-28)

**Done & verified this pass:** M-1, M-2, M-3, M-5, m-1, m-2, m-3, m-7, plus dead-code removal (`Commitment.tsx`, `temp_cloudinary_prod.png`, `seedAdmin`, `seedPageVisits`). Backend boots cleanly; helmet headers, JSON 404, rate-limit headers, and public GETs all verified live.

**Still open — need your decision:**
- **M-4** (JWT → httpOnly cookie): deferred; risky auth-flow migration, wants a dedicated task + sign-off.
- **M-6** (empty `site.ts` contact values): provide the real phone/WhatsApp/email/catalogue/Amazon values (or say "use the Settings API") and I'll wire them in.
- **m-6** (analytics bucketing): product decision on how to categorize keyword-less inquiries.

**Won't change (your instruction):** C-2 (SSRF), M-7 + m-9 (anything env/secrets/`.env`).

**Optional later:** m-4 (URL dedupe refactor), m-5 (dashboard query perf).

> Dependencies added to `backend/package.json`: `helmet`, `express-rate-limit`. Run `npm install` in `backend/` on any other machine.
