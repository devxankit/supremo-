import type { Metadata } from "next";
import Link from "next/link";
import { Timeline } from "@/components/Timeline";
import { AboutStats } from "@/components/AboutStats";
import { CertificatesCarousel } from "@/components/CertificatesCarousel";
import { DirectorDesk } from "@/components/DirectorDesk";
import { LazyImage } from "@/components/LazyImage";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about Supremo.",
};



export const dynamic = "force-dynamic";

export default async function AboutPage() {
  let aboutData = null;

  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
    const res = await fetch(`${apiBase}/about`, { cache: "no-store" });
    if (res.ok) {
      aboutData = await res.json();
    }
  } catch (err) {
    console.error("Error fetching about page content:", err);
  }

  if (!aboutData) {
    return null;
  }

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
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "clamp(32px, 5vw, 72px)",
            alignItems: "center",
          }}
        >
          {/* Left — copy */}
          <div>
            <span className="eyebrow">{aboutData.eyebrow}</span>
            <h1
              style={{
                fontSize: "clamp(28px, 3.8vw, 44px)",
                lineHeight: 1.12,
                marginTop: 14,
                letterSpacing: "-0.02em",
              }}
            >
              {aboutData.heading}
              <br />
              <span style={{ color: "var(--blue-600)" }}>{aboutData.headingHighlight}</span>
            </h1>
            <p
              style={{
                color: "var(--slate)",
                fontSize: "clamp(14px, 1.1vw, 16px)",
                lineHeight: 1.7,
                marginTop: 18,
                maxWidth: "54ch",
              }}
            >
              {aboutData.text1}
            </p>
            <p
              style={{
                color: "var(--slate)",
                fontSize: "clamp(14px, 1.1vw, 16px)",
                lineHeight: 1.7,
                marginTop: 12,
                maxWidth: "54ch",
              }}
            >
              {aboutData.text2}
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
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
            {aboutData.imageUrl ? (
              <LazyImage
                src={aboutData.imageUrl}
                alt="Aerial view of the Supremo manufacturing plant in Indore"
                priority={true}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : null}
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
              {aboutData.imageCaption}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          2 · ANIMATED STATS  (counts up on scroll)
      ════════════════════════════════════════════════ */}
      <AboutStats stats={aboutData.stats} />

      {/* ════════════════════════════════════════════════
          3 · OUR JOURNEY  (in place of the reference "Milestones")
      ════════════════════════════════════════════════ */}
      <Timeline />

      {/* ════════════════════════════════════════════════
          4 · FROM THE DESK OF MANAGING DIRECTOR
      ════════════════════════════════════════════════ */}
      <DirectorDesk 
        title={aboutData.directorTitle}
        text1={aboutData.directorText1}
        text2={aboutData.directorText2}
        text3={aboutData.directorText3}
        imageUrl={aboutData.directorImageUrl}
      />

      {/* ════════════════════════════════════════════════
          5 · OUR MANUFACTURING UNIT  (single Indore facility)
      ════════════════════════════════════════════════ */}
      {((aboutData.mfgHeading || aboutData.mfgDescription) || (aboutData.mfgCards && aboutData.mfgCards.length > 0)) && (
        <section style={{ background: "var(--paper-2)", paddingBottom: "clamp(28px, 3.5vw, 48px)" }}>
          <div className="container">
            <style
              dangerouslySetInnerHTML={{
                __html: `
              .mfg-units-grid {
                display: grid;
                grid-template-columns: repeat(${aboutData.mfgCards?.length || 4}, 1fr);
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

            {(aboutData.mfgEyebrow || aboutData.mfgHeading || aboutData.mfgDescription) && (
              <div style={{ textAlign: "center", maxWidth: "72ch", margin: "0 auto 44px" }}>
                {aboutData.mfgEyebrow && <span className="eyebrow">{aboutData.mfgEyebrow}</span>}
                {aboutData.mfgHeading && (
                  <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", marginTop: 16, marginBottom: 18 }}>
                    {aboutData.mfgHeading}
                  </h2>
                )}
                {aboutData.mfgDescription && (
                  <p style={{ color: "var(--slate)", fontSize: 17, lineHeight: 1.75 }}>
                    {aboutData.mfgDescription}
                  </p>
                )}
              </div>
            )}

            {aboutData.mfgCards && aboutData.mfgCards.length > 0 && (
              <div className="mfg-units-grid mob-scroll">
                {aboutData.mfgCards.map((u: any, idx: number) => (
                  <div key={idx} className="mfg-unit-card mob-card-md">
                    {u.image && (
                      <div className="mfg-unit-img">
                        <LazyImage src={u.image} alt={`${u.title} — Supremo plant`} />
                      </div>
                    )}
                    {u.title && <div className="mfg-unit-title">{u.title}</div>}
                    {u.sub && <div className="mfg-unit-sub">{u.sub}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════
          6 · OUR CERTIFICATES & QUALITY
      ════════════════════════════════════════════════ */}
      <CertificatesCarousel 
        eyebrow={aboutData.certEyebrow}
        title={aboutData.certTitle}
        description={aboutData.certDescription}
        imageUrl={aboutData.certImageUrl}
        certificates={aboutData.certificates}
      />
    </main>
  );
}

