"use client";

export function WhyUs() {
  return (
    <section className="whyus-section" style={{ position: "relative", overflow: "hidden" }}>
      {/* Glow Effects */}
      <div className="whyus-bg-glow" />
      
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .whyus-section {
            background-color: var(--paper-2);
            background-image: radial-gradient(var(--line) 1px, transparent 1px);
            background-size: 24px 24px;
            padding: clamp(40px, 5vw, 56px) 0;
          }
          
          .whyus-bg-glow {
            position: absolute;
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(36,89,230,0.04) 0%, transparent 70%);
            top: -100px;
            right: -100px;
            pointer-events: none;
            z-index: 0;
          }

          .whyus-header {
            margin-bottom: 28px;
          }

          .whyus-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }

          .whyus-card {
            position: relative;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-radius: var(--r-md);
            border: 1px solid var(--line-2);
            padding: 16px 18px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 4px 12px rgba(10, 22, 40, 0.015);
            overflow: hidden;
            cursor: default;
            min-height: 165px;
          }

          .whyus-card:hover {
            transform: translateY(-4px);
            border-color: var(--blue-300);
            background: #ffffff;
            box-shadow: 0 20px 38px -12px rgba(14, 85, 188, 0.08), 0 0 0 1px var(--blue-200);
          }

          .whyus-icon-box {
            width: 32px;
            height: 32px;
            display: grid;
            place-items: center;
            border-radius: 6px;
            background: var(--blue-50);
            color: var(--blue-600);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            flex-shrink: 0;
          }

          .whyus-card:hover .whyus-icon-box {
            transform: scale(1.06) rotate(3deg);
            background: var(--blue-600) !important;
            color: #ffffff !important;
            box-shadow: 0 4px 10px rgba(14, 85, 188, 0.15);
          }

          .whyus-card-title {
            font-size: 14.5px;
            font-weight: 700;
            color: var(--ink);
            line-height: 1.35;
          }

          .whyus-card-desc {
            color: var(--muted);
            font-size: 12px;
            line-height: 1.45;
            margin-top: 6px;
          }

          @media (max-width: 1024px) {
            .whyus-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 640px) {
            .whyus-grid {
              grid-template-columns: 1fr;
              gap: 14px;
            }
            .whyus-card {
              min-height: auto;
              padding: 16px;
            }
          }
        `}} />

        <div className="whyus-header">
          <h2>Why Supremo</h2>
        </div>

        <div className="whyus-grid">
          {/* Card 1: Triple-Layer Protection */}
          <div className="whyus-card">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <div className="whyus-icon-box">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                  </svg>
                </div>
                <span className="whyus-card-title">Triple-Layer Protection</span>
              </div>
              <p className="whyus-card-desc">
                Co-extruded layers keep water cooler, safer, and algae-free.
              </p>
            </div>
            <div style={{ display: "flex", gap: 4, marginTop: 10 }}>
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "3px 4px", background: "rgba(36,89,230,0.04)", borderRadius: 4, borderLeft: "2px solid var(--blue-600)" }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: "var(--blue-700)" }}>UV Shield</span>
              </div>
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "3px 4px", background: "rgba(10,22,40,0.03)", borderRadius: 4, borderLeft: "2px solid #111827" }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: "#111827" }}>Anti-Algae</span>
              </div>
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "3px 4px", background: "rgba(31,174,106,0.04)", borderRadius: 4, borderLeft: "2px solid var(--ok)" }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: "var(--ok)" }}>FDA LLDPE</span>
              </div>
            </div>
          </div>

          {/* Card 2: Certified Quality */}
          <div className="whyus-card">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <div className="whyus-icon-box">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L4 7v8c0 5 8 7 8 7s8-2 8-7V7l-8-5z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <span className="whyus-card-title">ISI Standards</span>
              </div>
              <p className="whyus-card-desc">
                IS 12701 & IS 4985 certified products.
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9.5, fontWeight: 700, color: "var(--blue-600)", background: "var(--blue-50)", padding: "4px 8px", borderRadius: 4, marginTop: 10, letterSpacing: "0.02em" }}>
              ISO 9001:2015 AUDITED
            </div>
          </div>

          {/* Card 3: 10-Year Warranty */}
          <div className="whyus-card">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <div className="whyus-icon-box">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <span className="whyus-card-title">10-Year Warranty</span>
              </div>
              <p className="whyus-card-desc">
                Long-term peace of mind on all purchases.
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 10 }}>
              <span style={{ fontSize: 22, fontWeight: 900, color: "var(--blue-600)", lineHeight: 1 }}>10 Yrs</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: "var(--muted)" }}>Coverage Warranty</span>
            </div>
          </div>

          {/* Card 4: Supply Chain */}
          <div className="whyus-card">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <div className="whyus-icon-box">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <span className="whyus-card-title">Supply Chain</span>
              </div>
              <p className="whyus-card-desc">
                Pan-India logistics with regional plants and depots.
              </p>
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
              <div style={{ flex: 1, padding: "4px 6px", background: "var(--paper-2)", border: "1px solid var(--line-2)", borderRadius: 4, textAlign: "center" }}>
                <div style={{ fontSize: 10.5, fontWeight: 800, color: "var(--ink)" }}>4 Plants</div>
              </div>
              <div style={{ flex: 1, padding: "4px 6px", background: "var(--paper-2)", border: "1px solid var(--line-2)", borderRadius: 4, textAlign: "center" }}>
                <div style={{ fontSize: 10.5, fontWeight: 800, color: "var(--ink)" }}>9 Depots</div>
              </div>
            </div>
          </div>

          {/* Card 5: Digital Portal */}
          <div className="whyus-card">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <div className="whyus-icon-box">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
                    <polyline points="8 16 12 12 16 16" /><line x1="12" y1="12" x2="12" y2="21" />
                  </svg>
                </div>
                <span className="whyus-card-title">Digital Portal</span>
              </div>
              <p className="whyus-card-desc">
                Real-time tracking and online ordering for all dealers.
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, padding: "4px 8px", background: "var(--paper-2)", borderRadius: 4, border: "1px solid var(--line-2)", fontSize: 9, fontWeight: 600, color: "var(--slate)" }}>
              <span>Order #784</span>
              <span style={{ color: "var(--ok)", fontWeight: 700 }}>IN TRANSIT</span>
            </div>
          </div>

          {/* Card 6: Support SLA */}
          <div className="whyus-card">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <div className="whyus-icon-box">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <span className="whyus-card-title">Support SLA</span>
              </div>
              <p className="whyus-card-desc">
                Dedicated assistance for seamless resolution.
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 10 }}>
              <span style={{ fontSize: 22, fontWeight: 900, color: "var(--ok)", lineHeight: 1 }}>6 Hrs</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: "var(--muted)" }}>Resolution SLA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

