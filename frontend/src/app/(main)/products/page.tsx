import type { Metadata } from "next";
import Link from "next/link";
import { ProductBrowser } from "./_components/ProductBrowser";
import { CATALOGUE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore Supremo's product catalogue: triple-layer water tanks, PVC/CPVC pipes, planters, wheel barrows and commercial plastic products.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  let catalogueLink = CATALOGUE_URL;
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
    const res = await fetch(`${apiBase}/hero`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data?.secondaryLink && data.secondaryLink !== "javascript:void(0)" && data.secondaryLink !== "/") {
        catalogueLink = data.secondaryLink;
      }
    }
  } catch (error) {
    console.error("Error loading catalogue PDF link in ProductsPage:", error);
  }

  return (
    <main>
      {/* Filterable product browser — starts directly, no hero */}
      <ProductBrowser hasHero={false} initialCategory={category ?? null} />

      {/* Download CTA */}
      <section style={{ background: "var(--blue-900)", padding: "clamp(48px,6vw,80px) 0" }}>
        <div
          className="container mob-col mob-gap-md"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32 }}
        >
          <div>
            <h2 style={{ color: "#fff", fontSize: "clamp(24px,3vw,40px)", margin: 0 }}>Download our full product catalogue</h2>
            <p style={{ color: "rgba(255,255,255,.65)", marginTop: 10, fontSize: 16 }}>
              Complete specs, certifications and SKU codes for all Supremo product lines.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexShrink: 0, flexWrap: "wrap" }}>
            <a href={catalogueLink} download="Supremo_Catalogue.pdf" target="_blank" rel="noopener noreferrer" className="btn btn--white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download PDF
            </a>
            <Link href="/contact" className="btn btn--ghost">Contact Sales</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
