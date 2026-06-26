"use client";

import React, { useState, useEffect } from "react";

// Map icon keys to inline SVG paths
const ICON_MAP: Record<string, React.ReactNode> = {
  shield: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
  certified: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L4 7v8c0 5 8 7 8 7s8-2 8-7V7l-8-5z" /><path d="M9 12l2 2 4-4" />
    </svg>
  ),
  warranty: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  supply: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  portal: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
      <polyline points="8 16 12 12 16 16" /><line x1="12" y1="12" x2="12" y2="21" />
    </svg>
  ),
  support: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
};

const TAG_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  blue: { bg: "rgba(36,89,230,0.04)", border: "var(--blue-600)", text: "var(--blue-700)" },
  green: { bg: "rgba(31,174,106,0.04)", border: "var(--ok)", text: "var(--ok)" },
  dark: { bg: "rgba(10,22,40,0.03)", border: "#111827", text: "#111827" },
};

interface Tag { label: string; color: string }
interface Card {
  title: string;
  description: string;
  iconKey: string;
  highlightType: "tags" | "stat" | "badge" | "order";
  tags: Tag[];
  statValue: string;
  statLabel: string;
  statColor: string;
  badgeText: string;
  orderLabel: string;
  orderStatus: string;
}
interface WhyUsData {
  heading: string;
  sub: string;
  cards: Card[];
}

const DEFAULT_DATA: WhyUsData = {
  heading: "Why Supremo",
  sub: "Quality, reach and support that grows your business.",
  cards: [
    { title: "Triple-Layer Protection", description: "Co-extruded layers keep water cooler, safer, and algae-free.", iconKey: "shield", highlightType: "tags", tags: [{ label: "UV Shield", color: "blue" }, { label: "Anti-Algae", color: "dark" }, { label: "FDA LLDPE", color: "green" }], statValue: "", statLabel: "", statColor: "", badgeText: "", orderLabel: "", orderStatus: "" },
    { title: "ISI Standards", description: "IS 12701 & IS 4985 certified products.", iconKey: "certified", highlightType: "badge", tags: [], statValue: "", statLabel: "", statColor: "", badgeText: "ISO 9001:2015 AUDITED", orderLabel: "", orderStatus: "" },
    { title: "10-Year Warranty", description: "Long-term peace of mind on all purchases.", iconKey: "warranty", highlightType: "stat", tags: [], statValue: "10 Yrs", statLabel: "Coverage Warranty", statColor: "var(--blue-600)", badgeText: "", orderLabel: "", orderStatus: "" },
    { title: "Supply Chain", description: "Pan-India logistics with regional plants and depots.", iconKey: "supply", highlightType: "tags", tags: [{ label: "4 Plants", color: "dark" }, { label: "9 Depots", color: "dark" }], statValue: "", statLabel: "", statColor: "", badgeText: "", orderLabel: "", orderStatus: "" },
    { title: "Digital Portal", description: "Real-time tracking and online ordering for all dealers.", iconKey: "portal", highlightType: "order", tags: [], statValue: "", statLabel: "", statColor: "", badgeText: "", orderLabel: "Order #784", orderStatus: "IN TRANSIT" },
    { title: "Support SLA", description: "Dedicated assistance for seamless resolution.", iconKey: "support", highlightType: "stat", tags: [], statValue: "6 Hrs", statLabel: "Resolution SLA", statColor: "var(--ok)", badgeText: "", orderLabel: "", orderStatus: "" },
  ],
};

function CardHighlight({ card }: { card: Card }) {
  if (card.highlightType === "tags" && card.tags?.length > 0) {
    return (
      <div style={{ display: "flex", gap: 4, marginTop: 10, flexWrap: "wrap" }}>
        {card.tags.map((tag, i) => {
          const c = TAG_COLORS[tag.color] || TAG_COLORS.dark;
          return (
            <div key={i} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "3px 4px", background: c.bg, borderRadius: 4, borderLeft: `2px solid ${c.border}` }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: c.text }}>{tag.label}</span>
            </div>
          );
        })}
      </div>
    );
  }

  if (card.highlightType === "badge" && card.badgeText) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9.5, fontWeight: 700, color: "var(--blue-600)", background: "var(--blue-50)", padding: "4px 8px", borderRadius: 4, marginTop: 10, letterSpacing: "0.02em" }}>
        {card.badgeText}
      </div>
    );
  }

  if (card.highlightType === "stat" && card.statValue) {
    return (
      <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 10 }}>
        <span style={{ fontSize: 22, fontWeight: 900, color: card.statColor || "var(--blue-600)", lineHeight: 1 }}>{card.statValue}</span>
        {card.statLabel && <span style={{ fontSize: 10, fontWeight: 600, color: "var(--muted)" }}>{card.statLabel}</span>}
      </div>
    );
  }

  if (card.highlightType === "order" && card.orderLabel) {
    return (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, padding: "4px 8px", background: "var(--paper-2)", borderRadius: 4, border: "1px solid var(--line-2)", fontSize: 9, fontWeight: 600, color: "var(--slate)" }}>
        <span>{card.orderLabel}</span>
        <span style={{ color: "var(--ok)", fontWeight: 700 }}>{card.orderStatus}</span>
      </div>
    );
  }

  return null;
}

export function WhyUs({ heading, sub }: { heading?: string; sub?: string }) {
  const [data, setData] = useState<WhyUsData | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/why-us`)
      .then((res) => {
        if (!res.ok) throw new Error("Why Us fetch failed");
        return res.json();
      })
      .then((d) => setData(d))
      .catch((err) => console.error("Error loading why-us content:", err));
  }, []);

  const displayHeading = data?.heading || heading || DEFAULT_DATA.heading;
  const displaySub = data?.sub || sub || DEFAULT_DATA.sub;
  const cards = data?.cards?.length ? data.cards : DEFAULT_DATA.cards;

  return (
    <section className="whyus-section" style={{ position: "relative", overflow: "hidden" }}>
      {/* Glow Effects */}
      <div className="whyus-bg-glow" />
      
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .whyus-section {
            background-color: var(--paper-2);
            background-image: radial-gradient(var(--line) 1px, transparent 1px);
            background-size: 24px 24px;
            padding: clamp(40px, 5vw, 56px) 0;
          }
          
          .whyus-bg-glow {
            position: absolute;
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(36,89,230,0.04) 0%, transparent 70%);
            top: -100px;
            right: -100px;
            pointer-events: none;
            z-index: 0;
          }

          .whyus-header {
            margin-bottom: 28px;
          }

          .whyus-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }

          .whyus-card {
            position: relative;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-radius: var(--r-md);
            border: 1px solid var(--line-2);
            padding: 16px 18px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 4px 12px rgba(10, 22, 40, 0.015);
            overflow: hidden;
            cursor: default;
            min-height: 165px;
          }

          .whyus-card:hover {
            transform: translateY(-4px);
            border-color: var(--blue-300);
            background: #ffffff;
            box-shadow: 0 20px 38px -12px rgba(14, 85, 188, 0.08), 0 0 0 1px var(--blue-200);
          }

          .whyus-icon-box {
            width: 32px;
            height: 32px;
            display: grid;
            place-items: center;
            border-radius: 6px;
            background: var(--blue-50);
            color: var(--blue-600);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            flex-shrink: 0;
          }

          .whyus-card:hover .whyus-icon-box {
            transform: scale(1.06) rotate(3deg);
            background: var(--blue-600) !important;
            color: #ffffff !important;
            box-shadow: 0 4px 10px rgba(14, 85, 188, 0.15);
          }

          .whyus-card-title {
            font-size: 14.5px;
            font-weight: 700;
            color: var(--ink);
            line-height: 1.35;
          }

          .whyus-card-desc {
            color: var(--muted);
            font-size: 12px;
            line-height: 1.45;
            margin-top: 6px;
          }

          @media (max-width: 1024px) {
            .whyus-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 640px) {
            .whyus-grid {
              grid-template-columns: 1fr;
              gap: 14px;
            }
            .whyus-card {
              min-height: auto;
              padding: 16px;
            }
          }
        `}} />

        <div className="whyus-header">
          <h2>{displayHeading}</h2>
          {displaySub && <p style={{ color: "var(--muted)", fontSize: 16, marginTop: 8 }}>{displaySub}</p>}
        </div>

        <div className="whyus-grid">
          {cards.map((card, idx) => (
            <div key={idx} className="whyus-card">
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <div className="whyus-icon-box">
                    {ICON_MAP[card.iconKey] || ICON_MAP.shield}
                  </div>
                  <span className="whyus-card-title">{card.title}</span>
                </div>
                <p className="whyus-card-desc">{card.description}</p>
              </div>
              <CardHighlight card={card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
