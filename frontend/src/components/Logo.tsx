export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div
        style={{
          width: 42,
          height: 42,
          display: "grid",
          placeItems: "center",
          background: dark
            ? "#fff"
            : "linear-gradient(180deg,#fff 0%,#E6F0FF 100%)",
          borderRadius: 10,
          boxShadow: dark ? "none" : "0 6px 16px -4px rgba(20,102,230,.45)",
          flexShrink: 0,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="logoG" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0E55BC" />
              <stop offset="1" stopColor="#062D6B" />
            </linearGradient>
          </defs>
          {dark ? (
            <>
              <path d="M12 2L4 7v8c0 5 8 7 8 7s8-2 8-7V7l-8-5z" fill="#0E55BC" />
              <path d="M8 12c0-2 2-3 4-3s4 1 4 3-2 4-4 4-4-2-4-4z" fill="#fff" />
            </>
          ) : (
            <>
              <path d="M12 2L4 7v8c0 5 8 7 8 7s8-2 8-7V7l-8-5z" fill="url(#logoG)" />
              <path d="M8 12c0-2 2-3 4-3s4 1 4 3-2 4-4 4-4-2-4-4z" fill="#fff" />
            </>
          )}
        </svg>
      </div>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <b
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 22,
            letterSpacing: "-0.02em",
            fontWeight: 700,
            color: dark ? "#fff" : "#fff",
            display: "block",
          }}
        >
          SUPREMO
        </b>
        <small
          style={{
            fontSize: 10,
            letterSpacing: "0.32em",
            opacity: 0.7,
            marginTop: 4,
            fontWeight: 600,
            display: "block",
            color: dark ? "rgba(255,255,255,.7)" : "rgba(255,255,255,.7)",
          }}
        >
          BUILT TO HOLD
        </small>
      </div>
    </div>
  );
}

export function LogoLight() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div
        style={{
          width: 36,
          height: 36,
          display: "grid",
          placeItems: "center",
          background: "linear-gradient(135deg,var(--blue-700),var(--blue-900))",
          borderRadius: 8,
          flexShrink: 0,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L4 7v8c0 5 8 7 8 7s8-2 8-7V7l-8-5z" fill="#fff" />
          <path d="M8 12c0-2 2-3 4-3s4 1 4 3-2 4-4 4-4-2-4-4z" fill="#0E55BC" />
        </svg>
      </div>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <b
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 20,
            letterSpacing: "-0.02em",
            fontWeight: 700,
            color: "var(--ink)",
            display: "block",
          }}
        >
          SUPREMO
        </b>
        <small
          style={{
            fontSize: 9,
            letterSpacing: "0.32em",
            opacity: 0.6,
            marginTop: 3,
            fontWeight: 600,
            display: "block",
            color: "var(--muted)",
          }}
        >
          BUILT TO HOLD
        </small>
      </div>
    </div>
  );
}
