"use client";

import { useState } from "react";

const branches = [
  {
    city: "Indore, MP",
    label: "Head Office",
    address: "Supremo Tank Factory, near Shreenathji Tol Kanta, Badia Keema, Madhya Pradesh 452016",
    phone: "080 4801 9654",
    email: "supremoindore@gmail.com",
    primary: true,
  },
  {
    city: "Pune, MH",
    label: "West Regional Office",
    address: "MIDC Industrial Area, Pune, Maharashtra",
    phone: "+91 909 898 9090",
    email: "pune@supremo.in",
    primary: false,
  },
  {
    city: "Hyderabad, TS",
    label: "South Regional Office",
    address: "IDA Uppal, Hyderabad, Telangana",
    phone: "+91 909 898 9090",
    email: "hyd@supremo.in",
    primary: false,
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          background: "linear-gradient(135deg, var(--blue-900) 0%, var(--blue-800) 60%, var(--ink) 100%)",
          minHeight: 320,
          display: "flex",
          alignItems: "center",
          paddingTop: 62,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className="container"
          style={{
            position: "relative",
            paddingTop: "clamp(40px,5vw,64px)",
            paddingBottom: "clamp(40px,5vw,64px)",
          }}
        >
          <span className="eyebrow eyebrow-light">Contact</span>
          <h1
            style={{
              color: "#fff",
              fontSize: "clamp(32px,5vw,60px)",
              lineHeight: 1.1,
              marginTop: 16,
            }}
          >
            Get in Touch
          </h1>
          <p style={{ color: "rgba(255,255,255,.7)", fontSize: 17, marginTop: 16, maxWidth: "48ch" }}>
            Whether it&apos;s a product inquiry, dealership question or a bulk order — our team responds within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Split */}
      <section style={{ background: "var(--paper)" }}>
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
                <p style={{ fontWeight: 600, fontFamily: "var(--font-display)", marginBottom: 4 }}>Factory & Head Office</p>
                <p style={{ color: "var(--slate)", fontSize: 15, lineHeight: 1.7 }}>
                  Supremo Tank Factory,<br />
                  near Shreenathji Tol Kanta, Badia Keema,<br />
                  Madhya Pradesh 452016
                </p>
              </div>
            </div>

            {/* Phone */}
            <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
              <span style={{ width: 44, height: 44, background: "var(--blue-50)", border: "1px solid var(--blue-100)", borderRadius: 12, display: "grid", placeItems: "center", flexShrink: 0, color: "var(--blue-700)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.09 5.18 2 2 0 015.09 3h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 10.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </span>
              <div>
                <p style={{ fontWeight: 600, fontFamily: "var(--font-display)", marginBottom: 4 }}>Phone</p>
                <a href="tel:08048019654" style={{ color: "var(--slate)", fontSize: 15, textDecoration: "none" }}>080 4801 9654</a>
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
                <a href="https://wa.me/919098989090" target="_blank" rel="noopener noreferrer" style={{ color: "var(--slate)", fontSize: 15, textDecoration: "none" }}>+91 909 898 9090</a>
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
                <a href="mailto:supremoindore@gmail.com" style={{ color: "var(--slate)", fontSize: 15, textDecoration: "none" }}>supremoindore@gmail.com</a>
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
                <p style={{ color: "var(--slate)", fontSize: 15 }}>Mon – Sat: 9:00 AM – 6:00 PM IST</p>
              </div>
            </div>

            {/* Social */}
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontWeight: 600, fontFamily: "var(--font-display)", marginBottom: 12 }}>Follow Us</p>
              <div style={{ display: "flex", gap: 10 }}>
                <a
                  href="https://www.facebook.com/supremo.tanks/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid var(--line)", display: "grid", placeItems: "center", color: "var(--slate)", textDecoration: "none" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/supremo.india/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid var(--line)", display: "grid", placeItems: "center", color: "var(--slate)", textDecoration: "none" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.4a4 4 0 11-7.9 1.2 4 4 0 017.9-1.2z" /><circle cx="17.5" cy="6.5" r=".5" fill="currentColor" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@Supremo_India_Pvt_Ltd"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid var(--line)", display: "grid", placeItems: "center", color: "var(--slate)", textDecoration: "none" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 001.95-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58z" opacity=".9"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Map placeholder */}
            <a
              href="https://maps.google.com/?q=Supremo+Tank+Factory+Badia+Keema+Indore+MP"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                background: "var(--paper-2)",
                border: "1px solid var(--line)",
                borderRadius: "var(--r-md)",
                height: 180,
                textDecoration: "none",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Map grid background */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px)",
                  backgroundSize: "30px 30px",
                  opacity: 0.7,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <span style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--blue-600)", display: "grid", placeItems: "center", color: "#fff" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--ink)" }}>View on Google Maps</span>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>Badia Keema, Indore, MP 452016</span>
              </div>
            </a>
          </div>

          {/* Right: Form */}
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
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
            <h3 style={{ fontSize: 24, marginBottom: 8 }}>Send us a message</h3>
            <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 28 }}>We respond within 24 business hours.</p>

            <div className="mob-1col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <div className="field"><label>Name</label><input type="text" placeholder="Your full name" required /></div>
              <div className="field"><label>Company</label><input type="text" placeholder="Company (optional)" /></div>
            </div>
            <div className="mob-1col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <div className="field"><label>Phone</label><input type="tel" placeholder="+91 98XXX XXXXX" required /></div>
              <div className="field"><label>Email</label><input type="email" placeholder="you@example.com" /></div>
            </div>
            <div className="field" style={{ marginBottom: 14 }}>
              <label>Subject</label>
              <select required>
                <option value="">Select a subject</option>
                {["Product Inquiry", "Dealership", "Bulk Order", "Technical Support", "Other"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="field" style={{ marginBottom: 24 }}>
              <label>Message</label>
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

            <button type="submit" className="btn" style={{ width: "100%", justifyContent: "center" }}>
              {submitted ? (
                "Message sent — we'll be in touch soon!"
              ) : (
                <>
                  Send Message
                  <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Branch Locations */}
      <section style={{ background: "var(--paper-2)" }}>
        <div className="container">
          <span className="eyebrow">Our Offices</span>
          <h2 style={{ fontSize: "clamp(24px,3vw,40px)", marginTop: 16, marginBottom: 48 }}>
            Find us across India
          </h2>
          <div
            className="mob-1col mob-gap-md"
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}
          >
            {branches.map((b) => (
              <div
                key={b.city}
                style={{
                  background: b.primary ? "linear-gradient(135deg, var(--blue-700), var(--blue-900))" : "#fff",
                  border: b.primary ? "none" : "1px solid var(--line)",
                  borderRadius: "var(--r-md)",
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {b.primary && (
                  <span style={{ padding: "3px 10px", background: "rgba(255,255,255,.15)", color: "#fff", borderRadius: 999, fontSize: 11, fontWeight: 600, alignSelf: "flex-start" }}>
                    Head Office
                  </span>
                )}
                <h3 style={{ fontSize: 22, color: b.primary ? "#fff" : "var(--ink)" }}>{b.city}</h3>
                <p style={{ fontSize: 13, fontWeight: 600, color: b.primary ? "var(--blue-400)" : "var(--blue-700)" }}>{b.label}</p>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: b.primary ? "rgba(255,255,255,.7)" : "var(--slate)" }}>{b.address}</p>
                <a
                  href={`tel:${b.phone.replace(/\s/g, "")}`}
                  style={{ fontSize: 14, color: b.primary ? "rgba(255,255,255,.8)" : "var(--blue-700)", fontWeight: 500, textDecoration: "none" }}
                >
                  {b.phone}
                </a>
                <a
                  href={`mailto:${b.email}`}
                  style={{ fontSize: 13, color: b.primary ? "rgba(255,255,255,.55)" : "var(--muted)", textDecoration: "none" }}
                >
                  {b.email}
                </a>
              </div>
            ))}
          </div>
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
              Need help urgently?
            </h2>
            <p style={{ color: "rgba(255,255,255,.8)", marginTop: 8, fontSize: 15 }}>
              Our WhatsApp team is available Mon–Sat, 9 AM – 6 PM. Average response time: 15 minutes.
            </p>
          </div>
          <a
            href="https://wa.me/919098989090"
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
