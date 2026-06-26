"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "../_components/AdminHeader";
import { StatsCard } from "../_components/StatsCard";
import { AreaChart, BarChart, DonutChart } from "../_components/Charts";
import { adminAuth } from "../_services/adminAuth";

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

const STATS_ICONS = {
  "Total Visitors": <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
  "Avg. Session": <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  "Bounce Rate": <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 12h4l3 8 4-16 3 8h4" /></svg>,
  "Conversions": <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
};

export default function AnalyticsPage() {
  const [data, setData] = useState<{
    stats: any[];
    trafficData: number[];
    trafficLabels: string[];
    sources: any[];
    pageviews: number[];
    pageLabels: string[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = adminAuth.getUser();
    if (!user) return;
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

    setLoading(true);
    fetch(`${apiBase}/inquiries/analytics?t=${Date.now()}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Cache-Control": "no-cache",
        "Pragma": "no-cache"
      }
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((resData) => {
        if (resData) {
          setData(resData);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching analytics data:", err);
        setLoading(false);
      });
  }, []);

  const stats = (data?.stats || []).map((s) => ({
    label: s.label,
    value: s.value,
    change: s.change,
    changeType: s.changeType as "up" | "down" | "neutral",
    accent: s.accent,
    icon: STATS_ICONS[s.label as keyof typeof STATS_ICONS] || STATS_ICONS["Total Visitors"]
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader title="Analytics" breadcrumb={[{ label: "Analytics" }]} />
      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 22 }}>
        {loading ? (
          <div style={{ padding: "80px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, color: "var(--muted)" }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", border: "2.5px solid var(--line)", borderTopColor: "var(--blue-600)", animation: "spin 1s linear infinite" }} />
            <div style={{ fontSize: 13.5, fontWeight: 500 }}>Loading real-time analytics...</div>
            <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }` }} />
          </div>
        ) : (
          <>
            <div className="adm-cols-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, maxWidth: 560 }}>
              {stats.map((s) => <StatsCard key={s.label} size="small" {...s} />)}
            </div>
            
            <ChartCard title="Visitor Trend" subtitle="Last 14 weeks">
              <AreaChart data={data?.trafficData || []} labels={data?.trafficLabels || []} height={260} color="#1466E6" />
            </ChartCard>
            
            <div className="adm-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              <ChartCard title="Traffic Sources" subtitle="Where visitors come from">
                <div style={{ paddingTop: 8 }}><DonutChart data={data?.sources || []} /></div>
              </ChartCard>
              <ChartCard title="Top Pages" subtitle="Page views this month">
                <BarChart data={data?.pageviews || []} labels={data?.pageLabels || []} height={230} color="#00B4F0" />
              </ChartCard>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
