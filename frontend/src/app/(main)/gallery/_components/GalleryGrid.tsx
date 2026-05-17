"use client";

import { useState } from "react";

const filters = ["All", "Factory", "Products", "Events", "Dealer Meets"];

interface Item {
  title: string;
  category: string;
  span?: boolean;
}

const items: Item[] = [
  { title: "Rotomoulding Line — Indore Plant", category: "Factory", span: true },
  { title: "Triple Layer Tank Shoot", category: "Products" },
  { title: "QC Lab — Pressure Testing", category: "Factory" },
  { title: "Dealer Meet 2025 — Pune", category: "Dealer Meets" },
  { title: "CPVC Pipe Range", category: "Products" },
  { title: "Plastindia Exhibition Booth", category: "Events", span: true },
  { title: "Warehouse Dispatch Bay", category: "Factory" },
  { title: "Planter Collection", category: "Products" },
  { title: "South Zone Dealer Conclave", category: "Dealer Meets" },
  { title: "Extrusion Line — Pune Plant", category: "Factory" },
  { title: "Annual Sales Awards Night", category: "Events" },
  { title: "Utility Products Range", category: "Products" },
];

const catColor: Record<string, string> = {
  Factory: "linear-gradient(135deg,var(--blue-800),var(--ink))",
  Products: "linear-gradient(135deg,var(--blue-600),var(--blue-900))",
  Events: "linear-gradient(135deg,var(--blue-700),#062D6B)",
  "Dealer Meets": "linear-gradient(135deg,var(--ink-2),var(--blue-800))",
};

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
        className="mob-1col mob-gap-sm"
        style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}
      >
        {filtered.map((item) => (
          <div
            key={item.title}
            className="hover-lift-sm"
            style={{
              gridColumn: item.span ? "span 2" : "span 1",
              borderRadius: "var(--r-md)",
              overflow: "hidden",
              border: "1px solid var(--line)",
              background: catColor[item.category],
              minHeight: 220,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: 22,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
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
                }}
              >
                {item.category}
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)",
                backgroundSize: "40px 40px",
                pointerEvents: "none",
              }}
            />
            <h3 style={{ color: "#fff", fontSize: 17, lineHeight: 1.35, position: "relative" }}>{item.title}</h3>
          </div>
        ))}
      </div>
    </>
  );
}
