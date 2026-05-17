import Link from "next/link";

const regions = [
  { zone: "North", states: "Punjab · Haryana · UP · Rajasthan · Delhi", dealers: 280 },
  { zone: "West", states: "Maharashtra · Gujarat · Goa · MP", dealers: 390 },
  { zone: "South", states: "Karnataka · Telangana · AP · Tamil Nadu · Kerala", dealers: 340 },
  { zone: "East", states: "West Bengal · Odisha · Bihar · Jharkhand", dealers: 190 },
];

const stats = [
  { v: "1,200+", l: "Active dealers" },
  { v: "22", l: "States covered" },
  { v: "9", l: "Regional warehouses" },
  { v: "48 hrs", l: "Dispatch SLA" },
];

export function DealerNetwork() {
  return (
    <section style={{ background: "var(--ink)", position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 15% 20%,rgba(20,102,230,.28),transparent 55%)",
        }}
      />
      <div className="container" style={{ position: "relative" }}>
        <div
          className="mob-1col mob-gap-lg"
          style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 64, alignItems: "center" }}
        >
          {/* Left — copy + stats */}
          <div>
            <span className="eyebrow eyebrow-light">Dealer Network</span>
            <h2 style={{ color: "#fff", fontSize: "clamp(30px,4vw,52px)", lineHeight: 1.12, marginTop: 18, marginBottom: 20 }}>
              A pan-India network, <span style={{ color: "var(--blue-400)" }}>built dealer by dealer.</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,.66)", fontSize: 17, lineHeight: 1.75, marginBottom: 36, maxWidth: "46ch" }}>
              From Tier-1 metro distributors to Tier-3 hardware stores, Supremo reaches
              every corner of India through 1,200+ exclusive-territory dealers — backed
              by nine regional warehouses and a 48-hour dispatch guarantee.
            </p>
            <div
              className="mob-gap-sm"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 36 }}
            >
              {stats.map((s) => (
                <div key={s.l} style={{ borderLeft: "2px solid var(--blue-600)", paddingLeft: 16 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 700, color: "#fff", lineHeight: 1 }}>
                    {s.v}
                  </div>
                  <div style={{ color: "rgba(255,255,255,.5)", fontSize: 13.5, marginTop: 6 }}>{s.l}</div>
                </div>
              ))}
            </div>
            <Link href="/dealership" className="btn">
              Become a Dealer
              <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </Link>
          </div>

          {/* Right — region cards */}
          <div
            className="mob-gap-sm"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            {regions.map((r) => (
              <div
                key={r.zone}
                style={{
                  background: "rgba(255,255,255,.05)",
                  border: "1px solid rgba(255,255,255,.12)",
                  borderRadius: "var(--r-md)",
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "#fff" }}>
                    {r.zone} India
                  </span>
                  <span
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "var(--blue-600)",
                      display: "grid",
                      placeItems: "center",
                      color: "#fff",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                </div>
                <p style={{ color: "rgba(255,255,255,.55)", fontSize: 13, lineHeight: 1.6 }}>{r.states}</p>
                <div style={{ marginTop: "auto", paddingTop: 12, borderTop: "1px solid rgba(255,255,255,.1)" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "var(--blue-400)" }}>
                    {r.dealers}
                  </span>
                  <span style={{ color: "rgba(255,255,255,.5)", fontSize: 13, marginLeft: 6 }}>dealers</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
