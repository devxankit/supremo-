"use client";

import { useState } from "react";
import { PHONE_DISPLAY, validateEmail } from "@/lib/site";
import { FormSuccess } from "@/components/FormSuccess";

export function ProductInquiry({ productName }: { productName: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (email && !validateEmail(email)) {
      setError("Please enter a valid email address. Check for typos (e.g. gmail.com instead of gmailll.comm).");
      return;
    }

    setLoading(true);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
      const res = await fetch(`${apiBase}/inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "product",
          name,
          phone,
          email: email || undefined,
          cityState: city || undefined,
          subject: `Product inquiry - ${productName}`,
          message,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to submit inquiry");
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="inquiry-card">
        <FormSuccess message={`Thanks for your interest in ${productName}. Our team will reply within 24 hours.`} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="inquiry-card">
      <h3 style={{ fontSize: 24, marginBottom: 8 }}>Enquire about this product</h3>
      <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>
        Get dealer and bulk pricing for <strong style={{ color: "var(--ink)" }}>{productName}</strong> — we reply within 24 hours.
      </p>

      {error && (
        <div style={{ color: "#E5484D", fontSize: 14, marginBottom: 14, background: "rgba(229, 72, 77, 0.1)", padding: "10px 14px", borderRadius: "var(--r-sm)" }}>
          {error}
        </div>
      )}

      <div className="mob-1col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <div className="field">
          <label>Name<span className="req-mark">*</span></label>
          <input type="text" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="field">
          <label>Phone<span className="req-mark">*</span></label>
          <input 
            type="tel" 
            inputMode="tel" 
            placeholder="10-digit mobile number" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} 
            required 
            maxLength={10}
            pattern="[0-9]{10}"
            title="Phone number must be exactly 10 digits"
          />
        </div>
      </div>
      <div className="mob-1col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <div className="field">
          <label>Email</label>
          <input 
            type="email" 
            placeholder="you@example.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            title="Please enter a valid email address"
          />
        </div>
        <div className="field">
          <label>City</label>
          <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
      </div>
      <div className="field" style={{ marginBottom: 24 }}>
        <label>Message</label>
        <textarea
          placeholder="Quantity needed, sizes, timeline..."
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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

      <button type="submit" disabled={loading} className="btn" style={{ width: "100%", justifyContent: "center" }}>
        {loading ? "Sending..." : "Send Enquiry"}
        <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M7 17L17 7M9 7h8v8" />
        </svg>
      </button>
    </form>
  );
}
