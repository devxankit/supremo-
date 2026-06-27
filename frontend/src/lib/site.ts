/**
 * Single source of truth for site-wide contact details, links and claims.
 * The UX review flagged three different phone numbers and broken catalogue
 * links across the site — everything funnels through here so there is one
 * canonical value reused everywhere.
 */

// Canonical phone number (chosen during the UX review pass).
export const PHONE_DISPLAY = "";
export const PHONE_TEL = ""; // for tel: hrefs
export const WHATSAPP_NUMBER = ""; // for wa.me links
export const WHATSAPP_URL = "";

export const EMAIL = "";

// Brand positioning claim — single source of truth (was "5000+ worldwide").
export const REACH_CLAIM = "";

export const CATALOGUE_URL = "";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Amazon storefront links per product category. A "Shop on Amazon" button is
 * shown only for categories listed here — replace the placeholder URLs with
 * the real Amazon store / listing links.
 */
export const AMAZON_STORE_URLS: Record<string, string> = {};
