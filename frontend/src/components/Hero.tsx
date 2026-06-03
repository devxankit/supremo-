"use client";

import Link from "next/link";

// Custom premium SVG Icons
const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PeopleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const FactoryIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 21H2V3l7 4 7-4 6 4v14z" />
    <path d="M14 10h4v4h-4z" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 11 11 13 15 9" />
  </svg>
);

const LayersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const BacteriaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const DoubleChevronIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17 11 12 6 7 11" />
    <polyline points="17 18 12 13 7 18" />
  </svg>
);

export function Hero() {
  return (
    <section className="homepage-hero-section">
      {/* Styles for homepage hero page layout */}
      <style dangerouslySetInnerHTML={{ __html: `
        .homepage-hero-section {
          position: relative;
          min-height: 100vh;
          padding-top: calc(var(--nav-h) + 40px);
          padding-bottom: 40px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background-color: #f1f5f9;
        }

        .blurred-daylight-bg {
          position: absolute;
          inset: 0;
          background-image: url('/images/bg.png');
          background-size: cover;
          background-position: center;
          z-index: 0;
        }

        .bright-sky-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 0% 0%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.4) 45%, rgba(255, 255, 255, 0) 80%);
          z-index: 1;
          pointer-events: none;
        }

        .hero-main-container {
          position: relative;
          z-index: 2;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .hero-grid-layout {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 40px;
          align-items: center;
          position: relative;
        }

        .hero-left-content-col {
          padding-left: 48px;
        }

        /* Pill Eyebrow */
        .badge-pill-eyebrow {
          display: inline-flex;
          align-items: center;
          background: #e6f0ff;
          color: var(--blue-600);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 99px;
          margin-bottom: 20px;
          font-family: var(--font-work), system-ui, sans-serif;
        }

        .hero-header-headline {
          font-family: var(--font-work), system-ui, sans-serif;
          font-size: clamp(38px, 4.8vw, 64px);
          line-height: 1.05;
          font-weight: 900;
          color: #0d1b2a;
          letter-spacing: -0.03em;
        }

        .hero-header-subtext {
          font-family: var(--font-work), system-ui, sans-serif;
          font-size: 17px;
          line-height: 1.6;
          color: var(--slate);
          margin-top: 20px;
          max-width: 44ch;
        }

        .hero-buttons-wrapper {
          display: flex;
          gap: 14px;
          margin-top: 36px;
          flex-wrap: wrap;
        }

        .hero-solid-blue-btn {
          background: var(--blue-600);
          color: #ffffff;
          border: none;
          border-radius: 99px;
          height: 52px;
          padding: 0 28px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
          box-shadow: 0 4px 14px rgba(20, 102, 230, 0.25);
          font-family: var(--font-work), system-ui, sans-serif;
        }

        .hero-solid-blue-btn:hover {
          background: var(--blue-700);
          transform: translateY(-1px);
        }

        .hero-outline-btn {
          border: 1.5px solid var(--blue-600);
          color: var(--blue-600);
          background: #ffffff;
          border-radius: 99px;
          height: 52px;
          padding: 0 24px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
          font-family: var(--font-work), system-ui, sans-serif;
        }

        .hero-outline-btn:hover {
          background: var(--blue-50);
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(20, 102, 230, 0.1);
        }

        /* Center Column - Product Image Container */
        .tank-image-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .tank-stage-image {
          width: 100%;
          max-width: 760px;
          height: auto;
          display: block;
          filter: drop-shadow(0px 16px 36px rgba(15, 23, 42, 0.22));
          transform: translate(-40px, 86px) scale(1.12);
        }

        /* Bottom Row - Full Width Horizontal Panel */
        .bottom-fullwidth-panel {
          background: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 16px;
          padding: 24px 32px;
          box-shadow: 0 10px 30px -10px rgba(10, 22, 40, 0.08);
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 24px;
          width: 100%;
          margin-top: 24px;
          position: relative;
          z-index: 5;
        }

        .bottom-panel-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          font-family: var(--font-work), system-ui, sans-serif;
        }

        .bottom-panel-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #e6f0ff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .bottom-panel-title {
          font-weight: 800;
          font-family: var(--font-work), system-ui, sans-serif;
          font-size: 13.5px;
          color: #0a1628;
          margin-bottom: 4px;
          line-height: 1.25;
        }

        .bottom-panel-desc {
          font-size: 11.5px;
          color: var(--muted);
          line-height: 1.35;
          font-family: var(--font-work), system-ui, sans-serif;
        }

        /* Responsive Settings */
        @media (max-width: 1100px) {
          .hero-grid-layout {
            grid-template-columns: 1fr;
            gap: 36px;
            text-align: center;
          }

          .hero-left-content-col {
            padding-left: 0;
          }

          .tank-stage-image {
            transform: translateY(48px) !important;
            max-width: 480px !important;
            margin: 0 auto;
          }

          .bottom-fullwidth-panel {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            margin-top: -60px;
            position: relative;
            z-index: 5;
          }

          .bottom-panel-item {
            flex: 1 1 240px;
            max-width: 280px;
          }
        }

        @media (max-width: 820px) {
          .homepage-hero-section {
            padding-top: calc(var(--nav-h) + 20px);
            padding-bottom: 32px;
          }

          .hero-header-subtext {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-buttons-wrapper {
            justify-content: center;
          }

          .bottom-fullwidth-panel {
            padding: 20px;
            margin-top: -50px;
          }

          .bottom-panel-item {
            flex: 1 1 200px;
            max-width: 260px;
          }

          .blurred-daylight-bg {
            background-position: center top;
          }
        }

        @media (max-width: 580px) {
          .hero-grid-layout {
            gap: 28px;
          }

          .tank-stage-image {
            max-width: 340px !important;
            transform: translateY(36px) !important;
          }

          .hero-buttons-wrapper {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            width: 100%;
            max-width: 320px;
            margin-left: auto;
            margin-right: auto;
          }

          .hero-solid-blue-btn, .hero-outline-btn {
            width: 100%;
            height: 48px;
            justify-content: center;
          }

          .bottom-fullwidth-panel {
            flex-direction: column;
            padding: 16px;
            gap: 16px;
            border-radius: 12px;
            margin-top: -40px;
            position: relative;
            z-index: 5;
          }

          .bottom-panel-item {
            gap: 10px;
            flex: 1 1 auto;
            max-width: 100%;
          }

          .bottom-panel-icon {
            width: 38px;
            height: 38px;
          }

          .bottom-panel-title {
            font-size: 13px;
            min-height: auto;
          }

          .bottom-panel-desc {
            font-size: 11px;
          }

          .blurred-daylight-bg {
            background-position: center top;
          }
        }
      `}} />

      {/* Background & Sky filter */}
      <div className="blurred-daylight-bg" />
      <div className="bright-sky-overlay" />

      {/* Content wrapper */}
      <div className="container">
        <div className="hero-main-container">
          
          <div className="hero-grid-layout">
            
            {/* Column 1 - Copy, Actions & trust stats */}
            <div className="hero-left-content-col">
              <span className="badge-pill-eyebrow">BUILT TO HOLD</span>
              <h1 className="hero-header-headline">
                Built to hold<br />
                <span style={{ color: "var(--blue-600)" }}>India&apos;s water.</span>
              </h1>
              <p className="hero-header-subtext">
                8 Layer ULTRA tanks, premium pipes & planters engineered for strength, safety & long life.
              </p>
              
              {/* Buttons */}
              <div className="hero-buttons-wrapper">
                <Link href="/dealership" className="hero-solid-blue-btn">
                  Become a Dealer
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </Link>
                <a href="#" onClick={(e) => e.preventDefault()} className="hero-outline-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  Download Catalogue
                </a>
              </div>

            </div>

            {/* Column 2 - Product Image */}
            <div className="tank-image-container">
              <img 
                src="/images/img_hero.png" 
                alt="Supremo Hero Products" 
                className="tank-stage-image"
              />
            </div>

          </div>

          {/* Bottom Horizontal Panel */}
          <div className="bottom-fullwidth-panel">
            
            {/* 1: Strength */}
            <div className="bottom-panel-item">
              <div className="bottom-panel-icon">
                <LayersIcon />
              </div>
              <div>
                <div className="bottom-panel-title">8-Layer Strength</div>
                <div className="bottom-panel-desc">Extra tough design for every need</div>
              </div>
            </div>

            {/* 2: Food Grade */}
            <div className="bottom-panel-item">
              <div className="bottom-panel-icon">
                <ShieldCheckIcon />
              </div>
              <div>
                <div className="bottom-panel-title">Food-Grade Safe</div>
                <div className="bottom-panel-desc">Ensuring healthy water for your family</div>
              </div>
            </div>

            {/* 3: Weather Resistant */}
            <div className="bottom-panel-item">
              <div className="bottom-panel-icon">
                <SunIcon />
              </div>
              <div>
                <div className="bottom-panel-title">Weather Resistant</div>
                <div className="bottom-panel-desc">Built to endure extreme Indian climates</div>
              </div>
            </div>

            {/* 4: Long Lasting */}
            <div className="bottom-panel-item">
              <div className="bottom-panel-icon">
                <DoubleChevronIcon />
              </div>
              <div>
                <div className="bottom-panel-title">Long-Lasting Life</div>
                <div className="bottom-panel-desc">Highly durable design trusted for decades</div>
              </div>
            </div>

            {/* 5: Premium Quality */}
            <div className="bottom-panel-item">
              <div className="bottom-panel-icon">
                <FactoryIcon />
              </div>
              <div>
                <div className="bottom-panel-title">Premium Quality</div>
                <div className="bottom-panel-desc">Engineered in our ISO-certified plants</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
