"use client";

const reasons = [
  {
    num: "01",
    title: "ISI & ISO certified",
    body: "IS 12701 for tanks, IS 4985 for pipes, ISO 9001:2015 across all four plants. Audited annually.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 2L4 7v8c0 5 8 7 8 7s8-2 8-7V7l-8-5z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Triple-layer engineering",
    body: "Black anti-algae core + UV-stabilised inner + reinforced outer. Patented bonding process keeps water cooler.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Dealer-first distribution",
    body: "1,200+ dealers, exclusive territories, marketing co-op fund, and a 48-hr replenishment SLA on top SKUs.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Pan-India logistics",
    body: "Four plant locations, 9 warehouses, dedicated fleet for tank transport — we move 600+ tanks a day.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "10-year warranty",
    body: "Every Supremo Triple Layer tank carries a 10-year limited warranty against manufacturing defects.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Built for India's water",
    body: "Tested with high-TDS, brackish, and treated water at our in-house lab. Food-grade per IS 10146.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M14 9V5a3 3 0 0 0-6 0v4" /><rect x="2" y="9" width="20" height="13" rx="2" />
        <path d="M12 14v3" />
      </svg>
    ),
  },
  {
    num: "07",
    title: "Digital tools for dealers",
    body: "Order from your phone. Track dispatch in real time. Schemes & price lists pushed to the dealer portal.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
        <polyline points="8 16 12 12 16 16" /><line x1="12" y1="12" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    num: "08",
    title: "Live dealer support",
    body: "Single WhatsApp line to the regional office. 6 hrs to resolve every dealer ticket — measured weekly.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
];

export function WhyUs() {
  return (
    <section style={{ background: "var(--paper)" }}>
      <div className="container">
        <div className="mob-1col mob-gap-md" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "end", marginBottom: 64 }}>
          <div>
            <span className="eyebrow">Why Supremo</span>
            <h2 style={{ fontSize: "clamp(34px,4.2vw,56px)", lineHeight: 1.15, marginTop: 20 }}>
              Eight reasons every dealer can<br />quote without hesitation.
            </h2>
          </div>
          <p style={{ color: "var(--muted)", fontSize: 18, maxWidth: "50ch" }}>
            Every claim below is backed by a certificate, a plant test report, or a logistics SLA. No marketing fluff.
          </p>
        </div>

        <div
          className="whyus-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }}
        >
          {reasons.map((r) => (
            <div
              key={r.num}
              style={{
                position: "relative",
                padding: "32px 24px",
                background: "#fff",
                borderRadius: "var(--r-lg)",
                border: "1px solid var(--line)",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                transition: "all 0.3s ease",
                boxShadow: "var(--sh-sm)",
                overflow: "hidden",
                cursor: "default"
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--sh-md)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "var(--sh-sm)"; }}
            >
              <span style={{ 
                position: "absolute", 
                top: 20, 
                right: 20, 
                fontFamily: "var(--font-display)", 
                fontSize: 64, 
                color: "var(--blue-50)", 
                fontWeight: 800, 
                lineHeight: 0.8,
                zIndex: 0,
                pointerEvents: "none"
              }}>{r.num}</span>
              
              <div style={{ position: "relative", zIndex: 1, width: 48, height: 48, display: "grid", placeItems: "center", borderRadius: 12, background: "var(--blue-50)", color: "var(--blue-700)", marginBottom: 8 }}>
                {r.icon}
              </div>
              <h4 style={{ position: "relative", zIndex: 1, fontSize: 18, fontWeight: 700 }}>{r.title}</h4>
              <p style={{ position: "relative", zIndex: 1, color: "var(--muted)", fontSize: 14.5, lineHeight: 1.6 }}>{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
