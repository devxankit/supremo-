"use client";

import { useState } from "react";
import Link from "next/link";



interface LocationItem {
  name: string;
  top: string;
  left: string;
  info: string;
  isHQ?: boolean;
}

const locations: LocationItem[] = [
  { name: "Punjab", top: "25%", left: "37%", info: "Active Sales & Distribution Network" },
  { name: "Chandigarh", top: "24%", left: "39%", info: "UT Logistics & Supply Hub" },
  { name: "Uttarakhand", top: "26%", left: "42%", info: "Territory Sales & Distribution Hub" },
  { name: "Haryana", top: "28%", left: "37%", info: "Regional Sales & Distribution Network" },
  { name: "New Delhi", top: "30%", left: "38%", info: "Regional Sales HQ & Corporate Hub" },
  { name: "Rajasthan", top: "36%", left: "31%", info: "Jaipur Warehouse & Regional Sales Office" },
  { name: "Uttar Pradesh", top: "34%", left: "49%", info: "Ghaziabad Manufacturing Plant & 3 Warehouses" },
  { name: "Bihar", top: "39%", left: "62%", info: "Patna Warehouse & Sales Office" },
  { name: "Jharkhand", top: "45%", left: "61%", info: "Ranchi Distribution Center" },
  { name: "Gujarat", top: "48%", left: "26%", info: "Surat Manufacturing Plant & Regional Office" },
  { name: "Madhya Pradesh", top: "46%", left: "38%", info: "Indore HQ & Main Roto-Moulding Plant", isHQ: true },
  { name: "Chhattisgarh", top: "52%", left: "51%", info: "Raipur Distribution Center" },
  { name: "Odisha", top: "55%", left: "56%", info: "Bhubaneswar Warehouse & Supply Hub" },
  { name: "Maharashtra", top: "58%", left: "37%", info: "Pune Manufacturing Plant & Regional Office" },
  { name: "Telangana", top: "65%", left: "45%", info: "Hyderabad Warehouse & Regional Office" },
  { name: "Andhra Pradesh", top: "71%", left: "47%", info: "Vijayawada Logistics Center" },
  { name: "Goa", top: "68%", left: "33.5%", info: "Coastal Sales & Distribution Network" },
  { name: "Karnataka", top: "75%", left: "36%", info: "Bengaluru Warehouse & Regional Office" },
  { name: "Kerala", top: "86%", left: "39%", info: "Cochin Distribution Point" },
  { name: "Tamil Nadu", top: "83%", left: "43%", info: "Chennai Warehouse & Regional Office" }
];

export function Reach() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  return (
    <section style={{ background: "#ffffff", padding: "24px 0 24px", position: "relative", overflow: "hidden" }}>
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

          .map-bg {
            width: 100%;
            height: auto;
            object-fit: contain;
            user-select: none;
            opacity: 0.95;
          }

          .pin-marker {
            position: absolute;
            width: 20px;
            height: 20px;
            transform: translate(-50%, -100%);
            cursor: pointer;
            z-index: 10;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }

          .pin-marker:hover, .pin-marker.is-active {
            transform: translate(-50%, -100%) scale(1.3);
            z-index: 20;
          }

          .pin-svg {
            filter: drop-shadow(0 3px 6px rgba(0,0,0,0.16));
            transition: color 0.3s ease;
          }

          .pin-marker:hover .pin-svg, .pin-marker.is-active .pin-svg {
            fill: var(--blue-600) !important;
          }

          .pin-hq {
            position: absolute;
            transform: translate(-50%, -100%);
            cursor: pointer;
            z-index: 15;
            transition: all 0.3s ease;
          }
          
          .pin-hq:hover, .pin-hq.is-active {
            transform: translate(-50%, -100%) scale(1.15);
            z-index: 25;
          }

          .hq-pulse {
            position: absolute;
            top: -24px;
            left: 50%;
            transform: translateX(-50%);
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: rgba(14, 85, 188, 0.15);
            animation: pulse-ring 2s infinite ease-out;
            pointer-events: none;
            z-index: -1;
          }

          .hq-label {
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: #ffffff;
            border: 1px solid var(--blue-200);
            box-shadow: 0 4px 15px rgba(10, 22, 40, 0.08);
            border-radius: 6px;
            padding: 4px 10px;
            font-size: 11px;
            font-weight: 800;
            white-space: nowrap;
            display: flex;
            flex-direction: column;
            align-items: center;
            line-height: 1.2;
            z-index: 30;
            font-family: var(--font-display);
          }

          @keyframes pulse-ring {
            0% { transform: translateX(-50%) scale(0.3); opacity: 1; }
            100% { transform: translateX(-50%) scale(1); opacity: 0; }
          }

          .map-tooltip {
            position: absolute;
            bottom: 120%;
            left: 50%;
            transform: translateX(-50%);
            background: var(--ink-2);
            color: #ffffff;
            padding: 10px 14px;
            border-radius: 8px;
            font-size: 12px;
            line-height: 1.4;
            box-shadow: 0 10px 24px -6px rgba(10, 22, 40, 0.25);
            pointer-events: none;
            white-space: normal;
            width: 200px;
            text-align: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.25s ease;
            z-index: 100;
          }

          .pin-marker:hover .map-tooltip, .pin-marker.is-active .map-tooltip {
            opacity: 1;
            visibility: visible;
            transform: translateX(-50%) translateY(-6px);
          }
          
          .pin-hq:hover .map-tooltip, .pin-hq.is-active .map-tooltip {
            opacity: 1;
            visibility: visible;
            transform: translateX(-50%) translateY(-6px);
          }

          .state-pill {
            background: var(--paper-2);
            border: 1px solid var(--line);
            border-radius: 999px;
            padding: 6px 14px;
            font-size: 13px;
            font-weight: 600;
            color: var(--slate);
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 6px;
          }

          .state-pill::before {
            content: "";
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--muted);
            transition: background 0.2s ease;
          }

          .state-pill:hover, .state-pill.is-active {
            background: var(--blue-50);
            border-color: var(--blue-200);
            color: var(--blue-700);
            transform: translateY(-1px);
          }

          .state-pill:hover::before, .state-pill.is-active::before {
            background: var(--blue-600);
          }

          .state-pill-hq {
            border-color: #F3C63F !important;
            background: #FFFDF0 !important;
            color: #7D5D00 !important;
          }
          
          .state-pill-hq::before {
            background: #F3C63F !important;
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
              transform: scale(1.35);
              transform-origin: center center;
              margin: 52px 0;
            }
          }
        `}} />

        <div className="reach-grid">
          {/* Left Side Content & Statistics */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div>
              <span className="eyebrow" style={{ display: "inline-flex", marginBottom: 12 }}>Our Reach</span>
              <h2 style={{ margin: "0 0 20px" }}>
                A pan-India presence, serving communities across 22 states.
              </h2>
              <p style={{ color: "var(--slate)", margin: "0 0 16px" }}>
                Supremo reaches every corner of the country through an extensive network of exclusive-territory dealers, backed by strategically located manufacturing plants and regional warehouses to enforce our strict 48-hour dispatch guarantee.
              </p>
              <p style={{ color: "var(--slate)", margin: 0 }}>
                From our corporate headquarters and core manufacturing plant in Indore, Madhya Pradesh, we coordinate a seamless supply chain delivering certified water tanks, pipes, and utility accessories.
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

          {/* Right Side Map of India with Interactive Pins */}
          <div>
            <div className="map-container">
              <div className="map-wrapper" style={{ position: "relative", display: "inline-block", width: "100%" }}>
                <img
                  src="/images/india_map_outline.png"
                  alt="Supremo Presence Map of India"
                  className="map-bg"
                  style={{ width: "100%", display: "block" }}
                />

                {locations.map((loc) => {
                const isActive = hoveredState === loc.name;
                
                if (loc.isHQ) {
                  return (
                    <div
                      key={loc.name}
                      className={`pin-hq ${isActive ? "is-active" : ""}`}
                      style={{ top: `calc(${loc.top} + 2.5%)`, left: loc.left }}
                      onMouseEnter={() => setHoveredState(loc.name)}
                      onMouseLeave={() => setHoveredState(null)}
                    >
                      <div className="hq-pulse" />
                      <div className="hq-label">
                        <span style={{ color: "var(--blue-700)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 800 }}>Indore</span>
                        <span style={{ color: "#E0A200", fontSize: "9px", fontWeight: 800 }}>SUPREMO</span>
                      </div>
                      
                      {/* Special gold/blue marker for HQ */}
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="pin-svg">
                        <path d="M12 21s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 7.2c0 7.3-8 11.8-8 11.8z" fill="#0E55BC" stroke="#F3C63F" strokeWidth="2"/>
                        <circle cx="12" cy="9" r="3" fill="#F3C63F" />
                      </svg>
                      
                      <div className="map-tooltip">
                        <strong style={{ display: "block", color: "#F3C63F", marginBottom: 4 }}>Madhya Pradesh (Indore)</strong>
                        <span>{loc.info}</span>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={loc.name}
                    className={`pin-marker ${isActive ? "is-active" : ""}`}
                    style={{ top: `calc(${loc.top} + 2.5%)`, left: loc.left }}
                    onMouseEnter={() => setHoveredState(loc.name)}
                    onMouseLeave={() => setHoveredState(null)}
                  >
                    {/* Standard red marker */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="pin-svg">
                      <path d="M12 21s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 7.2c0 7.3-8 11.8-8 11.8z" fill="#E53E3E" stroke="#ffffff" strokeWidth="1.5"/>
                      <circle cx="12" cy="9" r="2.5" fill="#ffffff" />
                    </svg>
                    
                    <div className="map-tooltip">
                      <strong style={{ display: "block", color: "var(--blue-400)", marginBottom: 4 }}>{loc.name}</strong>
                      <span>{loc.info}</span>
                    </div>
                  </div>
                );
              })}
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
