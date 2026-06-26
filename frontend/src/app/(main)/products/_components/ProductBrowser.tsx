"use client";

import { useMemo, useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import { LazyImage } from "@/components/LazyImage";

type ProductColor = { name: string; hex: string };

type Product = {
  _id?: string;
  slug: string;
  category: string;
  name: string;
  tagline?: string;
  capacity?: string;
  description?: string;
  badges?: string[];
  features?: string[];
  applications?: string[];
  sizes?: string[];
  colors?: ProductColor[];
  specs?: { label: string; value: string }[];
  modelNo?: string;
  images?: string[];
  price?: string;
  stock?: number;
  status?: string;
};

type Category = {
  _id?: string;
  slug: string;
  name: string;
  color?: string;
  icon?: string;
  image?: string;
  products?: number;
};

type SortKey = "featured" | "az" | "za";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg className={`pb-acc-chev ${open ? "is-open" : ""}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function formatSize(size: string): string {
  const match = size.match(/^(\d+)([a-zA-Z\s]+)$/);
  if (match) {
    const num = parseInt(match[1], 10);
    const unit = match[2].trim();
    return `${num.toLocaleString()} ${unit}`;
  }
  return size;
}

export function ProductBrowser({
  initialCategory = null,
  hasHero = true,
}: {
  initialCategory?: string | null;
  hasHero?: boolean;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const [activeCat, setActiveCat] = useState<string>(initialCategory ?? "all");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");
  const [openCat, setOpenCat] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openSize, setOpenSize] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoadingData(true);
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/categories`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/products`),
        ]);
        if (catRes.ok) {
          const catData: Category[] = await catRes.json();
          setCategories(catData);
          // Set valid initial category
          if (initialCategory && catData.some((c) => c.slug === initialCategory)) {
            setActiveCat(initialCategory);
          }
        }
        if (prodRes.ok) {
          const prodData: Product[] = await prodRes.json();
          setProducts(prodData);
        }
      } catch (err) {
        console.error("Failed to load categories/products:", err);
      } finally {
        setLoadingData(false);
      }
    };
    loadData();
  }, [initialCategory]);

  // Keep the URL shareable when the category changes
  useEffect(() => {
    const url = activeCat === "all" ? "/products" : `/products?category=${activeCat}`;
    if (typeof window !== "undefined" && window.location.pathname + window.location.search !== url) {
      window.history.replaceState(null, "", url);
    }
  }, [activeCat]);

  const catLabel = (slug: string) =>
    categories.find((c) => c.slug === slug)?.name ?? "Products";

  const inCategory = useMemo(
    () => (activeCat === "all" ? products : products.filter((p) => p.category === activeCat)),
    [activeCat, products]
  );

  const colorOptions = useMemo(() => {
    const map = new Map<string, string>();
    inCategory.forEach((p) => (p.colors || []).forEach((c) => map.set(c.name, c.hex)));
    return Array.from(map, ([name, hex]) => ({ name, hex }));
  }, [inCategory]);

  const sizeOptions = useMemo(() => {
    const set = new Set<string>();
    inCategory.forEach((p) => (p.sizes || []).forEach((s) => set.add(s)));
    return Array.from(set);
  }, [inCategory]);

  const isPlanters = activeCat === "planters";
  const modelOptions = useMemo(
    () => (isPlanters ? inCategory.map((p) => p.modelNo).filter((m): m is string => !!m) : []),
    [isPlanters, inCategory]
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out = inCategory.filter((p) => {
      if (q && !(`${p.name} ${p.tagline ?? ""} ${p.capacity ?? ""}`.toLowerCase().includes(q))) return false;
      if (selectedColors.length && !(p.colors || []).some((c) => selectedColors.includes(c.name))) return false;
      if (selectedSizes.length && !(p.sizes || []).some((s) => selectedSizes.includes(s))) return false;
      if (isPlanters && selectedModel !== "all" && p.modelNo !== selectedModel) return false;
      return true;
    });
    if (sort === "az") out.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "za") out.sort((a, b) => b.name.localeCompare(a.name));
    return out;
  }, [inCategory, query, selectedColors, selectedSizes, sort, isPlanters, selectedModel]);

  const selectCategory = (slug: string) => {
    setActiveCat(slug);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedModel("all");
    setQuery("");
    setOpenCat(false);
  };

  const toggle = (value: string, list: string[], setter: (v: string[]) => void) =>
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const activeFilterCount =
    selectedColors.length + selectedSizes.length + (query ? 1 : 0) + (selectedModel !== "all" ? 1 : 0);
  const clearAll = () => {
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedModel("all");
    setQuery("");
  };

  if (loadingData) {
    return (
      <section style={{ background: "var(--paper)", paddingTop: hasHero ? "clamp(40px,5vw,72px)" : "clamp(86px,9vw,116px)", paddingBottom: "clamp(56px,7vw,104px)", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", color: "var(--muted)", fontSize: 15 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--blue-400)" strokeWidth="2" strokeLinecap="round" style={{ display: "block", margin: "0 auto 12px", animation: "spin 1s linear infinite" }}>
            <circle cx="12" cy="12" r="10" opacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" />
          </svg>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          Loading products…
        </div>
      </section>
    );
  }

  return (
    <section style={{ background: "var(--paper)", paddingTop: hasHero ? "clamp(40px,5vw,72px)" : "clamp(86px,9vw,116px)", paddingBottom: "clamp(56px,7vw,104px)" }}>
      <style>{browserCss}</style>
      <div className="container">
        <div className="pb-layout">
          {/* ─── Sidebar: categories + filters ─── */}
          <aside className="pb-rail">
            <div className="pb-rail-inner">
              {/* Mobile search — pinned at the top on phones */}
              <div className="pb-block pb-search-mobile">
                <div className="pb-search">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.3-4.3" />
                  </svg>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Find a product…"
                    aria-label="Search products"
                  />
                </div>
              </div>

              {/* Mobile filter row */}
              <div className="pb-filter-row">
                <button
                  type="button"
                  className={`pb-fr-btn ${openCat ? "is-open" : ""}`}
                  onClick={() => setOpenCat((o) => !o)}
                  aria-expanded={openCat}
                  aria-label="Toggle category filter"
                >
                  <svg className="pb-fr-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" />
                    <rect x="14" y="14" width="7" height="7" rx="1.5" />
                  </svg>
                  <span>Category</span>
                  <Chevron open={openCat} />
                </button>
                <button
                  type="button"
                  className={`pb-fr-btn ${openColor ? "is-open" : ""}`}
                  onClick={() => setOpenColor((o) => !o)}
                  aria-expanded={openColor}
                  aria-label="Toggle colour filter"
                  disabled={colorOptions.length === 0}
                >
                  <svg className="pb-fr-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 1 0 0 20 2 2 0 0 0 2-2v-1a1.5 1.5 0 0 1 1.5-1.5H18a4 4 0 0 0 4-4 8 8 0 0 0-8-8z" />
                    <circle cx="7.5" cy="11.5" r="1" />
                    <circle cx="10.5" cy="7" r="1" />
                    <circle cx="15" cy="7.5" r="1" />
                    <circle cx="17.5" cy="11.5" r="1" />
                  </svg>
                  <span>Colour</span>
                  {selectedColors.length > 0 && <span className="pb-fr-badge">{selectedColors.length}</span>}
                  <Chevron open={openColor} />
                </button>
                <button
                  type="button"
                  className={`pb-fr-btn ${openSize ? "is-open" : ""}`}
                  onClick={() => setOpenSize((o) => !o)}
                  aria-expanded={openSize}
                  aria-label="Toggle size filter"
                  disabled={sizeOptions.length === 0}
                >
                  <svg className="pb-fr-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="9" width="20" height="8" rx="1" />
                    <path d="M6 9v3M9 9v2M12 9v3M15 9v2M18 9v3" />
                  </svg>
                  <span>Size</span>
                  {selectedSizes.length > 0 && <span className="pb-fr-badge">{selectedSizes.length}</span>}
                  <Chevron open={openSize} />
                </button>
              </div>

              {/* Categories */}
              <div className="pb-block pb-cat-block">
                <p className="pb-cat-block-head">Categories</p>
                <nav className={`pb-cats ${openCat ? "is-open" : ""}`}>
                  <button
                    type="button"
                    onClick={() => selectCategory("all")}
                    className={`pb-cat ${activeCat === "all" ? "is-active" : ""}`}
                  >
                    <span className="pb-cat-icon pb-cat-icon--all">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" rx="1.5" />
                        <rect x="14" y="3" width="7" height="7" rx="1.5" />
                        <rect x="3" y="14" width="7" height="7" rx="1.5" />
                        <rect x="14" y="14" width="7" height="7" rx="1.5" />
                      </svg>
                    </span>
                    <span className="pb-cat-label">All Products</span>
                    <span className="pb-cat-count">{products.length}</span>
                  </button>
                  {categories.map((c) => {
                    const count = products.filter((p) => p.category === c.slug).length;
                    const active = activeCat === c.slug;
                    return (
                      <button
                        key={c.slug}
                        type="button"
                        onClick={() => selectCategory(c.slug)}
                        className={`pb-cat ${active ? "is-active" : ""}`}
                      >
                        <span className="pb-cat-icon">
                          {c.image ? (
                            <LazyImage src={c.image} alt={c.name} />
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                            </svg>
                          )}
                        </span>
                        <span className="pb-cat-label">{c.name}</span>
                        <span className="pb-cat-count">{count}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Filters */}
              <div className="pb-filters">
                {/* Search (desktop sidebar) */}
                <div className="pb-block pb-search-desktop">
                  <div className="pb-search">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <circle cx="11" cy="11" r="7" />
                      <path d="M21 21l-4.3-4.3" />
                    </svg>
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Find a product…"
                      aria-label="Search products"
                    />
                  </div>
                </div>

                {/* Colour */}
                {colorOptions.length > 0 && (
                  <div className="pb-block pb-acc-card-wrapper">
                    <div className="pb-acc-card">
                      <button
                        type="button"
                        className="pb-acc-card-head"
                        onClick={() => setOpenColor((o) => !o)}
                        aria-expanded={openColor}
                      >
                        <span className="pb-acc-card-title">Colour</span>
                        {selectedColors.length > 0 && (
                          <span className="pb-acc-card-badge">{selectedColors.length}</span>
                        )}
                        <Chevron open={openColor} />
                      </button>
                      {openColor && (
                        <div className="pb-acc-card-body">
                          <div className="pb-color-list">
                            {colorOptions.map((c) => {
                              const on = selectedColors.includes(c.name);
                              return (
                                <button
                                  key={c.name}
                                  type="button"
                                  onClick={() => toggle(c.name, selectedColors, setSelectedColors)}
                                  className={`pb-color-item ${on ? "is-on" : ""}`}
                                >
                                  <span className="pb-color-dot" style={{ background: c.hex }} />
                                  <span className="pb-color-name">{c.name}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Size */}
                {sizeOptions.length > 0 && (
                  <div className="pb-block pb-acc-card-wrapper">
                    <div className="pb-acc-card">
                      <button
                        type="button"
                        className="pb-acc-card-head"
                        onClick={() => setOpenSize((o) => !o)}
                        aria-expanded={openSize}
                      >
                        <span className="pb-acc-card-title">Size / Capacity</span>
                        {selectedSizes.length > 0 && (
                          <span className="pb-acc-card-badge">{selectedSizes.length}</span>
                        )}
                        <Chevron open={openSize} />
                      </button>
                      {openSize && (
                        <div className="pb-acc-card-body">
                          <div className="pb-size-grid">
                            {sizeOptions.map((s) => {
                              const on = selectedSizes.includes(s);
                              return (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => toggle(s, selectedSizes, setSelectedSizes)}
                                  className={`pb-size-pill ${on ? "is-on" : ""}`}
                                >
                                  {formatSize(s)}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeFilterCount > 0 && (
                  <button type="button" className="pb-clear" onClick={clearAll}>
                    Clear filters ({activeFilterCount})
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* ─── Main: toolbar + product/category grid ─── */}
          <div className="pb-main">
            <div className="pb-toolbar">
              <div>
                <h2 className="pb-heading">
                  {activeCat === "all" ? "Browse Categories" : catLabel(activeCat)}
                </h2>
                <p className="pb-count">
                  {activeCat === "all" ? (
                    <>{categories.length} {categories.length === 1 ? "category" : "categories"}</>
                  ) : (
                    <>
                      {visible.length} {visible.length === 1 ? "product" : "products"}
                      {activeFilterCount > 0 ? " · filtered" : ""}
                    </>
                  )}
                </p>
              </div>
              {activeCat !== "all" && (
                <div className="pb-toolbar-right">
                  {isPlanters && modelOptions.length > 0 && (
                    <label className="pb-sort">
                      <span>Model No</span>
                      <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
                        <option value="all">All Models</option>
                        {modelOptions.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </label>
                  )}
                  <label className="pb-sort">
                    <span>Sort</span>
                    <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
                      <option value="featured">Featured</option>
                      <option value="az">Name A–Z</option>
                      <option value="za">Name Z–A</option>
                    </select>
                  </label>
                </div>
              )}
            </div>

            {activeCat === "all" ? (
              <div className="pb-cat-grid">
                {categories.map((c) => {
                  const count = products.filter((p) => p.category === c.slug).length;
                  // Priority: 1) admin-uploaded category image, 2) first product image in category
                  const catImage = c.image ||
                    products.find((p) => p.category === c.slug && p.images && p.images.length > 0)?.images?.[0];
                  return (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => selectCategory(c.slug)}
                      className="pb-cat-tile"
                    >
                      <span className="pb-cat-tile-img">
                        {catImage ? (
                          <LazyImage src={catImage} alt={c.name} />
                        ) : (
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--blue-400)" strokeWidth="1.5" strokeLinecap="round">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                          </svg>
                        )}
                      </span>
                      <span className="pb-cat-tile-label">
                        <span className="pb-cat-tile-text">
                          {c.name}
                          <span className="pb-cat-tile-count">
                            {count} {count === 1 ? "product" : "products"}
                          </span>
                        </span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : visible.length === 0 ? (
              <div className="pb-empty">
                <p style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)" }}>No products match your filters</p>
                <p style={{ color: "var(--muted)", marginTop: 6, fontSize: 14.5 }}>Try removing a colour or size filter.</p>
                <button type="button" className="btn btn--outline btn--sm" style={{ marginTop: 18 }} onClick={clearAll}>
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="pb-grid">
                {visible.map((p) => (
                  <ProductCard
                    key={`${p.category}/${p.slug}`}
                    href={`/products/${p.category}/${p.slug}`}
                    name={p.name}
                    image={p.images && p.images.length > 0 ? p.images[0] : "/images/logo.png"}
                    categoryLabel={catLabel(p.category)}
                    capacity={p.capacity ?? ""}
                    tags={(p.specs || []).slice(0, 1).map((s) => `${s.label}: ${s.value}`)}
                    badges={(p.badges || []).map((b) => ({ label: b }))}
                    tagline={p.tagline ?? ""}
                    swatches={(p.colors || []).map((c) => c.hex)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const browserCss = `
  .pb-layout { display: grid; grid-template-columns: 260px 1fr; gap: 32px; align-items: start; }
  @media (max-width: 900px) { .pb-layout { grid-template-columns: 1fr; } }

  /* Rail */
  .pb-rail { position: sticky; top: 80px; }
  .pb-rail-inner { display: flex; flex-direction: column; gap: 0; }
  @media (max-width: 900px) { .pb-rail { position: static; } }

  /* Blocks */
  .pb-block { padding: 20px 0; border-bottom: 1px solid var(--line-2); }
  .pb-block:last-child { border-bottom: none; }

  /* Categories block */
  .pb-cat-block-head { font-size: 10px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin: 0 0 10px; }
  .pb-cats { display: flex; flex-direction: column; gap: 2px; }
  .pb-cat { display: flex; align-items: center; gap: 10px; width: 100%; padding: 9px 10px; border: none; background: transparent; border-radius: var(--r-sm); cursor: pointer; text-align: left; color: var(--slate); font-size: 13.5px; font-weight: 500; transition: background .12s, color .12s; }
  .pb-cat:hover { background: var(--blue-50); color: var(--ink); }
  .pb-cat.is-active { background: var(--blue-100); color: var(--blue-700); font-weight: 700; }
  .pb-cat-icon { width: 28px; height: 28px; border-radius: 6px; background: var(--paper-2); border: 1px solid var(--line); display: grid; place-items: center; flex-shrink: 0; overflow: hidden; }
  .pb-cat-icon img { width: 100%; height: 100%; object-fit: contain; }
  .pb-cat-icon--all { background: var(--blue-50); border-color: var(--blue-100); }
  .pb-cat-label { flex: 1; }
  .pb-cat-count { margin-left: auto; font-size: 11px; font-weight: 700; background: var(--paper-2); border: 1px solid var(--line); border-radius: 999px; padding: 1px 7px; color: var(--muted); }

  /* Filters section */
  .pb-filters { display: flex; flex-direction: column; gap: 0; }
  .pb-search { display: flex; align-items: center; gap: 10px; border: 1px solid var(--line); border-radius: var(--r-sm); padding: 0 12px; height: 40px; background: #fff; }
  .pb-search input { flex: 1; border: none; outline: none; font-size: 13.5px; color: var(--ink); background: transparent; }
  .pb-search input::placeholder { color: var(--soft); }

  /* Accordion filters */
  .pb-acc-head { display: flex; align-items: center; gap: 8px; width: 100%; border: none; background: transparent; padding: 0; font-size: 13.5px; font-weight: 700; color: var(--slate); cursor: pointer; }
  .pb-acc-head span:first-child { flex: 1; text-align: left; }
  .pb-acc-badge { background: var(--blue-600); color: #fff; font-size: 10px; font-weight: 800; border-radius: 999px; padding: 1px 6px; }
  .pb-acc-chev { color: var(--muted); transition: transform .15s; }
  .pb-acc-chev.is-open { transform: rotate(180deg); }
  .pb-acc-body { margin-top: 12px; }

  /* Chips */
  .pb-chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .pb-color { display: flex; align-items: center; gap: 6px; padding: 5px 10px; border: 1px solid var(--line); border-radius: 999px; background: #fff; cursor: pointer; font-size: 12.5px; color: var(--slate); font-weight: 500; transition: all .12s; }
  .pb-color.is-on { border-color: var(--blue-600); background: var(--blue-50); color: var(--blue-700); font-weight: 700; }
  .pb-color-dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; border: 1px solid rgba(0,0,0,.1); }
  .pb-size { padding: 5px 12px; border: 1px solid var(--line); border-radius: 999px; background: #fff; cursor: pointer; font-size: 12.5px; color: var(--slate); font-weight: 500; transition: all .12s; }
  .pb-size.is-on { border-color: var(--blue-600); background: var(--blue-50); color: var(--blue-700); font-weight: 700; }
  .pb-clear { margin-top: 4px; background: none; border: none; padding: 0; font-size: 12.5px; color: var(--blue-600); font-weight: 700; cursor: pointer; text-decoration: underline; text-align: left; }

  /* Card Accordion for Colour */
  .pb-acc-card-wrapper {
    padding: 16px 0;
    border-bottom: 1px solid var(--line-2);
  }
  .pb-acc-card {
    border: 1px solid var(--line);
    border-radius: var(--r-md);
    background: #fff;
    overflow: hidden;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }
  .pb-acc-card:hover {
    border-color: var(--blue-200);
  }
  .pb-acc-card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border: none;
    background: #fff;
    padding: 14px 16px;
    cursor: pointer;
  }
  .pb-acc-card-title {
    font-size: 11.5px;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--slate);
  }
  .pb-acc-card-badge {
    background: var(--blue-600);
    color: #fff;
    font-size: 10px;
    font-weight: 800;
    border-radius: 999px;
    padding: 1px 6px;
    margin-left: auto;
    margin-right: 8px;
  }
  .pb-acc-card-body {
    background: var(--paper-2);
    padding: 16px;
    border-top: 1px solid var(--line-2);
  }
  .pb-color-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }
  .pb-color-item {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 10px 14px;
    border: 1px solid var(--line);
    border-radius: var(--r-sm);
    background: #fff;
    cursor: pointer;
    text-align: left;
    font-size: 13.5px;
    font-weight: 600;
    color: var(--ink);
    transition: all 0.12s ease;
  }
  .pb-color-item:hover {
    border-color: var(--blue-200);
    background: var(--blue-50);
  }
  .pb-color-item.is-on {
    border-color: var(--blue-600);
    background: var(--blue-50);
    color: var(--blue-700);
    font-weight: 700;
  }
  .pb-color-item .pb-color-dot {
    width: 16px;
    height: 16px;
  }
  .pb-color-name {
    flex: 1;
    text-transform: capitalize;
  }

  /* Size Grid and Pills */
  .pb-size-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    width: 100%;
  }
  .pb-size-pill {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 12px;
    border: 1px solid var(--line);
    border-radius: var(--r-pill);
    background: #fff;
    cursor: pointer;
    font-size: 13px;
    color: var(--slate);
    font-weight: 700;
    transition: all 0.12s ease;
    text-align: center;
  }
  .pb-size-pill:hover {
    border-color: var(--blue-200);
    background: var(--blue-50);
  }
  .pb-size-pill.is-on {
    border-color: var(--blue-600);
    background: var(--blue-50);
    color: var(--blue-700);
    font-weight: 700;
  }

  /* Main area */
  .pb-main { min-width: 0; }
  .pb-toolbar { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; margin-bottom: 24px; flex-wrap: wrap; }
  .pb-heading { font-size: clamp(22px,2.5vw,30px); font-weight: 800; color: var(--ink); margin: 0 0 4px; }
  .pb-count { font-size: 13px; color: var(--muted); margin: 0; }
  .pb-toolbar-right { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
  .pb-sort { display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--muted); font-weight: 600; }
  .pb-sort select { border: 1px solid var(--line); border-radius: var(--r-sm); padding: 5px 10px; font-size: 13px; color: var(--ink); background: #fff; outline: none; cursor: pointer; }

  /* Product grid */
  .pb-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 220px)); gap: 22px; }
  @media (max-width: 640px) { .pb-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; } }

  /* Empty state */
  .pb-empty { text-align: center; padding: 64px 24px; }

  /* Category tile grid (all-products view) */
  .pb-cat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
  .pb-cat-tile { display: flex; flex-direction: column; border: 1px solid var(--line); border-radius: var(--r-lg); overflow: hidden; cursor: pointer; background: #fff; text-align: left; transition: all .2s; padding: 0; }
  .pb-cat-tile:hover { box-shadow: 0 8px 24px -6px rgba(10,22,40,.12); border-color: var(--blue-200); transform: translateY(-3px); }
  .pb-cat-tile-img { display: flex; align-items: center; justify-content: center; width: 100%; height: 200px; background: var(--paper-2); overflow: hidden; padding: 20px; box-sizing: border-box; }
  .pb-cat-tile-img img { max-width: 100%; max-height: 100%; object-fit: contain; display: block; }
  .pb-cat-tile-label { display: flex; align-items: center; gap: 10px; padding: 14px 16px; border-top: 1px solid var(--line-2); }
  .pb-cat-tile-text { flex: 1; font-weight: 700; font-size: 14px; color: var(--ink); display: flex; flex-direction: column; gap: 2px; }
  .pb-cat-tile-count { font-size: 11.5px; font-weight: 500; color: var(--muted); }

  /* Mobile filter row */
  .pb-search-mobile { display: none; }
  .pb-search-desktop { display: block; }
  .pb-filter-row { display: none; gap: 8px; padding: 12px 0; border-bottom: 1px solid var(--line-2); }
  .pb-fr-btn { display: flex; align-items: center; gap: 5px; padding: 7px 12px; border: 1px solid var(--line); border-radius: var(--r-sm); background: #fff; font-size: 13px; font-weight: 600; color: var(--slate); cursor: pointer; transition: all .12s; flex: 1; justify-content: center; }
  .pb-fr-btn:hover { border-color: var(--blue-400); color: var(--blue-700); }
  .pb-fr-btn.is-open { border-color: var(--blue-600); background: var(--blue-50); color: var(--blue-700); }
  .pb-fr-badge { background: var(--blue-600); color: #fff; font-size: 10px; font-weight: 800; border-radius: 999px; padding: 1px 5px; }
  .pb-cats { display: flex; flex-direction: column; gap: 2px; }
  @media (max-width: 900px) {
    .pb-search-mobile { display: block; }
    .pb-search-desktop { display: none; }
    .pb-filter-row { display: flex; }
    .pb-cats { display: none; max-height: 0; overflow: hidden; }
    .pb-cats.is-open { display: flex; max-height: none; padding: 12px 0; }
    .pb-cat-block-head { display: none; }
  }
`;
