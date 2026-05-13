"use client";

const products = [
  {
    name: "Supremo TL 1000 — Triple Layer Overhead Tank",
    badges: [{ label: "Best Seller", blue: true }, { label: "ISI" }],
    specs: [{ k: "Capacity", v: "1000 L" }, { k: "Layers", v: "3" }, { k: "Warranty", v: "10 yrs" }],
    caps: ["500L", "1000L", "2000L", "+4"],
    swatches: ["#0A1628", "#0E55BC", "#FFB020", "#1FAE6A"],
    svg: (
      <svg viewBox="0 0 300 240" width="65%">
        <g transform="translate(75 30)">
          <ellipse cx="75" cy="180" rx="68" ry="8" fill="#0E55BC" opacity=".2" />
          <path d="M5 30 Q75 12 145 30 L140 170 Q75 185 10 170 Z" fill="#0A3F8F" />
          <ellipse cx="75" cy="28" rx="65" ry="8" fill="#0E55BC" />
          <circle cx="75" cy="20" r="22" fill="#062D6B" />
          <path d="M22 60 Q75 45 128 60" stroke="rgba(255,255,255,.25)" strokeWidth="1.5" fill="none" />
          <path d="M24 100 Q75 85 126 100" stroke="rgba(255,255,255,.25)" strokeWidth="1.5" fill="none" />
          <path d="M26 140 Q75 125 124 140" stroke="rgba(255,255,255,.25)" strokeWidth="1.5" fill="none" />
        </g>
      </svg>
    ),
  },
  {
    name: "Supremo HotFlow CPVC — SDR 11 Plumbing Pipe",
    badges: [{ label: "CPVC" }],
    specs: [{ k: "Series", v: "SDR 11" }, { k: "Sizes", v: "½″–2″" }, { k: "Use", v: "Hot/Cold" }],
    caps: ["½″", "¾″", "1″", "+5"],
    swatches: ["#E6F0FF", "#FFB020"],
    svg: (
      <svg viewBox="0 0 300 240" width="85%">
        <defs>
          <linearGradient id="pipeg1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity=".5" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g transform="translate(20 80)">
          <rect x="0" y="0" width="260" height="22" rx="4" fill="#0A3F8F" />
          <rect x="0" y="0" width="260" height="22" rx="4" fill="url(#pipeg1)" opacity=".5" />
          <rect x="0" y="34" width="260" height="14" rx="3" fill="#0E55BC" />
          <rect x="0" y="60" width="260" height="18" rx="3" fill="#062D6B" />
        </g>
      </svg>
    ),
  },
  {
    name: "Supremo Terrazzo — Decorative Planter Series",
    badges: [{ label: "New", blue: true }],
    specs: [{ k: "Sizes", v: "6 SKUs" }, { k: "Finish", v: "Matte" }, { k: "UV stable", v: "Yes" }],
    caps: ["Round", "Square", "Tall"],
    swatches: ["#fff", "#0A1628", "#A8B3C7", "#1FAE6A"],
    svg: (
      <svg viewBox="0 0 300 240" width="65%">
        <g transform="translate(95 50)">
          <path d="M5 50 L115 50 L100 175 L20 175 Z" fill="#0E55BC" />
          <path d="M5 50 L115 50 L110 65 L10 65 Z" fill="#062D6B" />
          <ellipse cx="60" cy="48" rx="58" ry="8" fill="#0A3F8F" />
          <path d="M60 45 Q35 20 45 0" stroke="#1FAE6A" strokeWidth="4" fill="none" />
          <path d="M60 45 Q85 20 75 0" stroke="#1FAE6A" strokeWidth="4" fill="none" />
          <circle cx="45" cy="0" r="9" fill="#1FAE6A" />
          <circle cx="75" cy="0" r="7" fill="#1FAE6A" />
          <circle cx="60" cy="-6" r="6" fill="#1FAE6A" />
        </g>
      </svg>
    ),
  },
];

export function FeaturedProducts() {
  return (
    <section style={{ background: "var(--paper)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "end", marginBottom: 48 }}>
          <div>
            <span className="eyebrow">Featured</span>
            <h2 style={{ fontSize: "clamp(34px,4.2vw,56px)", lineHeight: 1.05, letterSpacing: "-0.025em", marginTop: 20 }}>
              Best-sellers, by dealer demand.
            </h2>
          </div>
          <a href="#" className="btn btn--outline btn--sm">All Products →</a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {products.map((p) => (
            <article
              key={p.name}
              style={{
                border: "1px solid var(--line)",
                borderRadius: "var(--r-md)",
                overflow: "hidden",
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                transition: "box-shadow .25s ease, transform .25s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--sh-md)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
            >
              {/* Visual */}
              <div style={{ aspectRatio: "4/3", background: "linear-gradient(180deg,var(--paper-2),#fff)", display: "grid", placeItems: "center", position: "relative", borderBottom: "1px solid var(--line)" }}>
                <div style={{ position: "absolute", top: 14, left: 14, display: "flex", gap: 6 }}>
                  {p.badges.map(b => (
                    <span key={b.label} style={{ background: b.blue ? "var(--blue-700)" : "#fff", color: b.blue ? "#fff" : "var(--blue-800)", border: b.blue ? "none" : "1px solid var(--line)", padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, letterSpacing: "0.06em" }}>
                      {b.label}
                    </span>
                  ))}
                </div>
                {p.svg}
              </div>

              {/* Body */}
              <div style={{ padding: "22px 22px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h4 style={{ fontSize: 19, letterSpacing: "-0.01em" }}>{p.name}</h4>
                <div style={{ display: "flex", gap: 16, marginTop: 10, color: "var(--muted)", fontSize: 13 }}>
                  {p.specs.map(s => (
                    <span key={s.k}><b style={{ color: "var(--ink)", fontWeight: 600 }}>{s.k}</b> {s.v}</span>
                  ))}
                </div>
                <div style={{ marginTop: 18, display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {p.caps.map(c => (
                    <span key={c} style={{ padding: "6px 12px", borderRadius: 999, background: "var(--blue-50)", color: "var(--blue-700)", fontSize: 12, fontWeight: 600, border: "1px solid var(--blue-100)" }}>{c}</span>
                  ))}
                </div>
                <div style={{ marginTop: "auto", paddingTop: 22, borderTop: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13 }}>
                  <a href="#" style={{ color: "var(--blue-700)", fontWeight: 600 }}>View product →</a>
                  <div style={{ display: "flex", gap: 6 }}>
                    {p.swatches.map(sw => (
                      <span key={sw} style={{ width: 16, height: 16, borderRadius: "50%", background: sw, border: "1.5px solid #fff", boxShadow: "0 0 0 1px var(--line)", display: "inline-block" }} />
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
