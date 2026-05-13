export function FAB() {
  return (
    <div
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        zIndex: 30,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <a
        href="#"
        aria-label="WhatsApp"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 18px",
          borderRadius: 999,
          background: "#25D366",
          color: "#fff",
          border: "none",
          boxShadow: "var(--sh-lg)",
          fontWeight: 600,
          fontSize: 14,
          fontFamily: "var(--font-display)",
          textDecoration: "none",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a8 8 0 01-2.3-1.4 9 9 0 01-1.6-2c-.2-.3 0-.4.1-.5l.4-.5a2 2 0 00.3-.5.4.4 0 000-.4 18 18 0 01-.8-2c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 2.9 2.9 0 00-.9 2.2c0 1.3 1 2.5 1 2.7s1.8 2.8 4.4 3.9c1.7.7 2.3.7 3.1.6.5 0 1.5-.6 1.7-1.2a2 2 0 00.2-1.2c-.1 0-.3-.1-.6-.3zM12 2a10 10 0 00-10 10 9.9 9.9 0 001.3 5L2 22l5.2-1.4a10 10 0 0014.8-8.6A10 10 0 0012 2z" />
        </svg>
        WhatsApp
      </a>
      <a
        href="#dealer"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 18px",
          borderRadius: 999,
          background: "var(--blue-600)",
          color: "#fff",
          border: "none",
          boxShadow: "var(--sh-lg)",
          fontWeight: 600,
          fontSize: 14,
          fontFamily: "var(--font-display)",
          textDecoration: "none",
        }}
      >
        Become a Dealer →
      </a>
    </div>
  );
}
