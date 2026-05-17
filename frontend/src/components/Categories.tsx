"use client";

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

const categories = [
  {
    id: "tanks",
    big: true,
    title: "Water\nTanks",
    count: "04 Variants",
    subs: "Triple-layer · Overhead · Loft · Underground. 200L to 25,000L.",
    tags: ["Food-grade", "ISI marked"],
  },
  {
    id: "pipes",
    title: "Pipes &\nFittings",
    count: "12 SKUs",
    subs: "PVC · CPVC · Agri · Plumbing",
  },
  {
    id: "accessories",
    title: "Utility\nAccessories",
    count: "08 Items",
    subs: "Cooler · Ghamela · Milk Can · Bin",
  },
  {
    id: "planters",
    title: "Planters",
    count: "03 Ranges",
    subs: "Decorative · Garden · Commercial",
  },
  {
    id: "commercial",
    title: "Commercial\nPlastic",
    count: "Bulk · B2B",
    subs: "Custom moulding · Volume orders",
    light: true,
  },
];

export function Categories() {
  return (
    <section style={{ background: "var(--paper-2)" }}>
      <div className="container">
        <div className="mob-1col" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "end", marginBottom: 56 }}>
          <div>
            <span className="eyebrow">Product Lines</span>
            <h2 style={{ fontSize: "clamp(34px,4.2vw,56px)", lineHeight: 1.15, marginTop: 20 }}>
              Four lines. One quality standard.
            </h2>
          </div>
          <p style={{ color: "var(--muted)", fontSize: 18, maxWidth: "40ch" }}>
            Built in our own plants, tested by our own QC team.
          </p>
        </div>

        <div
          className="cat-outer"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: 16,
            minHeight: 680,
          }}
        >
          {/* Big water tanks card */}
          <a
            href="#"
            className="cat-big"
            style={{
              gridRow: "1 / span 2",
              position: "relative",
              borderRadius: "var(--r-lg)",
              overflow: "hidden",
              background: "linear-gradient(180deg,#062D6B 0%,#0A3F8F 100%)",
              color: "#fff",
              border: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: 28,
              cursor: "pointer",
              transition: "transform .25s ease, box-shadow .25s ease",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--sh-lg)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
          >
            <div style={{ position: "absolute", inset: 0, zIndex: 0, display: "flex", alignItems: "flex-end", justifyContent: "flex-end", padding: "20px" }}>
              <img
                src="/images/6 Layers Gold.png"
                alt="Water Tanks"
                style={{
                  width: "70%",
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <span style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,.6)", fontWeight: 600 }}>04 Variants</span>
              <h3 style={{ fontSize: 44, lineHeight: 1.1, color: "#fff", marginTop: 8 }}>
                Water<br />Tanks
              </h3>
              <p style={{ marginTop: 20, maxWidth: "28ch", color: "rgba(255,255,255,.75)", fontSize: 14 }}>
                Triple-layer · Overhead · Loft · Underground. 200L to 25,000L.
              </p>
            </div>
            <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Food-grade", "ISI marked"].map(t => (
                  <span key={t} style={{ fontSize: 12, padding: "5px 11px", border: "1px solid rgba(255,255,255,.2)", borderRadius: 999, color: "#fff" }}>{t}</span>
                ))}
              </div>
              <span style={{ width: 48, height: 48, display: "grid", placeItems: "center", borderRadius: 999, background: "rgba(255,255,255,.12)", color: "#fff", border: "1px solid rgba(255,255,255,.2)" }}>
                <ArrowIcon />
              </span>
            </div>
          </a>

          {/* Small cards — wrapped for mobile carousel */}
          <div
            className="cat-smalls"
            style={{
              gridColumn: "2 / span 2",
              gridRow: "1 / span 2",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "1fr 1fr",
              gap: 16,
            }}
          >
          {[
            { title: "Pipes &\nFittings", count: "12 SKUs", subs: "PVC · CPVC · Agri · Plumbing" },
            { title: "Utility\nAccessories", count: "08 Items", subs: "Cooler · Ghamela · Milk Can · Bin" },
            { title: "Planters", count: "03 Ranges", subs: "Decorative · Garden · Commercial" },
            { title: "Commercial\nPlastic", count: "Bulk · B2B", subs: "Custom moulding · Volume orders", light: true },
          ].map((c) => (
            <a
              key={c.title}
              href="#"
              style={{
                position: "relative",
                borderRadius: "var(--r-lg)",
                overflow: "hidden",
                background: c.light ? "linear-gradient(135deg,#F2F7FF,#E6F0FF)" : "#fff",
                border: c.light ? "none" : "1px solid var(--line)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: 28,
                cursor: "pointer",
                transition: "transform .25s ease, box-shadow .25s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--sh-lg)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
            >
              <div>
                <span style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: c.light ? "var(--blue-700)" : "var(--muted)", fontWeight: 600 }}>{c.count}</span>
                <h3 style={{ fontSize: 28, color: c.light ? "var(--blue-800)" : "var(--ink)", marginTop: 6 }}>
                  {c.title.split("\n").map((line, i) => (
                    <span key={i}>{line}{i === 0 && c.title.includes("\n") ? <br /> : null}</span>
                  ))}
                </h3>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <p style={{ fontSize: 13, maxWidth: "20ch", margin: 0, color: c.light ? "var(--blue-700)" : "var(--muted)" }}>{c.subs}</p>
                <span style={{ width: 48, height: 48, display: "grid", placeItems: "center", borderRadius: 999, background: "var(--blue-50)", color: "var(--blue-700)", border: "1px solid var(--blue-100)", transition: "all .2s ease", flexShrink: 0 }}>
                  <ArrowIcon />
                </span>
              </div>
            </a>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
