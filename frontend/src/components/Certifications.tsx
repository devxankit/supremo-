const certs = [
  { src: "/images/cert-1.svg", name: "IS 12701" },
  { src: "/images/cert-2.svg", name: "IS 4985" },
  { src: "/images/cert-3.svg", name: "9001:2015" },
  { src: "/images/cert-4.svg", name: "IS 10146" },
  { src: "/images/cert-5.svg", name: "Export Grade" },
  { src: "/images/cert-6.svg", name: "MSME" },
];

export function Certifications() {
  return (
    <div
      style={{
        background: "var(--paper)",
        padding: "32px 0",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div
        className="container cert-row"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 56,
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--muted)",
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          Certifications &amp; Standards
        </span>
        <div className="marquee-container" style={{ flex: 1 }}>
          <div className="marquee-track">
            {/* First copy for infinite scroll */}
            {certs.map((c, i) => (
              <img
                key={`cert-1-${i}`}
                src={c.src}
                alt={c.name}
                style={{
                  width: 180,
                  height: 48,
                  flexShrink: 0,
                  objectFit: "contain",
                }}
              />
            ))}
            {/* Second copy for infinite scroll */}
            {certs.map((c, i) => (
              <img
                key={`cert-2-${i}`}
                src={c.src}
                alt={c.name}
                style={{
                  width: 180,
                  height: 48,
                  flexShrink: 0,
                  objectFit: "contain",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
