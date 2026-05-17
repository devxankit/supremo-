"use client";

import Link from "next/link";
import { AdminHeader } from "../_components/AdminHeader";
import { StatsCard } from "../_components/StatsCard";

const STATS = [
  {
    label: "Total Products",
    value: "48",
    change: "+3 new",
    changeType: "up" as const,
    accent: "var(--blue-600)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
  },
  {
    label: "Active Dealers",
    value: "1,284",
    change: "+62",
    changeType: "up" as const,
    accent: "var(--ok)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Pending Inquiries",
    value: "23",
    change: "+8",
    changeType: "up" as const,
    accent: "var(--signal)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: "States Covered",
    value: "22",
    change: "Pan-India",
    changeType: "neutral" as const,
    accent: "var(--water)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

const RECENT_INQUIRIES = [
  { name: "Ramesh Sharma", email: "ramesh@gmail.com", subject: "Product inquiry – Triple Layer 1000L", date: "Today, 10:42 AM", status: "New" },
  { name: "Priya Patel", email: "priya.p@yahoo.com", subject: "Dealer partnership request", date: "Today, 9:15 AM", status: "New" },
  { name: "Suresh Mehta", email: "s.mehta@outlook.com", subject: "Bulk order – PVC pipes", date: "Yesterday, 4:30 PM", status: "Replied" },
  { name: "Anita Joshi", email: "anita.j@gmail.com", subject: "Technical specs for planters", date: "Yesterday, 2:10 PM", status: "Replied" },
  { name: "Vijay Kumar", email: "vijay.k@gmail.com", subject: "Warranty claim – Tank crack", date: "18 May 2026", status: "Pending" },
];

const RECENT_DEALERS = [
  { name: "Rajesh Verma", business: "Verma Hardware", city: "Ahmedabad", state: "Gujarat", date: "Today", status: "Pending" },
  { name: "Kavya Nair", business: "Nair Plumbing Supplies", city: "Kochi", state: "Kerala", date: "Today", status: "Pending" },
  { name: "Mohan Das", business: "Das Traders", city: "Bhubaneswar", state: "Odisha", date: "Yesterday", status: "Approved" },
  { name: "Sunita Agarwal", business: "Agarwal Enterprises", city: "Jaipur", state: "Rajasthan", date: "18 May", status: "Approved" },
];

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  New:      { bg: "var(--blue-50)",    color: "var(--blue-700)" },
  Replied:  { bg: "#f0fdf4",           color: "var(--ok)" },
  Pending:  { bg: "#fffbeb",           color: "#b45309" },
  Approved: { bg: "#f0fdf4",           color: "var(--ok)" },
  Rejected: { bg: "#fef2f2",           color: "#ef4444" },
};

export default function DashboardPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader title="Dashboard" />

      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 28 }}>

        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {STATS.map((s) => (
            <StatsCard key={s.label} {...s} />
          ))}
        </div>

        {/* Quick Actions */}
        <div
          style={{
            background: "linear-gradient(135deg, var(--blue-900) 0%, var(--blue-700) 100%)",
            borderRadius: "var(--r-md)",
            padding: "22px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ color: "rgba(255,255,255,.6)", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Quick Actions</div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, fontFamily: "var(--font-display)" }}>Manage your business from here</div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              { label: "Add Product", href: "/admin/products", icon: "+" },
              { label: "View Inquiries", href: "/admin/inquiries", icon: "→" },
              { label: "Dealer Apps", href: "/admin/dealers", icon: "→" },
            ].map((a) => (
              <Link
                key={a.label}
                href={a.href}
                style={{
                  height: 38,
                  padding: "0 18px",
                  background: "rgba(255,255,255,.12)",
                  border: "1px solid rgba(255,255,255,.2)",
                  backdropFilter: "blur(6px)",
                  borderRadius: "var(--r-pill)",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  textDecoration: "none",
                  transition: "background .15s",
                  fontFamily: "var(--font-display)",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.22)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.12)"; }}
              >
                {a.label}
                <span style={{ opacity: 0.7 }}>{a.icon}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Tables Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }}>

          {/* Recent Inquiries */}
          <div style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", overflow: "hidden" }}>
            <div style={{ padding: "18px 22px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--line-2)" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, fontFamily: "var(--font-display)", color: "var(--ink)" }}>Recent Inquiries</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Latest contact form submissions</div>
              </div>
              <Link href="/admin/inquiries" style={{ fontSize: 12, color: "var(--blue-600)", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                View all
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div>
              {RECENT_INQUIRIES.map((inq, i) => {
                const sc = STATUS_COLORS[inq.status];
                return (
                  <div
                    key={i}
                    style={{
                      padding: "13px 22px",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      borderBottom: i < RECENT_INQUIRIES.length - 1 ? "1px solid var(--line-2)" : "none",
                      transition: "background .12s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--paper-2)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        background: "var(--blue-100)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--blue-700)",
                        fontSize: 13,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {inq.name.charAt(0)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{inq.name}</div>
                      <div style={{ fontSize: 12, color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{inq.subject}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: "var(--r-pill)", background: sc.bg, color: sc.color }}>{inq.status}</span>
                      <div style={{ fontSize: 11, color: "var(--soft)", marginTop: 3 }}>{inq.date}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Dealer Applications */}
          <div style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", overflow: "hidden" }}>
            <div style={{ padding: "18px 22px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--line-2)" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, fontFamily: "var(--font-display)", color: "var(--ink)" }}>Dealer Applications</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>New partnership requests</div>
              </div>
              <Link href="/admin/dealers" style={{ fontSize: 12, color: "var(--blue-600)", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                View all
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div>
              {RECENT_DEALERS.map((d, i) => {
                const sc = STATUS_COLORS[d.status];
                return (
                  <div
                    key={i}
                    style={{
                      padding: "13px 22px",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      borderBottom: i < RECENT_DEALERS.length - 1 ? "1px solid var(--line-2)" : "none",
                      transition: "background .12s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--paper-2)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        background: "#f0fdf4",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--ok)",
                        fontSize: 13,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {d.name.charAt(0)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.name}</div>
                      <div style={{ fontSize: 12, color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.business} · {d.city}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: "var(--r-pill)", background: sc.bg, color: sc.color }}>{d.status}</span>
                      <div style={{ fontSize: 11, color: "var(--soft)", marginTop: 3 }}>{d.date}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
