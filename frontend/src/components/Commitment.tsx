"use client";

import { useState } from "react";
import Link from "next/link";

export function Commitment() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section style={{ background: "#ffffff", padding: "32px 0 24px" }}>
      <div className="container">
        {/* Style block for modern layout and custom hover animations */}
        <style dangerouslySetInnerHTML={{ __html: `
          .commitment-content {
            max-width: 680px;
            text-align: left;
            display: flex;
            flex-direction: column;
            gap: 24px;
          }

          .commitment-btn {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            height: 52px;
            padding: 0 32px;
            font-family: var(--font-display);
            font-weight: 700;
            font-size: 15px;
            letter-spacing: 0.05em;
            border-radius: 6px;
            background: var(--blue-600); /* Supremo Blue */
            color: #ffffff;
            border: none;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            text-transform: uppercase;
            box-shadow: 0 4px 14px rgba(20, 102, 230, 0.2);
          }

          .commitment-btn:hover {
            transform: translateY(-2px);
            background: var(--blue-700);
            box-shadow: 0 8px 20px rgba(20, 102, 230, 0.35);
          }

          .commitment-btn:active {
            transform: translateY(0);
          }
        `}} />

        <div className="commitment-content">
          {/* Left-Aligned Content */}
          <h2>About Us</h2>

          <div className="lead-stack" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ color: "var(--slate)" }}>
              At Supremo, our commitment goes beyond manufacturing products—it is about creating solutions that make a meaningful difference. Every innovation we deliver is guided by our responsibility to positively impact the world around us, strengthen the communities where we live and work, and uphold the shared values that define who we are.
            </p>

            <p style={{ color: "var(--slate)" }}>
              From everyday essentials to urban infrastructure solutions, we are driven by quality, sustainability, and trust, ensuring that everything we create contributes to safer homes, cleaner environments, and better living for generations to come.
            </p>
          </div>

          <div style={{ marginTop: 8, display: "flex", justifyContent: "flex-start" }}>
            <Link href="/about" className="commitment-btn">
              Know More <span style={{ fontSize: "11px", marginLeft: "2px" }}>▶</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
