"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AdminHeader } from "../_components/AdminHeader";
import { StatsCard } from "../_components/StatsCard";
import { AreaChart, BarChart, DonutChart, ProgressBar } from "../_components/Charts";
import { adminAuth } from "../_services/adminAuth";

const VISIT_LABELS = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
const INQUIRY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  New: { bg: "var(--blue-50)", color: "var(--blue-700)" },
  Replied: { bg: "#f0fdf4", color: "var(--ok)" },
  Pending: { bg: "#fffbeb", color: "#b45309" },
  Closed: { bg: "var(--paper-2)", color: "var(--muted)" }
};

const getStatusStyle = (status: string) => {
  return STATUS_COLORS[status] || { bg: "var(--paper-2)", color: "var(--muted)" };
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
          {subtitle && <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{title}</div>}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  
  const now = new Date();
  if (d.toDateString() === now.toDateString()) {
    return `Today, ${d.toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit', hour12: true })}`;
  } else {
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (d.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    return d.toLocaleDateString("en-IN", { day: 'numeric', month: 'short' });
  }
}

export default function DashboardPage() {
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  
  const [statsData, setStatsData] = useState<{
    totalProducts: number;
    totalProductsChange?: string;
    totalProductsChangeType?: string;
    activeDealers: number;
    activeDealersChange?: string;
    activeDealersChangeType?: string;
    pendingInquiries: number;
    pendingInquiriesChange?: string;
    pendingInquiriesChangeType?: string;
    siteVisits: number;
    siteVisitsChange?: string;
    siteVisitsChangeType?: string;
    totalCategories: number;
    totalCategoriesChange?: string;
    totalCategoriesChangeType?: string;
    totalEnquiries: number;
    totalEnquiriesChange?: string;
    totalEnquiriesChangeType?: string;
    totalDealerApplications: number;
    totalDealerApplicationsChange?: string;
    totalDealerApplicationsChangeType?: string;
    totalCareerApplications: number;
    totalCareerApplicationsChange?: string;
    totalCareerApplicationsChangeType?: string;
    totalContactApplications: number;
    totalContactApplicationsChange?: string;
    totalContactApplicationsChangeType?: string;
    approvedDealers: number;
    approvedDealersChange?: string;
    approvedDealersChangeType?: string;
    shortlistedPartners: number;
    shortlistedPartnersChange?: string;
    shortlistedPartnersChangeType?: string;
    totalClosedEnquiries?: number;
    totalClosedEnquiriesChange?: string;
    totalClosedEnquiriesChangeType?: string;
    visitsData: number[];
    visitsLabels?: string[];
    availableYears?: number[];
    categorySplit: any[];
    weeklyData: number[];
    topProducts: any[];
    activityFeed: any[];
    recentInquiries: any[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = adminAuth.getUser();
    if (!user) return;
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
    
    setLoading(true);
    fetch(`${apiBase}/inquiries/stats?year=${selectedYear}&month=${selectedMonth}&t=${Date.now()}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Cache-Control": "no-cache",
        "Pragma": "no-cache"
      }
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          setStatsData(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Dashboard fetch error:", err);
        setLoading(false);
      });
  }, [selectedYear, selectedMonth]);

  const formatVisits = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  const stats = [
    { 
      label: "Total Products", 
      value: loading ? "..." : (statsData?.totalProducts ?? 0).toString(), 
      change: statsData?.totalProductsChange ?? "+0 new", 
      changeType: (statsData?.totalProductsChangeType ?? "up") as "up" | "down", 
      accent: "var(--blue-600)", 
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>,
      href: "/admin/products"
    },
    { 
      label: "Active Dealers", 
      value: loading ? "..." : (statsData?.activeDealers ?? 0).toLocaleString("en-IN"), 
      change: statsData?.activeDealersChange ?? "+0", 
      changeType: (statsData?.activeDealersChangeType ?? "up") as "up" | "down", 
      accent: "var(--ok)", 
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
      href: "/admin/dealers?status=Active"
    },
    { 
      label: "Pending Inquiries", 
      value: loading ? "..." : (statsData?.pendingInquiries ?? 0).toString(), 
      change: statsData?.pendingInquiriesChange ?? "+0", 
      changeType: (statsData?.pendingInquiriesChangeType ?? "up") as "up" | "down", 
      accent: "var(--signal)", 
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
      href: "/admin/inquiries?status=Pending"
    },
    { 
      label: "Site Visits (30d)", 
      value: loading ? "..." : formatVisits(statsData?.siteVisits ?? 0), 
      change: statsData?.siteVisitsChange ?? "+0.0%", 
      changeType: (statsData?.siteVisitsChangeType ?? "up") as "up" | "down", 
      accent: "var(--water)", 
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
      href: "/admin/analytics"
    },
    { 
      label: "Total Category", 
      value: loading ? "..." : (statsData?.totalCategories ?? 0).toString(), 
      change: statsData?.totalCategoriesChange ?? "+0 new", 
      changeType: (statsData?.totalCategoriesChangeType ?? "up") as "up" | "down", 
      accent: "#8B5CF6", 
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
      href: "/admin/categories"
    },
    { 
      label: "Total Enquiries", 
      value: loading ? "..." : (statsData?.totalEnquiries ?? 0).toString(), 
      change: statsData?.totalEnquiriesChange ?? "+0", 
      changeType: (statsData?.totalEnquiriesChangeType ?? "up") as "up" | "down", 
      accent: "#06b6d4", 
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>,
      href: "/admin/inquiries"
    },
    { 
      label: "Total Dealer Application", 
      value: loading ? "..." : (statsData?.totalDealerApplications ?? 0).toString(), 
      change: statsData?.totalDealerApplicationsChange ?? "+0", 
      changeType: (statsData?.totalDealerApplicationsChangeType ?? "up") as "up" | "down", 
      accent: "#f59e0b", 
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
      href: "/admin/dealers"
    },
    { 
      label: "Total Career Application", 
      value: loading ? "..." : (statsData?.totalCareerApplications ?? 0).toString(), 
      change: statsData?.totalCareerApplicationsChange ?? "+0", 
      changeType: (statsData?.totalCareerApplicationsChangeType ?? "up") as "up" | "down", 
      accent: "#ec4899", 
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
      href: "/admin/careers"
    },
    { 
      label: "Total Contact Application", 
      value: loading ? "..." : (statsData?.totalContactApplications ?? 0).toString(), 
      change: statsData?.totalContactApplicationsChange ?? "+0", 
      changeType: (statsData?.totalContactApplicationsChangeType ?? "up") as "up" | "down", 
      accent: "#3b82f6", 
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
      href: "/admin/contacts"
    },
    { 
      label: "Approved Dealer", 
      value: loading ? "..." : (statsData?.approvedDealers ?? 0).toString(), 
      change: statsData?.approvedDealersChange ?? "+0", 
      changeType: (statsData?.approvedDealersChangeType ?? "up") as "up" | "down", 
      accent: "var(--ok)", 
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8" cy="7" r="4" /><polyline points="17 11 19 13 23 9" /></svg>,
      href: "/admin/dealers?status=Active"
    },
    { 
      label: "Shortlisted Partner", 
      value: loading ? "..." : (statsData?.shortlistedPartners ?? 0).toString(), 
      change: statsData?.shortlistedPartnersChange ?? "+0", 
      changeType: (statsData?.shortlistedPartnersChangeType ?? "up") as "up" | "down", 
      accent: "#6366f1", 
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
      href: "/admin/dealers?status=Pending"
    },
    { 
      label: "Total Closed Enquiry", 
      value: loading ? "..." : (statsData?.totalClosedEnquiries ?? 0).toString(), 
      change: statsData?.totalClosedEnquiriesChange ?? "+0", 
      changeType: (statsData?.totalClosedEnquiriesChangeType ?? "up") as "up" | "down", 
      accent: "#64748b", 
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
      href: "/admin/inquiries?status=Closed"
    },
  ];

  const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const selectedMonthName = selectedMonth !== "all" ? MONTH_NAMES[parseInt(selectedMonth) - 1] : "";

  const recentInquiries = (statsData?.recentInquiries || []).map((i: any) => ({
    name: i.name,
    subject: i.subject,
    date: formatDate(i.createdAt),
    status: i.status
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader title="Dashboard" />

      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 22 }}>

        {/* Filters Row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--paper)", border: "1px solid var(--line-2)", borderRadius: "var(--r-md)", padding: "14px 20px", flexWrap: "wrap", gap: 12, boxShadow: "var(--sh-sm)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Filter Period:</span>
            {loading && (
              <span style={{ fontSize: 12, color: "var(--muted)", display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", border: "2px solid var(--line)", borderTopColor: "var(--blue-600)", animation: "spin 1s linear infinite" }} />
                Updating...
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>Year:</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                style={{ height: 32, padding: "0 10px", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", background: "var(--paper-2)", color: "var(--ink)", fontSize: 12.5, fontWeight: 600, outline: "none", cursor: "pointer", transition: "border-color .15s" }}
              >
                {statsData?.availableYears?.map((y: number) => (
                  <option key={y} value={y}>{y}</option>
                )) || <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>}
              </select>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>Month:</span>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                style={{ height: 32, padding: "0 10px", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", background: "var(--paper-2)", color: "var(--ink)", fontSize: 12.5, fontWeight: 600, outline: "none", cursor: "pointer", transition: "border-color .15s" }}
              >
                <option value="all">All Months</option>
                {[
                  { val: "1", label: "January" },
                  { val: "2", label: "February" },
                  { val: "3", label: "March" },
                  { val: "4", label: "April" },
                  { val: "5", label: "May" },
                  { val: "6", label: "June" },
                  { val: "7", label: "July" },
                  { val: "8", label: "August" },
                  { val: "9", label: "September" },
                  { val: "10", label: "October" },
                  { val: "11", label: "November" },
                  { val: "12", label: "December" },
                ].map((m) => (
                  <option key={m.val} value={m.val}>{m.label}</option>
                ))}
              </select>
            </div>
          </div>
          <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }` }} />
        </div>

        {/* Welcome banner */}
        <div style={{ background: "linear-gradient(135deg, var(--blue-900) 0%, var(--blue-700) 100%)", borderRadius: "var(--r-md)", padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -40, top: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,.05)" }} />
          <div style={{ position: "relative" }}>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 22, fontFamily: "var(--font-display)" }}>Welcome back, Admin</div>
            <div style={{ color: "rgba(255,255,255,.7)", fontSize: 13.5, marginTop: 4 }}>Here&apos;s what&apos;s happening across Supremo today.</div>
          </div>
        </div>

        {/* KPI cards */}
        <div className="adm-cols-4" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
          {stats.map((s) => <StatsCard key={s.label} {...s} size="small" />)}
        </div>

        {/* Charts row: visits area + category donut */}
        <div className="adm-split" style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: 18 }}>
          <ChartCard
            title="Website Traffic"
            subtitle={selectedMonth === "all" ? `Monthly visits for ${selectedYear}` : `Daily visits for ${selectedMonthName} ${selectedYear}`}
          >
            <AreaChart data={statsData?.visitsData || []} labels={statsData?.visitsLabels || []} height={250} />
          </ChartCard>

          <ChartCard title="Inquiries by Category" subtitle="Share of total this month">
            <div style={{ paddingTop: 8 }}>
              <DonutChart data={statsData?.categorySplit || []} />
            </div>
          </ChartCard>
        </div>

        {/* Charts row 2: weekly inquiries bar + top products */}
        <div className="adm-split" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18 }}>
          <ChartCard title="Inquiries This Week" subtitle="Daily contact-form submissions">
            <BarChart data={statsData?.weeklyData || [0, 0, 0, 0, 0, 0, 0]} labels={INQUIRY_LABELS} height={230} color="#00B4F0" />
          </ChartCard>

          <ChartCard title="Top Products" subtitle="Most-inquired this month">
            <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
              {(statsData?.topProducts || []).map((p) => (
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
              {recentInquiries.map((inq, i) => {
                const sc = getStatusStyle(inq.status);
                return (
                  <div key={i} style={{ padding: "13px 22px", display: "flex", alignItems: "center", gap: 14, borderBottom: i < recentInquiries.length - 1 ? "1px solid var(--line-2)" : "none" }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--blue-100)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--blue-700)", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                      {inq.name.charAt(0).toUpperCase()}
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
              {recentInquiries.length === 0 && !loading && (
                <div style={{ padding: "48px 20px", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>No recent inquiries.</div>
              )}
            </div>
          </div>

          {/* Activity feed */}
          <div style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", overflow: "hidden" }}>
            <div style={{ padding: "18px 22px 14px", borderBottom: "1px solid var(--line-2)", fontWeight: 700, fontSize: 15, fontFamily: "var(--font-display)", color: "var(--ink)" }}>Activity Feed</div>
            <div style={{ padding: "8px 22px 16px" }}>
              {(statsData?.activityFeed || []).map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "11px 0", position: "relative" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: a.color + "18", display: "flex", alignItems: "center", justifyContent: "center", color: a.color, flexShrink: 0 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{activityIcons[a.icon]}</svg>
                    </div>
                    {i < (statsData?.activityFeed || []).length - 1 && <div style={{ width: 1, flex: 1, background: "var(--line-2)", marginTop: 4 }} />}
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
