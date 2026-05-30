"use client";

import { useRef, useState } from "react";
import { AdminHeader } from "../../_components/AdminHeader";
import { SectionCard, Field, TextArea, Toggle, ToggleRow, Button, SaveBar, useSavedFlash } from "../../_components/ui";

interface HeroState {
  bgType: "video" | "image";
  videoUrl: string;
  videoName: string;
  overlayDark: number; // 0-80
  align: "left" | "center";
  showEyebrow: boolean;
  eyebrow: string;
  heading: string;
  headingAccent: string;
  showSub: boolean;
  sub: string;
  showPrimary: boolean;
  primaryLabel: string;
  primaryLink: string;
  showSecondary: boolean;
  secondaryLabel: string;
  secondaryLink: string;
  showScrollCue: boolean;
}

const DEFAULT: HeroState = {
  bgType: "video",
  videoUrl: "/vidoes/supremo_film.mp4",
  videoName: "supremo_film.mp4",
  overlayDark: 30,
  align: "left",
  showEyebrow: true,
  eyebrow: "Pan-India Polymer Manufacturer",
  heading: "Built to Hold",
  headingAccent: "India's Water.",
  showSub: true,
  sub: "Triple-layer water tanks, ISI-certified PVC pipes, planters and utility products — manufactured in four ISO-certified plants and trusted by 1,200+ dealers across 22 states.",
  showPrimary: true,
  primaryLabel: "Become a Dealer",
  primaryLink: "/dealership",
  showSecondary: true,
  secondaryLabel: "Download Catalogue",
  secondaryLink: "/catalogue.pdf",
  showScrollCue: true,
};

export default function HeroEditorPage() {
  const [s, setS] = useState<HeroState>(DEFAULT);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const { saved, flash } = useSavedFlash();
  const fileRef = useRef<HTMLInputElement>(null);

  function set<K extends keyof HeroState>(key: K, value: HeroState[K]) {
    setS((prev) => ({ ...prev, [key]: value }));
  }

  function handleVideo(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setS((prev) => ({ ...prev, videoUrl: url, videoName: f.name, bgType: "video" }));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader title="Hero Section" breadcrumb={[{ label: "Content", href: "/admin/content" }, { label: "Hero Section" }]} />

      <main className="adm-split-420" style={{ flex: 1, padding: "28px", display: "grid", gridTemplateColumns: "minmax(0, 420px) 1fr", gap: 22, alignItems: "start" }}>

        {/* ── LEFT: controls ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

          {/* Background */}
          <SectionCard title="Background" description="The full-screen media behind the hero text">
            <input ref={fileRef} type="file" accept="video/*" onChange={handleVideo} style={{ display: "none" }} />
            <div style={{ display: "flex", gap: 8 }}>
              {(["video", "image"] as const).map((t) => (
                <button key={t} onClick={() => set("bgType", t)} style={{ flex: 1, height: 38, borderRadius: "var(--r-sm)", border: `1px solid ${s.bgType === t ? "var(--blue-600)" : "var(--line)"}`, background: s.bgType === t ? "var(--blue-50)" : "var(--paper-2)", color: s.bgType === t ? "var(--blue-700)" : "var(--muted)", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-display)", cursor: "pointer", textTransform: "capitalize" }}>
                  {t}
                </button>
              ))}
            </div>

            <div style={{ border: "2px dashed var(--line)", borderRadius: "var(--r-md)", padding: "20px", textAlign: "center", background: "var(--paper-2)" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 8px" }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" /></svg>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>Upload {s.bgType}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>MP4 / WebM up to 50 MB — preview updates instantly</div>
              <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()} style={{ marginTop: 12 }}>
                Choose File
              </Button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "var(--paper-2)", borderRadius: "var(--r-sm)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2" strokeLinecap="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>
              <span style={{ fontSize: 12.5, color: "var(--slate)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.videoName}</span>
              <span style={{ fontSize: 11, color: "var(--ok)", fontWeight: 600 }}>Current</span>
            </div>

            <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, fontFamily: "var(--font-display)" }}>Overlay Darkness — {s.overlayDark}%</span>
              <input type="range" min={0} max={80} value={s.overlayDark} onChange={(e) => set("overlayDark", Number(e.target.value))} style={{ accentColor: "var(--blue-600)" }} />
            </label>
          </SectionCard>

          {/* Headline */}
          <SectionCard title="Headline & Text" description="Toggle any element off to remove it from the hero">
            <ToggleRow label="Eyebrow label" description="Small text above the heading" on={s.showEyebrow} onToggle={() => set("showEyebrow", !s.showEyebrow)} />
            {s.showEyebrow && <Field label="Eyebrow Text" value={s.eyebrow} onChange={(v) => set("eyebrow", v)} placeholder="e.g. Pan-India Polymer Manufacturer" />}

            <div style={{ height: 1, background: "var(--line-2)" }} />

            <Field label="Heading" value={s.heading} onChange={(v) => set("heading", v)} placeholder="Main heading" />
            <Field label="Heading (highlighted part)" value={s.headingAccent} onChange={(v) => set("headingAccent", v)} hint="Shown in blue accent colour" />

            <div style={{ height: 1, background: "var(--line-2)" }} />

            <ToggleRow label="Sub-heading paragraph" on={s.showSub} onToggle={() => set("showSub", !s.showSub)} />
            {s.showSub && <TextArea label="Sub-heading" value={s.sub} onChange={(v) => set("sub", v)} rows={4} />}

            <div style={{ height: 1, background: "var(--line-2)" }} />

            <div>
              <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, fontFamily: "var(--font-display)" }}>Text Alignment</span>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                {(["left", "center"] as const).map((a) => (
                  <button key={a} onClick={() => set("align", a)} style={{ flex: 1, height: 36, borderRadius: "var(--r-sm)", border: `1px solid ${s.align === a ? "var(--blue-600)" : "var(--line)"}`, background: s.align === a ? "var(--blue-50)" : "var(--paper-2)", color: s.align === a ? "var(--blue-700)" : "var(--muted)", fontSize: 12.5, fontWeight: 600, fontFamily: "var(--font-display)", cursor: "pointer", textTransform: "capitalize" }}>{a}</button>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* Buttons */}
          <SectionCard title="Call-to-Action Buttons">
            <ToggleRow label="Primary button" on={s.showPrimary} onToggle={() => set("showPrimary", !s.showPrimary)} />
            {s.showPrimary && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="Label" value={s.primaryLabel} onChange={(v) => set("primaryLabel", v)} />
                <Field label="Link" value={s.primaryLink} onChange={(v) => set("primaryLink", v)} />
              </div>
            )}
            <div style={{ height: 1, background: "var(--line-2)" }} />
            <ToggleRow label="Secondary button" on={s.showSecondary} onToggle={() => set("showSecondary", !s.showSecondary)} />
            {s.showSecondary && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="Label" value={s.secondaryLabel} onChange={(v) => set("secondaryLabel", v)} />
                <Field label="Link" value={s.secondaryLink} onChange={(v) => set("secondaryLink", v)} />
              </div>
            )}
            <div style={{ height: 1, background: "var(--line-2)" }} />
            <ToggleRow label="Scroll cue" description="Animated 'Scroll' hint at the bottom" on={s.showScrollCue} onToggle={() => set("showScrollCue", !s.showScrollCue)} />
          </SectionCard>

          <SaveBar saved={saved} onSave={flash} onReset={() => setS(DEFAULT)} />
        </div>

        {/* ── RIGHT: live preview ── */}
        <div style={{ position: "sticky", top: 92, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--ok)" }} />
              <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--ink)" }}>Live Preview</span>
            </div>
            <div style={{ display: "flex", gap: 3, background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", padding: 3 }}>
              {(["desktop", "mobile"] as const).map((d) => (
                <button key={d} onClick={() => setDevice(d)} style={{ height: 28, padding: "0 12px", borderRadius: 6, border: "none", background: device === d ? "var(--blue-600)" : "transparent", color: device === d ? "#fff" : "var(--muted)", fontSize: 12, fontWeight: 600, fontFamily: "var(--font-display)", cursor: "pointer", textTransform: "capitalize" }}>{d}</button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", background: "var(--paper-2)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", padding: device === "mobile" ? 20 : 0, overflow: "hidden" }}>
            <HeroPreview s={s} mobile={device === "mobile"} />
          </div>
          <p style={{ fontSize: 12, color: "var(--muted)", textAlign: "center" }}>This is exactly how the hero will appear on the homepage.</p>
        </div>
      </main>
    </div>
  );
}

function HeroPreview({ s, mobile }: { s: HeroState; mobile: boolean }) {
  const width = mobile ? 300 : "100%";
  const height = mobile ? 540 : 460;
  const alignItems = s.align === "center" ? "center" : "flex-start";
  const textAlign = s.align === "center" ? "center" : "left";

  return (
    <div style={{ position: "relative", width, height, borderRadius: mobile ? 24 : "var(--r-md)", overflow: "hidden", background: "#010c1d", boxShadow: mobile ? "0 12px 40px -12px rgba(10,22,40,.4)" : "none", border: mobile ? "8px solid #0A1628" : "none" }}>
      {/* Background video */}
      {s.bgType === "video" ? (
        <video key={s.videoUrl} src={s.videoUrl} autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#041530,#0c2c66)" }} />
      )}

      {/* Overlay darkness */}
      <div style={{ position: "absolute", inset: 0, background: `rgba(1,8,15,${s.overlayDark / 100})` }} />

      {/* Content */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: mobile ? "0 22px" : "0 44px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems, textAlign, maxWidth: s.align === "center" ? "100%" : "62ch", margin: s.align === "center" ? "0 auto" : 0 }}>
          {s.showEyebrow && s.eyebrow && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 600, fontSize: mobile ? 10 : 11.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--blue-400)", fontFamily: "var(--font-display)", marginBottom: 14 }}>
              <span style={{ width: 24, height: 1, background: "var(--blue-400)" }} />
              {s.eyebrow}
            </span>
          )}
          <h1 style={{ color: "#fff", fontSize: mobile ? 30 : 50, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, textShadow: "0 2px 16px rgba(0,0,0,.3)" }}>
            {s.heading} {s.headingAccent && <span style={{ color: "var(--blue-400)" }}>{s.headingAccent}</span>}
          </h1>
          {s.showSub && s.sub && (
            <p style={{ color: "rgba(255,255,255,.8)", fontSize: mobile ? 13 : 15.5, lineHeight: 1.65, marginTop: 16, maxWidth: "54ch", textShadow: "0 1px 8px rgba(0,0,0,.4)" }}>
              {s.sub}
            </p>
          )}
          {(s.showPrimary || s.showSecondary) && (
            <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap", justifyContent: s.align === "center" ? "center" : "flex-start" }}>
              {s.showPrimary && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, height: mobile ? 40 : 46, padding: "0 20px", borderRadius: 999, background: "var(--blue-600)", color: "#fff", fontWeight: 600, fontSize: mobile ? 13 : 14, fontFamily: "var(--font-display)" }}>
                  {s.primaryLabel}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M7 17L17 7M9 7h8v8" /></svg>
                </span>
              )}
              {s.showSecondary && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, height: mobile ? 40 : 46, padding: "0 20px", borderRadius: 999, background: "#fff", color: "var(--ink)", fontWeight: 600, fontSize: mobile ? 13 : 14, fontFamily: "var(--font-display)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                  {s.secondaryLabel}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Scroll cue */}
      {s.showScrollCue && (
        <div style={{ position: "absolute", left: "50%", bottom: 14, transform: "translateX(-50%)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,.5)", fontWeight: 600, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          Scroll
          <span style={{ width: 1, height: 24, background: "linear-gradient(180deg,transparent,rgba(255,255,255,.55))" }} />
        </div>
      )}
    </div>
  );
}
