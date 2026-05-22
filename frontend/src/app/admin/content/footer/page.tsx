"use client";

import { useState } from "react";
import { AdminHeader } from "../../_components/AdminHeader";
import { SectionCard, Field, TextArea, Button, Toggle, SaveBar, useSavedFlash } from "../../_components/ui";

interface LinkItem { id: number; label: string; href: string; visible: boolean }

let uid = 100;

export default function FooterEditorPage() {
  const { saved, flash } = useSavedFlash();

  const [about, setAbout] = useState("Supremo manufactures triple-layer water tanks, ISI-certified PVC pipes, planters and utility products across four ISO-certified plants.");
  const [contact, setContact] = useState({ phone: "+91 98765 43210", email: "info@supremo.com", address: "Plot 14, Industrial Area, Indore, MP 452015" });
  const [social, setSocial] = useState({ facebook: "https://facebook.com/supremo", instagram: "https://instagram.com/supremo", linkedin: "https://linkedin.com/company/supremo", youtube: "" });
  const [copyright, setCopyright] = useState("© 2026 Supremo Polymers Pvt. Ltd. All rights reserved.");

  const [quickLinks, setQuickLinks] = useState<LinkItem[]>([
    { id: 1, label: "Products", href: "/products", visible: true },
    { id: 2, label: "Dealership", href: "/dealership", visible: true },
    { id: 3, label: "About Us", href: "/about", visible: true },
    { id: 4, label: "Contact", href: "/contact", visible: true },
  ]);
  const [resourceLinks, setResourceLinks] = useState<LinkItem[]>([
    { id: 11, label: "Download Catalogue", href: "/catalogue.pdf", visible: true },
    { id: 12, label: "Certifications", href: "/about#certifications", visible: true },
    { id: 13, label: "Blog & News", href: "/blog", visible: true },
  ]);

  function makeColumnHandlers(list: LinkItem[], setList: React.Dispatch<React.SetStateAction<LinkItem[]>>) {
    return {
      update: (id: number, key: keyof LinkItem, value: string | boolean) => setList((prev) => prev.map((l) => (l.id === id ? { ...l, [key]: value } : l))),
      remove: (id: number) => setList((prev) => prev.filter((l) => l.id !== id)),
      add: () => setList((prev) => [...prev, { id: ++uid, label: "New Link", href: "/", visible: true }]),
      move: (i: number, dir: -1 | 1) => setList((prev) => {
        const j = i + dir;
        if (j < 0 || j >= prev.length) return prev;
        const next = [...prev];
        [next[i], next[j]] = [next[j], next[i]];
        return next;
      }),
    };
  }

  const quick = makeColumnHandlers(quickLinks, setQuickLinks);
  const resources = makeColumnHandlers(resourceLinks, setResourceLinks);

  function LinkColumn({ title, list, h }: { title: string; list: LinkItem[]; h: ReturnType<typeof makeColumnHandlers> }) {
    return (
      <SectionCard title={title} description="Footer link column" right={<Button size="sm" onClick={h.add}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>Add link</Button>}>
        {list.map((l, i) => (
          <div key={l.id} style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <button onClick={() => h.move(i, -1)} disabled={i === 0} style={{ ...moveBtn, opacity: i === 0 ? 0.4 : 1 }}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 15l-6-6-6 6" /></svg></button>
              <button onClick={() => h.move(i, 1)} disabled={i === list.length - 1} style={{ ...moveBtn, opacity: i === list.length - 1 ? 0.4 : 1 }}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg></button>
            </div>
            <input value={l.label} onChange={(e) => h.update(l.id, "label", e.target.value)} placeholder="Label" style={inp(150)} />
            <input value={l.href} onChange={(e) => h.update(l.id, "href", e.target.value)} placeholder="/path" style={{ ...inp(0), flex: 1, fontFamily: "monospace", fontSize: 13 }} />
            <Toggle on={l.visible} onToggle={() => h.update(l.id, "visible", !l.visible)} />
            <button onClick={() => h.remove(l.id)} title="Remove" style={delBtn}
              onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = "#fef2f2"; el.style.color = "#dc2626"; el.style.borderColor = "#fecaca"; }}
              onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = "transparent"; el.style.color = "var(--muted)"; el.style.borderColor = "var(--line)"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /></svg>
            </button>
          </div>
        ))}
      </SectionCard>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader title="Footer" breadcrumb={[{ label: "Content", href: "/admin/content" }, { label: "Footer" }]} />

      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 18, maxWidth: 820 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "var(--blue-50)", border: "1px solid var(--blue-200)", borderRadius: "var(--r-sm)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
          <span style={{ fontSize: 12.5, color: "var(--blue-800)" }}>The header navigation is fixed and not editable. Only footer content below can be changed.</span>
        </div>

        <SectionCard title="About Blurb" description="Short paragraph shown in the footer">
          <TextArea label="Footer About Text" value={about} onChange={setAbout} rows={3} />
        </SectionCard>

        <LinkColumn title="Quick Links" list={quickLinks} h={quick} />
        <LinkColumn title="Resources" list={resourceLinks} h={resources} />

        <SectionCard title="Contact Details" description="Shown in the footer and contact page">
          <Field label="Phone" value={contact.phone} onChange={(v) => setContact({ ...contact, phone: v })} />
          <Field label="Email" value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} type="email" />
          <Field label="Address" value={contact.address} onChange={(v) => setContact({ ...contact, address: v })} />
        </SectionCard>

        <SectionCard title="Social Links" description="Leave blank to hide an icon">
          <div className="adm-cols-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Field label="Facebook" value={social.facebook} onChange={(v) => setSocial({ ...social, facebook: v })} />
            <Field label="Instagram" value={social.instagram} onChange={(v) => setSocial({ ...social, instagram: v })} />
            <Field label="LinkedIn" value={social.linkedin} onChange={(v) => setSocial({ ...social, linkedin: v })} />
            <Field label="YouTube" value={social.youtube} onChange={(v) => setSocial({ ...social, youtube: v })} placeholder="https://…" />
          </div>
        </SectionCard>

        <SectionCard title="Copyright" description="Bottom bar text">
          <Field label="Copyright Text" value={copyright} onChange={setCopyright} />
        </SectionCard>

        <SaveBar saved={saved} onSave={flash} />
      </main>
    </div>
  );
}

function inp(width: number): React.CSSProperties {
  return { height: 38, width: width || undefined, padding: "0 12px", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", font: "inherit", fontSize: 13.5, color: "var(--ink)", background: "var(--paper-2)", outline: "none" };
}
const moveBtn: React.CSSProperties = { width: 22, height: 16, border: "1px solid var(--line)", borderRadius: 4, background: "var(--paper-2)", cursor: "pointer", color: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center" };
const delBtn: React.CSSProperties = { width: 34, height: 38, borderRadius: "var(--r-sm)", border: "1px solid var(--line)", background: "transparent", cursor: "pointer", color: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center" };
