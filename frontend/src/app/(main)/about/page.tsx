import type { Metadata } from "next";
import Link from "next/link";
import { Timeline } from "@/components/Timeline";
import { PHONE_DISPLAY } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Supremo India — 27 Years of Manufacturing Excellence",
  description:
    "Founded in 1999 in Indore, Madhya Pradesh, Supremo India Pvt Ltd is a leading manufacturer of water tanks, pipes, planters and utility products with a widespread dealer network across India.",
};

const mfgTypes = [
  {
    title: "Blow Moulding",
    desc: "Used for containers, ghamelas, milk cans, air cooler bodies. High-speed production with uniform wall thickness.",
    icon: "💨",
  },
  {
    title: "Roto Moulding",
    desc: "Ideal for large tanks (200 L – 25,000 L). Controlled 280–320°C heating ensures even tri-layer construction.",
    icon: "🔄",
  },
  {
    title: "Extrusion",
    desc: "For PVC, CPVC and HDPE pipes. Continuous process with inline diameter and wall-thickness QC.",
    icon: "📏",
  },
];

const values = [
  {
    title: "Quality First",
    desc: "Every batch is drop-tested, pressure-tested and UV-tested before it leaves the plant. 100% inspection — no sample-based shortcuts.",
  },
  {
    title: "Innovation",
    desc: '"Innovation is the Key" — our brand motto drives continuous R&D in material science, mould design and production efficiency.',
  },
  {
    title: "Dealer Partnership",
    desc: "Dealers are our primary growth engine. Exclusive territories, co-op marketing, credit terms and training support keep our partners profitable.",
  },
  {
    title: "Nationwide Reach",
    desc: "From Tier-1 metro distributors to Tier-3 hardware stores — a widespread network of active dealers across 22 states bring Supremo to every corner of India.",
  },
];

const certs = [
  { seal: "ISI", name: "IS 12701", sub: "Triple Layer Tanks" },
  { seal: "ISI", name: "IS 4985", sub: "UPVC Pipes" },
  { seal: "ISO", name: "9001:2015", sub: "Quality Management" },
  { seal: "FDA", name: "IS 10146", sub: "Food-grade plastic" },
  { seal: "CE", name: "Export Grade", sub: "EU compliance" },
  { seal: "★", name: "MSME", sub: "Govt. India" },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          background: "linear-gradient(135deg, var(--blue-900) 0%, var(--blue-800) 40%, var(--ink) 100%)",
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
          <span className="eyebrow eyebrow-light">About Supremo</span>
          <h1
            style={{
              color: "#fff",
              fontSize: "clamp(34px,5vw,64px)",
              lineHeight: 1.1,
              marginTop: 16,
              maxWidth: "22ch",
            }}
          >
            27 Years of Building{" "}
            <span style={{ color: "var(--blue-400)" }}>India&apos;s Infrastructure</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,.7)", fontSize: 18, marginTop: 20, maxWidth: "56ch" }}>
            Headquartered in Indore, Madhya Pradesh, Supremo India Pvt Ltd has been manufacturing world-class water storage and piping solutions since 1999 — growing from a single blow-moulding unit to four plants, 22 production lines and a pan-India dealer network.
          </p>
        </div>
      </section>

      {/* Stats Strip */}
      <div style={{ background: "var(--blue-700)", padding: "32px 0" }}>
        <div
          className="container mob-1col mob-gap-sm"
          style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}
        >
          {[
            { v: "27", u: "Years", l: "of legacy since 1999" },
            { v: "22+", u: "States", l: "covered nationwide" },
            { v: "4", u: "Plants", l: "across India" },
            { v: "22", u: "Lines", l: "production capacity" },
          ].map((s, i) => (
            <div
              key={s.u}
              style={{
                textAlign: "center",
                padding: "16px 24px",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,.2)" : "none",
              }}
            >
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, color: "#fff", lineHeight: 1 }}>
                {s.v}
                <span style={{ fontSize: "0.4em", color: "var(--blue-400)", marginLeft: 6 }}>{s.u}</span>
              </div>
              <div style={{ color: "rgba(255,255,255,.6)", fontSize: 13, marginTop: 6 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Company Story */}
      <section style={{ background: "var(--paper)" }}>
        <div
          className="container mob-1col mob-gap-lg"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}
        >
          <div>
            <span className="eyebrow">Our Story</span>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", marginTop: 20, marginBottom: 24 }}>
              From a single unit in Indore to India&apos;s trusted polymer brand
            </h2>
            <p style={{ color: "var(--slate)", fontSize: 17, lineHeight: 1.8, marginBottom: 20 }}>
              Supremo India Pvt Ltd was founded in 1999 by a team of polymer engineers and business professionals in Indore, Madhya Pradesh — a city that has historically been a hub for manufacturing and trade in central India. Starting with a single blow-moulding machine, the company quickly gained a reputation for producing consistent, high-quality water storage containers.
            </p>
            <p style={{ color: "var(--slate)", fontSize: 17, lineHeight: 1.8, marginBottom: 20 }}>
              By 2003, demand for larger water tanks led Supremo to invest in rotomoulding technology, enabling production of tanks up to 25,000 litres. This was followed by ISI certification in 2008, ISO 9001:2015 in 2018, and a continued expansion into PVC pipe extrusion and injection-moulded fittings.
            </p>
            <p style={{ color: "var(--slate)", fontSize: 17, lineHeight: 1.8 }}>
              Today, operating from our registered address at{" "}
              <strong>Supremo Tank Factory, near Shreenathji Tol Kanta, Badia Keema, Madhya Pradesh 452016</strong>,
              we serve over 1,200 active dealers across 22 states — with four plants running 22 production lines at a combined capacity of 68,000 litres per day.
            </p>
          </div>

          {/* Visual */}
          <div
            style={{
              background: "linear-gradient(135deg,var(--blue-50) 0%,var(--blue-100) 100%)",
              borderRadius: "var(--r-lg)",
              border: "1px solid var(--line)",
              padding: "40px 36px",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            <div style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: "var(--blue-700)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
              Company at a glance
            </div>
            {[
              { label: "Founded", value: "1999, Indore, MP" },
              { label: "Registered", value: "Supremo India Pvt Ltd" },
              { label: "GST", value: "23AAFCS9822C1ZJ" },
              { label: "Industry", value: "Polymer / Plastics Manufacturing" },
              { label: "Products", value: "Tanks, Pipes, Planters, Utility" },
              { label: "Technology", value: "Roto · Blow · Extrusion · Injection" },
              { label: "Certifications", value: "ISI, ISO 9001:2015, BIS, FDA" },
              { label: "Phone", value: PHONE_DISPLAY },
              { label: "Email", value: "supremoindore@gmail.com" },
            ].map((row) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 16,
                  paddingBottom: 16,
                  borderBottom: "1px solid var(--line)",
                  fontSize: 14,
                }}
              >
                <span style={{ color: "var(--muted)", fontWeight: 500 }}>{row.label}</span>
                <span style={{ color: "var(--ink)", fontWeight: 600, textAlign: "right" }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section style={{ background: "var(--paper-2)" }}>
        <div className="container">
          <div
            className="mob-1col mob-gap-md"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
          >
            {/* Vision */}
            <div
              style={{
                background: "linear-gradient(135deg,var(--blue-700) 0%,var(--blue-900) 100%)",
                borderRadius: "var(--r-lg)",
                padding: "48px 40px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--blue-400)", fontFamily: "var(--font-display)" }}>
                Our Vision
              </span>
              <h3 style={{ color: "#fff", fontSize: "clamp(24px,3vw,36px)", lineHeight: 1.25 }}>
                To be India&apos;s most trusted polymer solutions brand.
              </h3>
              <p style={{ color: "rgba(255,255,255,.7)", fontSize: 16, lineHeight: 1.7 }}>
                Building a future where every Indian home, farm and business has access to reliable, certified water storage and piping infrastructure — at a price that makes sense.
              </p>
            </div>

            {/* Mission */}
            <div
              style={{
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: "var(--r-lg)",
                padding: "48px 40px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--blue-600)", fontFamily: "var(--font-display)" }}>
                Our Mission
              </span>
              <h3 style={{ color: "var(--ink)", fontSize: "clamp(24px,3vw,36px)", lineHeight: 1.25 }}>
                Deliver world-class water solutions at affordable prices.
              </h3>
              <p style={{ color: "var(--slate)", fontSize: 16, lineHeight: 1.7 }}>
                Powered by the belief that &quot;Innovation is the Key&quot;, Supremo combines state-of-the-art manufacturing technology with a customer-first dealer network to deliver quality polymer products that last a generation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <Timeline />

      {/* Manufacturing at a Glance */}
      <section style={{ background: "var(--paper-2)" }}>
        <div className="container">
          <span className="eyebrow">How We Make It</span>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", marginTop: 16, marginBottom: 48 }}>
            Manufacturing at a glance
          </h2>
          <div
            className="mob-1col mob-gap-md"
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}
          >
            {mfgTypes.map((m) => (
              <div
                key={m.title}
                style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r-md)",
                  padding: 32,
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 16 }}>{m.icon}</div>
                <h3 style={{ fontSize: 22, marginBottom: 12 }}>{m.title}</h3>
                <p style={{ color: "var(--slate)", fontSize: 15, lineHeight: 1.7 }}>{m.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, textAlign: "center" }}>
            <Link href="/manufacturing" className="btn btn--outline">
              See Full Manufacturing Details →
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          <span className="eyebrow">What We Stand For</span>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", marginTop: 16, marginBottom: 48 }}>Our values</h2>
          <div
            className="mob-1col mob-gap-md"
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}
          >
            {values.map((v, i) => (
              <div
                key={v.title}
                style={{
                  padding: 28,
                  borderRadius: "var(--r-md)",
                  background: i % 2 === 0 ? "var(--blue-50)" : "var(--paper-2)",
                  border: "1px solid var(--line)",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "var(--blue-600)",
                    display: "grid",
                    placeItems: "center",
                    marginBottom: 20,
                    color: "#fff",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 20,
                  }}
                >
                  {i + 1}
                </div>
                <h3 style={{ fontSize: 20, marginBottom: 12 }}>{v.title}</h3>
                <p style={{ color: "var(--slate)", fontSize: 14.5, lineHeight: 1.7 }}>{v.desc}</p>
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

      {/* CTA */}
      <section style={{ background: "var(--blue-900)", padding: "clamp(56px,7vw,96px) 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="eyebrow eyebrow-light">Join Us</span>
          <h2 style={{ color: "#fff", fontSize: "clamp(28px,4vw,52px)", marginTop: 20, marginBottom: 20 }}>
            Partner with a manufacturer that delivers.
          </h2>
          <p style={{ color: "rgba(255,255,255,.65)", fontSize: 17, maxWidth: "50ch", margin: "0 auto 40px" }}>
            Become a Supremo dealer and join our growing network of successful partners across 22 states. Exclusive territory, co-op marketing and industry-best margins.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/dealership" className="btn btn--white">
              Partner with Us
              <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </Link>
            <Link href="/contact" className="btn btn--ghost">Get in Touch</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
