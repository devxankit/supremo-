// ════════════════════════════════════════════════════════════════════════
//  FONT MANAGEMENT — SINGLE SOURCE OF TRUTH FOR THE WHOLE WEBSITE
//  ----------------------------------------------------------------------
//  Change the fonts here and they update EVERYWHERE — every page, every
//  component, headings + body + buttons + admin panel, all of it.
//
//  There are two font "slots":
//    • PRIMARY   → headings / display  (h1–h5, eyebrows, buttons, badges)
//    • SECONDARY → body / UI text      (paragraphs, inputs, nav, etc.)
//
//  Right now BOTH are set to Google "Poppins". You can make them the same
//  (single typeface site-wide) or two different fonts.
//
//  ── HOW TO CHANGE THE FONT ────────────────────────────────────────────
//  1. Pick any Google font name (PascalCase, spaces → underscores), e.g.
//        Poppins, Inter, Roboto, Montserrat, Open_Sans, Work_Sans, Lato,
//        Nunito, Manrope, Plus_Jakarta_Sans, Raleway, DM_Sans …
//  2. Add it to the import line below from "next/font/google".
//  3. Swap the function name (e.g. `Poppins(...)` → `Inter(...)`) in the
//     PRIMARY and/or SECONDARY block. Adjust `weight` if needed.
//  4. Save. That's it — the entire site re-themes automatically.
//
//  NOTE: Google font names must be written exactly (capitalisation +
//  underscores for spaces). `next/font` self-hosts them at build time, so
//  no extra <link> tags or CSS imports are required.
// ════════════════════════════════════════════════════════════════════════

import { Poppins } from "next/font/google";

/* ── PRIMARY FONT · headings / display ──────────────────────────────────
   Exposed to CSS as the variable  --font-primary
   (mapped to --font-display in globals.css). */
export const primaryFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-primary",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
});

/* ── SECONDARY FONT · body / UI text ────────────────────────────────────
   Exposed to CSS as the variable  --font-secondary
   (mapped to --font-body / --font-sans in globals.css). */
export const secondaryFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-secondary",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
});

/* Combined class string applied once to <html> in layout.tsx.
   This is what publishes the two CSS variables to the whole document. */
export const fontVariables = `${primaryFont.variable} ${secondaryFont.variable}`;
