import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Manufacturing — Supremo India",
  description:
    "Four ISO-certified plants, 22 production lines, 68,000 L/day capacity. Rotomoulding, blow moulding, extrusion and injection moulding — every batch 100% QC tested.",
};

const technologies = [
  {
    title: "Rotomoulding",
    range: "200 L – 25,000 L tanks",
    desc: "Controlled bi-axial rotation at 280–320°C ensures uniform wall thickness in large-format tanks. Each 45-minute cycle is monitored for temperature deviation under ±5°C.",
    steps: ["Resin loading into steel mould", "Oven rotation at 280–320°C", "Cooling with forced air", "Demoulding & inspection"],
    tag: "Large Tanks",
  },
  {
    title: "Blow Moulding",
    range: "Containers up to 60 L",
    desc: "High-speed extrusion blow moulding for utility products — ghamelas, milk cans, cooler bodies. Cycle times as low as 18 seconds ensure high throughput.",
    steps: ["HDPE/PP resin extrusion", "Parison formation", "Mould clamping & air blow", "Trimming & QC"],
    tag: "Utility Products",
  },
  {
    title: "Extrusion",
    range: "Pipes 15 mm – 315 mm dia",
    desc: "Twin-screw extruders produce PVC, CPVC and HDPE pipes on dedicated lines. Inline diameter and wall-thickness sensors ensure every metre meets ISI tolerances.",
    steps: ["Resin compounding & mixing", "Twin-screw extrusion", "Sizing & vacuum calibration", "Coiling / cutting & marking"],
    tag: "Pipes & Fittings",
  },
  {
    title: "Injection Moulding",
    range: "Fittings, caps, connectors",
    desc: "High-tonnage injection presses produce pipe fittings, tank caps and accessory components with dimensional accuracy of ±0.1 mm.",
    steps: ["Resin drying & feeding", "Injection at 180–240°C", "Cooling & ejection", "Flash trimming & packing"],
    tag: "Fittings & Parts",
  },
];

const processSteps = [
  { n: "01", title: "Resin Intake & Testing", sub: "Every batch of LLDPE/PVC resin is tested for MFI, density and heavy-metal content before it enters the production floor.", meta: "BIS / FDA" },
  { n: "02", title: "Moulding", sub: "Rotomoulding, blow moulding or extrusion — selected based on product spec. All moulds are CNC-machined for dimensional accuracy.", meta: "±0.2 mm" },
  { n: "03", title: "Controlled Cooling", sub: "Forced-air cooling reduces residual internal stress. Products are not demoulded until internal temp drops below 60°C.", meta: "45 min avg." },
  { n: "04", title: "100% QC Testing", sub: "Drop test from 1.5 m, hydraulic pressure test at 1.5x rated pressure, and UV-chamber ageing for 500 hours — on every batch.", meta: "100% tested" },
  { n: "05", title: "Branding & Dispatch", sub: "ISI seal, batch number and manufacturing date are printed before packing. Direct dispatch to dealer godown within 48 hours.", meta: "48-hr SLA" },
];

const qcTests = [
  {
    title: "Drop Test",
    standard: "IS 12701 / IS 4985",
    desc: "Full tanks are dropped from 1.5 m height at 0°C ambient. Zero leaks or structural cracks permitted for pass.",
    freq: "Every batch",
  },
  {
    title: "Pressure Test",
    standard: "Hydrostatic 1.5× rating",
    desc: "Tanks and pipes are pressurised to 1.5× their rated working pressure for 60 minutes. No deformation or seepage permitted.",
    freq: "Every batch",
  },
  {
    title: "UV Stability Test",
    standard: "IS 4892 / ASTM G154",
    desc: "UV chamber at 60°C for 500 hours. Post-test samples are checked for colour change, surface crazing and tensile strength retention ≥ 85%.",
    freq: "Per resin lot",
  },
];

const plants = [
  {
    city: "Indore, MP",
    label: "HQ & Primary Plant",
    desc: "Registered head office and largest plant. Rotomoulding (tanks 100 L–25,000 L) + blow moulding (utility products). 10 production lines.",
    address: "Supremo Tank Factory, near Shreenathji Tol Kanta, Badia Keema, MP 452016",
    primary: true,
  },
  {
    city: "Pune, MH",
    label: "West India Plant",
    desc: "Extrusion lines for PVC/CPVC pipes and injection moulding for fittings. 5 lines serving Maharashtra, Goa and Gujarat.",
    address: "MIDC Industrial Area, Pune, Maharashtra",
    primary: false,
  },
  {
    city: "Surat, GJ",
    label: "Gujarat Plant",
    desc: "Blow moulding and rotomoulding for Gujarat and Rajasthan markets. 4 lines with dedicated cold-storage for CPVC resin.",
    address: "Sachin GIDC, Surat, Gujarat",
    primary: false,
  },
  {
    city: "Hyderabad, TS",
    label: "South India Plant",
    desc: "Full-range rotomoulding + extrusion plant serving Telangana, Andhra Pradesh, Karnataka and Tamil Nadu. 3 lines.",
    address: "IDA Uppal, Hyderabad, Telangana",
    primary: false,
  },
];

const certs = [
  { seal: "ISI", name: "IS 12701", sub: "Triple Layer Tanks" },
  { seal: "ISI", name: "IS 4985", sub: "UPVC Pipes" },
  { seal: "ISO", name: "9001:2015", sub: "Quality Management" },
  { seal: "FDA", name: "IS 10146", sub: "Food-grade plastic" },
];

export default function ManufacturingPage() {
  return (
    <main>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          background: "linear-gradient(135deg, var(--ink) 0%, var(--blue-900) 60%, var(--blue-800) 100%)",
          minHeight: 400,
          display: "flex",
          alignItems: "center",
          paddingTop: 62,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
            WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%,#000 40%,transparent 80%)",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%,#000 40%,transparent 80%)",
          }}
        />
        <div
          className="container"
          style={{
            position: "relative",
            paddingTop: "clamp(48px,6vw,80px)",
            paddingBottom: "clamp(48px,6vw,80px)",
          }}
        >
          <span className="eyebrow eyebrow-light">Manufacturing</span>
          <h1
            style={{
              color: "#fff",
              fontSize: "clamp(36px,5.5vw,68px)",
              lineHeight: 1.1,
              marginTop: 16,
              maxWidth: "20ch",
            }}
          >
            Four Plants.{" "}
            <span style={{ color: "var(--blue-400)" }}>One Quality System.</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,.7)", fontSize: 18, marginTop: 20, maxWidth: "52ch" }}>
            From raw LLDPE resin to dispatch-ready tanks and pipes — Supremo runs a fully integrated manufacturing chain across four ISO-certified plants with one unified quality protocol.
          </p>
        </div>
      </section>

      {/* Facility Stats */}
      <div style={{ background: "var(--blue-700)", padding: "32px 0" }}>
        <div
          className="container mfg-stats"
          style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}
        >
          {[
            { v: "4", u: "Plants", l: "Indore · Pune · Surat · Hyderabad" },
            { v: "22", u: "Lines", l: "Roto, extrusion, injection & blow" },
            { v: "68,000", u: "L/day", l: "Combined rotomoulding capacity" },
            { v: "100%", u: "QC", l: "Every batch drop, pressure & UV tested" },
          ].map((s, i) => (
            <div
              key={s.u}
              style={{
                paddingTop: 20,
                paddingBottom: 20,
                paddingRight: i < 3 ? 24 : 0,
                borderRight: i < 3 ? "1px solid rgba(255,255,255,.2)" : "none",
                textAlign: "center",
              }}
            >
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, color: "#fff", lineHeight: 1 }}>
                {s.v}
                <span style={{ fontSize: "0.35em", color: "var(--blue-400)", marginLeft: 6 }}>{s.u}</span>
              </div>
              <div style={{ color: "rgba(255,255,255,.6)", fontSize: 13, marginTop: 8 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Grid */}
      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          <span className="eyebrow">Technologies</span>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", marginTop: 16, marginBottom: 12 }}>
            Four manufacturing technologies. One facility standard.
          </h2>
          <p style={{ color: "var(--slate)", fontSize: 17, maxWidth: "60ch", marginBottom: 56 }}>
            Each technology is optimised for its product category, operated by certified technicians and subject to the same QC checklist.
          </p>
          <div
            className="mob-1col mob-gap-md"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
          >
            {technologies.map((tech) => (
              <div
                key={tech.title}
                style={{
                  background: "var(--paper-2)",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r-md)",
                  padding: 32,
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 16 }}>
                  <h3 style={{ fontSize: 24 }}>{tech.title}</h3>
                  <span style={{ padding: "4px 12px", background: "var(--blue-100)", color: "var(--blue-800)", borderRadius: 999, fontSize: 11, fontWeight: 600, fontFamily: "var(--font-display)", whiteSpace: "nowrap" }}>
                    {tech.tag}
                  </span>
                </div>
                <p style={{ color: "var(--muted)", fontSize: 13, fontWeight: 500, marginBottom: 16 }}>{tech.range}</p>
                <p style={{ color: "var(--slate)", fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>{tech.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {tech.steps.map((step, i) => (
                    <span
                      key={step}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "5px 12px",
                        background: "#fff",
                        border: "1px solid var(--line)",
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 500,
                        color: "var(--slate)",
                      }}
                    >
                      <span style={{ color: "var(--blue-600)", fontWeight: 700, fontSize: 11 }}>{i + 1}</span>
                      {step}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Process */}
      <section
        style={{
          background: "var(--ink)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at 80% 20%,rgba(20,102,230,.3),transparent 50%)",
          }}
        />
        <div className="container" style={{ position: "relative" }}>
          <span className="eyebrow eyebrow-light">Process</span>
          <h2 style={{ color: "#fff", fontSize: "clamp(28px,3.5vw,44px)", marginTop: 16, marginBottom: 56 }}>
            From raw resin to dispatch — five steps.
          </h2>
          <div style={{ borderTop: "1px solid rgba(255,255,255,.12)" }}>
            {processSteps.map((s, i) => (
              <div
                key={s.n}
                className="mfg-step"
                style={{
                  display: "grid",
                  gridTemplateColumns: "40px 1fr auto",
                  gap: 24,
                  alignItems: "center",
                  padding: "28px 0",
                  borderBottom: i < processSteps.length - 1 ? "1px solid rgba(255,255,255,.12)" : "none",
                }}
              >
                <span style={{ fontFamily: "var(--font-display)", color: "var(--blue-400)", fontWeight: 600, fontSize: 14 }}>{s.n}</span>
                <div>
                  <b style={{ display: "block", fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, color: "#fff" }}>{s.title}</b>
                  <span style={{ color: "rgba(255,255,255,.6)", fontSize: 14.5, lineHeight: 1.6 }}>{s.sub}</span>
                </div>
                <span className="mob-hide" style={{ color: "rgba(255,255,255,.4)", fontSize: 13, whiteSpace: "nowrap", textAlign: "right" }}>{s.meta}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Control */}
      <section style={{ background: "var(--paper-2)" }}>
        <div className="container">
          <span className="eyebrow">Quality</span>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", marginTop: 16, marginBottom: 12 }}>
            Not samples — every single batch.
          </h2>
          <p style={{ color: "var(--slate)", fontSize: 17, maxWidth: "58ch", marginBottom: 56 }}>
            Our quality control lab runs three standardised tests on 100% of production — not statistical samples. A tank that doesn&apos;t pass doesn&apos;t ship.
          </p>
          <div
            className="mob-1col mob-gap-md"
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}
          >
            {qcTests.map((q) => (
              <div
                key={q.title}
                style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r-md)",
                  padding: 32,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "var(--blue-600)",
                    display: "grid",
                    placeItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 style={{ fontSize: 22, marginBottom: 8 }}>{q.title}</h3>
                <p style={{ fontSize: 12, color: "var(--blue-700)", fontWeight: 600, letterSpacing: "0.06em", marginBottom: 14 }}>{q.standard}</p>
                <p style={{ color: "var(--slate)", fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>{q.desc}</p>
                <span style={{ padding: "4px 12px", background: "var(--blue-50)", color: "var(--blue-800)", borderRadius: 999, fontSize: 12, fontWeight: 600 }}>
                  Frequency: {q.freq}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plant Locations */}
      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          <span className="eyebrow">Locations</span>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", marginTop: 16, marginBottom: 48 }}>
            Four plants. Pan-India reach.
          </h2>
          <div
            className="mob-1col mob-gap-md"
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}
          >
            {plants.map((plant) => (
              <div
                key={plant.city}
                style={{
                  background: plant.primary ? "linear-gradient(135deg,var(--blue-700),var(--blue-900))" : "var(--paper-2)",
                  border: plant.primary ? "none" : "1px solid var(--line)",
                  borderRadius: "var(--r-md)",
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {plant.primary && (
                  <span style={{ padding: "3px 10px", background: "rgba(255,255,255,.15)", color: "#fff", borderRadius: 999, fontSize: 11, fontWeight: 600, alignSelf: "flex-start" }}>
                    HQ
                  </span>
                )}
                <h3 style={{ fontSize: 22, color: plant.primary ? "#fff" : "var(--ink)" }}>{plant.city}</h3>
                <p style={{ fontSize: 13, fontWeight: 600, color: plant.primary ? "var(--blue-400)" : "var(--blue-700)" }}>{plant.label}</p>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: plant.primary ? "rgba(255,255,255,.7)" : "var(--slate)" }}>{plant.desc}</p>
                <p style={{ fontSize: 12, color: plant.primary ? "rgba(255,255,255,.45)" : "var(--muted)", marginTop: 4 }}>{plant.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warehousing & Logistics */}
      <section style={{ background: "var(--paper-2)" }}>
        <div
          className="container mob-1col mob-gap-lg"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}
        >
          <div>
            <span className="eyebrow">Logistics</span>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", marginTop: 20, marginBottom: 24 }}>
              Warehousing & last-mile delivery
            </h2>
            <p style={{ color: "var(--slate)", fontSize: 17, lineHeight: 1.8, marginBottom: 24 }}>
              Supremo operates 9 regional warehouses to ensure that dealer orders are fulfilled within 48 hours of placement. Our dedicated logistics fleet handles direct delivery to dealer godowns — no freight charges to the dealer.
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                "9 regional warehouses across India",
                "Dedicated fleet for FOR delivery",
                "48-hour replenishment SLA",
                "600+ tanks dispatched per day",
                "FIFO inventory management",
                "Real-time tracking via dealer portal",
              ].map((f) => (
                <li key={f} style={{ display: "flex", gap: 10, color: "var(--slate)", fontSize: 15.5 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 2 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            {[
              { v: "9", l: "Warehouses", sub: "Pan-India network" },
              { v: "48 hrs", l: "Replenishment", sub: "SLA guarantee" },
              { v: "600+", l: "Tanks/day", sub: "Dispatch volume" },
              { v: "FOR", l: "Delivery", sub: "No freight charges" },
            ].map((s) => (
              <div
                key={s.l}
                style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r-md)",
                  padding: 24,
                  textAlign: "center",
                }}
              >
                <div style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700, color: "var(--blue-700)", lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontWeight: 600, fontSize: 15, marginTop: 8, color: "var(--ink)" }}>{s.l}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <div
        style={{
          background: "var(--paper)",
          padding: "56px 0",
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
            Quality Certifications
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

      {/* CTA */}
      <section style={{ background: "var(--blue-900)", padding: "clamp(48px,6vw,80px) 0" }}>
        <div
          className="container mob-col mob-gap-md"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32 }}
        >
          <div>
            <h2 style={{ color: "#fff", fontSize: "clamp(24px,3vw,40px)", margin: 0 }}>Need bulk or B2B orders?</h2>
            <p style={{ color: "rgba(255,255,255,.65)", marginTop: 12, fontSize: 16, maxWidth: "44ch" }}>
              Our commercial sales team handles project billing, custom SKUs and priority dispatch for contractors, builders and institutional buyers.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexShrink: 0, flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn--white">Contact Sales</Link>
            <Link href="/dealership" className="btn btn--ghost">Become a Dealer</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
