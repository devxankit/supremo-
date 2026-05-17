interface StatsCardProps {
  label: string;
  value: string;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  icon: React.ReactNode;
  accent: string;
}

export function StatsCard({ label, value, change, changeType = "neutral", icon, accent }: StatsCardProps) {
  return (
    <div
      style={{
        background: "var(--paper)",
        borderRadius: "var(--r-md)",
        padding: "22px 24px",
        border: "1px solid var(--line-2)",
        boxShadow: "var(--sh-sm)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        transition: "box-shadow .2s, transform .2s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "var(--sh-md)";
        el.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "var(--sh-sm)";
        el.style.transform = "none";
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", fontFamily: "var(--font-display)" }}>
            {label}
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "var(--ink)", fontFamily: "var(--font-display)", marginTop: 6, lineHeight: 1.1 }}>
            {value}
          </div>
        </div>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "var(--r-sm)",
            background: accent + "18",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: accent,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
      </div>
      {change && (
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          {changeType === "up" && (
            <span style={{ color: "var(--ok)", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 15l-6-6-6 6" /></svg>
              {change}
            </span>
          )}
          {changeType === "down" && (
            <span style={{ color: "#ef4444", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
              {change}
            </span>
          )}
          {changeType === "neutral" && (
            <span style={{ color: "var(--muted)", fontSize: 12, fontWeight: 500 }}>{change}</span>
          )}
          <span style={{ fontSize: 11, color: "var(--soft)" }}>vs last month</span>
        </div>
      )}
    </div>
  );
}
