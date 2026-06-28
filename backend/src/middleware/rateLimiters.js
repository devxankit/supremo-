import rateLimit from "express-rate-limit";

/**
 * Rate limiters for sensitive / public endpoints.
 *
 * NOTE: These are intentionally applied only to specific POST endpoints
 * (login, public form submissions, uploads, visit beacon) rather than
 * globally — public GET content routes are fetched server-side by Next.js
 * (a single origin IP), so a blanket per-IP limiter would throttle the
 * whole site under load.
 */

// Strict limiter for admin login to slow brute-force attempts.
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many login attempts. Please try again later." },
});

// Public form submissions (inquiries, contact & career applications).
export const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many submissions from this address. Please try again later." },
});

// Public file uploads (visiting cards, resumes).
export const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 40,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Upload limit reached. Please try again later." },
});

// Page-view beacon — generous so normal browsing is never blocked.
export const visitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many requests." },
});
