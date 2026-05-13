export function UtilityBar() {
  return (
    <div
      style={{
        background: "var(--ink)",
        color: "rgba(255,255,255,.78)",
        fontSize: 13,
        borderBottom: "1px solid rgba(255,255,255,.06)",
        position: "relative",
        zIndex: 30,
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 40 }}>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--ok)",
                boxShadow: "0 0 0 4px rgba(31,174,106,.18)",
                display: "inline-block",
              }}
            />
            Plant operating — Pune, Maharashtra
          </span>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          <a
            href="tel:+919567812345"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,.78)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            +91 95 678 12 345
          </a>
          <a
            href="mailto:dealers@supremo.in"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,.78)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            dealers@supremo.in
          </a>
          <a href="#" style={{ color: "rgba(255,255,255,.78)" }}>
            Dealer Portal →
          </a>
        </div>
      </div>
    </div>
  );
}
