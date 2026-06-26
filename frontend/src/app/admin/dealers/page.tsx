"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "../_components/AdminHeader";
import { adminAuth } from "../_services/adminAuth";
import { LazyImage } from "@/components/LazyImage";

interface DealerApplication {
  _id: string;
  name: string;
  businessName?: string;
  city?: string;
  state?: string;
  cityState?: string;
  phone: string;
  email?: string;
  products?: string;
  visitingCard?: string;
  message?: string;
  status: "New" | "Pending" | "Active" | "Inactive" | "Rejected" | "Replied";
  createdAt: string;
}

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  New:      { bg: "var(--blue-50)",    color: "var(--blue-700)" },
  Pending:  { bg: "#fffbeb",           color: "#b45309" },
  Active:   { bg: "#f0fdf4",           color: "#15803d" },
  Inactive: { bg: "var(--paper-2)",    color: "var(--muted)" },
  Rejected: { bg: "#fef2f2",           color: "#dc2626" },
  Replied:  { bg: "#f0fdf4",           color: "#15803d" },
};

const getStatusStyle = (status: string) => {
  return STATUS_STYLE[status] || { bg: "var(--paper-2)", color: "var(--muted)" };
};

const FILTER_OPTIONS = ["All", "New", "Active", "Rejected"];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function DealersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dealers, setDealers] = useState<DealerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);

  const fetchDealers = async () => {
    const user = adminAuth.getUser();
    if (!user) {
      setError("Not authenticated. Please log in.");
      setLoading(false);
      return;
    }
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
      const res = await fetch(`${apiBase}/inquiries?type=dealer&t=${Date.now()}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Cache-Control": "no-cache",
          "Pragma": "no-cache"
        },
      });
      if (!res.ok) throw new Error("Failed to load dealer applications from server.");
      const data = await res.json();
      setDealers(data);
    } catch (err: any) {
      setError(err.message || "Failed to load dealers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDealers();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    const user = adminAuth.getUser();
    if (!user) return;
    setUpdating(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
      const res = await fetch(`${apiBase}/inquiries/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status.");
      const updated = await res.json();
      setDealers((prev) => prev.map((item) => (item._id === id ? updated : item)));
      
      // Dispatch custom event to notify sidebar
      window.dispatchEvent(new Event("inquiry-updated"));
    } catch (err: any) {
      alert("Error updating status: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteApplication = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this dealer application?")) {
      return;
    }
    const user = adminAuth.getUser();
    if (!user) return;
    setUpdating(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
      const res = await fetch(`${apiBase}/inquiries/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete application.");
      setDealers((prev) => prev.filter((item) => item._id !== id));
      setSelectedId(null);
      
      // Dispatch custom event to notify sidebar
      window.dispatchEvent(new Event("inquiry-updated"));
    } catch (err: any) {
      alert("Error deleting application: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleOpenEmailModal = (dealer: DealerApplication) => {
    setEmailSubject(`Re: Dealership Application from ${dealer.name}`);
    setEmailBody(`Dear ${dealer.name},\n\nThank you for your interest in a dealership with Supremo. We have received your application.\n\nBest Regards,\nSupremo Team`);
    setIsEmailModalOpen(true);
  };

  const handleSendEmail = async (id: string) => {
    if (!emailSubject.trim() || !emailBody.trim()) {
      alert("Please fill in both Subject and Message fields.");
      return;
    }
    const user = adminAuth.getUser();
    if (!user) return;
    setSendingEmail(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
      const res = await fetch(`${apiBase}/inquiries/${id}/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          subject: emailSubject,
          message: emailBody,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to send email.");
      }
      
      if (data.inquiry) {
        setDealers((prev) => prev.map((item) => (item._id === id ? data.inquiry : item)));
      } else {
        setDealers((prev) => prev.map((item) => (item._id === id ? { ...item, status: "Replied" } : item)));
      }
      
      window.dispatchEvent(new Event("inquiry-updated"));
      
      alert("Email sent successfully!");
      setIsEmailModalOpen(false);
    } catch (err: any) {
      alert("Error sending email: " + err.message);
    } finally {
      setSendingEmail(false);
    }
  };

  const filtered = dealers.filter((d) => {
    const matchFilter = filter === "All" || d.status === filter;
    const q = search.toLowerCase();
    const matchSearch =
      d.name.toLowerCase().includes(q) ||
      (d.businessName && d.businessName.toLowerCase().includes(q)) ||
      (d.city && d.city.toLowerCase().includes(q)) ||
      (d.state && d.state.toLowerCase().includes(q));
    return matchFilter && matchSearch;
  });

  const counts = {
    All: dealers.length,
    New: dealers.filter((d) => d.status === "New").length,
    Pending: dealers.filter((d) => d.status === "Pending").length,
    Active: dealers.filter((d) => d.status === "Active").length,
    Inactive: dealers.filter((d) => d.status === "Inactive").length,
    Rejected: dealers.filter((d) => d.status === "Rejected").length,
  };

  const detailDealer = dealers.find((d) => d._id === selectedId);

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <AdminHeader title="Dealers" breadcrumb={[{ label: "Dealers" }]} />
        <main style={{ flex: 1, padding: "28px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", border: "3px solid var(--line)", borderTopColor: "var(--blue-600)", animation: "spin 1s linear infinite" }} />
            <div style={{ fontSize: 13, color: "var(--muted)" }}>Loading dealer applications...</div>
          </div>
          <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }` }} />
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader title="Dealers" breadcrumb={[{ label: "Dealers" }]} />

      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 20 }}>
        {error && (
          <div style={{ background: "rgba(239, 68, 68, 0.08)", border: "1px solid #EF4444", color: "#b91c1c", padding: "12px 18px", borderRadius: "var(--r-sm)", fontSize: 14 }}>
            {error}
          </div>
        )}

        {/* Stats mini row */}
        <div className="adm-cols-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {[
            { label: "Total Applications", value: counts.All, color: "var(--blue-600)" },
            { label: "New", value: counts.New, color: "var(--signal)" },
            { label: "Approved Partners", value: counts.Active, color: "var(--ok)" },
            { label: "Rejected Partners", value: counts.Rejected, color: "#dc2626" },
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
              placeholder="Search dealers by name, business or city…"
              style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, color: "var(--ink)", fontFamily: "var(--font-body)", width: "100%" }}
            />
          </div>
          <div style={{ display: "flex", gap: 4, background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", padding: "4px", overflowX: "auto", maxWidth: "100%" }}>
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
                {f === "Active" ? "Approved Partners" : f === "Rejected" ? "Rejected Partners" : f} {f !== "All" && <span style={{ opacity: 0.7, fontSize: 10 }}>({counts[f as keyof typeof counts]})</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Split View */}
        <div style={{ display: "grid", gridTemplateColumns: detailDealer ? "1fr 420px" : "1fr", gap: 20, alignItems: "start" }}>
          
          {/* Table list */}
          <div className="adm-table-scroll" style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1.6fr 1.2fr 1fr 90px 90px", padding: "12px 20px", background: "var(--paper-2)", borderBottom: "1px solid var(--line-2)", gap: 12 }}>
              {["Dealer", "Business", "Location", "Contact", "Date", "Status"].map((h) => (
                <div key={h} style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", fontFamily: "var(--font-display)" }}>
                  {h}
                </div>
              ))}
            </div>

            {filtered.map((d, i) => {
              const ss = getStatusStyle(d.status);
              const isSelected = selectedId === d._id;
              return (
                <div
                  key={d._id}
                  onClick={() => setSelectedId(isSelected ? null : d._id)}
                  style={{
                    display: "grid", gridTemplateColumns: "1.6fr 1.6fr 1.2fr 1fr 90px 90px",
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
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--blue-100)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--blue-700)", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                      {d.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{d.name}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)" }}>{d.email || "—"}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500 }}>{d.businessName || "—"}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)" }}>
                    {d.city || d.state ? `${d.city || ""}, ${d.state || ""}` : d.cityState || "—"}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>{d.phone}</div>
                  <div style={{ fontSize: 11, color: "var(--soft)" }}>{formatDate(d.createdAt)}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: "var(--r-pill)", background: ss.bg, color: ss.color }}>{d.status}</span>
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div style={{ padding: "48px 20px", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
                No dealer applications found.
              </div>
            )}
          </div>

          {/* Details Panel */}
          {detailDealer && (
            <div style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", overflow: "hidden", position: "sticky", top: 88 }}>
              <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid var(--line-2)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, fontFamily: "var(--font-display)", color: "var(--ink)" }}>Application Details</div>
                  <span style={{ fontSize: 10, textTransform: "uppercase", color: "var(--blue-600)", fontWeight: 700 }}>
                    Submitted On: {new Date(detailDealer.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedId(null)}
                  style={{ width: 28, height: 28, borderRadius: "var(--r-sm)", border: "1px solid var(--line)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>

              <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 4 }}>Applicant Name</span>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{detailDealer.name}</div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 4 }}>Business / Shop</span>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{detailDealer.businessName || "—"}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 4 }}>Contact Phone</span>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{detailDealer.phone}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 4 }}>Email Address</span>
                    <div style={{ fontSize: 13, color: "var(--ink)" }}>{detailDealer.email || "—"}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 4 }}>City / State</span>
                    <div style={{ fontSize: 13, color: "var(--ink)" }}>
                      {detailDealer.city || detailDealer.state ? `${detailDealer.city || ""}, ${detailDealer.state || ""}` : detailDealer.cityState || "—"}
                    </div>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 4 }}>Product Interest</span>
                  <div style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500 }}>{detailDealer.products || "—"}</div>
                </div>

                {detailDealer.message && (
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 4 }}>Message</span>
                    <div style={{ fontSize: 13, color: "var(--ink)", background: "var(--paper-2)", padding: "10px 12px", borderRadius: "var(--r-sm)", border: "1px solid var(--line-2)", whiteSpace: "pre-wrap", maxHeight: 120, overflowY: "auto" }}>
                      {detailDealer.message}
                    </div>
                  </div>
                )}

                {detailDealer.visitingCard && (
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 6 }}>Visiting Card</span>
                    <a href={detailDealer.visitingCard} target="_blank" rel="noreferrer" style={{ display: "block", position: "relative", width: "100%", height: 160, borderRadius: "var(--r-sm)", border: "1px solid var(--line)", overflow: "hidden", cursor: "zoom-in" }}>
                      <LazyImage src={detailDealer.visitingCard} alt="Visiting card scan" style={{ width: "100%", height: "100%", objectFit: "contain", background: "var(--paper-2)" }} />
                    </a>
                  </div>
                )}

                <div style={{ height: 1, background: "var(--line-2)", margin: "4px 0" }} />

                {/* Application Actions */}
                <div>
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 8 }}>Action Status ({detailDealer.status})</span>
                  
                  <button
                    disabled={updating}
                    onClick={() => handleOpenEmailModal(detailDealer)}
                    style={{
                      width: "100%", height: 36, fontSize: 12, fontWeight: 600, borderRadius: "var(--r-sm)", border: "1px solid var(--line)", cursor: "pointer",
                      background: "var(--paper)", color: "var(--ink)", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "all .15s"
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "var(--blue-50)"; e.currentTarget.style.borderColor = "var(--blue-200)"; e.currentTarget.style.color = "var(--blue-700)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "var(--paper)"; e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.color = "var(--ink)"; }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                    Send Mail
                  </button>

                  {detailDealer.status === "Active" ? (
                    <div style={{
                      display: "flex", alignItems: "center", gap: 8, padding: "12px 16px",
                      background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "var(--r-sm)",
                      color: "#15803d", fontSize: 13, fontWeight: 600
                    }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Approved Partner
                    </div>
                  ) : detailDealer.status === "Rejected" ? (
                    <div style={{
                      display: "flex", alignItems: "center", gap: 8, padding: "12px 16px",
                      background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "var(--r-sm)",
                      color: "#dc2626", fontSize: 13, fontWeight: 600
                    }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                      </svg>
                      Rejected Application
                    </div>
                  ) : (
                    <>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <button
                          disabled={updating}
                          onClick={() => handleUpdateStatus(detailDealer._id, "Active")}
                          style={{
                            flex: 1, height: 36, fontSize: 12, fontWeight: 600, borderRadius: "var(--r-sm)", border: "none", cursor: "pointer",
                            background: "var(--ok)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                            transition: "background .15s"
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "#16a34a"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "var(--ok)"; }}
                        >
                          Approve Partner
                        </button>
                                  <button
                          disabled={updating}
                          onClick={() => handleUpdateStatus(detailDealer._id, "Rejected")}
                          style={{
                            flex: 1, height: 36, fontSize: 12, fontWeight: 600, borderRadius: "var(--r-sm)", border: "1px solid #fee2e2", cursor: "pointer",
                            background: "#fef2f2", color: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center",
                            opacity: 1, transition: "all .15s"
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "#fee2e2"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "#fef2f2"; }}
                        >
                          Reject Application
                        </button>
                      </div>
                      
                      {detailDealer.status !== "Pending" && detailDealer.status !== "New" && (
                        <button
                          disabled={updating}
                          onClick={() => handleUpdateStatus(detailDealer._id, "Pending")}
                          style={{
                            width: "100%", height: 32, fontSize: 11, fontWeight: 600, borderRadius: "var(--r-sm)", border: "1px solid var(--line)", cursor: "pointer",
                            background: "transparent", color: "var(--muted)", marginTop: 8, transition: "all .15s"
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--paper-2)"; e.currentTarget.style.color = "var(--ink)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--muted)"; }}
                        >
                          Reset to Pending
                        </button>
                      )}

                      <button
                        disabled={updating}
                        onClick={() => handleDeleteApplication(detailDealer._id)}
                        style={{
                          width: "100%", height: 32, fontSize: 11, fontWeight: 600, borderRadius: "var(--r-sm)", border: "1px solid #fee2e2", cursor: "pointer",
                          background: "transparent", color: "#dc2626", marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "all .15s"
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#fff5f5"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                        Delete Application
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

        <div style={{ fontSize: 12, color: "var(--muted)" }}>
          Showing {filtered.length} of {dealers.length} applications
        </div>
      </main>

      {isEmailModalOpen && detailDealer && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: 20
        }}>
          <div style={{
            background: "var(--paper)",
            borderRadius: "var(--r-md)",
            border: "1px solid var(--line-2)",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            width: "100%",
            maxWidth: 550,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            animation: "modalFadeIn 0.2s ease-out"
          }}>
            <div style={{
              padding: "18px 24px",
              borderBottom: "1px solid var(--line-2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "var(--paper-2)"
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <div style={{ fontWeight: 700, fontSize: 16, fontFamily: "var(--font-display)", color: "var(--ink)" }}>Compose Email</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>
                  To: <span style={{ fontWeight: 600, color: "var(--ink)" }}>{detailDealer.name}</span> &lt;{detailDealer.email || "No email"}&gt;
                </div>
              </div>
              <button
                onClick={() => setIsEmailModalOpen(false)}
                style={{ width: 28, height: 28, borderRadius: "var(--r-sm)", border: "1px solid var(--line)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em" }}>Subject</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Enter email subject..."
                  style={{
                    height: 40,
                    padding: "0 12px",
                    borderRadius: "var(--r-sm)",
                    border: "1px solid var(--line)",
                    background: "var(--paper)",
                    fontSize: 13,
                    fontFamily: "var(--font-body)",
                    color: "var(--ink)",
                    outline: "none"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "var(--blue-600)"}
                  onBlur={(e) => e.target.style.borderColor = "var(--line)"}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em" }}>Message</label>
                <textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Write your email message here..."
                  rows={8}
                  style={{
                    padding: "12px",
                    borderRadius: "var(--r-sm)",
                    border: "1px solid var(--line)",
                    background: "var(--paper)",
                    fontSize: 13,
                    fontFamily: "var(--font-body)",
                    color: "var(--ink)",
                    outline: "none",
                    resize: "vertical",
                    lineHeight: 1.6
                  }}
                  onFocus={(e) => e.target.style.borderColor = "var(--blue-600)"}
                  onBlur={(e) => e.target.style.borderColor = "var(--line)"}
                />
              </div>
            </div>

            <div style={{
              padding: "16px 24px",
              borderTop: "1px solid var(--line-2)",
              background: "var(--paper-2)",
              display: "flex",
              justifyContent: "flex-end",
              gap: 12
            }}>
              <button
                onClick={() => setIsEmailModalOpen(false)}
                style={{
                  height: 38,
                  padding: "0 16px",
                  borderRadius: "var(--r-sm)",
                  border: "1px solid var(--line)",
                  background: "var(--paper)",
                  color: "var(--muted)",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.15s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "var(--paper-2)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "var(--paper)"}
              >
                Cancel
              </button>
              <button
                disabled={sendingEmail}
                onClick={() => handleSendEmail(detailDealer._id)}
                style={{
                  height: 38,
                  padding: "0 20px",
                  borderRadius: "var(--r-sm)",
                  border: "none",
                  background: "var(--blue-600)",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  opacity: sendingEmail ? 0.7 : 1,
                  transition: "background 0.15s"
                }}
                onMouseEnter={(e) => { if (!sendingEmail) e.currentTarget.style.background = "var(--blue-700)"; }}
                onMouseLeave={(e) => { if (!sendingEmail) e.currentTarget.style.background = "var(--blue-600)"; }}
              >
                {sendingEmail ? (
                  <>
                    <div style={{ width: 14, height: 14, borderRadius: "50%", border: "2px solid #fff", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
                    Sending...
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                    Send Email
                  </>
                )}
              </button>
            </div>
          </div>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes modalFadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}} />
        </div>
      )}
    </div>
  );
}
