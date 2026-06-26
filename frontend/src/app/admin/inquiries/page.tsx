"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "../_components/AdminHeader";
import { adminAuth } from "../_services/adminAuth";

interface Inquiry {
  _id: string;
  type: "generic" | "dealer" | "product";
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message?: string;
  businessName?: string;
  cityState?: string;
  existingBusinessType?: string;
  investmentCapacity?: string;
  status: "New" | "Replied" | "Pending" | "Closed" | "Active" | "Inactive" | "Rejected";
  createdAt: string;
}

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  New:      { bg: "var(--blue-50)",    color: "var(--blue-700)" },
  Replied:  { bg: "#f0fdf4",           color: "#15803d" },
  Pending:  { bg: "#fffbeb",           color: "#b45309" },
  Closed:   { bg: "var(--paper-2)",    color: "var(--muted)" },
  Active:   { bg: "#f0fdf4",           color: "#15803d" },
  Inactive: { bg: "var(--paper-2)",    color: "var(--muted)" },
  Rejected: { bg: "#fef2f2",           color: "#991b1b" }
};

const getStatusStyle = (status: string) => {
  return STATUS_STYLE[status] || { bg: "var(--paper-2)", color: "var(--muted)" };
};

const FILTERS = ["All", "New", "Pending", "Closed"];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const timeStr = d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
  
  return `${day}/${month}/${year}, ${timeStr.toLowerCase()}`;
}

export default function InquiriesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<string | null>(null);
  
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);

  const fetchInquiries = async () => {
    const user = adminAuth.getUser();
    if (!user) {
      setError("Not authenticated. Please log in.");
      setLoading(false);
      return;
    }
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
      const res = await fetch(`${apiBase}/inquiries?t=${Date.now()}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Cache-Control": "no-cache",
          "Pragma": "no-cache"
        },
      });
      if (!res.ok) throw new Error("Failed to load inquiries from server.");
      const data = await res.json();
      setInquiries(data.filter((inq: any) => inq.type !== "dealer"));
    } catch (err: any) {
      setError(err.message || "Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
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
      if (!res.ok) throw new Error("Failed to update inquiry status.");
      const updated = await res.json();
      setInquiries((prev) => prev.map((item) => (item._id === id ? updated : item)));
      
      // Dispatch custom event to notify sidebar
      window.dispatchEvent(new Event("inquiry-updated"));
    } catch (err: any) {
      alert("Error updating status: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleOpenEmailModal = (inquiry: Inquiry) => {
    setEmailSubject(inquiry.subject ? `Re: ${inquiry.subject}` : `Re: Inquiry from ${inquiry.name}`);
    setEmailBody(`Dear ${inquiry.name},\n\nThank you for contacting us.\n\nBest Regards,\nSupremo Team`);
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
        setInquiries((prev) => prev.map((item) => (item._id === id ? data.inquiry : item)));
      } else {
        setInquiries((prev) => prev.map((item) => (item._id === id ? { ...item, status: "Replied" } : item)));
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

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this inquiry?")) {
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
      if (!res.ok) throw new Error("Failed to delete inquiry.");
      setInquiries((prev) => prev.filter((item) => item._id !== id));
      setSelected(null);
      
      // Dispatch custom event to notify sidebar
      window.dispatchEvent(new Event("inquiry-updated"));
    } catch (err: any) {
      alert("Error deleting inquiry: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const filtered = inquiries.filter((inq) => {
    const matchFilter = filter === "All" || inq.status === filter;
    const q = search.toLowerCase();
    const matchSearch =
      inq.name.toLowerCase().includes(q) ||
      inq.email.toLowerCase().includes(q) ||
      (inq.subject && inq.subject.toLowerCase().includes(q)) ||
      (inq.phone && inq.phone.includes(q));
    return matchFilter && matchSearch;
  });

  const counts: Record<string, number> = {
    All: inquiries.length,
    New: inquiries.filter((i) => i.status === "New").length,
    Pending: inquiries.filter((i) => i.status === "Pending").length,
    Replied: inquiries.filter((i) => i.status === "Replied").length,
    Closed: inquiries.filter((i) => i.status === "Closed").length,
  };

  const detailInquiry = inquiries.find((i) => i._id === selected);

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <AdminHeader title="Inquiries" breadcrumb={[{ label: "Inquiries" }]} />
        <main style={{ flex: 1, padding: "28px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", border: "3px solid var(--line)", borderTopColor: "var(--blue-600)", animation: "spin 1s linear infinite" }} />
            <div style={{ fontSize: 13, color: "var(--muted)" }}>Loading inquiries...</div>
          </div>
          <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }` }} />
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader title="Inquiries" breadcrumb={[{ label: "Inquiries" }]} />

      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 20 }}>
        {error && (
          <div style={{ background: "rgba(239, 68, 68, 0.08)", border: "1px solid #EF4444", color: "#b91c1c", padding: "12px 18px", borderRadius: "var(--r-sm)", fontSize: 14 }}>
            {error}
          </div>
        )}

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
            <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr 1.5fr 1fr 90px", padding: "12px 20px", background: "var(--paper-2)", borderBottom: "1px solid var(--line-2)", gap: 12 }}>
              {["From", "Phone", "Subject", "Date", "Status"].map((h) => (
                <div key={h} style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", fontFamily: "var(--font-display)" }}>
                  {h}
                </div>
              ))}
            </div>

            {filtered.map((inq, i) => {
              const ss = getStatusStyle(inq.status);
              const isSelected = selected === inq._id;
              return (
                <div
                  key={inq._id}
                  onClick={() => setSelected(isSelected ? null : inq._id)}
                  style={{
                    display: "grid", gridTemplateColumns: "1.8fr 1.2fr 1.5fr 1fr 90px",
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
                      {inq.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: inq.status === "New" ? 700 : 500, color: "var(--ink)" }}>{inq.name}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)" }}>{inq.email}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 12.5, color: "var(--ink)", fontWeight: inq.status === "New" ? 600 : 400 }}>
                    {inq.phone || "—"}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--ink)", fontWeight: inq.status === "New" ? 600 : 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {inq.subject || `Inquiry from ${inq.name}`}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--soft)" }}>{formatDate(inq.createdAt)}</div>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: "var(--r-pill)", background: ss.bg, color: ss.color, display: "inline-block" }}>{inq.status}</span>
                  </div>
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
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, fontFamily: "var(--font-display)", color: "var(--ink)" }}>Inquiry Details</div>
                  <span style={{ fontSize: 10, textTransform: "uppercase", color: "var(--blue-600)", fontWeight: 700 }}>
                    Type: {detailInquiry.type}
                  </span>
                </div>
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
                    {detailInquiry.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "var(--ink)" }}>{detailInquiry.name}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{detailInquiry.email}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{detailInquiry.phone}</div>
                  </div>
                </div>

                <div style={{ height: 1, background: "var(--line-2)" }} />

                {/* B2B / Dealership Info */}
                {detailInquiry.type === "dealer" && (
                  <>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>Business Name</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{detailInquiry.businessName || "N/A"}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>City/State</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{detailInquiry.cityState || "N/A"}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>Business Type</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{detailInquiry.existingBusinessType || "N/A"}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>Investment</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{detailInquiry.investmentCapacity || "N/A"}</div>
                      </div>
                    </div>
                    <div style={{ height: 1, background: "var(--line-2)" }} />
                  </>
                )}

                {detailInquiry.type !== "dealer" && detailInquiry.cityState && (
                  <>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>City</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{detailInquiry.cityState}</div>
                    </div>
                    <div style={{ height: 1, background: "var(--line-2)" }} />
                  </>
                )}

                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>Subject</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{detailInquiry.subject || "No Subject"}</div>
                </div>

                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>Message</div>
                  <div style={{ fontSize: 13, color: "var(--ink)", lineHeight: 1.7, background: "var(--paper-2)", borderRadius: "var(--r-sm)", padding: "12px 14px", whiteSpace: "pre-wrap" }}>
                    {detailInquiry.message || "No Message content"}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ fontSize: 12, color: "var(--soft)" }}>{formatDate(detailInquiry.createdAt)}</div>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: "var(--r-pill)", background: getStatusStyle(detailInquiry.status).bg, color: getStatusStyle(detailInquiry.status).color }}>
                    {detailInquiry.status}
                  </span>
                </div>

                <div style={{ height: 1, background: "var(--line-2)" }} />

                {/* Actions */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>Actions</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {(() => {
                      const isPending = detailInquiry.status === "Pending";
                      const isClosed = detailInquiry.status === "Closed";
                      return (
                        <>
                          <button
                            disabled={updating}
                            onClick={() => !isPending && handleUpdateStatus(detailInquiry._id, "Pending")}
                            style={{
                              height: 38,
                              padding: "0 16px",
                              background: isPending ? "var(--blue-600)" : "var(--paper)",
                              border: isPending ? "1px solid var(--blue-600)" : "1px solid var(--line)",
                              color: isPending ? "#fff" : "var(--ink)",
                              borderRadius: "var(--r-sm)",
                              fontSize: 13,
                              fontWeight: 600,
                              fontFamily: "var(--font-display)",
                              cursor: isPending ? "default" : "pointer",
                              transition: "all 0.15s ease",
                            }}
                            onMouseEnter={(e) => {
                              if (!isPending && !updating) {
                                e.currentTarget.style.background = "var(--blue-50)";
                                e.currentTarget.style.borderColor = "var(--blue-200)";
                                e.currentTarget.style.color = "var(--blue-700)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isPending) {
                                e.currentTarget.style.background = "var(--paper)";
                                e.currentTarget.style.borderColor = "var(--line)";
                                e.currentTarget.style.color = "var(--ink)";
                              }
                            }}
                          >
                            {updating && isPending ? "Processing..." : "Pending"}
                          </button>
                          <button
                            disabled={updating}
                            onClick={() => !isClosed && handleUpdateStatus(detailInquiry._id, "Closed")}
                            style={{
                              height: 38,
                              padding: "0 16px",
                              background: isClosed ? "var(--blue-600)" : "var(--paper)",
                              border: isClosed ? "1px solid var(--blue-600)" : "1px solid var(--line)",
                              color: isClosed ? "#fff" : "var(--ink)",
                              borderRadius: "var(--r-sm)",
                              fontSize: 13,
                              fontWeight: 600,
                              fontFamily: "var(--font-display)",
                              cursor: isClosed ? "default" : "pointer",
                              transition: "all 0.15s ease",
                            }}
                            onMouseEnter={(e) => {
                              if (!isClosed && !updating) {
                                e.currentTarget.style.background = "var(--blue-50)";
                                e.currentTarget.style.borderColor = "var(--blue-200)";
                                e.currentTarget.style.color = "var(--blue-700)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isClosed) {
                                e.currentTarget.style.background = "var(--paper)";
                                e.currentTarget.style.borderColor = "var(--line)";
                                e.currentTarget.style.color = "var(--ink)";
                              }
                            }}
                          >
                            {updating && isClosed ? "Processing..." : "Close"}
                          </button>
                          <button
                            disabled={updating}
                            onClick={() => handleOpenEmailModal(detailInquiry)}
                            style={{
                              height: 38,
                              padding: "0 16px",
                              background: "var(--paper)",
                              border: "1px solid var(--line)",
                              color: "var(--ink)",
                              borderRadius: "var(--r-sm)",
                              fontSize: 13,
                              fontWeight: 600,
                              fontFamily: "var(--font-display)",
                              cursor: "pointer",
                              transition: "all 0.15s ease",
                            }}
                            onMouseEnter={(e) => {
                              if (!updating) {
                                e.currentTarget.style.background = "var(--blue-50)";
                                e.currentTarget.style.borderColor = "var(--blue-200)";
                                e.currentTarget.style.color = "var(--blue-700)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "var(--paper)";
                              e.currentTarget.style.borderColor = "var(--line)";
                              e.currentTarget.style.color = "var(--ink)";
                            }}
                          >
                            Send Mail
                          </button>
                        </>
                      );
                    })()}
                  </div>
                  <button
                    disabled={updating}
                    onClick={() => handleDeleteInquiry(detailInquiry._id)}
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
                    Delete Inquiry
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>

        <div style={{ fontSize: 12, color: "var(--muted)" }}>
          Showing {filtered.length} of {inquiries.length} inquiries
        </div>
      </main>

      {isEmailModalOpen && detailInquiry && (
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
                  To: <span style={{ fontWeight: 600, color: "var(--ink)" }}>{detailInquiry.name}</span> &lt;{detailInquiry.email}&gt;
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
                onClick={() => handleSendEmail(detailInquiry._id)}
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
