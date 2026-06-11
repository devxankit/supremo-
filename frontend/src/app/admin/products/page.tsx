"use client";

import { useState } from "react";
import { AdminHeader } from "../_components/AdminHeader";

const CATEGORIES = ["All", "Water Tanks", "PVC Pipes", "Planters", "Cooler", "Unbreakable products", "Waste Management", "Toilet Seat"];

const PRODUCTS = [
  { id: 1, name: "Triple Layer 500L Water Tank", category: "Water Tanks", sku: "WTK-500-TL", stock: 84, price: "₹3,200", status: "Active" },
  { id: 2, name: "Triple Layer 1000L Water Tank", category: "Water Tanks", sku: "WTK-1000-TL", stock: 56, price: "₹5,800", status: "Active" },
  { id: 3, name: "Triple Layer 1500L Water Tank", category: "Water Tanks", sku: "WTK-1500-TL", stock: 32, price: "₹8,100", status: "Active" },
  { id: 4, name: "Triple Layer 2000L Water Tank", category: "Water Tanks", sku: "WTK-2000-TL", stock: 18, price: "₹10,500", status: "Active" },
  { id: 5, name: "ISI PVC Pipe 1/2 inch", category: "PVC Pipes", sku: "PVC-0.5-ISI", stock: 620, price: "₹42/mtr", status: "Active" },
  { id: 6, name: "ISI PVC Pipe 1 inch", category: "PVC Pipes", sku: "PVC-1.0-ISI", stock: 440, price: "₹78/mtr", status: "Active" },
  { id: 7, name: "ISI PVC Pipe 2 inch", category: "PVC Pipes", sku: "PVC-2.0-ISI", stock: 210, price: "₹145/mtr", status: "Active" },
  { id: 8, name: "Garden Planter 12\"", category: "Planters", sku: "PLN-12-GRN", stock: 0, price: "₹280", status: "Out of Stock" },
  { id: 9, name: "Decorative Planter 18\"", category: "Planters", sku: "PLN-18-DEC", stock: 44, price: "₹520", status: "Active" },
  { id: 10, name: "Tank Cleaning Brush Kit", category: "Cooler", sku: "ACC-CLN-01", stock: 96, price: "₹180", status: "Active" },
  { id: 11, name: "Overflow Kit Standard", category: "Cooler", sku: "ACC-OVF-STD", stock: 130, price: "₹95", status: "Active" },
  { id: 12, name: "Float Valve Assembly", category: "Cooler", sku: "ACC-FLT-V1", stock: 5, price: "₹220", status: "Low Stock" },
  { id: 13, name: "Ghamela Heavy Duty", category: "Unbreakable products", sku: "UBP-GHA-HD", stock: 120, price: "₹150", status: "Active" },
  { id: 14, name: "Garbage Bin 120L", category: "Waste Management", sku: "WST-GBN-120", stock: 45, price: "₹1,200", status: "Active" },
  { id: 15, name: "Soft-Close Toilet Seat", category: "Toilet Seat", sku: "TS-SC-01", stock: 24, price: "₹850", status: "Active" },
];

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  "Active":       { bg: "#f0fdf4",  color: "#15803d" },
  "Out of Stock": { bg: "#fef2f2",  color: "#dc2626" },
  "Low Stock":    { bg: "#fffbeb",  color: "#b45309" },
  "Draft":        { bg: "var(--paper-2)", color: "var(--muted)" },
};

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader title="Products" breadcrumb={[{ label: "Products" }]} />

      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 20 }}>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          {/* Search */}
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
              transition: "border-color .15s",
            }}
            onFocusCapture={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--blue-600)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 3px var(--blue-100)"; }}
            onBlurCapture={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--line)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--soft)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products or SKU…"
              style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, color: "var(--ink)", fontFamily: "var(--font-body)", width: "100%" }}
            />
          </div>

          {/* Category tabs */}
          <div style={{ display: "flex", gap: 4, background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", padding: "4px" }}>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                style={{
                  height: 30,
                  padding: "0 12px",
                  borderRadius: 6,
                  border: "none",
                  background: category === c ? "var(--blue-600)" : "transparent",
                  color: category === c ? "#fff" : "var(--muted)",
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "var(--font-display)",
                  cursor: "pointer",
                  transition: "background .15s, color .15s",
                  whiteSpace: "nowrap",
                }}
              >
                {c}
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
                transition: "background .15s",
                boxShadow: "0 2px 8px -2px rgba(20,102,230,.4)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--blue-700)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--blue-600)"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              Add Product
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="adm-table-scroll" style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", overflow: "hidden" }}>
          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1.2fr 80px 80px 100px 80px",
              padding: "12px 20px",
              background: "var(--paper-2)",
              borderBottom: "1px solid var(--line-2)",
              gap: 12,
            }}
          >
            {["Product", "Category", "SKU", "Stock", "Price", "Status", ""].map((h, i) => (
              <div key={i} style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", fontFamily: "var(--font-display)" }}>
                {h}
              </div>
            ))}
          </div>

          {/* Rows */}
          {filtered.map((p, i) => {
            const ss = STATUS_STYLE[p.status];
            return (
              <div
                key={p.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1.2fr 80px 80px 100px 80px",
                  padding: "14px 20px",
                  gap: 12,
                  alignItems: "center",
                  borderBottom: i < filtered.length - 1 ? "1px solid var(--line-2)" : "none",
                  transition: "background .12s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--paper-2)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "var(--r-sm)", background: "var(--blue-50)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2" strokeLinecap="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{p.name}</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{p.category}</div>
                <div style={{ fontSize: 12, color: "var(--slate)", fontFamily: "monospace", letterSpacing: "0.03em" }}>{p.sku}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: p.stock === 0 ? "#dc2626" : p.stock < 10 ? "#b45309" : "var(--ink)" }}>{p.stock}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{p.price}</div>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: "var(--r-pill)", background: ss.bg, color: ss.color }}>
                    {p.status}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  <button
                    style={{ width: 30, height: 30, borderRadius: "var(--r-xs)", border: "1px solid var(--line)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)", transition: "all .12s" }}
                    title="Edit"
                    onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = "var(--blue-50)"; el.style.color = "var(--blue-600)"; el.style.borderColor = "var(--blue-200)"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = "transparent"; el.style.color = "var(--muted)"; el.style.borderColor = "var(--line)"; }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                  </button>
                  <button
                    style={{ width: 30, height: 30, borderRadius: "var(--r-xs)", border: "1px solid var(--line)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)", transition: "all .12s" }}
                    title="Delete"
                    onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = "#fef2f2"; el.style.color = "#ef4444"; el.style.borderColor = "#fecaca"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = "transparent"; el.style.color = "var(--muted)"; el.style.borderColor = "var(--line)"; }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" /></svg>
                  </button>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div style={{ padding: "48px 20px", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
              No products found matching your search.
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>Showing {filtered.length} of {PRODUCTS.length} products</span>
        </div>
      </main>

      {/* Add Product Modal */}
      {showModal && (
        <>
          <div
            style={{ position: "fixed", inset: 0, background: "rgba(10,22,40,.5)", backdropFilter: "blur(4px)", zIndex: 40 }}
            onClick={() => setShowModal(false)}
          />
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "min(520px, 95vw)",
              background: "#fff",
              borderRadius: "var(--r-lg)",
              boxShadow: "var(--sh-lg)",
              zIndex: 50,
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "22px 26px 18px", borderBottom: "1px solid var(--line-2)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, fontFamily: "var(--font-display)", color: "var(--ink)" }}>Add New Product</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Fill in the details below to add a new product.</div>
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
                <label>Product Name</label>
                <input type="text" placeholder="e.g. Triple Layer 500L Water Tank" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div className="field">
                  <label>Category</label>
                  <select>
                    {CATEGORIES.slice(1).map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>SKU</label>
                  <input type="text" placeholder="e.g. WTK-500-TL" />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div className="field">
                  <label>Price (₹)</label>
                  <input type="text" placeholder="e.g. 3,200" />
                </div>
                <div className="field">
                  <label>Stock Quantity</label>
                  <input type="number" placeholder="0" min="0" />
                </div>
              </div>
              <div className="field">
                <label>Status</label>
                <select>
                  <option>Active</option>
                  <option>Draft</option>
                  <option>Out of Stock</option>
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
                Add Product
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
