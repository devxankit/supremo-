"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AdminHeader } from "../../_components/AdminHeader";
import { Field, TextArea, Toggle, Button, SaveBar, useSavedFlash } from "../../_components/ui";
import { adminAuth } from "../../_services/adminAuth";

interface Section {
  id: string;
  name: string;
  desc: string;
  visible: boolean;
  locked?: boolean; // hero edited elsewhere
  href?: string;
  heading?: string;
  headingHighlight?: string;
  sub?: string;
}

const INITIAL: Section[] = [
  { id: "hero", name: "Hero Section", desc: "Full-screen video banner with headline & CTAs", visible: true, locked: true, href: "/admin/content/hero" },
  { id: "categories", name: "Featured Categories", desc: "Grid of product category cards", visible: true, heading: "Featured Categories", sub: "Water tanks, PVC pipes, planters and more." },
  { id: "manufacturing", name: "Journey", desc: "Factory process & capability showcase", visible: true, locked: true, href: "/admin/content/journey" },
  { id: "whyus", name: "Why Supremo", desc: "Differentiators / value props grid", visible: true, locked: true, href: "/admin/content/why-us" },
  { id: "intro", name: "Reach", desc: "Short company introduction with key stats", visible: true, locked: true, href: "/admin/content/reach" },
  { id: "testimonials", name: "Trusted by leading Indian manufacturers", desc: "Customer & dealer quotes carousel", visible: true, heading: "What our dealers say", sub: "Trusted by our dealer network across 22 states." },
  { id: "dealercta", name: "Dealer Network", desc: "Become-a-dealer banner with form", visible: true, locked: true, href: "/admin/content/dealer-network" },
  { id: "certifications", name: "Certifications & Standards", desc: "ISI / ISO certification logos band", visible: true, heading: "Certified & compliant", sub: "ISI-marked and ISO-9001 certified." },
  { id: "bigcta", name: "Become a Partner", desc: "Final call-to-action before footer", visible: true, heading: "Apply for a Supremo dealership", headingHighlight: "in your district today.", sub: "We're shortlisting 200+ new dealers this fiscal. Apply in 2 minutes — the regional head will call you back within 24 hours." },
];

export default function HomepageSectionsPage() {
  const [sections, setSections] = useState<Section[]>(INITIAL);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);
  const { saved, flash } = useSavedFlash();

  const loadSections = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/homepage-sections`);
      if (!res.ok) throw new Error("Failed to load sections");
      const data = await res.json();
      // Merge UI-only fields (locked, href, name, desc) from INITIAL since they're not stored in DB
      const merged = data.map((sec: Section) => {
        const meta = INITIAL.find((s) => s.id === sec.id);
        let heading = sec.heading;
        let headingHighlight = sec.headingHighlight;
        if (sec.id === "bigcta" && !headingHighlight && (heading === "Apply for a Supremo dealership in your district today." || !heading)) {
          heading = "Apply for a Supremo dealership";
          headingHighlight = "in your district today.";
        }
        return { 
          ...sec, 
          heading,
          headingHighlight,
          locked: meta?.locked, 
          href: meta?.href, 
          name: meta?.name ?? sec.name, 
          desc: meta?.desc ?? sec.desc 
        };
      });
      setSections(merged);
    } catch (err) {
      console.error("Error loading homepage sections:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSections();
  }, []);

  const handleSave = async () => {
    const user = adminAuth.getUser();
    if (!user) {
      alert("Not authenticated. Please log in.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/homepage-sections`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(sections),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update homepage sections.");
      }

      const data = await res.json();
      const merged = data.map((sec: Section) => {
        const meta = INITIAL.find((s) => s.id === sec.id);
        let heading = sec.heading;
        let headingHighlight = sec.headingHighlight;
        if (sec.id === "bigcta" && !headingHighlight && (heading === "Apply for a Supremo dealership in your district today." || !heading)) {
          heading = "Apply for a Supremo dealership";
          headingHighlight = "in your district today.";
        }
        return { 
          ...sec, 
          heading,
          headingHighlight,
          locked: meta?.locked, 
          href: meta?.href, 
          name: meta?.name ?? sec.name, 
          desc: meta?.desc ?? sec.desc 
        };
      });
      setSections(merged);
      flash();
    } catch (err: any) {
      console.error(err);
      alert("Save error: " + err.message);
    }
  };

  function toggle(id: string) {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s)));
  }

  function update(id: string, key: "heading" | "headingHighlight" | "sub", value: string) {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, [key]: value } : s)));
  }

  const visibleCount = sections.filter((s) => s.visible).length;

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <AdminHeader title="Homepage Sections" breadcrumb={[{ label: "Content" }, { label: "Homepage" }]} />
        <main style={{ flex: 1, padding: "28px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 14, color: "var(--muted)" }}>Loading homepage sections...</div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader title="Homepage Sections" breadcrumb={[{ label: "Content" }, { label: "Homepage" }]} />

      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 18, maxWidth: 900 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 13, color: "var(--muted)" }}>
            <strong style={{ color: "var(--ink)" }}>{visibleCount}</strong> of {sections.length} sections visible
          </div>
          <Button variant="outline" size="sm" onClick={() => window.open("/", "_blank")}>
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
                      <Button variant="outline" size="sm">
                        Open editor
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 5, verticalAlign: "middle" }} aria-hidden="true">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </Button>
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
                      {sec.id === "bigcta" ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                          <Field label="Section Heading (Main)" value={sec.heading ?? ""} onChange={(v) => update(sec.id, "heading", v)} />
                          <Field label="Section Heading (Blue Highlight)" value={sec.headingHighlight ?? ""} onChange={(v) => update(sec.id, "headingHighlight", v)} />
                        </div>
                      ) : (
                        <Field label="Section Heading" value={sec.heading ?? ""} onChange={(v) => update(sec.id, "heading", v)} />
                      )}
                    </div>
                    <TextArea label="Section Sub-text" value={sec.sub ?? ""} onChange={(v) => update(sec.id, "sub", v)} rows={3} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <SaveBar saved={saved} onSave={handleSave} onReset={loadSections} />
      </main>
    </div>
  );
}
