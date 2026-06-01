import Link from "next/link";
import { CATALOGUE_URL } from "@/lib/site";

const TRUST = ["ISI 12701", "ISO 9001", "22 States"];

export function Hero() {
  return (
    <section id="hero" className="hero-light">
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-light {
          background:
            radial-gradient(120% 120% at 100% 0%, var(--primary-tint) 0%, transparent 55%),
            var(--paper);
          padding-top: calc(var(--nav-h) + clamp(36px, 5vw, 64px));
          padding-bottom: clamp(56px, 8vw, 96px);
        }
        .hero-light-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          align-items: center;
          gap: clamp(32px, 5vw, 72px);
        }
        .hero-light h1 {
          font-size: clamp(38px, 5vw, 56px);
          line-height: 1.08;
          letter-spacing: -0.02em;
          margin-top: 18px;
          color: var(--ink);
        }
        .hero-light h1 .accent { color: var(--primary); }
        .hero-light-sub {
          color: var(--muted);
          font-size: clamp(16px, 1.3vw, 19px);
          line-height: 1.65;
          margin-top: 20px;
          max-width: 46ch;
        }
        .hero-light-cta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 32px;
        }
        .hero-light-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 32px;
        }
        .hero-light-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 34px;
          padding: 0 14px;
          border-radius: var(--r-pill);
          background: var(--paper-2);
          border: 1px solid var(--line);
          color: var(--ink);
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.01em;
        }
        .hero-light-chip svg { color: var(--primary); flex-shrink: 0; }
        .hero-light-visual {
          position: relative;
          background:
            radial-gradient(80% 70% at 50% 30%, #fff 0%, var(--paper-2) 100%);
          border: 1px solid var(--line);
          border-radius: var(--r-lg);
          aspect-ratio: 5 / 5.2;
          display: grid;
          place-items: center;
          padding: clamp(20px, 4vw, 48px);
          box-shadow: var(--sh-md);
        }
        .hero-light-visual img {
          width: auto;
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 24px 40px rgba(14,26,48,.14));
        }
        @media (max-width: 900px) {
          .hero-light-grid { grid-template-columns: 1fr; gap: 32px; }
          .hero-light-visual { order: -1; aspect-ratio: 5 / 4; max-width: 460px; margin: 0 auto; width: 100%; }
          .hero-light-sub { max-width: none; }
        }
        @media (max-width: 480px) {
          .hero-light-cta .btn { flex: 1; justify-content: center; }
        }
      `}} />

      <div className="container hero-light-grid">
        {/* Copy */}
        <div className="hero-light-copy">
          <span className="eyebrow">Built to Hold</span>
          <h1>
            Built to hold <span className="accent">India&apos;s water.</span>
          </h1>
          <p className="hero-light-sub">
            Triple-layer water tanks, ISI-certified pipes &amp; planters —
            made in four ISO plants.
          </p>

          <div className="hero-light-cta">
            <Link href="/dealership" className="btn">
              Become a Dealer
              <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </Link>
            <a href={CATALOGUE_URL} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download Catalogue
            </a>
          </div>

          <ul className="hero-light-chips">
            {TRUST.map((label) => (
              <li key={label} className="hero-light-chip">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Single calm product image on a soft panel */}
        <div className="hero-light-visual">
          <img src="/images/overhead_tank.png" alt="Supremo triple-layer roto-moulded overhead water tank" />
        </div>
      </div>
    </section>
  );
}
