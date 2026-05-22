"use client";

import { useState } from "react";
import { AdminHeader } from "../_components/AdminHeader";

const INQUIRIES = [
  { id: 1, name: "Ramesh Sharma", email: "ramesh@gmail.com", phone: "+91 98200 11234", subject: "Product inquiry – Triple Layer 1000L", message: "Hi, I wanted to know the exact specifications and price for the 1000L tank. We need about 50 units for a new township project.", date: "Today, 10:42 AM", status: "New" },
  { id: 2, name: "Priya Patel", email: "priya.p@yahoo.com", phone: "+91 94260 78901", subject: "Dealer partnership request", message: "I run a hardware shop in Surat and I am interested in becoming an authorised dealer for Supremo products in the region.", date: "Today, 9:15 AM", status: "New" },
  { id: 3, name: "Suresh Mehta", email: "s.mehta@outlook.com", phone: "+91 99090 34567", subject: "Bulk order – PVC pipes", message: "We are a contractor and need to place a bulk order for ISI certified PVC pipes. Please share your bulk pricing for 2000 metres.", date: "Yesterday, 4:30 PM", status: "Replied" },
  { id: 4, name: "Anita Joshi", email: "anita.j@gmail.com", phone: "+91 96780 56789", subject: "Technical specs for planters", message: "Could you share the weight capacity and UV resistance rating for the 18 inch decorative planters?", date: "Yesterday, 2:10 PM", status: "Replied" },
  { id: 5, name: "Vijay Kumar", email: "vijay.k@gmail.com", phone: "+91 93050 99001", subject: "Warranty claim – Tank crack", message: "My 500L tank has developed a small crack near the lid after 14 months. I need to understand the warranty process.", date: "17 May 2026", status: "Pending" },
  { id: 6, name: "Divya Reddy", email: "divya.r@hotmail.com", phone: "+91 97400 22334", subject: "Price list request", message: "Please send me the complete price list for all your water tank models and accessories.", date: "17 May 2026", status: "Replied" },
  { id: 7, name: "Ashok Banerjee", email: "a.banerjee@gmail.com", phone: "+91 91630 44556", subject: "ISI certification details", message: "We are a government department procuring water tanks. Can you provide ISI certification documents for audit purposes?", date: "16 May 2026", status: "Closed" },
];

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  New:     { bg: "var(--blue-50)",    color: "var(--blue-700)" },
  Replied: { bg: "#f0fdf4",           color: "#15803d" },
  Pending: { bg: "#fffbeb",           color: "#b45309" },
  Closed:  { bg: "var(--paper-2)",    color: "var(--muted)" },
};

const FILTERS = ["All", "New", "Pending", "Replied", "Closed"];

export default function InquiriesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = INQUIRIES.filter((inq) => {
    const matchFilter = filter === "All" || inq.status === filter;
    const q = search.toLowerCase();
    const matchSearch = inq.name.toLowerCase().includes(q) || inq.email.toLowerCase().includes(q) || inq.subject.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const counts: Record<string, number> = {
    All: INQUIRIES.length,
    New: INQUIRIES.filter((i) => i.status === "New").length,
    Pending: INQUIRIES.filter((i) => i.status === "Pending").length,
    Replied: INQUIRIES.filter((i) => i.status === "Replied").length,
    Closed: INQUIRIES.filter((i) => i.status === "Closed").length,
  };

  const detailInquiry = INQUIRIES.find((i) => i.id === selected);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader title="Inquiries" breadcrumb={[{ label: "Inquiries" }]} />

      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 20 }}>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div
            style={{
              display: "flex", alignItems: "center", gap: 8, height: 40, padding: "0 14px",
              background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", flex: "1 1 240px", maxWidth: 340,
            }}
            onFocusCapture={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--blue-600)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 3px var(--blue-100)"; }}
            onBlurCapture={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--line)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--soft)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search inquiries…"
              style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, color: "var(--ink)", fontFamily: "var(--font-body)", width: "100%" }}
            />
          </div>
          <div style={{ display: "flex", gap: 4, background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", padding: "4px" }}>
            {FILTERS.map((f) => (
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
                {f}{f !== "All" && counts[f] > 0 ? ` (${counts[f]})` : ""}
              </button>
            ))}
          </div>
        </div>

        {/* Split view */}
        <div className="adm-split" style={{ display: "grid", gridTemplateColumns: selected ? "1fr 400px" : "1fr", gap: 20, alignItems: "start" }}>

          {/* List */}
          <div className="adm-table-scroll" style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 90px", padding: "12px 20px", background: "var(--paper-2)", borderBottom: "1px solid var(--line-2)", gap: 12 }}>
              {["From", "Subject", "Date", "Status"].map((h) => (
                <div key={h} style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", fontFamily: "var(--font-display)" }}>
                  {h}
                </div>
              ))}
            </div>

            {filtered.map((inq, i) => {
              const ss = STATUS_STYLE[inq.status];
              const isSelected = selected === inq.id;
              return (
                <div
                  key={inq.id}
                  onClick={() => setSelected(isSelected ? null : inq.id)}
                  style={{
                    display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 90px",
                    padding: "14px 20px", gap: 12, alignItems: "center",
                    borderBottom: i < filtered.length - 1 ? "1px solid var(--line-2)" : "none",
                    transition: "background .12s", cursor: "pointer",
                    background: isSelected ? "var(--blue-50)" : "transparent",
                    borderLeft: isSelected ? "3px solid var(--blue-600)" : "3px solid transparent",
                  }}
                  onMouseEnter={(e) => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = "var(--paper-2)"; }}
                  onMouseLeave={(e) => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: inq.status === "New" ? "var(--blue-100)" : "var(--paper-2)", display: "flex", alignItems: "center", justifyContent: "center", color: inq.status === "New" ? "var(--blue-700)" : "var(--muted)", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                      {inq.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: inq.status === "New" ? 700 : 500, color: "var(--ink)" }}>{inq.name}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)" }}>{inq.email}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 13, color: "var(--ink)", fontWeight: inq.status === "New" ? 600 : 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{inq.subject}</div>
                  <div style={{ fontSize: 11, color: "var(--soft)" }}>{inq.date}</div>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: "var(--r-pill)", background: ss.bg, color: ss.color }}>{inq.status}</span>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div style={{ padding: "48px 20px", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>No inquiries found.</div>
            )}
          </div>

          {/* Detail panel */}
          {selected && detailInquiry && (
            <div style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", overflow: "hidden", position: "sticky", top: 88 }}>
              <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid var(--line-2)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontWeight: 700, fontSize: 14, fontFamily: "var(--font-display)", color: "var(--ink)" }}>Inquiry Details</div>
                <button
                  onClick={() => setSelected(null)}
                  style={{ width: 28, height: 28, borderRadius: "var(--r-sm)", border: "1px solid var(--line)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>
              <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Sender */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--blue-100)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--blue-700)", fontSize: 16, fontWeight: 700 }}>
                    {detailInquiry.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "var(--ink)" }}>{detailInquiry.name}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{detailInquiry.email}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{detailInquiry.phone}</div>
                  </div>
                </div>

                <div style={{ height: 1, background: "var(--line-2)" }} />

                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>Subject</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{detailInquiry.subject}</div>
                </div>

                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>Message</div>
                  <div style={{ fontSize: 13, color: "var(--ink)", lineHeight: 1.7, background: "var(--paper-2)", borderRadius: "var(--r-sm)", padding: "12px 14px" }}>
                    {detailInquiry.message}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ fontSize: 12, color: "var(--soft)" }}>{detailInquiry.date}</div>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: "var(--r-pill)", background: STATUS_STYLE[detailInquiry.status].bg, color: STATUS_STYLE[detailInquiry.status].color }}>
                    {detailInquiry.status}
                  </span>
                </div>

                <div style={{ height: 1, background: "var(--line-2)" }} />

                {/* Reply box */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>Reply</div>
                  <textarea
                    placeholder="Type your reply here…"
                    rows={4}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid var(--line)",
                      borderRadius: "var(--r-sm)",
                      font: "inherit",
                      fontSize: 13,
                      color: "var(--ink)",
                      background: "var(--paper-2)",
                      resize: "vertical",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color .15s",
                    }}
                    onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--blue-600)"; (e.currentTarget as HTMLElement).style.background = "#fff"; }}
                    onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--line)"; (e.currentTarget as HTMLElement).style.background = "var(--paper-2)"; }}
                  />
                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                    <button style={{ flex: 1, height: 38, background: "var(--blue-600)", color: "#fff", border: "none", borderRadius: "var(--r-sm)", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-display)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                      Send Reply
                    </button>
                    <button style={{ height: 38, padding: "0 14px", background: "transparent", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-display)", cursor: "pointer", color: "var(--muted)" }}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ fontSize: 12, color: "var(--muted)" }}>
          Showing {filtered.length} of {INQUIRIES.length} inquiries
        </div>
      </main>
    </div>
  );
}
