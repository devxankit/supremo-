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

/**
 * Validate email syntax, check for common domain typos (like gmailll, .comm),
 * and reject generic test/dummy domains.
 */
export const validateEmail = (email: string): boolean => {
  if (!email) return false;
  
  // 1. Basic format check with regex
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!regex.test(email)) return false;

  const parts = email.split("@");
  if (parts.length !== 2) return false;
  const domain = parts[1].toLowerCase();

  // 2. Block common domain misspellings
  const misspelledDomains = [
    "gmaill.com", "gamil.com", "gmal.com", "gmaill.co", "gmaill.comm", "gmail.comm", "gmail.con", "gmailll.com", "gmailll.comm",
    "yaho.com", "yahu.com", "yahooo.com", "yahoo.comm",
    "hotmial.com", "hotmale.com", "hotmaill.com", "hotmail.comm",
    "outlok.com", "outllok.com"
  ];
  if (misspelledDomains.includes(domain)) return false;

  // 3. Block generic test/dummy domains
  const dummyDomains = [
    "test.com", "example.com", "temp.com", "tempmail.com", "fake.com"
  ];
  if (dummyDomains.includes(domain)) return false;

  // 4. Validate top-level domain (TLD)
  const domainParts = domain.split(".");
  const tld = domainParts[domainParts.length - 1];
  
  const invalidTLDs = ["comm", "coom", "con", "innd", "c", "coo", "x", "xx"];
  if (invalidTLDs.includes(tld)) return false;

  return true;
};
