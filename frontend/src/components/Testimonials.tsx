const quotes = [
  {
    text: "Supremo replaced three lines in my shop last year. The 1000L Triple Layer outsells every other tank in our pincode. Dispatch is reliable — that's what makes the difference.",
    name: "Rakesh Sharma",
    role: "Sharma Sanitary · Indore, MP · Dealer since 2021",
    initials: "RS",
    compact: false,
  },
  {
    text: "The dealer portal alone saved me two hours a day. I see stock, schemes and dispatch from my phone.",
    name: "Manoj Patel",
    role: "Surat, GJ",
    initials: "MP",
    compact: true,
  },
  {
    text: "22% margin and no freight headache. We doubled our tank sales the first season we switched.",
    name: "Anil Kumar",
    role: "Hyderabad, TS",
    initials: "AK",
    compact: true,
  },
];

export function Testimonials() {
  return (
    <section style={{ background: "var(--paper-2)" }}>
      <div className="container">
        <div style={{ marginBottom: 56 }}>
          <span className="eyebrow">Dealer Voices</span>
          <h2 style={{ fontSize: "clamp(34px,4.2vw,56px)", lineHeight: 1.15, marginTop: 20 }}>
            What our partners actually say.
          </h2>
        </div>

        <div
          className="mob-scroll"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr",
            gap: 20,
          }}
        >
          {quotes.map((q) => (
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
                  fontSize: q.compact ? 17 : 22,
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
  );
}
