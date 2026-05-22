"use client";

import { useState } from "react";
import { AdminHeader } from "../_components/AdminHeader";
import { Button } from "../_components/ui";

interface Category { id: number; name: string; slug: string; products: number; color: string }

let uid = 10;

const COLORS = ["#1466E6", "#00B4F0", "#1FAE6A", "#FFB020", "#6BA1FF", "#8B5CF6"];

export default function CategoriesPage() {
  const [cats, setCats] = useState<Category[]>([
    { id: 1, name: "Water Tanks", slug: "water-tanks", products: 18, color: "#1466E6" },
    { id: 2, name: "PVC Pipes", slug: "pvc-pipes", products: 14, color: "#00B4F0" },
    { id: 3, name: "Planters", slug: "planters", products: 9, color: "#1FAE6A" },
    { id: 4, name: "Accessories", slug: "accessories", products: 7, color: "#FFB020" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");

  function addCategory() {
    if (!newName.trim()) return;
    setCats((prev) => [...prev, { id: ++uid, name: newName, slug: newName.toLowerCase().replace(/\s+/g, "-"), products: 0, color: COLORS[prev.length % COLORS.length] }]);
    setNewName("");
    setShowModal(false);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader title="Categories" breadcrumb={[{ label: "Catalog", href: "/admin/products" }, { label: "Categories" }]} />
      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 13, color: "var(--muted)" }}>Organise products into browsable categories.</p>
          <Button onClick={() => setShowModal(true)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Add Category
          </Button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {cats.map((c) => (
            <div key={c.id} style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ width: 42, height: 42, borderRadius: "var(--r-sm)", background: c.color + "1a", color: c.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  <button style={iconBtn} title="Edit"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg></button>
                  <button onClick={() => setCats((prev) => prev.filter((x) => x.id !== c.id))} style={iconBtn} title="Delete"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /></svg></button>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-display)" }}>{c.name}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "monospace", marginTop: 2 }}>/{c.slug}</div>
              </div>
              <div style={{ fontSize: 12.5, color: "var(--slate)", fontWeight: 600 }}>{c.products} products</div>
            </div>
          ))}
        </div>
      </main>

      {showModal && (
        <>
          <div style={{ position: "fixed", inset: 0, background: "rgba(10,22,40,.5)", backdropFilter: "blur(4px)", zIndex: 40 }} onClick={() => setShowModal(false)} />
          <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "min(440px, 95vw)", background: "#fff", borderRadius: "var(--r-lg)", boxShadow: "var(--sh-lg)", zIndex: 50, padding: 26 }}>
            <div style={{ fontWeight: 700, fontSize: 16, fontFamily: "var(--font-display)", color: "var(--ink)", marginBottom: 16 }}>Add New Category</div>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700 }}>Category Name</span>
              <input autoFocus value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Roto Furniture" onKeyDown={(e) => e.key === "Enter" && addCategory()} style={{ height: 44, padding: "0 13px", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", fontSize: 14, background: "var(--paper-2)", outline: "none" }} />
            </label>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 22 }}>
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button onClick={addCategory}>Add Category</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const iconBtn: React.CSSProperties = { width: 30, height: 30, borderRadius: "var(--r-xs)", border: "1px solid var(--line)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" };
