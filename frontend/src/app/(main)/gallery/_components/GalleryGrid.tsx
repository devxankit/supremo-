"use client";

import { useState, useEffect } from "react";

const filters = ["All", "Factory", "Team", "Dispatch"];

interface Item {
  title: string;
  category: string;
  image: string;
  span?: boolean;
}

const items: Item[] = [
  { title: "Aerial View — Manufacturing Complex", category: "Factory", image: "/images/DJI_0695.jpg", span: true },
  { title: "Rotomoulding Production Floor", category: "Factory", image: "/images/DJI_0629.jpg" },
  { title: "Skilled Workforce on the Line", category: "Team", image: "/images/DSC_1520.jpg" },
  { title: "Pan-India Dispatch Fleet", category: "Dispatch", image: "/images/DSC_1441.jpg", span: true },
];

function Icon({ category }: { category: string }) {
  const common = { width: 40, height: 40, viewBox: "0 0 24 24", fill: "none", stroke: "rgba(255,255,255,.55)", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (category === "Factory")
    return (
      <svg {...common}>
        <path d="M2 20h20M4 20V8l6 4V8l6 4V8l4 3v9" />
      </svg>
    );
  if (category === "Dispatch")
    return (
      <svg {...common}>
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

export function GalleryGrid() {
  const [active, setActive] = useState("All");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

  // Keyboard navigation
  useEffect(() => {
    if (selectedIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedIdx(null);
      } else if (e.key === "ArrowRight") {
        setSelectedIdx((prev) => (prev !== null ? (prev + 1) % filtered.length : null));
      } else if (e.key === "ArrowLeft") {
        setSelectedIdx((prev) => (prev !== null ? (prev - 1 + filtered.length) % filtered.length : null));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx, filtered.length]);

  return (
    <>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
        {filters.map((f) => {
          const isActive = f === active;
          return (
            <button
              key={f}
              onClick={() => {
                setActive(f);
                setSelectedIdx(null); // Reset lightbox when category changes
              }}
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "var(--font-display)",
                cursor: "pointer",
                background: isActive ? "var(--blue-600)" : "var(--paper-2)",
                color: isActive ? "#fff" : "var(--slate)",
                border: `1px solid ${isActive ? "var(--blue-600)" : "var(--line)"}`,
                transition: "background .15s, color .15s",
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      <div
        className="gallery-grid mob-1col mob-gap-sm"
        style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          .gallery-card {
            border-radius: var(--r-md);
            overflow: hidden;
            border: 1px solid var(--line);
            min-height: 240px;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 22px;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 4px 20px rgba(10, 22, 40, 0.02);
            cursor: pointer;
          }
          .gallery-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 16px 32px -12px rgba(10, 22, 40, 0.15), 0 0 0 1px rgba(14, 85, 188, 0.12);
            border-color: rgba(14, 85, 188, 0.18);
          }
          .gallery-card .gallery-img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 1;
          }
          .gallery-card:hover .gallery-img {
            transform: scale(1.08);
          }
          .gallery-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(10, 22, 40, 0.85) 0%, rgba(10, 22, 40, 0.45) 60%, rgba(10, 22, 40, 0.1) 100%);
            z-index: 2;
            transition: background 0.3s ease;
          }
          .gallery-card:hover .gallery-overlay {
            background: linear-gradient(to top, rgba(10, 22, 40, 0.9) 0%, rgba(10, 22, 40, 0.5) 60%, rgba(10, 22, 40, 0.15) 100%);
          }
          .gallery-content {
            position: relative;
            z-index: 3;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex: 1;
          }
          /* Tablet: 3 → 2 columns; wide cards span the full row */
          @media (max-width: 1024px) and (min-width: 769px) {
            .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          /* Mobile: single column — neutralise the inline "span 2" so wide
             cards don't spawn an extra implicit column and break the grid */
          @media (max-width: 768px) {
            .gallery-card { grid-column: auto !important; min-height: 200px; }
          }

          /* Lightbox CSS */
          .lightbox-close-btn:hover, .lightbox-nav-btn:hover {
            background: rgba(255, 255, 255, 0.15) !important;
            border-color: rgba(255, 255, 255, 0.3) !important;
            transform: scale(1.05);
          }
          .lightbox-close-btn:active, .lightbox-nav-btn:active {
            transform: scale(0.95);
          }
          @keyframes lightbox-zoom {
            from { transform: scale(0.96); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          @keyframes lightbox-fade {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @media (max-width: 768px) {
            .lightbox-nav-btn {
              width: 48px !important;
              height: 48px !important;
              bottom: 24px !important;
              top: auto !important;
            }
            .lightbox-nav-btn.prev {
              left: calc(50% - 60px) !important;
            }
            .lightbox-nav-btn.next {
              right: calc(50% - 60px) !important;
            }
            .lightbox-image-container {
              max-height: 55vh !important;
              width: 90vw !important;
            }
            .lightbox-close-btn {
              top: 16px !important;
              right: 16px !important;
            }
          }
        `}} />
        {filtered.map((item, index) => (
          <div
            key={item.title}
            className="gallery-card"
            style={{
              gridColumn: item.span ? "span 2" : "span 1",
            }}
            onClick={() => setSelectedIdx(index)}
          >
            {/* Background Image */}
            <img 
              src={item.image} 
              alt={item.title} 
              className="gallery-img"
            />
            {/* Dark Overlay */}
            <div className="gallery-overlay" />

            {/* Content overlay */}
            <div className="gallery-content">
              <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Icon category={item.category} />
                <span
                  style={{
                    padding: "4px 12px",
                    background: "rgba(255,255,255,.14)",
                    color: "#fff",
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: 600,
                    fontFamily: "var(--font-display)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {item.category}
                </span>
              </div>
              <h3 style={{ color: "#fff", fontSize: 17, fontWeight: 700, lineHeight: 1.35 }}>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {selectedIdx !== null && (
        <div
          onClick={() => setSelectedIdx(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(8, 16, 30, 0.92)",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            animation: "lightbox-zoom 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedIdx(null)}
            style={{
              position: "absolute",
              top: 24,
              right: 24,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff",
              borderRadius: "50%",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              zIndex: 10001,
            }}
            className="lightbox-close-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Left Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIdx((prev) => (prev !== null ? (prev - 1 + filtered.length) % filtered.length : null));
            }}
            style={{
              position: "absolute",
              left: 24,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff",
              borderRadius: "50%",
              width: 56,
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              zIndex: 10001,
            }}
            className="lightbox-nav-btn prev"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIdx((prev) => (prev !== null ? (prev + 1) % filtered.length : null));
            }}
            style={{
              position: "absolute",
              right: 24,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff",
              borderRadius: "50%",
              width: 56,
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              zIndex: 10001,
            }}
            className="lightbox-nav-btn next"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Lightbox Image Container */}
          <div
            className="lightbox-image-container"
            style={{
              maxWidth: "min(900px, 85vw)",
              maxHeight: "70vh",
              borderRadius: "var(--r-md)",
              overflow: "hidden",
              boxShadow: "0 32px 64px -16px rgba(0, 0, 0, 0.6)",
              background: "#050b14",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              zIndex: 10000,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[selectedIdx].image}
              alt={filtered[selectedIdx].title}
              style={{
                maxWidth: "100%",
                maxHeight: "70vh",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Caption */}
          <div
            style={{
              marginTop: 24,
              textAlign: "center",
              color: "#fff",
              animation: "lightbox-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1) both",
              padding: "0 24px",
              maxWidth: "min(600px, 85vw)",
              zIndex: 10000,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              style={{
                display: "inline-block",
                padding: "4px 12px",
                background: "rgba(255, 255, 255, 0.08)",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 600,
                fontFamily: "var(--font-display)",
                backdropFilter: "blur(4px)",
                marginBottom: 10,
                color: "var(--blue-200)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {filtered[selectedIdx].category}
            </span>
            <h3 style={{ fontSize: "clamp(18px, 2.2vw, 24px)", fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
              {filtered[selectedIdx].title}
            </h3>
          </div>
        </div>
      )}
    </>
  );
}
