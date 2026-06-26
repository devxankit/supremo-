"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "../../_components/AdminHeader";
import { Field, TextArea, Button, SaveBar, useSavedFlash } from "../../_components/ui";
import { adminAuth } from "../../_services/adminAuth";

interface RegionCard {
  name: string;
  states: string;
  accent: string;
  _id?: string;
}

interface DealerNetworkData {
  heading: string;
  headingHighlight: string;
  sub: string;
  tagLine: string;
  cards: RegionCard[];
}

const emptyCard = (): RegionCard => ({
  name: "",
  states: "",
  accent: "#6E97F2",
});

const ACCENT_PRESETS = [
  { label: "Blue", value: "#6E97F2" },
  { label: "Green", value: "#10B981" },
  { label: "Orange", value: "#F59E0B" },
  { label: "Purple", value: "#8B5CF6" },
  { label: "Red", value: "#EF4444" },
  { label: "Teal", value: "#14B8A6" },
];

const INDIAN_STATES = [
  "Delhi",
  "Punjab",
  "Haryana",
  "UP",
  "Uttar Pradesh",
  "Rajasthan",
  "Maharashtra",
  "Gujarat",
  "Madhya Pradesh",
  "Goa",
  "Karnataka",
  "Telangana",
  "Tamil Nadu",
  "Kerala",
  "West Bengal",
  "Odisha",
  "Bihar",
  "Jharkhand",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Chhattisgarh",
  "Himachal Pradesh",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Sikkim",
  "Tripura",
  "Uttarakhand",
  "Chandigarh",
  "Jammu & Kashmir",
  "Ladakh",
  "Puducherry"
];

export default function DealerNetworkEditorPage() {
  const [data, setData] = useState<DealerNetworkData>({
    heading: "",
    headingHighlight: "",
    sub: "",
    tagLine: "",
    cards: [],
  });
  const [loading, setLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const { saved, flash } = useSavedFlash();

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/dealer-network`);
      if (!res.ok) throw new Error("Failed to fetch dealer network content");
      const d = await res.json();
      setData(d);
    } catch (err) {
      console.error("Error loading dealer network content:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async () => {
    const user = adminAuth.getUser();
    if (!user) {
      alert("Not authenticated. Please log in.");
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/dealer-network`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const e = await res.json();
        throw new Error(e.message || "Save failed");
      }
      const updated = await res.json();
      setData(updated);
      flash();
    } catch (err: any) {
      alert("Save error: " + err.message);
    }
  };

  const updateCard = (idx: number, patch: Partial<RegionCard>) => {
    setData((prev) => {
      const cards = [...prev.cards];
      cards[idx] = { ...cards[idx], ...patch };
      return { ...prev, cards };
    });
  };



  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <AdminHeader
          title="Dealer Network Editor"
          breadcrumb={[
            { label: "Content" },
            { label: "Homepage", href: "/admin/content/homepage" },
            { label: "Dealer Network" },
          ]}
        />
        <main style={{ flex: 1, padding: "28px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 14, color: "var(--muted)" }}>Loading Dealer Network configuration...</div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader
        title="Dealer Network Editor"
        breadcrumb={[
          { label: "Content" },
          { label: "Homepage", href: "/admin/content/homepage" },
          { label: "Dealer Network" },
        ]}
      />

      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 24, maxWidth: 960 }}>
        {/* Section copy */}
        <div style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-display)" }}>Section Settings</h3>
          <Field
            label="Section Heading (Main)"
            value={data.heading}
            onChange={(val) => setData((p) => ({ ...p, heading: val }))}
          />
          <Field
            label="Section Heading (Blue Highlight)"
            value={data.headingHighlight}
            onChange={(val) => setData((p) => ({ ...p, headingHighlight: val }))}
          />
          <TextArea
            label="Section Sub-text"
            value={data.sub}
            onChange={(val) => setData((p) => ({ ...p, sub: val }))}
            rows={3}
          />
          <Field
            label="Tagline (above button)"
            value={data.tagLine}
            onChange={(val) => setData((p) => ({ ...p, tagLine: val }))}
          />
        </div>

        {/* Region Cards */}
        <div style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-display)" }}>
              Region Cards ({data.cards.length})
            </h3>

          </div>

          {data.cards.length === 0 && (
            <div style={{ fontSize: 13, color: "var(--muted)", textAlign: "center", padding: "16px 0" }}>
              No regions added yet. Click "+ Add Region" to start.
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {data.cards.map((card, idx) => {
              const isOpen = expandedCard === idx;
              return (
                <div key={idx} style={{ border: "1.5px solid var(--line-2)", borderRadius: "var(--r-sm)", overflow: "hidden" }}>
                  {/* Card Header */}
                  <div
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: isOpen ? "var(--blue-50)" : "var(--paper-2)", cursor: "pointer", userSelect: "none" }}
                    onClick={() => setExpandedCard(isOpen ? null : idx)}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: card.accent || "#6E97F2" }} />
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)" }}>{card.name || "Unnamed Region"}</div>
                        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>{card.states || "No states configured"}</div>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>

                      <div style={{ color: "var(--muted)", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Body */}
                  {isOpen && (
                    <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", gap: 16, borderTop: "1px solid var(--line-2)", background: "#ffffff" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                        <Field
                          label="Region Name"
                          value={card.name}
                          onChange={(v) => updateCard(idx, { name: v })}
                          placeholder="e.g. North"
                        />
                        <div>
                          <label style={{ fontSize: 11, fontWeight: 700, color: "var(--slate)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>
                            Accent Color
                          </label>
                          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                            <input
                              type="color"
                              value={card.accent}
                              onChange={(e) => updateCard(idx, { accent: e.target.value })}
                              style={{ width: 42, height: 42, padding: 0, border: "1px solid var(--line)", borderRadius: "var(--r-sm)", cursor: "pointer", background: "none" }}
                            />
                            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                              {ACCENT_PRESETS.map((p) => (
                                <button
                                  key={p.value}
                                  onClick={() => updateCard(idx, { accent: p.value })}
                                  style={{
                                    padding: "4px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600, border: "1px solid var(--line)", cursor: "pointer",
                                    background: card.accent === p.value ? "var(--blue-50)" : "#fff",
                                    color: card.accent === p.value ? "var(--blue-700)" : "var(--muted)",
                                  }}
                                >
                                  {p.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {(() => {
                        const currentStates = card.states
                          ? card.states.split(" · ").map((s) => s.trim()).filter(Boolean)
                          : [];

                        const toggleState = (stateName: string) => {
                          let newStates;
                          if (currentStates.includes(stateName)) {
                            newStates = currentStates.filter((s) => s !== stateName);
                          } else {
                            newStates = [...currentStates, stateName];
                          }
                          updateCard(idx, { states: newStates.join(" · ") });
                        };

                        return (
                          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            <Field
                              label="States List (use ' · ' to separate)"
                              value={card.states}
                              onChange={(v) => updateCard(idx, { states: v })}
                              placeholder="e.g. Delhi · Punjab · Haryana · UP · Rajasthan"
                            />
                            <div>
                              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--slate)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>
                                Quick Select States/UTs
                              </label>
                              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", maxHeight: 150, overflowY: "auto", border: "1px solid var(--line-2)", padding: "10px 12px", borderRadius: "var(--r-sm)", background: "var(--paper-2)" }}>
                                {INDIAN_STATES.map((state) => {
                                  const isSelected = currentStates.includes(state);
                                  return (
                                    <button
                                      key={state}
                                      type="button"
                                      onClick={() => toggleState(state)}
                                      style={{
                                        padding: "5px 11px",
                                        borderRadius: "var(--r-pill)",
                                        fontSize: 12,
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        border: "1px solid",
                                        borderColor: isSelected ? "var(--blue-500)" : "var(--line)",
                                        background: isSelected ? "var(--blue-600)" : "#ffffff",
                                        color: isSelected ? "#ffffff" : "var(--slate)",
                                        transition: "all 0.15s ease",
                                      }}
                                    >
                                      {isSelected ? "✓ " : ""}{state}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <SaveBar saved={saved} onSave={handleSave} onReset={loadData} />
      </main>
    </div>
  );
}
