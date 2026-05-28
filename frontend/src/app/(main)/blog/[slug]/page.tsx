import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getPost, getRelatedPosts, formatDate } from "@/lib/blog";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Knowledge Center — Supremo India" };
  return { title: `${post.title} — Supremo India`, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);

  return (
    <main style={{ paddingTop: 62 }}>
      {/* Article hero */}
      <section style={{ background: "var(--paper-2)", paddingTop: "clamp(40px,5vw,64px)", paddingBottom: "clamp(32px,4vw,48px)" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 20, fontSize: 13, color: "var(--muted)" }}>
            <Link href="/blog" style={{ color: "var(--muted)" }}>Knowledge Center</Link>
            <span>/</span>
            <span style={{ color: "var(--ink)", fontWeight: 600 }}>{post.category}</span>
          </div>
          <span
            style={{
              display: "inline-block",
              padding: "4px 12px",
              background: "var(--blue-100)",
              color: "var(--blue-800)",
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 600,
              fontFamily: "var(--font-display)",
              marginBottom: 16,
            }}
          >
            {post.category}
          </span>
          <h1 style={{ fontSize: "clamp(28px,4vw,48px)", lineHeight: 1.15, marginBottom: 20 }}>
            {post.title}
          </h1>
          <div style={{ display: "flex", gap: 14, fontSize: 14, color: "var(--muted)", flexWrap: "wrap" }}>
            <span style={{ color: "var(--slate)", fontWeight: 600 }}>{post.author}</span>
            <span>·</span>
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Cover */}
      <div style={{ background: "var(--paper)" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div
            style={{
              height: "clamp(200px,40vw,420px)",
              marginTop: 40,
              borderRadius: "var(--r-lg)",
              overflow: "hidden",
              position: "relative",
              border: "1px solid var(--line-2)",
              boxShadow: "var(--sh-md)",
            }}
          >
            <img
              src={post.image}
              alt={post.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <section style={{ background: "var(--paper)", paddingTop: "clamp(36px,4vw,56px)" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          {post.body.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2 key={i} style={{ fontSize: "clamp(22px,2.6vw,30px)", marginTop: 40, marginBottom: 14 }}>
                  {block.text}
                </h2>
              );
            }
            if (block.type === "ul") {
              return (
                <ul key={i} style={{ display: "flex", flexDirection: "column", gap: 12, margin: "8px 0" }}>
                  {block.items.map((item) => (
                    <li key={item} style={{ display: "flex", gap: 12, color: "var(--slate)", fontSize: 16.5, lineHeight: 1.7 }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--blue-600)", flexShrink: 0, marginTop: 9 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} style={{ fontSize: 16.5, lineHeight: 1.8, color: "var(--slate)", marginTop: 16 }}>
                {block.text}
              </p>
            );
          })}

          {/* Share / back */}
          <div style={{ marginTop: 48, paddingTop: 28, borderTop: "1px solid var(--line)" }}>
            <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--blue-600)", fontWeight: 600, fontFamily: "var(--font-display)", fontSize: 14 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to all articles
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ background: "var(--paper-2)" }}>
          <div className="container">
            <span className="eyebrow">Keep Reading</span>
            <h2 style={{ fontSize: "clamp(24px,3vw,36px)", marginTop: 16, marginBottom: 32 }}>Related articles</h2>
            <div
              className="mob-1col mob-gap-md"
              style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}
            >
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="hover-lift-sm"
                  style={{
                    background: "#fff",
                    border: "1px solid var(--line)",
                    borderRadius: "var(--r-md)",
                    padding: 24,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    textDecoration: "none",
                  }}
                >
                  <span style={{ fontSize: 12, color: "var(--blue-700)", fontWeight: 600 }}>{p.category}</span>
                  <h3 style={{ fontSize: 17, lineHeight: 1.35 }}>{p.title}</h3>
                  <p style={{ fontSize: 13.5, color: "var(--slate)", lineHeight: 1.6 }}>{p.excerpt}</p>
                  <span style={{ marginTop: "auto", paddingTop: 6, fontSize: 12.5, color: "var(--muted)" }}>
                    {formatDate(p.date)} · {p.readTime}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
