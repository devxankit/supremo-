"use client";

import Link from "next/link";

import { useState, useEffect } from "react";

interface RegionCard {
  name: string;
  states: string;
  accent: string;
}

interface DealerNetworkData {
  heading: string;
  headingHighlight: string;
  sub: string;
  tagLine: string;
  cards: RegionCard[];
}

function resolveColors(accent: string) {
  let hex = accent || "#6E97F2";
  if (hex === "var(--blue-400)") {
    hex = "#6E97F2";
  }
  // Convert hex to rgb to make rgba glow and border
  let clean = hex.replace("#", "");
  if (clean.length === 3) {
    clean = clean[0] + clean[0] + clean[1] + clean[1] + clean[2] + clean[2];
  }
  const r = parseInt(clean.substring(0, 2), 16) || 110;
  const g = parseInt(clean.substring(2, 4), 16) || 151;
  const b = parseInt(clean.substring(4, 6), 16) || 242;
  return {
    accent: hex,
    glow: `rgba(${r}, ${g}, ${b}, 0.22)`,
    border: `rgba(${r}, ${g}, ${b}, 0.35)`,
  };
}

export function DealerNetwork({ heading, sub }: { heading?: string; sub?: string }) {
  const [apiData, setApiData] = useState<DealerNetworkData | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/dealer-network`)
      .then((res) => {
        if (!res.ok) throw new Error("Dealer Network fetch failed");
        return res.json();
      })
      .then((d) => setApiData(d))
      .catch((err) => console.error("Error loading dealer network content:", err));
  }, []);

  const displayHeading = apiData?.heading || heading || "A pan-India network,";
  const displayHeadingHighlight = apiData?.headingHighlight || "built on reliability.";
  const displaySub = apiData?.sub || sub || "From metro distributors to rural hardware outlets — protected territories, stocked regional hubs, and a team that picks up the phone.";
  const displayTagLine = apiData?.tagLine || "Live across four regions";
  const regions = apiData?.cards ?? [];

  return (
    <section style={{ background: "var(--paper-2)", borderTop: "1px solid var(--line-2)", borderBottom: "1px solid var(--line-2)", position: "relative", overflow: "hidden", padding: "48px 0 40px" }}>
      {/* Ambient glow + grid */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 15% 25%, rgba(20, 102, 230, 0.05), transparent 55%)", zIndex: 0 }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(10, 22, 40, 0.02) 1px, transparent 1px)", backgroundSize: "32px 32px", zIndex: 0 }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .network-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 72px;
            align-items: center;
          }

          .region-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 18px;
          }

          .region-card {
            background: #ffffff;
            border: 1px solid var(--line);
            border-radius: var(--r-md);
            padding: 26px 24px;
            position: relative;
            overflow: hidden;
            transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.4s ease, background 0.4s ease, box-shadow 0.4s ease;
            box-shadow: var(--sh-sm);
          }

          .region-card::before {
            content: "";
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at 80% 12%, var(--c-glow), transparent 60%);
            opacity: 0;
            transition: opacity 0.4s ease;
            pointer-events: none;
          }

          .region-card:hover {
            transform: translateY(-6px);
            border-color: var(--c-border);
            background: #ffffff;
            box-shadow: var(--sh-lg);
          }

          .region-card:hover::before { opacity: 1; }

          .region-top {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 14px;
            position: relative;
            z-index: 1;
          }

          .region-name {
            font-family: var(--font-display);
            font-size: 20px;
            font-weight: 700;
            color: var(--ink);
            letter-spacing: -0.01em;
          }

          .pulse-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: var(--c-accent);
            position: relative;
          }

          .pulse-dot::after {
            content: "";
            position: absolute;
            width: 8px;
            height: 8px;
            top: 0;
            left: 0;
            border-radius: 50%;
            background-color: var(--c-accent);
            animation: ping-ring 2s infinite ease-out;
          }

          @keyframes ping-ring {
            0% { transform: scale(1); opacity: 0.7; }
            100% { transform: scale(3.2); opacity: 0; }
          }

          .region-states {
            font-size: 12.5px;
            line-height: 1.65;
            color: var(--muted);
            position: relative;
            z-index: 1;
            transition: color 0.4s ease;
          }

          .region-card:hover .region-states { color: var(--slate); }

          .net-tagline {
            display: flex;
            align-items: center;
            gap: 10px;
            color: var(--muted);
            font-size: 13px;
            margin: 28px 0 36px;
          }

          .net-tagline .line {
            width: 28px;
            height: 1px;
            background: var(--line);
          }

          @media (max-width: 900px) {
            .network-grid { grid-template-columns: 1fr; gap: 48px; }
          }
        `}} />

        <div className="network-grid">
          {/* Left — copy */}
          <div>
            <span className="eyebrow">Dealer Network</span>
            <h2 style={{ color: "var(--ink)", marginTop: 18, marginBottom: 20 }}>
              {displayHeading}
              {displayHeadingHighlight && (
                <span style={{ display: "block", color: "var(--blue-600)" }}>{displayHeadingHighlight}</span>
              )}
            </h2>
            <p style={{ color: "var(--slate)", maxWidth: "44ch" }}>
              {displaySub}
            </p>

            <div className="net-tagline">
              <span className="line" />
              <span>{displayTagLine}</span>
            </div>

            <Link href="/dealership" className="btn">
              Become a Dealer
              <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </Link>
          </div>

          {/* Right — minimal regional grid */}
          <div className="region-grid">
            {regions.map((r) => {
              const colors = resolveColors(r.accent);
              return (
                <div
                  key={r.name}
                  className="region-card"
                  style={{
                    ['--c-accent' as any]: colors.accent,
                    ['--c-glow' as any]: colors.glow,
                    ['--c-border' as any]: colors.border,
                  }}
                >
                  <div className="region-top">
                    <span className="pulse-dot" />
                    <span className="region-name">{r.name}</span>
                  </div>
                  <div className="region-states">{r.states}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
