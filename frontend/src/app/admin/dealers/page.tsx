"use client";

import { useState } from "react";
import { AdminHeader } from "../_components/AdminHeader";

const DEALERS = [
  { id: 1, name: "Rajesh Verma", business: "Verma Hardware", city: "Ahmedabad", state: "Gujarat", phone: "+91 98250 34567", email: "rajesh@vermahw.in", date: "18 May 2026", status: "Pending" },
  { id: 2, name: "Kavya Nair", business: "Nair Plumbing Supplies", city: "Kochi", state: "Kerala", phone: "+91 94470 12345", email: "kavya@nairplumbing.in", date: "18 May 2026", status: "Pending" },
  { id: 3, name: "Mohan Das", business: "Das Traders", city: "Bhubaneswar", state: "Odisha", phone: "+91 90240 78901", email: "m.das@dastraders.com", date: "17 May 2026", status: "Active" },
  { id: 4, name: "Sunita Agarwal", business: "Agarwal Enterprises", city: "Jaipur", state: "Rajasthan", phone: "+91 99290 56789", email: "sunita@agarwale.in", date: "17 May 2026", status: "Active" },
  { id: 5, name: "Pradeep Singh", business: "Singh Brothers", city: "Lucknow", state: "Uttar Pradesh", phone: "+91 93590 11223", email: "pradeep@singhbros.in", date: "15 May 2026", status: "Active" },
  { id: 6, name: "Meena Krishnan", business: "Krishnan Agencies", city: "Chennai", state: "Tamil Nadu", phone: "+91 98410 44556", email: "meena@krishnana.in", date: "14 May 2026", status: "Active" },
  { id: 7, name: "Sanjay Gupta", business: "Gupta Plumbing Works", city: "Pune", state: "Maharashtra", phone: "+91 97650 99887", email: "sanjay@guptaplumbing.in", date: "10 May 2026", status: "Inactive" },
  { id: 8, name: "Anand Tiwari", business: "Tiwari Sanitations", city: "Indore", state: "Madhya Pradesh", phone: "+91 96780 33221", email: "anand@tiwaris.in", date: "5 May 2026", status: "Active" },
];

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Pending:  { bg: "#fffbeb", color: "#b45309" },
  Active:   { bg: "#f0fdf4", color: "#15803d" },
  Inactive: { bg: "var(--paper-2)", color: "var(--muted)" },
  Rejected: { bg: "#fef2f2", color: "#dc2626" },
};

const FILTER_OPTIONS = ["All", "Pending", "Active", "Inactive"];

export default function DealersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = DEALERS.filter((d) => {
    const matchFilter = filter === "All" || d.status === filter;
    const q = search.toLowerCase();
    const matchSearch = d.name.toLowerCase().includes(q) || d.business.toLowerCase().includes(q) || d.city.toLowerCase().includes(q) || d.state.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const counts = {
    All: DEALERS.length,
    Pending: DEALERS.filter((d) => d.status === "Pending").length,
    Active: DEALERS.filter((d) => d.status === "Active").length,
    Inactive: DEALERS.filter((d) => d.status === "Inactive").length,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader title="Dealers" breadcrumb={[{ label: "Dealers" }]} />

      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 20 }}>

        {/* Stats mini row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {[
            { label: "Total Dealers", value: counts.All, color: "var(--blue-600)" },
            { label: "Pending Approval", value: counts.Pending, color: "var(--signal)" },
            { label: "Active Dealers", value: counts.Active, color: "var(--ok)" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "var(--paper)",
                borderRadius: "var(--r-md)",
                padding: "18px 22px",
                border: "1px solid var(--line-2)",
                boxShadow: "var(--sh-sm)",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, color: "var(--ink)", fontFamily: "var(--font-display)", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div
            style={{
              display: "flex", alignItems: "center", gap: 8, height: 40, padding: "0 14px",
              background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", flex: "1 1 240px", maxWidth: 340, transition: "border-color .15s",
            }}
            onFocusCapture={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--blue-600)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 3px var(--blue-100)"; }}
            onBlurCapture={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--line)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--soft)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search dealers…"
              style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, color: "var(--ink)", fontFamily: "var(--font-body)", width: "100%" }}
            />
          </div>
          <div style={{ display: "flex", gap: 4, background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", padding: "4px" }}>
            {FILTER_OPTIONS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  height: 30, padding: "0 12px", borderRadius: 6, border: "none",
                  background: filter === f ? "var(--blue-600)" : "transparent",
                  color: filter === f ? "#fff" : "var(--muted)",
                  fontSize: 12, fontWeight: 600, fontFamily: "var(--font-display)", cursor: "pointer", transition: "background .15s, color .15s", whiteSpace: "nowrap",
                }}
              >
                {f} {f !== "All" && <span style={{ opacity: 0.7, fontSize: 10 }}>({counts[f as keyof typeof counts]})</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1.6fr 1fr 1fr 90px 90px", padding: "12px 20px", background: "var(--paper-2)", borderBottom: "1px solid var(--line-2)", gap: 12 }}>
            {["Dealer", "Business", "Location", "Contact", "Date", "Status"].map((h) => (
              <div key={h} style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", fontFamily: "var(--font-display)" }}>
                {h}
              </div>
            ))}
          </div>

          {filtered.map((d, i) => {
            const ss = STATUS_STYLE[d.status];
            return (
              <div
                key={d.id}
                style={{
                  display: "grid", gridTemplateColumns: "1.6fr 1.6fr 1fr 1fr 90px 90px",
                  padding: "14px 20px", gap: 12, alignItems: "center",
                  borderBottom: i < filtered.length - 1 ? "1px solid var(--line-2)" : "none",
                  transition: "background .12s", cursor: "pointer",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--paper-2)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--blue-100)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--blue-700)", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                    {d.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{d.name}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>{d.email}</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500 }}>{d.business}</div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{d.city}, {d.state}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{d.phone}</div>
                <div style={{ fontSize: 11, color: "var(--soft)" }}>{d.date}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: "var(--r-pill)", background: ss.bg, color: ss.color }}>{d.status}</span>
                  {d.status === "Pending" && (
                    <div style={{ display: "flex", gap: 3 }}>
                      <button
                        title="Approve"
                        style={{ width: 24, height: 24, borderRadius: 4, border: "1px solid #bbf7d0", background: "#f0fdf4", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#15803d" }}
                        onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = "#dcfce7"; }}
                        onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = "#f0fdf4"; }}
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                      </button>
                      <button
                        title="Reject"
                        style={{ width: 24, height: 24, borderRadius: 4, border: "1px solid #fecaca", background: "#fef2f2", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#dc2626" }}
                        onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = "#fee2e2"; }}
                        onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = "#fef2f2"; }}
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div style={{ padding: "48px 20px", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
              No dealers found.
            </div>
          )}
        </div>

        <div style={{ fontSize: 12, color: "var(--muted)" }}>
          Showing {filtered.length} of {DEALERS.length} dealers
        </div>
      </main>
    </div>
  );
}
