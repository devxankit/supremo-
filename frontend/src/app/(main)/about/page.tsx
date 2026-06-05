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
          5 · OUR MANUFACTURING UNIT  (single Indore facility)
      ════════════════════════════════════════════════ */}
      <section style={{ background: "var(--paper-2)", paddingBottom: "clamp(28px, 3.5vw, 48px)" }}>
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

