/**
 * Single source of truth for site-wide contact details, links and claims.
 * The UX review flagged three different phone numbers and broken catalogue
 * links across the site — everything funnels through here so there is one
 * canonical value reused everywhere.
 */

// Canonical phone number (chosen during the UX review pass).
export const PHONE_DISPLAY = "+91 90989 89090";
export const PHONE_TEL = "+919098989090"; // for tel: hrefs
export const WHATSAPP_NUMBER = "919098989090"; // for wa.me links
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const EMAIL = "supremoindore@gmail.com";

// Brand positioning claim — single source of truth (was "5000+ worldwide").
export const REACH_CLAIM = "Trusted across 22 states";

/**
 * Hosted product catalogue. Replace /public/catalogue.pdf with the real
 * brochure — the constant keeps every "Download Catalogue" button in sync.
 */
export const CATALOGUE_URL = "/catalogue.pdf";
