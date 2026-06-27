"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import indiaMap from "@svg-maps/india";

interface LocationItem {
  name: string;
  x: number;
  y: number;
  info: string;
  isHQ?: boolean;
}



export function Reach({ heading, sub }: { heading?: string; sub?: string }) {
  const [apiData, setApiData] = useState<{ heading: string; sub: string; locations: LocationItem[] } | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/reach`)
      .then((res) => { if (!res.ok) throw new Error("Reach fetch failed"); return res.json(); })
      .then((d) => setApiData(d))
      .catch((err) => console.error("Error loading reach content:", err));
  }, []);

  const displayHeading = apiData?.heading || heading || "A pan-India presence, serving communities across 22 states.";
  const displaySub = apiData?.sub || sub || "Supremo reaches every corner of the country through an extensive network of exclusive-territory dealers, backed by strategically located manufacturing plants and regional warehouses to enforce our strict 48-hour dispatch guarantee.";
  const locations: LocationItem[] = apiData?.locations ?? [];

  // Indore coordinates
  const hq = locations.find((l) => l.isHQ) ?? locations[0];

  // Find currently active location for the HTML tooltip
  // Map Delhi hover state back to Delhi pin marker
  const activeLoc = locations.find(
    (l) => l.name === hoveredState || (l.isHQ && hoveredState === "Madhya Pradesh")
  );

  return (
    <section style={{ background: "#ffffff", padding: "48px 0", position: "relative", overflow: "hidden" }}>
      <div className="container">
        {/* Style block for map interactivity and keyframes */}
        <style dangerouslySetInnerHTML={{ __html: `
          .reach-grid {
            display: grid;
            grid-template-columns: 1fr 1.1fr;
            gap: 64px;
            align-items: center;
          }
          
          .map-container {
            position: relative;
            width: 100%;
            max-width: 580px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 24px;
            padding: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .map-wrapper {
            position: relative;
            display: inline-block;
            width: 100%;
          }

          .state-path {
            transition: fill 0.3s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.3s ease;
          }

          .state-path:hover {
            fill: var(--blue-500) !important;
          }

          .flow-line {
            stroke-dasharray: 6 4;
            animation: flowing-ants 1.5s linear infinite;
          }

          @keyframes flowing-ants {
            0% {
              stroke-dashoffset: 20;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }

          /* Outer group only positions the dot (SVG translate attribute). */
          .map-dot {
            cursor: pointer;
          }

          /* Inner group handles the hover scale. Using its own bounding box as
             the transform origin keeps the scale centered on the dot and avoids
             clobbering the parent's translate. */
          .map-dot-inner {
            transform-box: fill-box;
            transform-origin: center;
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }

          .map-dot:hover .map-dot-inner {
            transform: scale(1.3);
          }

          .map-tooltip-fixed {
            position: absolute;
            background: var(--ink-2);
            color: #ffffff;
            padding: 10px 14px;
            border-radius: 8px;
            font-size: 12px;
            line-height: 1.4;
            box-shadow: 0 10px 24px -6px rgba(10, 22, 40, 0.25);
            pointer-events: none;
            width: 210px;
            text-align: center;
            z-index: 100;
            opacity: 0;
            visibility: hidden;
            transform: translate(-50%, -125%);
            transition: opacity 0.18s ease, visibility 0.18s ease, transform 0.18s ease;
          }

          .map-tooltip-fixed.is-active {
            opacity: 1;
            visibility: visible;
            transform: translate(-50%, -135%);
          }

          @media (max-width: 1024px) {
            .reach-grid {
              grid-template-columns: 1fr;
              gap: 48px;
            }
            .map-container {
              max-width: 560px;
            }
          }
          @media (max-width: 768px) {
            .map-container {
              max-width: 100%;
              padding: 0;
              overflow: visible;
            }
            .map-wrapper {
              transform: scale(1.1);
              transform-origin: center center;
              margin: 24px 0;
            }
          }
        `}} />

        <div className="reach-grid">
          {/* Left Side Content & Statistics */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div>
              <span className="eyebrow" style={{ display: "inline-flex", marginBottom: 12 }}>Our Reach</span>
              <h2 style={{ margin: "0 0 20px" }}>
                {displayHeading}
              </h2>
              <p style={{ color: "var(--slate)", margin: 0 }}>
                {displaySub}
              </p>
            </div>

            <div>
              <Link href="/dealership" className="btn btn--sm">
                Become a Partner
                <svg className="arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Side Map of India with State Borders and Flow Arcs */}
          <div>
            <div className="map-container">
              <div className="map-wrapper">
                <svg
                  viewBox={indiaMap.viewBox}
                  width="100%"
                  style={{ display: "block", overflow: "visible", height: "auto" }}
                >
                  {/* 3D Offset Drop Shadow Map Layer */}
                  <g transform="translate(4, 5)" opacity="0.12">
                    {indiaMap.locations.map((loc: any) => (
                      <path
                        key={`shadow-${loc.id}`}
                        d={loc.path}
                        fill="#0E1A30"
                      />
                    ))}
                  </g>

                  {/* Main Vector Map Layer */}
                  <g>
                    {indiaMap.locations.map((loc: any) => {
                      const isHovered = hoveredState === loc.name;
                      return (
                        <path
                          key={loc.id}
                          d={loc.path}
                          fill={isHovered ? "var(--blue-500)" : "var(--blue-600)"}
                          stroke="#ffffff"
                          strokeWidth={0.8}
                          className="state-path"
                          style={{
                            cursor: "pointer",
                          }}
                          onMouseEnter={() => setHoveredState(loc.name)}
                          onMouseLeave={() => setHoveredState(null)}
                        />
                      );
                    })}
                  </g>

                  {/* Logistical Flow Arcs (from Indore HQ to destinations) */}
                  <g pointerEvents="none">
                    {locations.map((loc) => {
                      if (loc.isHQ) return null;
                      
                      const x0 = hq.x;
                      const y0 = hq.y;
                      const x1 = loc.x;
                      const y1 = loc.y;
                      
                      const dx = x1 - x0;
                      const dy = y1 - y0;
                      const dist = Math.sqrt(dx * dx + dy * dy);
                      
                      // Calculate quadratic curve control point pushed vertically upwards
                      const cx = (x0 + x1) / 2;
                      const cy = (y0 + y1) / 2 - dist * 0.28;
                      
                      const pathD = `M ${x0} ${y0} Q ${cx} ${cy} ${x1} ${y1}`;
                      const isHovered = hoveredState === loc.name;
                      
                      return (
                        <path
                          key={`arc-${loc.name}`}
                          d={pathD}
                          fill="none"
                          stroke={isHovered ? "#FFD700" : "#FACC15"}
                          strokeWidth={isHovered ? 2.5 : 1.2}
                          className="flow-line"
                          style={{
                            opacity: hoveredState === null ? 0.7 : isHovered ? 1.0 : 0.15,
                            transition: "stroke-width 0.3s ease, opacity 0.3s ease, stroke 0.3s ease"
                          }}
                        />
                      );
                    })}
                  </g>

                  {/* Location Dots & Pulse Animations */}
                  <g>
                    {locations.map((loc, idx) => {
                      const isHovered = hoveredState === loc.name || (loc.isHQ && hoveredState === "Madhya Pradesh");
                      
                      if (loc.isHQ) {
                        return (
                          <g
                            key={loc.name}
                            transform={`translate(${loc.x}, ${loc.y})`}
                            className="map-dot"
                            onMouseEnter={() => setHoveredState("Madhya Pradesh")}
                            onMouseLeave={() => setHoveredState(null)}
                          >
                            <g className="map-dot-inner">
                              {/* HQ Concentric Pulse Circle 1 (Native SVG animation to prevent scaling glitches) */}
                              <circle r={6} fill="none" stroke="#FACC15" strokeWidth={1.5}>
                                <animate
                                  attributeName="r"
                                  values="6;22"
                                  dur="2.4s"
                                  repeatCount="indefinite"
                                />
                                <animate
                                  attributeName="opacity"
                                  values="0.85;0"
                                  dur="2.4s"
                                  repeatCount="indefinite"
                                />
                              </circle>
                              {/* HQ Concentric Pulse Circle 2 (Native SVG animation) */}
                              <circle r={6} fill="none" stroke="var(--blue-200)" strokeWidth={1}>
                                <animate
                                  attributeName="r"
                                  values="6;32"
                                  dur="3.2s"
                                  repeatCount="indefinite"
                                  begin="1.2s"
                                />
                                <animate
                                  attributeName="opacity"
                                  values="0.85;0"
                                  dur="3.2s"
                                  repeatCount="indefinite"
                                  begin="1.2s"
                                />
                              </circle>
                              {/* HQ Core Pin Outline */}
                              <circle
                                r={7}
                                fill="#0E55BC"
                                stroke="#FACC15"
                                strokeWidth={2}
                                style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))" }}
                              />
                              <circle r={3} fill="#FACC15" />
                            </g>

                            {/* Static Title Box over HQ */}
                            <g transform="translate(0, -16)" pointerEvents="none">
                              <rect
                                x={-26}
                                y={-10}
                                width={52}
                                height={20}
                                rx={4}
                                fill="#ffffff"
                                stroke="var(--blue-200)"
                                strokeWidth={1}
                                style={{ filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.1))" }}
                              />
                              <text
                                y={-2}
                                textAnchor="middle"
                                fill="var(--blue-700)"
                                fontSize="7"
                                fontWeight="800"
                                fontFamily="var(--font-display)"
                              >
                                INDORE
                              </text>
                              <text
                                y={6}
                                textAnchor="middle"
                                fill="#E0A200"
                                fontSize="7"
                                fontWeight="800"
                                fontFamily="var(--font-display)"
                              >
                                SUPREMO
                              </text>
                            </g>
                          </g>
                        );
                      }

                      return (
                        <g
                          key={loc.name}
                          transform={`translate(${loc.x}, ${loc.y})`}
                          className="map-dot"
                          onMouseEnter={() => setHoveredState(loc.name)}
                          onMouseLeave={() => setHoveredState(null)}
                        >
                          <g className="map-dot-inner">
                            {/* Standard Pulse Ring (Native SVG animation to prevent scaling glitches) */}
                            <circle r={4.5} fill="none" stroke="#FACC15" strokeWidth={1.5}>
                              <animate
                                attributeName="r"
                                values="4.5;18"
                                dur="2.4s"
                                repeatCount="indefinite"
                                begin={`${(idx % 5) * 0.45}s`}
                              />
                              <animate
                                attributeName="opacity"
                                values="0.85;0"
                                dur="2.4s"
                                repeatCount="indefinite"
                                begin={`${(idx % 5) * 0.45}s`}
                              />
                            </circle>
                            {/* Standard Core Pin */}
                            <circle
                              r={4.5}
                              fill="#FACC15"
                              stroke="#ffffff"
                              strokeWidth={1}
                              style={{ filter: "drop-shadow(0 1.5px 3px rgba(0,0,0,0.2))" }}
                            />
                          </g>
                        </g>
                      );
                    })}
                  </g>
                </svg>

                {/* Glitch-free HTML Tooltip positioned absolutely relative to container */}
                {activeLoc && (
                  <div
                    className={`map-tooltip-fixed ${activeLoc ? "is-active" : ""}`}
                    style={{
                      left: `${(activeLoc.x / 612) * 100}%`,
                      top: `${(activeLoc.y / 696) * 100}%`,
                    }}
                  >
                    <strong style={{ display: "block", color: activeLoc.isHQ ? "#F3C63F" : "var(--blue-400)", marginBottom: 4 }}>
                      {activeLoc.isHQ ? "Madhya Pradesh (Indore)" : activeLoc.name}
                    </strong>
                    <span>{activeLoc.info}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

