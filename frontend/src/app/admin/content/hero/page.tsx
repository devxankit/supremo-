"use client";

import { useRef, useState, useEffect } from "react";
import { AdminHeader } from "../../_components/AdminHeader";
import { SectionCard, Field, TextArea, ToggleRow, Button, SaveBar, useSavedFlash } from "../../_components/ui";
import { adminAuth } from "../../_services/adminAuth";
import { LazyImage } from "@/components/LazyImage";

interface HeroState {
  bgType: "video" | "image";
  videoUrl: string;
  videoName: string;
  imageUrl: string;
  imageName: string;
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
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  feature4Title: string;
  feature4Desc: string;
  feature5Title: string;
  feature5Desc: string;
}

const DEFAULT: HeroState = {
  bgType: "video",
  videoUrl: "/vidoes/supremo_film.mp4",
  videoName: "supremo_film.mp4",
  imageUrl: "/images/img_hero.png",
  imageName: "img_hero.png",
  overlayDark: 30,
  align: "left",
  showEyebrow: true,
  eyebrow: "Pan-India Polymer Manufacturer",
  heading: "Built to Hold",
  headingAccent: "India's Water.",
  showSub: true,
  sub: "Triple-layer water tanks, ISI-certified PVC pipes, planters and utility products — manufactured in four ISO-certified plants and trusted by our extensive dealer network across 22 states.",
  showPrimary: true,
  primaryLabel: "Become a Dealer",
  primaryLink: "/dealership",
  showSecondary: true,
  secondaryLabel: "Download Catalogue",
  secondaryLink: "javascript:void(0)",
  showScrollCue: true,
  feature1Title: "8-Layer Strength",
  feature1Desc: "Extra tough design for every need",
  feature2Title: "Food-Grade Safe",
  feature2Desc: "Ensuring healthy water for your family",
  feature3Title: "Weather Resistant",
  feature3Desc: "Built to endure extreme Indian climates",
  feature4Title: "Long-Lasting Life",
  feature4Desc: "Highly durable design trusted for decades",
  feature5Title: "Premium Quality",
  feature5Desc: "Engineered in our ISO-certified plants",
};

export default function HeroEditorPage() {
  const [s, setS] = useState<HeroState>(DEFAULT);
  const [activeTab, setActiveTab] = useState<"video" | "image">("video");
  const [device] = useState<"desktop" | "mobile">("desktop");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { saved, flash } = useSavedFlash();
  const fileRef = useRef<HTMLInputElement>(null);
  const pdfFileRef = useRef<HTMLInputElement>(null);
  const [pdfUploading, setPdfUploading] = useState(false);

  const fetchHeroContent = () => {
    setLoading(true);
    setErrorMsg("");
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/hero`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to retrieve hero section settings.");
        return res.json();
      })
      .then((data) => {
        setS({
          bgType: data.bgType || "video",
          videoUrl: data.videoUrl || "/vidoes/supremo_film.mp4",
          videoName: data.videoName || "supremo_film.mp4",
          imageUrl: data.imageUrl || "/images/img_hero.png",
          imageName: data.imageName || "img_hero.png",
          overlayDark: data.overlayDark ?? 30,
          align: data.align || "left",
          showEyebrow: data.showEyebrow ?? true,
          eyebrow: data.eyebrow || "",
          heading: data.heading || "",
          headingAccent: data.headingAccent || "",
          showSub: data.showSub ?? true,
          sub: data.sub || "",
          showPrimary: data.showPrimary ?? true,
          primaryLabel: data.primaryLabel || "",
          primaryLink: data.primaryLink || "",
          showSecondary: data.showSecondary ?? true,
          secondaryLabel: data.secondaryLabel || "",
          secondaryLink: data.secondaryLink || "",
          showScrollCue: data.showScrollCue ?? true,
          feature1Title: data.feature1Title || "8-Layer Strength",
          feature1Desc: data.feature1Desc || "Extra tough design for every need",
          feature2Title: data.feature2Title || "Food-Grade Safe",
          feature2Desc: data.feature2Desc || "Ensuring healthy water for your family",
          feature3Title: data.feature3Title || "Weather Resistant",
          feature3Desc: data.feature3Desc || "Built to endure extreme Indian climates",
          feature4Title: data.feature4Title || "Long-Lasting Life",
          feature4Desc: data.feature4Desc || "Highly durable design trusted for decades",
          feature5Title: data.feature5Title || "Premium Quality",
          feature5Desc: data.feature5Desc || "Engineered in our ISO-certified plants",
        });
        setActiveTab(data.bgType || "video");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading hero details:", err);
        setErrorMsg("Failed to load hero section data from the server.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchHeroContent();
  }, []);

  function set<K extends keyof HeroState>(key: K, value: HeroState[K]) {
    setS((prev) => ({ ...prev, [key]: value }));
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;

    const user = adminAuth.getUser();
    if (!user) {
      alert("Not authenticated. Please log in.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", f);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/media/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "File upload failed.");
      }

      const data = await res.json();
      if (activeTab === "video") {
        setS((prev) => ({ ...prev, videoUrl: data.url, videoName: f.name }));
      } else {
        setS((prev) => ({ ...prev, imageUrl: data.url, imageName: f.name }));
      }
      alert(`${activeTab.toUpperCase()} uploaded successfully to Cloudinary!`);
    } catch (err: any) {
      console.error(err);
      alert("Upload error: " + err.message);
    } finally {
      setUploading(false);
    }
  }

  async function handlePdfUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;

    const user = adminAuth.getUser();
    if (!user) {
      alert("Not authenticated. Please log in.");
      return;
    }

    setPdfUploading(true);

    const formData = new FormData();
    formData.append("file", f);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/media/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "PDF upload failed.");
      }

      const data = await res.json();
      setS((prev) => ({ ...prev, secondaryLink: data.url }));
      alert("PDF uploaded successfully to Cloudinary!");
    } catch (err: any) {
      console.error(err);
      alert("Upload error: " + err.message);
    } finally {
      setPdfUploading(false);
    }
  }

  const handleSave = async () => {
    const user = adminAuth.getUser();
    if (!user) {
      alert("Not authenticated. Please log in.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/hero`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(s),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update hero details.");
      }

      flash(); // Show the 'Saved!' visual feedback
      alert("Hero section updated successfully!");
    } catch (err: any) {
      console.error(err);
      alert("Failed to save changes: " + err.message);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <AdminHeader title="Hero Section" breadcrumb={[{ label: "Content" }, { label: "Hero Section" }]} />
        <main style={{ flex: 1, padding: "28px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", border: "3px solid var(--line)", borderTopColor: "var(--blue-600)", animation: "spin 1s linear infinite" }} />
            <div style={{ fontSize: 13, color: "var(--muted)" }}>Loading Hero data...</div>
          </div>
          <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }` }} />
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader title="Hero Section" breadcrumb={[{ label: "Content" }, { label: "Hero Section" }]} />

      {errorMsg && (
        <div style={{ margin: "28px 28px 0", background: "rgba(239, 68, 68, 0.08)", border: "1px solid #EF4444", color: "#b91c1c", padding: "12px 18px", borderRadius: "var(--r-sm)", fontSize: 14 }}>
          {errorMsg}
        </div>
      )}

      <main className="adm-split-420" style={{ flex: 1, padding: "28px", display: "grid", gridTemplateColumns: "minmax(0, 420px) 1fr", gap: 22, alignItems: "start" }}>

        {/* ── LEFT: controls ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

          {/* Background */}
          <SectionCard title="Background" description="The full-screen media behind the hero text">
            <ToggleRow
              label="Active Website Background"
              description="Toggle ON to display Video background, OFF to display Image background on user side"
              on={s.bgType === "video"}
              onToggle={() => set("bgType", s.bgType === "video" ? "image" : "video")}
            />

            <div style={{ height: 1, background: "var(--line-2)", margin: "8px 0" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, fontFamily: "var(--font-display)" }}>
                Editor Asset View
              </span>
              <div style={{ display: "flex", gap: 8 }}>
                {(["video", "image"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setActiveTab(t)}
                    style={{
                      flex: 1,
                      height: 38,
                      borderRadius: "var(--r-sm)",
                      border: `1px solid ${activeTab === t ? "var(--blue-600)" : "var(--line)"}`,
                      background: activeTab === t ? "var(--blue-50)" : "var(--paper-2)",
                      color: activeTab === t ? "var(--blue-700)" : "var(--muted)",
                      fontSize: 13,
                      fontWeight: 600,
                      fontFamily: "var(--font-display)",
                      cursor: "pointer",
                      textTransform: "capitalize"
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <input ref={fileRef} type="file" accept={activeTab === "video" ? "video/*" : "image/*"} onChange={handleFileUpload} style={{ display: "none" }} />

            <div style={{ border: "2px dashed var(--line)", borderRadius: "var(--r-md)", padding: "20px", textAlign: "center", background: "var(--paper-2)" }}>
              {uploading ? (
                <div style={{ padding: "12px 0" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", border: "3px solid var(--line)", borderTopColor: "var(--blue-600)", animation: "spin 1s linear infinite", margin: "0 auto 8px" }} />
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>Uploading file to Cloudinary...</div>
                </div>
              ) : (
                <>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 8px" }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" /></svg>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>Upload {activeTab}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>
                    {activeTab === "video" ? "MP4 / WebM up to 50 MB" : "PNG / JPEG up to 10 MB"} — updates instantly
                  </div>
                  <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()} style={{ marginTop: 12 }}>
                    Choose File
                  </Button>
                </>
              )}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "var(--paper-2)", borderRadius: "var(--r-sm)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2" strokeLinecap="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>
              <span style={{ fontSize: 12.5, color: "var(--slate)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {activeTab === "video" ? s.videoName : s.imageName}
              </span>
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
              <div>
                <Field label="Label" value={s.primaryLabel} onChange={(v) => set("primaryLabel", v)} />
              </div>
            )}
            <div style={{ height: 1, background: "var(--line-2)" }} />
            <ToggleRow label="Secondary button" on={s.showSecondary} onToggle={() => set("showSecondary", !s.showSecondary)} />
            {s.showSecondary && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Field label="Label" value={s.secondaryLabel} onChange={(v) => set("secondaryLabel", v)} />
                
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, fontFamily: "var(--font-display)" }}>
                    PDF Document (Catalogue)
                  </span>
                  
                  <input
                    ref={pdfFileRef}
                    type="file"
                    accept="application/pdf"
                    onChange={handlePdfUpload}
                    style={{ display: "none" }}
                  />
                  
                  <div style={{
                    border: "2px dashed var(--line)",
                    borderRadius: "var(--r-md)",
                    padding: "16px",
                    textAlign: "center",
                    background: "var(--paper-2)"
                  }}>
                    {pdfUploading ? (
                      <div>
                        <div style={{ width: 20, height: 20, borderRadius: "50%", border: "2.5px solid var(--line)", borderTopColor: "var(--blue-600)", animation: "spin 1s linear infinite", margin: "0 auto 6px" }} />
                        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>Uploading PDF...</div>
                      </div>
                    ) : (
                      <>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 6px" }}>
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="12" y1="18" x2="12" y2="12" />
                          <polyline points="9 15 12 12 15 15" />
                        </svg>
                        <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>Upload PDF Document</div>
                        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>Only PDF format supported</div>
                        <Button
                          variant="outline"
                          size="sm"
                          type="button"
                          onClick={() => pdfFileRef.current?.click()}
                          style={{ marginTop: 8 }}
                        >
                          Choose PDF
                        </Button>
                      </>
                    )}
                  </div>
                  
                  {s.secondaryLink && s.secondaryLink !== "javascript:void(0)" && s.secondaryLink !== "/" && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", background: "var(--paper-2)", borderRadius: "var(--r-sm)", border: "1px solid var(--line-2)" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                      <span style={{ fontSize: 12, color: "var(--slate)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {s.secondaryLink.split("/").pop()}
                      </span>
                      <a
                        href={s.secondaryLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: 11, color: "var(--blue-600)", fontWeight: 600, textDecoration: "none" }}
                      >
                        View
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div style={{ height: 1, background: "var(--line-2)" }} />
            <ToggleRow label="Scroll cue" description="Animated 'Scroll' hint at the bottom" on={s.showScrollCue} onToggle={() => set("showScrollCue", !s.showScrollCue)} />
          </SectionCard>

          {/* Bottom Features Panel (only for Image background) */}
          <SectionCard title="Bottom Features Panel" description="Badge items displayed at the bottom of the hero (only visible when using Image background on homepage)">
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Feature 1 */}
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--blue-600)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Feature 1</span>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 12, marginTop: 6 }}>
                  <Field label="Title" value={s.feature1Title} onChange={(v) => set("feature1Title", v)} />
                  <Field label="Description" value={s.feature1Desc} onChange={(v) => set("feature1Desc", v)} />
                </div>
              </div>
              
              <div style={{ height: 1, background: "var(--line-2)" }} />

              {/* Feature 2 */}
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--blue-600)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Feature 2</span>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 12, marginTop: 6 }}>
                  <Field label="Title" value={s.feature2Title} onChange={(v) => set("feature2Title", v)} />
                  <Field label="Description" value={s.feature2Desc} onChange={(v) => set("feature2Desc", v)} />
                </div>
              </div>

              <div style={{ height: 1, background: "var(--line-2)" }} />

              {/* Feature 3 */}
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--blue-600)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Feature 3</span>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 12, marginTop: 6 }}>
                  <Field label="Title" value={s.feature3Title} onChange={(v) => set("feature3Title", v)} />
                  <Field label="Description" value={s.feature3Desc} onChange={(v) => set("feature3Desc", v)} />
                </div>
              </div>

              <div style={{ height: 1, background: "var(--line-2)" }} />

              {/* Feature 4 */}
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--blue-600)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Feature 4</span>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 12, marginTop: 6 }}>
                  <Field label="Title" value={s.feature4Title} onChange={(v) => set("feature4Title", v)} />
                  <Field label="Description" value={s.feature4Desc} onChange={(v) => set("feature4Desc", v)} />
                </div>
              </div>

              <div style={{ height: 1, background: "var(--line-2)" }} />

              {/* Feature 5 */}
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--blue-600)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Feature 5</span>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 12, marginTop: 6 }}>
                  <Field label="Title" value={s.feature5Title} onChange={(v) => set("feature5Title", v)} />
                  <Field label="Description" value={s.feature5Desc} onChange={(v) => set("feature5Desc", v)} />
                </div>
              </div>
            </div>
          </SectionCard>

          <SaveBar saved={saved} onSave={handleSave} onReset={fetchHeroContent} />
        </div>

        {/* ── RIGHT: live preview ── */}
        <div style={{ position: "sticky", top: 92, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--ok)" }} />
              <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--ink)" }}>Live Preview</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "center", background: "var(--paper-2)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", padding: device === "mobile" ? 20 : 0, overflow: "hidden" }}>
              <HeroPreview s={s} mobile={device === "mobile"} />
            </div>

            {/* Bottom Features Panel Preview */}
            {s.bgType === "image" && (
              <div style={{
                background: "#ffffff",
                border: "1px solid rgba(15, 23, 42, 0.08)",
                borderRadius: "16px",
                padding: "20px 24px",
                boxShadow: "0 10px 30px -10px rgba(10, 22, 40, 0.08)",
                display: "grid",
                gridTemplateColumns: device === "mobile" ? "1fr" : "repeat(5, 1fr)",
                gap: "16px",
                width: "100%"
              }}>
                {/* 1: Strength */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#e6f0ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <LayersIcon />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 13, color: "#0a1628", marginBottom: 2, lineHeight: 1.2 }}>{s.feature1Title || "8-Layer Strength"}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.3 }}>{s.feature1Desc || "Extra tough design for every need"}</div>
                  </div>
                </div>

                {/* 2: Food Grade */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#e6f0ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <ShieldCheckIcon />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 13, color: "#0a1628", marginBottom: 2, lineHeight: 1.2 }}>{s.feature2Title || "Food-Grade Safe"}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.3 }}>{s.feature2Desc || "Ensuring healthy water for your family"}</div>
                  </div>
                </div>

                {/* 3: Weather Resistant */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#e6f0ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <SunIcon />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 13, color: "#0a1628", marginBottom: 2, lineHeight: 1.2 }}>{s.feature3Title || "Weather Resistant"}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.3 }}>{s.feature3Desc || "Built to endure extreme Indian climates"}</div>
                  </div>
                </div>

                {/* 4: Long Lasting */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#e6f0ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <DoubleChevronIcon />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 13, color: "#0a1628", marginBottom: 2, lineHeight: 1.2 }}>{s.feature4Title || "Long-Lasting Life"}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.3 }}>{s.feature4Desc || "Highly durable design trusted for decades"}</div>
                  </div>
                </div>

                {/* 5: Premium Quality */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#e6f0ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <FactoryIcon />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 13, color: "#0a1628", marginBottom: 2, lineHeight: 1.2 }}>{s.feature5Title || "Premium Quality"}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.3 }}>{s.feature5Desc || "Engineered in our ISO-certified plants"}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <p style={{ fontSize: 12, color: "var(--muted)", textAlign: "center" }}>This is exactly how the hero will appear on the homepage.</p>

          {/* Standing Video Player under Live Preview */}
          {activeTab === "video" && s.videoUrl && s.videoUrl !== "/vidoes/supremo_film.mp4" && !s.videoUrl.startsWith("/vidoes/") && (
            <div style={{
              background: "var(--paper)",
              borderRadius: "var(--r-md)",
              border: "1px solid var(--line-2)",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginTop: 16,
              boxShadow: "var(--sh-sm)",
              maxWidth: "420px",
              width: "100%"
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2.5"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>
                  <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--ink)" }}>Uploaded Video File</span>
                </div>
              </div>
              
              <video
                key={s.videoUrl}
                src={s.videoUrl}
                controls
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "var(--r-sm)",
                  background: "#010c1d",
                  border: "1px solid var(--line-2)"
                }}
              />
              
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={s.videoName}>
                  File: {s.videoName}
                </div>
              </div>
            </div>
          )}

          {/* Standing Image Preview under Live Preview */}
          {activeTab === "image" && s.imageUrl && s.imageUrl !== "/images/img_hero.png" && !s.imageUrl.startsWith("/images/") && (
            <div style={{
              background: "var(--paper)",
              borderRadius: "var(--r-md)",
              border: "1px solid var(--line-2)",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginTop: 16,
              boxShadow: "var(--sh-sm)",
              maxWidth: "420px",
              width: "100%"
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                  <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--ink)" }}>Uploaded Image File</span>
                </div>
              </div>
              
              <LazyImage
                key={s.imageUrl}
                src={s.imageUrl}
                alt="Uploaded Background"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "var(--r-sm)",
                  background: "#010c1d",
                  border: "1px solid var(--line-2)",
                  objectFit: "contain"
                }}
              />
              
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={s.imageName}>
                  File: {s.imageName}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }` }} />
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
      {/* Background video / image */}
      {s.bgType === "video" ? (
        <video key={s.videoUrl} src={s.videoUrl} autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <>
          <LazyImage
            src={s.imageUrl || "/images/img_hero.png"}
            alt="Background Media"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* Readability sky glow overlay */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 0% 0%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.2) 60%, transparent 100%)", zIndex: 1, pointerEvents: "none" }} />
        </>
      )}

      {/* Overlay darkness */}
      <div style={{ position: "absolute", inset: 0, background: `rgba(1,8,15,${s.overlayDark / 100})`, zIndex: 2 }} />

      {/* Content */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: mobile ? "0 22px" : "0 44px", zIndex: 3 }}>
        <div style={{ display: "grid", gridTemplateColumns: s.bgType === "image" && !mobile ? "1.2fr 0.8fr" : "1fr", gap: 20, alignItems: "center", width: "100%" }}>
          
          <div style={{ display: "flex", flexDirection: "column", alignItems, textAlign, maxWidth: s.align === "center" ? "100%" : "62ch", margin: s.align === "center" ? "0 auto" : 0 }}>
            {s.showEyebrow && s.eyebrow && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 600, fontSize: mobile ? 10 : 11.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--blue-400)", fontFamily: "var(--font-display)", marginBottom: 14 }}>
                <span style={{ width: 24, height: 1, background: "var(--blue-400)" }} />
                {s.eyebrow}
              </span>
            )}
            <h1 style={{ color: "#fff", fontSize: mobile ? 28 : 46, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, textShadow: "0 2px 16px rgba(0,0,0,.3)" }}>
              {s.heading} {s.headingAccent && <span style={{ color: "var(--blue-600)" }}>{s.headingAccent}</span>}
            </h1>
            {s.showSub && s.sub && (
              <p style={{ color: "rgba(255,255,255,.8)", fontSize: mobile ? 13 : 15, lineHeight: 1.65, marginTop: 16, maxWidth: "54ch", textShadow: "0 1px 8px rgba(0,0,0,.4)" }}>
                {s.sub}
              </p>
            )}
            {(s.showPrimary || s.showSecondary) && (
              <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap", justifyContent: s.align === "center" ? "center" : "flex-start" }}>
                {s.showPrimary && (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, height: mobile ? 38 : 42, padding: "0 18px", borderRadius: 999, background: "var(--blue-600)", color: "#fff", fontWeight: 600, fontSize: mobile ? 12.5 : 13.5, fontFamily: "var(--font-display)" }}>
                    {s.primaryLabel}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M7 17L17 7M9 7h8v8" /></svg>
                  </span>
                )}
                {s.showSecondary && (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, height: mobile ? 38 : 42, padding: "0 18px", borderRadius: 999, background: "#fff", color: "var(--ink)", fontWeight: 600, fontSize: mobile ? 12.5 : 13.5, fontFamily: "var(--font-display)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                    {s.secondaryLabel}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Product Image preview for image backgrounds */}
          {s.bgType === "image" && (
            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
              <LazyImage
                src="/images/img_hero.png"
                alt="Preview Products"
                style={{
                  width: "100%",
                  maxHeight: mobile ? 180 : 280,
                  objectFit: "contain",
                  filter: "drop-shadow(0px 10px 24px rgba(0,0,0,0.35))",
                  transform: "translateY(10px)"
                }}
              />
            </div>
          )}

        </div>
      </div>

      {/* Scroll cue */}
      {s.showScrollCue && (
        <div style={{ position: "absolute", left: "50%", bottom: 14, transform: "translateX(-50%)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,.5)", fontWeight: 600, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, zIndex: 4 }}>
          Scroll
          <span style={{ width: 1, height: 24, background: "linear-gradient(180deg,transparent,rgba(255,255,255,.55))" }} />
        </div>
      )}
    </div>
  );
}

const LayersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 11 11 13 15 9" />
  </svg>
);

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const DoubleChevronIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17 11 12 6 7 11" />
    <polyline points="17 18 12 13 7 18" />
  </svg>
);

const FactoryIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 21H2V3l7 4 7-4 6 4v14z" />
    <path d="M14 10h4v4h-4z" />
  </svg>
);
