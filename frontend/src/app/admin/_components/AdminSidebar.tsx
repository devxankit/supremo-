"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { adminAuth } from "../_services/adminAuth";
import { useIsMobile } from "./ui";

type NavItem = { label: string; href: string; icon: React.ReactNode; badge?: string; badgeColor?: string };
type NavGroup = { title: string; items: NavItem[] };

const ic = (path: React.ReactNode) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

const GROUPS: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: ic(<><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>) },
      { label: "Analytics", href: "/admin/analytics", icon: ic(<><path d="M3 3v18h18" /><path d="M7 14l4-4 3 3 5-6" /></>) },
    ],
  },
  {
    title: "Customers",
    items: [
      { label: "Inquiries", href: "/admin/inquiries", icon: ic(<><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></>), badge: "23", badgeColor: "amber" },
      { label: "Dealer Applications", href: "/admin/dealers", icon: ic(<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>), badge: "2", badgeColor: "blue" },
      { label: "Career Applications", href: "/admin/careers", icon: ic(<><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 9h6M9 13h6" /></>), badge: "0", badgeColor: "blue" },
      { label: "Contact Applications", href: "/admin/contacts", icon: ic(<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>), badge: "0", badgeColor: "blue" },
      { label: "Blog & News", href: "/admin/blog", icon: ic(<><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>) },
    ],
  },
  {
    title: "Catalog",
    items: [
      { label: "Products", href: "/admin/products", icon: ic(<><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /></>), badge: "48", badgeColor: "gray" },
      { label: "Categories", href: "/admin/categories", icon: ic(<><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></>) },
    ],
  },
  {
    title: "Website Content",
    items: [
      { label: "Hero Section", href: "/admin/content/hero", icon: ic(<><rect x="2" y="4" width="20" height="14" rx="2" /><path d="M2 18l6-4 4 2 4-3 6 4" /><circle cx="8" cy="9" r="1.6" /></>) },
      { label: "Homepage Sections", href: "/admin/content/homepage", icon: ic(<><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>) },
      { label: "Footer", href: "/admin/content/footer", icon: ic(<><rect x="3" y="17" width="18" height="4" rx="1" /><line x1="7" y1="11" x2="17" y2="11" /><line x1="7" y1="7" x2="13" y2="7" /></>) },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Settings", href: "/admin/settings", icon: ic(<><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>) },
      { label: "About Page", href: "/admin/content/about", icon: ic(<><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></>) },
      { label: "Gallery", href: "/admin/content/gallery", icon: ic(<><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></>) },
      { label: "Dealership Page", href: "/admin/content/dealership", icon: ic(<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>) },
      { label: "Careers Setting", href: "/admin/content/careers", icon: ic(<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></>) },
      { label: "Contact Setting", href: "/admin/content/contact", icon: ic(<><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.09 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></>) },
      { label: "Terms & Conditions", href: "/admin/content/terms", icon: ic(<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></>) },
      { label: "Privacy Policy", href: "/admin/content/privacy", icon: ic(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>) },
      { label: "Returns & Warranty", href: "/admin/content/warranty", icon: ic(<><rect x="3" y="11" width="18" height="10" rx="2" /><path d="M12 2v9M8 5h8" /></>) },
    ],
  },
];

const badgeColors: Record<string, { bg: string; color: string }> = {
  blue: { bg: "rgba(43,123,255,.22)", color: "#9cc2ff" },
  amber: { bg: "rgba(255,176,32,.2)", color: "#ffd27a" },
  green: { bg: "rgba(31,174,106,.2)", color: "#7ee0ad" },
  gray: { bg: "rgba(255,255,255,.1)", color: "rgba(255,255,255,.55)" },
};

export function AdminSidebar({ mobileOpen = false, onClose }: { mobileOpen?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const mobile = useIsMobile(1024);
  const [rawCollapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [newInquiriesCount, setNewInquiriesCount] = useState<number>(0);
  const [newDealersCount, setNewDealersCount] = useState<number>(0);
  const [newCareersCount, setNewCareersCount] = useState<number>(0);
  const [newContactsCount, setNewContactsCount] = useState<number>(0);
  const [productsCount, setProductsCount] = useState<number>(0);

  useEffect(() => {
    const user = adminAuth.getUser();
    if (!user) return;
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
    
    const updateCounts = () => {
      fetch(`${apiBase}/inquiries/sidebar-counts?t=${Date.now()}`, {
        headers: { 
          Authorization: `Bearer ${user.token}`,
          "Cache-Control": "no-cache",
          "Pragma": "no-cache"
        }
      })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data) {
            setNewInquiriesCount(data.newInquiries || 0);
            setNewDealersCount(data.newDealers || 0);
            setNewCareersCount(data.newCareers || 0);
            setNewContactsCount(data.newContacts || 0);
            setProductsCount(data.products || 0);
          }
        })
        .catch(err => console.error("Error fetching sidebar counts:", err));
    };

    updateCounts();

    window.addEventListener("inquiry-updated", updateCounts);
    window.addEventListener("career-updated", updateCounts);
    window.addEventListener("contact-updated", updateCounts);
    window.addEventListener("product-updated", updateCounts);
    return () => {
      window.removeEventListener("inquiry-updated", updateCounts);
      window.removeEventListener("career-updated", updateCounts);
      window.removeEventListener("contact-updated", updateCounts);
      window.removeEventListener("product-updated", updateCounts);
    };
  }, [pathname]);

  // On mobile the sidebar is always full-width inside the drawer (never icon-collapsed)
  const collapsed = mobile ? false : rawCollapsed;

  function closeOnMobile() {
    if (mobile) onClose?.();
  }

  function handleLogout() {
    adminAuth.logout();
    router.push("/admin/login");
  }

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <>
      {/* Mobile backdrop */}
      {mobile && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10,22,40,.5)",
            backdropFilter: "blur(2px)",
            zIndex: 59,
            opacity: mobileOpen ? 1 : 0,
            pointerEvents: mobileOpen ? "auto" : "none",
            transition: "opacity .25s",
          }}
        />
      )}
      <aside
        data-lenis-prevent
        style={{
          width: collapsed ? 72 : 256,
          height: "100vh",
          background: "linear-gradient(180deg, #0D1B35 0%, #0A1628 100%)",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          transition: mobile ? "transform .28s cubic-bezier(.4,0,.2,1)" : "width .25s cubic-bezier(.4,0,.2,1)",
          position: mobile ? "fixed" : "sticky",
          top: 0,
          left: 0,
          transform: mobile ? (mobileOpen ? "translateX(0)" : "translateX(-100%)") : "none",
          boxShadow: mobile && mobileOpen ? "0 0 50px rgba(0,0,0,.5)" : "none",
          zIndex: mobile ? 60 : 10,
          overflowX: "hidden",
          overflowY: "auto",
          scrollbarWidth: "thin",
        }}
      >
      {/* Logo + collapse toggle */}
      <div
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: collapsed ? "0 16px" : "0 18px",
          borderBottom: "1px solid rgba(255,255,255,.07)",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          background: "#0D1B35",
          zIndex: 2,
        }}
      >
        <Link href="/admin/dashboard" onClick={closeOnMobile} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", minWidth: 0 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg, var(--blue-500), var(--blue-700))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 12px -3px rgba(20,102,230,.6)" }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7l9 5 9-5-9-5zM3 17l9 5 9-5M3 12l9 5 9-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          {!collapsed && (
            <div style={{ minWidth: 0 }}>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, fontFamily: "var(--font-display)", lineHeight: 1.1 }}>Supremo</div>
              <div style={{ color: "rgba(255,255,255,.4)", fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>Control Center</div>
            </div>
          )}
        </Link>
        {mobile ? (
          <button
            onClick={onClose}
            title="Close menu"
            style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, cursor: "pointer", color: "rgba(255,255,255,.6)", flexShrink: 0 }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        ) : !collapsed ? (
          <button
            onClick={() => setCollapsed(true)}
            title="Collapse sidebar"
            style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, cursor: "pointer", color: "rgba(255,255,255,.5)", flexShrink: 0 }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
        ) : null}
      </div>

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          title="Expand sidebar"
          style={{ margin: "12px auto 0", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, cursor: "pointer", color: "rgba(255,255,255,.5)" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      )}

      {/* Nav groups */}
      <nav style={{ flex: 1, padding: collapsed ? "8px 0" : "8px 12px", display: "flex", flexDirection: "column", gap: 2 }}>
        {GROUPS.map((group) => (
          <div key={group.title} style={{ marginBottom: 10 }}>
            {!collapsed && (
              <div style={{ padding: "12px 12px 6px", color: "rgba(255,255,255,.3)", fontSize: 10, letterSpacing: "0.11em", textTransform: "uppercase", fontWeight: 700, fontFamily: "var(--font-display)" }}>
                {group.title}
              </div>
            )}
            {collapsed && group.title !== "Overview" && (
              <div style={{ height: 1, background: "rgba(255,255,255,.07)", margin: "8px 16px" }} />
            )}
            {group.items.map((item) => {
              const active = isActive(item.href);
              const isHovered = hovered === item.href;
              const bc = item.badgeColor ? badgeColors[item.badgeColor] : badgeColors.gray;
              
              // Override badge dynamically
              let badgeVal = item.badge;
              if (item.href === "/admin/inquiries") {
                badgeVal = newInquiriesCount > 0 ? newInquiriesCount.toString() : undefined;
              } else if (item.href === "/admin/dealers") {
                badgeVal = newDealersCount > 0 ? newDealersCount.toString() : undefined;
              } else if (item.href === "/admin/careers") {
                badgeVal = newCareersCount > 0 ? newCareersCount.toString() : undefined;
              } else if (item.href === "/admin/contacts") {
                badgeVal = newContactsCount > 0 ? newContactsCount.toString() : undefined;
              } else if (item.href === "/admin/products") {
                badgeVal = productsCount > 0 ? productsCount.toString() : undefined;
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeOnMobile}
                  onMouseEnter={() => setHovered(item.href)}
                  onMouseLeave={() => setHovered(null)}
                  title={collapsed ? item.label : undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 11,
                    padding: collapsed ? "10px 0" : "9px 11px",
                    margin: collapsed ? "2px 12px" : 0,
                    justifyContent: collapsed ? "center" : "flex-start",
                    borderRadius: 8,
                    textDecoration: "none",
                    color: active ? "#fff" : isHovered ? "rgba(255,255,255,.9)" : "rgba(255,255,255,.55)",
                    background: active ? "linear-gradient(90deg, rgba(20,102,230,.32), rgba(20,102,230,.12))" : isHovered ? "rgba(255,255,255,.06)" : "transparent",
                    boxShadow: active ? "inset 2px 0 0 var(--blue-400)" : "none",
                    transition: "background .15s, color .15s",
                    fontSize: 13.5,
                    fontWeight: active ? 600 : 500,
                    fontFamily: "var(--font-body)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  <span style={{ flexShrink: 0, color: active ? "var(--blue-400)" : isHovered ? "rgba(255,255,255,.75)" : "rgba(255,255,255,.42)", display: "flex" }}>
                    {item.icon}
                  </span>
                  {!collapsed && <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>{item.label}</span>}
                  {!collapsed && badgeVal && (
                    <span style={{ fontSize: 10.5, fontWeight: 700, padding: "1px 7px", borderRadius: 999, background: bc.bg, color: bc.color, flexShrink: 0 }}>
                      {badgeVal}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* View website */}
      <div style={{ padding: collapsed ? "8px 12px" : "8px 12px", flexShrink: 0 }}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          title={collapsed ? "View Website" : undefined}
          onMouseEnter={() => setHovered("website")}
          onMouseLeave={() => setHovered(null)}
          style={{
            display: "flex", alignItems: "center", gap: 11,
            padding: collapsed ? "9px 0" : "9px 11px",
            justifyContent: collapsed ? "center" : "flex-start",
            borderRadius: 8, textDecoration: "none",
            color: hovered === "website" ? "#fff" : "rgba(255,255,255,.55)",
            background: hovered === "website" ? "rgba(255,255,255,.06)" : "transparent",
            border: "1px solid rgba(255,255,255,.1)",
            fontSize: 13, fontWeight: 600, fontFamily: "var(--font-body)", whiteSpace: "nowrap", overflow: "hidden",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
          {!collapsed && "View Live Website"}
        </a>
      </div>

      {/* User + logout */}
      <div style={{ padding: collapsed ? "12px 12px 16px" : "12px 14px 16px", borderTop: "1px solid rgba(255,255,255,.07)", display: "flex", alignItems: "center", gap: 10, justifyContent: collapsed ? "center" : "flex-start", flexShrink: 0 }}>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, var(--blue-600), var(--blue-400))", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>A</div>
        {!collapsed && (
          <>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-display)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Admin</div>
              <div style={{ color: "rgba(255,255,255,.4)", fontSize: 11 }}>Super Admin</div>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, cursor: "pointer", color: "rgba(255,255,255,.4)", flexShrink: 0, transition: "all .15s" }}
              onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = "rgba(239,68,68,.15)"; el.style.color = "#f87171"; el.style.borderColor = "rgba(239,68,68,.3)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = "transparent"; el.style.color = "rgba(255,255,255,.4)"; el.style.borderColor = "rgba(255,255,255,.1)"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
            </button>
          </>
        )}
      </div>
      </aside>
    </>
  );
}
