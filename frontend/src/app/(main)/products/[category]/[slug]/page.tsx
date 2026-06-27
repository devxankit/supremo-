import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductInquiry } from "../../_components/ProductInquiry";
import { LazyImage } from "@/components/LazyImage";
import { ProductReviews } from "../../_components/ProductReviews";
import { CATALOGUE_URL, AMAZON_STORE_URLS } from "@/lib/site";
import { resolveBackendUrl } from "@/lib/urlHelper";

const API = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace(/\/api$/, "") : "http://localhost:5001";

type ProductColor = { name: string; hex: string };
type ProductSpec  = { label: string; value: string };

type Product = {
  _id: string;
  slug: string;
  category: string;
  name: string;
  tagline?: string;
  capacity?: string;
  description?: string;
  badges?: string[];
  features?: string[];
  applications?: string[];
  sizes?: string[];
  colors?: ProductColor[];
  specs?: ProductSpec[];
  modelNo?: string;
  images?: string[];
  price?: string;
  stock?: number;
  status?: string;
  brochureUrl?: string;
  showBrochure?: boolean;
};

type Category = {
  _id: string;
  slug: string;
  name: string;
  color?: string;
};

async function fetchProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API}/api/products?slug=${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    // API returns array; find by slug
    const list: Product[] = Array.isArray(data) ? data : [];
    return list.find((p) => p.slug === slug) ?? null;
  } catch {
    return null;
  }
}

async function fetchCategory(slug: string): Promise<Category | null> {
  try {
    const res = await fetch(`${API}/api/categories`, { cache: "no-store" });
    if (!res.ok) return null;
    const list: Category[] = await res.json();
    return list.find((c) => c.slug === slug) ?? null;
  } catch {
    return null;
  }
}

async function fetchRelated(category: string, currentSlug: string): Promise<Product[]> {
  try {
    const res = await fetch(`${API}/api/products?category=${category}`, { cache: "no-store" });
    if (!res.ok) return [];
    const list: Product[] = await res.json();
    return list.filter((p) => p.slug !== currentSlug).slice(0, 3);
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.tagline,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const [product, cat, related] = await Promise.all([
    fetchProduct(slug),
    fetchCategory(category),
    fetchRelated(category, slug),
  ]);

  if (!product || !cat) notFound();

  const image = product.images && product.images.length > 0 ? product.images[0] : "/images/logo.png";
  const amazonUrl = AMAZON_STORE_URLS[category];

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
          <Link href={`/products?category=${cat.slug}`} style={{ color: "var(--muted)" }}>{cat.name}</Link>
          <span>/</span>
          <span style={{ color: "var(--ink)", fontWeight: 600 }}>{product.name}</span>
        </div>
      </div>

      {/* Overview */}
      <section style={{ background: "var(--paper)", paddingBottom: "clamp(36px, 4vw, 56px)" }}>
        <div
          className="container mob-1col mob-gap-lg"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}
        >
          {/* Visual */}
          <div className="product-image-container">
            <LazyImage
              src={image}
              alt={product.name}
              priority={true}
              style={{
                maxWidth: "85%",
                maxHeight: "85%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>

          {/* Info */}
          <div>
            {/* Badges */}
            {(product.badges || []).length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                {(product.badges || []).map((b) => (
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
            )}

            <h1 className="product-title">
              {product.name}
            </h1>
            {product.tagline && (
              <p style={{ color: "var(--slate)", fontSize: 18, lineHeight: 1.6, marginBottom: 24 }}>
                {product.tagline}
              </p>
            )}

            {product.capacity && (
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
            )}

            {/* Sizes */}
            {(product.sizes || []).length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
                  Available Sizes
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {(product.sizes || []).map((s) => (
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
            )}

            {/* Colors */}
            {(product.colors || []).length > 0 && (
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
                  Colour Options
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                  {(product.colors || []).map((c) => (
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
            )}

            {/* CTAs */}
            <div className="product-ctas">
              <a href="#enquire" className="btn">
                Get a Quote
                <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>
              {amazonUrl && (
                <a
                  href={amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ background: "#FF9900", borderColor: "#FF9900", color: "#0A1628" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  Shop on Amazon
                </a>
              )}
              {product.showBrochure !== false && (resolveBackendUrl(product.brochureUrl) || CATALOGUE_URL) && (
                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/media/download?url=${encodeURIComponent(resolveBackendUrl(product.brochureUrl) || CATALOGUE_URL)}`}
                  className="btn btn--outline"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  Download Brochure
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Description + Features */}
      {(product.description || (product.features || []).length > 0) && (
        <section style={{ background: "var(--paper-2)", paddingTop: "clamp(36px, 4vw, 56px)", paddingBottom: "clamp(36px, 4vw, 56px)" }}>
          <div
            className="container mob-1col mob-gap-lg"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }}
          >
            {product.description && (
              <div>
                <span className="eyebrow">Overview</span>
                <h2 style={{ fontSize: "clamp(24px,3vw,36px)", marginTop: 16, marginBottom: 16 }}>
                  About this product
                </h2>
                <p style={{ color: "var(--slate)", fontSize: 16.5, lineHeight: 1.8 }}>{product.description}</p>
              </div>
            )}
            {(product.features || []).length > 0 && (
              <div>
                <span className="eyebrow">Key Features</span>
                <h2 style={{ fontSize: "clamp(24px,3vw,36px)", marginTop: 16, marginBottom: 24 }}>
                  Why dealers pick it
                </h2>
                <ul style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {(product.features || []).map((f) => (
                    <li key={f} style={{ display: "flex", gap: 12, color: "var(--slate)", fontSize: 15.5 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Applications + Specs */}
      {((product.applications || []).length > 0 || (product.specs || []).length > 0) && (
        <section style={{ background: "var(--paper)", paddingTop: "clamp(36px, 4vw, 56px)" }}>
          <div className="container">
            {(product.applications || []).length > 0 && (
              <>
                <span className="eyebrow">Applications</span>
                <h2 style={{ fontSize: "clamp(24px,3vw,36px)", marginTop: 16, marginBottom: 32 }}>
                  Where it&apos;s used
                </h2>
                <div className="product-applications-grid">
                  {(product.applications || []).map((a) => (
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
              </>
            )}

            {(product.specs || []).length > 0 && (
              <>
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
                  {(product.specs || []).map((s, i) => (
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
              </>
            )}
          </div>
        </section>
      )}

      {/* Inquiry */}
      <section id="enquire" style={{ background: "var(--paper-2)" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <ProductInquiry productName={product.name} />
        </div>
      </section>

      {/* Reviews */}
      <ProductReviews productSlug={product.slug} />

      {/* Related */}
      {related.length > 0 && (
        <section style={{ background: "var(--paper)" }}>
          <style dangerouslySetInnerHTML={{ __html: `
            .related-prod-card {
              background: #fff;
              border: 1px solid rgba(14, 85, 188, 0.08);
              border-radius: var(--r-lg);
              padding: 20px;
              display: flex;
              flex-direction: column;
              text-decoration: none;
              transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
              box-shadow: 0 4px 20px rgba(10, 22, 40, 0.02);
            }
            .related-prod-card:hover {
              transform: translateY(-6px);
              box-shadow: 0 15px 30px -10px rgba(10, 22, 40, 0.1), 0 0 0 1px rgba(14, 85, 188, 0.12);
              border-color: rgba(14, 85, 188, 0.18);
            }
            .related-prod-card:hover .prod-card-img { transform: scale(1.06) translateY(-2px); }
            .related-prod-card:hover .prod-card-arrow { transform: translateX(3px); }
          `}} />
          <div className="container">
            <span className="eyebrow">Related Products</span>
            <h2 style={{ fontSize: "clamp(24px,3vw,36px)", marginTop: 16, marginBottom: 32 }}>
              More from {cat.name}
            </h2>
            <div
              className="mob-scroll"
              style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}
            >
              {related.map((p) => {
                const relImg = p.images && p.images.length > 0 ? p.images[0] : "/images/logo.png";
                return (
                  <Link
                    key={p.slug}
                    href={`/products/${cat.slug}/${p.slug}`}
                    className="related-prod-card mob-card-md"
                  >
                    <div
                      style={{
                        background: "#ffffff",
                        borderRadius: "var(--r-md)",
                        height: 190,
                        display: "grid",
                        placeItems: "center",
                        border: "1px solid rgba(14, 85, 188, 0.05)",
                        overflow: "hidden",
                        position: "relative",
                        marginBottom: 16,
                      }}
                    >
                      <LazyImage
                        className="prod-card-img"
                        src={relImg}
                        alt={p.name}
                        style={{
                          width: "80%",
                          height: "80%",
                          objectFit: "contain",
                          padding: "8px",
                          display: "block",
                          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      />
                    </div>

                    <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)", lineHeight: 1.3, marginBottom: 8 }}>
                      {p.name}
                    </h3>

                    {p.capacity && (
                      <div style={{ marginBottom: 16 }}>
                        <span style={{ fontSize: 11, color: "var(--blue-800)", background: "var(--blue-50)", border: "1px solid var(--blue-100)", padding: "3px 8px", borderRadius: 6, fontWeight: 700, fontFamily: "var(--font-display)", display: "inline-block" }}>
                          {p.capacity}
                        </span>
                      </div>
                    )}

                    <div style={{ borderTop: "1px solid var(--line-2)", paddingTop: 14, marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
                          width="13"
                          height="13"
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
                      {(p.colors || []).length > 0 && (
                        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                          {(p.colors || []).slice(0, 3).map((c) => (
                            <span
                              key={c.name}
                              title={c.name}
                              style={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                background: c.hex,
                                border: "1px solid rgba(0, 0, 0, 0.15)",
                                display: "inline-block",
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
