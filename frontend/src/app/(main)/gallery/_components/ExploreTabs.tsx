"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { GalleryGrid } from "./GalleryGrid";
import { blogPosts, formatDate } from "@/lib/blog";

type SectionId = "media" | "videos" | "blogs";

const videos = [
  {
    title: "Aerial Tour of the Manufacturing Complex",
    duration: "1:58",
    image: "/images/DJI_0695.jpg",
  },
  {
    title: "Inside the Rotomoulding Production Floor",
    duration: "3:42",
    image: "/images/DJI_0629.jpg",
  },
  {
    title: "Skilled Hands — How a Tank Is Built",
    duration: "2:18",
    image: "/images/DSC_1520.jpg",
  },
  {
    title: "Loading & Pan-India Dispatch",
    duration: "2:05",
    image: "/images/DSC_1441.jpg",
  },
];

const NAV: { id: SectionId; label: string; hasDropdown?: boolean }[] = [
  { id: "media", label: "Media", hasDropdown: true },
  { id: "videos", label: "Videos" },
  { id: "blogs", label: "Blogs" },
];

export function ExploreTabs() {
  const [active, setActive] = useState<SectionId>("media");
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the Media dropdown on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  // Scroll-spy: highlight the nav item for the section currently in view
  useEffect(() => {
    const ids: SectionId[] = ["media", "videos", "blogs"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id as SectionId);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const goTo = (id: SectionId) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .explore-wrap { padding-top: var(--nav-h, 62px); }

        /* Sticky section nav, parks just under the site navbar */
        .explore-stickynav {
          position: sticky;
          top: var(--nav-h, 62px);
          z-index: 15;
          background: rgba(255,255,255,.9);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--line);
        }
        .explore-tabbar {
          display: flex;
          gap: 4px;
          padding: 12px 0;
          justify-content: center;
          flex-wrap: wrap;
        }
        .explore-tab {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 20px;
          border-radius: 999px;
          font-size: 14.5px;
          font-weight: 600;
          font-family: var(--font-display);
          cursor: pointer;
          border: none;
          background: transparent;
          color: var(--slate);
          transition: background .2s ease, color .2s ease, box-shadow .2s ease;
          white-space: nowrap;
        }
        .explore-tab:hover { color: var(--blue-700); background: var(--blue-50); }
        .explore-tab.active {
          background: var(--blue-600);
          color: #fff;
          box-shadow: 0 6px 16px -6px rgba(14, 85, 188, 0.5);
        }
        .explore-tab.active:hover { background: var(--blue-700); color: #fff; }

        .explore-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%);
          min-width: 248px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: var(--r-md);
          box-shadow: 0 20px 40px -12px rgba(10, 22, 40, 0.18);
          padding: 8px;
          z-index: 30;
          animation: explore-pop .18s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes explore-pop {
          from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .explore-dropdown-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          width: 100%;
          text-align: left;
          padding: 12px 14px;
          border-radius: 10px;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: background .15s ease;
        }
        .explore-dropdown-item:hover { background: var(--blue-50); }
        .caret { transition: transform .2s ease; }
        .caret.open { transform: rotate(180deg); }

        /* Sections + scroll offset so anchors clear both nav bars */
        .explore-section {
          scroll-margin-top: calc(var(--nav-h, 62px) + 70px);
          padding: clamp(48px, 6vw, 84px) 0;
        }
        .explore-section + .explore-section { border-top: 1px solid var(--line); }

        .explore-eyebrow-row { margin-bottom: 32px; }
        .explore-eyebrow-row .eyebrow { display: inline-block; margin: 0 0 12px; }
        .explore-eyebrow-row h2 {
          font-size: clamp(24px, 3vw, 36px);
          line-height: 1.15;
          letter-spacing: -0.01em;
          margin: 0;
        }
      ` }} />

      <div className="explore-wrap">
        {/* Sticky section nav */}
        <div className="explore-stickynav">
          <div className="container">
            <nav className="explore-tabbar">
              {NAV.map((item) => {
                const isActive = active === item.id;
                if (item.hasDropdown) {
                  return (
                    <div key={item.id} ref={dropdownRef} style={{ position: "relative" }}>
                      <button
                        className={`explore-tab${isActive ? " active" : ""}`}
                        aria-expanded={menuOpen}
                        onClick={() => {
                          setMenuOpen((o) => !o);
                        }}
                      >
                        {item.label}
                        <svg
                          className={`caret${menuOpen ? " open" : ""}`}
                          width="13" height="13" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>

                      {menuOpen && (
                        <div className="explore-dropdown" role="menu">
                          <button className="explore-dropdown-item" onClick={() => goTo("media")}>
                            <span
                              style={{
                                flexShrink: 0, width: 38, height: 38, borderRadius: 10,
                                background: "var(--blue-50)", display: "grid", placeItems: "center", color: "var(--blue-600)",
                              }}
                            >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <path d="M21 15l-5-5L5 21" />
                              </svg>
                            </span>
                            <span>
                              <span style={{ display: "block", fontSize: 14.5, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-display)" }}>
                                Gallery
                              </span>
                              <span style={{ display: "block", fontSize: 12.5, color: "var(--muted)", marginTop: 2 }}>
                                Factory, plant & dispatch photos
                              </span>
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <button
                    key={item.id}
                    className={`explore-tab${isActive ? " active" : ""}`}
                    onClick={() => goTo(item.id)}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* All sections stacked on one page */}
        <div className="container">
          <section id="media" className="explore-section">
            <SectionLabel eyebrow="Media · Gallery" title="Inside our plants" />
            <GalleryGrid />
          </section>

          <section id="videos" className="explore-section">
            <SectionLabel eyebrow="Watch" title="Videos & walkthroughs" />
            <VideosGrid />
          </section>

          <section id="blogs" className="explore-section">
            <SectionLabel eyebrow="Knowledge Center" title="Guides, tips & insights" />
            <BlogsGrid />
          </section>
        </div>
      </div>
    </>
  );
}

function SectionLabel({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="explore-eyebrow-row">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
    </div>
  );
}

function VideosGrid() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .video-card {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        .video-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -8px rgba(10, 22, 40, 0.12);
          border-color: rgba(14, 85, 188, 0.15) !important;
        }
        .video-card:hover .video-thumb { transform: scale(1.06); }
        .video-card:hover .video-play-btn {
          transform: scale(1.1);
          background: #fff !important;
          box-shadow: 0 6px 20px rgba(14, 85, 188, 0.25);
        }
        @media (max-width: 1024px) and (min-width: 769px) {
          .video-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      ` }} />
      <div
        className="video-grid mob-1col mob-gap-md"
        style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}
      >
        {videos.map((v) => (
          <div
            key={v.title}
            className="video-card"
            style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "var(--r-md)", overflow: "hidden" }}
          >
            <div style={{ height: 180, position: "relative", overflow: "hidden", display: "grid", placeItems: "center" }}>
              <img
                src={v.image}
                alt={v.title}
                className="video-thumb"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "rgba(10, 22, 40, 0.45)", zIndex: 2 }} />
              <span
                className="video-play-btn"
                style={{
                  width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,.95)",
                  display: "grid", placeItems: "center", zIndex: 3,
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)", transition: "all 0.3s ease",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--blue-700)">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span
                style={{
                  position: "absolute", bottom: 12, right: 12, padding: "3px 9px",
                  background: "rgba(0,0,0,.75)", color: "#fff", borderRadius: 6,
                  fontSize: 12, fontWeight: 600, zIndex: 3, backdropFilter: "blur(4px)",
                }}
              >
                {v.duration}
              </span>
            </div>
            <div style={{ padding: 20 }}>
              <h3 style={{ fontSize: 16, lineHeight: 1.4, fontWeight: 700, color: "var(--ink)" }}>{v.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function BlogsGrid() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .blog-card {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .blog-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 32px -12px rgba(10, 22, 40, 0.12);
          border-color: rgba(14, 85, 188, 0.2) !important;
        }
        .blog-card:hover .blog-card-img { transform: scale(1.06); }
      ` }} />
      <div
        className="mob-1col mob-gap-md"
        style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}
      >
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="blog-card"
            style={{
              background: "#fff", border: "1px solid var(--line)", borderRadius: "var(--r-md)",
              overflow: "hidden", display: "flex", flexDirection: "column", textDecoration: "none",
            }}
          >
            <div style={{ height: 180, position: "relative", overflow: "hidden" }}>
              <img
                src={post.image}
                alt={post.title}
                className="blog-card-img"
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.35))" }} />
              <span
                style={{
                  position: "absolute", top: 14, left: 14, padding: "4px 12px",
                  background: "rgba(10, 22, 40, 0.65)", color: "#fff", borderRadius: 999,
                  fontSize: 11, fontWeight: 600, fontFamily: "var(--font-display)", backdropFilter: "blur(4px)", zIndex: 2,
                }}
              >
                {post.category}
              </span>
            </div>
            <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1, gap: 10 }}>
              <div style={{ display: "flex", gap: 12, fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>
                <span>{formatDate(post.date)}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <h3 style={{ fontSize: 19, lineHeight: 1.35 }}>{post.title}</h3>
              <p style={{ fontSize: 14, color: "var(--slate)", lineHeight: 1.6 }}>{post.excerpt}</p>
              <span
                style={{
                  marginTop: "auto", paddingTop: 8, display: "inline-flex", alignItems: "center", gap: 6,
                  color: "var(--blue-600)", fontWeight: 600, fontSize: 13.5, fontFamily: "var(--font-display)",
                }}
              >
                Read Article
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
