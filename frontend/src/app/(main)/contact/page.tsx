"use client";

import { useState, useEffect } from "react";
import { FormSuccess } from "@/components/FormSuccess";
import { validateEmail } from "@/lib/site";

interface ContactSettings {
  heroEyebrow: string;
  heroHeading: string;
  heroDescription: string;
  officeName: string;
  officeAddress: string;
  phone: string;
  email: string;
  whatsapp: string;
  businessHours: string;
  socialFacebook: string;
  socialInstagram: string;
  socialYoutube: string;
  whatsappTitle: string;
  whatsappDescription: string;
  formTitle: string;
  formDescription: string;
  formSubjects: string[];
}

const INITIAL_SETTINGS: ContactSettings = {
  heroEyebrow: "",
  heroHeading: "",
  heroDescription: "",
  officeName: "",
  officeAddress: "",
  phone: "",
  email: "",
  whatsapp: "",
  businessHours: "",
  socialFacebook: "",
  socialInstagram: "",
  socialYoutube: "",
  whatsappTitle: "",
  whatsappDescription: "",
  formTitle: "",
  formDescription: "",
  formSubjects: []
};

export default function ContactPage() {
  const [settings, setSettings] = useState<ContactSettings>(INITIAL_SETTINGS);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    subject: "",
    message: ""
  });

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
    Promise.all([
      fetch(`${apiBase}/contact`).then((res) => {
        if (!res.ok) throw new Error("Failed to load contact config");
        return res.json();
      }),
      fetch(`${apiBase}/settings`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load global settings");
          return res.json();
        })
        .catch((err) => {
          console.warn("Failed to load global settings, falling back to defaults:", err);
          return {};
        })
    ])
      .then(([contactData, settingsData]) => {
        setSettings({
          heroEyebrow: contactData.heroEyebrow || INITIAL_SETTINGS.heroEyebrow,
          heroHeading: contactData.heroHeading || INITIAL_SETTINGS.heroHeading,
          heroDescription: contactData.heroDescription || INITIAL_SETTINGS.heroDescription,
          officeName: contactData.officeName || INITIAL_SETTINGS.officeName,
          officeAddress: contactData.officeAddress || INITIAL_SETTINGS.officeAddress,
          phone: contactData.phone || INITIAL_SETTINGS.phone,
          email: contactData.email || INITIAL_SETTINGS.email,
          whatsapp: contactData.whatsapp || INITIAL_SETTINGS.whatsapp,
          businessHours: contactData.businessHours || INITIAL_SETTINGS.businessHours,
          socialFacebook: (settingsData.socialFacebookVisible && settingsData.socialFacebook) || "",
          socialInstagram: (settingsData.socialInstagramVisible && settingsData.socialInstagram) || "",
          socialYoutube: (settingsData.socialYoutubeVisible && settingsData.socialYoutube) || "",
          whatsappTitle: contactData.whatsappTitle || INITIAL_SETTINGS.whatsappTitle,
          whatsappDescription: contactData.whatsappDescription || INITIAL_SETTINGS.whatsappDescription,
          formTitle: contactData.formTitle || INITIAL_SETTINGS.formTitle,
          formDescription: contactData.formDescription || INITIAL_SETTINGS.formDescription,
          formSubjects: contactData.formSubjects && contactData.formSubjects.length > 0 ? contactData.formSubjects : INITIAL_SETTINGS.formSubjects
        });
      })
      .catch((err) => {
        console.error("Error fetching contact page settings:", err);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (formData.email && !validateEmail(formData.email)) {
      setErrorMsg("Please enter a valid email address. Check for typos (e.g. gmail.com instead of gmailll.comm).");
      return;
    }

    setSubmitting(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
      const res = await fetch(`${apiBase}/contact-applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to submit contact message");
      }
      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const cleanPhoneLink = settings.phone.replace(/[^+\d]/g, "");
  const cleanWhatsAppUrl = `https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`;

  return (
    <main>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          background: "var(--paper)",
          borderBottom: "1px solid var(--line)",
          display: "flex",
          alignItems: "center",
          padding: "calc(var(--nav-h) + clamp(32px, 5vw, 48px)) 0 clamp(32px, 5vw, 48px) 0",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(14, 26, 48, 0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(14, 26, 48, 0.03) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className="container"
          style={{
            position: "relative",
          }}
        >
          <span className="eyebrow">{settings.heroEyebrow}</span>
          <h1
            style={{
              color: "var(--ink)",
              fontSize: "clamp(32px,5vw,60px)",
              lineHeight: 1.1,
              marginTop: 16,
            }}
          >
            {settings.heroHeading}
          </h1>
          <p style={{ color: "var(--slate)", fontSize: 17, marginTop: 16, maxWidth: "48ch" }}>
            {settings.heroDescription}
          </p>
        </div>
      </section>

      {/* Contact Split */}
      <section style={{ background: "var(--paper)", padding: "clamp(40px, 6vw, 64px) 0" }}>
        <div
          className="container mob-1col mob-gap-lg"
          style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 64, alignItems: "start" }}
        >
          {/* Left: Details */}
          <div>
            <h2 style={{ fontSize: "clamp(24px,3vw,36px)", marginBottom: 32 }}>
              We&apos;d love to hear from you
            </h2>

            {/* Address */}
            <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
              <span style={{ width: 44, height: 44, background: "var(--blue-50)", border: "1px solid var(--blue-100)", borderRadius: 12, display: "grid", placeItems: "center", flexShrink: 0, color: "var(--blue-700)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <div>
                <p style={{ fontWeight: 600, fontFamily: "var(--font-display)", marginBottom: 4 }}>{settings.officeName}</p>
                <p style={{ color: "var(--slate)", fontSize: 15, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                  {settings.officeAddress}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
              <span style={{ width: 44, height: 44, background: "var(--blue-50)", border: "1px solid var(--blue-100)", borderRadius: 12, display: "grid", placeItems: "center", flexShrink: 0, color: "var(--blue-700)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.09 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <div>
                <p style={{ fontWeight: 600, fontFamily: "var(--font-display)", marginBottom: 4 }}>Phone</p>
                <a href={`tel:${cleanPhoneLink}`} style={{ color: "var(--slate)", fontSize: 15, textDecoration: "none" }}>{settings.phone}</a>
              </div>
            </div>

            {/* WhatsApp */}
            <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
              <span style={{ width: 44, height: 44, background: "#DCFCE7", border: "1px solid #BBF7D0", borderRadius: 12, display: "grid", placeItems: "center", flexShrink: 0, color: "#16A34A" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a8 8 0 01-2.3-1.4 9 9 0 01-1.6-2c-.2-.3 0-.4.1-.5l.4-.5a2 2 0 00.3-.5.4.4 0 000-.4 18 18 0 01-.8-2c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 2.9 2.9 0 00-.9 2.2c0 1.3 1 2.5 1 2.7s1.8 2.8 4.4 3.9c1.7.7 2.3.7 3.1.6.5 0 1.5-.6 1.7-1.2a2 2 0 00.2-1.2c-.1 0-.3-.1-.6-.3zM12 2a10 10 0 00-10 10 9.9 9.9 0 001.3 5L2 22l5.2-1.4a10 10 0 0014.8-8.6A10 10 0 0012 2z" />
                </svg>
              </span>
              <div>
                <p style={{ fontWeight: 600, fontFamily: "var(--font-display)", marginBottom: 4 }}>WhatsApp</p>
                <a href={cleanWhatsAppUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--slate)", fontSize: 15, textDecoration: "none" }}>{settings.whatsapp}</a>
              </div>
            </div>

            {/* Email */}
            <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
              <span style={{ width: 44, height: 44, background: "var(--blue-50)", border: "1px solid var(--blue-100)", borderRadius: 12, display: "grid", placeItems: "center", flexShrink: 0, color: "var(--blue-700)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <div>
                <p style={{ fontWeight: 600, fontFamily: "var(--font-display)", marginBottom: 4 }}>Email</p>
                <a href={`mailto:${settings.email}`} style={{ color: "var(--slate)", fontSize: 15, textDecoration: "none" }}>{settings.email}</a>
              </div>
            </div>

            {/* Business Hours */}
            <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
              <span style={{ width: 44, height: 44, background: "var(--blue-50)", border: "1px solid var(--blue-100)", borderRadius: 12, display: "grid", placeItems: "center", flexShrink: 0, color: "var(--blue-700)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <div>
                <p style={{ fontWeight: 600, fontFamily: "var(--font-display)", marginBottom: 4 }}>Business Hours</p>
                <p style={{ color: "var(--slate)", fontSize: 15 }}>{settings.businessHours}</p>
              </div>
            </div>

            {/* Social */}
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontWeight: 600, fontFamily: "var(--font-display)", marginBottom: 12 }}>Follow Us</p>
              <div style={{ display: "flex", gap: 10 }}>
                {settings.socialFacebook && (
                  <a
                    href={settings.socialFacebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid var(--line)", display: "grid", placeItems: "center", color: "var(--slate)", textDecoration: "none" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </a>
                )}
                {settings.socialInstagram && (
                  <a
                    href={settings.socialInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid var(--line)", display: "grid", placeItems: "center", color: "var(--slate)", textDecoration: "none" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.4a4 4 0 11-7.9 1.2 4 4 0 017.9-1.2z" /><circle cx="17.5" cy="6.5" r=".5" fill="currentColor" />
                    </svg>
                  </a>
                )}
                {settings.socialYoutube && (
                  <a
                    href={settings.socialYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid var(--line)", display: "grid", placeItems: "center", color: "var(--slate)", textDecoration: "none" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 001.95-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58z" opacity=".9" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

          </div>

          {/* Right: Form */}
          <form
            className="contact-form-card"
            onSubmit={handleSubmit}
            style={{
              background: "#fff",
              border: "1px solid var(--line)",
              borderRadius: "var(--r-lg)",
              padding: 36,
              boxShadow: "var(--sh-md)",
              position: "sticky",
              top: 80,
            }}
          >
            {submitted ? (
              <FormSuccess title="Message sent" message="Thanks for reaching out — we respond within 24 business hours." />
            ) : (
              <>
                <h3 style={{ fontSize: 24, marginBottom: 8 }}>{settings.formTitle}</h3>
                <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 28 }}>{settings.formDescription}</p>

                {errorMsg && (
                  <div style={{ color: "#dc2626", background: "#fef2f2", padding: "10px 14px", border: "1px solid #fecaca", borderRadius: "var(--r-sm)", fontSize: 13, marginBottom: 16 }}>
                    {errorMsg}
                  </div>
                )}

                <div className="mob-1col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <div className="field">
                    <label>Name<span className="req-mark">*</span></label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="field">
                    <label>Company</label>
                    <input
                      type="text"
                      placeholder="Company (optional)"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="mob-1col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <div className="field">
                    <label>Phone<span className="req-mark">*</span></label>
                    <input
                      type="tel"
                      inputMode="tel"
                      placeholder="10-digit mobile number"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                      maxLength={10}
                      pattern="[0-9]{10}"
                      title="Phone number must be exactly 10 digits"
                    />
                  </div>
                  <div className="field">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                      title="Please enter a valid email address"
                    />
                  </div>
                </div>
                <div className="field" style={{ marginBottom: 14 }}>
                  <label>Subject<span className="req-mark">*</span></label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  >
                    <option value="">Select a subject</option>
                    {settings.formSubjects.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="field" style={{ marginBottom: 24 }}>
                  <label>Message<span className="req-mark">*</span></label>
                  <textarea
                    placeholder="Tell us how we can help..."
                    required
                    rows={5}
                    style={{
                      padding: "12px 14px",
                      border: "1px solid var(--line)",
                      borderRadius: "var(--r-sm)",
                      font: "inherit",
                      fontSize: 15,
                      color: "var(--ink)",
                      background: "var(--paper-2)",
                      resize: "vertical",
                      outline: "none",
                      width: "100%",
                      transition: "border-color .15s, background .15s",
                      boxSizing: "border-box",
                    }}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "var(--blue-600)";
                      e.currentTarget.style.background = "#fff";
                      e.currentTarget.style.boxShadow = "0 0 0 4px var(--blue-100)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "var(--line)";
                      e.currentTarget.style.background = "var(--paper-2)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                <button type="submit" disabled={submitting} className="btn" style={{ width: "100%", justifyContent: "center" }}>
                  {submitting ? "Sending..." : "Send Message"}
                  <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section style={{ background: "#16A34A", padding: "clamp(36px,4vw,56px) 0" }}>
        <div
          className="container mob-col mob-gap-md"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}
        >
          <div>
            <h2 style={{ color: "#fff", fontSize: "clamp(20px,2.5vw,32px)", margin: 0 }}>
              {settings.whatsappTitle}
            </h2>
            <p style={{ color: "rgba(255,255,255,.8)", marginTop: 8, fontSize: 15 }}>
              {settings.whatsappDescription}
            </p>
          </div>
          <a
            href={cleanWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              height: 52,
              padding: "0 24px",
              background: "#fff",
              color: "#16A34A",
              borderRadius: 999,
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#16A34A">
              <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a8 8 0 01-2.3-1.4 9 9 0 01-1.6-2c-.2-.3 0-.4.1-.5l.4-.5a2 2 0 00.3-.5.4.4 0 000-.4 18 18 0 01-.8-2c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 2.9 2.9 0 00-.9 2.2c0 1.3 1 2.5 1 2.7s1.8 2.8 4.4 3.9c1.7.7 2.3.7 3.1.6.5 0 1.5-.6 1.7-1.2a2 2 0 00.2-1.2c-.1 0-.3-.1-.6-.3zM12 2a10 10 0 00-10 10 9.9 9.9 0 001.3 5L2 22l5.2-1.4a10 10 0 0014.8-8.6A10 10 0 0012 2z" />
            </svg>
            WhatsApp Us Now
          </a>
        </div>
      </section>
    </main>
  );
}
