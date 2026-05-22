"use client";

import { AdminHeader } from "../_components/AdminHeader";
import { StatsCard } from "../_components/StatsCard";
import { AreaChart, BarChart, DonutChart } from "../_components/Charts";

const STATS = [
  { label: "Total Visitors", value: "84,210", change: "+12.4%", changeType: "up" as const, accent: "var(--blue-600)", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg> },
  { label: "Avg. Session", value: "3m 12s", change: "+8s", changeType: "up" as const, accent: "var(--ok)", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> },
  { label: "Bounce Rate", value: "38.5%", change: "-2.1%", changeType: "down" as const, accent: "var(--signal)", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 12h4l3 8 4-16 3 8h4" /></svg> },
  { label: "Conversions", value: "1,042", change: "+18%", changeType: "up" as const, accent: "var(--water)", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg> },
];

const TRAFFIC = [3200, 4100, 3800, 5200, 4900, 6100, 5800, 7200, 6800, 8400, 7900, 9100, 8600, 9800];
const TRAFFIC_LABELS = ["", "", "", "", "", "Wk6", "", "", "", "Wk10", "", "", "", "Now"];

const SOURCES = [
  { label: "Organic Search", value: 48, color: "#1466E6" },
  { label: "Direct", value: 27, color: "#00B4F0" },
  { label: "Social", value: 15, color: "#6BA1FF" },
  { label: "Referral", value: 10, color: "#FFB020" },
];

const PAGEVIEWS = [9200, 6400, 4800, 3900, 3100, 2400];
const PAGE_LABELS = ["Home", "Products", "Dealer", "About", "Mfg", "Contact"];

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", padding: "20px 22px", display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <div style={{ fontWeight: 700, fontSize: 15, fontFamily: "var(--font-display)", color: "var(--ink)" }}>{title}</div>
        {subtitle && <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader title="Analytics" breadcrumb={[{ label: "Analytics" }]} />
      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 22 }}>
        <div className="adm-cols-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {STATS.map((s) => <StatsCard key={s.label} {...s} />)}
        </div>
        <ChartCard title="Visitor Trend" subtitle="Last 14 weeks">
          <AreaChart data={TRAFFIC} labels={TRAFFIC_LABELS} height={260} color="#1466E6" />
        </ChartCard>
        <div className="adm-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <ChartCard title="Traffic Sources" subtitle="Where visitors come from">
            <div style={{ paddingTop: 8 }}><DonutChart data={SOURCES} /></div>
          </ChartCard>
          <ChartCard title="Top Pages" subtitle="Page views this month">
            <BarChart data={PAGEVIEWS} labels={PAGE_LABELS} height={230} color="#00B4F0" />
          </ChartCard>
        </div>
      </main>
    </div>
  );
}
