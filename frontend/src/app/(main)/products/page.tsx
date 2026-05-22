import type { Metadata } from "next";
import Link from "next/link";
import { categories, getProductsByCategory, ProductIcon } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "Products — Supremo India",
  description:
    "Explore Supremo's product catalogue: triple-layer water tanks, PVC/CPVC pipes, planters, wheel barrows and commercial plastic products.",
};

const categoryImages: Record<string, string> = {
  "water-tanks": "/images/cat_tanks.png",
  "pipes-fittings": "/images/cat_pipes.png",
  "accessories": "/images/cat_accessories.png",
  "planters": "/images/cat_planters.png",
};

export default function ProductsPage() {
  return (
    <main>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          background: "linear-gradient(135deg, var(--blue-900) 0%, var(--blue-800) 50%, var(--ink) 100%)",
          minHeight: 380,
          display: "flex",
          alignItems: "center",
          paddingTop: 62,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className="container"
          style={{
            position: "relative",
            paddingTop: "clamp(48px,6vw,80px)",
            paddingBottom: "clamp(48px,6vw,80px)",
          }}
        >
          <span className="eyebrow eyebrow-light">Product Catalogue</span>
          <h1
            style={{
              color: "#fff",
              fontSize: "clamp(36px,5vw,64px)",
              lineHeight: 1.1,
              marginTop: 16,
              maxWidth: "18ch",
            }}
          >
            Four lines.{" "}
            <span style={{ color: "var(--blue-400)" }}>One quality standard.</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,.7)", fontSize: 18, marginTop: 20, maxWidth: "52ch" }}>
            From 100-litre loft tanks to 25,000-litre underground sumps — Supremo manufactures and
            ISI-certifies every product in-house across four dedicated plants.
          </p>
        </div>
      </section>

      {/* Category cards */}
      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          <span className="eyebrow">Browse by Category</span>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", marginTop: 16, marginBottom: 48 }}>
            Pick a product line to explore.
          </h2>
          <div
            className="mob-1col mob-gap-md"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
          >
            {categories.map((cat) => {
              const count = getProductsByCategory(cat.slug).length;
              return (
                <Link
                  key={cat.slug}
                  href={`/products/${cat.slug}`}
                  className="hover-lift-sm"
                  style={{
                    display: "flex",
                    gap: 24,
                    background: "#fff",
                    border: "1px solid var(--line)",
                    borderRadius: "var(--r-lg)",
                    padding: 32,
                    textDecoration: "none",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: "var(--r-md)",
                      background: "#fff",
                      border: "1px solid var(--line)",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={categoryImages[cat.slug]}
                      alt={cat.label}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        padding: "10px",
                        display: "block",
                      }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span className="eyebrow">{cat.eyebrow}</span>
                    <h3 style={{ fontSize: 26, marginTop: 10, marginBottom: 8 }}>{cat.label}</h3>
                    <p style={{ color: "var(--slate)", fontSize: 14.5, lineHeight: 1.6, marginBottom: 14 }}>
                      {cat.blurb}
                    </p>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        color: "var(--blue-600)",
                        fontWeight: 600,
                        fontSize: 14,
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {count} products
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M7 17L17 7M9 7h8v8" />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Commercial Plastic */}
      <section id="commercial" style={{ background: "var(--paper-2)" }}>
        <div className="container">
          <div
            className="mob-1col mob-gap-lg"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}
          >
            <div>
              <span className="eyebrow">B2B / Bulk</span>
              <h2 style={{ fontSize: "clamp(30px,4vw,48px)", marginTop: 16, marginBottom: 20 }}>
                Commercial Plastic Products
              </h2>
              <p style={{ color: "var(--slate)", fontSize: 17, lineHeight: 1.7, marginBottom: 24 }}>
                Supremo supplies bulk quantities of industrial-grade blow-moulded and roto-moulded
                products to builders, contractors, municipalities and large retail chains. Custom
                SKUs, white-labelling and project billing available on request.
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
                {[
                  "Minimum order 100 units for custom SKUs",
                  "GST invoice with HSN code",
                  "Project billing against PO",
                  "Dedicated key account manager",
                  "30-day credit for approved accounts",
                ].map((f) => (
                  <li key={f} style={{ display: "flex", gap: 10, color: "var(--slate)", fontSize: 15 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 2 }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn">
                Contact Sales Team
                <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </Link>
            </div>
            <div
              style={{
                background: "linear-gradient(135deg,var(--blue-50) 0%,var(--blue-100) 100%)",
                borderRadius: "var(--r-lg)",
                border: "1px solid var(--line)",
                padding: 48,
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              {[
                { v: "500+", l: "Commercial clients served" },
                { v: "100+", l: "Custom SKUs manufactured" },
                { v: "₹2 Cr+", l: "Avg. annual project value" },
                { v: "48 hrs", l: "Quote turnaround time" },
              ].map((s) => (
                <div key={s.l} style={{ borderBottom: "1px solid var(--line)", paddingBottom: 20 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 700, color: "var(--blue-700)", lineHeight: 1 }}>{s.v}</div>
                  <div style={{ color: "var(--muted)", fontSize: 14, marginTop: 6 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
            <a href="/catalogue.pdf" className="btn btn--white">
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
