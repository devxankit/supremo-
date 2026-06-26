"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "../../_components/AdminHeader";
import { SectionCard, Field, TextArea, Toggle, SaveBar, useSavedFlash } from "../../_components/ui";
import { adminAuth } from "../../_services/adminAuth";

export default function FooterEditorPage() {
  const { saved, flash } = useSavedFlash();

  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState({ phone: "", email: "", address: "" });
  const [social, setSocial] = useState({ facebook: "", instagram: "", linkedin: "", youtube: "" });
  const [socialVisible, setSocialVisible] = useState({ facebook: true, instagram: true, linkedin: true, youtube: true });
  const [copyright, setCopyright] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/settings`);
      if (!res.ok) throw new Error("Failed to fetch settings");
      const data = await res.json();
      setAbout(data.footerAboutText || "");
      setContact({
        phone: data.contactPhone ?? "+91 90989 89090",
        email: data.contactEmail ?? "info@supremo.in",
        address: data.contactAddress ?? "Plot 14, Industrial Area, Indore, MP 452015",
      });
      setSocial({
        facebook: data.socialFacebook ?? "https://facebook.com/supremo",
        instagram: data.socialInstagram ?? "https://instagram.com/supremo",
        linkedin: data.socialLinkedin ?? "https://linkedin.com/company/supremo",
        youtube: data.socialYoutube ?? "",
      });
      setSocialVisible({
        facebook: data.socialFacebookVisible ?? true,
        instagram: data.socialInstagramVisible ?? true,
        linkedin: data.socialLinkedinVisible ?? true,
        youtube: data.socialYoutubeVisible ?? true,
      });
      setCopyright(data.footerCopyright ?? "© 2026 Supremo Polymers Pvt. Ltd. All rights reserved.");
    } catch (err) {
      console.error("Error loading settings footer data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async () => {
    const user = adminAuth.getUser();
    if (!user) {
      alert("Not authenticated. Please log in.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          footerAboutText: about,
          contactPhone: contact.phone,
          contactEmail: contact.email,
          contactAddress: contact.address,
          socialFacebook: social.facebook,
          socialInstagram: social.instagram,
          socialLinkedin: social.linkedin,
          socialYoutube: social.youtube,
          socialFacebookVisible: socialVisible.facebook,
          socialInstagramVisible: socialVisible.instagram,
          socialLinkedinVisible: socialVisible.linkedin,
          socialYoutubeVisible: socialVisible.youtube,
          footerCopyright: copyright,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update footer settings.");
      }

      flash();
    } catch (err: any) {
      console.error(err);
      alert("Save error: " + err.message);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <AdminHeader title="Footer" breadcrumb={[{ label: "Content" }, { label: "Footer" }]} />
        <main style={{ flex: 1, padding: "28px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 13, color: "var(--muted)" }}>Loading footer settings...</div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader title="Footer" breadcrumb={[{ label: "Content" }, { label: "Footer" }]} />

      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 18, maxWidth: 820 }}>
        <SectionCard title="About Blurb" description="Short paragraph shown in the footer">
          <TextArea label="Footer About Text" value={about} onChange={setAbout} rows={3} />
        </SectionCard>

        <SectionCard title="Contact Details" description="Shown in the footer and contact page">
          <Field label="Phone" value={contact.phone} onChange={(v) => setContact({ ...contact, phone: v })} />
          <Field label="Email" value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} type="email" />
          <Field label="Address" value={contact.address} onChange={(v) => setContact({ ...contact, address: v })} />
        </SectionCard>

        <SectionCard title="Social Links" description="Manage social links and toggles to show/hide them in the footer">
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Facebook */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <Field label="Facebook" value={social.facebook} onChange={(v) => setSocial({ ...social, facebook: v })} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center", minWidth: 90, marginTop: 16 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)" }}>Show Icon</span>
                <Toggle on={socialVisible.facebook} onToggle={() => setSocialVisible({ ...socialVisible, facebook: !socialVisible.facebook })} />
              </div>
            </div>

            {/* Instagram */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <Field label="Instagram" value={social.instagram} onChange={(v) => setSocial({ ...social, instagram: v })} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center", minWidth: 90, marginTop: 16 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)" }}>Show Icon</span>
                <Toggle on={socialVisible.instagram} onToggle={() => setSocialVisible({ ...socialVisible, instagram: !socialVisible.instagram })} />
              </div>
            </div>

            {/* LinkedIn */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <Field label="LinkedIn" value={social.linkedin} onChange={(v) => setSocial({ ...social, linkedin: v })} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center", minWidth: 90, marginTop: 16 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)" }}>Show Icon</span>
                <Toggle on={socialVisible.linkedin} onToggle={() => setSocialVisible({ ...socialVisible, linkedin: !socialVisible.linkedin })} />
              </div>
            </div>

            {/* YouTube */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <Field label="YouTube" value={social.youtube} onChange={(v) => setSocial({ ...social, youtube: v })} placeholder="https://…" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center", minWidth: 90, marginTop: 16 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)" }}>Show Icon</span>
                <Toggle on={socialVisible.youtube} onToggle={() => setSocialVisible({ ...socialVisible, youtube: !socialVisible.youtube })} />
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Copyright" description="Bottom bar text">
          <Field label="Copyright Text" value={copyright} onChange={setCopyright} />
        </SectionCard>

        <SaveBar saved={saved} onSave={handleSave} onReset={loadData} />
      </main>
    </div>
  );
}
