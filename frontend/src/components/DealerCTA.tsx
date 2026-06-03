"use client";

import Link from "next/link";

const highlights = [
  { title: "Exclusive Territory", desc: "Protected zones." },
  { title: "Logistics Covered", desc: "Zero freight charges." },
  { title: "Marketing Support", desc: "Co-op advertising." },
];

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export function DealerCTA() {
  return (
    <section
      id="dealer"
      style={{
        background: "linear-gradient(180deg, var(--paper) 0%, var(--blue-50) 100%)",
        padding: "44px 0 24px",
      }}
    >
      <div
        className="container mob-1col mob-gap-lg"
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 0.7fr",
          gap: 56,
          alignItems: "center",
        }}
      >
        {/* Left */}
        <div>
          <span className="eyebrow">Dealership</span>
          <h2 style={{ marginTop: 16, fontSize: "clamp(24px, 3vw, 38px)", lineHeight: 1.2 }}>
            Partner with a{" "}
            <span style={{ color: "var(--blue-700)" }}>brand that ships</span>.
          </h2>
          <p style={{ color: "var(--slate)", marginTop: 16, fontSize: 15.5, lineHeight: 1.6, maxWidth: "46ch" }}>
            Partner with us for exclusive territories, direct deliveries, and complete regional marketing support.
          </p>

          <div className="mob-1col mob-gap-sm" style={{ marginTop: 28, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px 20px" }}>
            {highlights.map((h) => (
              <div key={h.title} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ flexShrink: 0, width: 20, height: 20, display: "grid", placeItems: "center", background: "var(--blue-600)", color: "#fff", borderRadius: 999, marginTop: 2 }}>
                  <CheckIcon />
                </span>
                <div>
                  <b style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--ink)" }}>{h.title}</b>
                  <span style={{ color: "var(--muted)", fontSize: 12.5, lineHeight: 1.3 }}>{h.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn--sm">
              Talk to the Regional Head
              <svg className="arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </Link>
            <Link href="/dealership" className="btn btn--sm btn--outline">
              Read Dealer FAQ
            </Link>
          </div>
        </div>

        {/* Right: Image */}
        <div
          style={{
            position: "relative",
            borderRadius: "var(--r-lg)",
            overflow: "hidden",
            boxShadow: "var(--sh-lg)",
            border: "1px solid var(--line)",
            height: "clamp(200px, 26vw, 290px)",
            width: "100%",
            maxWidth: 380,
            margin: "0 auto",
          }}
        >
          <img
            src="/images/DJI_0629.jpg"
            alt="Supremo Dealership Showroom"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(10, 63, 143, 0.2), transparent 60%)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </section>
  );
}

