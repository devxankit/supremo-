"use client";

import { useState } from "react";
import { AdminHeader } from "../_components/AdminHeader";
import { blogPosts, formatDate } from "@/lib/blog";

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Published: { bg: "#f0fdf4", color: "#15803d" },
  Draft: { bg: "var(--paper-2)", color: "var(--muted)" },
};

const ROWS = blogPosts.map((p, i) => ({
  id: i + 1,
  title: p.title,
  category: p.category,
  date: formatDate(p.date),
  author: p.author,
  status: i === blogPosts.length - 1 ? "Draft" : "Published",
}));

export default function AdminBlogPage() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filtered = ROWS.filter((r) => r.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader title="Blog" breadcrumb={[{ label: "Blog" }]} />

      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              height: 40,
              padding: "0 14px",
              background: "var(--paper)",
              border: "1px solid var(--line)",
              borderRadius: "var(--r-sm)",
              flex: "1 1 240px",
              maxWidth: 340,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--soft)" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles…"
              style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, color: "var(--ink)", fontFamily: "var(--font-body)", width: "100%" }}
            />
          </div>

          <div style={{ marginLeft: "auto" }}>
            <button
              onClick={() => setShowModal(true)}
              style={{
                height: 40,
                padding: "0 18px",
                background: "var(--blue-600)",
                color: "#fff",
                border: "none",
                borderRadius: "var(--r-sm)",
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "var(--font-display)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                boxShadow: "0 2px 8px -2px rgba(20,102,230,.4)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Article
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", overflow: "hidden" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2.4fr 1fr 1fr 1fr 100px 80px",
              padding: "12px 20px",
              background: "var(--paper-2)",
              borderBottom: "1px solid var(--line-2)",
              gap: 12,
            }}
          >
            {["Title", "Category", "Author", "Date", "Status", ""].map((h, i) => (
              <div key={i} style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", fontFamily: "var(--font-display)" }}>
                {h}
              </div>
            ))}
          </div>

          {filtered.map((r, i) => {
            const ss = STATUS_STYLE[r.status];
            return (
              <div
                key={r.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2.4fr 1fr 1fr 1fr 100px 80px",
                  padding: "14px 20px",
                  gap: 12,
                  alignItems: "center",
                  borderBottom: i < filtered.length - 1 ? "1px solid var(--line-2)" : "none",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--paper-2)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "var(--r-sm)", background: "var(--blue-50)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{r.title}</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{r.category}</div>
                <div style={{ fontSize: 12, color: "var(--slate)" }}>{r.author}</div>
                <div style={{ fontSize: 12, color: "var(--slate)" }}>{r.date}</div>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: "var(--r-pill)", background: ss.bg, color: ss.color }}>
                    {r.status}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  <button
                    title="Edit"
                    style={{ width: 30, height: 30, borderRadius: "var(--r-xs)", border: "1px solid var(--line)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                  </button>
                  <button
                    title="Delete"
                    style={{ width: 30, height: 30, borderRadius: "var(--r-xs)", border: "1px solid var(--line)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" /></svg>
                  </button>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div style={{ padding: "48px 20px", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
              No articles found.
            </div>
          )}
        </div>

        <span style={{ fontSize: 12, color: "var(--muted)" }}>Showing {filtered.length} of {ROWS.length} articles</span>
      </main>

      {/* Add modal */}
      {showModal && (
        <>
          <div style={{ position: "fixed", inset: 0, background: "rgba(10,22,40,.5)", backdropFilter: "blur(4px)", zIndex: 40 }} onClick={() => setShowModal(false)} />
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "min(540px, 95vw)",
              background: "#fff",
              borderRadius: "var(--r-lg)",
              boxShadow: "var(--sh-lg)",
              zIndex: 50,
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "22px 26px 18px", borderBottom: "1px solid var(--line-2)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, fontFamily: "var(--font-display)", color: "var(--ink)" }}>New Article</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Draft a new Knowledge Center article.</div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                style={{ width: 32, height: 32, borderRadius: "var(--r-sm)", border: "1px solid var(--line)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div style={{ padding: "22px 26px", display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="field">
                <label>Article Title</label>
                <input type="text" placeholder="e.g. Water Tank Buying Guide" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div className="field">
                  <label>Category</label>
                  <select>
                    {["Buying Guides", "Maintenance", "Agriculture", "Gardening"].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Status</label>
                  <select>
                    <option>Draft</option>
                    <option>Published</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label>Excerpt</label>
                <input type="text" placeholder="One-line summary" />
              </div>
            </div>
            <div style={{ padding: "0 26px 22px", display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowModal(false)}
                style={{ height: 40, padding: "0 18px", background: "transparent", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-display)", cursor: "pointer", color: "var(--muted)" }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{ height: 40, padding: "0 22px", background: "var(--blue-600)", border: "none", borderRadius: "var(--r-sm)", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-display)", cursor: "pointer", color: "#fff" }}
              >
                Create Article
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
