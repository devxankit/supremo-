const quotes = [
  {
    text: "Supremo replaced three lines in my shop last year. The 1000L Triple Layer outsells every other tank in our pincode. Dispatch is reliable — that's what makes the difference.",
    name: "Rakesh Sharma",
    role: "Sharma Sanitary · Indore, MP · Dealer since 2021",
    initials: "RS",
  },
  {
    text: "The dealer portal alone saved me two hours a day. I see stock, schemes and dispatch from my phone — no more calling the office for updates.",
    name: "Manoj Patel",
    role: "Patel Agencies · Surat, GJ",
    initials: "MP",
  },
  {
    text: "22% margin and no freight headache. We doubled our tank sales the first season we switched to Supremo.",
    name: "Anil Kumar",
    role: "Sri Sai Traders · Hyderabad, TS",
    initials: "AK",
  },
  {
    text: "What sold me was the after-sales support. One customer complaint and the regional team was on a call the same day. That builds trust with my buyers.",
    name: "Suresh Reddy",
    role: "Reddy Pipes & Tanks · Vijayawada, AP",
    initials: "SR",
  },
  {
    text: "Quality is consistent batch after batch. In four years I have not had a single tank returned for a manufacturing fault. That reputation sells itself now.",
    name: "Vikram Singh",
    role: "Singh Sanitary House · Jaipur, RJ",
    initials: "VS",
  },
  {
    text: "Schemes are clear and paid on time. No hidden conditions, no chasing for incentives — exactly what a dealer wants from a brand.",
    name: "Imran Khan",
    role: "Khan Hardware · Bhopal, MP",
    initials: "IK",
  },
  {
    text: "Started as a small dealer in 2022, now I supply three districts. Supremo grew with me and never let stock run dry during peak season.",
    name: "Lakshmi Nair",
    role: "Nair Distributors · Kochi, KL",
    initials: "LN",
  },
];

function Stars() {
  return (
    <div style={{ display: "flex", gap: 3, color: "#F5A623" }} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.8 5.8 21.5l1.6-7L2 9.8l7.1-.6z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  // Duplicate the list so the marquee loops seamlessly (track animates to -50%).
  const loop = [...quotes, ...quotes];

  return (
    <section style={{ background: "var(--paper-2)", overflow: "hidden", padding: "40px 0 32px" }}>
      <div className="container">
        <div style={{ marginBottom: 48 }}>
          <span className="eyebrow">Dealer Voices</span>
          <h2 style={{ marginTop: 20 }}>
            What our partners actually say.
          </h2>
        </div>
      </div>

      <div className="testi-marquee">
        <div className="testi-track">
          {loop.map((q, i) => (
            <article key={`${q.name}-${i}`} className="testi-card" aria-hidden={i >= quotes.length}>
              <Stars />
              <blockquote
                style={{
                  margin: 0,
                  fontFamily: "var(--font-display)",
                  fontSize: 18,
                  lineHeight: 1.55,
                  color: "var(--ink)",
                  fontWeight: 500,
                }}
              >
                &ldquo;{q.text}&rdquo;
              </blockquote>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: "auto", paddingTop: 8 }}>
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
