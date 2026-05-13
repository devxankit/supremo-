"use client";

import { useEffect, useRef, useState } from "react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "min(900px,100vh)",
        height: "100vh",
        color: "#fff",
        overflow: "hidden",
        isolation: "isolate",
        padding: 0,
      }}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, zIndex: -2 }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => {
            (e.currentTarget as HTMLVideoElement).style.display = "none";
          }}
        />
        {/* CSS poster fallback */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 30% 20%,rgba(47,123,255,.35),transparent 60%), radial-gradient(ellipse 70% 60% at 80% 80%,rgba(0,180,240,.3),transparent 60%), linear-gradient(135deg,#06245A 0%,#0A1628 60%,#051633 100%)",
          }}
        />
      </div>

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          background:
            "linear-gradient(180deg,rgba(6,36,90,.55) 0%,rgba(6,36,90,.25) 30%,rgba(6,36,90,.65) 100%),linear-gradient(90deg,rgba(6,20,40,.7) 0%,rgba(6,20,40,.15) 60%)",
        }}
      />

      {/* Grid grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)",
          backgroundSize: "80px 80px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 60%,#000 30%,transparent 80%)",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 60%,#000 30%,transparent 80%)",
        }}
      />

      {/* Content */}
      <div
        className="container"
        style={{
          position: "relative",
          height: "100%",
          display: "grid",
          gridTemplateRows: "1fr auto",
          paddingTop: 140,
          paddingBottom: 56,
        }}
      >
        {/* Copy */}
        <div style={{ maxWidth: 920 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "8px 16px 8px 8px",
              borderRadius: 999,
              background: "rgba(255,255,255,.08)",
              border: "1px solid rgba(255,255,255,.18)",
              backdropFilter: "blur(8px)",
              fontSize: 13,
              color: "rgba(255,255,255,.9)",
              marginBottom: 28,
            }}
          >
            <span
              style={{
                background: "var(--blue-600)",
                padding: "4px 10px",
                borderRadius: 999,
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Est. 1998
            </span>
            Pan-India manufacturer of plastic water solutions
          </div>

          <h1
            style={{
              fontSize: "clamp(48px,7.5vw,108px)",
              lineHeight: 0.95,
              letterSpacing: "-0.035em",
              color: "#fff",
              fontWeight: 600,
            }}
          >
            Built to hold
            <br />
            India&apos;s{" "}
            <span
              style={{
                fontStyle: "italic",
                fontWeight: 500,
                background: "linear-gradient(180deg,#6BA1FF,#2F7BFF 80%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              water.
            </span>
            <span
              style={{
                display: "block",
                fontSize: "0.4em",
                fontWeight: 500,
                letterSpacing: 0,
                color: "rgba(255,255,255,.75)",
                marginTop: 18,
                maxWidth: "30ch",
                fontFamily: "var(--font-body)",
                lineHeight: 1.4,
              }}
            >
              Triple-layer water tanks, certified PVC pipes &amp; utility
              products — manufactured under one roof, delivered to 1,200+
              dealers across 22 states.
            </span>
          </h1>

          <div style={{ display: "flex", gap: 14, marginTop: 40, flexWrap: "wrap" }}>
            <a href="#dealer" className="btn btn--white">
              Become a Dealer
              <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
            <a href="#" className="btn btn--ghost">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download Catalogue
            </a>
            <a href="#" className="btn btn--ghost">
              Contact Sales
            </a>
          </div>
        </div>

        {/* Stats strip */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
            alignItems: "end",
            gap: 24,
            paddingTop: 32,
            borderTop: "1px solid rgba(255,255,255,.18)",
          }}
        >
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,.85)",
              maxWidth: "30ch",
              lineHeight: 1.5,
            }}
          >
            &ldquo;A trusted manufacturing partner for builders, dealers and government tenders across India.
          </p>
          {[
            { label: "Capacity", value: "68k", unit: "L/day" },
            { label: "Dealers", value: "1,200", unit: "+" },
            { label: "States", value: "22", unit: "" },
            { label: "Years", value: "26", unit: "" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,.6)", marginBottom: 6, fontWeight: 600 }}>
                {s.label}
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 600, letterSpacing: "-0.02em", color: "#fff", lineHeight: 1 }}>
                {s.value}
                {s.unit && <span style={{ fontSize: 16, opacity: 0.7, marginLeft: 4, fontWeight: 500 }}>{s.unit}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video controls */}
      <div style={{ position: "absolute", right: "var(--gutter)", bottom: 180, zIndex: 5, display: "flex", gap: 8 }}>
        <button
          onClick={togglePlay}
          aria-label="Play/Pause"
          style={{ width: 44, height: 44, display: "grid", placeItems: "center", borderRadius: 999, border: "1px solid rgba(255,255,255,.28)", background: "rgba(10,22,40,.4)", color: "#fff", backdropFilter: "blur(8px)", cursor: "pointer" }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
            {playing ? (
              <>
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </>
            ) : (
              <polygon points="6 4 20 12 6 20 6 4" />
            )}
          </svg>
        </button>
        <button
          onClick={toggleMute}
          aria-label="Mute/Unmute"
          style={{ width: 44, height: 44, display: "grid", placeItems: "center", borderRadius: 999, border: "1px solid rgba(255,255,255,.28)", background: muted ? "rgba(10,22,40,.4)" : "var(--blue-600)", color: "#fff", backdropFilter: "blur(8px)", cursor: "pointer", transition: "background .2s" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ width: 18, height: 18 }}>
            {muted ? (
              <>
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </>
            ) : (
              <>
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Scroll cue */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 22,
          transform: "translateX(-50%)",
          fontSize: 11,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,.55)",
          fontWeight: 600,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        Scroll
        <span
          className="scroll-line"
          style={{
            width: 1,
            height: 36,
            background: "linear-gradient(180deg,transparent,rgba(255,255,255,.6))",
          }}
        />
      </div>
    </section>
  );
}
