export function Intro() {
  return (
    <section style={{ background: "var(--paper)" }}>
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "clamp(40px,6vw,100px)",
          alignItems: "center",
        }}
      >
        {/* Left: copy */}
        <div>
          <span className="eyebrow">About Supremo</span>
          <h2
            style={{
              fontSize: "clamp(34px,4vw,56px)",
              lineHeight: 1.05,
              marginTop: 22,
            }}
          >
            A manufacturer&apos;s discipline.
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 500, color: "var(--blue-700)" }}>
              A national footprint.
            </em>
          </h2>
          <p style={{ marginTop: 28, color: "var(--slate)", fontSize: 18, maxWidth: "52ch" }}>
            From a single 4,000 sq ft moulding unit in 1998 to four IS-certified
            plants today, Supremo manufactures water tanks, PVC pipes and utility
            products for India&apos;s homes, farms and infrastructure — sold through a
            dealer-first distribution model engineered for last-mile reach.
          </p>

          <dl
            style={{
              marginTop: 40,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px 40px",
              borderTop: "1px solid var(--line)",
              paddingTop: 32,
            }}
          >
            {[
              { term: "Founded", def: "Pune, 1998" },
              { term: "Manufacturing", def: "4 plants · 22 lines" },
              { term: "Quality system", def: "ISI · ISO 9001:2015" },
              { term: "Distribution", def: "1,200+ dealers · pan-India" },
            ].map((m) => (
              <div key={m.term}>
                <dt style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 600 }}>{m.term}</dt>
                <dd style={{ margin: "6px 0 0", fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "-0.01em", fontWeight: 600, color: "var(--ink)" }}>{m.def}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: visual */}
        <div
          style={{
            position: "relative",
            aspectRatio: "4/5",
            borderRadius: "var(--r-lg)",
            overflow: "hidden",
            background: "linear-gradient(135deg,var(--blue-50),var(--blue-100))",
            boxShadow: "var(--sh-lg)",
          }}
        >
          {/* ISI badge */}
          <div
            style={{
              position: "absolute",
              left: 24,
              top: 24,
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              background: "rgba(255,255,255,.85)",
              backdropFilter: "blur(10px)",
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 600,
              boxShadow: "var(--sh-sm)",
            }}
          >
            <span style={{ background: "var(--blue-700)", color: "#fff", padding: "2px 8px", borderRadius: 4, fontSize: 11 }}>ISI</span>
            IS 12701 — Triple Layer
          </div>

          {/* Tank illustration */}
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
            <svg viewBox="0 0 400 500" width="80%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="tankg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#0E55BC" />
                  <stop offset="1" stopColor="#062D6B" />
                </linearGradient>
                <linearGradient id="capg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#2F7BFF" />
                  <stop offset="1" stopColor="#0E55BC" />
                </linearGradient>
              </defs>
              <ellipse cx="200" cy="470" rx="150" ry="14" fill="#062D6B" opacity=".22" />
              <path d="M70 130 Q200 100 330 130 L325 430 Q200 460 75 430 Z" fill="url(#tankg)" />
              <path d="M72 200 Q200 170 328 200" stroke="rgba(255,255,255,.2)" strokeWidth="2" fill="none" />
              <path d="M73 270 Q200 240 327 270" stroke="rgba(255,255,255,.2)" strokeWidth="2" fill="none" />
              <path d="M74 340 Q200 310 326 340" stroke="rgba(255,255,255,.2)" strokeWidth="2" fill="none" />
              <ellipse cx="200" cy="120" rx="138" ry="22" fill="url(#capg)" />
              <circle cx="200" cy="110" r="42" fill="#062D6B" />
              <circle cx="200" cy="110" r="36" fill="#0A3F8F" />
              <circle cx="200" cy="110" r="28" fill="#0E55BC" />
              <path d="M100 160 Q90 280 130 410" stroke="rgba(255,255,255,.2)" strokeWidth="14" strokeLinecap="round" fill="none" />
              <g transform="translate(155 280)">
                <rect x="0" y="0" width="90" height="40" rx="6" fill="#fff" fillOpacity=".95" />
                <text x="45" y="18" textAnchor="middle" fontFamily="Space Grotesk" fontSize="12" fontWeight="700" fill="#062D6B">SUPREMO</text>
                <text x="45" y="32" textAnchor="middle" fontFamily="Space Grotesk" fontSize="9" fontWeight="600" fill="#0E55BC" letterSpacing="2">1000L</text>
              </g>
            </svg>
          </div>

          {/* Floating stat */}
          <div
            style={{
              position: "absolute",
              right: 24,
              bottom: 24,
              width: 200,
              padding: 18,
              background: "#fff",
              borderRadius: "var(--r-md)",
              boxShadow: "var(--sh-md)",
              fontSize: 13,
              color: "var(--slate)",
            }}
          >
            <b style={{ display: "block", color: "var(--ink)", fontFamily: "var(--font-display)", fontSize: 24, marginBottom: 4, letterSpacing: "-0.01em" }}>1000L</b>
            Triple layer, food-grade certified — black core, anti-algae.
          </div>
        </div>
      </div>
    </section>
  );
}
