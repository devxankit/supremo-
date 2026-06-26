"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LazyImage } from "@/components/LazyImage";
import { formatDate } from "@/lib/blog";

export function BlogList() {
  const [active, setActive] = useState("All");
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
    fetch(`${apiBase}/blogs`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        const published = data.filter((p: any) => p.status === "Published");
        setPosts(published);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading blog posts:", err);
        setLoading(false);
      });
  }, []);

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))];

  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      {/* Filter chips */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
        {categories.map((cat) => {
          const isActive = cat === active;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "var(--font-display)",
                cursor: "pointer",
                background: isActive ? "var(--blue-600)" : "var(--paper-2)",
                color: isActive ? "#fff" : "var(--slate)",
                border: `1px solid ${isActive ? "var(--blue-600)" : "var(--line)"}`,
                transition: "background .15s, color .15s",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* CSS Styles for Zoom Effect */}
      <style dangerouslySetInnerHTML={{ __html: `
        .blog-card {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .blog-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 32px -12px rgba(10, 22, 40, 0.12);
          border-color: rgba(14, 85, 188, 0.2) !important;
        }
        .blog-card:hover .blog-card-img {
          transform: scale(1.06);
        }
      `}} />

      {/* Grid */}
      {loading ? (
        <div style={{ padding: "48px 0", textAlign: "center", color: "var(--muted)", fontSize: 14 }}>
          Loading articles...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ padding: "48px 0", textAlign: "center", color: "var(--muted)", fontSize: 14 }}>
          No articles found under this category.
        </div>
      ) : (
        <div
          className="mob-1col mob-gap-md"
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}
        >
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card"
              style={{
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: "var(--r-md)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  height: 180,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <LazyImage
                  src={post.image}
                  alt={post.title}
                  className="blog-card-img"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/overhead_tank.png";
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.35))",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    padding: "4px 12px",
                    background: "rgba(10, 22, 40, 0.65)",
                    color: "#fff",
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: 600,
                    fontFamily: "var(--font-display)",
                    backdropFilter: "blur(4px)",
                    zIndex: 2,
                  }}
                >
                  {post.category}
                </span>
              </div>
              <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1, gap: 10 }}>
                <div style={{ display: "flex", gap: 12, fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>
                  <span>{formatDate(post.date)}</span>
                </div>
                <h3 style={{ fontSize: 19, lineHeight: 1.35, color: "var(--ink)" }}>{post.title}</h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--slate)",
                    lineHeight: 1.6,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {post.excerpt}
                </p>
                <span
                  style={{
                    marginTop: "auto",
                    paddingTop: 8,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    color: "var(--blue-600)",
                    fontWeight: 600,
                    fontSize: 13.5,
                    fontFamily: "var(--font-display)",
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
      )}
    </>
  );
}
