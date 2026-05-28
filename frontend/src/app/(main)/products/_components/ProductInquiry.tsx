"use client";

import { useState } from "react";

export function ProductInquiry({ productName }: { productName: string }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="inquiry-card"
    >
      <h3 style={{ fontSize: 24, marginBottom: 8 }}>Enquire about this product</h3>
      <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>
        Get dealer and bulk pricing for <strong style={{ color: "var(--ink)" }}>{productName}</strong> — we reply within 24 hours.
      </p>

      <div className="mob-1col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <div className="field"><label>Name</label><input type="text" placeholder="Your full name" required /></div>
        <div className="field"><label>Phone</label><input type="tel" placeholder="+91 98XXX XXXXX" required /></div>
      </div>
      <div className="mob-1col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <div className="field"><label>Email</label><input type="email" placeholder="you@example.com" /></div>
        <div className="field"><label>City</label><input type="text" placeholder="City" /></div>
      </div>
      <div className="field" style={{ marginBottom: 24 }}>
        <label>Message</label>
        <textarea
          placeholder="Quantity needed, sizes, timeline..."
          rows={4}
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
            boxSizing: "border-box",
          }}
        />
      </div>

      <button type="submit" className="btn" style={{ width: "100%", justifyContent: "center" }}>
        {submitted ? (
          "Sent — we'll be in touch within 24 hrs"
        ) : (
          <>
            Send Enquiry
            <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
