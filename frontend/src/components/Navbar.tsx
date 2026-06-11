"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useHeroTheme } from "@/components/HeroThemeContext";

/* Hero image/video theme switch — same idea as a dark/light toggle. */
function HeroThemeToggle({ compact = false }: { compact?: boolean }) {
  const { mode, setMode } = useHeroTheme();
  const isVideo = mode === "video";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isVideo}
      aria-label={isVideo ? "Switch hero to image" : "Switch hero to video"}
      title={isVideo ? "Hero: Video" : "Hero: Image"}
      onClick={() => setMode(isVideo ? "image" : "video")}
      style={{
        position: "relative",
        width: 60,
        height: 30,
        flexShrink: 0,
        borderRadius: 999,
        border: "1px solid var(--line)",
        background: "var(--paper-2, #f1f5f9)",
        cursor: "pointer",
        padding: 0,
        display: "inline-flex",
        alignItems: "center",
        marginRight: compact ? 0 : 4,
      }}
    >
      {/* sliding knob */}
      <span
        style={{
          position: "absolute",
          top: 2,
          left: isVideo ? 32 : 2,
          width: 24,
          height: 24,
          borderRadius: 999,
          background: "var(--blue-600)",
          boxShadow: "0 2px 6px rgba(14,85,188,.35)",
          transition: "left .22s cubic-bezier(.16,1,.3,1)",
          zIndex: 1,
        }}
      />
      {/* image icon (left) */}
      <span style={{ position: "absolute", left: 7, top: 0, bottom: 0, display: "flex", alignItems: "center", zIndex: 2 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isVideo ? "var(--muted)" : "#fff"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </span>
      {/* video icon (right) */}
      <span style={{ position: "absolute", right: 7, top: 0, bottom: 0, display: "flex", alignItems: "center", zIndex: 2 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isVideo ? "#fff" : "var(--muted)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="5 3 19 12 5 21 5 3" fill={isVideo ? "#fff" : "none"} />
        </svg>
      </span>
    </button>
  );
}

const NAV_ITEMS = [
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Dealership", href: "/dealership" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setMenuOpen(false);
    const onResize = () => { if (window.innerWidth > 1024) setMenuOpen(false); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // One sticky, solid white bar everywhere — the hero is now a light panel,
  // so there is no transparent-over-photo state.
  const isScrolled = true;

  const navBg = isScrolled ? "rgba(255,255,255,.97)" : "transparent";
  const linkClr = isScrolled ? "var(--ink)" : "rgba(255,255,255,.85)";
  const hoverClr = isScrolled ? "var(--blue-600)" : "#fff";
  const hoverBg = isScrolled ? "var(--blue-50)" : "rgba(255,255,255,.1)";

  return (
    <>
      {/* Styles for responsive navbar height and logo size */}
      <style dangerouslySetInnerHTML={{
        __html: `
        :root {
          --nav-h: 62px;
        }
        .navbar-inner {
          height: var(--nav-h);
          transition: height 0.28s ease;
        }
        .navbar-logo {
          height: 64px;
          transition: height 0.28s ease;
        }
        /* Navbar-specific collapse so the 8-item nav never crowds the CTA.
           Collapses to the hamburger at 1024px, independent of the global
           .mob-hide / .mob-show utilities (which flip at 768px). */
        .nav-desktop-links { display: flex; }
        .nav-desktop-cta { display: flex; }
        .nav-mobile-toggle { display: none !important; }
        @media (max-width: 1024px) {
          .nav-desktop-links, .nav-desktop-cta { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
          :root {
            --nav-h: 70px;
          }
          .navbar-logo {
            height: 62px;
          }
          .navbar-hamburger-line {
            background-color: var(--ink) !important;
          }
        }
      `}} />

      <div
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 20,
          transition: "background .28s ease, box-shadow .28s ease",
          background: menuOpen ? "rgba(255,255,255,.97)" : navBg,
          backdropFilter: (isScrolled || menuOpen) ? "blur(16px)" : "none",
          boxShadow: (isScrolled || menuOpen) ? "0 1px 0 var(--line)" : "none",
        }}
      >
        <div
          className="container navbar-inner"
          style={{ position: "relative", display: "flex", alignItems: "center" }}
        >
          {/* ── LOGO ───────────────────────────────── */}
          <Link href="/" aria-label="Supremo home" style={{ flex: "1 1 0", minWidth: 0, zIndex: 1, display: "flex", alignItems: "center" }}>
            <img
              src="/images/logo.png"
              alt="Supremo"
              className="navbar-logo"
              style={{
                width: "auto",
                display: "block",
                mixBlendMode: (!isScrolled && !menuOpen) ? "multiply" : "normal",
                filter: (!isScrolled && !menuOpen) ? "none" : "none",
              }}
            />
          </Link>

          {/* ── DESKTOP NAV (centered, hidden on mobile) ── */}
          <nav
            className="nav-desktop-links"
            style={{
              flex: "0 0 auto",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onMouseEnter={() => setHovered(item.label)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    position: "relative",
                    color: hovered === item.label ? hoverClr : active ? "var(--blue-600)" : linkClr,
                    fontWeight: active ? 600 : 500,
                    fontSize: 16,
                    padding: "7px 11px",
                    borderRadius: 8,
                    transition: "color .18s ease, background .18s ease",
                    background: hovered === item.label ? hoverBg : "transparent",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {item.label}
                  <span
                    style={{
                      position: "absolute",
                      bottom: 4, left: 11, right: 11,
                      height: 2,
                      borderRadius: 2,
                      background: isScrolled ? "var(--blue-600)" : "#fff",
                      transform: (hovered === item.label || active) ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "left",
                      transition: "transform .2s ease",
                    }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ── DESKTOP CTA (hidden on mobile) ─────── */}
          <div className="nav-desktop-cta" style={{ flex: "1 1 0", display: "flex", gap: 10, alignItems: "center", justifyContent: "flex-end", zIndex: 1 }}>
            <HeroThemeToggle />
            <a
              href="/catalogue.pdf"
              download="Supremo_Catalogue.pdf"
              className={isScrolled ? "nav-cta-primary" : "nav-cta-primary-light"}
              style={{
                height: 36,
                padding: "0 17px",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                fontWeight: 600,
                borderRadius: 999,
                background: isScrolled ? "var(--blue-600)" : "#fff",
                color: isScrolled ? "#fff" : "var(--ink)",
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
                el.style.background = isScrolled ? "var(--blue-700)" : "var(--blue-50)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "";
                el.style.background = isScrolled ? "var(--blue-600)" : "#fff";
              }}
            >
              Download Catalogue
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
            </a>
          </div>

          {/* ── HAMBURGER (visible only on mobile) ─── */}
          <button
            className="nav-mobile-toggle"
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
                className="navbar-hamburger-line"
                style={{
                  display: "block",
                  width: 22,
                  height: 2,
                  borderRadius: 2,
                  background: (isScrolled || menuOpen) ? "var(--ink)" : "#fff",
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
            maxHeight: menuOpen ? "calc(100vh - var(--nav-h))" : "0",
            transition: "max-height .4s cubic-bezier(0.16, 1, 0.3, 1), opacity .3s ease",
            opacity: menuOpen ? 1 : 0,
            background: "rgba(255,255,255,.98)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
          }}
        >
          <div
            style={{
              overflowY: "auto",
              maxHeight: "calc(100vh - var(--nav-h))",
              transform: menuOpen ? "translateY(0)" : "translateY(-16px)",
              transition: "transform .4s cubic-bezier(0.16, 1, 0.3, 1)",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div style={{ padding: "8px 0 24px" }}>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "block",
                    padding: "14px 24px",
                    fontSize: 16,
                    fontWeight: pathname === item.href ? 600 : 500,
                    color: pathname === item.href ? "var(--blue-600)" : "var(--ink)",
                    textDecoration: "none",
                    fontFamily: "var(--font-body)",
                    borderBottom: "1px solid var(--line-2)",
                    transition: "background .15s, color .15s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--paper-2)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  {item.label}
                </Link>
              ))}
              <div style={{ padding: "18px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)", fontFamily: "var(--font-body)" }}>
                  Hero: Image / Video
                </span>
                <HeroThemeToggle compact />
              </div>
              <div style={{ padding: "16px 24px 0" }}>
                <a
                  href="/catalogue.pdf"
                  download="Supremo_Catalogue.pdf"
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
                    boxShadow: "0 4px 12px rgba(14, 85, 188, 0.2)",
                    transition: "transform .2s, background .2s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "scale(1.02)";
                    el.style.background = "var(--blue-700)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "scale(1)";
                    el.style.background = "var(--blue-600)";
                  }}
                >
                  Download Catalogue
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                </a>
              </div>
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
