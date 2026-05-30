"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initial fade-in on mount
    const entryTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 150);

    // Initial idle timer (fades out after 4.5 seconds if no interaction)
    const initialIdleTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 4500);

    const showTextAndResetTimer = () => {
      setIsVisible(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 3000); // 3 seconds of inactivity before fade-out
    };

    const handleInteraction = () => {
      clearTimeout(initialIdleTimeout);
      showTextAndResetTimer();
    };

    const heroElement = document.getElementById("hero");
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleInteraction);
      heroElement.addEventListener("mouseenter", handleInteraction);
      heroElement.addEventListener("touchstart", handleInteraction, { passive: true });
    }

    return () => {
      clearTimeout(entryTimeout);
      clearTimeout(initialIdleTimeout);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleInteraction);
        heroElement.removeEventListener("mouseenter", handleInteraction);
        heroElement.removeEventListener("touchstart", handleInteraction);
      }
    };
  }, []);

  return (
    <section id="hero" className="hero-section hero-container-el">
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-container-el {
          position: relative;
          height: 100vh;
          min-height: min(900px, 100vh);
          overflow: hidden;
          isolation: isolate;
          padding: 0;
          background-color: #010c1d;
          display: block;
        }

        .hero-video-el {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
          pointer-events: none;
        }

        .hero-overlay-wrapper-el {
          position: absolute;
          inset: 0;
          z-index: 4;
        }

        .hero-content-el {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .hero-scroll-cue-el {
          position: absolute;
          left: 50%;
          bottom: 22px;
          transform: translateX(-50%);
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(255,255,255,.5);
          font-weight: 600;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          user-select: none;
        }

        .hero-cta-container {
          display: flex;
          gap: 12px;
          margin-top: 40px;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .hero-container-el {
            height: auto !important;
            min-height: unset !important;
            display: flex !important;
            flex-direction: column !important;
            padding-top: calc(var(--nav-h) + 12px) !important;
            padding-bottom: 0 !important;
            background-color: #ffffff !important;
            overflow: visible !important;
          }

          .hero-video-el {
            position: relative !important;
            inset: auto !important;
            width: 100% !important;
            height: auto !important;
            aspect-ratio: 16 / 9 !important;
            object-fit: cover !important;
            order: 2 !important;
            pointer-events: auto !important;
            margin-top: 20px !important;
            margin-bottom: 0 !important;
            z-index: 1 !important;
          }

          .hero-overlay-wrapper-el {
            position: relative !important;
            inset: auto !important;
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
            pointer-events: auto !important;
            order: 1 !important;
            z-index: 4 !important;
          }

          .hero-content-el {
            position: relative !important;
            inset: auto !important;
            display: block !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }

          .hero-content-el h1 {
            color: #0A1628 !important;
            text-shadow: none !important;
          }

          .hero-content-el p {
            color: #3F4D66 !important;
            text-shadow: none !important;
          }

          .hero-content-el .eyebrow-light {
            color: var(--blue-700) !important;
          }
          .hero-content-el .eyebrow-light::before {
            background: var(--blue-600) !important;
          }

          .hero-cta-container {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            gap: 8px !important;
            margin-top: 28px !important;
            width: 100% !important;
          }

          .hero-cta-container .btn {
            flex: 1 !important;
            justify-content: center !important;
            padding: 0 8px !important;
            font-size: 12px !important;
            height: 44px !important;
            white-space: nowrap !important;
            gap: 6px !important;
          }

          .hero-cta-container .btn svg {
            flex-shrink: 0 !important;
            width: 13px !important;
            height: 13px !important;
          }

          @media (max-width: 360px) {
            .hero-cta-container .btn {
              font-size: 11px !important;
              padding: 0 4px !important;
              gap: 4px !important;
            }
          }

          .hero-content-el .btn--white {
            border: 1px solid var(--line) !important;
            box-shadow: none !important;
            background: #ffffff !important;
            color: var(--ink) !important;
          }

          .hero-scroll-cue-el {
            display: none !important;
          }
        }
      `}} />

      {/* Video background (Desktop) / Block video (Mobile) */}
      <video
        className="hero-video-el"
        src="/vidoes/supremo_film.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
      />

      {/* Interactive Cinematic Overlay Wrapper */}
      <div
        className="hero-overlay-wrapper-el"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(15px)",
          transition: "opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1), transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)",
          pointerEvents: isVisible ? "auto" : "none",
        }}
      >
        {/* Content overlay */}
        <div className="hero-content hero-content-el">
          <div className="container">
            <div style={{ maxWidth: "62ch" }}>
              <span className="eyebrow eyebrow-light">Pan-India Polymer Manufacturer</span>
              <h1
                style={{
                  color: "#fff",
                  fontSize: "clamp(40px,7vw,86px)",
                  lineHeight: 1.05,
                  marginTop: 20,
                  letterSpacing: "-0.02em",
                  textShadow: "0 2px 16px rgba(0,0,0,0.3), 0 1px 4px rgba(0,0,0,0.3)",
                }}
              >
                Built to Hold{" "}
                <span style={{ color: "var(--blue-400)" }}>India&apos;s Water.</span>
              </h1>
              <p
                style={{
                  color: "rgba(255,255,255,.78)",
                  fontSize: "clamp(16px,1.4vw,20px)",
                  lineHeight: 1.7,
                  marginTop: 24,
                  maxWidth: "54ch",
                  textShadow: "0 1px 8px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)",
                }}
              >
                Triple-layer water tanks, ISI-certified PVC pipes, planters and utility
                products — manufactured in four ISO-certified plants and trusted by
                our extensive dealer network across 22 states.
              </p>
              <div className="hero-cta-container">
                <Link href="/dealership" className="btn">
                  Become a Dealer
                  <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </Link>
                <a href="/catalogue.pdf" target="_blank" rel="noopener noreferrer" className="btn btn--white">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  Download Catalogue
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="hero-scroll-cue-el">
          Scroll
          <span
            className="scroll-line"
            style={{
              width: 1,
              height: 36,
              background: "linear-gradient(180deg,transparent,rgba(255,255,255,.55))",
            }}
          />
        </div>
      </div>
    </section>
  );
}
