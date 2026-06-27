
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
