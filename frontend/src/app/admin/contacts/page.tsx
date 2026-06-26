"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "../_components/AdminHeader";
import { adminAuth } from "../_services/adminAuth";

interface ContactApplication {
  _id: string;
  name: string;
  company?: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  status: "New" | "Pending" | "Closed" | "Replied";
  createdAt: string;
}

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  New:      { bg: "var(--blue-50)",    color: "var(--blue-700)" },
  Pending:  { bg: "#fffbeb",           color: "#b45309" },
  Closed:   { bg: "var(--paper-2)",    color: "var(--muted)" },
  Replied:  { bg: "#f0fdf4",           color: "#15803d" },
};

const getStatusStyle = (status: string) => {
  return STATUS_STYLE[status] || { bg: "var(--paper-2)", color: "var(--muted)" };
};

const FILTER_OPTIONS = ["All", "New", "Pending", "Closed"];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function ContactApplicationsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [applications, setApplications] = useState<ContactApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);

  const fetchApplications = async () => {
    const user = adminAuth.getUser();
    if (!user) {
      setError("Not authenticated. Please log in.");
      setLoading(false);
      return;
    }
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
      const res = await fetch(`${apiBase}/contact-applications?t=${Date.now()}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Cache-Control": "no-cache",
          "Pragma": "no-cache"
        },
      });
      if (!res.ok) throw new Error("Failed to load contact submissions from server.");
      const data = await res.json();
      setApplications(data);
    } catch (err: any) {
      setError(err.message || "Failed to load contact submissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    const user = adminAuth.getUser();
    if (!user) return;
    setUpdating(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
      const res = await fetch(`${apiBase}/contact-applications/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status.");
      const updated = await res.json();
      setApplications((prev) => prev.map((item) => (item._id === id ? updated : item)));
      
      // Dispatch custom event to notify sidebar
      window.dispatchEvent(new Event("contact-updated"));
    } catch (err: any) {
      alert("Error updating status: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteApplication = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this contact message?")) {
      return;
    }
    const user = adminAuth.getUser();
    if (!user) return;
    setUpdating(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
      const res = await fetch(`${apiBase}/contact-applications/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete message.");
      setApplications((prev) => prev.filter((item) => item._id !== id));
      setSelectedId(null);
      
      // Dispatch custom event to notify sidebar
      window.dispatchEvent(new Event("contact-updated"));
    } catch (err: any) {
      alert("Error deleting message: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleOpenEmailModal = (app: ContactApplication) => {
    setEmailSubject(app.subject ? `Re: ${app.subject}` : `Re: Inquiry from ${app.name}`);
    setEmailBody(`Dear ${app.name},\n\nThank you for reaching out to us.\n\nBest Regards,\nSupremo Team`);
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
      const res = await fetch(`${apiBase}/contact-applications/${id}/send-email`, {
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
      
      if (data.application) {
        setApplications((prev) => prev.map((item) => (item._id === id ? data.application : item)));
      } else {
        setApplications((prev) => prev.map((item) => (item._id === id ? { ...item, status: "Replied" } : item)));
      }
      
      window.dispatchEvent(new Event("contact-updated"));
      
      alert("Email sent successfully!");
      setIsEmailModalOpen(false);
    } catch (err: any) {
      alert("Error sending email: " + err.message);
    } finally {
      setSendingEmail(false);
    }
  };

  const filtered = applications.filter((app) => {
    const matchFilter = filter === "All" || app.status === filter;
    const q = search.toLowerCase();
    const matchSearch =
      app.name.toLowerCase().includes(q) ||
      (app.email && app.email.toLowerCase().includes(q)) ||
      app.phone.includes(q) ||
      (app.company && app.company.toLowerCase().includes(q)) ||
      app.subject.toLowerCase().includes(q) ||
      app.message.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const counts = {
    All: applications.length,
    New: applications.filter((app) => app.status === "New").length,
    Pending: applications.filter((app) => app.status === "Pending").length,
    Closed: applications.filter((app) => app.status === "Closed").length,
  };

  const detailContact = applications.find((app) => app._id === selectedId);

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <AdminHeader title="Contact Applications" breadcrumb={[{ label: "Contact Applications" }]} />
        <main style={{ flex: 1, padding: "28px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", border: "3px solid var(--line)", borderTopColor: "var(--blue-600)", animation: "spin 1s linear infinite" }} />
            <div style={{ fontSize: 13, color: "var(--muted)" }}>Loading messages...</div>
          </div>
          <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }` }} />
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader title="Contact Applications" breadcrumb={[{ label: "Contact Applications" }]} />

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
            { label: "Pending", value: counts.Pending, color: "#b45309" },
            { label: "Closed", value: counts.Closed, color: "var(--muted)" },
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
              placeholder="Search by name, company, subject or message…"
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
                {f} {f !== "All" && <span style={{ opacity: 0.7, fontSize: 10 }}>({counts[f as keyof typeof counts]})</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Split View */}
        <div style={{ display: "grid", gridTemplateColumns: detailContact ? "1fr 440px" : "1fr", gap: 20, alignItems: "start" }}>
          
          {/* Table list */}
          <div className="adm-table-scroll" style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.5fr 1.2fr 90px 90px", padding: "12px 20px", background: "var(--paper-2)", borderBottom: "1px solid var(--line-2)", gap: 12 }}>
              {["Applicant", "Subject", "Contact Phone", "Date", "Status"].map((h) => (
                <div key={h} style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", fontFamily: "var(--font-display)" }}>
                  {h}
                </div>
              ))}
            </div>

            {filtered.map((app, i) => {
              const ss = getStatusStyle(app.status);
              const isSelected = selectedId === app._id;
              return (
                <div
                  key={app._id}
                  onClick={() => setSelectedId(isSelected ? null : app._id)}
                  style={{
                    display: "grid", gridTemplateColumns: "1.8fr 1.5fr 1.2fr 90px 90px",
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
                      {app.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{app.name}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)" }}>{app.company ? `${app.company} • ` : ""}{app.email || "No email"}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500 }}>{app.subject}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>{app.phone}</div>
                  <div style={{ fontSize: 11, color: "var(--soft)" }}>{formatDate(app.createdAt)}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: "var(--r-pill)", background: ss.bg, color: ss.color }}>
                      {app.status}
                    </span>
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div style={{ padding: "48px 20px", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
                No contact submissions found.
              </div>
            )}
          </div>

          {/* Details Panel */}
          {detailContact && (
            <div style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", overflow: "hidden", position: "sticky", top: 88 }}>
              <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid var(--line-2)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, fontFamily: "var(--font-display)", color: "var(--ink)" }}>Inquiry Message Details</div>
                  <span style={{ fontSize: 10, textTransform: "uppercase", color: "var(--blue-600)", fontWeight: 700 }}>
                    Submitted On: {new Date(detailContact.createdAt).toLocaleDateString()}
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
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 4 }}>Sender Name</span>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{detailContact.name}</div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 4 }}>Contact Phone</span>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{detailContact.phone}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 4 }}>Email Address</span>
                    <div style={{ fontSize: 13, color: "var(--ink)", wordBreak: "break-all" }}>{detailContact.email || "Not provided"}</div>
                  </div>
                  {detailContact.company && (
                    <div style={{ gridColumn: "1 / -1" }}>
                      <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 4 }}>Company</span>
                      <div style={{ fontSize: 13, color: "var(--ink)", fontWeight: 600 }}>{detailContact.company}</div>
                    </div>
                  )}
                  <div style={{ gridColumn: "1 / -1" }}>
                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 4 }}>Selected Subject</span>
                    <div style={{ fontSize: 13, color: "var(--ink)", fontWeight: 600 }}>{detailContact.subject}</div>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 4 }}>Message Content</span>
                  <div style={{ fontSize: 13, color: "var(--ink)", background: "var(--paper-2)", padding: "10px 12px", borderRadius: "var(--r-sm)", border: "1px solid var(--line-2)", whiteSpace: "pre-wrap", maxHeight: 150, overflowY: "auto" }}>
                    {detailContact.message}
                  </div>
                </div>

                <div style={{ height: 1, background: "var(--line-2)", margin: "4px 0" }} />

                {/* Application Actions */}
                <div>
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 8 }}>
                    Action Status ({detailContact.status})
                  </span>
                  
                  <button
                    disabled={updating}
                    onClick={() => handleOpenEmailModal(detailContact)}
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

                  {detailContact.status === "Closed" ? (
                    <div style={{
                      display: "flex", alignItems: "center", gap: 8, padding: "12px 16px",
                      background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)",
                      color: "var(--muted)", fontSize: 13, fontWeight: 600
                    }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Closed Inquiry Message
                    </div>
                  ) : (
                    <>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <button
                          disabled={updating}
                          onClick={() => handleUpdateStatus(detailContact._id, "Closed")}
                          style={{
                            flex: 1, height: 36, fontSize: 12, fontWeight: 600, borderRadius: "var(--r-sm)", border: "none", cursor: "pointer",
                            background: "var(--blue-600)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                            transition: "background .15s"
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "#1d4ed8"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "var(--blue-600)"; }}
                        >
                          Mark as Closed
                        </button>
                        {detailContact.status !== "Pending" && (
                          <button
                            disabled={updating}
                            onClick={() => handleUpdateStatus(detailContact._id, "Pending")}
                            style={{
                              flex: 1, height: 36, fontSize: 12, fontWeight: 600, borderRadius: "var(--r-sm)", cursor: "pointer",
                              background: "#fffbeb", color: "#b45309", display: "flex", alignItems: "center", justifyContent: "center",
                              border: "1px solid #fde68a", transition: "all .15s"
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "#fef3c7"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "#fffbeb"; }}
                          >
                            Mark as Pending
                          </button>
                        )}
                      </div>
                    </>
                  )}
                  
                  {detailContact.status !== "New" && (
                    <button
                      disabled={updating}
                      onClick={() => handleUpdateStatus(detailContact._id, "New")}
                      style={{
                        width: "100%", height: 32, fontSize: 11, fontWeight: 600, borderRadius: "var(--r-sm)", border: "1px solid var(--line)", cursor: "pointer",
                        background: "transparent", color: "var(--muted)", marginTop: 8, transition: "all .15s"
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "var(--paper-2)"; e.currentTarget.style.color = "var(--ink)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--muted)"; }}
                    >
                      Reset to New
                    </button>
                  )}

                  <button
                    disabled={updating}
                    onClick={() => handleDeleteApplication(detailContact._id)}
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
                    Delete Message
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        <div style={{ fontSize: 12, color: "var(--muted)" }}>
          Showing {filtered.length} of {applications.length} messages
        </div>
      </main>

      {isEmailModalOpen && detailContact && (
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
                  To: <span style={{ fontWeight: 600, color: "var(--ink)" }}>{detailContact.name}</span> &lt;{detailContact.email || "No email"}&gt;
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
                onClick={() => handleSendEmail(detailContact._id)}
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
