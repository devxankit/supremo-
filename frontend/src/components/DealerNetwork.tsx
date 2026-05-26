"use client";

import Link from "next/link";

const regions = [
  {
    name: "North",
    states: "Delhi · Punjab · Haryana · UP · Rajasthan",
    accent: "var(--blue-400)",
    glow: "rgba(20, 102, 230, 0.22)",
    border: "rgba(20, 102, 230, 0.35)",
  },
  {
    name: "West",
    states: "Maharashtra · Gujarat · MP · Goa",
    accent: "#10B981",
    glow: "rgba(16, 185, 129, 0.22)",
    border: "rgba(16, 185, 129, 0.35)",
  },
  {
    name: "South",
    states: "Karnataka · Telangana · Tamil Nadu · Kerala",
    accent: "#F59E0B",
    glow: "rgba(245, 158, 11, 0.22)",
    border: "rgba(245, 158, 11, 0.35)",
  },
  {
    name: "East",
    states: "West Bengal · Odisha · Bihar · Jharkhand",
    accent: "#8B5CF6",
    glow: "rgba(139, 92, 246, 0.22)",
    border: "rgba(139, 92, 246, 0.35)",
  },
];

export function DealerNetwork() {
  return (
    <section style={{ background: "var(--ink)", position: "relative", overflow: "hidden", padding: "100px 0" }}>
      {/* Ambient glow + grid */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 15% 25%, rgba(20, 102, 230, 0.20), transparent 55%)", zIndex: 0 }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)", backgroundSize: "32px 32px", zIndex: 0 }} />

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
            background: rgba(255, 255, 255, 0.025);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: var(--r-md);
            padding: 26px 24px;
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(12px);
            transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.4s ease, background 0.4s ease, box-shadow 0.4s ease;
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
            background: rgba(255, 255, 255, 0.045);
            box-shadow: 0 22px 44px -18px rgba(0, 0, 0, 0.5);
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
            color: #fff;
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
            color: rgba(255, 255, 255, 0.5);
            position: relative;
            z-index: 1;
            transition: color 0.4s ease;
          }

          .region-card:hover .region-states { color: rgba(255, 255, 255, 0.7); }

          .net-tagline {
            display: flex;
            align-items: center;
            gap: 10px;
            color: rgba(255, 255, 255, 0.45);
            font-size: 13px;
            margin: 28px 0 36px;
          }

          .net-tagline .line {
            width: 28px;
            height: 1px;
            background: rgba(255, 255, 255, 0.25);
          }

          @media (max-width: 900px) {
            .network-grid { grid-template-columns: 1fr; gap: 48px; }
          }
        `}} />

        <div className="network-grid">
          {/* Left — copy */}
          <div>
            <span className="eyebrow eyebrow-light">Dealer Network</span>
            <h2 style={{ color: "#fff", fontSize: "clamp(30px, 4vw, 48px)", lineHeight: 1.15, marginTop: 18, marginBottom: 20, letterSpacing: "-0.015em" }}>
              A pan-India network, <br />
              <span style={{ color: "var(--blue-400)" }}>built on reliability.</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,.66)", fontSize: 17, lineHeight: 1.7, maxWidth: "44ch" }}>
              From metro distributors to rural hardware outlets — protected territories, stocked regional hubs, and a team that picks up the phone.
            </p>

            <div className="net-tagline">
              <span className="line" />
              <span>Live across four regions</span>
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
            {regions.map((r) => (
              <div
                key={r.name}
                className="region-card"
                style={{
                  ['--c-accent' as any]: r.accent,
                  ['--c-glow' as any]: r.glow,
                  ['--c-border' as any]: r.border,
                }}
              >
                <div className="region-top">
                  <span className="pulse-dot" />
                  <span className="region-name">{r.name}</span>
                </div>
                <div className="region-states">{r.states}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
