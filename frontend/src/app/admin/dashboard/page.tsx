"use client";

import { useState } from "react";
import Link from "next/link";
import { AdminHeader } from "../_components/AdminHeader";
import { StatsCard } from "../_components/StatsCard";
import { AreaChart, BarChart, DonutChart, ProgressBar } from "../_components/Charts";

const STATS = [
  { label: "Total Products", value: "48", change: "+3 new", changeType: "up" as const, accent: "var(--blue-600)", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg> },
  { label: "Active Dealers", value: "1,284", change: "+62", changeType: "up" as const, accent: "var(--ok)", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg> },
  { label: "Pending Inquiries", value: "23", change: "+8", changeType: "up" as const, accent: "var(--signal)", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg> },
  { label: "Site Visits (30d)", value: "84.2k", change: "+12.4%", changeType: "up" as const, accent: "var(--water)", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg> },
];

const VISITS = [4200, 3900, 5100, 4800, 6200, 7400, 6900, 8100, 7600, 9200, 8800, 9800];
const VISIT_LABELS = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];

const INQUIRY_BARS = [12, 18, 9, 24, 16, 28, 21];
const INQUIRY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CATEGORY_SPLIT = [
  { label: "Water Tanks", value: 42, color: "#1466E6" },
  { label: "PVC Pipes", value: 31, color: "#00B4F0" },
  { label: "Planters", value: 17, color: "#1FAE6A" },
  { label: "Cooler", value: 5, color: "#FFB020" },
  { label: "Unbreakable products", value: 3, color: "#6BA1FF" },
  { label: "Waste Management", value: 1, color: "#8B5CF6" },
  { label: "Toilet Seat", value: 1, color: "#E5484D" },
];

const TOP_PRODUCTS = [
  { name: "Triple Layer 1000L Tank", inquiries: 142, pct: 92 },
  { name: "ISI PVC Pipe 1 inch", inquiries: 118, pct: 76 },
  { name: "Triple Layer 500L Tank", inquiries: 97, pct: 63 },
  { name: "Decorative Planter 18\"", inquiries: 64, pct: 41 },
  { name: "Overflow Kit Standard", inquiries: 38, pct: 25 },
];

const ACTIVITY = [
  { icon: "user", text: "New dealer application from Rajesh Verma", time: "2 min ago", color: "var(--blue-600)" },
  { icon: "mail", text: "New inquiry — Bulk order PVC pipes", time: "18 min ago", color: "var(--signal)" },
  { icon: "edit", text: "Hero section video updated", time: "1 hr ago", color: "var(--ok)" },
  { icon: "box", text: "Product 'Triple Layer 2000L' stock low", time: "3 hr ago", color: "#dc2626" },
  { icon: "user", text: "Dealer 'Das Traders' approved", time: "5 hr ago", color: "var(--ok)" },
];

const RECENT_INQUIRIES = [
  { name: "Ramesh Sharma", subject: "Product inquiry – Triple Layer 1000L", date: "Today, 10:42 AM", status: "New" },
  { name: "Priya Patel", subject: "Dealer partnership request", date: "Today, 9:15 AM", status: "New" },
  { name: "Suresh Mehta", subject: "Bulk order – PVC pipes", date: "Yesterday", status: "Replied" },
  { name: "Anita Joshi", subject: "Technical specs for planters", date: "Yesterday", status: "Replied" },
];

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  New: { bg: "var(--blue-50)", color: "var(--blue-700)" },
  Replied: { bg: "#f0fdf4", color: "var(--ok)" },
  Pending: { bg: "#fffbeb", color: "#b45309" },
};

const activityIcons: Record<string, React.ReactNode> = {
  user: <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />,
  mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 5L2 7" /></>,
  edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></>,
  box: <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></>,
};

function ChartCard({ title, subtitle, right, children }: { title: string; subtitle?: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", padding: "20px 22px", display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, fontFamily: "var(--font-display)", color: "var(--ink)" }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{subtitle}</div>}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

export default function DashboardPage() {
  const [range, setRange] = useState("12M");

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader title="Dashboard" />

      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 22 }}>

        {/* Welcome / quick actions banner */}
        <div style={{ background: "linear-gradient(135deg, var(--blue-900) 0%, var(--blue-700) 100%)", borderRadius: "var(--r-md)", padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -40, top: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,.05)" }} />
          <div style={{ position: "relative" }}>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 22, fontFamily: "var(--font-display)" }}>Welcome back, Admin</div>
            <div style={{ color: "rgba(255,255,255,.7)", fontSize: 13.5, marginTop: 4 }}>Here&apos;s what&apos;s happening across Supremo today.</div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", position: "relative" }}>
            {[
              { label: "Edit Hero", href: "/admin/content/hero" },
              { label: "Add Product", href: "/admin/products" },
              { label: "View Inquiries", href: "/admin/inquiries" },
            ].map((a) => (
              <Link key={a.label} href={a.href} style={{ height: 38, padding: "0 18px", background: "rgba(255,255,255,.14)", border: "1px solid rgba(255,255,255,.2)", borderRadius: "var(--r-pill)", color: "#fff", fontSize: 13, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none", fontFamily: "var(--font-display)", whiteSpace: "nowrap", transition: "background .15s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.24)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.14)"; }}
              >
                {a.label}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }} aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        {/* KPI cards */}
        <div className="adm-cols-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {STATS.map((s) => <StatsCard key={s.label} {...s} />)}
        </div>

        {/* Charts row: visits area + category donut */}
        <div className="adm-split" style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: 18 }}>
          <ChartCard
            title="Website Traffic"
            subtitle="Monthly visits over the selected period"
            right={
              <div style={{ display: "flex", gap: 3, background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", padding: 3 }}>
                {["7D", "30D", "12M"].map((r) => (
                  <button key={r} onClick={() => setRange(r)} style={{ height: 26, padding: "0 11px", borderRadius: 6, border: "none", background: range === r ? "var(--blue-600)" : "transparent", color: range === r ? "#fff" : "var(--muted)", fontSize: 11.5, fontWeight: 600, fontFamily: "var(--font-display)", cursor: "pointer" }}>
                    {r}
                  </button>
                ))}
              </div>
            }
          >
            <AreaChart data={VISITS} labels={VISIT_LABELS} height={250} />
          </ChartCard>

          <ChartCard title="Inquiries by Category" subtitle="Share of total this month">
            <div style={{ paddingTop: 8 }}>
              <DonutChart data={CATEGORY_SPLIT} />
            </div>
          </ChartCard>
        </div>

        {/* Charts row 2: weekly inquiries bar + top products */}
        <div className="adm-split" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18 }}>
          <ChartCard title="Inquiries This Week" subtitle="Daily contact-form submissions">
            <BarChart data={INQUIRY_BARS} labels={INQUIRY_LABELS} height={230} color="#00B4F0" />
          </ChartCard>

          <ChartCard title="Top Products" subtitle="Most-inquired this month">
            <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
              {TOP_PRODUCTS.map((p) => (
                <div key={p.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 12.5, color: "var(--slate)", fontWeight: 500 }}>{p.name}</span>
                    <span style={{ fontSize: 12.5, color: "var(--ink)", fontWeight: 700 }}>{p.inquiries}</span>
                  </div>
                  <ProgressBar value={p.pct} color={p.pct > 70 ? "var(--blue-600)" : p.pct > 40 ? "var(--water)" : "var(--soft)"} />
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Bottom row: recent inquiries + activity feed */}
        <div className="adm-split" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 18 }}>
          {/* Recent inquiries */}
          <div style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", overflow: "hidden" }}>
            <div style={{ padding: "18px 22px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--line-2)" }}>
              <div style={{ fontWeight: 700, fontSize: 15, fontFamily: "var(--font-display)", color: "var(--ink)" }}>Recent Inquiries</div>
              <Link href="/admin/inquiries" style={{ fontSize: 12, color: "var(--blue-600)", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                View all <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div>
              {RECENT_INQUIRIES.map((inq, i) => {
                const sc = STATUS_COLORS[inq.status];
                return (
                  <div key={i} style={{ padding: "13px 22px", display: "flex", alignItems: "center", gap: 14, borderBottom: i < RECENT_INQUIRIES.length - 1 ? "1px solid var(--line-2)" : "none" }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--blue-100)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--blue-700)", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{inq.name.charAt(0)}</div>
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

          {/* Activity feed */}
          <div style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", overflow: "hidden" }}>
            <div style={{ padding: "18px 22px 14px", borderBottom: "1px solid var(--line-2)", fontWeight: 700, fontSize: 15, fontFamily: "var(--font-display)", color: "var(--ink)" }}>Activity Feed</div>
            <div style={{ padding: "8px 22px 16px" }}>
              {ACTIVITY.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "11px 0", position: "relative" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: a.color + "18", display: "flex", alignItems: "center", justifyContent: "center", color: a.color, flexShrink: 0 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{activityIcons[a.icon]}</svg>
                    </div>
                    {i < ACTIVITY.length - 1 && <div style={{ width: 1, flex: 1, background: "var(--line-2)", marginTop: 4 }} />}
                  </div>
                  <div style={{ paddingBottom: 4 }}>
                    <div style={{ fontSize: 12.5, color: "var(--ink)", lineHeight: 1.45 }}>{a.text}</div>
                    <div style={{ fontSize: 11, color: "var(--soft)", marginTop: 2 }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
