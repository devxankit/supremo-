const steps = [
  { n: "01", title: "Resin intake & testing", sub: "Food-grade LLDPE, certified per batch", meta: "FDA · IS 10146" },
  { n: "02", title: "Tri-layer rotomoulding", sub: "Independent feeders for each layer", meta: "280–320°C" },
  { n: "03", title: "Controlled cooling", sub: "Reduces internal stress, prevents warping", meta: "45 min cycle" },
  { n: "04", title: "QC: drop, pressure, UV", sub: "Every single batch, not samples", meta: "100% test" },
  { n: "05", title: "Branding & dispatch", sub: "Direct to dealer or distribution hub", meta: "48 hrs SLA" },
];

export function Manufacturing() {
  return (
    <section
      style={{
        position: "relative",
        color: "#fff",
        background: "var(--ink)",
        overflow: "hidden",
        padding: "clamp(72px,9vw,128px) 0",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 80% 20%,rgba(20,102,230,.4),transparent 50%),radial-gradient(circle at 10% 90%,rgba(0,180,240,.25),transparent 50%),linear-gradient(135deg,#051633 0%,#0A1628 50%,#06245A 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)",
          backgroundSize: "100px 100px",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%,#000 30%,transparent 80%)",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%,#000 30%,transparent 80%)",
        }}
      />

      <div className="container" style={{ position: "relative" }}>
        {/* Head */}
        <div style={{ maxWidth: 720, marginBottom: 72 }}>
          <span className="eyebrow eyebrow-light">Manufacturing</span>
          <h2 style={{ color: "#fff", fontSize: "clamp(40px,5.4vw,76px)", lineHeight: 1, letterSpacing: "-0.03em", marginTop: 20 }}>
            Four plants.<br />
            <em style={{ fontStyle: "italic", fontWeight: 500, color: "var(--blue-400)" }}>One quality system.</em>
          </h2>
          <p style={{ color: "rgba(255,255,255,.7)", fontSize: 18, marginTop: 20, maxWidth: "56ch" }}>
            From rotomoulded tanks in Pune to extrusion lines in Surat — the same operator training, the same QC checklist, the same batch traceability across every line.
          </p>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            borderTop: "1px solid rgba(255,255,255,.15)",
          }}
        >
          {[
            { v: "4", unit: "plants", l: "Pune · Surat · Hyderabad · Ghaziabad" },
            { v: "68,000", unit: "L/day", l: "Combined rotomoulding capacity across India" },
            { v: "22", unit: "lines", l: "Rotomoulding, extrusion, injection & blow moulding" },
            { v: "100", unit: "% QC", l: "Every batch passes drop, pressure & UV tests" },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                paddingTop: 32,
                borderRight: i < 3 ? "1px solid rgba(255,255,255,.15)" : "none",
                paddingRight: i < 3 ? 24 : 0,
              }}
            >
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(44px,5vw,68px)", lineHeight: 1, letterSpacing: "-0.03em", fontWeight: 600, color: "#fff" }}>
                {s.v}
                <span style={{ fontSize: "0.35em", color: "var(--blue-400)", marginLeft: 8, fontWeight: 600, letterSpacing: 0 }}>{s.unit}</span>
              </div>
              <div style={{ marginTop: 16, color: "rgba(255,255,255,.7)", fontSize: 14, lineHeight: 1.5, maxWidth: "26ch" }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Row: illustration + list */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, marginTop: 96, alignItems: "center" }}>
          {/* Illustration */}
          <div
            style={{
              position: "relative",
              aspectRatio: "4/3",
              borderRadius: "var(--r-lg)",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,.12)",
              background: "linear-gradient(135deg,#0E55BC 0%,#062D6B 100%)",
            }}
          >
            <svg viewBox="0 0 600 450" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="floorg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#0E55BC" stopOpacity=".3" />
                  <stop offset="1" stopColor="#062D6B" stopOpacity=".05" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="600" height="450" fill="url(#floorg)" />
              <rect x="40" y="280" width="520" height="36" rx="6" fill="#0E55BC" opacity=".5" />
              <g opacity=".6">
                {[60, 100, 140, 180].map(x => (
                  <rect key={x} x={x} y="288" width="20" height="20" fill="#fff" opacity=".15" />
                ))}
              </g>
              <g transform="translate(220 130)">
                <ellipse cx="80" cy="155" rx="68" ry="8" fill="#000" opacity=".3" />
                <path d="M10 30 Q80 10 150 30 L145 150 Q80 165 15 150 Z" fill="#2F7BFF" stroke="#fff" strokeWidth="1.5" />
                <ellipse cx="80" cy="28" rx="68" ry="8" fill="#6BA1FF" />
                <circle cx="80" cy="22" r="18" fill="#062D6B" />
                <path d="M30 50 Q80 35 130 50" stroke="rgba(255,255,255,.4)" strokeWidth="1.2" fill="none" />
                <path d="M32 90 Q80 75 128 90" stroke="rgba(255,255,255,.4)" strokeWidth="1.2" fill="none" />
                <path d="M34 130 Q80 115 126 130" stroke="rgba(255,255,255,.4)" strokeWidth="1.2" fill="none" />
              </g>
              <g transform="translate(80 60)">
                <rect x="0" y="0" width="20" height="240" fill="#fff" opacity=".7" />
                <rect x="-10" y="0" width="40" height="14" fill="#fff" opacity=".9" />
                <rect x="20" y="220" width="120" height="14" fill="#fff" opacity=".7" />
                <circle cx="140" cy="227" r="14" fill="#FFB020" />
              </g>
              <g opacity=".15" stroke="#fff" strokeWidth="1">
                <line x1="0" y1="100" x2="600" y2="100" />
                <line x1="0" y1="200" x2="600" y2="200" />
                <line x1="150" y1="0" x2="150" y2="450" />
                <line x1="450" y1="0" x2="450" y2="450" />
              </g>
            </svg>
            <div style={{ position: "absolute", left: 24, bottom: 24, right: 24, display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,.7)" }}>
              <span>● Line 14 · Pune Plant</span>
              <span>1000L Triple Layer · Batch #28419</span>
            </div>
          </div>

          {/* Process list */}
          <div>
            <h3 style={{ color: "#fff", fontSize: 32, letterSpacing: "-0.02em", marginBottom: 24 }}>
              From raw resin to dispatch — eight steps under one roof.
            </h3>
            <div style={{ borderTop: "1px solid rgba(255,255,255,.12)" }}>
              {steps.map((s, i) => (
                <div
                  key={s.n}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "40px 1fr auto",
                    gap: 24,
                    alignItems: "center",
                    padding: "22px 0",
                    borderBottom: i < steps.length - 1 ? "1px solid rgba(255,255,255,.12)" : "none",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-display)", color: "var(--blue-400)", fontWeight: 600, fontSize: 14 }}>{s.n}</span>
                  <div>
                    <b style={{ display: "block", fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 600, color: "#fff" }}>{s.title}</b>
                    <span style={{ color: "rgba(255,255,255,.6)", fontSize: 14 }}>{s.sub}</span>
                  </div>
                  <span style={{ color: "rgba(255,255,255,.4)", fontSize: 13, whiteSpace: "nowrap" }}>{s.meta}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
