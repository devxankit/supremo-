"use client";

import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = ["Products", "About", "Manufacturing", "Dealership", "Contact"];

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [hovered, setHovered]     = useState<string | null>(null);
  const [menuOpen, setMenuOpen]   = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);
      setMenuOpen(false);
    };
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const navBg    = scrolled ? "rgba(255,255,255,.97)" : "transparent";
  const linkClr  = scrolled ? "var(--ink)" : "rgba(255,255,255,.85)";
  const hoverClr = scrolled ? "var(--blue-600)" : "#fff";
  const hoverBg  = scrolled ? "var(--blue-50)" : "rgba(255,255,255,.1)";

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 20,
          transition: "background .28s ease, box-shadow .28s ease",
          background: menuOpen ? "rgba(255,255,255,.97)" : navBg,
          backdropFilter: (scrolled || menuOpen) ? "blur(16px)" : "none",
          boxShadow: (scrolled || menuOpen) ? "0 1px 0 var(--line)" : "none",
        }}
      >
        <div
          className="container"
          style={{ position: "relative", display: "flex", alignItems: "center", height: 62 }}
        >
          {/* ── LOGO ───────────────────────────────── */}
          <a href="#" aria-label="Supremo home" style={{ flexShrink: 0, zIndex: 1, display: "flex", alignItems: "center" }}>
            <img
              src="/images/logo.png"
              alt="Supremo"
              style={{
                height: 48,
                width: "auto",
                display: "block",
                /* When on dark hero and menu closed, use screen to drop white bg */
                mixBlendMode: (!scrolled && !menuOpen) ? "multiply" : "normal",
                filter: (!scrolled && !menuOpen) ? "none" : "none",
              }}
            />
          </a>

          {/* ── DESKTOP NAV (centered, hidden on mobile) ── */}
          <nav
            className="mob-hide"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href="#"
                onMouseEnter={() => setHovered(item)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "relative",
                  color: hovered === item ? hoverClr : linkClr,
                  fontWeight: 500,
                  fontSize: 14,
                  padding: "7px 13px",
                  borderRadius: 8,
                  transition: "color .18s ease, background .18s ease",
                  background: hovered === item ? hoverBg : "transparent",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  fontFamily: "var(--font-body)",
                }}
              >
                {item}
                <span
                  style={{
                    position: "absolute",
                    bottom: 4, left: 13, right: 13,
                    height: 2,
                    borderRadius: 2,
                    background: scrolled ? "var(--blue-600)" : "#fff",
                    transform: hovered === item ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform .2s ease",
                  }}
                />
              </a>
            ))}
          </nav>

          {/* ── DESKTOP CTA (hidden on mobile) ─────── */}
          <div className="mob-hide" style={{ display: "flex", gap: 8, alignItems: "center", marginLeft: "auto", zIndex: 1 }}>
            <a
              href="#dealer"
              className={scrolled ? "nav-cta-primary" : "nav-cta-primary-light"}
              style={{
                height: 36,
                padding: "0 17px",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                fontWeight: 600,
                borderRadius: 999,
                background: scrolled ? "var(--blue-600)" : "#fff",
                color: scrolled ? "#fff" : "var(--ink)",
                transition: "transform .18s ease, background .28s ease, color .28s ease",
                cursor: "pointer",
                textDecoration: "none",
                whiteSpace: "nowrap",
                fontFamily: "var(--font-display)",
                border: "none",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-2px) scale(1.02)";
                el.style.background = scrolled ? "var(--blue-700)" : "var(--blue-50)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "";
                el.style.background = scrolled ? "var(--blue-600)" : "#fff";
              }}
            >
              Become a Dealer
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
          </div>

          {/* ── HAMBURGER (visible only on mobile) ─── */}
          <button
            className="mob-show"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              marginLeft: "auto",
              width: 40,
              height: 40,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              zIndex: 1,
              flexShrink: 0,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 22,
                  height: 2,
                  borderRadius: 2,
                  background: (scrolled || menuOpen) ? "var(--ink)" : "#fff",
                  transition: "transform .25s ease, opacity .2s ease, background .28s",
                  transform:
                    menuOpen
                      ? i === 0 ? "translateY(7px) rotate(45deg)"
                      : i === 1 ? "scaleX(0)"
                      : "translateY(-7px) rotate(-45deg)"
                      : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* ── MOBILE DROPDOWN MENU ─────────────────── */}
        <div
          ref={menuRef}
          style={{
            overflow: "hidden",
            maxHeight: menuOpen ? 420 : 0,
            transition: "max-height .32s cubic-bezier(.4,0,.2,1)",
            background: "rgba(255,255,255,.97)",
          }}
        >
          <div style={{ padding: "8px 0 20px" }}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href="#"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "13px 24px",
                  fontSize: 16,
                  fontWeight: 500,
                  color: "var(--ink)",
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                  borderBottom: "1px solid var(--line-2)",
                  transition: "background .15s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--paper-2)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                {item}
              </a>
            ))}
            <div style={{ padding: "16px 20px 0" }}>
              <a
                href="#dealer"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  height: 48,
                  borderRadius: 999,
                  background: "var(--blue-600)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: "none",
                  fontFamily: "var(--font-display)",
                }}
              >
                Become a Dealer
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop to close menu on outside tap */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 18 }}
        />
      )}
    </>
  );
}
