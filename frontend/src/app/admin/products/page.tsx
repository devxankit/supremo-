"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "../_components/AdminHeader";
import { adminAuth } from "../_services/adminAuth";
import { LazyImage } from "@/components/LazyImage";

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  "Active":       { bg: "#f0fdf4",  color: "#15803d" },
  "Out of Stock": { bg: "#fef2f2",  color: "#dc2626" },
  "Low Stock":    { bg: "#fffbeb",  color: "#b45309" },
  "Draft":        { bg: "var(--paper-2)", color: "var(--muted)" },
};

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState<number>(0);
  const [status, setStatus] = useState("Active");
  
  // Dynamic page details
  const [tagline, setTagline] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [badgesText, setBadgesText] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [newSize, setNewSize] = useState("");
  const [colors, setColors] = useState<{ name: string; hex: string }[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");
  const [applications, setApplications] = useState<string[]>([]);
  const [newApplication, setNewApplication] = useState("");
  const [specs, setSpecs] = useState<{ label: string; value: string }[]>([]);
  const [newSpecLabel, setNewSpecLabel] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");

  const [brochureUrl, setBrochureUrl] = useState("");
  const [showBrochure, setShowBrochure] = useState(true);
  const [uploadingBrochure, setUploadingBrochure] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/products`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/categories`),
      ]);

      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProducts(prodData);
      }
      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(catData);
      }
    } catch (err) {
      console.error("Error loading products/categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setEditingProduct(null);
    setName("");
    setCategory(categories[0]?.slug || "");
    setSku("");
    setPrice("");
    setStock(0);
    setStatus("Active");
    setTagline("");
    setCapacity("");
    setDescription("");
    setBadgesText("");
    setSizes([]);
    setNewSize("");
    setColors([]);
    setImageUrl("");
    setFeatures([]);
    setNewFeature("");
    setApplications([]);
    setNewApplication("");
    setSpecs([]);
    setNewSpecLabel("");
    setNewSpecValue("");
    setBrochureUrl("");
    setShowBrochure(true);
    setShowModal(true);
  };

  const openEditModal = (p: any) => {
    setEditingProduct(p);
    setName(p.name || "");
    setCategory(p.category || "");
    setSku(p.sku || "");
    setPrice(p.price || "");
    setStock(p.stock || 0);
    setStatus(p.status || "Active");
    setTagline(p.tagline || "");
    setCapacity(p.capacity || "");
    setDescription(p.description || "");
    setBadgesText(p.badges ? p.badges.join(", ") : "");
    setSizes(p.sizes || []);
    setNewSize("");
    setColors(p.colors || []);
    setImageUrl(p.images && p.images.length > 0 ? p.images[0] : "");
    setFeatures(p.features || []);
    setNewFeature("");
    setApplications(p.applications || []);
    setNewApplication("");
    setSpecs(p.specs || []);
    setNewSpecLabel("");
    setNewSpecValue("");
    setBrochureUrl(p.brochureUrl || "");
    setShowBrochure(p.showBrochure !== false);
    setShowModal(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const user = adminAuth.getUser();
    if (!user?.token) {
      alert("Not authenticated. Please log in.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/media/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setImageUrl(data.url);
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(`Image upload failed: ${errData.message || res.statusText}`);
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Error uploading image. Check console for details.");
    } finally {
      setUploading(false);
    }
  };

  const handleBrochureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const user = adminAuth.getUser();
    if (!user?.token) {
      alert("Not authenticated. Please log in.");
      return;
    }

    setUploadingBrochure(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/media/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setBrochureUrl(data.url);
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(`Brochure upload failed: ${errData.message || res.statusText}`);
      }
    } catch (err) {
      console.error("Error uploading brochure:", err);
      alert("Error uploading brochure. Check console for details.");
    } finally {
      setUploadingBrochure(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const user = adminAuth.getUser();
    if (!user?.token) {
      alert("Not authenticated. Please log in.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== id && p.id !== id));
        window.dispatchEvent(new Event("product-updated"));
      } else {
        const errData = await res.json();
        alert(errData.message || "Failed to delete product");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const saveProduct = async () => {
    const finalSku = editingProduct ? sku : (name.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-" + Date.now());
    if (!name.trim() || !finalSku.trim() || !price.trim()) {
      alert("Please fill in Name and Price.");
      return;
    }
    const user = adminAuth.getUser();
    if (!user?.token) {
      alert("Not authenticated. Please log in.");
      return;
    }

    const payload = {
      name,
      slug: editingProduct ? editingProduct.slug : name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      sku: finalSku,
      category,
      price: price.startsWith("₹") ? price : `₹${price}`,
      stock,
      status,
      tagline,
      capacity,
      description,
      badges: badgesText.split(",").map((s) => s.trim()).filter(Boolean),
      sizes,
      colors,
      images: imageUrl ? [imageUrl] : [],
      features,
      applications,
      specs,
      brochureUrl,
      showBrochure,
    };

    try {
      const id = editingProduct ? (editingProduct._id || editingProduct.id) : null;
      const url = editingProduct
        ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/products/${id}`
        : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/products`;
      const method = editingProduct ? "PUT" : "POST";

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
        fetchData();
        window.dispatchEvent(new Event("product-updated"));
      } else {
        const errData = await res.json();
        alert(errData.message || "Failed to save product");
      }
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const getCategoryName = (slug: string) => {
    const cat = categories.find((c) => c.slug === slug);
    return cat ? cat.name : slug;
  };

  const filtered = products.filter((p) => {
    const matchCat = activeTab === "All" || p.category === activeTab;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
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
              placeholder="Search products…"
              style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, color: "var(--ink)", fontFamily: "var(--font-body)", width: "100%" }}
            />
          </div>

          {/* Category tabs */}
          <div style={{ display: "flex", gap: 4, background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", padding: "4px", overflowX: "auto", maxWidth: "100%" }}>
            <button
              onClick={() => setActiveTab("All")}
              style={{
                height: 30,
                padding: "0 12px",
                borderRadius: 6,
                border: "none",
                background: activeTab === "All" ? "var(--blue-600)" : "transparent",
                color: activeTab === "All" ? "#fff" : "var(--muted)",
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "var(--font-display)",
                cursor: "pointer",
                transition: "background .15s, color .15s",
                whiteSpace: "nowrap",
              }}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                onClick={() => setActiveTab(c.slug)}
                style={{
                  height: 30,
                  padding: "0 12px",
                  borderRadius: 6,
                  border: "none",
                  background: activeTab === c.slug ? "var(--blue-600)" : "transparent",
                  color: activeTab === c.slug ? "#fff" : "var(--muted)",
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "var(--font-display)",
                  cursor: "pointer",
                  transition: "background .15s, color .15s",
                  whiteSpace: "nowrap",
                }}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div style={{ marginLeft: "auto" }}>
            <button
              onClick={openAddModal}
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
        {loading ? (
          <div style={{ padding: "48px 0", textAlign: "center", color: "var(--muted)", fontSize: 14 }}>
            Loading products...
          </div>
        ) : (
          <div className="adm-table-scroll" style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", overflow: "hidden" }}>
            {/* Table header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2.5fr 1.2fr 80px 80px 100px 80px",
                padding: "12px 20px",
                background: "var(--paper-2)",
                borderBottom: "1px solid var(--line-2)",
                gap: 12,
              }}
            >
              {["Product", "Category", "Stock", "Price", "Status", ""].map((h, i) => (
                <div key={i} style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", fontFamily: "var(--font-display)" }}>
                  {h}
                </div>
              ))}
            </div>

            {/* Rows */}
            {filtered.map((p, i) => {
              const ss = STATUS_STYLE[p.status] || STATUS_STYLE["Active"];
              return (
                <div
                  key={p._id || p.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2.5fr 1.2fr 80px 80px 100px 80px",
                    padding: "14px 20px",
                    gap: 12,
                    alignItems: "center",
                    borderBottom: i < filtered.length - 1 ? "1px solid var(--line-2)" : "none",
                    transition: "background .12s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: "var(--r-sm)", background: "var(--blue-50)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {p.images && p.images.length > 0 ? (
                        <LazyImage src={p.images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "var(--r-sm)" }} />
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2" strokeLinecap="round">
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        </svg>
                      )}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{p.name}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>{getCategoryName(p.category)}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: p.stock === 0 ? "#dc2626" : p.stock < 10 ? "#b45309" : "var(--ink)" }}>{p.stock}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{p.price}</div>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: "var(--r-pill)", background: ss.bg, color: ss.color }}>
                      {p.status}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button
                      onClick={() => openEditModal(p)}
                      style={{ width: 30, height: 30, borderRadius: "var(--r-xs)", border: "1px solid var(--line)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)", transition: "all .12s" }}
                      title="Edit"
                      onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = "var(--blue-50)"; el.style.color = "var(--blue-600)"; el.style.borderColor = "var(--blue-200)"; }}
                      onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = "transparent"; el.style.color = "var(--muted)"; el.style.borderColor = "var(--line)"; }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                    </button>
                    <button
                      onClick={() => deleteProduct((p._id || p.id) as string)}
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
        )}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>Showing {filtered.length} of {products.length} products</span>
        </div>
      </main>

      {/* Add / Edit Product Modal */}
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
              width: "min(900px, 95vw)",
              background: "#fff",
              borderRadius: "var(--r-lg)",
              boxShadow: "var(--sh-lg)",
              zIndex: 50,
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "22px 26px 18px", borderBottom: "1px solid var(--line-2)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                  {editingProduct ? "Edit Product Details" : "Add New Product"}
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Configure specs, sizes, colours and brochure assets dynamically.</div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                style={{ width: 32, height: 32, borderRadius: "var(--r-sm)", border: "1px solid var(--line)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            
            <div style={{ padding: "22px 26px", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 20, maxHeight: "65vh", overflowY: "auto" }}>
              
              {/* Left Column - Core Fields */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Product Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Triple Layer 500L Water Tank"
                    style={{ width: "100%", height: 40, padding: "0 12px", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", outline: "none", fontSize: 13 }}
                  />
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ width: "100%", height: 40, padding: "0 10px", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", outline: "none", fontSize: 13, background: "#fff" }}
                  >
                    {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                  </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 14 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Price (₹)</label>
                    <input
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g. 3,200"
                      style={{ width: "100%", height: 40, padding: "0 12px", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", outline: "none", fontSize: 13 }}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Stock Quantity</label>
                    <input
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(parseInt(e.target.value) || 0)}
                      placeholder="0"
                      min="0"
                      style={{ width: "100%", height: 40, padding: "0 12px", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", outline: "none", fontSize: 13 }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={{ width: "100%", height: 40, padding: "0 10px", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", outline: "none", fontSize: 13, background: "#fff" }}
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Low Stock">Low Stock</option>
                  </select>
                </div>

                {/* Image Upload */}
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Product Image</label>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    {imageUrl ? (
                      <LazyImage
                        src={imageUrl}
                        alt="Preview"
                        style={{ width: 56, height: 56, objectFit: "contain", borderRadius: "var(--r-sm)", border: "1px solid var(--line)" }}
                      />
                    ) : (
                      <div style={{ width: 56, height: 56, borderRadius: "var(--r-sm)", border: "1px dashed var(--line)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "var(--muted)" }}>None</div>
                    )}
                    <label
                      style={{
                        height: 36,
                        padding: "0 12px",
                        background: "var(--paper-2)",
                        border: "1px solid var(--line)",
                        borderRadius: "var(--r-sm)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: 600,
                        color: "var(--slate)",
                        cursor: "pointer",
                        transition: "background .15s",
                      }}
                    >
                      {uploading ? "Uploading..." : "Upload Image"}
                      <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                    </label>
                  </div>
                </div>

                {/* Key Features */}
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Key Features</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      type="text"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="e.g. 100% UV Protection"
                      style={{ flex: 1, height: 40, padding: "0 12px", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", outline: "none", fontSize: 13 }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (newFeature.trim()) {
                            if (!features.includes(newFeature.trim())) {
                              setFeatures([...features, newFeature.trim()]);
                            }
                            setNewFeature("");
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newFeature.trim()) {
                          if (!features.includes(newFeature.trim())) {
                            setFeatures([...features, newFeature.trim()]);
                          }
                          setNewFeature("");
                        }
                      }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "var(--r-sm)",
                        background: "var(--blue-100)",
                        border: "1px solid var(--blue-200)",
                        color: "var(--blue-600)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: 18,
                        transition: "background .15s",
                      }}
                    >
                      +
                    </button>
                  </div>
                  {features.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4, maxHeight: 120, overflowY: "auto" }}>
                      {features.map((ft, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            background: "var(--paper-2)",
                            border: "1px solid var(--line)",
                            borderRadius: "var(--r-sm)",
                            padding: "6px 12px",
                            fontSize: 12.5,
                            fontWeight: 600,
                            color: "var(--slate)",
                          }}
                        >
                          <span>{ft}</span>
                          <button
                            type="button"
                            onClick={() => setFeatures(features.filter((_, i) => i !== idx))}
                            style={{
                              border: "none",
                              background: "transparent",
                              color: "#ef4444",
                              cursor: "pointer",
                              padding: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Where is it used */}
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Where is it used (Applications)</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      type="text"
                      value={newApplication}
                      onChange={(e) => setNewApplication(e.target.value)}
                      placeholder="e.g. Rooftop domestic storage"
                      style={{ flex: 1, height: 40, padding: "0 12px", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", outline: "none", fontSize: 13 }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (newApplication.trim()) {
                            if (!applications.includes(newApplication.trim())) {
                              setApplications([...applications, newApplication.trim()]);
                            }
                            setNewApplication("");
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newApplication.trim()) {
                          if (!applications.includes(newApplication.trim())) {
                            setApplications([...applications, newApplication.trim()]);
                          }
                          setNewApplication("");
                        }
                      }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "var(--r-sm)",
                        background: "var(--blue-100)",
                        border: "1px solid var(--blue-200)",
                        color: "var(--blue-600)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: 18,
                        transition: "background .15s",
                      }}
                    >
                      +
                    </button>
                  </div>
                  {applications.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4, maxHeight: 120, overflowY: "auto" }}>
                      {applications.map((ap, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            background: "var(--paper-2)",
                            border: "1px solid var(--line)",
                            borderRadius: "var(--r-sm)",
                            padding: "6px 12px",
                            fontSize: 12.5,
                            fontWeight: 600,
                            color: "var(--slate)",
                          }}
                        >
                          <span>{ap}</span>
                          <button
                            type="button"
                            onClick={() => setApplications(applications.filter((_, i) => i !== idx))}
                            style={{
                              border: "none",
                              background: "transparent",
                              color: "#ef4444",
                              cursor: "pointer",
                              padding: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Brochure Upload */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Product Brochure (Image or PDF)</label>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    {brochureUrl ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", padding: "6px 12px", flex: 1, minWidth: 0 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2" strokeLinecap="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                        <a href={brochureUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "var(--blue-600)", fontWeight: 600, textDecoration: "underline", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", flex: 1 }}>
                          {brochureUrl.split("/").pop() || "View Brochure"}
                        </a>
                        <button
                          type="button"
                          onClick={() => setBrochureUrl("")}
                          style={{ border: "none", background: "transparent", color: "#ef4444", cursor: "pointer", padding: 0 }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div style={{ flex: 1, height: 36, borderRadius: "var(--r-sm)", border: "1px dashed var(--line)", display: "flex", alignItems: "center", paddingLeft: 12, fontSize: 12, color: "var(--muted)" }}>No Brochure Uploaded</div>
                    )}
                    <label
                      style={{
                        height: 36,
                        padding: "0 12px",
                        background: "var(--paper-2)",
                        border: "1px solid var(--line)",
                        borderRadius: "var(--r-sm)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: 600,
                        color: "var(--slate)",
                        cursor: "pointer",
                        transition: "background .15s",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {uploadingBrochure ? "Uploading..." : "Upload Brochure"}
                      <input type="file" accept="image/*,application/pdf" onChange={handleBrochureUpload} style={{ display: "none" }} />
                    </label>
                  </div>
                </div>

                {/* Show Brochure Toggle */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                  <input
                    type="checkbox"
                    id="showBrochure"
                    checked={showBrochure}
                    onChange={(e) => setShowBrochure(e.target.checked)}
                    style={{ width: 16, height: 16, cursor: "pointer" }}
                  />
                  <label htmlFor="showBrochure" style={{ fontSize: 12, fontWeight: 600, color: "var(--slate)", cursor: "pointer" }}>
                    Show "Download Brochure" button to users
                  </label>
                </div>
              </div>

              {/* Right Column - Product Page Spec Details */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Tagline</label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="e.g. Our best-selling tank — three layers of protection."
                    style={{ width: "100%", height: 40, padding: "0 12px", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", outline: "none", fontSize: 13 }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 14 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Capacity / Range</label>
                    <input
                      type="text"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      placeholder="e.g. 200 L – 10,000 L"
                      style={{ width: "100%", height: 40, padding: "0 12px", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", outline: "none", fontSize: 13 }}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Badges (comma-separated)</label>
                    <input
                      type="text"
                      value={badgesText}
                      onChange={(e) => setBadgesText(e.target.value)}
                      placeholder="e.g. ISI Marked, Food-Grade"
                      style={{ width: "100%", height: 40, padding: "0 12px", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", outline: "none", fontSize: 13 }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Available Sizes</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      type="text"
                      value={newSize}
                      onChange={(e) => setNewSize(e.target.value)}
                      placeholder="e.g. 500 L or 25 mm"
                      style={{ flex: 1, height: 40, padding: "0 12px", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", outline: "none", fontSize: 13 }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (newSize.trim()) {
                            if (!sizes.includes(newSize.trim())) {
                              setSizes([...sizes, newSize.trim()]);
                            }
                            setNewSize("");
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newSize.trim()) {
                          if (!sizes.includes(newSize.trim())) {
                            setSizes([...sizes, newSize.trim()]);
                          }
                          newSize && setNewSize("");
                        }
                      }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "var(--r-sm)",
                        background: "var(--blue-100)",
                        border: "1px solid var(--blue-200)",
                        color: "var(--blue-600)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: 18,
                        transition: "background .15s",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "var(--blue-200)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "var(--blue-100)"}
                    >
                      +
                    </button>
                  </div>
                  {sizes.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                      {sizes.map((sz, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            background: "var(--paper-2)",
                            border: "1px solid var(--line)",
                            borderRadius: "var(--r-pill)",
                            padding: "4px 10px 4px 12px",
                            fontSize: 12,
                            fontWeight: 600,
                            color: "var(--slate)",
                          }}
                        >
                          <span>{sz}</span>
                          <button
                            type="button"
                            onClick={() => setSizes(sizes.filter((_, i) => i !== idx))}
                            style={{
                              border: "none",
                              background: "transparent",
                              color: "var(--muted)",
                              cursor: "pointer",
                              padding: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 10,
                            }}
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide a detailed description of the product and materials used..."
                    rows={2}
                    style={{ width: "100%", padding: "10px 12px", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", outline: "none", fontSize: 13, resize: "vertical", fontFamily: "inherit" }}
                  />
                </div>

                {/* Colors section */}
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Colour Options</label>
                    <button
                      type="button"
                      onClick={() => setColors([...colors, { name: "", hex: "#0E55BC" }])}
                      style={{ background: "transparent", border: "none", color: "var(--blue-600)", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                    >
                      + Add Color
                    </button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4, maxHeight: 110, overflowY: "auto" }}>
                    {colors.map((c, idx) => (
                      <div key={idx} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input
                          type="text"
                          value={c.name}
                          onChange={(e) => {
                            const newColors = [...colors];
                            newColors[idx].name = e.target.value;
                            setColors(newColors);
                          }}
                          placeholder="e.g. Supremo Blue"
                          style={{ flex: 1, minWidth: 0, height: 34, padding: "0 10px", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", fontSize: 12.5 }}
                        />
                        <input
                          type="color"
                          value={c.hex}
                          onChange={(e) => {
                            const newColors = [...colors];
                            newColors[idx].hex = e.target.value;
                            setColors(newColors);
                          }}
                          style={{ width: 34, height: 34, border: "1px solid var(--line)", borderRadius: "var(--r-sm)", cursor: "pointer", padding: 0 }}
                        />
                        <button
                          type="button"
                          onClick={() => setColors(colors.filter((_, i) => i !== idx))}
                          style={{ width: 32, height: 34, display: "grid", placeItems: "center", border: "1px solid #fecaca", borderRadius: "var(--r-sm)", background: "#fef2f2", color: "#ef4444", cursor: "pointer" }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Details (Specs) */}
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Technical Details (Specifications)</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      type="text"
                      value={newSpecLabel}
                      onChange={(e) => setNewSpecLabel(e.target.value)}
                      placeholder="Label (e.g. Material)"
                      style={{ flex: 1, minWidth: 0, height: 40, padding: "0 10px", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", outline: "none", fontSize: 13 }}
                    />
                    <input
                      type="text"
                      value={newSpecValue}
                      onChange={(e) => setNewSpecValue(e.target.value)}
                      placeholder="Value (e.g. LLDPE)"
                      style={{ flex: 1, minWidth: 0, height: 40, padding: "0 10px", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", outline: "none", fontSize: 13 }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (newSpecLabel.trim() && newSpecValue.trim()) {
                            setSpecs([...specs, { label: newSpecLabel.trim(), value: newSpecValue.trim() }]);
                            setNewSpecLabel("");
                            setNewSpecValue("");
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newSpecLabel.trim() && newSpecValue.trim()) {
                          setSpecs([...specs, { label: newSpecLabel.trim(), value: newSpecValue.trim() }]);
                          setNewSpecLabel("");
                          setNewSpecValue("");
                        }
                      }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "var(--r-sm)",
                        background: "var(--blue-100)",
                        border: "1px solid var(--blue-200)",
                        color: "var(--blue-600)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: 18,
                        transition: "background .15s",
                      }}
                    >
                      +
                    </button>
                  </div>
                  {specs.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4, maxHeight: 150, overflowY: "auto" }}>
                      {specs.map((sp, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            background: "var(--paper-2)",
                            border: "1px solid var(--line)",
                            borderRadius: "var(--r-sm)",
                            padding: "6px 12px",
                            fontSize: 12.5,
                            fontWeight: 600,
                            color: "var(--slate)",
                          }}
                        >
                          <div style={{ display: "flex", gap: 8 }}>
                            <span style={{ color: "var(--muted)" }}>{sp.label}:</span>
                            <span style={{ color: "var(--ink)" }}>{sp.value}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSpecs(specs.filter((_, i) => i !== idx))}
                            style={{
                              border: "none",
                              background: "transparent",
                              color: "#ef4444",
                              cursor: "pointer",
                              padding: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>

            </div>

            <div style={{ padding: "16px 26px 22px", borderTop: "1px solid var(--line-2)", display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowModal(false)}
                style={{ height: 40, padding: "0 18px", background: "transparent", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-display)", cursor: "pointer", color: "var(--muted)" }}
              >
                Cancel
              </button>
              <button
                onClick={saveProduct}
                style={{ height: 40, padding: "0 22px", background: "var(--blue-600)", border: "none", borderRadius: "var(--r-sm)", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-display)", cursor: "pointer", color: "#fff" }}
              >
                {editingProduct ? "Save Changes" : "Add Product"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
