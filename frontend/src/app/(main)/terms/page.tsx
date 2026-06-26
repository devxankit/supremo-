"use client";

import { useState, useEffect } from "react";

interface LegalSection {
  title: string;
  content: string;
}

interface LegalContent {
  title: string;
  intro: string;
  sections: LegalSection[];
}

const DEFAULT_TERMS: LegalContent = {
  title: "Terms & Conditions",
  intro: "Please read these terms and conditions carefully before using our website or submitting any inquiry forms.",
  sections: []
};

export default function TermsPage() {
  const [data, setData] = useState<LegalContent>(DEFAULT_TERMS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
    fetch(`${apiBase}/terms`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load terms");
        return res.json();
      })
      .then((content) => {
        setData({
          title: content.title || DEFAULT_TERMS.title,
          intro: content.intro || DEFAULT_TERMS.intro,
          sections: content.sections || DEFAULT_TERMS.sections
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading Terms & Conditions:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--paper)" }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", border: "3px solid var(--line)", borderTopColor: "var(--blue-600)", animation: "spin 1s linear infinite" }} />
        <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { to { transform: rotate(360deg); } }` }} />
      </div>
    );
  }

  return (
    <main>
      {/* Hero Header */}
      <section
        style={{
          position: "relative",
          background: "linear-gradient(135deg, var(--blue-900) 0%, var(--blue-800) 50%, var(--ink) 100%)",
          paddingTop: "calc(var(--nav-h) + 48px)",
          paddingBottom: "64px",
          color: "#fff",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="container" style={{ position: "relative" }}>
          <span className="eyebrow eyebrow-light">Legal &amp; Policies</span>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              marginTop: 12,
              fontWeight: 700,
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.02em",
            }}
          >
            {data.title}
          </h1>
          <p style={{ color: "rgba(255,255,255,.7)", fontSize: 16, marginTop: 12, maxWidth: "60ch", lineHeight: 1.6 }}>
            {data.intro}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: "80px 0", background: "var(--paper)" }}>
        <div className="container" style={{ maxWidth: 800 }}>
          {data.sections.length === 0 ? (
            <div style={{ textAlign: "center", color: "var(--muted)", fontSize: 15 }}>
              No terms content available.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              {data.sections.map((sect, idx) => (
                <div key={idx}>
                  <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, color: "var(--ink)", fontFamily: "var(--font-display)" }}>
                    {sect.title}
                  </h2>
                  <p style={{ color: "var(--slate)", lineHeight: 1.7, fontSize: 15, whiteSpace: "pre-wrap" }}>
                    {sect.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
