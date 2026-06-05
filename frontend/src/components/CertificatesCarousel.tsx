"use client";

import { useState, useEffect, useRef } from "react";

const certificates = [
  { id: 1, image: "/images/certificates/1.png", title: "Certificate 1" },
  { id: 2, image: "/images/certificates/2.png", title: "Certificate 2" },
  { id: 3, image: "/images/certificates/3.png", title: "Certificate 3" },
  { id: 4, image: "/images/certificates/4.png", title: "Certificate 4" },
  { id: 5, image: "/images/certificates/1.png", title: "Certificate 5 (Dummy)" }
];

export function CertificatesCarousel() {
  const n = certificates.length;
  // Triple the array to achieve seamless infinite looping
  const extendedCertificates = [...certificates, ...certificates, ...certificates];
  
  const [currentIndex, setCurrentIndex] = useState(n); // Start at the middle set
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [visibleCards, setVisibleCards] = useState(4);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamic visible cards checking for responsive sliding bounds
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        setVisibleCards(1);
      } else if (window.innerWidth <= 800) {
        setVisibleCards(2);
      } else if (window.innerWidth <= 1100) {
        setVisibleCards(3);
      } else {
        setVisibleCards(4); // 4 visible cards on screen
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-scroll logic in one direction
  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 4000);
  };

  const stopAutoPlay = () => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  // Listen to index changes and perform invisible jumps to achieve infinite loop
  useEffect(() => {
    if (currentIndex >= 2 * n) {
      const timer = setTimeout(() => {
        setIsTransitionEnabled(false);
        setCurrentIndex(n);
      }, 300); // Wait for transition duration to finish
      return () => clearTimeout(timer);
    }
    if (currentIndex < n) {
      const timer = setTimeout(() => {
        setIsTransitionEnabled(false);
        setCurrentIndex(2 * n - 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, n]);

  // Re-enable transitions in the next tick after a jump
  useEffect(() => {
    if (!isTransitionEnabled) {
      const timer = setTimeout(() => {
        setIsTransitionEnabled(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitionEnabled]);

  const handlePrev = () => {
    stopAutoPlay();
    setCurrentIndex((prev) => prev - 1);
    startAutoPlay();
  };

  const handleNext = () => {
    stopAutoPlay();
    setCurrentIndex((prev) => prev + 1);
    startAutoPlay();
  };

  return (
    <section 
      style={{ 
        background: "var(--paper-2)", 
        borderTop: "1px solid var(--line)", 
        borderBottom: "1px solid var(--line)",
        overflow: "hidden",
        padding: 0
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .cert-header-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.9fr;
          gap: clamp(32px, 5vw, 64px);
          align-items: center;
          margin-bottom: 36px;
        }

        .cert-header-left {
          max-width: 600px;
        }

        .cert-image-container {
          position: relative;
          border-radius: var(--r-md);
          overflow: hidden;
          border: 1px solid var(--line);
          box-shadow: var(--sh-md);
          aspect-ratio: 16 / 9;
          background: var(--ink);
        }

        .cert-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Overlay navigation buttons */
        .cert-carousel-controls {
          position: absolute;
          bottom: 0;
          right: 0;
          display: flex;
          background: var(--ink);
          z-index: 10;
        }

        .cert-control-btn {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: #ffffff;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
          padding: 0;
          outline: none;
        }

        .cert-control-btn:hover {
          background: var(--blue-600);
        }

        .cert-control-btn:first-child {
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Carousel view viewport */
        .cert-carousel-viewport {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 4px 0 12px 0;
        }

        .cert-carousel-track {
          display: flex;
          gap: 20px;
          will-change: transform;
        }

        .cert-card {
          flex: 0 0 calc((100% - (var(--cards-visible) - 1) * 20px) / var(--cards-visible));
          min-width: 0;
          aspect-ratio: 1 / 1.41; /* A4 aspect ratio for framed look */
          background: #ffffff;
          border: 1px solid var(--line);
          border-radius: var(--r-sm);
          overflow: hidden;
          box-shadow: var(--sh-sm);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px; /* Smaller padding for more compact cards */
        }

        .cert-card:hover {
          transform: translateY(-4px); /* Subtle hover lift */
          box-shadow: var(--sh-md);
          border-color: var(--blue-200);
        }

        .cert-card-img-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .cert-card-img-wrapper img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: var(--r-xs);
          box-shadow: 0 3px 12px rgba(10, 22, 40, 0.06);
          border: 1px solid var(--line-2);
          transition: transform 0.4s ease;
        }

        .cert-card:hover .cert-card-img-wrapper img {
          transform: scale(1.03);
        }

        /* Lightbox modal styles */
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(14, 26, 48, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: lightbox-fade 0.25s ease-out;
        }

        .lightbox-content {
          position: relative;
          max-width: 90vw;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: lightbox-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .lightbox-img {
          max-width: 100%;
          max-height: 80vh;
          object-fit: contain;
          border-radius: var(--r-md);
          box-shadow: 0 24px 60px rgba(0,0,0,0.5);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .lightbox-close {
          position: absolute;
          top: -48px;
          right: 0;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .lightbox-close:hover {
          background: var(--blue-600);
          border-color: var(--blue-400);
          transform: scale(1.05);
        }

        @keyframes lightbox-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes lightbox-pop {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @media (max-width: 900px) {
          .cert-header-grid {
            grid-template-columns: 1fr;
            gap: 24px;
            margin-bottom: 24px;
          }
          .cert-header-left {
            max-width: 100%;
          }
          .cert-image-container {
            aspect-ratio: 16 / 9;
            max-width: 500px;
          }
        }
      `}} />

      <div 
        className="container" 
        style={{ 
          paddingTop: "clamp(48px, 6vw, 72px)",
          paddingBottom: "clamp(48px, 6vw, 72px)",
          "--cards-visible": visibleCards
        } as React.CSSProperties}
      >
        {/* Top Header section */}
        <div className="cert-header-grid">
          <div className="cert-header-left">
            <span className="eyebrow">Quality & Standards</span>
            <h2 style={{ marginTop: 12, marginBottom: 16 }}>
              Awards & Certifications
            </h2>
            <p style={{ color: "var(--slate)", fontSize: 15.5, lineHeight: 1.65 }}>
              Supremo India is committed to delivering polymer products that stand up to the most demanding conditions. Our modern manufacturing processes are fully compliant with national and international quality frameworks, ensuring safety, durability, and performance.
            </p>
          </div>

          <div className="cert-image-container">
            <img 
              src="/images/DJI_0695.jpg" 
              alt="Supremo Indore Manufacturing Campus" 
            />
            {/* Carousel navigation controls overlay */}
            <div className="cert-carousel-controls">
              <button 
                onClick={handlePrev}
                className="cert-control-btn"
                aria-label="Previous certificates"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button 
                onClick={handleNext}
                className="cert-control-btn"
                aria-label="Next certificates"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Carousel section */}
        <div className="cert-carousel-viewport">
          <div 
            className="cert-carousel-track"
            style={{
              transform: `translate3d(calc(-1 * ${currentIndex} * (100% + 20px) / ${visibleCards}), 0, 0)`,
              transition: isTransitionEnabled ? "transform 0.3s cubic-bezier(0.25, 1, 0.33, 1)" : "none"
            }}
          >
            {extendedCertificates.map((cert, idx) => (
              <div 
                key={`${cert.id}-${idx}`} 
                className="cert-card"
                onClick={() => setLightboxImage(cert.image)}
              >
                <div className="cert-card-img-wrapper">
                  <img src={cert.image} alt={cert.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox modal for full view of certificate */}
      {lightboxImage && (
        <div className="lightbox-overlay" onClick={() => setLightboxImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightboxImage(null)} aria-label="Close Lightbox">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <img src={lightboxImage} alt="Certificate Detail" className="lightbox-img" />
          </div>
        </div>
      )}
    </section>
  );
}
