import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/blog";
import { LazyImage } from "@/components/LazyImage";

export const dynamic = "force-dynamic";

async function fetchPost(slug: string) {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
  try {
    const res = await fetch(`${apiBase}/blogs/${slug}`, { cache: "no-store" });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error("Error fetching blog post:", err);
  }

  return null;
}

async function fetchRelated(slug: string) {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
  try {
    const res = await fetch(`${apiBase}/blogs`, { cache: "no-store" });
    if (res.ok) {
      const all = await res.json();
      return all.filter((p: any) => p.slug !== slug && p.status === "Published").slice(0, 3);
    }
  } catch (err) {
    console.error("Error fetching related blog posts:", err);
  }
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) return { title: "Knowledge Center" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) notFound();

  const related = await fetchRelated(slug);

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
          <h1 style={{ fontSize: "clamp(28px,4vw,48px)", lineHeight: 1.15, marginBottom: 20, color: "var(--ink)" }}>
            {post.title}
          </h1>
          <div style={{ display: "flex", gap: 14, fontSize: 14, color: "var(--muted)", flexWrap: "wrap" }}>
            <span style={{ color: "var(--slate)", fontWeight: 600 }}>{post.author}</span>
            <span>·</span>
            <span>{formatDate(post.date)}</span>
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
            <LazyImage
              src={post.image}
              alt={post.title}
              priority={true}
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
          {(post.body || []).map((block: any, i: number) => {
            if (block.type === "h2") {
              return (
                <h2 key={i} style={{ fontSize: "clamp(22px,2.6vw,30px)", marginTop: 40, marginBottom: 14, color: "var(--ink)" }}>
                  {block.text}
                </h2>
              );
            }
            if (block.type === "ul") {
              return (
                <ul key={i} style={{ display: "flex", flexDirection: "column", gap: 12, margin: "8px 0" }}>
                  {(block.items || []).map((item: string) => (
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
        <section style={{ background: "var(--paper-2)", padding: "48px 0" }}>
          <div className="container">
            <span className="eyebrow">Keep Reading</span>
            <h2 style={{ fontSize: "clamp(24px,3vw,36px)", marginTop: 16, marginBottom: 32, color: "var(--ink)" }}>Related articles</h2>
            <div
              className="mob-1col mob-gap-md"
              style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}
            >
              {related.map((p: any) => (
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
                  <h3 style={{ fontSize: 17, lineHeight: 1.35, color: "var(--ink)" }}>{p.title}</h3>
                  <p style={{ fontSize: 13.5, color: "var(--slate)", lineHeight: 1.6 }}>{p.excerpt}</p>
                  <span style={{ marginTop: "auto", paddingTop: 6, fontSize: 12.5, color: "var(--muted)" }}>
                    {formatDate(p.date)}
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
