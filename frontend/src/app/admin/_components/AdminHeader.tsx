"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAdminUI } from "./ui";
import { adminAuth } from "../_services/adminAuth";

interface AdminHeaderProps {
  title: string;
  breadcrumb?: { label: string; href?: string }[];
}

export function AdminHeader({ title, breadcrumb }: AdminHeaderProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showAllNotifs, setShowAllNotifs] = useState(false);
  const { openSidebar } = useAdminUI();

  const adminUser = adminAuth.getUser();
  const displayEmail = adminUser?.email;
  const displayName = adminUser?.name || "";
  const avatarLetter = displayName ? displayName.charAt(0).toUpperCase() : "A";

  useEffect(() => {
    if (!adminUser) return;
    const apiBase = process.env.NEXT_PUBLIC_API_URL;
    
    const fetchNotifications = () => {
      fetch(`${apiBase}/inquiries/notifications`, {
        headers: {
          Authorization: `Bearer ${adminUser.token}`
        }
      })
        .then(res => res.ok ? res.json() : [])
        .then(data => {
          setNotifications(data);
        })
        .catch(err => {
          console.error("Error fetching notifications:", err);
        });
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, []);

  const formatRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHrs = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffSecs < 60) return "just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHrs < 24) return `${diffHrs} hr${diffHrs > 1 ? "s" : ""} ago`;
    if (diffDays === 1) return "Yesterday";
    return date.toLocaleDateString("en-IN", { day: 'numeric', month: 'short' });
  };

  const displayedNotifs = showAllNotifs ? notifications : notifications.slice(0, 5);

  return (
    <header
      style={{
        height: 64,
        background: "var(--paper)",
        borderBottom: "1px solid var(--line-2)",
        display: "flex",
        alignItems: "center",
        padding: "0 28px",
        gap: 16,
        position: "sticky",
        top: 0,
        zIndex: 5,
        boxShadow: "0 1px 0 var(--line-2)",
      }}
    >
      {/* Mobile menu button */}
      <button
        className="adm-menu-btn"
        onClick={openSidebar}
        aria-label="Open menu"
        style={{
          width: 38,
          height: 38,
          alignItems: "center",
          justifyContent: "center",
          background: "var(--paper)",
          border: "1px solid var(--line)",
          borderRadius: "var(--r-sm)",
          cursor: "pointer",
          color: "var(--slate)",
          flexShrink: 0,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
      </button>

      {/* Page title + breadcrumb */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {breadcrumb && breadcrumb.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
            <Link href="/admin/dashboard" style={{ color: "var(--muted)", fontSize: 12, fontWeight: 500, textDecoration: "none" }}>
              Admin
            </Link>
            {breadcrumb.map((crumb, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--soft)" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
                {crumb.href ? (
                  <Link href={crumb.href} style={{ color: "var(--muted)", fontSize: 12, fontWeight: 500, textDecoration: "none" }}>
                    {crumb.label}
                  </Link>
                ) : (
                  <span style={{ color: "var(--ink)", fontSize: 12, fontWeight: 600 }}>{crumb.label}</span>
                )}
              </span>
            ))}
          </div>
        )}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 18,
            color: "var(--ink)",
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {title}
        </h1>
      </div>

      {/* Search */}
      <div
        className="adm-hide-sm"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          height: 38,
          padding: "0 14px",
          background: "var(--paper-2)",
          border: "1px solid var(--line)",
          borderRadius: "var(--r-pill)",
          minWidth: 220,
          transition: "border-color .15s, background .15s",
        }}
        onFocus={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "var(--blue-600)";
          el.style.background = "#fff";
          el.style.boxShadow = "0 0 0 3px var(--blue-100)";
        }}
        onBlur={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "var(--line)";
          el.style.background = "var(--paper-2)";
          el.style.boxShadow = "none";
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--soft)" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          placeholder="Search..."
          style={{
            border: "none",
            background: "transparent",
            outline: "none",
            fontSize: 13,
            color: "var(--ink)",
            fontFamily: "var(--font-body)",
            width: "100%",
          }}
        />
      </div>

      {/* Notifications */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => {
            setNotifOpen((o) => {
              if (o) setShowAllNotifs(false);
              return !o;
            });
          }}
          style={{
            width: 38,
            height: 38,
            borderRadius: "var(--r-sm)",
            border: "1px solid var(--line)",
            background: "var(--paper)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--muted)",
            position: "relative",
            transition: "background .15s, border-color .15s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "var(--paper-2)";
            el.style.borderColor = "var(--blue-200)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "var(--paper)";
            el.style.borderColor = "var(--line)";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {notifications.some(n => n.dot) && (
            <span
              style={{
                position: "absolute",
                top: 7,
                right: 7,
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--signal)",
                border: "1.5px solid #fff",
              }}
            />
          )}
        </button>

        {notifOpen && (
          <>
            <div
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 8,
              }}
              onClick={() => {
                setNotifOpen(false);
                setShowAllNotifs(false);
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "calc(100% + 8px)",
                width: 300,
                background: "#fff",
                borderRadius: "var(--r-md)",
                boxShadow: "var(--sh-lg)",
                border: "1px solid var(--line)",
                zIndex: 9,
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--line-2)", display: "flex", alignItems: "center" }}>
                <span style={{ fontWeight: 600, fontSize: 13, fontFamily: "var(--font-display)", color: "var(--ink)" }}>Notifications</span>
              </div>
              {displayedNotifs.map((n, i) => (
                <div
                  key={n.id || i}
                  style={{
                    padding: "12px 16px",
                    borderBottom: i < displayedNotifs.length - 1 ? "1px solid var(--line-2)" : "none",
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    cursor: "pointer",
                    background: n.dot ? "var(--blue-50)" : "transparent",
                    transition: "background .15s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = n.dot ? "#e6f0ff" : "var(--paper-2)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = n.dot ? "var(--blue-50)" : "transparent"; }}
                >
                  {n.dot && (
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--blue-600)", flexShrink: 0, marginTop: 5 }} />
                  )}
                  {!n.dot && <span style={{ width: 7, flexShrink: 0 }} />}
                  <div>
                    <div style={{ fontSize: 12, color: "var(--ink)", lineHeight: 1.5 }}>{n.msg}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{formatRelativeTime(n.createdAt)}</div>
                  </div>
                </div>
              ))}
              {notifications.length === 0 && (
                <div style={{ padding: "20px 16px", textAlign: "center", color: "var(--muted)", fontSize: 12.5 }}>
                  No new notifications
                </div>
              )}
              {notifications.length > 5 && !showAllNotifs && (
                <button
                  onClick={() => setShowAllNotifs(true)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: "var(--paper-2)",
                    border: "none",
                    borderTop: "1px solid var(--line-2)",
                    color: "var(--blue-600)",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    textAlign: "center",
                    fontFamily: "var(--font-display)",
                    transition: "background .15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--line-2)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "var(--paper-2)"; }}
                >
                  View all
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Avatar */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--blue-600), var(--blue-400))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          fontFamily: "var(--font-display)",
          cursor: "pointer",
          flexShrink: 0,
        }}
        title={displayEmail}
      >
        {avatarLetter}
      </div>
    </header>
  );
}
