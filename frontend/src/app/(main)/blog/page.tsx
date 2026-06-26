import type { Metadata } from "next";
import Link from "next/link";
import { BlogList } from "./_components/BlogList";

export const metadata: Metadata = {
  title: "Knowledge Center",
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
          background: "linear-gradient(135deg, #a9c8fdff 0%, #a4cbfdff 40%, #8abaf9ff 100%)",
          minHeight: 180,
          display: "flex",
          alignItems: "center",
          paddingTop: 62,
          borderBottom: "1px solid #92bcf0ff",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(37,99,235,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.06) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className="container"
          style={{ position: "relative", paddingTop: "clamp(20px,3vw,32px)", paddingBottom: "clamp(12px,2vw,20px)" }}
        >
          <Link
            href="/gallery#blogs"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              fontWeight: 600,
              color: "var(--blue-700)",
              fontFamily: "var(--font-display)",
              textDecoration: "none",
              marginBottom: 12,
              opacity: 0.85,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Gallery
          </Link>
          <span className="eyebrow" style={{ color: "var(--blue-600)" }}>Knowledge Center</span>
          <h1 style={{ color: "var(--ink)", fontSize: "clamp(28px,4vw,44px)", lineHeight: 1.1, marginTop: 12 }}>
            Guides, tips & insights
          </h1>
          <p style={{ color: "var(--slate)", fontSize: 15, marginTop: 12, maxWidth: "52ch" }}>
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
