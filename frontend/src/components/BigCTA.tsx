const stats = [
  { v: "200", u: "+", l: "New dealerships opening this fiscal" },
  { v: "24", u: "hrs", l: "Callback time from our regional head" },
  { v: "28", u: "%", l: "Top-slab margin on Triple Layer tanks" },
];

export function BigCTA() {
  return (
    <section style={{ padding: "clamp(72px,9vw,128px) 0" }}>
      <div
        style={{
          position: "relative",
          margin: "0 var(--gutter)",
          padding: "clamp(60px,8vw,100px) clamp(40px,6vw,80px)",
          borderRadius: 28,
          overflow: "hidden",
          background:
            "radial-gradient(ellipse 60% 80% at 100% 0%,rgba(47,123,255,.5),transparent 60%),linear-gradient(135deg,#062D6B 0%,#0A3F8F 100%)",
          color: "#fff",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 56,
          alignItems: "center",
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
            WebkitMaskImage: "radial-gradient(ellipse 70% 80% at 80% 50%,#000 0%,transparent 70%)",
            maskImage: "radial-gradient(ellipse 70% 80% at 80% 50%,#000 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Left */}
        <div style={{ position: "relative" }}>
          <span className="eyebrow" style={{ color: "var(--blue-200)" }}>Become a Partner</span>
          <h2
            style={{
              color: "#fff",
              fontSize: "clamp(40px,5vw,64px)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              marginTop: 20,
            }}
          >
            Apply for a Supremo dealership in your{" "}
            <em style={{ fontStyle: "italic", fontWeight: 500, color: "var(--blue-400)" }}>district today.</em>
          </h2>
          <p style={{ color: "rgba(255,255,255,.78)", fontSize: 17, marginTop: 20, maxWidth: "50ch" }}>
            We&apos;re shortlisting 200+ new dealers this fiscal. Apply in 2 minutes — the regional head will call you back within 24 hours.
          </p>
          <div style={{ marginTop: 36, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#dealer" className="btn btn--white">Start application →</a>
            <a href="tel:+919567812345" className="btn btn--ghost">Call +91 95 678 12 345</a>
          </div>
        </div>

        {/* Right: stats */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 16 }}>
          {stats.map((s) => (
            <div
              key={s.v}
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.14)",
                borderRadius: "var(--r-md)",
                padding: "22px 24px",
                backdropFilter: "blur(6px)",
              }}
            >
              <div style={{ fontFamily: "var(--font-display)", fontSize: 40, lineHeight: 1, letterSpacing: "-0.025em", fontWeight: 600 }}>
                {s.v}
                <span style={{ fontSize: "0.45em", color: "var(--blue-400)", marginLeft: 6 }}>{s.u}</span>
              </div>
              <div style={{ color: "rgba(255,255,255,.75)", fontSize: 14, marginTop: 8 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
