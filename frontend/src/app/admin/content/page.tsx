"use client";

import Link from "next/link";
import { AdminHeader } from "../_components/AdminHeader";

const ic = (path: React.ReactNode) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{path}</svg>
);

const AREAS = [
  {
    title: "Hero Section",
    desc: "Background video, headline, sub-text, CTA buttons & live preview.",
    href: "/admin/content/hero",
    accent: "var(--blue-600)",
    tag: "Video + Text",
    icon: ic(<><rect x="2" y="4" width="20" height="14" rx="2" /><path d="M2 18l6-4 4 2 4-3 6 4" /><circle cx="8" cy="9" r="1.6" /></>),
  },
  {
    title: "Homepage Sections",
    desc: "Toggle, reorder & edit every block on the home page.",
    href: "/admin/content/homepage",
    accent: "var(--water)",
    tag: "9 sections",
    icon: ic(<><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>),
  },
  {
    title: "Footer",
    desc: "Footer link columns, social, contact details & copyright.",
    href: "/admin/content/footer",
    accent: "var(--signal)",
    tag: "Global",
    icon: ic(<><rect x="3" y="17" width="18" height="4" rx="1" /><line x1="7" y1="11" x2="17" y2="11" /><line x1="7" y1="7" x2="13" y2="7" /></>),
  },
  {
    title: "Media Library",
    desc: "Upload & organise images and videos used site-wide.",
    href: "/admin/media",
    accent: "var(--blue-800)",
    tag: "126 files",
    icon: ic(<><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="M21 15l-5-5L5 21" /></>),
  },
];

export default function ContentHubPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader title="Content Hub" breadcrumb={[{ label: "Content" }]} />
      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ background: "linear-gradient(135deg, var(--ink) 0%, var(--blue-900) 100%)", borderRadius: "var(--r-md)", padding: "26px 30px", color: "#fff" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,.55)" }}>Website Control Center</div>
          <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "var(--font-display)", marginTop: 6 }}>Edit everything your visitors see</div>
          <div style={{ fontSize: 13.5, color: "rgba(255,255,255,.7)", marginTop: 6, maxWidth: "60ch" }}>
            Pick an area below to manage content. Every change shows a live preview before you publish.
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: 16 }}>
          {AREAS.map((a) => (
            <Link
              key={a.title}
              href={a.href}
              style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", padding: 22, textDecoration: "none", display: "flex", flexDirection: "column", gap: 14, transition: "box-shadow .2s, transform .2s, border-color .2s" }}
              onMouseEnter={(e) => { const el = e.currentTarget; el.style.boxShadow = "var(--sh-md)"; el.style.transform = "translateY(-3px)"; el.style.borderColor = "var(--blue-200)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget; el.style.boxShadow = "var(--sh-sm)"; el.style.transform = "none"; el.style.borderColor = "var(--line-2)"; }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ width: 46, height: 46, borderRadius: "var(--r-sm)", background: a.accent + "16", color: a.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>{a.icon}</div>
                <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: "var(--r-pill)", background: "var(--paper-2)", color: "var(--muted)", fontFamily: "var(--font-display)" }}>{a.tag}</span>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, fontFamily: "var(--font-display)", color: "var(--ink)" }}>{a.title}</div>
                <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4, lineHeight: 1.55 }}>{a.desc}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, color: a.accent, fontSize: 13, fontWeight: 600, fontFamily: "var(--font-display)", marginTop: "auto" }}>
                Manage
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
