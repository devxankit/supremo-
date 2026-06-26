"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "../../_components/AdminHeader";
import { SectionCard, Field, TextArea, Button, SaveBar, useSavedFlash } from "../../_components/ui";
import { adminAuth } from "../../_services/adminAuth";

interface LegalSection {
  title: string;
  content: string;
}

interface LegalContentState {
  title: string;
  intro: string;
  sections: LegalSection[];
}

const DEFAULT: LegalContentState = {
  title: "Returns & Warranty",
  intro: "Learn about our product return policy and warranty coverage guidelines.",
  sections: []
};

export default function WarrantyEditorPage() {
  const [s, setS] = useState<LegalContentState>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const { saved, flash } = useSavedFlash();

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const fetchWarrantyContent = () => {
    setLoading(true);
    setErrorMsg("");
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/warranty`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to retrieve warranty content.");
        return res.json();
      })
      .then((data) => {
        setS({
          title: data.title || DEFAULT.title,
          intro: data.intro || DEFAULT.intro,
          sections: data.sections || DEFAULT.sections,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading warranty data:", err);
        setErrorMsg("Failed to load Returns & Warranty data from the server.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWarrantyContent();
  }, []);

  function set<K extends keyof LegalContentState>(key: K, value: LegalContentState[K]) {
    setS((prev) => ({ ...prev, [key]: value }));
  }

  const saveWarrantyContent = async () => {
    const user = adminAuth.getUser();
    if (!user?.token) {
      alert("Not authenticated. Please log in.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/warranty`, {
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
      console.error("Error saving warranty content:", err);
      alert("Error saving warranty content.");
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <AdminHeader title="Returns & Warranty Settings" breadcrumb={[{ label: "Warranty Settings" }]} />
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
      <AdminHeader title="Returns & Warranty Settings" breadcrumb={[{ label: "Warranty Settings" }]} />

      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 24, maxWidth: 1000 }}>
        {errorMsg && (
          <div style={{ background: "rgba(239, 68, 68, 0.08)", border: "1px solid #EF4444", color: "#b91c1c", padding: "12px 18px", borderRadius: "var(--r-sm)", fontSize: 14 }}>
            {errorMsg}
          </div>
        )}

        {/* Page Heading and Intro */}
        <SectionCard title="General Info" description="Modify the primary title and intro text block displayed at the top of the Returns & Warranty Page.">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field
              label="Page Title"
              value={s.title}
              onChange={(val) => set("title", val)}
              placeholder="e.g. Returns & Warranty"
            />
            <TextArea
              label="Intro Paragraph"
              value={s.intro}
              onChange={(val) => set("intro", val)}
              placeholder="Provide a description of warranty and returns guidelines..."
              rows={3}
            />
          </div>
        </SectionCard>

        {/* Sections list */}
        <SectionCard title="Warranty Sections" description="Manage the individual sections for Returns & Warranty.">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, fontFamily: "var(--font-display)", display: "block" }}>
              Active Sections ({s.sections ? s.sections.length : 0})
            </span>
            
            {!s.sections || s.sections.length === 0 ? (
              <div style={{ padding: "16px", background: "var(--paper-2)", borderRadius: "var(--r-sm)", border: "1px dashed var(--line)", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
                No warranty sections configured. Add some below.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {s.sections.map((sect, idx) => (
                  <div key={idx} style={{ padding: "20px", background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line)", display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "var(--blue-600)" }}>Section #{idx + 1}</span>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          const newSects = s.sections.filter((_, i) => i !== idx);
                          set("sections", newSects);
                        }}
                      >
                        Delete Section
                      </Button>
                    </div>
                    <Field
                      label="Section Title"
                      value={sect.title}
                      onChange={(val) => {
                        const newSects = [...s.sections];
                        newSects[idx] = { ...newSects[idx], title: val };
                        set("sections", newSects);
                      }}
                      placeholder="e.g. 1. Warranty Period"
                    />
                    <TextArea
                      label="Section Content"
                      value={sect.content}
                      onChange={(val) => {
                        const newSects = [...s.sections];
                        newSects[idx] = { ...newSects[idx], content: val };
                        set("sections", newSects);
                      }}
                      placeholder="Enter policy clause text..."
                      rows={4}
                    />
                  </div>
                ))}
              </div>
            )}
            
            <div style={{ borderTop: "1px solid var(--line-2)", paddingTop: 20, marginTop: 12 }}>
              <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, fontFamily: "var(--font-display)", display: "block", marginBottom: 12 }}>
                Add New Section
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <Field
                  label="New Section Title"
                  value={newTitle}
                  onChange={(val) => setNewTitle(val)}
                  placeholder="e.g. 5. Claim Resolution Timeframe"
                />
                <TextArea
                  label="New Section Content"
                  value={newContent}
                  onChange={(val) => setNewContent(val)}
                  placeholder="Enter the section body content..."
                  rows={4}
                />
                <Button
                  onClick={() => {
                    const t = newTitle.trim();
                    const c = newContent.trim();
                    if (!t || !c) {
                      alert("Please provide both title and content for the new section.");
                      return;
                    }
                    set("sections", [...(s.sections || []), { title: t, content: c }]);
                    setNewTitle("");
                    setNewContent("");
                  }}
                  style={{ alignSelf: "flex-start" }}
                >
                  Add Section
                </Button>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Save/Reset strip */}
        <SaveBar
          saved={saved}
          onSave={saveWarrantyContent}
          onReset={fetchWarrantyContent}
        />
      </main>
    </div>
  );
}
