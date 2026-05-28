"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { categories, products, getProductsByCategory } from "@/lib/catalogue";

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

              {/* Categories — list on desktop, dropdown on mobile */}
              <div className="pb-block pb-cat-block">
                <p className="pb-block-title">Categories</p>
                <button type="button" className="pb-dd-trigger" onClick={() => setOpenCat((o) => !o)} aria-expanded={openCat}>
                  <span>Category</span>
                  <span className="pb-dd-value">{activeCat === "all" ? "All Products" : catLabel(activeCat)}</span>
                  <Chevron open={openCat} />
                </button>
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
                  <Link key={`${p.category}/${p.slug}`} href={`/products/${p.category}/${p.slug}`} className="category-prod-card">
                    {/* Visual showcase frame */}
                    <div className="prod-card-frame">
                      <div className="prod-card-badges">
                        {p.badges.map((b) => (
                          <span key={b} className="prod-card-badge">{b}</span>
                        ))}
                      </div>
                      <img className="prod-card-img" src={productImages[p.slug] || "/images/logo.png"} alt={p.name} />
                    </div>
                    {/* Body */}
                    <div className="prod-card-body">
                      <span className="prod-card-cat">{catLabel(p.category)}</span>
                      <h3 className="prod-card-name">{p.name}</h3>
                      <div className="prod-card-tags">
                        <span className="prod-card-tag prod-card-tag--cap">{p.capacity}</span>
                        {p.specs.slice(0, 1).map((s) => (
                          <span key={s.label} className="prod-card-tag">{s.label}: {s.value}</span>
                        ))}
                      </div>
                      <p className="prod-card-tagline">{p.tagline}</p>
                      <div className="prod-card-foot">
                        <span className="prod-card-cta">
                          View Details
                          <svg className="prod-card-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M7 17L17 7M9 7h8v8" />
                          </svg>
                        </span>
                        {p.colors.length > 0 && (
                          <div className="prod-card-swatches">
                            {p.colors.slice(0, 4).map((c) => (
                              <span key={c.name} title={c.name} className="prod-card-swatch" style={{ background: c.hex }} />
                            ))}
                            {p.colors.length > 4 && <span className="prod-card-swatch-more">+{p.colors.length - 4}</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
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
  .pb-search-mobile, .pb-dd-trigger { display: none; }

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

  /* ── Product card (unchanged design) ── */
  .category-prod-card {
    background: #fff; border: 1px solid rgba(14, 85, 188, 0.08); border-radius: var(--r-lg);
    display: flex; flex-direction: column; text-decoration: none; overflow: hidden;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: 0 4px 20px rgba(10, 22, 40, 0.02);
  }
  .category-prod-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px -15px rgba(10, 22, 40, 0.12), 0 0 0 1px rgba(14, 85, 188, 0.12);
    border-color: rgba(14, 85, 188, 0.2);
  }
  .category-prod-card:hover .prod-card-img { transform: scale(1.06) translateY(-4px); }
  .category-prod-card:hover .prod-card-arrow { transform: translateX(4px); }
  .prod-card-frame {
    background: #fff; margin: 16px 16px 0; aspect-ratio: 4/3; border-radius: var(--r-md);
    border: 1px solid rgba(14, 85, 188, 0.05); display: grid; place-items: center; position: relative; overflow: hidden;
  }
  .prod-card-badges { position: absolute; top: 12px; left: 12px; display: flex; flex-wrap: wrap; gap: 6px; z-index: 10; }
  .prod-card-badge {
    padding: 3px 9px; background: rgba(255,255,255,.9); color: var(--blue-800);
    border: 1px solid rgba(14,85,188,.12); border-radius: 999px; font-size: 9px; font-weight: 700;
    font-family: var(--font-display); letter-spacing: .05em; text-transform: uppercase;
    backdrop-filter: blur(8px); box-shadow: 0 2px 8px rgba(0,0,0,.04);
  }
  .prod-card-img { width: 82%; height: 82%; object-fit: contain; display: block; transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
  .prod-card-body { padding: 20px 24px 24px; flex: 1; display: flex; flex-direction: column; }
  .prod-card-cat { font-size: 11px; font-weight: 700; color: var(--blue-600); text-transform: uppercase; letter-spacing: .06em; margin-bottom: 6px; }
  .prod-card-name { font-size: 19px; font-weight: 700; color: var(--ink); line-height: 1.3; margin-bottom: 8px; }
  .prod-card-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
  .prod-card-tag { font-size: 11px; color: var(--slate); background: var(--paper-2); border: 1px solid var(--line); padding: 3px 8px; border-radius: 6px; font-weight: 600; }
  .prod-card-tag--cap { color: var(--blue-800); background: var(--blue-50); border-color: var(--blue-100); font-weight: 700; font-family: var(--font-display); }
  .prod-card-tagline { font-size: 13.5px; color: var(--slate); line-height: 1.5; margin-bottom: 20px; flex: 1; }
  .prod-card-foot { border-top: 1px solid var(--line-2); padding-top: 16px; margin-top: auto; display: flex; align-items: center; justify-content: space-between; }
  .prod-card-cta { display: inline-flex; align-items: center; gap: 6px; color: var(--blue-700); font-weight: 700; font-size: 13.5px; font-family: var(--font-display); }
  .prod-card-arrow { transition: transform 0.3s ease; }
  .prod-card-swatches { display: flex; gap: 5px; align-items: center; }
  .prod-card-swatch { width: 12px; height: 12px; border-radius: 50%; border: 1px solid rgba(0,0,0,.15); display: inline-block; box-shadow: 0 1px 2px rgba(0,0,0,.05); }
  .prod-card-swatch-more { font-size: 10px; color: var(--muted); font-weight: 600; margin-left: 2px; }

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

    /* Shared dropdown trigger for Category / Colour / Size */
    .pb-dd-trigger, .pb-acc-head {
      display: flex; align-items: center; gap: 8px; width: 100%; height: 48px; padding: 0 14px;
      background: #fff; border: 1px solid var(--line); border-radius: var(--r-md); cursor: pointer;
      font-family: var(--font-display); font-size: 14px; font-weight: 700; color: var(--ink);
      text-transform: none; letter-spacing: 0;
    }
    .pb-dd-value { margin-left: auto; font-weight: 600; font-size: 13px; color: var(--muted); }
    .pb-acc-badge { margin-left: auto; }
    .pb-acc-chev { color: var(--soft); }

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

