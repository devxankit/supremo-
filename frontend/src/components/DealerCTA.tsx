"use client";

import { useState } from "react";

const perks = [
  { title: "Exclusive territory", desc: "Protected pincodes, no internal competition." },
  { title: "22–28% margin", desc: "Industry-best on tanks, generous slabs on pipes." },
  { title: "Marketing co-op", desc: "Hoardings, dealer board, local digital — funded." },
  { title: "Logistics covered", desc: "FOR delivery up to dealer godown. No freight." },
  { title: "Credit terms", desc: "30-day rolling credit after first 90 days." },
  { title: "Training & demo support", desc: "Quarterly meets, installer training, sample units." },
];

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export function DealerCTA() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section
      id="dealer"
      style={{
        background: "linear-gradient(180deg,var(--paper) 0%,var(--blue-50) 100%)",
      }}
    >
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
        }}
      >
        {/* Left */}
        <div>
          <span className="eyebrow">Dealership</span>
          <h2 style={{ fontSize: "clamp(34px,4.2vw,56px)", lineHeight: 1.05, letterSpacing: "-0.025em", marginTop: 20 }}>
            Partner with a{" "}
            <em style={{ fontStyle: "italic", fontWeight: 500, color: "var(--blue-700)" }}>brand that ships</em>.
          </h2>
          <p style={{ color: "var(--slate)", fontSize: 18, marginTop: 22, maxWidth: "50ch" }}>
            Supremo is opening 200+ new dealerships this fiscal across Tier-2 and Tier-3 India.
            Exclusive territory, healthy margins, and a manufacturing partner that won&apos;t run out of stock at the start of summer.
          </p>

          <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 28px" }}>
            {perks.map((p) => (
              <div key={p.title} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <span style={{ flexShrink: 0, width: 24, height: 24, display: "grid", placeItems: "center", background: "var(--blue-600)", color: "#fff", borderRadius: 999, marginTop: 2 }}>
                  <CheckIcon />
                </span>
                <div>
                  <b style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15 }}>{p.title}</b>
                  <span style={{ color: "var(--muted)", fontSize: 13.5, lineHeight: 1.5 }}>{p.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#" className="btn">Talk to the regional head →</a>
            <a href="#" className="btn btn--outline">Read dealer FAQ</a>
          </div>
        </div>

        {/* Right: form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          style={{
            background: "#fff",
            border: "1px solid var(--line)",
            borderRadius: "var(--r-lg)",
            padding: 36,
            boxShadow: "var(--sh-lg)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <h3 style={{ fontSize: 24, letterSpacing: "-0.01em" }}>Become a dealer</h3>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 13, color: "var(--blue-700)", fontWeight: 600, letterSpacing: "0.06em" }}>
              2 min · 7 fields
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
            <div className="field"><label>Your name</label><input type="text" placeholder="Rakesh Sharma" required /></div>
            <div className="field"><label>Business name</label><input type="text" placeholder="Sharma Sanitary Stores" /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
            <div className="field"><label>City</label><input type="text" placeholder="Indore" required /></div>
            <div className="field">
              <label>State</label>
              <select>
                <option>Select state</option>
                {["Maharashtra", "Madhya Pradesh", "Gujarat", "Telangana", "Uttar Pradesh", "Karnataka", "Tamil Nadu", "Rajasthan"].map(s => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
            <div className="field"><label>Phone (WhatsApp)</label><input type="tel" placeholder="+91 98XXX XXXXX" required /></div>
            <div className="field"><label>Email</label><input type="email" placeholder="rakesh@example.com" /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
            <div className="field">
              <label>Existing business</label>
              <select>
                {["Hardware & Sanitary", "Builder/Contractor", "Agri Inputs", "Retail (general)", "New venture"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Investment capacity</label>
              <select>
                {["₹2 – 5 L", "₹5 – 10 L", "₹10 – 25 L", "₹25 L +"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginTop: 22, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <span style={{ fontSize: 12, color: "var(--muted)", maxWidth: "24ch" }}>
              Your details stay private. Our regional head calls within 24 hrs.
            </span>
            <button type="submit" className="btn" style={{ flexShrink: 0 }}>
              {submitted ? "✓ Sent — we'll call within 24 hrs" : (
                <>
                  Submit inquiry{" "}
                  <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
