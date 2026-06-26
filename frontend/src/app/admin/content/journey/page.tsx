"use client";

import { useState, useEffect, useRef } from "react";
import { AdminHeader } from "../../_components/AdminHeader";
import { Field, TextArea, Button, SaveBar, useSavedFlash } from "../../_components/ui";
import { adminAuth } from "../../_services/adminAuth";
import { LazyImage } from "@/components/LazyImage";

interface Milestone {
  year: string;
  event: string;
  _id?: string;
}

interface JourneyData {
  heading: string;
  sub: string;
  images: string[];
  milestones: Milestone[];
}

export default function JourneyEditorPage() {
  const [data, setData] = useState<JourneyData>({
    heading: "",
    sub: "",
    images: [],
    milestones: [],
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { saved, flash } = useSavedFlash();

  const loadJourneyData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/journey`);
      if (!res.ok) throw new Error("Failed to fetch journey content");
      const resData = await res.json();
      setData(resData);
    } catch (err) {
      console.error("Error loading journey details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJourneyData();
  }, []);

  const handleSave = async () => {
    const user = adminAuth.getUser();
    if (!user) {
      alert("Not authenticated. Please log in.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/journey`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update journey details.");
      }

      const updated = await res.json();
      setData(updated);
      flash();
    } catch (err: any) {
      console.error(err);
      alert("Save error: " + err.message);
    }
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

      const uploadData = await res.json();
      setData((prev) => ({
        ...prev,
        images: [...prev.images, uploadData.url],
      }));
      alert("Image uploaded successfully to Cloudinary!");
    } catch (err: any) {
      console.error(err);
      alert("Upload error: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleAddMilestone = () => {
    setData((prev) => ({
      ...prev,
      milestones: [...prev.milestones, { year: "", event: "" }],
    }));
  };

  const handleRemoveMilestone = (index: number) => {
    setData((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index),
    }));
  };

  const handleUpdateMilestone = (index: number, key: "year" | "event", value: string) => {
    setData((prev) => {
      const updated = [...prev.milestones];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, milestones: updated };
    });
  };

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <AdminHeader title="Journey Section Editor" breadcrumb={[{ label: "Content" }, { label: "Homepage", href: "/admin/content/homepage" }, { label: "Journey" }]} />
        <main style={{ flex: 1, padding: "28px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 14, color: "var(--muted)" }}>Loading Journey configuration...</div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader title="Journey Section Editor" breadcrumb={[{ label: "Content" }, { label: "Homepage", href: "/admin/content/homepage" }, { label: "Journey" }]} />

      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 24, maxWidth: 900 }}>
        {/* General Settings */}
        <div style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-display)" }}>Section Copy Settings</h3>
          <Field label="Section Heading" value={data.heading || ""} onChange={(val) => setData(prev => ({ ...prev, heading: val }))} />
          <Field label="Section Sub-text (Eyebrow)" value={data.sub || ""} onChange={(val) => setData(prev => ({ ...prev, sub: val }))} />
        </div>

        {/* Timeline Milestones Settings */}
        <div style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-display)" }}>Timeline Milestones</h3>
            <Button variant="outline" size="sm" onClick={handleAddMilestone}>+ Add Milestone</Button>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {data.milestones.length === 0 ? (
              <div style={{ fontSize: 12, color: "var(--muted)", textAlign: "center", padding: "12px 0" }}>No milestones added yet. Click "+ Add Milestone" above to start.</div>
            ) : (
              data.milestones.map((milestone, idx) => (
                <div key={idx} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 120, flexShrink: 0 }}>
                    <Field label="Year" value={milestone.year} onChange={(val) => handleUpdateMilestone(idx, "year", val)} placeholder="e.g. 2026" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Field label="Event Description" value={milestone.event} onChange={(val) => handleUpdateMilestone(idx, "event", val)} placeholder="e.g. Achieved MSME registration." />
                  </div>
                  <div style={{ alignSelf: "flex-end", paddingBottom: 1 }}>
                    <Button variant="danger" size="sm" onClick={() => handleRemoveMilestone(idx)} style={{ height: 42, padding: "0 10px" }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Slider Images Uploader */}
        <div style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-display)" }}>Facility Slider Images</h3>
            <div>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleUploadImage} style={{ display: "none" }} />
              <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} style={{ display: "inline-flex", gap: 6 }}>
                {uploading ? "Uploading..." : (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                    Upload Image
                  </>
                )}
              </Button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14 }}>
            {data.images.length === 0 ? (
              <div style={{ gridColumn: "1/-1", fontSize: 12, color: "var(--muted)", textAlign: "center", padding: "16px 0" }}>No facility images uploaded yet. Upload images to show in the slider.</div>
            ) : (
              data.images.map((imgUrl, idx) => (
                <div key={idx} style={{ position: "relative", borderRadius: "var(--r-sm)", border: "1px solid var(--line-2)", overflow: "hidden", aspectRatio: "4/3", background: "var(--paper-2)" }}>
                  <LazyImage src={imgUrl} alt={`Facility Slider ${idx}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <button onClick={() => handleRemoveImage(idx)} style={{ position: "absolute", top: 8, right: 8, background: "rgba(220, 38, 38, 0.85)", color: "#fff", border: "none", borderRadius: 4, width: 26, height: 26, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} title="Remove image">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <SaveBar saved={saved} onSave={handleSave} onReset={loadJourneyData} />
      </main>
    </div>
  );
}
