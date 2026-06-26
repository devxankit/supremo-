"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "../../_components/AdminHeader";
import { SectionCard, Field, TextArea, Button, SaveBar, useSavedFlash } from "../../_components/ui";
import { adminAuth } from "../../_services/adminAuth";

interface ContactContentState {
  heroEyebrow: string;
  heroHeading: string;
  heroDescription: string;
  officeName: string;
  officeAddress: string;
  phone: string;
  email: string;
  whatsapp: string;
  businessHours: string;
  whatsappTitle: string;
  whatsappDescription: string;
  formTitle: string;
  formDescription: string;
  formSubjects: string[];
}

const DEFAULT: ContactContentState = {
  heroEyebrow: "",
  heroHeading: "",
  heroDescription: "",
  officeName: "",
  officeAddress: "",
  phone: "",
  email: "",
  whatsapp: "",
  businessHours: "",
  whatsappTitle: "",
  whatsappDescription: "",
  formTitle: "",
  formDescription: "",
  formSubjects: []
};

export default function ContactEditorPage() {
  const [s, setS] = useState<ContactContentState>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const { saved, flash } = useSavedFlash();
  const [newSubject, setNewSubject] = useState("");

  const fetchContactContent = () => {
    setLoading(true);
    setErrorMsg("");
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/contact`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to retrieve contact page content.");
        return res.json();
      })
      .then((data) => {
        setS({
          heroEyebrow: data.heroEyebrow || DEFAULT.heroEyebrow,
          heroHeading: data.heroHeading || DEFAULT.heroHeading,
          heroDescription: data.heroDescription || DEFAULT.heroDescription,
          officeName: data.officeName || DEFAULT.officeName,
          officeAddress: data.officeAddress || DEFAULT.officeAddress,
          phone: data.phone || DEFAULT.phone,
          email: data.email || DEFAULT.email,
          whatsapp: data.whatsapp || DEFAULT.whatsapp,
          businessHours: data.businessHours || DEFAULT.businessHours,
          whatsappTitle: data.whatsappTitle || DEFAULT.whatsappTitle,
          whatsappDescription: data.whatsappDescription || DEFAULT.whatsappDescription,
          formTitle: data.formTitle || DEFAULT.formTitle,
          formDescription: data.formDescription || DEFAULT.formDescription,
          formSubjects: data.formSubjects && data.formSubjects.length > 0 ? data.formSubjects : DEFAULT.formSubjects,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading contact page data:", err);
        setErrorMsg("Failed to load contact section data from the server.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchContactContent();
  }, []);

  function set<K extends keyof ContactContentState>(key: K, value: ContactContentState[K]) {
    setS((prev) => ({ ...prev, [key]: value }));
  }

  const saveContactContent = async () => {
    const user = adminAuth.getUser();
    if (!user?.token) {
      alert("Not authenticated. Please log in.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/contact`, {
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
      console.error("Error saving contact content:", err);
      alert("Error saving contact content.");
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <AdminHeader title="Contact Page Settings" breadcrumb={[{ label: "Contact Page Settings" }]} />
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
      <AdminHeader title="Contact Page Settings" breadcrumb={[{ label: "Contact Page Settings" }]} />

      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 24, maxWidth: 1000 }}>
        {errorMsg && (
          <div style={{ background: "rgba(239, 68, 68, 0.08)", border: "1px solid #EF4444", color: "#b91c1c", padding: "12px 18px", borderRadius: "var(--r-sm)", fontSize: 14 }}>
            {errorMsg}
          </div>
        )}

        {/* Hero Section */}
        <SectionCard title="Hero Section Content" description="Modify the primary text block visible at the top of the Contact Page.">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field
              label="Eyebrow Text"
              value={s.heroEyebrow}
              onChange={(val) => set("heroEyebrow", val)}
              placeholder="e.g. Contact"
            />
            
            <Field
              label="Heading Title"
              value={s.heroHeading}
              onChange={(val) => set("heroHeading", val)}
              placeholder="e.g. Get in Touch"
            />

            <TextArea
              label="Hero Sub/Description"
              value={s.heroDescription}
              onChange={(val) => set("heroDescription", val)}
              placeholder="Provide a description of the support response time..."
              rows={3}
            />
          </div>
        </SectionCard>

        {/* Office details */}
        <SectionCard title="Office Coordinates & Details" description="Configure your physical office coordinates, phone, email and hours.">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field
                label="Office/Factory Name"
                value={s.officeName}
                onChange={(val) => set("officeName", val)}
                placeholder="e.g. Factory & Head Office"
              />
              <Field
                label="Phone Display Text"
                value={s.phone}
                onChange={(val) => set("phone", val)}
                placeholder="e.g. +91 90989 89090"
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field
                label="Email Address"
                value={s.email}
                onChange={(val) => set("email", val)}
                placeholder="e.g. info@supremo.in"
              />
              <Field
                label="WhatsApp Link Number (digits only, e.g. 919098989090)"
                value={s.whatsapp}
                onChange={(val) => set("whatsapp", val)}
                placeholder="e.g. 919098989090"
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field
                label="Business Hours"
                value={s.businessHours}
                onChange={(val) => set("businessHours", val)}
                placeholder="e.g. Mon – Sat: 11:00 AM – 7:00 PM"
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field
                label="WhatsApp Banner Title"
                value={s.whatsappTitle}
                onChange={(val) => set("whatsappTitle", val)}
                placeholder="e.g. Need help urgently?"
              />
              <Field
                label="WhatsApp Banner Description"
                value={s.whatsappDescription}
                onChange={(val) => set("whatsappDescription", val)}
                placeholder="e.g. Our WhatsApp team is available Mon–Sat, 11 AM – 7 PM. Average response time: 15 minutes."
              />
            </div>

            <TextArea
              label="Office Address"
              value={s.officeAddress}
              onChange={(val) => set("officeAddress", val)}
              placeholder="e.g. Supremo Tank Factory, Badia Keema, MP"
              rows={3}
            />
          </div>
        </SectionCard>



        {/* Contact Form Details */}
        <SectionCard title="Contact Form Copy" description="Customize text displayed directly inside the Contact Submission Form card.">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field
              label="Form Header Title"
              value={s.formTitle}
              onChange={(val) => set("formTitle", val)}
              placeholder="e.g. Send us a message"
            />
            <Field
              label="Form Sub-description"
              value={s.formDescription}
              onChange={(val) => set("formDescription", val)}
              placeholder="e.g. We respond within 24 business hours."
            />
          </div>
        </SectionCard>

        {/* Subjects list dropdown */}
        <SectionCard title="Form Subjects Dropdown" description="Manage options available for users to select as contact subjects.">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, fontFamily: "var(--font-display)", display: "block" }}>
              Active Form Subjects ({s.formSubjects ? s.formSubjects.length : 0})
            </span>
            
            {!s.formSubjects || s.formSubjects.length === 0 ? (
              <div style={{ padding: "16px", background: "var(--paper-2)", borderRadius: "var(--r-sm)", border: "1px dashed var(--line)", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
                No subject options configured. Add some below.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {s.formSubjects.map((sub, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "var(--paper-2)", borderRadius: "var(--r-sm)", border: "1px solid var(--line)" }}>
                    <span style={{ fontSize: 14, color: "var(--ink)", fontWeight: 500 }}>{sub}</span>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        const newSubs = s.formSubjects.filter((_, i) => i !== idx);
                        set("formSubjects", newSubs);
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
                Add New Dropdown Option
              </span>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
                <div style={{ flex: 1 }}>
                  <Field
                    label="Subject Title"
                    value={newSubject}
                    onChange={(val) => setNewSubject(val)}
                    placeholder="e.g. Bulk Order / Institutional"
                  />
                </div>
                <Button
                  onClick={() => {
                    const val = newSubject.trim();
                    if (!val) return;
                    if (s.formSubjects && s.formSubjects.includes(val)) {
                      alert("This option already exists.");
                      return;
                    }
                    set("formSubjects", [...(s.formSubjects || []), val]);
                    setNewSubject("");
                  }}
                  style={{ height: 42 }}
                >
                  Add Option
                </Button>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Save/Reset strip */}
        <SaveBar
          saved={saved}
          onSave={saveContactContent}
          onReset={fetchContactContent}
        />
      </main>
    </div>
  );
}
