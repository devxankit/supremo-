"use client";

import { useState, useEffect } from "react";
import { LazyImage } from "@/components/LazyImage";

export function Intro() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/about`)
      .then((res) => (res.ok ? res.json() : null))
      .then((d) => setData(d))
      .catch((err) => console.error("Error loading intro details:", err));
  }, []);

  if (!data) return null;

  const stats = data.stats || [];

  return (
    <section style={{ background: "var(--paper)" }}>
      <div
        className="container mob-1col"
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "clamp(32px,6vw,100px)",
          alignItems: "center",
        }}
      >
        {/* Left: copy */}
        <div>
          {data.eyebrow && <span className="eyebrow">{data.eyebrow}</span>}
          <h2
            style={{
              fontSize: "clamp(34px,4vw,56px)",
              lineHeight: 1.15,
              marginTop: 22,
            }}
          >
            {data.heading}
            {data.headingHighlight && (
              <>
                <br />
                <span style={{ color: "var(--blue-700)" }}>
                  {data.headingHighlight}
                </span>
              </>
            )}
          </h2>
          {data.text1 && (
            <p style={{ marginTop: 28, color: "var(--slate)", fontSize: 18, maxWidth: "52ch" }}>
              {data.text1}
            </p>
          )}

          {stats.length > 0 && (
            <dl
              className="intro-stats"
              style={{
                marginTop: 40,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px 40px",
                borderTop: "1px solid var(--line)",
                paddingTop: 32,
              }}
            >
              {stats.map((m: any, idx: number) => (
                <div key={idx}>
                  <dt style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 600 }}>{m.label}</dt>
                  <dd style={{ margin: "6px 0 0", fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: "var(--ink)" }}>
                    {m.value} {m.suffix}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {/* Right: visual */}
        {data.imageUrl && (
          <div
            className="intro-visual"
            style={{
              position: "relative",
              borderRadius: "var(--r-lg)",
              overflow: "hidden",
              boxShadow: "var(--sh-md)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LazyImage
              src={data.imageUrl}
              alt={data.imageCaption || "About Supremo"}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
