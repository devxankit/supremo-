"use client";

import { useState } from "react";
import Link from "next/link";

const benefits = [
  {
    title: "Exclusive Territory",
    desc: "Protected pincodes assigned to your dealership — no internal competition from Supremo or other dealers in your zone.",
    icon: "🗺",
  },
  {
    title: "22–28% Margin",
    desc: "Industry-best margin slabs on water tanks. Tiered incentive schemes reward volume growth every quarter.",
    icon: "📈",
  },
  {
    title: "Marketing Co-op",
    desc: "Supremo funds hoardings, dealer board, digital ads and local promotions in your territory — at zero cost to you.",
    icon: "📣",
  },
  {
    title: "Zero Freight",
    desc: "FOR delivery directly to your godown. Freight cost is fully absorbed by Supremo — no hidden charges.",
    icon: "🚚",
  },
  {
    title: "30-Day Credit",
    desc: "Rolling 30-day credit terms after your first 90 days. Keeps your working capital healthy through peak seasons.",
    icon: "💳",
  },
  {
    title: "Digital Tools",
    desc: "Dealer portal for stock visibility, order placement and scheme tracking. WhatsApp ordering available 24×7.",
    icon: "📱",
  },
];

const steps = [
  { n: 1, title: "Fill the form", sub: "Takes under 2 minutes. Basic business details only.", time: "2 min" },
  { n: 2, title: "Regional head calls", sub: "Our regional sales manager calls within 24 hours of submission.", time: "24 hrs" },
  { n: 3, title: "Territory assessment", sub: "We map your pincode, review the opportunity and finalise the dealership agreement.", time: "3–5 days" },
  { n: 4, title: "Stock up & start selling", sub: "Minimum ₹2 L opening stock. Your Supremo journey begins.", time: "From Day 1" },
];

/*
const testimonials = [
  {
    text: "Supremo replaced three lines in my shop last year. The 1000L Triple Layer outsells every other tank in our pincode. Dispatch is reliable — that's what makes the difference.",
    name: "Rakesh Sharma",
    role: "Sharma Sanitary · Indore, MP · Dealer since 2021",
    initials: "RS",
  },
  {
    text: "The dealer portal alone saved me two hours a day. I see stock, schemes and dispatch from my phone.",
    name: "Manoj Patel",
    role: "Surat, GJ · Dealer since 2020",
    initials: "MP",
  },
  {
    text: "22% margin and no freight headache. We doubled our tank sales the first season we switched.",
    name: "Anil Kumar",
    role: "Hyderabad, TS · Dealer since 2019",
    initials: "AK",
  },
];
*/

const faqs = [
  {
    q: "What is the minimum investment to become a Supremo dealer?",
    a: "The minimum opening stock investment is ₹2 lakhs. This covers a representative range of Supremo products for your territory. There is no separate dealership fee or franchise cost.",
  },
  {
    q: "Is my territory exclusive?",
    a: "Yes. Every Supremo dealer is assigned exclusive pincodes. We do not appoint competing dealers within your protected territory.",
  },
  {
    q: "How long does the approval process take?",
    a: "From form submission to agreement signing typically takes 5–7 business days. Our regional head will call you within 24 hours of receiving your application.",
  },
  {
    q: "What products will I carry as a dealer?",
    a: "You will stock the full Supremo range: water tanks (triple-layer, overhead, sump), PVC/CPVC pipes, utility accessories (ghamelas, milk cans, cooler bodies), planters and more. Category mix is guided by territory demand.",
  },
  {
    q: "Is there a dealership fee or franchise charge?",
    a: "No. There is no upfront dealership fee. You pay only for your opening stock at the standard dealer price. All territory, branding and co-op marketing support is provided free of charge.",
  },
  {
    q: "What ongoing support does Supremo provide?",
    a: "Supremo provides dedicated regional manager support, quarterly business reviews, co-op marketing funds, digital ordering tools, exclusive scheme eligibility and seasonal incentives. Training meets are held quarterly.",
  },
];

export default function DealershipPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          background: "linear-gradient(135deg, var(--blue-900) 0%, var(--blue-800) 50%, var(--ink) 100%)",
          minHeight: 500,
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
            paddingTop: "clamp(56px,7vw,96px)",
            paddingBottom: "clamp(56px,7vw,96px)",
          }}
        >
          <span className="eyebrow eyebrow-light">Dealership Programme</span>
          <h1
            style={{
              color: "#fff",
              fontSize: "clamp(34px,5.5vw,68px)",
              lineHeight: 1.1,
              marginTop: 16,
              maxWidth: "20ch",
            }}
          >
            Join{" "}
            <span style={{ color: "var(--blue-400)" }}>1,200+ Successful</span>{" "}
            Supremo Dealers
          </h1>
          <p style={{ color: "rgba(255,255,255,.7)", fontSize: 18, marginTop: 20, maxWidth: "54ch", lineHeight: 1.7 }}>
            Supremo is opening 200+ new dealerships this fiscal across Tier-2 and Tier-3 India. Exclusive territory, 22–28% margin, zero freight and co-op marketing — the opportunity starts with one form.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 40, flexWrap: "wrap" }}>
            <a href="#apply" className="btn btn--white">
              Apply Now
              <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
            <a
              href="https://wa.me/919098989090"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a8 8 0 01-2.3-1.4 9 9 0 01-1.6-2c-.2-.3 0-.4.1-.5l.4-.5a2 2 0 00.3-.5.4.4 0 000-.4 18 18 0 01-.8-2c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 2.9 2.9 0 00-.9 2.2c0 1.3 1 2.5 1 2.7s1.8 2.8 4.4 3.9c1.7.7 2.3.7 3.1.6.5 0 1.5-.6 1.7-1.2a2 2 0 00.2-1.2c-.1 0-.3-.1-.6-.3zM12 2a10 10 0 00-10 10 9.9 9.9 0 001.3 5L2 22l5.2-1.4a10 10 0 0014.8-8.6A10 10 0 0012 2z" />
              </svg>
              WhatsApp +91 909 898 9090
            </a>
          </div>
        </div>
      </section>

      {/* Why Supremo */}
      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          <span className="eyebrow">Why Supremo</span>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", marginTop: 16, marginBottom: 48 }}>
            Built for dealer profitability.
          </h2>
          <div
            className="mob-1col mob-gap-md"
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}
          >
            {benefits.map((b) => (
              <div
                key={b.title}
                style={{
                  background: "var(--paper-2)",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r-md)",
                  padding: 28,
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 16 }}>{b.icon}</div>
                <h3 style={{ fontSize: 20, marginBottom: 10 }}>{b.title}</h3>
                <p style={{ color: "var(--slate)", fontSize: 15, lineHeight: 1.7 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <div style={{ background: "var(--blue-700)", padding: "48px 0" }}>
        <div
          className="container mob-1col mob-gap-sm"
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0 }}
        >
          {[
            { v: "200+", l: "New openings this fiscal" },
            { v: "24 hrs", l: "Callback guarantee" },
            { v: "₹2 L", l: "Minimum investment" },
          ].map((s, i) => (
            <div
              key={s.l}
              style={{
                textAlign: "center",
                padding: "24px 32px",
                borderRight: i < 2 ? "1px solid rgba(255,255,255,.2)" : "none",
              }}
            >
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,5vw,60px)", fontWeight: 700, color: "#fff", lineHeight: 1 }}>
                {s.v}
              </div>
              <div style={{ color: "rgba(255,255,255,.6)", fontSize: 15, marginTop: 10 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How it Works */}
      <section style={{ background: "var(--paper-2)" }}>
        <div className="container">
          <span className="eyebrow">The Process</span>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", marginTop: 16, marginBottom: 56 }}>
            Four steps to your dealership.
          </h2>
          <div
            className="mob-1col mob-gap-md"
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}
          >
            {steps.map((s) => (
              <div
                key={s.n}
                style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r-md)",
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "var(--blue-600)",
                    color: "#fff",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 20,
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                  }}
                >
                  {s.n}
                </div>
                <h3 style={{ fontSize: 20 }}>{s.title}</h3>
                <p style={{ color: "var(--slate)", fontSize: 14.5, lineHeight: 1.6 }}>{s.sub}</p>
                <span style={{ padding: "3px 10px", background: "var(--blue-50)", color: "var(--blue-800)", borderRadius: 999, fontSize: 12, fontWeight: 600, alignSelf: "flex-start" }}>
                  {s.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" style={{ background: "var(--paper)" }}>
        <div
          className="container mob-1col mob-gap-lg"
          style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 64, alignItems: "center" }}
        >
          {/* Left info */}
          <div>
            <span className="eyebrow">Apply Now</span>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", marginTop: 16, marginBottom: 20 }}>
              Become a Supremo partner
            </h2>
            <p style={{ color: "var(--slate)", fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>
              Ready to start your Supremo journey? Submit an inquiry on the homepage, or connect with our regional sales office directly.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <a
                href="tel:08048019654"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 18px",
                  background: "var(--paper-2)",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r-md)",
                  textDecoration: "none",
                  color: "var(--ink)",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--blue-400)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
              >
                <span style={{ width: 36, height: 36, borderRadius: 8, background: "var(--blue-100)", display: "grid", placeItems: "center", flexShrink: 0, color: "var(--blue-700)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.09 5.18 2 2 0 015.09 3h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 10.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </span>
                <div>
                  <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500, marginBottom: 2 }}>Call us directly</div>
                  <div style={{ fontWeight: 600, fontFamily: "var(--font-display)", fontSize: 15 }}>080 4801 9654</div>
                </div>
              </a>
              <a
                href="https://wa.me/919098989090"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 18px",
                  background: "var(--paper-2)",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r-md)",
                  textDecoration: "none",
                  color: "var(--ink)",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--blue-400)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
              >
                <span style={{ width: 36, height: 36, borderRadius: 8, background: "#DCFCE7", display: "grid", placeItems: "center", flexShrink: 0, color: "#16A34A" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a8 8 0 01-2.3-1.4 9 9 0 01-1.6-2c-.2-.3 0-.4.1-.5l.4-.5a2 2 0 00.3-.5.4.4 0 000-.4 18 18 0 01-.8-2c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 2.9 2.9 0 00-.9 2.2c0 1.3 1 2.5 1 2.7s1.8 2.8 4.4 3.9c1.7.7 2.3.7 3.1.6.5 0 1.5-.6 1.7-1.2a2 2 0 00.2-1.2c-.1 0-.3-.1-.6-.3zM12 2a10 10 0 00-10 10 9.9 9.9 0 001.3 5L2 22l5.2-1.4a10 10 0 0014.8-8.6A10 10 0 0012 2z" />
                  </svg>
                </span>
                <div>
                  <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500, marginBottom: 2 }}>WhatsApp</div>
                  <div style={{ fontWeight: 600, fontFamily: "var(--font-display)", fontSize: 15 }}>+91 909 898 9090</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right side Image */}
          <div
            style={{
              borderRadius: "var(--r-lg)",
              overflow: "hidden",
              border: "1px solid var(--line)",
              boxShadow: "var(--sh-md)",
              height: 380,
              position: "relative",
            }}
          >
            <img
              src="/images/image 1.png"
              alt="Supremo Awards and Network"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </section>

      {/* Testimonials 
      <section style={{ background: "var(--paper-2)" }}>
        <div className="container">
          <span className="eyebrow">Dealer Voices</span>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", marginTop: 16, marginBottom: 48 }}>
            What our partners actually say.
          </h2>
          <div
            className="mob-scroll"
            style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 20 }}
          >
            {testimonials.map((q, i) => (
              <article
                key={q.name}
                className="mob-card-xl"
                style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r-md)",
                  padding: 32,
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                }}
              >
                <span style={{ fontFamily: "var(--font-display)", fontSize: 56, lineHeight: 0.5, color: "var(--blue-200)" }}>&ldquo;</span>
                <blockquote
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-display)",
                    fontSize: i === 0 ? 20 : 17,
                    lineHeight: 1.5,
                    color: "var(--ink)",
                    fontWeight: 500,
                  }}
                >
                  {q.text}
                </blockquote>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: "auto" }}>
                  <span
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg,var(--blue-400),var(--blue-700))",
                      display: "grid",
                      placeItems: "center",
                      color: "#fff",
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    {q.initials}
                  </span>
                  <div>
                    <b style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: 600 }}>{q.name}</b>
                    <span style={{ color: "var(--muted)", fontSize: 13 }}>{q.role}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* FAQ */}
      <section style={{ background: "var(--paper)" }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <span className="eyebrow">FAQs</span>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", marginTop: 16, marginBottom: 48 }}>
            Common questions answered.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  borderTop: "1px solid var(--line)",
                  borderBottom: i === faqs.length - 1 ? "1px solid var(--line)" : "none",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                    padding: "20px 0",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-display)",
                    fontSize: 17,
                    fontWeight: 600,
                    color: "var(--ink)",
                  }}
                >
                  {faq.q}
                  <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", border: "1.5px solid var(--line)", display: "grid", placeItems: "center", color: "var(--blue-600)", transition: "transform .2s", transform: openFaq === i ? "rotate(45deg)" : "none" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>
                {openFaq === i && (
                  <div style={{ paddingBottom: 20 }}>
                    <p style={{ color: "var(--slate)", fontSize: 16, lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Strip */}
      <section style={{ background: "var(--blue-900)", padding: "clamp(40px,5vw,64px) 0" }}>
        <div
          className="container mob-col mob-gap-md"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32 }}
        >
          <h2 style={{ color: "#fff", fontSize: "clamp(20px,2.5vw,32px)", margin: 0 }}>
            Ready to talk? We&apos;re here.
          </h2>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
            <a href="tel:08048019654" style={{ color: "rgba(255,255,255,.8)", fontSize: 16, fontWeight: 500, textDecoration: "none" }}>
              📞 080 4801 9654
            </a>
            <a href="https://wa.me/919098989090" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,.8)", fontSize: 16, fontWeight: 500, textDecoration: "none" }}>
              💬 +91 909 898 9090
            </a>
            <a href="mailto:supremoindore@gmail.com" style={{ color: "rgba(255,255,255,.8)", fontSize: 16, fontWeight: 500, textDecoration: "none" }}>
              ✉ supremoindore@gmail.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
