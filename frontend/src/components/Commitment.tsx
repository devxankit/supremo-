"use client";

import { useState } from "react";
import Link from "next/link";

export function Commitment() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section style={{ background: "#ffffff", padding: "24px 0 80px" }}>
      <div className="container">
        {/* Style block for modern layout and custom hover animations */}
        <style dangerouslySetInnerHTML={{ __html: `
          .commitment-grid {
            display: grid;
            grid-template-columns: 1.1fr 0.9fr;
            gap: 64px;
            align-items: center;
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

          .video-card {
            position: relative;
            width: 100%;
            height: 340px;
            border-radius: 16px;
            overflow: hidden;
            background: #000;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          .video-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
          }

          .video-thumbnail {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          .video-card:hover .video-thumbnail {
            transform: scale(1.04);
          }

          .video-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(0deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0) 100%);
            display: flex;
            align-items: flex-end;
            padding: 24px;
          }

          .play-action {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            background: rgba(0, 0, 0, 0.65);
            backdrop-filter: blur(8px);
            padding: 8px 20px 8px 12px;
            border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #ffffff;
            font-family: var(--font-display);
            font-size: 15px;
            font-weight: 600;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          .play-btn-circle {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #ffffff;
            color: #000;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
          }

          .video-card:hover .play-action {
            background: rgba(0, 0, 0, 0.85);
            border-color: rgba(255, 255, 255, 0.3);
            transform: scale(1.03);
          }

          .video-card:hover .play-btn-circle {
            background: var(--blue-600);
            color: #ffffff;
            transform: scale(1.05);
          }

          @media (max-width: 960px) {
            .commitment-grid {
              grid-template-columns: 1fr;
              gap: 40px;
            }
            .video-card {
              height: 300px;
            }
          }
        `}} />

        <div className="commitment-grid">
          {/* Left Side Content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              fontFamily: "var(--font-display)",
              color: "var(--ink)",
              letterSpacing: "-0.015em",
              margin: 0
            }}>
              About Us
            </h2>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <p style={{
                color: "var(--slate)",
                fontSize: "16px",
                lineHeight: 1.65,
                margin: 0
              }}>
                At Supremo, our commitment goes beyond manufacturing products—it is about creating solutions that make a meaningful difference. Every innovation we deliver is guided by our responsibility to positively impact the world around us, strengthen the communities where we live and work, and uphold the shared values that define who we are.
              </p>
              
              <p style={{
                color: "var(--slate)",
                fontSize: "16px",
                lineHeight: 1.65,
                margin: 0
              }}>
                From everyday essentials to urban infrastructure solutions, we are driven by quality, sustainability, and trust, ensuring that everything we create contributes to safer homes, cleaner environments, and better living for generations to come.
              </p>
            </div>

            <div style={{ marginTop: 8 }}>
              <Link href="/about" className="commitment-btn">
                Know More <span style={{ fontSize: "11px", marginLeft: "2px" }}>▶</span>
              </Link>
            </div>
          </div>

          {/* Right Side Video Player */}
          <div>
            {!isPlaying ? (
              <div 
                className="video-card" 
                onClick={() => setIsPlaying(true)}
                title="Play Video"
              >
                <img 
                  src="/images/image 1.png" 
                  alt="Supremo Factory Landscape" 
                  className="video-thumbnail" 
                />
                <div className="video-overlay">
                  <div className="play-action">
                    <span className="play-btn-circle">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </span>
                    <span>Explore the Supremo world</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="video-card" style={{ cursor: "default" }}>
                <video
                  src="/vidoes/vid1.mp4"
                  controls
                  autoPlay
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
