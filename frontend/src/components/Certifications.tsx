const certs = [
  { seal: "ISI", name: "IS 12701", sub: "Triple Layer Tanks" },
  { seal: "ISI", name: "IS 4985", sub: "UPVC Pipes" },
  { seal: "ISO", name: "9001:2015", sub: "Quality Management" },
  { seal: "FDA", name: "IS 10146", sub: "Food-grade plastic" },
  { seal: "CE", name: "Export Grade", sub: "EU compliance" },
  { seal: "★", name: "MSME", sub: "Govt. India" },
];

export function Certifications() {
  return (
    <div
      style={{
        background: "var(--paper)",
        padding: "36px 0",
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
        <span style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 600 }}>
          Certifications &amp; Standards
        </span>
        <div className="cert-items" style={{ display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
          {certs.map((c) => (
            <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--slate)" }}>
              <span
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  border: "1.5px solid var(--blue-700)",
                  display: "grid",
                  placeItems: "center",
                  color: "var(--blue-700)",
                  fontSize: 10,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {c.seal}
              </span>
              <div>
                <b style={{ fontSize: 15, letterSpacing: "-0.01em", display: "block" }}>{c.name}</b>
                <span style={{ display: "block", fontSize: 11, color: "var(--muted)", fontWeight: 500, letterSpacing: "0.06em" }}>{c.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
