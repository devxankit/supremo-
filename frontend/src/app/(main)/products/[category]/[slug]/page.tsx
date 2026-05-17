import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  products,
  getCategory,
  getProduct,
  getRelated,
  ProductIcon,
} from "@/lib/catalogue";
import { ProductInquiry } from "../../_components/ProductInquiry";

export function generateStaticParams() {
  return products.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const product = getProduct(category, slug);
  if (!product) return { title: "Product — Supremo India" };
  return {
    title: `${product.name} — Supremo India`,
    description: product.tagline,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const product = getProduct(category, slug);
  const cat = getCategory(category);
  if (!product || !cat) notFound();

  const related = getRelated(product);

  return (
    <main style={{ paddingTop: 62 }}>
      {/* Breadcrumb */}
      <div style={{ background: "var(--paper-2)", borderBottom: "1px solid var(--line)" }}>
        <div
          className="container"
          style={{ display: "flex", gap: 8, alignItems: "center", padding: "14px var(--gutter)", fontSize: 13, color: "var(--muted)", flexWrap: "wrap" }}
        >
          <Link href="/products" style={{ color: "var(--muted)" }}>Products</Link>
          <span>/</span>
          <Link href={`/products/${cat.slug}`} style={{ color: "var(--muted)" }}>{cat.label}</Link>
          <span>/</span>
          <span style={{ color: "var(--ink)", fontWeight: 600 }}>{product.name}</span>
        </div>
      </div>

      {/* Overview */}
      <section style={{ background: "var(--paper)" }}>
        <div
          className="container mob-1col mob-gap-lg"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}
        >
          {/* Visual */}
          <div
            style={{
              background: "linear-gradient(135deg,var(--blue-50),var(--blue-100))",
              border: "1px solid var(--line)",
              borderRadius: "var(--r-lg)",
              aspectRatio: "1/1",
              display: "grid",
              placeItems: "center",
              position: "sticky",
              top: 86,
            }}
          >
            <ProductIcon type={cat.icon} size={220} />
          </div>

          {/* Info */}
          <div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
              {product.badges.map((b) => (
                <span
                  key={b}
                  style={{
                    padding: "3px 12px",
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
            <h1 style={{ fontSize: "clamp(28px,3.5vw,44px)", lineHeight: 1.15, marginBottom: 12 }}>
              {product.name}
            </h1>
            <p style={{ color: "var(--slate)", fontSize: 18, lineHeight: 1.6, marginBottom: 24 }}>
              {product.tagline}
            </p>

            <div
              style={{
                display: "flex",
                gap: 24,
                padding: "16px 0",
                borderTop: "1px solid var(--line)",
                borderBottom: "1px solid var(--line)",
                marginBottom: 24,
              }}
            >
              <div>
                <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Capacity Range
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--blue-700)", marginTop: 4 }}>
                  {product.capacity}
                </div>
              </div>
            </div>

            {/* Sizes */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
                Available Sizes
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {product.sizes.map((s) => (
                  <span
                    key={s}
                    style={{
                      padding: "7px 14px",
                      borderRadius: 999,
                      background: "var(--paper-2)",
                      border: "1px solid var(--line)",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--slate)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
                Colour Options
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                {product.colors.map((c) => (
                  <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: c.hex,
                        border: "1.5px solid #fff",
                        boxShadow: "0 0 0 1px var(--line)",
                        display: "inline-block",
                      }}
                    />
                    <span style={{ fontSize: 13, color: "var(--slate)" }}>{c.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#enquire" className="btn">
                Get a Quote
                <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>
              <a href="/catalogue.pdf" target="_blank" rel="noopener noreferrer" className="btn btn--outline">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Download Brochure
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Description + Features */}
      <section style={{ background: "var(--paper-2)" }}>
        <div
          className="container mob-1col mob-gap-lg"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }}
        >
          <div>
            <span className="eyebrow">Overview</span>
            <h2 style={{ fontSize: "clamp(24px,3vw,36px)", marginTop: 16, marginBottom: 16 }}>
              About this product
            </h2>
            <p style={{ color: "var(--slate)", fontSize: 16.5, lineHeight: 1.8 }}>{product.description}</p>
          </div>
          <div>
            <span className="eyebrow">Key Features</span>
            <h2 style={{ fontSize: "clamp(24px,3vw,36px)", marginTop: 16, marginBottom: 24 }}>
              Why dealers pick it
            </h2>
            <ul style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {product.features.map((f) => (
                <li key={f} style={{ display: "flex", gap: 12, color: "var(--slate)", fontSize: 15.5 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Applications + Specs */}
      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          <span className="eyebrow">Applications</span>
          <h2 style={{ fontSize: "clamp(24px,3vw,36px)", marginTop: 16, marginBottom: 32 }}>
            Where it&apos;s used
          </h2>
          <div
            className="mob-1col mob-gap-sm"
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 64 }}
          >
            {product.applications.map((a) => (
              <div
                key={a}
                style={{
                  background: "var(--paper-2)",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r-md)",
                  padding: "20px 22px",
                  fontSize: 15,
                  fontWeight: 500,
                  color: "var(--slate)",
                }}
              >
                {a}
              </div>
            ))}
          </div>

          <span className="eyebrow">Specifications</span>
          <h2 style={{ fontSize: "clamp(24px,3vw,36px)", marginTop: 16, marginBottom: 32 }}>
            Technical details
          </h2>
          <div
            style={{
              border: "1px solid var(--line)",
              borderRadius: "var(--r-md)",
              overflow: "hidden",
              maxWidth: 640,
            }}
          >
            {product.specs.map((s, i) => (
              <div
                key={s.label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  background: i % 2 === 0 ? "#fff" : "var(--paper-2)",
                }}
              >
                <div style={{ padding: "14px 20px", fontSize: 14, color: "var(--muted)", fontWeight: 600 }}>{s.label}</div>
                <div style={{ padding: "14px 20px", fontSize: 14.5, color: "var(--ink)", fontWeight: 600, borderLeft: "1px solid var(--line)" }}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry */}
      <section id="enquire" style={{ background: "var(--paper-2)" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <ProductInquiry productName={product.name} />
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ background: "var(--paper)" }}>
          <div className="container">
            <span className="eyebrow">Related Products</span>
            <h2 style={{ fontSize: "clamp(24px,3vw,36px)", marginTop: 16, marginBottom: 32 }}>
              More from {cat.label}
            </h2>
            <div
              className="mob-1col mob-gap-md"
              style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}
            >
              {related.map((p) => (
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
                    gap: 14,
                    textDecoration: "none",
                  }}
                >
                  <div style={{ background: "var(--paper-2)", borderRadius: "var(--r-md)", height: 130, display: "grid", placeItems: "center" }}>
                    <ProductIcon type={cat.icon} size={76} />
                  </div>
                  <h3 style={{ fontSize: 18, lineHeight: 1.3 }}>{p.name}</h3>
                  <p style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>{p.capacity}</p>
                  <span
                    style={{
                      marginTop: "auto",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      color: "var(--blue-600)",
                      fontWeight: 600,
                      fontSize: 13.5,
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    View Product
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
