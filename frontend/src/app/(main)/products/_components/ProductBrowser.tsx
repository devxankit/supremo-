"use client";

import { useMemo, useState, useEffect } from "react";
import { categories, products, getProductsByCategory } from "@/lib/catalogue";
import { ProductCard } from "@/components/ProductCard";

const categoryImages: Record<string, string> = {
  "water-tanks": "/images/cat_tanks.png",
  "pipes-fittings": "/images/cat_pipes.png",
  "accessories": "/images/cat_accessories.png",
  "planters": "/images/cat_planters.png",
};

const productImages: Record<string, string> = {
  // Water Tanks
  "triple-layer-overhead-tank": "/images/overhead_tank.png",
  "single-layer-overhead-tank": "/images/tank_single.png",
  "loft-tank": "/images/tank_loft.png",
  "underground-sump-tank": "/images/tank_sump.png",
  // Pipes & Fittings
  "pvc-pressure-pipes": "/images/pipe_pvc.png",
  "cpvc-hot-cold-pipes": "/images/pipe_cpvc.png",
  "agriculture-hdpe-pipes": "/images/pipe_hdpe.png",
  "swr-plumbing-pipes": "/images/pipe_swr.png",
  // Accessories
  "air-cooler-body": "/images/acc_cooler.png",
  "ghamela-tub": "/images/acc_ghamela.png",
  "milk-can": "/images/acc_milk_can.png",
  "wheel-barrow": "/images/cat_accessories.png",
  "garbage-dust-bin": "/images/cat_accessories.png",
  // Planters
  "decorative-indoor-planter": "/images/terrazzo_planter.png",
  "garden-floor-planter": "/images/cat_planters.png",
  "commercial-planter": "/images/cat_planters.png",
};

type SortKey = "featured" | "az" | "za";

const catLabel = (slug: string) =>
  categories.find((c) => c.slug === slug)?.label ?? "Products";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg className={`pb-acc-chev ${open ? "is-open" : ""}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function ProductBrowser({
  initialCategory = null,
  hasHero = true,
}: {
  initialCategory?: string | null;
  hasHero?: boolean;
}) {
  const validInitial =
    initialCategory && categories.some((c) => c.slug === initialCategory)
      ? initialCategory
      : "all";

  const [activeCat, setActiveCat] = useState<string>(validInitial);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");
  const [openCat, setOpenCat] = useState(false);
  const [openColor, setOpenColor] = useState(true);
  const [openSize, setOpenSize] = useState(true);

  // Keep the URL shareable when the category changes — no full navigation.
  useEffect(() => {
    const url = activeCat === "all" ? "/products" : `/products?category=${activeCat}`;
    if (typeof window !== "undefined" && window.location.pathname + window.location.search !== url) {
      window.history.replaceState(null, "", url);
    }
  }, [activeCat]);

  // On phones the filters are collapsible dropdowns — start them closed so the
  // product grid stays in view (on desktop they remain open in the sidebar).
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches) {
      setOpenColor(false);
      setOpenSize(false);
    }
  }, []);

  // Products in the active category — drives which color/size options to show.
  const inCategory = useMemo(
    () => (activeCat === "all" ? products : getProductsByCategory(activeCat)),
    [activeCat]
  );

  // Contextual filter options derived from the active category.
  const colorOptions = useMemo(() => {
    const map = new Map<string, string>();
    inCategory.forEach((p) => p.colors.forEach((c) => map.set(c.name, c.hex)));
    return Array.from(map, ([name, hex]) => ({ name, hex }));
  }, [inCategory]);

  const sizeOptions = useMemo(() => {
    const set = new Set<string>();
    inCategory.forEach((p) => p.sizes.forEach((s) => set.add(s)));
    return Array.from(set);
  }, [inCategory]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out = inCategory.filter((p) => {
      if (q && !(`${p.name} ${p.tagline} ${p.capacity}`.toLowerCase().includes(q))) return false;
      if (selectedColors.length && !p.colors.some((c) => selectedColors.includes(c.name))) return false;
      if (selectedSizes.length && !p.sizes.some((s) => selectedSizes.includes(s))) return false;
      return true;
    });
    if (sort === "az") out.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "za") out.sort((a, b) => b.name.localeCompare(a.name));
    return out;
  }, [inCategory, query, selectedColors, selectedSizes, sort]);

  const selectCategory = (slug: string) => {
    setActiveCat(slug);
    setSelectedColors([]);
    setSelectedSizes([]);
    setQuery("");
    setOpenCat(false);
  };

  const toggle = (value: string, list: string[], setter: (v: string[]) => void) =>
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const activeFilterCount = selectedColors.length + selectedSizes.length + (query ? 1 : 0);
  const clearAll = () => {
    setSelectedColors([]);
    setSelectedSizes([]);
    setQuery("");
  };

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

              {/* Mobile filter row — three icon dropdown triggers in one line */}
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

              {/* Categories — list on desktop, dropdown panel on mobile */}
              <div className="pb-block pb-cat-block">
                <p className="pb-block-title">Categories</p>
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
                    const count = getProductsByCategory(c.slug).length;
                    const active = activeCat === c.slug;
                    return (
                      <button
                        key={c.slug}
                        type="button"
                        onClick={() => selectCategory(c.slug)}
                        className={`pb-cat ${active ? "is-active" : ""}`}
                      >
                        <span className="pb-cat-icon">
                          <img src={categoryImages[c.slug]} alt="" />
                        </span>
                        <span className="pb-cat-label">{c.label}</span>
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

                {/* Colour — dropdown */}
                {colorOptions.length > 0 && (
                  <div className="pb-block pb-acc">
                    <button type="button" className="pb-acc-head" onClick={() => setOpenColor((o) => !o)} aria-expanded={openColor}>
                      <span>Colour</span>
                      {selectedColors.length > 0 && <span className="pb-acc-badge">{selectedColors.length}</span>}
                      <Chevron open={openColor} />
                    </button>
                    {openColor && (
                      <div className="pb-chips">
                        {colorOptions.map((c) => {
                          const on = selectedColors.includes(c.name);
                          return (
                            <button
                              key={c.name}
                              type="button"
                              onClick={() => toggle(c.name, selectedColors, setSelectedColors)}
                              className={`pb-color ${on ? "is-on" : ""}`}
                            >
                              <span className="pb-color-dot" style={{ background: c.hex }} />
                              {c.name}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Size — dropdown */}
                {sizeOptions.length > 0 && (
                  <div className="pb-block pb-acc">
                    <button type="button" className="pb-acc-head" onClick={() => setOpenSize((o) => !o)} aria-expanded={openSize}>
                      <span>Size / Capacity</span>
                      {selectedSizes.length > 0 && <span className="pb-acc-badge">{selectedSizes.length}</span>}
                      <Chevron open={openSize} />
                    </button>
                    {openSize && (
                      <div className="pb-chips">
                        {sizeOptions.map((s) => {
                          const on = selectedSizes.includes(s);
                          return (
                            <button
                              key={s}
                              type="button"
                              onClick={() => toggle(s, selectedSizes, setSelectedSizes)}
                              className={`pb-size ${on ? "is-on" : ""}`}
                            >
                              {s}
                            </button>
                          );
                        })}
                      </div>
                    )}
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

          {/* ─── Main: toolbar + product grid ─── */}
          <div className="pb-main">
            <div className="pb-toolbar">
              <div>
                <h2 className="pb-heading">
                  {activeCat === "all" ? "All Products" : catLabel(activeCat)}
                </h2>
                <p className="pb-count">
                  {visible.length} {visible.length === 1 ? "product" : "products"}
                  {activeFilterCount > 0 ? " · filtered" : ""}
                </p>
              </div>
              <div className="pb-toolbar-right">
                <label className="pb-sort">
                  <span>Sort</span>
                  <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
                    <option value="featured">Featured</option>
                    <option value="az">Name A–Z</option>
                    <option value="za">Name Z–A</option>
                  </select>
                </label>
              </div>
            </div>

            {visible.length === 0 ? (
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
                    image={productImages[p.slug] || "/images/logo.png"}
                    categoryLabel={catLabel(p.category)}
                    capacity={p.capacity}
                    tags={p.specs.slice(0, 1).map((s) => `${s.label}: ${s.value}`)}
                    badges={p.badges.map((b) => ({ label: b }))}
                    tagline={p.tagline}
                    swatches={p.colors.map((c) => c.hex)}
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
  .pb-layout { display: grid; grid-template-columns: 208px 1fr; gap: 32px; align-items: start; }
  /* min-width:0 lets the 1fr tracks shrink below their content's intrinsic width,
     so the category scroll-strip and product grid can't blow out the page width. */
  .pb-rail, .pb-main { min-width: 0; }
  /* Sticky rail (pinned while the product grid scrolls); scrolls internally if its
     own content is taller than the viewport. Sticky must live on the direct grid
     child so its containing block is the full-height grid, not the short sidebar. */
  .pb-rail {
    position: sticky; top: 78px; align-self: start; max-height: calc(100vh - 96px);
    overflow-y: auto; overflow-x: hidden;
    scrollbar-width: thin; scrollbar-color: var(--line) transparent;
  }
  .pb-rail::-webkit-scrollbar { width: 6px; }
  .pb-rail::-webkit-scrollbar-thumb { background: var(--line); border-radius: 999px; }
  .pb-rail::-webkit-scrollbar-track { background: transparent; }
  .pb-rail-inner { padding-right: 2px; }
  .pb-block { margin-bottom: 22px; }
  .pb-block-title {
    font-family: var(--font-display); font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--muted); margin-bottom: 12px;
  }

  /* Category list */
  .pb-cats { display: flex; flex-direction: column; gap: 4px; }
  .pb-cat {
    display: flex; align-items: center; gap: 10px; width: 100%; padding: 8px 10px;
    background: transparent; border: 1px solid transparent; border-radius: var(--r-md); cursor: pointer;
    text-align: left; transition: background .18s ease, border-color .18s ease;
  }
  .pb-cat:hover { background: var(--paper-2); }
  .pb-cat.is-active { background: var(--blue-50); border-color: var(--blue-100); }
  .pb-cat-icon {
    width: 32px; height: 32px; flex-shrink: 0; border-radius: 9px; background: #fff;
    border: 1px solid var(--line); display: grid; place-items: center; overflow: hidden; color: var(--blue-600);
  }
  .pb-cat-icon img { width: 100%; height: 100%; object-fit: contain; padding: 4px; }
  .pb-cat.is-active .pb-cat-icon { border-color: var(--blue-200); }
  .pb-cat-label {
    flex: 1; min-width: 0; font-family: var(--font-display); font-size: 13.5px; font-weight: 600; color: var(--slate);
    line-height: 1.2;
  }
  .pb-cat.is-active .pb-cat-label { color: var(--blue-800); }
  .pb-cat-count {
    font-size: 11px; font-weight: 700; color: var(--muted); background: var(--paper-2);
    border: 1px solid var(--line); border-radius: 999px; padding: 1px 7px; min-width: 24px; text-align: center;
  }
  .pb-cat.is-active .pb-cat-count { color: var(--blue-700); background: #fff; border-color: var(--blue-100); }

  /* Divider above the filters group */
  .pb-filters { border-top: 1px solid var(--line); padding-top: 20px; }
  /* Mobile-only dropdown chrome — hidden on desktop */
  .pb-search-mobile, .pb-filter-row { display: none; }

  /* Search */
  .pb-search {
    display: flex; align-items: center; gap: 8px; height: 42px; padding: 0 11px;
    border: 1px solid var(--line); border-radius: var(--r-md); background: var(--paper-2); color: var(--muted);
    transition: border-color .15s, background .15s, box-shadow .15s;
  }
  .pb-search:focus-within { border-color: var(--blue-600); background: #fff; box-shadow: 0 0 0 4px var(--blue-100); color: var(--blue-600); }
  .pb-search input { flex: 1; min-width: 0; border: 0; outline: 0; background: transparent; font: inherit; font-size: 14px; color: var(--ink); }

  /* Accordion (dropdown) head for Colour / Size */
  .pb-acc-head {
    display: flex; align-items: center; gap: 8px; width: 100%; padding: 0 0 12px; background: transparent;
    border: 0; cursor: pointer; font-family: var(--font-display); font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted);
  }
  .pb-acc-head:hover { color: var(--slate); }
  .pb-acc-badge {
    background: var(--blue-600); color: #fff; border-radius: 999px; font-size: 10px; font-weight: 700;
    letter-spacing: 0; padding: 1px 7px; line-height: 1.5;
  }
  .pb-acc-chev { margin-left: auto; transition: transform .2s ease; color: var(--soft); }
  .pb-acc-chev.is-open { transform: rotate(180deg); }

  /* Chips (colour + size) */
  .pb-chips { display: flex; flex-wrap: wrap; gap: 7px; }
  .pb-color, .pb-size {
    display: inline-flex; align-items: center; gap: 6px; padding: 6px 11px; cursor: pointer;
    font-family: var(--font-display); font-size: 12px; font-weight: 600; color: var(--slate);
    background: #fff; border: 1px solid var(--line); border-radius: 999px; transition: all .15s ease;
  }
  .pb-color:hover, .pb-size:hover { border-color: var(--blue-400); color: var(--blue-700); }
  .pb-color.is-on, .pb-size.is-on { background: var(--blue-600); border-color: var(--blue-600); color: #fff; }
  .pb-color-dot { width: 12px; height: 12px; border-radius: 50%; border: 1px solid rgba(0,0,0,.15); flex-shrink: 0; }
  .pb-color.is-on .pb-color-dot { border-color: rgba(255,255,255,.6); }

  .pb-clear {
    width: 100%; height: 40px; cursor: pointer; font-family: var(--font-display); font-size: 13px; font-weight: 600;
    color: var(--blue-700); background: var(--blue-50); border: 1px solid var(--blue-100); border-radius: var(--r-md);
    transition: background .15s;
  }
  .pb-clear:hover { background: var(--blue-100); }

  /* Toolbar */
  .pb-toolbar {
    display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap;
    padding-bottom: 20px; margin-bottom: 24px; border-bottom: 1px solid var(--line);
  }
  .pb-heading { font-size: clamp(22px, 2.6vw, 30px); line-height: 1.15; }
  .pb-count { color: var(--muted); font-size: 14px; margin-top: 6px; }
  .pb-toolbar-right { display: flex; align-items: center; gap: 12px; }
  .pb-sort { display: inline-flex; align-items: center; gap: 8px; }
  .pb-sort span { font-family: var(--font-display); font-size: 13px; font-weight: 600; color: var(--muted); }
  .pb-sort select {
    height: 42px; padding: 0 34px 0 14px; border: 1px solid var(--line); border-radius: var(--r-pill);
    font: inherit; font-size: 14px; font-weight: 600; color: var(--ink); background: #fff; cursor: pointer; outline: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236A788F' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 13px center;
  }
  .pb-sort select:focus { border-color: var(--blue-600); box-shadow: 0 0 0 4px var(--blue-100); }

  /* Grid */
  .pb-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .pb-empty {
    grid-column: 1 / -1; text-align: center; padding: 72px 24px; background: var(--paper-2);
    border: 1px dashed var(--line); border-radius: var(--r-lg);
  }

  /* Product card styling lives in globals.css (.category-prod-card …) */

  /* ── Responsive ── */
  @media (max-width: 1100px) {
    .pb-layout { grid-template-columns: 188px 1fr; gap: 24px; }
    .pb-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 768px) {
    .pb-layout { grid-template-columns: 1fr; gap: 0; }
    .pb-rail { position: static; max-height: none; overflow: visible; }
    .pb-rail-inner { padding-right: 0; display: flex; flex-direction: column; gap: 12px; }
    .pb-block { margin-bottom: 0; }
    .pb-block-title { display: none; }

    /* Search pinned at the top; hide the sidebar copy */
    .pb-search-mobile { display: block; }
    .pb-search-desktop { display: none; }
    .pb-search { height: 46px; }

    /* Filters stack as dropdowns — no sidebar divider */
    .pb-filters { border-top: 0; padding-top: 0; display: flex; flex-direction: column; gap: 12px; }

    /* Filter row: three icon dropdown triggers laid out in one line */
    .pb-filter-row {
      display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px;
    }
    .pb-fr-btn {
      display: flex; align-items: center; gap: 4px; min-width: 0;
      height: 44px; padding: 0 6px;
      background: #fff; border: 1px solid var(--line); border-radius: var(--r-md); cursor: pointer;
      font-family: var(--font-display); font-size: 12.5px; font-weight: 700; color: var(--ink);
      transition: background .15s, border-color .15s, color .15s;
    }
    .pb-fr-btn:disabled { opacity: .5; cursor: not-allowed; }
    .pb-fr-btn.is-open { background: var(--blue-50); border-color: var(--blue-400); color: var(--blue-700); }
    .pb-fr-btn > span {
      flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: left;
    }
    .pb-fr-icon { flex-shrink: 0; color: var(--blue-600); }
    .pb-fr-btn.is-open .pb-fr-icon { color: var(--blue-700); }
    .pb-fr-btn .pb-acc-chev { flex-shrink: 0; margin-left: 0; color: var(--soft); }
    .pb-fr-btn.is-open .pb-acc-chev { color: var(--blue-700); }
    .pb-fr-badge {
      flex-shrink: 0; background: var(--blue-600); color: #fff; border-radius: 999px;
      font-size: 10px; font-weight: 700; padding: 1px 6px; line-height: 1.5;
    }

    /* The desktop accordion heads are replaced by the filter row on mobile */
    .pb-acc-head { display: none; }

    /* Category dropdown panel */
    .pb-cat-block { display: flex; flex-direction: column; }
    .pb-cats { display: none; }
    .pb-cats.is-open {
      display: flex; flex-direction: column; gap: 4px; margin-top: 8px; padding: 8px;
      background: var(--paper-2); border: 1px solid var(--line); border-radius: var(--r-md);
      max-height: 52vh; overflow-y: auto;
    }
    .pb-cat { width: 100%; flex: 0 0 auto; padding: 9px 10px; border: 1px solid transparent; border-radius: var(--r-sm); }
    .pb-cat.is-active { background: var(--blue-50); border-color: var(--blue-100); }
    .pb-cat-icon { width: 30px; height: 30px; border-radius: 8px; }
    .pb-cat-label { white-space: normal; }
    .pb-cat-count { display: inline-flex; }

    /* Colour / Size dropdown panels */
    .pb-acc { display: flex; flex-direction: column; }
    .pb-chips {
      margin-top: 8px; padding: 12px; background: var(--paper-2);
      border: 1px solid var(--line); border-radius: var(--r-md);
      max-height: 46vh; overflow-y: auto;
    }

    .pb-clear { margin-top: 2px; }
    .pb-toolbar { margin-bottom: 20px; }
  }
  @media (max-width: 560px) {
    .pb-grid { grid-template-columns: 1fr; }
    .pb-sort span { display: none; }

    .pb-toolbar {
      flex-direction: column !important;
      align-items: stretch !important;
      gap: 12px !important;
    }
    .pb-toolbar-right { width: 100% !important; }
    .pb-sort {
      width: 100% !important;
      justify-content: space-between !important;
    }
    .pb-sort select {
      flex: 1 !important;
      width: 100% !important;
    }

    /* Optimized Mobile Card Layout matching homepage featured products style */
    .category-prod-card {
      flex-direction: column !important;
      align-items: stretch !important;
      height: auto !important;
    }
    .prod-card-frame {
      margin: 16px 16px 0 !important;
      aspect-ratio: 4/3 !important;
      height: auto !important;
      border-radius: var(--r-md) !important;
      border: 1px solid rgba(14, 85, 188, 0.05) !important;
      flex-shrink: 0 !important;
      width: calc(100% - 32px) !important;
    }
    .prod-card-badges {
      top: 12px !important;
      left: 12px !important;
      gap: 6px !important;
    }
    .prod-card-badge {
      padding: 3px 9px !important;
      font-size: 9px !important;
    }
    .prod-card-img {
      width: 82% !important;
      height: 82% !important;
    }
    .prod-card-body {
      padding: 20px 24px 24px !important;
      display: flex !important;
      flex-direction: column !important;
      flex: 1 !important;
      min-width: 0 !important;
    }
    .prod-card-cat {
      font-size: 11px !important;
      margin-bottom: 6px !important;
    }
    .prod-card-name {
      font-size: 19px !important;
      margin-bottom: 8px !important;
      line-height: 1.3 !important;
    }
    .prod-card-tags {
      gap: 8px !important;
      margin-bottom: 12px !important;
    }
    .prod-card-tag {
      font-size: 11px !important;
      padding: 3px 8px !important;
    }
    .prod-card-tagline {
      font-size: 13.5px !important;
      margin-bottom: 20px !important;
      display: block !important;
      -webkit-line-clamp: unset !important;
      -webkit-box-orient: unset !important;
      overflow: visible !important;
      line-height: 1.5 !important;
      flex: 1 !important;
    }
    .prod-card-foot {
      padding-top: 16px !important;
      margin-top: auto !important;
    }
    .prod-card-cta {
      font-size: 13.5px !important;
    }
    .prod-card-swatches {
      gap: 5px !important;
    }
    .prod-card-swatch {
      width: 12px !important;
      height: 12px !important;
    }
  }
`;

