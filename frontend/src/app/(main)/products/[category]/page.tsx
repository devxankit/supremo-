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
        <div className="container">
          <div
            className="mob-1col mob-gap-md"
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}
          >
            {items.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${cat.slug}/${p.slug}`}
                className="hover-lift-sm"
                style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r-md)",
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    background: "var(--paper-2)",
                    borderRadius: "var(--r-md)",
                    height: 160,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <ProductIcon type={cat.icon} size={88} />
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.badges.map((b) => (
                    <span
                      key={b}
                      style={{
                        padding: "2px 10px",
                        background: "var(--blue-100)",
                        color: "var(--blue-800)",
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 600,
                        fontFamily: "var(--font-display)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {b}
                    </span>
                  ))}
                </div>
                <div>
                  <h3 style={{ fontSize: 20, lineHeight: 1.3 }}>{p.name}</h3>
                  <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 4, fontWeight: 500 }}>{p.capacity}</p>
                </div>
                <p style={{ fontSize: 14, color: "var(--slate)", lineHeight: 1.6 }}>{p.tagline}</p>
                <span
                  style={{
                    marginTop: "auto",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    color: "var(--blue-600)",
                    fontWeight: 600,
                    fontSize: 14,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  View Product
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </span>
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
