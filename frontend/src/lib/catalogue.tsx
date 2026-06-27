import type { ReactNode } from "react";

export type IconType = "tank" | "pipe" | "box" | "plant";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  slug: string;
  category: string;
  name: string;
  tagline: string;
  capacity: string;
  description: string;
  badges: string[];
  features: string[];
  applications: string[];
  sizes: string[];
  colors: ProductColor[];
  specs: { label: string; value: string }[];
  /** Catalogue model number — currently used by the planters category filter. */
  modelNo?: string;
}

export interface Category {
  slug: string;
  label: string;
  eyebrow: string;
  blurb: string;
  icon: IconType;
}

export const categories: Category[] = [];

export const products: Product[] = [];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug);
}

export function getProduct(category: string, slug: string): Product | undefined {
  return products.find((p) => p.category === category && p.slug === slug);
}

export function getRelated(product: Product): Product[] {
  return products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3);
}

export function ProductIcon({ type, size = 88 }: { type: IconType; size?: number }): ReactNode {
  const h = Math.round(size * 0.82);
  if (type === "tank") {
    return (
      <svg viewBox="0 0 120 100" width={size} height={h} fill="none">
        <ellipse cx="60" cy="18" rx="42" ry="8" fill="#C5DAFB" />
        <path d="M18 18 Q20 88 60 90 Q100 88 102 18" fill="#E6F0FF" stroke="#1466E6" strokeWidth="2" />
        <ellipse cx="60" cy="18" rx="42" ry="8" fill="#6BA1FF" opacity=".6" />
        <rect x="54" y="4" width="12" height="14" rx="3" fill="#0E55BC" />
      </svg>
    );
  }
  if (type === "pipe") {
    return (
      <svg viewBox="0 0 120 80" width={size} height={Math.round(size * 0.55)} fill="none">
        <rect x="10" y="30" width="100" height="20" rx="10" fill="#C5DAFB" stroke="#1466E6" strokeWidth="2" />
        <rect x="10" y="33" width="100" height="8" rx="4" fill="#6BA1FF" opacity=".5" />
        <rect x="8" y="26" width="16" height="28" rx="4" fill="#0E55BC" />
        <rect x="96" y="26" width="16" height="28" rx="4" fill="#0E55BC" />
      </svg>
    );
  }
  if (type === "plant") {
    return (
      <svg viewBox="0 0 120 100" width={size} height={h} fill="none">
        <path d="M30 85 Q40 55 60 40 Q80 55 90 85" fill="#E6F0FF" stroke="#1466E6" strokeWidth="2" />
        <line x1="60" y1="40" x2="60" y2="86" stroke="#6BA1FF" strokeWidth="2" />
        <ellipse cx="60" cy="88" rx="30" ry="6" fill="#C5DAFB" />
        <circle cx="60" cy="28" r="14" fill="#6BA1FF" opacity=".4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 100" width={size} height={h} fill="none">
      <rect x="20" y="30" width="80" height="60" rx="8" fill="#E6F0FF" stroke="#1466E6" strokeWidth="2" />
      <path d="M20 45 L60 55 L100 45" stroke="#6BA1FF" strokeWidth="2" fill="none" />
      <rect x="48" y="30" width="24" height="16" rx="4" fill="#C5DAFB" />
    </svg>
  );
}
