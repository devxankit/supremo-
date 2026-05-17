"use client";

import { useState } from "react";
import { AdminHeader } from "../_components/AdminHeader";

const FILTERS = ["All", "Factory", "Products", "Events", "Dealer Meets"];

const MEDIA = [
  { id: 1, name: "rotomoulding-line-indore.jpg", category: "Factory", size: "2.4 MB" },
  { id: 2, name: "triple-layer-tank-shoot.jpg", category: "Products", size: "1.8 MB" },
  { id: 3, name: "qc-lab-pressure-test.jpg", category: "Factory", size: "3.1 MB" },
  { id: 4, name: "dealer-meet-pune-2025.jpg", category: "Dealer Meets", size: "2.0 MB" },
  { id: 5, name: "cpvc-pipe-range.jpg", category: "Products", size: "1.5 MB" },
  { id: 6, name: "plastindia-booth.jpg", category: "Events", size: "2.7 MB" },
  { id: 7, name: "warehouse-dispatch.jpg", category: "Factory", size: "2.2 MB" },
  { id: 8, name: "planter-collection.jpg", category: "Products", size: "1.9 MB" },
  { id: 9, name: "south-dealer-conclave.jpg", category: "Dealer Meets", size: "2.5 MB" },
  { id: 10, name: "sales-awards-night.jpg", category: "Events", size: "3.4 MB" },
];

const catColor: Record<string, string> = {
  Factory: "linear-gradient(135deg,var(--blue-800),var(--ink))",
  Products: "linear-gradient(135deg,var(--blue-600),var(--blue-900))",
  Events: "linear-gradient(135deg,var(--blue-700),#062D6B)",
  "Dealer Meets": "linear-gradient(135deg,var(--ink-2),var(--blue-800))",
};

export default function AdminMediaPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const filtered = MEDIA.filter((m) => {
    const matchFilter = filter === "All" || m.category === filter;
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader title="Media Library" breadcrumb={[{ label: "Media" }]} />

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
              maxWidth: 320,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--soft)" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search files…"
              style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, color: "var(--ink)", fontFamily: "var(--font-body)", width: "100%" }}
            />
          </div>

          <div style={{ display: "flex", gap: 4, background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", padding: "4px" }}>
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  height: 30,
                  padding: "0 12px",
                  borderRadius: 6,
                  border: "none",
                  background: filter === f ? "var(--blue-600)" : "transparent",
                  color: filter === f ? "#fff" : "var(--muted)",
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "var(--font-display)",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {f}
              </button>
            ))}
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
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
              </svg>
              Upload Media
            </button>
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
          {filtered.map((m) => (
            <div
              key={m.id}
              style={{
                background: "var(--paper)",
                border: "1px solid var(--line-2)",
                borderRadius: "var(--r-md)",
                overflow: "hidden",
                boxShadow: "var(--sh-sm)",
              }}
            >
              <div
                style={{
                  height: 130,
                  background: catColor[m.category],
                  display: "grid",
                  placeItems: "center",
                  position: "relative",
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    padding: "3px 9px",
                    background: "rgba(255,255,255,.16)",
                    color: "#fff",
                    borderRadius: 999,
                    fontSize: 10,
                    fontWeight: 600,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {m.category}
                </span>
              </div>
              <div style={{ padding: "12px 14px" }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {m.name}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                  <span style={{ fontSize: 11, color: "var(--muted)" }}>{m.size}</span>
                  <button
                    title="Delete"
                    style={{ width: 26, height: 26, borderRadius: "var(--r-xs)", border: "1px solid var(--line)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ padding: "48px 20px", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
            No media files found.
          </div>
        )}

        <span style={{ fontSize: 12, color: "var(--muted)" }}>Showing {filtered.length} of {MEDIA.length} files</span>
      </main>

      {/* Upload modal */}
      {showModal && (
        <>
          <div style={{ position: "fixed", inset: 0, background: "rgba(10,22,40,.5)", backdropFilter: "blur(4px)", zIndex: 40 }} onClick={() => setShowModal(false)} />
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "min(500px, 95vw)",
              background: "#fff",
              borderRadius: "var(--r-lg)",
              boxShadow: "var(--sh-lg)",
              zIndex: 50,
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "22px 26px 18px", borderBottom: "1px solid var(--line-2)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, fontFamily: "var(--font-display)", color: "var(--ink)" }}>Upload Media</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Add images to the gallery library.</div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                style={{ width: 32, height: 32, borderRadius: "var(--r-sm)", border: "1px solid var(--line)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div style={{ padding: "22px 26px", display: "flex", flexDirection: "column", gap: 16 }}>
              <div
                style={{
                  border: "2px dashed var(--line)",
                  borderRadius: "var(--r-md)",
                  padding: "36px 20px",
                  textAlign: "center",
                  background: "var(--paper-2)",
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 10px" }}>
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                </svg>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>Drag & drop files here</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>or click to browse — JPG, PNG up to 5 MB</div>
              </div>
              <div className="field">
                <label>Category</label>
                <select>
                  {FILTERS.slice(1).map((f) => <option key={f}>{f}</option>)}
                </select>
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
                Upload
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
