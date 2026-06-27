"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "../../_components/AdminHeader";
import { Field, TextArea, Button, SaveBar, useSavedFlash } from "../../_components/ui";
import { adminAuth } from "../../_services/adminAuth";
// @ts-ignore
import indiaMap from "@svg-maps/india";

interface LocationItem {
  name: string;
  x: number;
  y: number;
  info: string;
  isHQ?: boolean;
  _id?: string;
}

interface ReachData {
  heading: string;
  sub: string;
  locations: LocationItem[];
}

const emptyLocation = (): LocationItem => ({
  name: "",
  x: 200,
  y: 338,
  info: "",
  isHQ: false,
});

export default function ReachEditorPage() {
  const [data, setData] = useState<ReachData>({ heading: "", sub: "", locations: [] });
  const [loading, setLoading] = useState(true);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);
  const [pickingPin, setPickingPin] = useState<number | null>(null);
  const { saved, flash } = useSavedFlash();

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/reach`);
      if (!res.ok) throw new Error("Failed to fetch reach content");
      const d = await res.json();
      setData(d);
    } catch (err) {
      console.error("Error loading reach content:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSave = async () => {
    const user = adminAuth.getUser();
    if (!user) { alert("Not authenticated. Please log in."); return; }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/reach`, {
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

  const updateLocation = (idx: number, patch: Partial<LocationItem>) => {
    setData((prev) => {
      const locs = prev.locations.map((loc, i) => {
        if (i === idx) {
          return { ...loc, ...patch };
        }
        if (patch.isHQ && loc.isHQ) {
          return { ...loc, isHQ: false };
        }
        return loc;
      });
      return { ...prev, locations: locs };
    });
  };

  const addLocation = () => {
    const newLoc = emptyLocation();
    setData((prev) => ({ ...prev, locations: [...prev.locations, newLoc] }));
    setExpandedIdx(data.locations.length);
  };

  const removeLocation = (idx: number) => {
    setData((prev) => ({ ...prev, locations: prev.locations.filter((_, i) => i !== idx) }));
    setExpandedIdx(null);
  };

  const handleMapClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (pickingPin === null) return;
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    // SVG viewBox is 612 x 696
    const x = ((e.clientX - rect.left) / rect.width) * 612;
    const y = ((e.clientY - rect.top) / rect.height) * 696;
    updateLocation(pickingPin, { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 });
    setPickingPin(null);
  };

  const hq = data.locations.find((l) => l.isHQ);

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <AdminHeader title="Reach Section Editor" breadcrumb={[{ label: "Content" }, { label: "Homepage", href: "/admin/content/homepage" }, { label: "Reach" }]} />
        <main style={{ flex: 1, padding: "28px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 14, color: "var(--muted)" }}>Loading Reach configuration...</div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader title="Reach Section Editor" breadcrumb={[{ label: "Content" }, { label: "Homepage", href: "/admin/content/homepage" }, { label: "Reach" }]} />

      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 24, maxWidth: 1100 }}>

        {/* Section copy */}
        <div style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-display)" }}>Section Copy</h3>
          <Field label="Section Heading" value={data.heading} onChange={(val) => setData((p) => ({ ...p, heading: val }))} />
          <TextArea label="Section Sub-text" value={data.sub} onChange={(val) => setData((p) => ({ ...p, sub: val }))} rows={3} />
        </div>

        {/* Map + Location Editor — side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 24, alignItems: "start" }}>

          {/* Locations list */}
          <div style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-display)" }}>
                Map Locations ({data.locations.length})
              </h3>
              <Button variant="outline" size="sm" onClick={addLocation}>+ Add Location</Button>
            </div>

            {pickingPin !== null && (
              <div style={{ background: "var(--blue-50)", border: "1.5px dashed var(--blue-400)", borderRadius: "var(--r-sm)", padding: "10px 14px", fontSize: 13, color: "var(--blue-700)", fontWeight: 600 }}>
                📍 Click anywhere on the map to place the pin for <strong>{data.locations[pickingPin]?.name || "this location"}</strong>. Press Esc to cancel.
              </div>
            )}

            {data.locations.length === 0 && (
              <div style={{ fontSize: 13, color: "var(--muted)", textAlign: "center", padding: "16px 0" }}>No locations yet. Click "+ Add Location".</div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 520, overflowY: "auto", paddingRight: 4 }}>
              {data.locations.map((loc, idx) => {
                const isOpen = expandedIdx === idx;
                return (
                  <div
                    key={idx}
                    style={{ border: `1.5px solid ${isOpen ? "var(--blue-300)" : "var(--line-2)"}`, borderRadius: "var(--r-sm)", overflow: "hidden", transition: "border-color 0.2s", flexShrink: 0 }}
                    onMouseEnter={() => setHoveredPin(idx)}
                    onMouseLeave={() => setHoveredPin(null)}
                  >
                    {/* Row header */}
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: isOpen ? "var(--blue-50)" : "var(--paper-2)", cursor: "pointer", userSelect: "none" }}
                      onClick={() => setExpandedIdx(isOpen ? null : idx)}
                    >
                      {/* Colour pin */}
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: loc.isHQ ? "#FACC15" : "#FACC15", border: loc.isHQ ? "2.5px solid #0E55BC" : "2px solid #fff", boxShadow: "0 0 0 2px rgba(250,204,21,0.35)", flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {loc.name || "Unnamed location"}
                          {loc.isHQ && <span style={{ marginLeft: 6, fontSize: 10, fontWeight: 700, color: "var(--blue-700)", background: "var(--blue-100)", padding: "1px 6px", borderRadius: 999 }}>HQ</span>}
                        </div>
                        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {loc.info || "No description"}
                        </div>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); removeLocation(idx); }}
                        style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)", color: "var(--danger)", borderRadius: 6, padding: "3px 8px", fontSize: 11, cursor: "pointer", fontWeight: 600, flexShrink: 0 }}
                      >
                        ✕
                      </button>
                      <div style={{ color: "var(--muted)", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
                      </div>
                    </div>

                    {/* Expanded body */}
                    {isOpen && (
                      <div style={{ padding: "16px 14px", borderTop: "1px solid var(--line-2)", display: "flex", flexDirection: "column", gap: 14 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                          <Field label="State / City Name" value={loc.name} onChange={(v) => updateLocation(idx, { name: v })} placeholder="e.g. Rajasthan" />
                          <Field label="Location Details" value={loc.info} onChange={(v) => updateLocation(idx, { info: v })} placeholder="e.g. Jaipur Warehouse & Sales Office" />
                        </div>

                        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>
                            <input
                              type="checkbox"
                              checked={!!loc.isHQ}
                              onChange={(e) => updateLocation(idx, { isHQ: e.target.checked })}
                              style={{ width: 16, height: 16, cursor: "pointer", accentColor: "var(--blue-600)" }}
                            />
                            Mark as HQ (shows concentric pulse rings)
                          </label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPickingPin(idx)}
                            style={{ display: "inline-flex", gap: 6, alignItems: "center" }}
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"/></svg>
                            Pick on map
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Mini Map Preview */}
          <div style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", padding: 20, position: "sticky", top: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 12, fontFamily: "var(--font-display)" }}>
              Map Preview {pickingPin !== null ? <span style={{ color: "var(--blue-600)", fontWeight: 600 }}>— Click to place pin</span> : ""}
            </div>
            <div
              style={{ position: "relative", cursor: pickingPin !== null ? "crosshair" : "default" }}
              onKeyDown={(e) => { if (e.key === "Escape") setPickingPin(null); }}
              tabIndex={0}
            >
              <svg
                viewBox="0 0 612 696"
                width="100%"
                style={{ display: "block", overflow: "visible", border: pickingPin !== null ? "2px dashed var(--blue-400)" : "none", borderRadius: 8, height: "auto" }}
                onClick={handleMapClick}
              >
                {/* State paths */}
                <g>
                  {indiaMap.locations.map((loc: any) => (
                    <path key={loc.id} d={loc.path} fill="var(--blue-600)" stroke="#ffffff" strokeWidth={0.8} />
                  ))}
                </g>

                {/* Animated arcs from HQ */}
                {hq && (
                  <g pointerEvents="none">
                    <style>{`
                      @keyframes adminFlowArc { 0% { stroke-dashoffset: 20; } 100% { stroke-dashoffset: 0; } }
                      .admin-flow-line { stroke-dasharray: 6 4; animation: adminFlowArc 1.5s linear infinite; }
                    `}</style>
                    {data.locations.map((loc, idx) => {
                      if (loc.isHQ) return null;
                      const dx = loc.x - hq.x, dy = loc.y - hq.y;
                      const dist = Math.sqrt(dx * dx + dy * dy);
                      const cx = (hq.x + loc.x) / 2, cy = (hq.y + loc.y) / 2 - dist * 0.28;
                      const isHighlighted = hoveredPin === idx;
                      return (
                        <path
                          key={`arc-${idx}`}
                          d={`M ${hq.x} ${hq.y} Q ${cx} ${cy} ${loc.x} ${loc.y}`}
                          fill="none"
                          stroke={isHighlighted ? "#FFD700" : "#FACC15"}
                          strokeWidth={isHighlighted ? 2.5 : 1.2}
                          className="admin-flow-line"
                          style={{ opacity: hoveredPin === null ? 0.7 : isHighlighted ? 1 : 0.15, transition: "opacity 0.3s, stroke-width 0.3s" }}
                        />
                      );
                    })}
                  </g>
                )}

                {/* Location pins */}
                {data.locations.map((loc, idx) => {
                  const isHighlighted = hoveredPin === idx || expandedIdx === idx;
                  if (loc.isHQ) {
                    return (
                      <g key={idx} transform={`translate(${loc.x}, ${loc.y})`}>
                        <circle r={6} fill="none" stroke="#FACC15" strokeWidth={1.5}>
                          <animate attributeName="r" values="6;22" dur="2.4s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.85;0" dur="2.4s" repeatCount="indefinite" />
                        </circle>
                        <circle r={7} fill="#0E55BC" stroke="#FACC15" strokeWidth={2} />
                        <circle r={3} fill="#FACC15" />
                      </g>
                    );
                  }
                  return (
                    <g key={idx} transform={`translate(${loc.x}, ${loc.y})`} style={{ transition: "transform 0.2s" }}>
                      {isHighlighted && (
                        <circle r={10} fill="rgba(250,204,21,0.25)" stroke="#FACC15" strokeWidth={1} />
                      )}
                      <circle r={4.5} fill="#FACC15" stroke={isHighlighted ? "#0E55BC" : "#ffffff"} strokeWidth={isHighlighted ? 2 : 1} />
                      {isHighlighted && (
                        <text y={-10} textAnchor="middle" fill="#fff" fontSize="6" fontWeight="700" style={{ pointerEvents: "none" }}>
                          {loc.name}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
            <div style={{ marginTop: 10, fontSize: 11, color: "var(--muted)", textAlign: "center" }}>
              {data.locations.length} pins · Hover over location in list to highlight
            </div>
          </div>
        </div>

        <SaveBar saved={saved} onSave={handleSave} onReset={loadData} />
      </main>
    </div>
  );
}
