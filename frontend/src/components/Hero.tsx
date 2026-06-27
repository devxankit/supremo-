"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LazyImage, optimizeCloudinaryUrl } from "@/components/LazyImage";
import { resolveBackendUrl, getDirectDownloadUrl } from "@/lib/urlHelper";

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

const DoubleChevronIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17 11 12 6 7 11" />
    <polyline points="17 18 12 13 7 18" />
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

interface HeroData {
  bgType: "video" | "image";
  videoUrl: string;
  videoName: string;
  imageUrl: string;
  imageName: string;
  overlayDark: number;
  align: "left" | "center";
  showEyebrow: boolean;
  eyebrow: string;
  heading: string;
  headingAccent: string;
  showSub: boolean;
  sub: string;
  showPrimary: boolean;
  primaryLabel: string;
  primaryLink: string;
  showSecondary: boolean;
  secondaryLabel: string;
  secondaryLink: string;
  showScrollCue: boolean;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  feature4Title: string;
  feature4Desc: string;
  feature5Title: string;
  feature5Desc: string;
}

export function Hero() {
  const [data, setData] = useState<HeroData | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL}`;
    fetch(`${apiBase}/hero`)
      .then((res) => {
        if (!res.ok) throw new Error("Hero response error");
        return res.json();
      })
      .then((heroData) => {
        setData(heroData);
      })
      .catch((err) => console.error("Error loading hero details:", err));
  }, []);

  if (!data) return null;

  // Set active properties directly from dynamic data
  const activeBgType = data.bgType || "video";
  const isVideo = activeBgType === "video";
  const activeVideoUrl = optimizeCloudinaryUrl(data.videoUrl || "");
  const activeImageUrl = optimizeCloudinaryUrl(data.imageUrl || "");
  const activeEyebrow = data.eyebrow || "";
  const activeHeading = data.heading || "";
  const activeHeadingAccent = data.headingAccent || "";
  const activeSub = data.sub || "";
  const activeAlign = data.align || "left";
  const activeShowEyebrow = data.showEyebrow ?? false;
  const activeShowSub = data.showSub ?? false;
  const activeShowPrimary = data.showPrimary ?? false;
  const activePrimaryLabel = data.primaryLabel || "";
  const activePrimaryLink = data.primaryLink || "";
  const activeShowSecondary = data.showSecondary ?? false;
  const activeSecondaryLabel = data.secondaryLabel || "";
  const isPdf = data.secondaryLink?.toLowerCase().endsWith(".pdf") || data.secondaryLink?.includes("/uploads/");
  const activeSecondaryLink = data.secondaryLink
    ? (isPdf ? getDirectDownloadUrl(data.secondaryLink) : resolveBackendUrl(data.secondaryLink))
    : "";
  const activeShowScrollCue = data.showScrollCue ?? false;
  const activeOverlayDark = data.overlayDark ?? 0;

  const activeFeature1Title = data.feature1Title || "";
  const activeFeature1Desc = data.feature1Desc || "";
  const activeFeature2Title = data.feature2Title || "";
  const activeFeature2Desc = data.feature2Desc || "";
  const activeFeature3Title = data.feature3Title || "";
  const activeFeature3Desc = data.feature3Desc || "";
  const activeFeature4Title = data.feature4Title || "";
  const activeFeature4Desc = data.feature4Desc || "";
  const activeFeature5Title = data.feature5Title || "";
  const activeFeature5Desc = data.feature5Desc || "";

  const activeAlignItems = activeAlign === "center" ? "center" : "flex-start";
  const activeTextAlign = activeAlign === "center" ? "center" : "left";

  return (
    <section className={`homepage-hero-section${isVideo ? " hero-video-mode" : ""}`}>
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

        /* ── VIDEO THEME ─────────────────────────── */
        .homepage-hero-section.hero-video-mode {
          /* dark base so text stays readable before the video paints */
          background-color: #0a1628;
        }

        .hero-bg-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          opacity: 0;
          transition: opacity .7s ease;
          pointer-events: none;
        }

        .hero-bg-video.is-ready { opacity: 1; }

        /* Readability scrim over the video so the white text stays legible */
        .hero-video-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background:
            linear-gradient(90deg, rgba(6,16,32,.74) 0%, rgba(6,16,32,.46) 46%, rgba(6,16,32,.14) 100%),
            linear-gradient(0deg, rgba(6,16,32,.55) 0%, rgba(6,16,32,0) 42%);
        }

        .hero-video-mode .hero-grid-layout {
          grid-template-columns: 1fr;
          text-align: left;
        }

        .hero-video-mode .badge-pill-eyebrow {
          background: rgba(255,255,255,.16);
          color: #fff;
          backdrop-filter: blur(4px);
        }

        .hero-video-mode .hero-header-headline {
          color: #ffffff;
          text-shadow: 0 2px 22px rgba(0,0,0,.55);
        }

        .hero-video-mode .hero-header-headline span {
          color: #6db0ff !important;
        }

        .hero-video-mode .hero-header-subtext {
          color: rgba(255,255,255,.92);
          text-shadow: 0 1px 12px rgba(0,0,0,.5);
        }

        /* Video theme on mobile: white page, text on top, a 16:9 video
           below it (YouTube-style) — no overlay, no wasted space. */
        @media (max-width: 820px) {
          .homepage-hero-section.hero-video-mode {
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
            min-height: auto;
            background-color: #ffffff;
            padding-bottom: 0;
            overflow: visible;
          }

          .hero-video-mode .container { order: 1; }

          .hero-video-mode .hero-video-overlay { display: none; }

          .hero-video-mode .hero-bg-video {
            position: relative;
            inset: auto;
            order: 2;
            width: 100%;
            height: auto;
            aspect-ratio: 16 / 9;
            object-fit: cover;
            margin-top: 28px;
            display: block;
          }

          /* dark, readable text again on the white background */
          .hero-video-mode .badge-pill-eyebrow {
            background: #e6f0ff;
            color: var(--blue-600);
            backdrop-filter: none;
          }
          .hero-video-mode .hero-header-headline {
            color: #0d1b2a;
            text-shadow: none;
          }
          .hero-video-mode .hero-header-headline span {
            color: var(--blue-600) !important;
          }
          .hero-video-mode .hero-header-subtext {
            color: var(--slate);
            text-shadow: none;
          }
        }

        .blurred-daylight-bg {
          position: absolute;
          inset: 0;
          background-image: url('${activeImageUrl}');
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

      {/* Background — video theme vs. image theme */}
      {isVideo ? (
        <>
          <video
            key={activeVideoUrl}
            className={`hero-bg-video${videoReady ? " is-ready" : ""}`}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/images/bg.png"
            onCanPlay={() => setVideoReady(true)}
            aria-hidden="true"
          >
            <source src={activeVideoUrl} type="video/mp4" />
          </video>
          {/* Overlay darkness level mapped dynamically */}
          <div className="hero-video-overlay" style={{ background: `linear-gradient(90deg, rgba(6,16,32,${(activeOverlayDark + 10) / 100}) 0%, rgba(6,16,32,${activeOverlayDark / 100}) 46%, rgba(6,16,32,0.1) 100%)` }} />
        </>
      ) : (
        <>
          <div className="blurred-daylight-bg" />
          {/* Apply overlay dark level dynamically for image mode too */}
          <div className="bright-sky-overlay" style={{ background: `radial-gradient(circle at 0% 0%, rgba(255, 255, 255, ${1 - activeOverlayDark / 100}) 0%, rgba(255, 255, 255, 0.4) 45%, rgba(255, 255, 255, 0) 80%)` }} />
        </>
      )}

      {/* Content wrapper */}
      <div className="container">
        <div className="hero-main-container">
          
          <div className="hero-grid-layout" style={{ gridTemplateColumns: isVideo ? "1fr" : undefined }}>
            
            {/* Column 1 - Copy, Actions & trust stats */}
            <div className="hero-left-content-col" style={{
              display: "flex",
              flexDirection: "column",
              alignItems: activeAlignItems,
              textAlign: activeTextAlign,
              margin: activeAlign === "center" ? "0 auto" : "0"
            }}>
              {activeShowEyebrow && activeEyebrow && (
                <span className="badge-pill-eyebrow">{activeEyebrow}</span>
              )}
              <h1 className="hero-header-headline" style={{ textShadow: isVideo ? "0 2px 22px rgba(0,0,0,.55)" : "none" }}>
                {activeHeading}<br />
                {activeHeadingAccent && <span style={{ color: "var(--blue-600)" }}>{activeHeadingAccent}</span>}
              </h1>
              {activeShowSub && activeSub && (
                <p className="hero-header-subtext" style={{ textShadow: isVideo ? "0 1px 12px rgba(0,0,0,.5)" : "none" }}>
                  {activeSub}
                </p>
              )}
              
              {/* Buttons */}
              <div className="hero-buttons-wrapper" style={{ justifyContent: activeAlign === "center" ? "center" : "flex-start" }}>
                {activeShowPrimary && activePrimaryLabel && (
                  <Link href={activePrimaryLink} className="hero-solid-blue-btn">
                    {activePrimaryLabel}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </Link>
                )}
                {activeShowSecondary && activeSecondaryLabel && (
                  <a
                    href={activeSecondaryLink || "#"}
                    download={activeSecondaryLabel.toLowerCase().includes("catalogue") ? "Supremo_Catalogue.pdf" : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-outline-btn"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                    </svg>
                    {activeSecondaryLabel}
                  </a>
                )}
              </div>

            </div>

            {/* Column 2 - Product Image (image theme only) */}
            {!isVideo && (
              <div className="tank-image-container">
                <LazyImage
                  src="/images/img_hero.png"
                  alt="Supremo Hero Products"
                  className="tank-stage-image"
                  priority={true}
                />
              </div>
            )}

          </div>

           {/* Bottom Horizontal Panel (image theme only) */}
          {!isVideo && (
          <div className="bottom-fullwidth-panel">
            
            {/* 1: Strength */}
            <div className="bottom-panel-item">
              <div className="bottom-panel-icon">
                <LayersIcon />
              </div>
              <div>
                <div className="bottom-panel-title">{activeFeature1Title}</div>
                <div className="bottom-panel-desc">{activeFeature1Desc}</div>
              </div>
            </div>

            {/* 2: Food Grade */}
            <div className="bottom-panel-item">
              <div className="bottom-panel-icon">
                <ShieldCheckIcon />
              </div>
              <div>
                <div className="bottom-panel-title">{activeFeature2Title}</div>
                <div className="bottom-panel-desc">{activeFeature2Desc}</div>
              </div>
            </div>

            {/* 3: Weather Resistant */}
            <div className="bottom-panel-item">
              <div className="bottom-panel-icon">
                <SunIcon />
              </div>
              <div>
                <div className="bottom-panel-title">{activeFeature3Title}</div>
                <div className="bottom-panel-desc">{activeFeature3Desc}</div>
              </div>
            </div>

            {/* 4: Long Lasting */}
            <div className="bottom-panel-item">
              <div className="bottom-panel-icon">
                <DoubleChevronIcon />
              </div>
              <div>
                <div className="bottom-panel-title">{activeFeature4Title}</div>
                <div className="bottom-panel-desc">{activeFeature4Desc}</div>
              </div>
            </div>

            {/* 5: Premium Quality */}
            <div className="bottom-panel-item">
              <div className="bottom-panel-icon">
                <FactoryIcon />
              </div>
              <div>
                <div className="bottom-panel-title">{activeFeature5Title}</div>
                <div className="bottom-panel-desc">{activeFeature5Desc}</div>
              </div>
            </div>

          </div>
          )}

        </div>
      </div>
      {/* Scroll cue */}
      {activeShowScrollCue && (
        <div style={{ position: "absolute", left: "50%", bottom: 20, transform: "translateX(-50%)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: isVideo ? "rgba(255,255,255,.5)" : "rgba(10,22,40,.5)", fontWeight: 600, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, zIndex: 4 }}>
          Scroll
          <span style={{ width: 1, height: 24, background: isVideo ? "linear-gradient(180deg,transparent,rgba(255,255,255,.55))" : "linear-gradient(180deg,transparent,rgba(10,22,40,.55))" }} />
        </div>
      )}
    </section>
  );
}

