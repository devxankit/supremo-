"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "../../_components/AdminHeader";
import { SectionCard, Field, TextArea, Button, SaveBar, useSavedFlash } from "../../_components/ui";
import { adminAuth } from "../../_services/adminAuth";

interface CareersContentState {
  heroEyebrow: string;
  heroHeading: string;
  heroDescription: string;
  introEyebrow: string;
  introHeading: string;
  introDescription: string;
  introList: string[];
  areasOfInterest: string[];
}

const DEFAULT: CareersContentState = {
  heroEyebrow: "",
  heroHeading: "",
  heroDescription: "",
  introEyebrow: "",
  introHeading: "",
  introDescription: "",
  introList: ["", "", ""],
  areasOfInterest: []
};

export default function CareersEditorPage() {
  const [s, setS] = useState<CareersContentState>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const { saved, flash } = useSavedFlash();
  const [newArea, setNewArea] = useState("");

  const fetchCareersContent = () => {
    setLoading(true);
    setErrorMsg("");
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/careers`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to retrieve careers page content.");
        return res.json();
      })
      .then((data) => {
        setS({
          heroEyebrow: data.heroEyebrow || DEFAULT.heroEyebrow,
          heroHeading: data.heroHeading || DEFAULT.heroHeading,
          heroDescription: data.heroDescription || DEFAULT.heroDescription,
          introEyebrow: data.introEyebrow || DEFAULT.introEyebrow,
          introHeading: data.introHeading || DEFAULT.introHeading,
          introDescription: data.introDescription || DEFAULT.introDescription,
          introList: data.introList && data.introList.length > 0 ? data.introList : DEFAULT.introList,
          areasOfInterest: data.areasOfInterest || DEFAULT.areasOfInterest,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading careers page data:", err);
        setErrorMsg("Failed to load careers section data from the server.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCareersContent();
  }, []);

  function set<K extends keyof CareersContentState>(key: K, value: CareersContentState[K]) {
    setS((prev) => ({ ...prev, [key]: value }));
  }

  const saveCareersContent = async () => {
    const user = adminAuth.getUser();
    if (!user?.token) {
      alert("Not authenticated. Please log in.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/careers`, {
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
      console.error("Error saving careers content:", err);
      alert("Error saving careers content.");
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <AdminHeader title="Careers Page Settings" breadcrumb={[{ label: "Careers Page Settings" }]} />
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
      <AdminHeader title="Careers Page Settings" breadcrumb={[{ label: "Careers Page Settings" }]} />

      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 24, maxWidth: 1000 }}>
        {errorMsg && (
          <div style={{ background: "rgba(239, 68, 68, 0.08)", border: "1px solid #EF4444", color: "#b91c1c", padding: "12px 18px", borderRadius: "var(--r-sm)", fontSize: 14 }}>
            {errorMsg}
          </div>
        )}

        {/* Hero Section */}
        <SectionCard title="Hero Section Content" description="Modify the primary text block visible at the top of the Careers Page.">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field
              label="Eyebrow Text"
              value={s.heroEyebrow}
              onChange={(val) => set("heroEyebrow", val)}
              placeholder="e.g. Careers at Supremo"
            />
            
            <Field
              label="Heading Title"
              value={s.heroHeading}
              onChange={(val) => set("heroHeading", val)}
              placeholder="e.g. Join the Supremo team."
            />

            <TextArea
              label="Hero Sub/Description"
              value={s.heroDescription}
              onChange={(val) => set("heroDescription", val)}
              placeholder="Provide a description of the Supremo team culture..."
              rows={4}
            />
          </div>
        </SectionCard>

        {/* Intro Section & Onboarding Checklist */}
        <SectionCard title="Intro Details & Checklist" description="Configure headings, descriptions, and list bullet items displayed next to the form.">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field
                label="Intro Eyebrow"
                value={s.introEyebrow}
                onChange={(val) => set("introEyebrow", val)}
                placeholder="e.g. Submit Your Resume"
              />
              <Field
                label="Intro Heading"
                value={s.introHeading}
                onChange={(val) => set("introHeading", val)}
                placeholder="e.g. Tell us about yourself."
              />
            </div>
            
            <TextArea
              label="Intro Description"
              value={s.introDescription}
              onChange={(val) => set("introDescription", val)}
              placeholder="Enter intro details copy..."
              rows={3}
            />

            <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, fontFamily: "var(--font-display)", display: "block", marginTop: 8 }}>
              Checklist Bullet Points (3 items)
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {s.introList.map((item, idx) => (
                <Field
                  key={idx}
                  label={`Checklist Item #${idx + 1}`}
                  value={item}
                  onChange={(val) => {
                    const newList = [...s.introList];
                    newList[idx] = val;
                    set("introList", newList);
                  }}
                  placeholder="e.g. Roles across manufacturing, sales, quality and supply chain."
                />
              ))}
            </div>
          </div>
        </SectionCard>

        {/* Areas of Interest */}
        <SectionCard title="Areas of Interest Options" description="Manage the department/area options in the applicant submission form dropdown.">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, fontFamily: "var(--font-display)", display: "block" }}>
              Active Department Areas ({s.areasOfInterest ? s.areasOfInterest.length : 0})
            </span>
            
            {!s.areasOfInterest || s.areasOfInterest.length === 0 ? (
              <div style={{ padding: "16px", background: "var(--paper-2)", borderRadius: "var(--r-sm)", border: "1px dashed var(--line)", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
                No department areas configured. Add some below.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {s.areasOfInterest.map((area, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "var(--paper-2)", borderRadius: "var(--r-sm)", border: "1px solid var(--line)" }}>
                    <span style={{ fontSize: 14, color: "var(--ink)", fontWeight: 500 }}>{area}</span>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        const newAreas = s.areasOfInterest.filter((_, i) => i !== idx);
                        set("areasOfInterest", newAreas);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            <div style={{ borderTop: "1px solid var(--line-2)", paddingTop: 16, marginTop: 8 }}>
              <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, fontFamily: "var(--font-display)", display: "block", marginBottom: 8 }}>
                Add New Department Area
              </span>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
                <div style={{ flex: 1 }}>
                  <Field
                    label="Area Name"
                    value={newArea}
                    onChange={(val) => setNewArea(val)}
                    placeholder="e.g. Finance & Accounts"
                  />
                </div>
                <Button
                  onClick={() => {
                    const val = newArea.trim();
                    if (!val) return;
                    if (s.areasOfInterest && s.areasOfInterest.includes(val)) {
                      alert("This area already exists.");
                      return;
                    }
                    set("areasOfInterest", [...(s.areasOfInterest || []), val]);
                    setNewArea("");
                  }}
                  style={{ height: 42 }}
                >
                  Add Area
                </Button>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Save/Reset strip */}
        <SaveBar
          saved={saved}
          onSave={saveCareersContent}
          onReset={fetchCareersContent}
        />
      </main>
    </div>
  );
}
