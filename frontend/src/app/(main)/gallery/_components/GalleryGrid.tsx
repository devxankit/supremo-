"use client";

import { useState } from "react";

const filters = ["All", "Factory", "Products", "Events", "Dealer Meets"];

interface Item {
  title: string;
  category: string;
  image: string;
  span?: boolean;
}

const items: Item[] = [
  { title: "Rotomoulding Line — Indore Plant", category: "Factory", image: "/images/cat_tanks.png", span: true },
  { title: "Triple Layer Tank Shoot", category: "Products", image: "/images/overhead_tank.png" },
  { title: "QC Lab — Pressure Testing", category: "Factory", image: "/images/pipe_hdpe.png" },
  { title: "Dealer Meet 2025 — Pune", category: "Dealer Meets", image: "/images/image 1.png" },
  { title: "CPVC Pipe Range", category: "Products", image: "/images/plumbing_pipes.png" },
  { title: "Plastindia Exhibition Booth", category: "Events", image: "/images/cat_pipes.png", span: true },
  { title: "Warehouse Dispatch Bay", category: "Factory", image: "/images/cat_accessories.png" },
  { title: "Planter Collection", category: "Products", image: "/images/terrazzo_planter.png" },
  { title: "South Zone Dealer Conclave", category: "Dealer Meets", image: "/images/image 1.png" },
  { title: "Extrusion Line — Pune Plant", category: "Factory", image: "/images/pipe_pvc.png" },
  { title: "Annual Sales Awards Night", category: "Events", image: "/images/6 Layers Gold.png" },
  { title: "Utility Products Range", category: "Products", image: "/images/acc_milk_can.png" },
];

function Icon({ category }: { category: string }) {
  const common = { width: 40, height: 40, viewBox: "0 0 24 24", fill: "none", stroke: "rgba(255,255,255,.55)", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (category === "Factory")
    return (
      <svg {...common}>
        <path d="M2 20h20M4 20V8l6 4V8l6 4V8l4 3v9" />
      </svg>
    );
  if (category === "Products")
    return (
      <svg {...common}>
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
      </svg>
    );
  if (category === "Events")
    return (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
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

  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
        {filters.map((f) => {
          const isActive = f === active;
          return (
            <button
              key={f}
              onClick={() => setActive(f)}
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
        `}} />
        {filtered.map((item) => (
          <div
            key={item.title}
            className="gallery-card"
            style={{
              gridColumn: item.span ? "span 2" : "span 1",
            }}
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
    </>
  );
}
