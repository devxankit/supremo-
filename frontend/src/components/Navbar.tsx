"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 40,
        left: 0,
        right: 0,
        zIndex: 20,
        transition: "background .3s ease, box-shadow .3s ease",
        background: scrolled ? "rgba(255,255,255,.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 1px 0 var(--line)" : "none",
      }}
    >
      <div
        className="container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 84 }}
      >
        <a href="#" aria-label="Supremo home">
          {scrolled ? (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, display: "grid", placeItems: "center", background: "linear-gradient(135deg,var(--blue-700),var(--blue-900))", borderRadius: 8, flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L4 7v8c0 5 8 7 8 7s8-2 8-7V7l-8-5z" fill="#fff" />
                  <path d="M8 12c0-2 2-3 4-3s4 1 4 3-2 4-4 4-4-2-4-4z" fill="#0E55BC" />
                </svg>
              </div>
              <div style={{ lineHeight: 1 }}>
                <b style={{ fontFamily: "var(--font-display)", fontSize: 20, letterSpacing: "-0.02em", fontWeight: 700, color: "var(--ink)", display: "block" }}>SUPREMO</b>
                <small style={{ fontSize: 9, letterSpacing: "0.32em", opacity: 0.55, marginTop: 3, fontWeight: 600, display: "block" }}>BUILT TO HOLD</small>
              </div>
            </div>
          ) : (
            <Logo />
          )}
        </a>

        <nav style={{ display: "flex", gap: 36 }}>
          {["Products", "About", "Manufacturing", "Dealership", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                color: scrolled ? "var(--ink)" : "rgba(255,255,255,.85)",
                fontWeight: 500,
                fontSize: 15,
                transition: "color .2s ease",
              }}
            >
              {item}
            </a>
          ))}
        </nav>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <a
            href="#"
            className="btn btn--sm"
            style={{
              background: scrolled ? "transparent" : "rgba(255,255,255,.08)",
              color: scrolled ? "var(--ink)" : "#fff",
              borderColor: scrolled ? "var(--line)" : "rgba(255,255,255,.35)",
              backdropFilter: scrolled ? "none" : "blur(6px)",
            }}
          >
            Download Catalogue
          </a>
          <a
            href="#dealer"
            className="btn btn--sm"
            style={{
              background: scrolled ? "var(--blue-600)" : "#fff",
              color: scrolled ? "#fff" : "var(--ink)",
            }}
          >
            Become a Dealer →
          </a>
        </div>
      </div>
    </div>
  );
}
