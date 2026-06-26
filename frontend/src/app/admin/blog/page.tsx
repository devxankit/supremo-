"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "../_components/AdminHeader";
import { adminAuth } from "../_services/adminAuth";
import { LazyImage } from "@/components/LazyImage";

interface BlogBlock {
  type: "p" | "h2" | "ul";
  text?: string;
  items?: string[];
}

interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  author: string;
  image: string;
  date: string;
  status: "Draft" | "Published";
  body: BlogBlock[];
  createdAt?: string;
}

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Published: { bg: "#f0fdf4", color: "#15803d" },
  Draft: { bg: "var(--paper-2)", color: "var(--muted)" },
};

function bodyToMarkdown(body: BlogBlock[]): string {
  if (!body || !Array.isArray(body)) return "";
  return body
    .map((block) => {
      if (block.type === "h2") {
        return `## ${block.text}`;
      } else if (block.type === "ul") {
        return (block.items || []).map((item) => `- ${item}`).join("\n");
      } else {
        return block.text || "";
      }
    })
    .join("\n\n");
}

function markdownToBody(md: string): BlogBlock[] {
  if (!md) return [];
  const blocks: BlogBlock[] = [];
  const paragraphs = md.split(/\n\s*\n+/);

  for (const para of paragraphs) {
    const trimmed = para.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("##")) {
      blocks.push({
        type: "h2",
        text: trimmed.replace(/^##\s*/, ""),
      });
    } else if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
      const items = trimmed
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.startsWith("-") || line.startsWith("*"))
        .map((line) => line.replace(/^[-*]\s*/, ""));
      blocks.push({
        type: "ul",
        items,
      });
    } else {
      blocks.push({
        type: "p",
        text: trimmed,
      });
    }
  }
  return blocks;
}

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Buying Guides");
  const [status, setStatus] = useState<"Draft" | "Published">("Published");
  const [excerpt, setExcerpt] = useState("");
  const [readTime, setReadTime] = useState("5 min read");
  const [author, setAuthor] = useState("Supremo Editorial");
  const [image, setImage] = useState("");
  const [bodyMarkdown, setBodyMarkdown] = useState("");
  const [date, setDate] = useState("");
  const [uploading, setUploading] = useState(false);

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/blogs`);
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (err) {
      console.error("Error loading blog posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingPost) {
      // Auto-generate slug for new articles
      const generated = val
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      setSlug(generated);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const user = adminAuth.getUser();
    if (!user?.token) {
      alert("Not authenticated. Please log in.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${apiBase}/media/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setImage(data.url);
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(`Image upload failed: ${errData.message || res.statusText}`);
      }
    } catch (err) {
      console.error("Error uploading cover image:", err);
      alert("Error uploading image. Check console for details.");
    } finally {
      setUploading(false);
    }
  };

  const openAddModal = () => {
    setEditingPost(null);
    setTitle("");
    setSlug("");
    setCategory("Buying Guides");
    setStatus("Published");
    setExcerpt("");
    setReadTime("5 min read");
    setAuthor("Supremo Editorial");
    setImage("");
    setBodyMarkdown("");
    setDate(new Date().toISOString().split("T")[0]);
    setShowModal(true);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title || "");
    setSlug(post.slug || "");
    setCategory(post.category || "Buying Guides");
    setStatus(post.status || "Published");
    setExcerpt(post.excerpt || "");
    setReadTime(post.readTime || "5 min read");
    setAuthor(post.author || "Supremo Editorial");
    setImage(post.image || "");
    setBodyMarkdown(bodyToMarkdown(post.body));
    setDate(post.date || new Date().toISOString().split("T")[0]);
    setShowModal(true);
  };

  const saveArticle = async () => {
    if (!title.trim() || !slug.trim() || !excerpt.trim()) {
      alert("Please fill in Title, Slug and Excerpt.");
      return;
    }
    const user = adminAuth.getUser();
    if (!user?.token) {
      alert("Not authenticated. Please log in.");
      return;
    }

    const payload = {
      title,
      slug,
      category,
      status,
      excerpt,
      readTime,
      author,
      image,
      date,
      body: markdownToBody(bodyMarkdown),
    };

    try {
      const id = editingPost ? editingPost._id : null;
      const url = editingPost ? `${apiBase}/blogs/${id}` : `${apiBase}/blogs`;
      const method = editingPost ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowModal(false);
        fetchBlogs();
      } else {
        const errData = await res.json();
        alert(errData.message || "Failed to save article");
      }
    } catch (err) {
      console.error("Error saving article:", err);
    }
  };

  const deleteArticle = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    const user = adminAuth.getUser();
    if (!user?.token) {
      alert("Not authenticated. Please log in.");
      return;
    }

    try {
      const res = await fetch(`${apiBase}/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.ok) {
        setBlogs((prev) => prev.filter((p) => p._id !== id));
      } else {
        const errData = await res.json();
        alert(errData.message || "Failed to delete article");
      }
    } catch (err) {
      console.error("Error deleting article:", err);
    }
  };

  const filtered = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader title="Blog Manager" breadcrumb={[{ label: "Blog" }]} />

      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              height: 40,
              padding: "0 14px",
              background: "var(--paper)",
              border: "1px solid var(--line)",
              borderRadius: "var(--r-sm)",
              flex: "1 1 240px",
              maxWidth: 340,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--soft)" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles by title or category…"
              style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, color: "var(--ink)", fontFamily: "var(--font-body)", width: "100%" }}
            />
          </div>

          <div style={{ marginLeft: "auto" }}>
            <button
              onClick={openAddModal}
              style={{
                height: 40,
                padding: "0 18px",
                background: "var(--blue-600)",
                color: "#fff",
                border: "none",
                borderRadius: "var(--r-sm)",
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "var(--font-display)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                boxShadow: "0 2px 8px -2px rgba(20,102,230,.4)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Article
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ padding: "48px 0", textAlign: "center", color: "var(--muted)", fontSize: 14 }}>
            Loading blog posts...
          </div>
        ) : (
          <div style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", overflow: "hidden" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2.4fr 1.2fr 1fr 1fr 100px 80px",
                padding: "12px 20px",
                background: "var(--paper-2)",
                borderBottom: "1px solid var(--line-2)",
                gap: 12,
              }}
            >
              {["Title", "Category", "Author", "Date", "Status", ""].map((h, i) => (
                <div key={i} style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", fontFamily: "var(--font-display)" }}>
                  {h}
                </div>
              ))}
            </div>

            {filtered.map((r, i) => {
              const ss = STATUS_STYLE[r.status] || STATUS_STYLE.Published;
              return (
                <div
                  key={r._id || i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2.4fr 1.2fr 1fr 1fr 100px 80px",
                    padding: "14px 20px",
                    gap: 12,
                    alignItems: "center",
                    borderBottom: i < filtered.length - 1 ? "1px solid var(--line-2)" : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: "var(--r-sm)", background: "var(--blue-50)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
                      {r.image ? (
                        <LazyImage src={r.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                      )}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.title}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>{r.category}</div>
                  <div style={{ fontSize: 12, color: "var(--slate)" }}>{r.author}</div>
                  <div style={{ fontSize: 12, color: "var(--slate)" }}>{r.date}</div>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: "var(--r-pill)", background: ss.bg, color: ss.color }}>
                      {r.status}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button
                      onClick={() => openEditModal(r)}
                      title="Edit"
                      style={{ width: 30, height: 30, borderRadius: "var(--r-xs)", border: "1px solid var(--line)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                    </button>
                    <button
                      onClick={() => r._id && deleteArticle(r._id)}
                      title="Delete"
                      style={{ width: 30, height: 30, borderRadius: "var(--r-xs)", border: "1px solid var(--line)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" /></svg>
                    </button>
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div style={{ padding: "48px 20px", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
                No articles found.
              </div>
            )}
          </div>
        )}

        <span style={{ fontSize: 12, color: "var(--muted)" }}>Showing {filtered.length} of {blogs.length} articles</span>
      </main>

      {/* Add / Edit Modal */}
      {showModal && (
        <>
          <div style={{ position: "fixed", inset: 0, background: "rgba(10,22,40,.5)", backdropFilter: "blur(4px)", zIndex: 40 }} onClick={() => setShowModal(false)} />
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "min(760px, 95vw)",
              background: "#fff",
              borderRadius: "var(--r-lg)",
              boxShadow: "var(--sh-lg)",
              zIndex: 50,
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "22px 26px 18px", borderBottom: "1px solid var(--line-2)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                  {editingPost ? "Edit Article Details" : "New Article"}
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Write and configure your Knowledge Center article dynamically.</div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                style={{ width: 32, height: 32, borderRadius: "var(--r-sm)", border: "1px solid var(--line)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            <div style={{ padding: "22px 26px", display: "flex", flexDirection: "column", gap: 14, maxHeight: "65vh", overflowY: "auto" }}>
              {/* Row 1: Title */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Article Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Water Tank Buying Guide"
                  style={{ width: "100%", height: 40, padding: "0 12px", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", outline: "none", fontSize: 13 }}
                />
              </div>

              {/* Row 2: Category, Status, Author */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ width: "100%", height: 40, padding: "0 10px", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", outline: "none", fontSize: 13, background: "#fff" }}
                  >
                    {["Buying Guides", "Maintenance", "Agriculture", "Gardening"].map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "Draft" | "Published")}
                    style={{ width: "100%", height: 40, padding: "0 10px", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", outline: "none", fontSize: 13, background: "#fff" }}
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Author Name</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Supremo Editorial"
                    style={{ width: "100%", height: 40, padding: "0 12px", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", outline: "none", fontSize: 13 }}
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Excerpt (Short Summary)</label>
                <input
                  type="text"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="One-line summary for cards..."
                  style={{ width: "100%", height: 40, padding: "0 12px", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", outline: "none", fontSize: 13 }}
                />
              </div>

              {/* Cover Image Upload */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Cover Image</label>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  {image ? (
                    <LazyImage
                      src={image}
                      alt="Cover Preview"
                      style={{ width: 64, height: 64, objectFit: "cover", borderRadius: "var(--r-sm)", border: "1px solid var(--line)" }}
                    />
                  ) : (
                    <div style={{ width: 64, height: 64, borderRadius: "var(--r-sm)", border: "1px dashed var(--line)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "var(--muted)" }}>No image</div>
                  )}
                  <label
                    style={{
                      height: 40,
                      padding: "0 16px",
                      background: "var(--paper-2)",
                      border: "1px solid var(--line)",
                      borderRadius: "var(--r-sm)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--slate)",
                      cursor: "pointer",
                    }}
                  >
                    {uploading ? "Uploading..." : "Upload Cover Image"}
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                  </label>
                </div>
              </div>

              {/* Body (Markdown) */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Article Body (Markdown)</label>
                <textarea
                  value={bodyMarkdown}
                  onChange={(e) => setBodyMarkdown(e.target.value)}
                  placeholder={`Write your article details here. E.g.

This is a normal paragraph block.

## 1. This is a subheading (h2)

And a bullet list follows:
- First item
- Second item
- Third item`}
                  style={{ width: "100%", minHeight: 180, padding: "12px", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", outline: "none", fontSize: 13, lineHeight: "1.6", fontFamily: "monospace" }}
                />
              </div>
            </div>

            <div style={{ padding: "0 26px 22px", display: "flex", gap: 10, justifyContent: "flex-end", borderTop: "1px solid var(--line-2)", paddingTop: 16 }}>
              <button
                onClick={() => setShowModal(false)}
                style={{ height: 40, padding: "0 18px", background: "transparent", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-display)", cursor: "pointer", color: "var(--muted)" }}
              >
                Cancel
              </button>
              <button
                onClick={saveArticle}
                style={{ height: 40, padding: "0 22px", background: "var(--blue-600)", border: "none", borderRadius: "var(--r-sm)", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-display)", cursor: "pointer", color: "#fff" }}
              >
                {editingPost ? "Save Changes" : "Create Article"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
