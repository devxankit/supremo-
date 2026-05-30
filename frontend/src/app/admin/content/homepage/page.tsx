"use client";

import { useState } from "react";
import Link from "next/link";
import { AdminHeader } from "../../_components/AdminHeader";
import { Field, TextArea, Toggle, Button, SaveBar, useSavedFlash } from "../../_components/ui";

interface Section {
  id: string;
  name: string;
  desc: string;
  visible: boolean;
  locked?: boolean; // hero edited elsewhere
  href?: string;
  heading?: string;
  sub?: string;
}

const INITIAL: Section[] = [
  { id: "hero", name: "Hero Section", desc: "Full-screen video banner with headline & CTAs", visible: true, locked: true, href: "/admin/content/hero" },
  { id: "intro", name: "Intro / About strip", desc: "Short company introduction with key stats", visible: true, heading: "India's trusted polymer products partner", sub: "Three decades of rotomoulding expertise across four ISO-certified plants." },
  { id: "categories", name: "Product Categories", desc: "Grid of product category cards", visible: true, heading: "Explore our range", sub: "Water tanks, PVC pipes, planters and more." },
  { id: "featured", name: "Featured Products", desc: "Highlighted best-selling products", visible: true, heading: "Featured Products", sub: "Our most-loved products, trusted across India." },
  { id: "whyus", name: "Why Choose Us", desc: "Differentiators / value props grid", visible: true, heading: "Why dealers choose Supremo", sub: "Quality, reach and support that grows your business." },
  { id: "manufacturing", name: "Manufacturing", desc: "Factory process & capability showcase", visible: true, heading: "Built in four ISO-certified plants", sub: "From raw polymer to dispatch — fully in-house." },
  { id: "certifications", name: "Certifications", desc: "ISI / ISO certification logos band", visible: true, heading: "Certified & compliant", sub: "ISI-marked and ISO-9001 certified." },
  { id: "testimonials", name: "Testimonials", desc: "Customer & dealer quotes carousel", visible: true, heading: "What our dealers say", sub: "Trusted by our dealer network across 22 states." },
  { id: "dealercta", name: "Dealer CTA", desc: "Become-a-dealer banner with form", visible: true, heading: "Become a Supremo dealer", sub: "Partner with a pan-India brand." },
  { id: "bigcta", name: "Closing CTA", desc: "Final call-to-action before footer", visible: false, heading: "Ready to get started?", sub: "Reach out to our team today." },
];

export default function HomepageSectionsPage() {
  const [sections, setSections] = useState<Section[]>(INITIAL);
  const [openId, setOpenId] = useState<string | null>(null);
  const { saved, flash } = useSavedFlash();

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= sections.length) return;
    const next = [...sections];
    [next[i], next[j]] = [next[j], next[i]];
    setSections(next);
  }

  function toggle(id: string) {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s)));
  }

  function update(id: string, key: "heading" | "sub", value: string) {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, [key]: value } : s)));
  }

  const visibleCount = sections.filter((s) => s.visible).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader title="Homepage Sections" breadcrumb={[{ label: "Content", href: "/admin/content" }, { label: "Homepage" }]} />

      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 18, maxWidth: 900 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 13, color: "var(--muted)" }}>
            <strong style={{ color: "var(--ink)" }}>{visibleCount}</strong> of {sections.length} sections visible · drag-free reordering with the arrows
          </div>
          <Button variant="outline" size="sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
            Preview homepage
          </Button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {sections.map((sec, i) => {
            const open = openId === sec.id;
            return (
              <div key={sec.id} style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: `1px solid ${open ? "var(--blue-200)" : "var(--line-2)"}`, boxShadow: "var(--sh-sm)", overflow: "hidden", opacity: sec.visible ? 1 : 0.62, transition: "opacity .2s, border-color .2s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px" }}>
                  {/* reorder */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <button onClick={() => move(i, -1)} disabled={i === 0} style={{ width: 22, height: 18, border: "1px solid var(--line)", borderRadius: 4, background: "var(--paper-2)", cursor: i === 0 ? "not-allowed" : "pointer", color: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center", opacity: i === 0 ? 0.4 : 1 }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 15l-6-6-6 6" /></svg>
                    </button>
                    <button onClick={() => move(i, 1)} disabled={i === sections.length - 1} style={{ width: 22, height: 18, border: "1px solid var(--line)", borderRadius: 4, background: "var(--paper-2)", cursor: i === sections.length - 1 ? "not-allowed" : "pointer", color: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center", opacity: i === sections.length - 1 ? 0.4 : 1 }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
                    </button>
                  </div>

                  <div style={{ width: 30, height: 30, borderRadius: "var(--r-sm)", background: "var(--blue-50)", color: "var(--blue-700)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, fontFamily: "var(--font-display)", flexShrink: 0 }}>{i + 1}</div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", fontFamily: "var(--font-display)", display: "flex", alignItems: "center", gap: 8 }}>
                      {sec.name}
                      {sec.locked && <span style={{ fontSize: 10, fontWeight: 600, padding: "1px 7px", borderRadius: 999, background: "var(--blue-50)", color: "var(--blue-700)" }}>Dedicated editor</span>}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sec.desc}</div>
                  </div>

                  {sec.locked && sec.href ? (
                    <Link href={sec.href} style={{ textDecoration: "none" }}>
                      <Button variant="outline" size="sm">Open editor →</Button>
                    </Link>
                  ) : (
                    <Button variant={open ? "primary" : "ghost"} size="sm" onClick={() => setOpenId(open ? null : sec.id)}>
                      {open ? "Close" : "Edit"}
                    </Button>
                  )}

                  <Toggle on={sec.visible} onToggle={() => toggle(sec.id)} />
                </div>

                {open && !sec.locked && (
                  <div style={{ padding: "4px 18px 20px 18px", borderTop: "1px solid var(--line-2)", display: "flex", flexDirection: "column", gap: 14, marginTop: 2 }}>
                    <div style={{ paddingTop: 16 }}>
                      <Field label="Section Heading" value={sec.heading ?? ""} onChange={(v) => update(sec.id, "heading", v)} />
                    </div>
                    <TextArea label="Section Sub-text" value={sec.sub ?? ""} onChange={(v) => update(sec.id, "sub", v)} rows={3} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <SaveBar saved={saved} onSave={flash} onReset={() => setSections(INITIAL)} />
      </main>
    </div>
  );
}
