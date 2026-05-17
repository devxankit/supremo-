export function Intro() {
  return (
    <section style={{ background: "var(--paper)" }}>
      <div
        className="container mob-1col"
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "clamp(32px,6vw,100px)",
          alignItems: "center",
        }}
      >
        {/* Left: copy */}
        <div>
          <span className="eyebrow">About Supremo</span>
          <h2
            style={{
              fontSize: "clamp(34px,4vw,56px)",
              lineHeight: 1.15,
              marginTop: 22,
            }}
          >
            A manufacturer&apos;s discipline.
            <br />
            <span style={{ color: "var(--blue-700)" }}>
              A national footprint.
            </span>
          </h2>
          <p style={{ marginTop: 28, color: "var(--slate)", fontSize: 18, maxWidth: "52ch" }}>
            From a single 4,000 sq ft moulding unit in 1998 to four IS-certified
            plants today, Supremo manufactures water tanks, PVC pipes and utility
            products for India&apos;s homes, farms and infrastructure — sold through a
            dealer-first distribution model engineered for last-mile reach.
          </p>

          <dl
            className="intro-stats"
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
                <dd style={{ margin: "6px 0 0", fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: "var(--ink)" }}>{m.def}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: visual */}
        <div
          className="intro-visual"
          style={{
            position: "relative",
            borderRadius: "var(--r-lg)",
            overflow: "hidden",
            boxShadow: "var(--sh-md)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/images/image 1.png"
            alt="Supremo National Footprint"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>
      </div>
    </section>
  );
}
