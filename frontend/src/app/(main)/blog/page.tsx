import type { Metadata } from "next";
import { BlogList } from "./_components/BlogList";

export const metadata: Metadata = {
  title: "Knowledge Center — Supremo India",
  description:
    "Water tank buying guides, pipe maintenance tips, irrigation solutions and gardening trends from Supremo India.",
};

export default function BlogPage() {
  return (
    <main>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          background: "linear-gradient(135deg, var(--blue-900) 0%, var(--blue-800) 50%, var(--ink) 100%)",
          minHeight: 320,
          display: "flex",
          alignItems: "center",
          paddingTop: 62,
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
        <div
          className="container"
          style={{ position: "relative", paddingTop: "clamp(40px,5vw,64px)", paddingBottom: "clamp(40px,5vw,64px)" }}
        >
          <span className="eyebrow eyebrow-light">Knowledge Center</span>
          <h1 style={{ color: "#fff", fontSize: "clamp(34px,5vw,60px)", lineHeight: 1.1, marginTop: 16 }}>
            Guides, tips & insights
          </h1>
          <p style={{ color: "rgba(255,255,255,.7)", fontSize: 17, marginTop: 16, maxWidth: "52ch" }}>
            Practical advice on water storage, plumbing, irrigation and gardening — from the Supremo team.
          </p>
        </div>
      </section>

      {/* List */}
      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          <BlogList />
        </div>
      </section>
    </main>
  );
}
