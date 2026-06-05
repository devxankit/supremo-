import type { Metadata } from "next";
import Link from "next/link";
import { Timeline } from "@/components/Timeline";
import { AboutStats } from "@/components/AboutStats";
import { CertificatesCarousel } from "@/components/CertificatesCarousel";

export const metadata: Metadata = {
  title: "About — 27 Years of Manufacturing Excellence",
  description:
    "Founded in 1999 in Indore, Madhya Pradesh, Supremo India Pvt Ltd is a leading manufacturer of water tanks, pipes, planters and utility products with a widespread dealer network across India.",
};

// Supremo's product lines, presented as "business verticals" (reference layout).
const verticals = [
  {
    name: "Supremo Water Tanks",
    desc: "Triple-layer overhead, loft & underground tanks — 200 L to 25,000 L, ISI-certified for safe storage.",
    image: "/images/cat_tanks.png",
    link: "/products?category=water-tanks",
  },
  {
    name: "Supremo Pipes & Fittings",
    desc: "UPVC, CPVC, SWR and HDPE piping systems for plumbing, agriculture and industrial use.",
    image: "/images/cat_pipes.png",
    link: "/products?category=pipes-fittings",
  },
  {
    name: "Supremo Planters",
    desc: "Decorative indoor, commercial and garden floor planters that bring durability to landscaping.",
    image: "/images/cat_planters.png",
    link: "/products?category=planters",
  },
  {
    name: "Supremo Accessories",
    desc: "Air-cooler bodies, ghamelas, milk cans, wheelbarrows and everyday moulded utility products.",
    image: "/images/acc_cooler.png",
    link: "/products?category=accessories",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* ════════════════════════════════════════════════
          1 · HERO  ("Why Supremo" — reference top section)
      ════════════════════════════════════════════════ */}
      <section
        style={{
          background: "var(--paper)",
          paddingTop: "calc(var(--nav-h) + clamp(40px, 6vw, 80px))",
          paddingBottom: "clamp(40px, 6vw, 80px)",
        }}
      >
        <div
          className="container mob-1col mob-gap-md"
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 1fr",
            gap: "clamp(32px, 5vw, 72px)",
            alignItems: "center",
          }}
        >
          {/* Left — copy */}
          <div>
            <span className="eyebrow">Why Supremo</span>
            <h1
              style={{
                fontSize: "clamp(34px, 5vw, 60px)",
                lineHeight: 1.08,
                marginTop: 18,
                letterSpacing: "-0.02em",
              }}
            >
              Born in Indore, India.
              <br />
              <span style={{ color: "var(--blue-600)" }}>Trusted across the nation.</span>
            </h1>
            <p
              style={{
                color: "var(--slate)",
                fontSize: "clamp(16px, 1.4vw, 19px)",
                lineHeight: 1.75,
                marginTop: 24,
                maxWidth: "54ch",
              }}
            >
              Supremo stands for innovation and reliability in polymer manufacturing.
              Since 1999, we have grown from a single blow-moulding unit into four plants
              and 22 production lines — engineering water tanks, pipes, planters and utility
              products that meet the highest quality standards.
            </p>
            <p
              style={{
                color: "var(--slate)",
                fontSize: "clamp(16px, 1.4vw, 19px)",
                lineHeight: 1.75,
                marginTop: 18,
                maxWidth: "54ch",
              }}
            >
              Guided by our belief that <strong>&quot;Innovation is the Key&quot;</strong>,
              every product is built to outlast expectations and serve India&apos;s homes,
              farms and businesses for a generation.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 32 }}>
              <Link href="/products" className="btn">
                Explore Products
                <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </Link>
              <Link href="/manufacturing" className="btn btn--outline">
                Our Manufacturing
              </Link>
            </div>
          </div>

          {/* Right — image */}
          <div
            style={{
              position: "relative",
              borderRadius: "var(--r-lg)",
              overflow: "hidden",
              border: "1px solid var(--line)",
              boxShadow: "var(--sh-lg)",
              aspectRatio: "4 / 3.2",
            }}
          >
            <img
              src="/images/DJI_0695.jpg"
              alt="Aerial view of the Supremo manufacturing plant in Indore"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(11,31,77,.55) 0%, rgba(11,31,77,0) 45%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 20,
                bottom: 20,
                color: "#fff",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: "0.01em",
                textShadow: "0 2px 12px rgba(0,0,0,.4)",
              }}
            >
              Supremo Plant · Indore, Madhya Pradesh
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          2 · ANIMATED STATS  (counts up on scroll)
      ════════════════════════════════════════════════ */}
      <AboutStats />

      {/* ════════════════════════════════════════════════
          3 · OUR JOURNEY  (in place of the reference "Milestones")
      ════════════════════════════════════════════════ */}
      <Timeline />

      {/* ════════════════════════════════════════════════
          4 · OUR BUSINESS VERTICALS
      ════════════════════════════════════════════════ */}
      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          <style
            dangerouslySetInnerHTML={{
              __html: `
            .verticals-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 24px;
            }
            .vertical-card {
              display: flex;
              flex-direction: column;
              background: #fff;
              border: 1px solid var(--line);
              border-radius: var(--r-lg);
              overflow: hidden;
              text-decoration: none;
              transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
            }
            .vertical-card:hover {
              transform: translateY(-6px);
              box-shadow: var(--sh-lg);
              border-color: var(--blue-200);
            }
            .vertical-card-img {
              position: relative;
              width: 100%;
              aspect-ratio: 4 / 3;
              background: var(--paper-2);
              border-bottom: 1px solid var(--line);
              overflow: hidden;
              flex-shrink: 0;
            }
            .vertical-card-img img {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              max-width: calc(100% - 56px);
              max-height: calc(100% - 56px);
              object-fit: contain;
              transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            .vertical-card:hover .vertical-card-img img {
              transform: translate(-50%, -50%) scale(1.05);
            }
            .vertical-card-body {
              padding: 24px 22px 26px;
              display: flex;
              flex-direction: column;
              flex: 1;
            }
            .vertical-card-name {
              font-size: 18px;
              margin-bottom: 10px;
              line-height: 1.3;
            }
            .vertical-card-desc {
              color: var(--slate);
              font-size: 14px;
              line-height: 1.6;
              flex: 1;
            }
            .vertical-card-cta {
              display: inline-flex;
              align-items: center;
              gap: 6px;
              margin-top: 18px;
              color: var(--blue-700);
              font-family: var(--font-display);
              font-weight: 700;
              font-size: 14px;
            }
            .vertical-card-cta svg { transition: transform 0.2s ease; }
            .vertical-card:hover .vertical-card-cta svg { transform: translateX(4px); }

            @media (max-width: 900px) {
              .verticals-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
            }
            @media (max-width: 520px) {
              .verticals-grid { grid-template-columns: 1fr; }
            }
          `,
            }}
          />

          <div style={{ marginBottom: 40, maxWidth: "62ch" }}>
            <span className="eyebrow">What We Make</span>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", marginTop: 16, marginBottom: 16 }}>
              Our Business Verticals
            </h2>
            <p style={{ color: "var(--muted)", fontSize: 17, lineHeight: 1.7 }}>
              Four product lines, one promise of quality — covering water storage, fluid
              handling, landscaping and everyday utility across India.
            </p>
          </div>

          <div className="verticals-grid">
            {verticals.map((v) => (
              <Link key={v.name} href={v.link} className="vertical-card">
                <div className="vertical-card-img">
                  <img src={v.image} alt={v.name} />
                </div>
                <div className="vertical-card-body">
                  <h3 className="vertical-card-name">{v.name}</h3>
                  <p className="vertical-card-desc">{v.desc}</p>
                  <span className="vertical-card-cta">
                    Explore
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          5 · OUR MANUFACTURING UNIT  (single Indore facility)
      ════════════════════════════════════════════════ */}
      <section style={{ background: "var(--paper-2)" }}>
        <div className="container">
          <style
            dangerouslySetInnerHTML={{
              __html: `
            .mfg-units-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 20px;
            }
            .mfg-unit-card {
              display: flex;
              flex-direction: column;
              text-decoration: none;
            }
            .mfg-unit-img {
              position: relative;
              width: 100%;
              aspect-ratio: 4 / 3;
              border-radius: var(--r-md);
              overflow: hidden;
              border: 1px solid var(--line);
              background: var(--ink);
            }
            .mfg-unit-img img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            .mfg-unit-card:hover .mfg-unit-img img { transform: scale(1.05); }
            .mfg-unit-title {
              font-family: var(--font-display);
              font-weight: 700;
              color: var(--blue-700);
              font-size: 16px;
              margin-top: 14px;
            }
            .mfg-unit-sub {
              color: var(--muted);
              font-size: 13.5px;
              margin-top: 4px;
              line-height: 1.5;
            }
            @media (max-width: 900px) {
              .mfg-units-grid { grid-template-columns: repeat(2, 1fr); }
            }
          `,
            }}
          />

          <div style={{ textAlign: "center", maxWidth: "72ch", margin: "0 auto 44px" }}>
            <span className="eyebrow">Where It&apos;s Made</span>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", marginTop: 16, marginBottom: 18 }}>
              Our Manufacturing Unit
            </h2>
            <p style={{ color: "var(--slate)", fontSize: 17, lineHeight: 1.75 }}>
              Supremo&apos;s production is concentrated in a single, state-of-the-art facility
              in Indore, Madhya Pradesh — engineered to meet diverse requirements across water
              storage and piping. With roto-moulding, blow-moulding and extrusion lines under
              one roof, a dedicated quality-control department and automated material handling,
              every product is built to exacting standards before it reaches our dealer network.
            </p>
          </div>

          <div className="mfg-units-grid mob-scroll">
            {[
              { image: "/images/DJI_0695.jpg", title: "Indore Facility", sub: "Aerial view · Main campus" },
              { image: "/images/DSC_1520.jpg", title: "Production Floor", sub: "Roto, Blow & Extrusion lines" },
              { image: "/images/DSC_1441.jpg", title: "Material & Quality Lab", sub: "Food-grade polymer · 100% tested" },
              { image: "/images/DJI_0629.jpg", title: "Plant Campus", sub: "22 lines · 68,000 L/day" },
            ].map((u) => (
              <div key={u.title} className="mfg-unit-card mob-card-md">
                <div className="mfg-unit-img">
                  <img src={u.image} alt={`${u.title} — Supremo plant, Indore`} />
                </div>
                <div className="mfg-unit-title">{u.title}</div>
                <div className="mfg-unit-sub">{u.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          6 · OUR CERTIFICATES & QUALITY
      ════════════════════════════════════════════════ */}
      <CertificatesCarousel />
    </main>
  );
}

