"use client";

import { useEffect, useState } from "react";
import { Logo, LogoLight } from "./Logo";

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
        top: 0,
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
          {scrolled ? <LogoLight /> : <Logo />}
        </a>

        <nav style={{ display: "flex", gap: 28 }}>
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
