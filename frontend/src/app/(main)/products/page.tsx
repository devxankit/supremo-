import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products — Supremo India",
  description:
    "Explore Supremo's full product catalogue: triple-layer water tanks, PVC/CPVC pipes, planters, wheel barrows and commercial plastic products.",
};

const categories = [
  { label: "Water Tanks", anchor: "tanks" },
  { label: "Pipes & Fittings", anchor: "pipes" },
  { label: "Accessories", anchor: "accessories" },
  { label: "Planters", anchor: "planters" },
  { label: "Commercial Plastic", anchor: "commercial" },
];

const tanks = [
  {
    name: "Triple Layer Overhead Tank",
    capacity: "200 L – 10,000 L",
    features: ["UV-stabilised outer layer", "Black middle barrier layer", "FDA food-grade inner layer", "ISI IS 12701 certified"],
    badges: ["ISI Marked", "Food-Grade", "UV Protected"],
  },
  {
    name: "Single Layer Overhead Tank",
    capacity: "100 L – 5,000 L",
    features: ["Uniform wall thickness", "Rust & corrosion proof", "Leak-proof lid with lock", "Ideal for budget builds"],
    badges: ["ISI Marked", "BIS Certified"],
  },
  {
    name: "Loft Tank",
    capacity: "100 L – 500 L",
    features: ["Compact low-profile design", "Easy to fit under loft ceiling", "Food-grade LLDPE material", "High-density wall construction"],
    badges: ["Food-Grade", "LLDPE"],
  },
  {
    name: "Underground Sump Tank",
    capacity: "500 L – 25,000 L",
    features: ["High-compression ribbed walls", "UV-resistant black shell", "Manhole access cover included", "Roto-moulded for strength"],
    badges: ["Heavy Duty", "Roto-Moulded"],
  },
];

const pipes = [
  {
    name: "PVC Pressure Pipes",
    capacity: "15 mm – 315 mm dia",
    features: ["IS 4985 certified", "Class 1/2/3/4/5 pressure ratings", "Smooth bore for high flow", "UV stabilised"],
    badges: ["ISI IS 4985", "BIS Certified"],
  },
  {
    name: "CPVC Hot & Cold Pipes",
    capacity: "15 mm – 100 mm dia",
    features: ["Withstands up to 93°C", "Chlorinated PVC formulation", "ASTM D2846 compliant", "For solar & hot water systems"],
    badges: ["CPVC", "Hot Water Safe"],
  },
  {
    name: "Agriculture HDPE Pipes",
    capacity: "16 mm – 110 mm dia",
    features: ["IS 4984 grade PE 80/100", "Flexible for drip irrigation", "Low pressure drop", "UV black stabilised"],
    badges: ["HDPE", "Agri Grade"],
  },
  {
    name: "SWR Plumbing Pipes",
    capacity: "75 mm – 160 mm dia",
    features: ["Soil, waste & rain water", "IS 13592 certified", "Ring-fit rubber seal joints", "High impact resistance"],
    badges: ["ISI IS 13592", "SWR"],
  },
];

const accessories = [
  { name: "Air Cooler Body", capacity: "20 L – 60 L", features: ["Blow-moulded ABS shell", "Rust-proof construction", "Compact design", "OEM / white-label available"], badges: ["Blow-Moulded"] },
  { name: "Ghamela (Tub)", capacity: "10 L – 40 L", features: ["Virgin HDPE material", "Flexible yet rigid", "Ergonomic grip rim", "High load capacity"], badges: ["Virgin HDPE"] },
  { name: "Milk Can", capacity: "5 L – 20 L", features: ["Food-safe HDPE", "Wide mouth for easy clean", "Secure screw cap", "BIS food-grade approved"], badges: ["Food-Grade"] },
  { name: "Wheel Barrow", capacity: "65 L tray", features: ["One-piece HDPE tray", "Heavy-duty steel frame", "Pneumatic tyre", "Load capacity 150 kg"], badges: ["Heavy Duty"] },
  { name: "Garbage / Dust Bin", capacity: "60 L – 240 L", features: ["Virgin HDPE construction", "Pedal or swing lid", "Stackable design", "Available in multiple colours"], badges: ["HDPE"] },
];

const planters = [
  { name: "Decorative Indoor Planter", capacity: "5 L – 30 L", features: ["UV-stabilised colour finish", "Drainage hole with plug", "Lightweight yet durable", "Available in 8 colours"], badges: ["UV Stable"] },
  { name: "Garden Floor Planter", capacity: "20 L – 100 L", features: ["Deep root-space design", "Weather-proof shell", "Textured terracotta look", "Suitable for outdoor use"], badges: ["Outdoor Safe"] },
  { name: "Commercial Planter (Large)", capacity: "100 L – 500 L", features: ["Roto-moulded for strength", "Ideal for malls & hotels", "Custom branding available", "High-gloss finish option"], badges: ["Roto-Moulded", "B2B"] },
];

function TankIcon() {
  return (
    <svg viewBox="0 0 120 100" width="80" height="66" fill="none">
      <ellipse cx="60" cy="18" rx="42" ry="8" fill="#C5DAFB" />
      <path d="M18 18 Q20 88 60 90 Q100 88 102 18" fill="#E6F0FF" stroke="#1466E6" strokeWidth="2" />
      <ellipse cx="60" cy="18" rx="42" ry="8" fill="#6BA1FF" opacity=".6" />
      <rect x="54" y="4" width="12" height="14" rx="3" fill="#0E55BC" />
    </svg>
  );
}

function PipeIcon() {
  return (
    <svg viewBox="0 0 120 80" width="80" height="54" fill="none">
      <rect x="10" y="30" width="100" height="20" rx="10" fill="#C5DAFB" stroke="#1466E6" strokeWidth="2" />
      <rect x="10" y="33" width="100" height="8" rx="4" fill="#6BA1FF" opacity=".5" />
      <rect x="8" y="26" width="16" height="28" rx="4" fill="#0E55BC" />
      <rect x="96" y="26" width="16" height="28" rx="4" fill="#0E55BC" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg viewBox="0 0 120 100" width="80" height="66" fill="none">
      <rect x="20" y="30" width="80" height="60" rx="8" fill="#E6F0FF" stroke="#1466E6" strokeWidth="2" />
      <path d="M20 45 L60 55 L100 45" stroke="#6BA1FF" strokeWidth="2" fill="none" />
      <rect x="48" y="30" width="24" height="16" rx="4" fill="#C5DAFB" />
    </svg>
  );
}

function PlantIcon() {
  return (
    <svg viewBox="0 0 120 100" width="80" height="66" fill="none">
      <path d="M30 85 Q40 55 60 40 Q80 55 90 85" fill="#E6F0FF" stroke="#1466E6" strokeWidth="2" />
      <line x1="60" y1="40" x2="60" y2="86" stroke="#6BA1FF" strokeWidth="2" />
      <ellipse cx="60" cy="88" rx="30" ry="6" fill="#C5DAFB" />
      <circle cx="60" cy="28" r="14" fill="#6BA1FF" opacity=".4" />
    </svg>
  );
}

interface ProductCard {
  name: string;
  capacity: string;
  features: string[];
  badges: string[];
}

function Card({ product, icon, className }: { product: ProductCard; icon: React.ReactNode; className?: string }) {
  return (
    <div
      className={`hover-lift-sm${className ? ` ${className}` : ""}`}
      style={{
        background: "#fff",
        border: "1px solid var(--line)",
        borderRadius: "var(--r-md)",
        padding: 28,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {/* Visual */}
      <div
        style={{
          background: "var(--paper-2)",
          borderRadius: "var(--r-md)",
          height: 160,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {product.badges.map((b) => (
            <span
              key={b}
              style={{
                display: "inline-block",
                padding: "2px 10px",
                background: "var(--blue-100)",
                color: "var(--blue-800)",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 600,
                fontFamily: "var(--font-display)",
                letterSpacing: "0.05em",
              }}
            >
              {b}
            </span>
          ))}
        </div>
        <h3 style={{ fontSize: 20, lineHeight: 1.3, margin: 0 }}>{product.name}</h3>
        <p style={{ fontSize: 13, color: "var(--muted)", margin: 0, fontWeight: 500 }}>{product.capacity}</p>
        <ul style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {product.features.map((f) => (
            <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13.5, color: "var(--slate)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--blue-600)", flexShrink: 0, marginTop: 6 }} />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <Link
        href="/contact"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          color: "var(--blue-600)",
          fontWeight: 600,
          fontSize: 14,
          fontFamily: "var(--font-display)",
          textDecoration: "none",
        }}
      >
        Enquire Now
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M7 17L17 7M9 7h8v8" />
        </svg>
      </Link>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <main>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          background: "linear-gradient(135deg, var(--blue-900) 0%, var(--blue-800) 50%, var(--ink) 100%)",
          minHeight: 380,
          display: "flex",
          alignItems: "center",
          paddingTop: 62,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)",
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
          <span className="eyebrow eyebrow-light">Product Catalogue</span>
          <h1
            style={{
              color: "#fff",
              fontSize: "clamp(36px,5vw,64px)",
              lineHeight: 1.1,
              marginTop: 16,
              maxWidth: "18ch",
            }}
          >
            Five lines.{" "}
            <span style={{ color: "var(--blue-400)" }}>One quality standard.</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,.7)", fontSize: 18, marginTop: 20, maxWidth: "52ch" }}>
            From 100-litre loft tanks to 25,000-litre underground sumps — Supremo manufactures and ISI-certifies every product in-house across four dedicated plants.
          </p>
        </div>
      </section>

      {/* Category Nav */}
      <div
        style={{
          position: "sticky",
          top: 62,
          zIndex: 10,
          background: "rgba(255,255,255,.97)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            padding: "12px var(--gutter)",
            scrollbarWidth: "none",
          }}
        >
          {categories.map((cat) => (
            <a
              key={cat.anchor}
              href={`#${cat.anchor}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "6px 16px",
                borderRadius: 999,
                background: "var(--paper-2)",
                border: "1px solid var(--line)",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--slate)",
                whiteSpace: "nowrap",
                textDecoration: "none",
                fontFamily: "var(--font-display)",
                transition: "background .15s, color .15s",
              }}
            >
              {cat.label}
            </a>
          ))}
        </div>
      </div>

      {/* Water Tanks */}
      <section id="tanks" style={{ background: "var(--paper)" }}>
        <div className="container">
          <span className="eyebrow">Water Storage</span>
          <h2 style={{ fontSize: "clamp(30px,4vw,48px)", marginTop: 16, marginBottom: 12 }}>Water Tanks</h2>
          <p style={{ color: "var(--slate)", fontSize: 17, maxWidth: "60ch", marginBottom: 48 }}>
            Manufactured using tri-layer rotomoulding with food-grade LLDPE resin. Every tank batch is drop-tested, pressure-tested, and UV-tested before dispatch.
          </p>
          <div
            className="mob-scroll"
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}
          >
            {tanks.map((t) => (
              <Card key={t.name} product={t} icon={<TankIcon />} className="mob-card-lg" />
            ))}
          </div>
        </div>
      </section>

      {/* Pipes & Fittings */}
      <section id="pipes" style={{ background: "var(--paper-2)" }}>
        <div className="container">
          <span className="eyebrow">Piping Systems</span>
          <h2 style={{ fontSize: "clamp(30px,4vw,48px)", marginTop: 16, marginBottom: 12 }}>Pipes & Fittings</h2>
          <p style={{ color: "var(--slate)", fontSize: 17, maxWidth: "60ch", marginBottom: 48 }}>
            PVC, CPVC, HDPE and SWR pipes manufactured on dedicated extrusion lines. ISI-certified for residential, commercial and agricultural use.
          </p>
          <div
            className="mob-scroll"
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}
          >
            {pipes.map((p) => (
              <Card key={p.name} product={p} icon={<PipeIcon />} className="mob-card-lg" />
            ))}
          </div>
        </div>
      </section>

      {/* Accessories */}
      <section id="accessories" style={{ background: "var(--paper)" }}>
        <div className="container">
          <span className="eyebrow">Utility Products</span>
          <h2 style={{ fontSize: "clamp(30px,4vw,48px)", marginTop: 16, marginBottom: 12 }}>Accessories</h2>
          <p style={{ color: "var(--slate)", fontSize: 17, maxWidth: "60ch", marginBottom: 48 }}>
            Blow-moulded utility accessories built for everyday Indian households — durable, food-safe and available through our 1,200+ dealer network.
          </p>
          <div
            className="mob-scroll"
            style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 20 }}
          >
            {accessories.map((a) => (
              <Card key={a.name} product={a} icon={<BoxIcon />} className="mob-card-lg" />
            ))}
          </div>
        </div>
      </section>

      {/* Planters */}
      <section id="planters" style={{ background: "var(--paper-2)" }}>
        <div className="container">
          <span className="eyebrow">Horticulture</span>
          <h2 style={{ fontSize: "clamp(30px,4vw,48px)", marginTop: 16, marginBottom: 12 }}>Planters</h2>
          <p style={{ color: "var(--slate)", fontSize: 17, maxWidth: "60ch", marginBottom: 48 }}>
            UV-stable, weather-resistant planters for homes, hotels, malls and commercial landscapes. Available in standard and custom sizes.
          </p>
          <div
            className="mob-scroll"
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}
          >
            {planters.map((pl) => (
              <Card key={pl.name} product={pl} icon={<PlantIcon />} className="mob-card-lg" />
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Plastic */}
      <section id="commercial" style={{ background: "var(--paper)" }}>
        <div className="container">
          <div
            className="mob-1col mob-gap-lg"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 56,
              alignItems: "center",
            }}
          >
            <div>
              <span className="eyebrow">B2B / Bulk</span>
              <h2 style={{ fontSize: "clamp(30px,4vw,48px)", marginTop: 16, marginBottom: 20 }}>Commercial Plastic Products</h2>
              <p style={{ color: "var(--slate)", fontSize: 17, lineHeight: 1.7, marginBottom: 24 }}>
                Supremo supplies bulk quantities of industrial-grade blow-moulded and roto-moulded products to builders, contractors, municipalities and large retail chains. Custom SKUs, white-labelling and project billing available on request.
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
                {[
                  "Minimum order 100 units for custom SKUs",
                  "GST invoice with HSN code",
                  "Project billing against PO",
                  "Dedicated key account manager",
                  "30-day credit for approved accounts",
                ].map((f) => (
                  <li key={f} style={{ display: "flex", gap: 10, color: "var(--slate)", fontSize: 15 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 2 }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn">
                Contact Sales Team
                <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </Link>
            </div>
            <div
              style={{
                background: "linear-gradient(135deg,var(--blue-50) 0%,var(--blue-100) 100%)",
                borderRadius: "var(--r-lg)",
                border: "1px solid var(--line)",
                padding: 48,
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              {[
                { v: "500+", l: "Commercial clients served" },
                { v: "100+", l: "Custom SKUs manufactured" },
                { v: "₹2 Cr+", l: "Avg. annual project value" },
                { v: "48 hrs", l: "Quote turnaround time" },
              ].map((s) => (
                <div key={s.l} style={{ borderBottom: "1px solid var(--line)", paddingBottom: 20 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 700, color: "var(--blue-700)", lineHeight: 1 }}>{s.v}</div>
                  <div style={{ color: "var(--muted)", fontSize: 14, marginTop: 6 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section style={{ background: "var(--blue-900)", padding: "clamp(48px,6vw,80px) 0" }}>
        <div
          className="container mob-col mob-gap-md"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
          }}
        >
          <div>
            <h2 style={{ color: "#fff", fontSize: "clamp(24px,3vw,40px)", margin: 0 }}>Download our full product catalogue</h2>
            <p style={{ color: "rgba(255,255,255,.65)", marginTop: 10, fontSize: 16 }}>
              Complete specs, certifications and SKU codes for all Supremo product lines.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexShrink: 0, flexWrap: "wrap" }}>
            <a
              href="/catalogue.pdf"
              className="btn btn--white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download PDF
            </a>
            <Link href="/contact" className="btn btn--ghost">Contact Sales</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
