"use client";

import { useState } from "react";
import Link from "next/link";
import { blogCategories, blogPosts, formatDate } from "@/lib/blog";

export function BlogList() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? blogPosts : blogPosts.filter((p) => p.category === active);

  return (
    <>
      {/* Filter chips */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
        {blogCategories.map((cat) => {
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

      {/* Grid */}
      <div
        className="mob-1col mob-gap-md"
        style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}
      >
        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="hover-lift-sm"
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
                height: 150,
                background: "linear-gradient(135deg,var(--blue-700),var(--blue-900))",
                display: "grid",
                placeItems: "center",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 14,
                  left: 14,
                  padding: "4px 12px",
                  background: "rgba(255,255,255,.15)",
                  color: "#fff",
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 600,
                  fontFamily: "var(--font-display)",
                }}
              >
                {post.category}
              </span>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="1.5" strokeLinecap="round">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5z" />
              </svg>
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
    </>
  );
}
