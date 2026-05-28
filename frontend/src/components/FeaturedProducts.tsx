"use client";

import Link from "next/link";

const products = [
  {
    name: "Supremo TL 1000 — Triple Layer Overhead Tank",
    badges: [{ label: "Best Seller", blue: true }, { label: "ISI" }],
    specs: [{ k: "Capacity", v: "1000 L" }, { k: "Layers", v: "3" }, { k: "Warranty", v: "10 yrs" }],
    caps: ["500L", "1000L", "2000L", "+4"],
    swatches: ["#0A1628", "#0E55BC", "#FFB020", "#1FAE6A"],
    image: "/images/overhead_tank.png",
    href: "/products/water-tanks/triple-layer-overhead-tank",
  },
  {
    name: "Supremo HotFlow CPVC — SDR 11 Plumbing Pipe",
    badges: [{ label: "CPVC" }],
    specs: [{ k: "Series", v: "SDR 11" }, { k: "Sizes", v: "½″–2″" }, { k: "Use", v: "Hot/Cold" }],
    caps: ["½″", "¾″", "1″", "+5"],
    swatches: ["#E6F0FF", "#FFB020"],
    image: "/images/plumbing_pipes.png",
    href: "/products/pipes-fittings/cpvc-hot-cold-pipes",
  },
  {
    name: "Supremo Terrazzo — Decorative Planter Series",
    badges: [{ label: "New", blue: true }],
    specs: [{ k: "Sizes", v: "6 SKUs" }, { k: "Finish", v: "Matte" }, { k: "UV stable", v: "Yes" }],
    caps: ["Round", "Square", "Tall"],
    swatches: ["#fff", "#0A1628", "#A8B3C7", "#1FAE6A"],
    image: "/images/terrazzo_planter.png",
    href: "/products/planters/decorative-indoor-planter",
  },
];

export function FeaturedProducts() {
  return (
    <section style={{ background: "var(--paper)" }}>
      <div className="container">
        <div className="mob-1col mob-gap-sm mob-mb-sm" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "end", marginBottom: 48 }}>
          <div>
            <span className="eyebrow">Featured</span>
            <h2 style={{ marginTop: 20 }}>
              Best-sellers, by dealer demand.
            </h2>
          </div>
          <Link href="/products" className="btn btn--outline btn--sm" style={{ justifySelf: "start" }}>All Products →</Link>
        </div>

        <div className="mob-scroll" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {products.map((p) => (
            <article
              key={p.name}
              className="mob-card-lg"
              style={{
                border: "1px solid rgba(14, 85, 188, 0.08)",
                borderRadius: "var(--r-lg)",
                overflow: "hidden",
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: "0 4px 20px rgba(10, 22, 40, 0.02)",
              }}
              onMouseEnter={e => {
                const card = e.currentTarget as HTMLElement;
                card.style.transform = "translateY(-8px)";
                card.style.boxShadow = "0 20px 40px -15px rgba(10, 22, 40, 0.12), 0 0 0 1px rgba(14, 85, 188, 0.12)";
                card.style.borderColor = "rgba(14, 85, 188, 0.2)";
                const img = card.querySelector(".prod-card-img") as HTMLElement;
                if (img) img.style.transform = "scale(1.06) translateY(-4px)";
                const arrow = card.querySelector(".prod-card-arrow") as HTMLElement;
                if (arrow) arrow.style.transform = "translateX(4px)";
              }}
              onMouseLeave={e => {
                const card = e.currentTarget as HTMLElement;
                card.style.transform = "";
                card.style.boxShadow = "0 4px 20px rgba(10, 22, 40, 0.02)";
                card.style.borderColor = "rgba(14, 85, 188, 0.08)";
                const img = card.querySelector(".prod-card-img") as HTMLElement;
                if (img) img.style.transform = "";
                const arrow = card.querySelector(".prod-card-arrow") as HTMLElement;
                if (arrow) arrow.style.transform = "";
              }}
            >
              {/* Visual Showcase Frame */}
              <div
                style={{
                  margin: "16px 16px 0",
                  aspectRatio: "4/3",
                  background: "#ffffff",
                  display: "grid",
                  placeItems: "center",
                  position: "relative",
                  borderRadius: "var(--r-md)",
                  border: "1px solid rgba(14, 85, 188, 0.05)",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6, zIndex: 10 }}>
                  {p.badges.map(b => (
                    <span
                      key={b.label}
                      style={{
                        background: b.blue ? "var(--blue-600)" : "rgba(255, 255, 255, 0.9)",
                        color: b.blue ? "#fff" : "var(--blue-800)",
                        border: b.blue ? "none" : "1px solid rgba(14, 85, 188, 0.12)",
                        padding: "3px 9px",
                        borderRadius: 999,
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        backdropFilter: "blur(8px)",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                      }}
                    >
                      {b.label}
                    </span>
                  ))}
                </div>
                <img
                  className="prod-card-img"
                  src={p.image}
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

              {/* Body */}
              <div style={{ padding: "20px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h4 style={{ fontSize: 19, fontWeight: 700, color: "var(--ink)", lineHeight: 1.3, marginBottom: 8 }}>
                  {p.name}
                </h4>
                
                <div style={{ display: "flex", gap: 14, color: "var(--muted)", fontSize: 12.5, flexWrap: "wrap", marginBottom: 12 }}>
                  {p.specs.map(s => (
                    <span key={s.k}><b style={{ color: "var(--slate)", fontWeight: 600 }}>{s.k}</b> {s.v}</span>
                  ))}
                </div>
                
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
                  {p.caps.map(c => (
                    <span
                      key={c}
                      style={{
                        padding: "4px 10px",
                        borderRadius: 6,
                        background: "var(--blue-50)",
                        color: "var(--blue-700)",
                        fontSize: 11,
                        fontWeight: 700,
                        border: "1px solid var(--blue-100)",
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
                
                <div style={{ marginTop: "auto", paddingTop: 18, borderTop: "1px solid var(--line-2)", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13.5 }}>
                  <Link
                    href={p.href}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      color: "var(--blue-700)",
                      fontWeight: 700,
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
                  </Link>
                  <div style={{ display: "flex", gap: 5 }}>
                    {p.swatches.map(sw => (
                      <span
                        key={sw}
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          background: sw,
                          border: "1px solid rgba(0, 0, 0, 0.15)",
                          display: "inline-block",
                          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
