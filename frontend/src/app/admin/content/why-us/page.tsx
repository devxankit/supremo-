"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "../../_components/AdminHeader";
import { Field, TextArea, Button, SaveBar, useSavedFlash } from "../../_components/ui";
import { adminAuth } from "../../_services/adminAuth";

const ICON_OPTIONS = [
  { key: "shield", label: "Shield (Triple Layer)" },
  { key: "certified", label: "Certified (ISI/ISO)" },
  { key: "warranty", label: "Warranty (Clock)" },
  { key: "supply", label: "Supply Chain (Truck)" },
  { key: "portal", label: "Digital Portal (Cloud)" },
  { key: "support", label: "Support SLA (Chat)" },
];

const HIGHLIGHT_OPTIONS = [
  { key: "tags", label: "Tags (pill chips)" },
  { key: "stat", label: "Big Stat Number" },
  { key: "badge", label: "Centered Badge" },
  { key: "order", label: "Order Row (label + status)" },
];

const TAG_COLOR_OPTIONS = ["blue", "green", "dark"];

interface Tag { label: string; color: string }
interface Card {
  title: string;
  description: string;
  iconKey: string;
  highlightType: "tags" | "stat" | "badge" | "order";
  tags: Tag[];
  statValue: string;
  statLabel: string;
  statColor: string;
  badgeText: string;
  orderLabel: string;
  orderStatus: string;
}

interface WhyUsData {
  heading: string;
  sub: string;
  cards: Card[];
}

const emptyCard = (): Card => ({
  title: "",
  description: "",
  iconKey: "shield",
  highlightType: "badge",
  tags: [],
  statValue: "",
  statLabel: "",
  statColor: "var(--blue-600)",
  badgeText: "",
  orderLabel: "",
  orderStatus: "",
});

export default function WhyUsEditorPage() {
  const [data, setData] = useState<WhyUsData>({ heading: "", sub: "", cards: [] });
  const [loading, setLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const { saved, flash } = useSavedFlash();

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/why-us`);
      if (!res.ok) throw new Error("Failed to fetch");
      const d = await res.json();
      setData(d);
    } catch (err) {
      console.error("Error loading why-us content:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSave = async () => {
    const user = adminAuth.getUser();
    if (!user) { alert("Not authenticated. Please log in."); return; }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/why-us`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
        body: JSON.stringify(data),
      });
      if (!res.ok) { const e = await res.json(); throw new Error(e.message || "Save failed"); }
      const updated = await res.json();
      setData(updated);
      flash();
    } catch (err: any) {
      alert("Save error: " + err.message);
    }
  };

  const updateCard = (idx: number, patch: Partial<Card>) => {
    setData((prev) => {
      const cards = [...prev.cards];
      cards[idx] = { ...cards[idx], ...patch };
      return { ...prev, cards };
    });
  };

  const addCard = () => {
    setData((prev) => ({ ...prev, cards: [...prev.cards, emptyCard()] }));
    setExpandedCard(data.cards.length);
  };

  const removeCard = (idx: number) => {
    setData((prev) => ({ ...prev, cards: prev.cards.filter((_, i) => i !== idx) }));
    setExpandedCard(null);
  };

  const addTag = (cardIdx: number) => {
    const card = data.cards[cardIdx];
    updateCard(cardIdx, { tags: [...(card.tags || []), { label: "", color: "blue" }] });
  };

  const updateTag = (cardIdx: number, tagIdx: number, patch: Partial<Tag>) => {
    const tags = [...(data.cards[cardIdx].tags || [])];
    tags[tagIdx] = { ...tags[tagIdx], ...patch };
    updateCard(cardIdx, { tags });
  };

  const removeTag = (cardIdx: number, tagIdx: number) => {
    updateCard(cardIdx, { tags: (data.cards[cardIdx].tags || []).filter((_, i) => i !== tagIdx) });
  };

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <AdminHeader
          title="Why Supremo Editor"
          breadcrumb={[{ label: "Content" }, { label: "Homepage", href: "/admin/content/homepage" }, { label: "Why Supremo" }]}
        />
        <main style={{ flex: 1, padding: "28px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 14, color: "var(--muted)" }}>Loading Why Supremo configuration...</div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader
        title="Why Supremo Editor"
        breadcrumb={[{ label: "Content" }, { label: "Homepage", href: "/admin/content/homepage" }, { label: "Why Supremo" }]}
      />

      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 24, maxWidth: 960 }}>

        {/* Section copy */}
        <div style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-display)" }}>Section Copy</h3>
          <Field label="Section Heading" value={data.heading} onChange={(val) => setData((p) => ({ ...p, heading: val }))} />
          <Field label="Section Sub-text" value={data.sub} onChange={(val) => setData((p) => ({ ...p, sub: val }))} />
        </div>

        {/* Cards Editor */}
        <div style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-display)" }}>
              Value Cards ({data.cards.length})
            </h3>
            <Button variant="outline" size="sm" onClick={addCard}>+ Add Card</Button>
          </div>

          {data.cards.length === 0 && (
            <div style={{ fontSize: 13, color: "var(--muted)", textAlign: "center", padding: "16px 0" }}>
              No cards yet. Click "+ Add Card" to get started.
            </div>
          )}

          {data.cards.map((card, idx) => {
            const isOpen = expandedCard === idx;
            return (
              <div key={idx} style={{ border: "1px solid var(--line-2)", borderRadius: "var(--r-sm)", overflow: "hidden" }}>
                {/* Card Header Row */}
                <div
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: isOpen ? "var(--blue-50)" : "var(--paper-2)", cursor: "pointer", userSelect: "none" }}
                  onClick={() => setExpandedCard(isOpen ? null : idx)}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "var(--r-sm)", background: "var(--blue-100)", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 800, color: "var(--blue-700)", fontFamily: "var(--font-display)" }}>
                      {idx + 1}
                    </div>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)" }}>{card.title || "Untitled Card"}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>{card.highlightType} highlight · {card.iconKey} icon</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); removeCard(idx); }}
                      style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)", color: "var(--danger)", borderRadius: 6, padding: "4px 10px", fontSize: 12, cursor: "pointer", fontWeight: 600 }}
                    >
                      Remove
                    </button>
                    <div style={{ width: 22, height: 22, display: "grid", placeItems: "center", color: "var(--muted)", transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                {isOpen && (
                  <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", gap: 16, borderTop: "1px solid var(--line-2)" }}>
                    {/* Basic fields */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                      <Field label="Card Title" value={card.title} onChange={(v) => updateCard(idx, { title: v })} placeholder="e.g. Triple-Layer Protection" />
                      <div>
                        <label style={{ fontSize: 11, fontWeight: 700, color: "var(--slate)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>Icon</label>
                        <select
                          value={card.iconKey}
                          onChange={(e) => updateCard(idx, { iconKey: e.target.value })}
                          style={{ width: "100%", height: 42, padding: "0 10px", borderRadius: "var(--r-sm)", border: "1px solid var(--line)", background: "var(--paper)", fontSize: 13, color: "var(--ink)", outline: "none" }}
                        >
                          {ICON_OPTIONS.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
                        </select>
                      </div>
                    </div>

                    <TextArea label="Card Description" value={card.description} onChange={(v) => updateCard(idx, { description: v })} placeholder="Short description of this benefit..." rows={2} />

                    {/* Highlight Type */}
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 700, color: "var(--slate)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>Highlight Style</label>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {HIGHLIGHT_OPTIONS.map((o) => (
                          <button
                            key={o.key}
                            onClick={() => updateCard(idx, { highlightType: o.key as Card["highlightType"] })}
                            style={{
                              padding: "6px 14px", borderRadius: "var(--r-sm)", fontSize: 12, fontWeight: 600, cursor: "pointer", border: "1.5px solid",
                              borderColor: card.highlightType === o.key ? "var(--blue-600)" : "var(--line)",
                              background: card.highlightType === o.key ? "var(--blue-50)" : "var(--paper)",
                              color: card.highlightType === o.key ? "var(--blue-700)" : "var(--muted)",
                            }}
                          >
                            {o.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Conditional highlight fields */}
                    {card.highlightType === "tags" && (
                      <div style={{ border: "1px dashed var(--line)", borderRadius: "var(--r-sm)", padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--slate)" }}>Tags</span>
                          <Button variant="outline" size="sm" onClick={() => addTag(idx)}>+ Add Tag</Button>
                        </div>
                        {(card.tags || []).map((tag, ti) => (
                          <div key={ti} style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
                            <div style={{ flex: 1 }}>
                              <Field label="Tag Label" value={tag.label} onChange={(v) => updateTag(idx, ti, { label: v })} placeholder="e.g. UV Shield" />
                            </div>
                            <div>
                              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--slate)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>Color</label>
                              <select
                                value={tag.color}
                                onChange={(e) => updateTag(idx, ti, { color: e.target.value })}
                                style={{ height: 42, padding: "0 8px", borderRadius: "var(--r-sm)", border: "1px solid var(--line)", background: "var(--paper)", fontSize: 13, color: "var(--ink)" }}
                              >
                                {TAG_COLOR_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                              </select>
                            </div>
                            <button
                              onClick={() => removeTag(idx, ti)}
                              style={{ height: 42, padding: "0 10px", marginBottom: 0, background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)", color: "var(--danger)", borderRadius: 6, cursor: "pointer" }}
                              title="Remove tag"
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            </button>
                          </div>
                        ))}
                        {(card.tags || []).length === 0 && <div style={{ fontSize: 12, color: "var(--muted)" }}>No tags yet. Add some above.</div>}
                      </div>
                    )}

                    {card.highlightType === "stat" && (
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                        <Field label="Stat Value" value={card.statValue} onChange={(v) => updateCard(idx, { statValue: v })} placeholder="e.g. 10 Yrs" />
                        <Field label="Stat Label" value={card.statLabel} onChange={(v) => updateCard(idx, { statLabel: v })} placeholder="e.g. Coverage Warranty" />
                        <div>
                          <label style={{ fontSize: 11, fontWeight: 700, color: "var(--slate)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>Stat Color</label>
                          <select
                            value={card.statColor}
                            onChange={(e) => updateCard(idx, { statColor: e.target.value })}
                            style={{ width: "100%", height: 42, padding: "0 10px", borderRadius: "var(--r-sm)", border: "1px solid var(--line)", background: "var(--paper)", fontSize: 13, color: "var(--ink)" }}
                          >
                            <option value="var(--blue-600)">Blue</option>
                            <option value="var(--ok)">Green</option>
                            <option value="var(--danger)">Red</option>
                            <option value="var(--ink)">Dark</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {card.highlightType === "badge" && (
                      <Field label="Badge Text" value={card.badgeText} onChange={(v) => updateCard(idx, { badgeText: v })} placeholder="e.g. ISO 9001:2015 AUDITED" />
                    )}

                    {card.highlightType === "order" && (
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                        <Field label="Order Label (left)" value={card.orderLabel} onChange={(v) => updateCard(idx, { orderLabel: v })} placeholder="e.g. Order #784" />
                        <Field label="Status (right)" value={card.orderStatus} onChange={(v) => updateCard(idx, { orderStatus: v })} placeholder="e.g. IN TRANSIT" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <SaveBar saved={saved} onSave={handleSave} onReset={loadData} />
      </main>
    </div>
  );
}
