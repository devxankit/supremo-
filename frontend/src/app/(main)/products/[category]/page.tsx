import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory, getProductsByCategory, ProductIcon } from "@/lib/catalogue";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return { title: "Products — Supremo India" };
  return {
    title: `${cat.label} — Supremo India`,
    description: cat.blurb,
  };
}

const productImages: Record<string, string> = {
  // Water Tanks
  "triple-layer-overhead-tank": "/images/overhead_tank.png",
  "single-layer-overhead-tank": "/images/tank_single.png",
  "loft-tank": "/images/tank_loft.png",
  "underground-sump-tank": "/images/tank_sump.png",
  
  // Pipes & Fittings
  "pvc-pressure-pipes": "/images/pipe_pvc.png",
  "cpvc-hot-cold-pipes": "/images/pipe_cpvc.png",
  "agriculture-hdpe-pipes": "/images/pipe_hdpe.png",
  "swr-plumbing-pipes": "/images/pipe_swr.png",
  
  // Accessories
  "air-cooler-body": "/images/acc_cooler.png",
  "ghamela-tub": "/images/acc_ghamela.png",
  "milk-can": "/images/acc_milk_can.png",
  "wheel-barrow": "/images/cat_accessories.png",
  "garbage-dust-bin": "/images/cat_accessories.png",
  
  // Planters
  "decorative-indoor-planter": "/images/terrazzo_planter.png",
  "garden-floor-planter": "/images/cat_planters.png",
  "commercial-planter": "/images/cat_planters.png",
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const items = getProductsByCategory(category);

  return (
    <main>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          background: "linear-gradient(135deg, var(--blue-900) 0%, var(--blue-800) 50%, var(--ink) 100%)",
          minHeight: 340,
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
          style={{ position: "relative", paddingTop: "clamp(40px,5vw,72px)", paddingBottom: "clamp(40px,5vw,72px)" }}
        >
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 18, fontSize: 13, color: "rgba(255,255,255,.55)" }}>
            <Link href="/products" style={{ color: "rgba(255,255,255,.55)" }}>Products</Link>
            <span>/</span>
            <span style={{ color: "#fff" }}>{cat.label}</span>
          </div>
          <span className="eyebrow eyebrow-light">{cat.eyebrow}</span>
          <h1 style={{ color: "#fff", fontSize: "clamp(34px,5vw,60px)", lineHeight: 1.1, marginTop: 16 }}>
            {cat.label}
          </h1>
          <p style={{ color: "rgba(255,255,255,.7)", fontSize: 17, marginTop: 18, maxWidth: "58ch" }}>
            {cat.blurb}
          </p>
        </div>
      </section>

      {/* Product grid */}
      <section style={{ background: "var(--paper)" }}>
        {/* Inject CSS for premium card transitions since this is a static page Server Component */}
        <style dangerouslySetInnerHTML={{ __html: `
          .category-prod-card {
            background: #fff;
            border: 1px solid rgba(14, 85, 188, 0.08);
            border-radius: var(--r-lg);
            display: flex;
            flex-direction: column;
            text-decoration: none;
            overflow: hidden;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 4px 20px rgba(10, 22, 40, 0.02);
          }
          .category-prod-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px -15px rgba(10, 22, 40, 0.12), 0 0 0 1px rgba(14, 85, 188, 0.12);
            border-color: rgba(14, 85, 188, 0.2);
          }
          .category-prod-card:hover .prod-card-img {
            transform: scale(1.06) translateY(-4px);
          }
          .category-prod-card:hover .prod-card-arrow {
            transform: translateX(4px);
          }
        `}} />
        <div className="container">
          <div
            className="mob-1col mob-gap-md"
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}
          >
            {items.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${cat.slug}/${p.slug}`}
                className="category-prod-card"
              >
                {/* Visual Showcase Frame */}
                <div
                  style={{
                    background: "#ffffff",
                    margin: "16px 16px 0",
                    height: 230,
                    borderRadius: "var(--r-md)",
                    border: "1px solid rgba(14, 85, 188, 0.05)",
                    display: "grid",
                    placeItems: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ position: "absolute", top: 12, left: 12, display: "flex", flexWrap: "wrap", gap: 6, zIndex: 10 }}>
                    {p.badges.map((b) => (
                      <span
                        key={b}
                        style={{
                          padding: "3px 9px",
                          background: "rgba(255, 255, 255, 0.9)",
                          color: "var(--blue-800)",
                          border: "1px solid rgba(14, 85, 188, 0.12)",
                          borderRadius: 999,
                          fontSize: 9,
                          fontWeight: 700,
                          fontFamily: "var(--font-display)",
                          letterSpacing: "0.05em",
                          textTransform: "uppercase",
                          backdropFilter: "blur(8px)",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                        }}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                  <img
                    className="prod-card-img"
                    src={productImages[p.slug] || "/images/logo.png"}
                    alt={p.name}
                    style={{
                      width: "82%",
                      height: "82%",
                      objectFit: "contain",
                      display: "block",
                      transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  />
                </div>

                {/* Body info */}
                <div style={{ padding: "20px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "var(--blue-600)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                    {cat.label}
                  </span>
                  
                  <h3 style={{ fontSize: 19, fontWeight: 700, color: "var(--ink)", lineHeight: 1.3, marginBottom: 8 }}>
                    {p.name}
                  </h3>

                  {/* Specs & Capacity Tags Row */}
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                    <span style={{ fontSize: 11, color: "var(--blue-800)", background: "var(--blue-50)", border: "1px solid var(--blue-100)", padding: "3px 8px", borderRadius: 6, fontWeight: 700, fontFamily: "var(--font-display)" }}>
                      {p.capacity}
                    </span>
                    {p.specs && p.specs.slice(0, 1).map((s) => (
                      <span key={s.label} style={{ fontSize: 11, color: "var(--slate)", background: "var(--paper-2)", border: "1px solid var(--line)", padding: "3px 8px", borderRadius: 6, fontWeight: 600 }}>
                        {s.label}: {s.value}
                      </span>
                    ))}
                  </div>

                  <p style={{ fontSize: 13.5, color: "var(--slate)", lineHeight: 1.5, marginBottom: 20, flex: 1 }}>
                    {p.tagline}
                  </p>

                  <div style={{ borderTop: "1px solid var(--line-2)", paddingTop: 16, marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        color: "var(--blue-700)",
                        fontWeight: 700,
                        fontSize: 13.5,
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      View Details
                      <svg 
                        className="prod-card-arrow" 
                        width="14" 
                        height="14" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round"
                        style={{ transition: "transform 0.3s ease" }}
                      >
                        <path d="M7 17L17 7M9 7h8v8" />
                      </svg>
                    </span>

                    {/* Color Options Swatches */}
                    {p.colors && p.colors.length > 0 && (
                      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                        {p.colors.slice(0, 4).map((c) => (
                          <span
                            key={c.name}
                            title={c.name}
                            style={{
                              width: 12,
                              height: 12,
                              borderRadius: "50%",
                              background: c.hex,
                              border: "1px solid rgba(0, 0, 0, 0.15)",
                              display: "inline-block",
                              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                            }}
                          />
                        ))}
                        {p.colors.length > 4 && (
                          <span style={{ fontSize: 10, color: "var(--muted)", fontWeight: 600, marginLeft: 2 }}>
                            +{p.colors.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--blue-900)", padding: "clamp(48px,6vw,80px) 0" }}>
        <div
          className="container mob-col mob-gap-md"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32 }}
        >
          <div>
            <h2 style={{ color: "#fff", fontSize: "clamp(24px,3vw,40px)", margin: 0 }}>
              Need a quote on {cat.label.toLowerCase()}?
            </h2>
            <p style={{ color: "rgba(255,255,255,.65)", marginTop: 10, fontSize: 16 }}>
              Our team responds with dealer and bulk pricing within 24 hours.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexShrink: 0, flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn--white">Get a Quote</Link>
            <Link href="/dealership" className="btn btn--ghost">Become a Dealer</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
