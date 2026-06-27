"use client";

import { useState, useEffect, useRef } from "react";
import { LazyImage } from "@/components/LazyImage";

const defaultMilestones: { year: string; event: string }[] = [];

const defaultSliderImages: { src: string; alt: string }[] = [];

export function Timeline({ heading, sub }: { heading?: string; sub?: string }) {
  const [data, setData] = useState<{ heading: string; sub: string; images: string[]; milestones: { year: string; event: string }[] } | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/journey`)
      .then((res) => {
        if (!res.ok) throw new Error("Journey content fetch failed");
        return res.json();
      })
      .then((d) => setData(d))
      .catch((err) => console.error("Error loading dynamic journey content:", err));
  }, []);

  const displayHeading = data?.heading || heading || "27 years, one consistent direction.";
  const displayEyebrow = data?.sub || sub || "Journey";
  const activeMilestones = (data && data.milestones && data.milestones.length > 0) ? data.milestones : defaultMilestones;
  const activeImages = (data && data.images && data.images.length > 0) ? data.images.map(img => ({ src: img, alt: "Supremo Facility" })) : defaultSliderImages;

  const [activeIndex, setActiveIndex] = useState(-1);
  const [sliderIndex, setSliderIndex] = useState(0);
  
  const trackRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const glowDotRef = useRef<HTMLDivElement>(null);
  const milestoneRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Direct, natural scroll tracking (no artificial lagging or transition delays)
  useEffect(() => {
    let ticking = false;
    let lastActiveIdx = -1;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!trackRef.current) {
            ticking = false;
            return;
          }

          const rect = trackRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Start drawing when top of track hits 70% of screen height
          // Fully drawn when bottom of track hits 30% of screen height
          const startPoint = windowHeight * 0.70;
          const endPoint = windowHeight * 0.30;
          const trackHeight = rect.height;

          const currentDistance = startPoint - rect.top;
          
          // Calculate progress percentage (0.0 to 1.0)
          const progress = Math.min(Math.max(currentDistance / (trackHeight - 16), 0), 1);

          // Direct styles without transition delays make the scrolling feel native, direct, and smooth
          if (progressLineRef.current) {
            progressLineRef.current.style.transform = `scaleY(${progress})`;
          }
          if (glowDotRef.current) {
            // Translate the dot down by progress * trackHeight (-6px to center vertically)
            const translateY = (progress * (trackHeight - 16)) - 6;
            glowDotRef.current.style.transform = `translate(-50%, ${translateY}px)`;
            glowDotRef.current.style.opacity = progress > 0.01 ? "1" : "0";
          }

          // Determine active milestone index (updates only on state boundary cross)
          let activeIdx = -1;
          milestoneRefs.current.forEach((el, idx) => {
            if (el) {
              const mRect = el.getBoundingClientRect();
              if (mRect.top < windowHeight * 0.62) {
                activeIdx = idx;
              }
            }
          });

          if (activeIdx !== lastActiveIdx) {
            lastActiveIdx = activeIdx;
            setActiveIndex(activeIdx);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial run
    setTimeout(handleScroll, 100);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeMilestones]);

  // Slider autoplay transition
  useEffect(() => {
    if (activeImages.length <= 1) return;
    const timer = setInterval(() => {
      setSliderIndex((prev) => (prev + 1) % activeImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [activeImages]);

  const handleMilestoneClick = (idx: number) => {
    const el = milestoneRefs.current[idx];
    if (el) {
      const yOffset = -window.innerHeight * 0.45;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="timeline-section" style={{ background: "var(--paper-2)", position: "relative", overflow: "hidden", borderTop: "1px solid var(--line-2)", padding: "32px 0 24px" }}>
      {/* Stylesheet containing layout structure, responsive rules and smooth micro-animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        .timeline-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }

        .timeline-left-col {
          max-width: 560px;
          width: 100%;
        }

        .timeline-track-container {
          position: relative;
          padding-left: 20px;
        }

        .timeline-bg-track {
          position: absolute;
          left: 24px;
          top: 16px;
          bottom: 16px;
          width: 4px;
          background: var(--line);
          border-radius: 4px;
        }

        .timeline-progress-track {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, var(--blue-600) 0%, var(--blue-500) 50%, var(--blue-400) 100%);
          border-radius: 4px;
          transform: scaleY(0);
          transform-origin: top;
          /* Removed transition property to lock the progress exactly 1:1 with native browser scrolling */
        }

        /* Pulsing/glowing pointer at the tip of the scrolling line */
        .progress-glow-dot {
          position: absolute;
          top: 0px;
          left: 50%;
          transform: translate(-50%, -6px);
          width: 12px;
          height: 12px;
          background: var(--blue-500);
          border-radius: 50%;
          box-shadow: 0 0 10px 3px var(--blue-500), 0 0 18px 6px rgba(47, 123, 255, 0.4);
          z-index: 11;
          pointer-events: none;
          opacity: 0;
          /* Instant translation for 1:1 scroll responsiveness, smooth transition only for fade in/out */
          transition: opacity 0.25s ease;
        }

        .milestone-item {
          position: relative;
          padding: 10px 16px;
          padding-left: 44px;
          margin-bottom: 4px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
          border-radius: var(--r-md);
          background: transparent;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .milestone-item:last-child {
          margin-bottom: 0;
        }

        .milestone-item:hover {
          background: rgba(255, 255, 255, 0.8);
          border-color: rgba(20, 102, 230, 0.08);
          transform: translateX(4px);
          box-shadow: var(--sh-sm);
        }

        .milestone-item.active:hover {
          background: rgba(20, 102, 230, 0.04);
          border-color: rgba(20, 102, 230, 0.15);
        }

        .milestone-dot {
          position: absolute;
          left: 19px;
          top: 17px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--paper-2);
          border: 3.5px solid var(--soft);
          box-shadow: 0 0 0 0px rgba(20, 102, 230, 0);
          transition: border-color 0.4s ease, background-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 10;
        }

        @keyframes dotPulse {
          0% { box-shadow: 0 0 0 0px rgba(20, 102, 230, 0.45); }
          100% { box-shadow: 0 0 0 10px rgba(20, 102, 230, 0); }
        }

        .milestone-item.active .milestone-dot {
          border-color: var(--blue-600);
          background: var(--blue-600);
          transform: scale(1.22);
          animation: dotPulse 2s infinite ease-out;
        }

        .milestone-content {
          opacity: 0.55;
          transform: translateX(-4px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }

        .milestone-item.active .milestone-content {
          opacity: 1;
          transform: translateX(0);
        }

        .milestone-year {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 800;
          color: var(--muted);
          transition: color 0.4s ease;
          line-height: 1.2;
          display: inline-block;
        }

        .milestone-item.active .milestone-year {
          color: var(--blue-700);
        }

        .milestone-desc {
          color: var(--slate);
          font-size: 13.5px;
          line-height: 1.5;
          margin-top: 2px;
          transition: color 0.4s ease;
        }

        .milestone-item.active .milestone-desc {
          color: var(--ink);
          font-weight: 500;
        }

        /* Image Slider styles — standard horizontal sliding track */
        .slider-wrapper {
          position: relative;
          width: 100%;
          max-width: 480px;
          height: 420px;
          margin: 0 auto;
        }

        .slider-container {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: var(--r-lg);
          overflow: hidden;
          box-shadow: 0 30px 60px -18px rgba(10, 22, 40, 0.22), 0 0 0 1px rgba(255, 255, 255, 0.05);
          background: var(--ink);
        }

        .slider-track {
          display: flex;
          height: 100%;
          width: 300%;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .slider-slide {
          position: relative;
          width: 33.333333%;
          height: 100%;
        }

        .slider-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .slider-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10, 22, 40, 0.85) 0%, rgba(10, 22, 40, 0.3) 50%, rgba(10, 22, 40, 0) 100%);
          z-index: 3;
        }

        /* Glassmorphic floating text card inside slider */
        .slider-text-content {
          position: absolute;
          bottom: 20px;
          left: 20px;
          right: 20px;
          background: rgba(10, 22, 40, 0.68);
          backdrop-filter: blur(12px) saturate(180%);
          -webkit-backdrop-filter: blur(12px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--r-md);
          padding: 16px 20px;
          color: #ffffff;
          z-index: 4;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease;
        }

        .slider-title {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 4px;
          letter-spacing: -0.01em;
          color: #fff;
        }

        .slider-desc {
          font-size: 12.5px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.8);
        }

        /* Navigation controls */
        .slider-indicators {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 16px;
        }

        .indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--soft);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .indicator-dot.active {
          background: var(--blue-600);
          width: 24px;
          border-radius: 4px;
        }

        @media (max-width: 1024px) {
          .timeline-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .timeline-left-col {
            max-width: 100%;
          }
          .slider-wrapper {
            max-width: 480px;
            height: 360px;
          }
        }

        @media (max-width: 480px) {
          .timeline-track-container {
            padding-left: 12px;
          }
          .timeline-bg-track {
            left: 16px;
          }
          .milestone-item {
            padding-left: 36px;
          }
          .milestone-dot {
            left: 11px;
            width: 12px;
            height: 12px;
          }
          .slider-wrapper {
            height: 320px;
          }
        }
      `}} />

      <div className="container">
        <div className="timeline-grid">
          {/* Left Column — Animated Compact Timeline */}
          <div className="timeline-left-col">
            <span className="eyebrow">{displayEyebrow}</span>
            <h2 style={{ marginTop: 14, marginBottom: 28 }}>
              {displayHeading}
            </h2>

            <div className="timeline-track-container" ref={trackRef}>
              {/* Background Track */}
              <div className="timeline-bg-track">
                {/* Scroll-animated Progress Line */}
                <div 
                  ref={progressLineRef}
                  className="timeline-progress-track"
                />
                {/* Glowing tip at scroll position */}
                <div 
                  ref={glowDotRef}
                  className="progress-glow-dot" 
                />
              </div>

              {/* Milestones */}
              {activeMilestones.map((t, i) => {
                const isActive = i <= activeIndex;
                return (
                  <div
                    key={t.year + "-" + i}
                    ref={(el) => {
                      milestoneRefs.current[i] = el;
                    }}
                    className={`milestone-item ${isActive ? "active" : ""}`}
                    onClick={() => handleMilestoneClick(i)}
                  >
                    <div className="milestone-dot" />
                    <div className="milestone-content">
                      <span className="milestone-year">{t.year}</span>
                      <p className="milestone-desc">{t.event}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column — Image Slider (Simple side-by-side transition) */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="slider-wrapper">
              {activeImages.length === 0 ? (
                <div style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "var(--r-lg)",
                  background: "var(--paper-2)",
                  border: "1px dashed var(--line)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--muted)",
                  gap: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: "var(--font-display)",
                  boxShadow: "0 30px 60px -18px rgba(10, 22, 40, 0.22), 0 0 0 1px rgba(255, 255, 255, 0.05)"
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                  <span>No image uploaded</span>
                </div>
              ) : (
                <>
                  <div className="slider-container">
                    <div 
                      className="slider-track"
                      style={{
                        transform: `translateX(-${sliderIndex * (100 / activeImages.length)}%)`,
                        width: `${activeImages.length * 100}%`
                      }}
                    >
                      {activeImages.map((img, index) => (
                        <div key={index} className="slider-slide" style={{ width: `${100 / activeImages.length}%` }}>
                          <LazyImage src={img.src} alt={img.alt} className="slider-img" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Navigation Indicators */}
                  <div className="slider-indicators">
                    {activeImages.map((_, i) => (
                      <button
                        key={i}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`indicator-dot ${i === sliderIndex ? "active" : ""}`}
                        onClick={() => setSliderIndex(i)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
