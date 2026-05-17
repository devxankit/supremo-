"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { adminAuth } from "../_services/adminAuth";

const NAV = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    label: "Dealers",
    href: "/admin/dealers",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Inquiries",
    href: "/admin/inquiries",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: "Blog",
    href: "/admin/blog",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    label: "Media",
    href: "/admin/media",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
      </svg>
    ),
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  function handleLogout() {
    adminAuth.logout();
    router.push("/admin/login");
  }

  return (
    <aside
      style={{
        width: collapsed ? 68 : 240,
        height: "100vh",
        background: "#0D1B35",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        transition: "width .25s cubic-bezier(.4,0,.2,1)",
        position: "sticky",
        top: 0,
        zIndex: 10,
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      {/* Logo + collapse toggle */}
      <div
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: collapsed ? "0 16px" : "0 20px",
          borderBottom: "1px solid rgba(255,255,255,.07)",
          flexShrink: 0,
        }}
      >
        {!collapsed && (
          <Link href="/admin/dashboard" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "var(--blue-600)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L3 7l9 5 9-5-9-5zM3 17l9 5 9-5M3 12l9 5 9-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: "var(--font-display)", lineHeight: 1.2 }}>Supremo</div>
              <div style={{ color: "rgba(255,255,255,.4)", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}>Admin Panel</div>
            </div>
          </Link>
        )}
        {collapsed && (
          <Link href="/admin/dashboard" style={{ display: "flex" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--blue-600)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L3 7l9 5 9-5-9-5zM3 17l9 5 9-5M3 12l9 5 9-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          style={{
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,.06)",
            border: "1px solid rgba(255,255,255,.1)",
            borderRadius: 6,
            cursor: "pointer",
            color: "rgba(255,255,255,.5)",
            flexShrink: 0,
            transition: "background .15s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.12)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.06)"; }}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            {collapsed
              ? <><path d="M9 18l6-6-6-6" /></>
              : <><path d="M15 18l-6-6 6-6" /></>
            }
          </svg>
        </button>
      </div>

      {/* Section label */}
      {!collapsed && (
        <div style={{ padding: "20px 20px 8px", color: "rgba(255,255,255,.28)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, fontFamily: "var(--font-display)" }}>
          Main Menu
        </div>
      )}

      {/* Nav items */}
      <nav style={{ flex: 1, padding: collapsed ? "16px 0" : "0 10px", display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const isHovered = hovered === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={() => setHovered(item.href)}
              onMouseLeave={() => setHovered(null)}
              title={collapsed ? item.label : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: collapsed ? "10px 0" : "10px 12px",
                justifyContent: collapsed ? "center" : "flex-start",
                borderRadius: collapsed ? 0 : 8,
                textDecoration: "none",
                color: active ? "#fff" : isHovered ? "rgba(255,255,255,.85)" : "rgba(255,255,255,.55)",
                background: active ? "rgba(20,102,230,.25)" : isHovered ? "rgba(255,255,255,.06)" : "transparent",
                borderLeft: active ? "3px solid var(--blue-400)" : "3px solid transparent",
                transition: "background .15s, color .15s",
                fontSize: 14,
                fontWeight: active ? 600 : 500,
                fontFamily: "var(--font-body)",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              <span style={{ flexShrink: 0, color: active ? "var(--blue-400)" : isHovered ? "rgba(255,255,255,.7)" : "rgba(255,255,255,.4)" }}>
                {item.icon}
              </span>
              {!collapsed && item.label}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(255,255,255,.07)", margin: "0 20px" }} />

      {/* View Website */}
      <div style={{ padding: collapsed ? "12px 0" : "12px 10px" }}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          title={collapsed ? "View Website" : undefined}
          onMouseEnter={(e) => setHovered("website")}
          onMouseLeave={(e) => setHovered(null)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: collapsed ? "9px 0" : "9px 12px",
            justifyContent: collapsed ? "center" : "flex-start",
            borderRadius: collapsed ? 0 : 8,
            textDecoration: "none",
            color: hovered === "website" ? "rgba(255,255,255,.85)" : "rgba(255,255,255,.4)",
            background: hovered === "website" ? "rgba(255,255,255,.06)" : "transparent",
            transition: "background .15s, color .15s",
            fontSize: 13,
            fontWeight: 500,
            fontFamily: "var(--font-body)",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          <span style={{ flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </span>
          {!collapsed && "View Website"}
        </a>
      </div>

      {/* User + logout */}
      <div
        style={{
          padding: collapsed ? "12px 10px 16px" : "12px 14px 16px",
          borderTop: "1px solid rgba(255,255,255,.07)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          justifyContent: collapsed ? "center" : "flex-start",
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--blue-600), var(--blue-400))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          A
        </div>
        {!collapsed && (
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-display)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              Admin
            </div>
            <div style={{ color: "rgba(255,255,255,.35)", fontSize: 11 }}>admin@supremo.com</div>
          </div>
        )}
        {!collapsed && (
          <button
            onClick={handleLogout}
            title="Logout"
            style={{
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "1px solid rgba(255,255,255,.1)",
              borderRadius: 6,
              cursor: "pointer",
              color: "rgba(255,255,255,.4)",
              flexShrink: 0,
              transition: "background .15s, color .15s, border-color .15s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(239,68,68,.15)";
              el.style.color = "#f87171";
              el.style.borderColor = "rgba(239,68,68,.3)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "transparent";
              el.style.color = "rgba(255,255,255,.4)";
              el.style.borderColor = "rgba(255,255,255,.1)";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        )}
        {collapsed && (
          <button
            onClick={handleLogout}
            title="Logout"
            style={{ display: "none" }}
          />
        )}
      </div>
    </aside>
  );
}
