"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "../../_components/AdminHeader";
import { SectionCard, Field, TextArea, Button, SaveBar, useSavedFlash } from "../../_components/ui";
import { adminAuth } from "../../_services/adminAuth";
import { Stat } from "@/components/AboutStats";
import { CertificateItem } from "@/components/CertificatesCarousel";
import { LazyImage } from "@/components/LazyImage";

interface MfgCard {
  image: string;
  title: string;
  sub: string;
}

const EMPTY_STATS: Stat[] = [
  { value: 0, suffix: "", label: "" },
  { value: 0, suffix: "", label: "" },
  { value: 0, suffix: "", label: "" },
  { value: 0, suffix: "", label: "" }
];

const EMPTY_MFG_CARDS: MfgCard[] = [
  { image: "", title: "", sub: "" },
  { image: "", title: "", sub: "" },
  { image: "", title: "", sub: "" },
  { image: "", title: "", sub: "" }
];

interface AboutState {
  eyebrow: string;
  heading: string;
  headingHighlight: string;
  text1: string;
  text2: string;
  imageUrl: string;
  imageCaption: string;
  stats: Stat[];
  directorTitle: string;
  directorText1: string;
  directorText2: string;
  directorText3: string;
  directorImageUrl: string;
  mfgEyebrow: string;
  mfgHeading: string;
  mfgDescription: string;
  mfgCards: MfgCard[];
  certEyebrow: string;
  certTitle: string;
  certDescription: string;
  certImageUrl: string;
  certificates: CertificateItem[];
}

const DEFAULT: AboutState = {
  eyebrow: "Why Supremo",
  heading: "Born in Indore, India.",
  headingHighlight: "Trusted across the nation.",
  text1: "Supremo stands for innovation and reliability in polymer manufacturing. Since 1999, we have grown from a single blow-moulding unit into four plants and 22 production lines — engineering water tanks, pipes, planters and utility products that meet the highest quality standards.",
  text2: "Guided by our belief that \"Innovation is the Key\", every product is built to outlast expectations and serve India's homes, farms and businesses for a generation.",
  imageUrl: "/images/DJI_0695.jpg",
  imageCaption: "Supremo Plant · Indore, Madhya Pradesh",
  stats: EMPTY_STATS,
  directorTitle: "",
  directorText1: "Welcome and thank you for showing your interest and faith in this journey of ours, and help us making 'Supremo' a trusted and reputed brand.",
  directorText2: "Our Company purpose is to offer innovative products and client centric services backed up by strong infrastructure and dedicated team which has led us making 'Supremo' as an emerging brand. This purpose has been evident since the establishment of our corporation, When we set out to build a premium brand with an eye on innovation.",
  directorText3: "The values we share are embodied in what goes on at Supremo from day to day. Team members must exhibit ethical and honest behavior, and Supremo must offer fair, equal conduct in a safe, healthy workplace. We believe that in such an environment, sound decision making and effective strategies flow naturally from the give-and-take of daily business engagements among all team members.",
  directorImageUrl: "",
  mfgEyebrow: "",
  mfgHeading: "",
  mfgDescription: "",
  mfgCards: EMPTY_MFG_CARDS,
  certEyebrow: "",
  certTitle: "",
  certDescription: "",
  certImageUrl: "",
  certificates: []
};

export default function AboutEditorPage() {
  const [s, setS] = useState<AboutState>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { saved, flash } = useSavedFlash();

  const fetchAboutContent = () => {
    setLoading(true);
    setErrorMsg("");
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/about`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to retrieve about page content.");
        return res.json();
      })
      .then((data) => {
        setS({
          eyebrow: data.eyebrow || DEFAULT.eyebrow,
          heading: data.heading || DEFAULT.heading,
          headingHighlight: data.headingHighlight || DEFAULT.headingHighlight,
          text1: data.text1 || DEFAULT.text1,
          text2: data.text2 || DEFAULT.text2,
          imageUrl: data.imageUrl || DEFAULT.imageUrl,
          imageCaption: data.imageCaption || DEFAULT.imageCaption,
          stats: data.stats && data.stats.length > 0 ? data.stats : EMPTY_STATS,
          directorTitle: data.directorTitle || DEFAULT.directorTitle,
          directorText1: data.directorText1 || DEFAULT.directorText1,
          directorText2: data.directorText2 || DEFAULT.directorText2,
          directorText3: data.directorText3 || DEFAULT.directorText3,
          directorImageUrl: data.directorImageUrl || DEFAULT.directorImageUrl,
          mfgEyebrow: data.mfgEyebrow || DEFAULT.mfgEyebrow,
          mfgHeading: data.mfgHeading || DEFAULT.mfgHeading,
          mfgDescription: data.mfgDescription || DEFAULT.mfgDescription,
          mfgCards: data.mfgCards && data.mfgCards.length > 0 ? data.mfgCards : EMPTY_MFG_CARDS,
          certEyebrow: data.certEyebrow || DEFAULT.certEyebrow,
          certTitle: data.certTitle || DEFAULT.certTitle,
          certDescription: data.certDescription || DEFAULT.certDescription,
          certImageUrl: data.certImageUrl || DEFAULT.certImageUrl,
          certificates: data.certificates || [],
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading about page data:", err);
        setErrorMsg("Failed to load about section data from the server.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAboutContent();
  }, []);

  function set<K extends keyof AboutState>(key: K, value: AboutState[K]) {
    setS((prev) => ({ ...prev, [key]: value }));
  }

  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    fieldKey: "imageUrl" | "directorImageUrl" | "certImageUrl" | { type: "mfgCards"; index: number } | { type: "certificates"; index: number }
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    const user = adminAuth.getUser();
    if (!user?.token) {
      alert("Not authenticated. Please log in.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/media/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (typeof fieldKey === "string") {
          set(fieldKey, data.url);
        } else if (fieldKey.type === "mfgCards") {
          const newMfg = [...s.mfgCards];
          newMfg[fieldKey.index] = { ...newMfg[fieldKey.index], image: data.url };
          set("mfgCards", newMfg);
        } else if (fieldKey.type === "certificates") {
          const newCerts = [...s.certificates];
          newCerts[fieldKey.index] = { ...newCerts[fieldKey.index], image: data.url };
          set("certificates", newCerts);
        }
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(`Image upload failed: ${errData.message || res.statusText}`);
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Error uploading image. Check console for details.");
    } finally {
      setUploading(false);
    }
  }

  const saveAboutContent = async () => {
    const user = adminAuth.getUser();
    if (!user?.token) {
      alert("Not authenticated. Please log in.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/about`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(s),
      });

      if (res.ok) {
        flash();
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(`Failed to save: ${errData.message || res.statusText}`);
      }
    } catch (err) {
      console.error("Error saving about page content:", err);
      alert("Error saving about page content.");
    }
  };

  const isDirty = true; // Always allow save

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <AdminHeader title="About Page Settings" breadcrumb={[{ label: "About Page Settings" }]} />
        <main style={{ flex: 1, padding: "28px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", border: "3px solid var(--line)", borderTopColor: "var(--blue-600)", animation: "spin 1s linear infinite" }} />
            <div style={{ fontSize: 13, color: "var(--muted)" }}>Loading content...</div>
          </div>
          <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }` }} />
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", paddingBottom: 80 }}>
      <AdminHeader title="About Page Settings" breadcrumb={[{ label: "About Page Settings" }]} />

      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 24, maxWidth: 1000 }}>
        {errorMsg && (
          <div style={{ background: "rgba(239, 68, 68, 0.08)", border: "1px solid #EF4444", color: "#b91c1c", padding: "12px 18px", borderRadius: "var(--r-sm)", fontSize: 14 }}>
            {errorMsg}
          </div>
        )}

        <SectionCard title="Hero Section Text Copy" description="Modify the primary text block visible at the top of the About Page.">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field
              label="Eyebrow text"
              value={s.eyebrow}
              onChange={(val) => set("eyebrow", val)}
              placeholder="e.g. Why Supremo"
            />
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field
                label="Heading Start"
                value={s.heading}
                onChange={(val) => set("heading", val)}
                placeholder="e.g. Born in Indore, India."
              />
              <Field
                label="Heading Highlight (Blue Color)"
                value={s.headingHighlight}
                onChange={(val) => set("headingHighlight", val)}
                placeholder="e.g. Trusted across the nation."
              />
            </div>

            <TextArea
              label="Description Paragraph 1"
              value={s.text1}
              onChange={(val) => set("text1", val)}
              placeholder="Provide a detailed description of the company..."
              rows={4}
            />

            <TextArea
              label="Description Paragraph 2"
              value={s.text2}
              onChange={(val) => set("text2", val)}
              placeholder="Provide secondary details or vision statement..."
              rows={3}
            />
          </div>
        </SectionCard>

        <SectionCard title="Hero Section Media" description="Configure the main cover image and its caption.">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, fontFamily: "var(--font-display)", display: "block", marginBottom: 8 }}>
                About Image
              </span>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                {s.imageUrl ? (
                  <div style={{ position: "relative", width: 120, height: 90, borderRadius: "var(--r-sm)", border: "1px solid var(--line)", overflow: "hidden", flexShrink: 0 }}>
                    <LazyImage src={s.imageUrl} alt="About Page" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ) : (
                  <div style={{ width: 120, height: 90, borderRadius: "var(--r-sm)", border: "1px dashed var(--line)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "var(--muted)", flexShrink: 0 }}>No image</div>
                )}
                <label
                  style={{
                    height: 36, padding: "0 14px", background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 600, color: "var(--slate)", cursor: "pointer", transition: "background .15s"
                  }}
                >
                  {uploading ? "Uploading..." : "Upload New Image"}
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "imageUrl")} style={{ display: "none" }} />
                </label>
              </div>
            </div>

            <Field
              label="Image Caption"
              value={s.imageCaption}
              onChange={(val) => set("imageCaption", val)}
              placeholder="e.g. Supremo Plant · Indore, Madhya Pradesh"
            />
          </div>
        </SectionCard>

        <SectionCard title="Statistics Counter Strip" description="Configure the 4 legacy / performance counters shown below the hero section.">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {s.stats.map((stat, idx) => (
              <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr", gap: 16, padding: "16px", background: "var(--paper-2)", borderRadius: "var(--r-sm)", border: "1px solid var(--line)" }}>
                <Field
                  label={`Stat #${idx + 1} Value`}
                  value={stat.value.toString()}
                  onChange={(val) => {
                    const newStats = [...s.stats];
                    newStats[idx] = { ...newStats[idx], value: parseInt(val) || 0 };
                    set("stats", newStats);
                  }}
                  type="number"
                  placeholder="e.g. 27"
                />
                <Field
                  label={`Stat #${idx + 1} Suffix`}
                  value={stat.suffix || ""}
                  onChange={(val) => {
                    const newStats = [...s.stats];
                    newStats[idx] = { ...newStats[idx], suffix: val };
                    set("stats", newStats);
                  }}
                  placeholder="e.g. +"
                />
                <Field
                  label={`Stat #${idx + 1} Label`}
                  value={stat.label}
                  onChange={(val) => {
                    const newStats = [...s.stats];
                    newStats[idx] = { ...newStats[idx], label: val };
                    set("stats", newStats);
                  }}
                  placeholder="e.g. Years of Legacy"
                />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Managing Director Desk" description="Configure the details shown in the 'From the Desk of Managing Director' section.">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field
              label="Section Title"
              value={s.directorTitle}
              onChange={(val) => set("directorTitle", val)}
              placeholder="e.g. From the Desk of Managing Director"
            />
            
            <TextArea
              label="Paragraph 1"
              value={s.directorText1}
              onChange={(val) => set("directorText1", val)}
              placeholder="First paragraph copy..."
              rows={3}
            />

            <TextArea
              label="Paragraph 2"
              value={s.directorText2}
              onChange={(val) => set("directorText2", val)}
              placeholder="Second paragraph copy..."
              rows={4}
            />

            <TextArea
              label="Paragraph 3"
              value={s.directorText3}
              onChange={(val) => set("directorText3", val)}
              placeholder="Third paragraph copy..."
              rows={4}
            />

            <div>
              <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, fontFamily: "var(--font-display)", display: "block", marginBottom: 8 }}>
                Director Photo
              </span>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                {s.directorImageUrl ? (
                  <div style={{ position: "relative", width: 90, height: 112, borderRadius: "var(--r-sm)", border: "1px solid var(--line)", overflow: "hidden", flexShrink: 0 }}>
                    <LazyImage src={s.directorImageUrl} alt="Managing Director" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ) : (
                  <div style={{ width: 90, height: 112, borderRadius: "var(--r-sm)", border: "1px dashed var(--line)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "var(--muted)", flexShrink: 0 }}>No image</div>
                )}
                <label
                  style={{
                    height: 36, padding: "0 14px", background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 600, color: "var(--slate)", cursor: "pointer", transition: "background .15s"
                  }}
                >
                  {uploading ? "Uploading..." : "Upload Photo"}
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "directorImageUrl")} style={{ display: "none" }} />
                </label>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Manufacturing Unit Section" description="Configure the details and cards shown under the 'Our Manufacturing Unit' section.">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field
              label="Section Eyebrow"
              value={s.mfgEyebrow}
              onChange={(val) => set("mfgEyebrow", val)}
              placeholder="e.g. Where It's Made"
            />
            <Field
              label="Section Heading"
              value={s.mfgHeading}
              onChange={(val) => set("mfgHeading", val)}
              placeholder="e.g. Our Manufacturing Unit"
            />
            <TextArea
              label="Section Description"
              value={s.mfgDescription}
              onChange={(val) => set("mfgDescription", val)}
              placeholder="Provide a description of manufacturing units..."
              rows={4}
            />

            <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, fontFamily: "var(--font-display)", display: "block", marginTop: 8 }}>
              Facility Cards (4 units)
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {s.mfgCards.map((card, idx) => (
                <div key={idx} style={{ display: "grid", gridTemplateColumns: "100px 1fr 1fr", gap: 16, padding: "16px", background: "var(--paper-2)", borderRadius: "var(--r-sm)", border: "1px solid var(--line)", alignItems: "center" }}>
                  {/* Card image upload */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                    {card.image ? (
                      <div style={{ position: "relative", width: 80, height: 60, borderRadius: "var(--r-sm)", border: "1px solid var(--line)", overflow: "hidden" }}>
                        <LazyImage src={card.image} alt={`Unit #${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    ) : (
                      <div style={{ width: 80, height: 60, borderRadius: "var(--r-sm)", border: "1px dashed var(--line)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "var(--muted)" }}>No photo</div>
                    )}
                    <label
                      style={{
                        padding: "4px 8px", background: "#fff", border: "1px solid var(--line)", borderRadius: "var(--r-sm)",
                        fontSize: 10, fontWeight: 600, color: "var(--slate)", cursor: "pointer", display: "inline-flex", justifyContent: "center", width: "100%"
                      }}
                    >
                      Upload
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, { type: "mfgCards", index: idx })} style={{ display: "none" }} />
                    </label>
                  </div>

                  {/* Card Title & Sub */}
                  <Field
                    label={`Card #${idx + 1} Title`}
                    value={card.title}
                    onChange={(val) => {
                      const newMfg = [...s.mfgCards];
                      newMfg[idx] = { ...newMfg[idx], title: val };
                      set("mfgCards", newMfg);
                    }}
                    placeholder="e.g. Indore Facility"
                  />
                  <Field
                    label={`Card #${idx + 1} Sub-label`}
                    value={card.sub}
                    onChange={(val) => {
                      const newMfg = [...s.mfgCards];
                      newMfg[idx] = { ...newMfg[idx], sub: val };
                      set("mfgCards", newMfg);
                    }}
                    placeholder="e.g. Aerial view · Main campus"
                  />
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Awards & Certifications" description="Configure the credentials, awards, and cert images shown in the carousel slider.">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field
              label="Section Eyebrow"
              value={s.certEyebrow}
              onChange={(val) => set("certEyebrow", val)}
              placeholder="e.g. Quality & Standards"
            />
            <Field
              label="Section Heading"
              value={s.certTitle}
              onChange={(val) => set("certTitle", val)}
              placeholder="e.g. Awards & Certifications"
            />
            <TextArea
              label="Section Description"
              value={s.certDescription}
              onChange={(val) => set("certDescription", val)}
              placeholder="Provide a description about quality frameworks..."
              rows={4}
            />

            <div>
              <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, fontFamily: "var(--font-display)", display: "block", marginBottom: 8 }}>
                Side Visual Image
              </span>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                {s.certImageUrl ? (
                  <div style={{ position: "relative", width: 120, height: 90, borderRadius: "var(--r-sm)", border: "1px solid var(--line)", overflow: "hidden", flexShrink: 0 }}>
                    <LazyImage src={s.certImageUrl} alt="Cert Visual" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ) : (
                  <div style={{ width: 120, height: 90, borderRadius: "var(--r-sm)", border: "1px dashed var(--line)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "var(--muted)", flexShrink: 0 }}>No image</div>
                )}
                <label
                  style={{
                    height: 36, padding: "0 14px", background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 600, color: "var(--slate)", cursor: "pointer", transition: "background .15s"
                  }}
                >
                  {uploading ? "Uploading..." : "Upload Side Image"}
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "certImageUrl")} style={{ display: "none" }} />
                </label>
              </div>
            </div>

            <div style={{ borderTop: "1px solid var(--line)", paddingTop: 16, marginTop: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, fontFamily: "var(--font-display)" }}>
                  Certificates ({s.certificates.length})
                </span>
                <Button 
                  size="sm" 
                  onClick={() => {
                    set("certificates", [...s.certificates, { image: "", title: "" }]);
                  }}
                >
                  + Add Certificate
                </Button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {s.certificates.map((cert, idx) => (
                  <div key={idx} style={{ display: "grid", gridTemplateColumns: "100px 1fr auto", gap: 16, padding: "16px", background: "var(--paper-2)", borderRadius: "var(--r-sm)", border: "1px solid var(--line)", alignItems: "center" }}>
                    {/* Image upload */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                      {cert.image ? (
                        <div style={{ position: "relative", width: 70, height: 90, borderRadius: "var(--r-sm)", border: "1px solid var(--line)", overflow: "hidden" }}>
                          <LazyImage src={cert.image} alt={cert.title || `Cert #${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "contain", background: "#fff" }} />
                        </div>
                      ) : (
                        <div style={{ width: 70, height: 90, borderRadius: "var(--r-sm)", border: "1px dashed var(--line)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "var(--muted)" }}>No photo</div>
                      )}
                      <label
                        style={{
                          padding: "4px 8px", background: "#fff", border: "1px solid var(--line)", borderRadius: "var(--r-sm)",
                          fontSize: 10, fontWeight: 600, color: "var(--slate)", cursor: "pointer", display: "inline-flex", justifyContent: "center", width: "100%"
                        }}
                      >
                        Upload
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, { type: "certificates", index: idx })} style={{ display: "none" }} />
                      </label>
                    </div>

                    {/* Certificate Title */}
                    <Field
                      label={`Certificate #${idx + 1} Title / Code`}
                      value={cert.title}
                      onChange={(val) => {
                        const newCerts = [...s.certificates];
                        newCerts[idx] = { ...newCerts[idx], title: val };
                        set("certificates", newCerts);
                      }}
                      placeholder="e.g. ISO 9001:2015"
                    />

                    {/* Delete button */}
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => {
                        const newCerts = s.certificates.filter((_, i) => i !== idx);
                        set("certificates", newCerts);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        {isDirty && (
          <SaveBar
            saved={saved}
            onSave={saveAboutContent}
            onReset={fetchAboutContent}
          />
        )}
      </main>
    </div>
  );
}
