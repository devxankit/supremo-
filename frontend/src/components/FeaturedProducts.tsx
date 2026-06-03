import Link from "next/link";
import { ProductCard, type ProductCardBadge } from "@/components/ProductCard";

interface FeaturedItem {
  name: string;
  cat: string;
  badges: ProductCardBadge[];
  caps: string[];
  swatches: string[];
  image: string;
  href: string;
}

const products: FeaturedItem[] = [
  {
    name: "Supremo TL 1000 — Triple Layer Overhead Tank",
    cat: "Water Tanks",
    badges: [{ label: "Best Seller", primary: true }, { label: "ISI" }],
    caps: ["1000 L", "500 L", "2000 L", "+4"],
    swatches: ["#0A1628", "#0E55BC", "#FFB020", "#1FAE6A"],
    image: "/images/overhead_tank.png",
    href: "/products/water-tanks/triple-layer-overhead-tank",
  },
  {
    name: "Supremo HotFlow CPVC — SDR 11 Plumbing Pipe",
    cat: "Pipes & Fittings",
    badges: [{ label: "CPVC" }],
    caps: ["½″", "¾″", "1″", "+5"],
    swatches: ["#E6F0FF", "#FFB020"],
    image: "/images/plumbing_pipes.png",
    href: "/products/pipes-fittings/cpvc-hot-cold-pipes",
  },
  {
    name: "Supremo Terrazzo — Decorative Planter Series",
    cat: "Planters",
    badges: [{ label: "New", primary: true }],
    caps: ["Round", "Square", "Tall"],
    swatches: ["#fff", "#0A1628", "#A8B3C7", "#1FAE6A"],
    image: "/images/terrazzo_planter.png",
    href: "/products/planters/decorative-indoor-planter",
  },
];

export function FeaturedProducts() {
  return (
    <section style={{ background: "var(--paper)", padding: "32px 0 36px" }}>
      <div className="container">
        <style dangerouslySetInnerHTML={{ __html: `
          .fp-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
          @media (max-width: 1024px) { .fp-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 600px) { .fp-grid { grid-template-columns: 1fr; } }
        `}} />

        <div className="mob-1col mob-gap-sm mob-mb-sm" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "end", marginBottom: 48 }}>
          <div>
            <span className="eyebrow">Featured</span>
            <h2 style={{ marginTop: 20 }}>Best-sellers, by dealer demand.</h2>
          </div>
          <Link href="/products" className="btn btn--outline btn--sm" style={{ justifySelf: "start" }}>
            All Products
            <svg className="arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </Link>
        </div>

        <div className="fp-grid">
          {products.map((p) => (
            <ProductCard
              key={p.name}
              href={p.href}
              name={p.name}
              image={p.image}
              categoryLabel={p.cat}
              capacity={p.caps[0]}
              tags={p.caps.slice(1)}
              badges={p.badges}
              swatches={p.swatches}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
