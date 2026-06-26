"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "../_components/AdminHeader";
import { Button, Field, TextArea } from "../_components/ui";
import { adminAuth } from "../_services/adminAuth";
import { LazyImage } from "@/components/LazyImage";

interface Category {
  _id?: string;
  id?: string;
  name: string;
  slug: string;
  products: number;
  color: string;
  eyebrow?: string;
  blurb?: string;
  icon?: "tank" | "pipe" | "box" | "plant";
}

const COLORS = ["#1466E6", "#00B4F0", "#1FAE6A", "#FFB020", "#6BA1FF", "#8B5CF6", "#E5484D"];
const ICONS = ["tank", "pipe", "plant", "box"];

export default function CategoriesPage() {
  const [cats, setCats] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCat, setEditingCat] = useState<Category | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [color, setColor] = useState("#1466E6");
  const [eyebrow, setEyebrow] = useState("");
  const [blurb, setBlurb] = useState("");
  const [icon, setIcon] = useState<"tank" | "pipe" | "box" | "plant">("box");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/categories`);
      if (res.ok) {
        const data = await res.json();
        setCats(data);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openAddModal = () => {
    setEditingCat(null);
    setName("");
    setSlug("");
    setColor("#1466E6");
    setEyebrow("");
    setBlurb("");
    setIcon("box");
    setImageUrl("");
    setShowModal(true);
  };

  const openEditModal = (c: Category) => {
    setEditingCat(c);
    setName(c.name);
    setSlug(c.slug);
    setColor(c.color || "#1466E6");
    setEyebrow(c.eyebrow || "");
    setBlurb(c.blurb || "");
    setIcon(c.icon || "box");
    setImageUrl((c as any).image || "");
    setShowModal(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingCat) {
      setSlug(val.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
    }
  };

  const saveCategory = async () => {
    if (!name.trim()) return;
    const user = adminAuth.getUser();
    if (!user?.token) {
      alert("Not authenticated. Please log in.");
      return;
    }

    const payload = {
      name,
      slug: slug.trim() || name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      color,
      eyebrow,
      blurb,
      icon,
      image: imageUrl,
    };

    try {
      const id = editingCat ? (editingCat._id || editingCat.id) : null;
      const url = editingCat
        ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/categories/${id}`
        : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/categories`;
      const method = editingCat ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowModal(false);
        fetchCategories();
      } else {
        const errData = await res.json();
        alert(errData.message || "Failed to save category");
      }
    } catch (err) {
      console.error("Error saving category:", err);
    }
  };

  const handleCatImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const user = adminAuth.getUser();
    if (!user?.token) { alert("Not authenticated."); return; }
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/media/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${user.token}` },
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setImageUrl(data.url);
      } else {
        const err = await res.json().catch(() => ({}));
        alert(`Upload failed: ${err.message || res.statusText}`);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading image.");
    } finally {
      setUploading(false);
    }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    const user = adminAuth.getUser();
    if (!user?.token) {
      alert("Not authenticated. Please log in.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.ok) {
        setCats((prev) => prev.filter((c) => c._id !== id && c.id !== id));
      } else {
        const errData = await res.json();
        alert(errData.message || "Failed to delete category");
      }
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  const renderCategoryIcon = (type?: string) => {
    if (type === "tank") {
      return (
        <svg width="22" height="22" viewBox="0 0 120 100" fill="none">
          <ellipse cx="60" cy="18" rx="42" ry="8" fill="currentColor" opacity="0.3" />
          <path d="M18 18 Q20 88 60 90 Q100 88 102 18" fill="none" stroke="currentColor" strokeWidth="6" />
          <ellipse cx="60" cy="18" rx="42" ry="8" fill="currentColor" opacity="0.6" />
        </svg>
      );
    }
    if (type === "pipe") {
      return (
        <svg width="22" height="22" viewBox="0 0 120 80" fill="none">
          <rect x="10" y="30" width="100" height="20" rx="10" stroke="currentColor" strokeWidth="6" />
          <rect x="8" y="26" width="16" height="28" rx="4" fill="currentColor" />
          <rect x="96" y="26" width="16" height="28" rx="4" fill="currentColor" />
        </svg>
      );
    }
    if (type === "plant") {
      return (
        <svg width="22" height="22" viewBox="0 0 120 100" fill="none">
          <path d="M30 85 Q40 55 60 40 Q80 55 90 85" stroke="currentColor" strokeWidth="6" fill="none" />
          <line x1="60" y1="40" x2="60" y2="86" stroke="currentColor" strokeWidth="6" />
          <ellipse cx="60" cy="88" rx="30" ry="6" fill="currentColor" opacity="0.3" />
        </svg>
      );
    }
    // default "box"
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader title="Categories" breadcrumb={[{ label: "Catalog", href: "/admin/products" }, { label: "Categories" }]} />
      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 13, color: "var(--muted)" }}>Organise products into browsable categories.</p>
          <Button onClick={openAddModal}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Add Category
          </Button>
        </div>

        {loading ? (
          <div style={{ padding: "48px 0", textAlign: "center", color: "var(--muted)", fontSize: 14 }}>
            Loading categories...
          </div>
        ) : cats.length === 0 ? (
          <div style={{ padding: "48px 0", textAlign: "center", color: "var(--muted)", fontSize: 14, background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px dashed var(--line)" }}>
            No categories found. Click "Add Category" to create one.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {cats.map((c) => (
              <div key={c._id || c.id} style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ width: 42, height: 42, borderRadius: "var(--r-sm)", overflow: "hidden", border: "1px solid var(--line-2)", display: "flex", alignItems: "center", justifyContent: "center", background: (c as any).image ? "#fff" : (c.color || "#1466E6") + "1a", color: c.color || "#1466E6" }}>
                    {(c as any).image ? (
                      <LazyImage src={(c as any).image} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    ) : (
                      renderCategoryIcon(c.icon)
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button onClick={() => openEditModal(c)} style={iconBtn} title="Edit"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg></button>
                    <button onClick={() => deleteCategory((c._id || c.id) as string)} style={iconBtn} title="Delete"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /></svg></button>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-display)" }}>{c.name}</div>
                </div>
                <div style={{ fontSize: 12.5, color: "var(--slate)", fontWeight: 600 }}>{c.products} products</div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <>
          <div style={{ position: "fixed", inset: 0, background: "rgba(10,22,40,.5)", backdropFilter: "blur(4px)", zIndex: 40 }} onClick={() => setShowModal(false)} />
          <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "min(460px, 95vw)", background: "#fff", borderRadius: "var(--r-lg)", boxShadow: "var(--sh-lg)", zIndex: 50, padding: 26, maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ fontWeight: 700, fontSize: 16, fontFamily: "var(--font-display)", color: "var(--ink)", marginBottom: 18 }}>
              {editingCat ? "Edit Category" : "Add New Category"}
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Field
                label="Category Name"
                value={name}
                onChange={handleNameChange}
                placeholder="e.g. Roto Furniture"
              />

              {/* Category Image */}
              <div>
                <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, fontFamily: "var(--font-display)", display: "block", marginBottom: 6 }}>
                  Category Image
                </span>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  {imageUrl ? (
                    <div style={{ position: "relative", width: 64, height: 64, borderRadius: "var(--r-sm)", border: "1px solid var(--line)", overflow: "hidden", flexShrink: 0 }}>
                      <LazyImage src={imageUrl} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                      <button
                        type="button"
                        onClick={() => setImageUrl("")}
                        style={{ position: "absolute", top: 2, right: 2, width: 18, height: 18, borderRadius: "50%", background: "rgba(0,0,0,0.6)", border: "none", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 10 }}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div style={{ width: 64, height: 64, borderRadius: "var(--r-sm)", border: "1px dashed var(--line)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "var(--muted)", flexShrink: 0 }}>No image</div>
                  )}
                  <label
                    style={{
                      height: 36, padding: "0 14px", background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)",
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 600, color: "var(--slate)", cursor: "pointer",
                    }}
                  >
                    {uploading ? "Uploading…" : "Upload Image"}
                    <input type="file" accept="image/*" onChange={handleCatImageUpload} style={{ display: "none" }} />
                  </label>
                </div>
              </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 24 }}>
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button onClick={saveCategory}>{editingCat ? "Save Changes" : "Add Category"}</Button>
            </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const iconBtn: React.CSSProperties = { width: 30, height: 30, borderRadius: "var(--r-xs)", border: "1px solid var(--line)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" };
