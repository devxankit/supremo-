/** Confirmation panel shown after a form is submitted. */
export function FormSuccess({
  title = "Thank you — we've got your details",
  message,
}: {
  title?: string;
  message: string;
}) {
  return (
    <div
      role="status"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 12,
        padding: "28px 8px",
      }}
    >
      <span
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "var(--blue-50)",
          border: "1px solid var(--blue-100)",
          display: "grid",
          placeItems: "center",
          color: "var(--blue-600)",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </span>
      <h3 style={{ fontSize: 20, color: "var(--ink)" }}>{title}</h3>
      <p style={{ color: "var(--muted)", fontSize: 14.5, lineHeight: 1.6, maxWidth: "40ch" }}>{message}</p>
    </div>
  );
}
