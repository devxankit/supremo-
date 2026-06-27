"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import { FormSuccess } from "@/components/FormSuccess";
import { STATES_AND_DISTRICTS, STATES } from "@/app/(main)/dealership/statesData";

export function BigCTA({
  heading,
  headingHighlight,
  sub,
  phone,
}: {
  heading?: string;
  headingHighlight?: string;
  sub?: string;
  phone?: string;
}) {
  const displayHeading = heading || "";
  const displayHeadingHighlight = headingHighlight || "";
  const displaySub = sub || "";
  const displayPhone = phone || PHONE_DISPLAY;
  const displayPhoneTel = phone ? phone.replace(/[^\d+]/g, "") : PHONE_TEL;
  const [submitted, setSubmitted] = useState(false);
  const [showCTA, setShowCTA] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phoneVal, setPhoneVal] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const cities = selectedState ? (STATES_AND_DISTRICTS[selectedState] || []) : [];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
      const res = await fetch(`${apiBase}/inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "dealer",
          name,
          email,
          businessName,
          phone: phoneVal,
          city: selectedCity,
          state: selectedState,
          cityState: `${selectedCity}, ${selectedState}`,
          message: `Zip Code: ${zipCode}${message ? `\n\nMessage: ${message}` : ""}`,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to submit inquiry. Please try again.");
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("Home dealership inquiry error:", err);
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/settings`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.showDealerCTA === false) {
          setShowCTA(false);
        }
      })
      .catch((err) => {
        console.error("Error loading showDealerCTA setting:", err);
      });
  }, []);

  if (!showCTA || (!displayHeading && !displaySub)) return null;

  return (
    <section style={{ padding: "40px 0 32px" }}>
      <div
        className="mob-1col mob-gap-lg mob-margin-0 mob-radius-md"
        style={{
          position: "relative",
          margin: "0 var(--gutter)",
          padding: "clamp(48px,8vw,100px) clamp(28px,6vw,80px)",
          borderRadius: 28,
          overflow: "hidden",
          background:
            "radial-gradient(ellipse 60% 80% at 100% 0%,rgba(47,123,255,.5),transparent 60%),linear-gradient(135deg,#062D6B 0%,#0A3F8F 100%)",
          color: "#fff",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 56,
          alignItems: "center",
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
            WebkitMaskImage: "radial-gradient(ellipse 70% 80% at 80% 50%,#000 0%,transparent 70%)",
            maskImage: "radial-gradient(ellipse 70% 80% at 80% 50%,#000 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Left */}
        <div style={{ position: "relative" }}>
          <span className="eyebrow eyebrow-light">Become a Partner</span>
          <h2
            style={{
              color: "#fff",
              fontSize: "clamp(28px,4.5vw,56px)",
              lineHeight: 1.15,
              marginTop: 20,
            }}
          >
            {displayHeading}
            {displayHeadingHighlight && (
              <span style={{ display: "block", color: "#60A5FA" }}>
                {displayHeadingHighlight}
              </span>
            )}
          </h2>
          <p style={{ color: "rgba(255,255,255,.78)", fontSize: 17, marginTop: 20, maxWidth: "50ch" }}>
            {displaySub}
          </p>
          <div style={{ marginTop: 36, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href={`tel:${displayPhoneTel}`}
              className="btn btn--white cta-call-btn"
              style={{
                fontSize: "24px",
                padding: "20px 48px",
                borderRadius: "16px",
                fontWeight: 800,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)",
                display: "inline-flex",
                alignItems: "center",
                gap: "16px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: "scale(1)",
                backgroundColor: "#ffffff",
                color: "#062D6B",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05) translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 20px 35px -5px rgba(0, 0, 0, 0.4), 0 12px 16px -6px rgba(0, 0, 0, 0.4)";
                e.currentTarget.style.backgroundColor = "#f8fafc";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1) translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)";
                e.currentTarget.style.backgroundColor = "#ffffff";
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {displayPhone.toLowerCase().startsWith("call") ? displayPhone : `Call ${displayPhone}`}
            </a>
          </div>
        </div>

        {/* Right: Form */}
        <form
          onSubmit={handleFormSubmit}
          className="dealer-form"
          style={{
            position: "relative",
            background: "#fff",
            border: "1px solid var(--line)",
            borderRadius: "var(--r-lg)",
            padding: "28px 28px",
            boxShadow: "var(--sh-lg)",
            color: "var(--ink)",
            zIndex: 2,
            width: "100%",
            maxWidth: 480,
            margin: "0 auto",
          }}
        >
          {submitted ? (
            <FormSuccess title="Request received" message="Thanks! Our regional head will call you within 24 hours." />
          ) : (
          <>
          <h3
            style={{
              fontSize: "clamp(18px, 2vw, 20px)",
              fontWeight: 700,
              color: "var(--ink)",
              marginBottom: 20,
              lineHeight: 1.3,
            }}
          >
            Become a Partner
          </h3>

          {errorMsg && (
            <div style={{ background: "rgba(239, 68, 68, 0.08)", border: "1px solid #EF4444", color: "#b91c1c", padding: "10px 14px", borderRadius: 4, fontSize: 13, marginBottom: 16 }}>
              {errorMsg}
            </div>
          )}

          {/* Name Field */}
          <div style={{ position: "relative", marginBottom: 16 }}>
            <label
              style={{
                position: "absolute",
                top: -8,
                left: 12,
                background: "#fff",
                padding: "0 6px",
                fontSize: 12,
                color: "#6b7280",
                pointerEvents: "none",
                fontWeight: 500,
                zIndex: 1,
              }}
            >
              Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                height: 44,
                padding: "0 14px",
                border: "1px solid #ccc",
                borderRadius: 4,
                fontSize: 13.5,
                background: "transparent",
                outline: "none",
                color: "var(--ink)",
              }}
            />
          </div>

          {/* Business Name Field */}
          <div style={{ position: "relative", marginBottom: 16 }}>
            <label
              style={{
                position: "absolute",
                top: -8,
                left: 12,
                background: "#fff",
                padding: "0 6px",
                fontSize: 12,
                color: "#6b7280",
                pointerEvents: "none",
                fontWeight: 500,
                zIndex: 1,
              }}
            >
              Business Name *
            </label>
            <input
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              style={{
                width: "100%",
                height: 44,
                padding: "0 14px",
                border: "1px solid #ccc",
                borderRadius: 4,
                fontSize: 13.5,
                background: "transparent",
                outline: "none",
                color: "var(--ink)",
              }}
            />
          </div>

          {/* Email Field */}
          <div style={{ position: "relative", marginBottom: 16 }}>
            <label
              style={{
                position: "absolute",
                top: -8,
                left: 12,
                background: "#fff",
                padding: "0 6px",
                fontSize: 12,
                color: "#6b7280",
                pointerEvents: "none",
                fontWeight: 500,
                zIndex: 1,
              }}
            >
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                height: 44,
                padding: "0 14px",
                border: "1px solid #ccc",
                borderRadius: 4,
                fontSize: 13.5,
                background: "transparent",
                outline: "none",
                color: "var(--ink)",
              }}
            />
          </div>

          {/* Contact Number Field */}
          <div style={{ position: "relative", marginBottom: 16 }}>
            <label
              style={{
                position: "absolute",
                top: -8,
                left: 12,
                background: "#fff",
                padding: "0 6px",
                fontSize: 12,
                color: "#6b7280",
                pointerEvents: "none",
                fontWeight: 500,
                zIndex: 1,
              }}
            >
              Contact Number *
            </label>
            <input
              type="tel"
              inputMode="tel"
              required
              maxLength={10}
              pattern="[0-9]{10}"
              title="Contact number must be exactly 10 digits"
              placeholder="10-digit mobile number"
              value={phoneVal}
              onChange={(e) => setPhoneVal(e.target.value.replace(/\D/g, "").slice(0, 10))}
              style={{
                width: "100%",
                height: 44,
                padding: "0 14px",
                border: "1px solid #ccc",
                borderRadius: 4,
                fontSize: 13.5,
                background: "transparent",
                outline: "none",
                color: "var(--ink)",
              }}
            />
          </div>

          {/* Zip Code Field */}
          <div style={{ position: "relative", marginBottom: 16 }}>
            <label
              style={{
                position: "absolute",
                top: -8,
                left: 12,
                background: "#fff",
                padding: "0 6px",
                fontSize: 12,
                color: "#6b7280",
                pointerEvents: "none",
                fontWeight: 500,
                zIndex: 1,
              }}
            >
              Zip Code *
            </label>
            <input
              type="text"
              required
              maxLength={6}
              pattern="[0-9]{6}"
              title="Zip code must be exactly 6 digits"
              placeholder="e.g. 452001"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              style={{
                width: "100%",
                height: 44,
                padding: "0 14px",
                border: "1px solid #ccc",
                borderRadius: 4,
                fontSize: 13.5,
                background: "transparent",
                outline: "none",
                color: "var(--ink)",
              }}
            />
          </div>

          {/* State Field */}
          <div style={{ position: "relative", marginBottom: 16 }}>
            <label
              style={{
                position: "absolute",
                top: -8,
                left: 12,
                background: "#fff",
                padding: "0 6px",
                fontSize: 12,
                color: "#6b7280",
                pointerEvents: "none",
                fontWeight: 500,
                zIndex: 1,
              }}
            >
              State *
            </label>
            <select
              required
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedCity("");
              }}
              style={{
                width: "100%",
                height: 44,
                padding: "0 14px",
                border: "1px solid #ccc",
                borderRadius: 4,
                fontSize: 13.5,
                background: "#fff",
                outline: "none",
                color: "var(--ink)",
                appearance: "none",
                cursor: "pointer",
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234b5563' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 14px center",
                backgroundSize: "16px",
              }}
            >
              <option value="" disabled>Select State</option>
              {STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* City Field */}
          <div style={{ position: "relative", marginBottom: 16 }}>
            <label
              style={{
                position: "absolute",
                top: -8,
                left: 12,
                background: "#fff",
                padding: "0 6px",
                fontSize: 12,
                color: "#6b7280",
                pointerEvents: "none",
                fontWeight: 500,
                zIndex: 1,
              }}
            >
              City *
            </label>
            <select
              required
              disabled={!selectedState}
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              style={{
                width: "100%",
                height: 44,
                padding: "0 14px",
                border: "1px solid #ccc",
                borderRadius: 4,
                fontSize: 13.5,
                background: selectedState ? "#fff" : "#f3f4f6",
                outline: "none",
                color: "var(--ink)",
                appearance: "none",
                cursor: selectedState ? "pointer" : "not-allowed",
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234b5563' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 14px center",
                backgroundSize: "16px",
              }}
            >
              <option value="" disabled>
                {selectedState ? "Select City" : "Select state first"}
              </option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Message Field */}
          <div style={{ position: "relative", marginBottom: 14 }}>
            <label
              style={{
                position: "absolute",
                top: -8,
                left: 12,
                background: "#fff",
                padding: "0 6px",
                fontSize: 12,
                color: "#6b7280",
                pointerEvents: "none",
                fontWeight: 500,
                zIndex: 1,
              }}
            >
              Message
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "1px solid #ccc",
                borderRadius: 4,
                fontSize: 13.5,
                background: "transparent",
                outline: "none",
                resize: "none",
                color: "var(--ink)",
              }}
            />
          </div>
          {/* Submit Button */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="submit"
              disabled={submitting}
              style={{
                background: submitting ? "var(--blue-400)" : "var(--blue-600)",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "10px 24px",
                fontSize: 13,
                fontWeight: 700,
                cursor: submitting ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                letterSpacing: "0.05em",
                boxShadow: "0 2px 6px rgba(37, 99, 235, 0.2)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!submitting) {
                  e.currentTarget.style.backgroundColor = "var(--blue-700)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!submitting) {
                  e.currentTarget.style.backgroundColor = "var(--blue-600)";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              {submitting ? "SUBMITTING..." : "SUBMIT"}
              {!submitting && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 2 }}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>
          </>
          )}
        </form>
      </div>
    </section>
  );
}
