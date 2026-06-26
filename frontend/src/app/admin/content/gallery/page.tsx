"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "../../_components/AdminHeader";
import { SectionCard, Field, Button, SaveBar, useSavedFlash } from "../../_components/ui";
import { adminAuth } from "../../_services/adminAuth";
import { LazyImage } from "@/components/LazyImage";

interface GalleryItem {
  _id?: string;
  title: string;
  category: string;
  image: string;
  span: boolean;
}

interface GalleryVideo {
  _id?: string;
  title: string;
  duration: string;
  image: string;
  videoUrl?: string;
}

interface GalleryState {
  mediaEyebrow: string;
  mediaTitle: string;
  videosEyebrow: string;
  videosTitle: string;
  blogsEyebrow: string;
  blogsTitle: string;
  items: GalleryItem[];
  videos: GalleryVideo[];
  blogs: any[];
}

const DEFAULT: GalleryState = {
  mediaEyebrow: "",
  mediaTitle: "",
  videosEyebrow: "",
  videosTitle: "",
  blogsEyebrow: "",
  blogsTitle: "",
  items: [],
  videos: [],
  blogs: []
};

const CATEGORIES = ["Factory", "Team", "Dispatch"];

export default function GalleryEditorPage() {
  const [s, setS] = useState<GalleryState>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [uploadingIdx, setUploadingIdx] = useState<{ type: "items" | "videos" | "blogs"; index: number } | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const { saved, flash } = useSavedFlash();

  const fetchGalleryContent = () => {
    setLoading(true);
    setErrorMsg("");
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/gallery`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to retrieve gallery page content.");
        return res.json();
      })
      .then((data) => {
        setS({
          mediaEyebrow: data.mediaEyebrow || "",
          mediaTitle: data.mediaTitle || "",
          videosEyebrow: data.videosEyebrow || "",
          videosTitle: data.videosTitle || "",
          blogsEyebrow: data.blogsEyebrow || "",
          blogsTitle: data.blogsTitle || "",
          items: data.items || [],
          videos: data.videos || [],
          blogs: data.blogs || []
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading gallery page data:", err);
        setErrorMsg("Failed to load gallery section data from the server.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchGalleryContent();
  }, []);

  function set<K extends keyof GalleryState>(key: K, value: GalleryState[K]) {
    setS((prev) => ({ ...prev, [key]: value }));
  }

  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    uploadInfo: { type: "items" | "videos" | "blogs"; index: number }
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    const user = adminAuth.getUser();
    if (!user?.token) {
      alert("Not authenticated. Please log in.");
      return;
    }

    setUploadingIdx(uploadInfo);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/media/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`
        },
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        if (uploadInfo.type === "items") {
          const newItems = [...s.items];
          newItems[uploadInfo.index] = { ...newItems[uploadInfo.index], image: data.url };
          set("items", newItems);
        } else if (uploadInfo.type === "videos") {
          const newVideos = [...s.videos];
          newVideos[uploadInfo.index] = { ...newVideos[uploadInfo.index], image: data.url };
          set("videos", newVideos);
        } else {
          const newBlogs = [...s.blogs];
          newBlogs[uploadInfo.index] = { ...newBlogs[uploadInfo.index], image: data.url };
          set("blogs", newBlogs);
        }
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(`Image upload failed: ${errData.message || res.statusText}`);
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Error uploading image. Check console for details.");
    } finally {
      setUploadingIdx(null);
    }
  }

  const saveGalleryContent = async () => {
    const user = adminAuth.getUser();
    if (!user?.token) {
      alert("Not authenticated. Please log in.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/gallery`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(s)
      });

      if (res.ok) {
        flash();
        fetchGalleryContent();
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(`Failed to save: ${errData.message || res.statusText}`);
      }
    } catch (err) {
      console.error("Error saving gallery page content:", err);
      alert("Error saving gallery page content.");
    }
  };

  const addItem = () => {
    set("items", [...s.items, { title: "", category: "Factory", image: "", span: false }]);
  };

  const removeItem = (index: number) => {
    set("items", s.items.filter((_, i) => i !== index));
  };

  const addVideo = () => {
    set("videos", [...s.videos, { title: "", duration: "", image: "", videoUrl: "" }]);
  };

  const removeVideo = (index: number) => {
    set("videos", s.videos.filter((_, i) => i !== index));
  };

  const addBlog = () => {
    set("blogs", [
      ...s.blogs,
      {
        title: "",
        category: "Buying Guides",
        image: "",
        date: new Date().toISOString().split("T")[0],
        excerpt: ""
      }
    ]);
  };

  const removeBlog = (index: number) => {
    set("blogs", s.blogs.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <AdminHeader title="Gallery Settings" breadcrumb={[{ label: "Gallery Settings" }]} />
        <main style={{ flex: 1, padding: "28px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", border: "3px solid var(--line)", borderTopColor: "var(--blue-600)", animation: "spin 1s linear infinite" }} />
            <div style={{ fontSize: 13, color: "var(--muted)" }}>Loading content...</div>
          </div>
          <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }` }} />
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", paddingBottom: 80 }}>
      <AdminHeader title="Gallery Settings" breadcrumb={[{ label: "Gallery Settings" }]} />

      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 24, maxWidth: 1100 }}>
        {errorMsg && (
          <div style={{ background: "rgba(239, 68, 68, 0.08)", border: "1px solid #EF4444", color: "#b91c1c", padding: "12px 18px", borderRadius: "var(--r-sm)", fontSize: 14 }}>
            {errorMsg}
          </div>
        )}

        {/* Section Headings */}
        <SectionCard title="Gallery Section Headings" description="Customize titles and subtitles displayed on the public Gallery page.">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", color: "var(--blue-600)", borderBottom: "1px solid var(--line-2)", paddingBottom: 8 }}>Media Section</h4>
              <Field
                label="Media Eyebrow"
                value={s.mediaEyebrow}
                onChange={(val) => set("mediaEyebrow", val)}
                placeholder="e.g. Media · Gallery"
              />
              <Field
                label="Media Title"
                value={s.mediaTitle}
                onChange={(val) => set("mediaTitle", val)}
                placeholder="e.g. Inside our plants"
              />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", color: "var(--blue-600)", borderBottom: "1px solid var(--line-2)", paddingBottom: 8 }}>Videos Section</h4>
              <Field
                label="Videos Eyebrow"
                value={s.videosEyebrow}
                onChange={(val) => set("videosEyebrow", val)}
                placeholder="e.g. Watch"
              />
              <Field
                label="Videos Title"
                value={s.videosTitle}
                onChange={(val) => set("videosTitle", val)}
                placeholder="e.g. Videos & walkthroughs"
              />
            </div>
          </div>
          
          <div style={{ borderTop: "1px solid var(--line-2)", paddingTop: 16, marginTop: 8, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", color: "var(--blue-600)", borderBottom: "1px solid var(--line-2)", paddingBottom: 8 }}>Blogs Section</h4>
              <Field
                label="Blogs Eyebrow"
                value={s.blogsEyebrow}
                onChange={(val) => set("blogsEyebrow", val)}
                placeholder="e.g. Knowledge Center"
              />
              <Field
                label="Blogs Title"
                value={s.blogsTitle}
                onChange={(val) => set("blogsTitle", val)}
                placeholder="e.g. Guides, tips & insights"
              />
            </div>
          </div>
        </SectionCard>

        {/* Media Items (Photos) */}
        <SectionCard 
          title="Media Gallery (Photos)" 
          description="Manage photos showcasing manufacturing, facilities, and the dispatch network."
          right={
            <Button size="sm" onClick={addItem}>
              + Add Photo
            </Button>
          }
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {s.items.length === 0 ? (
              <div style={{ padding: "40px", textAlign: "center", border: "1px dashed var(--line)", borderRadius: "var(--r-sm)", color: "var(--muted)", fontSize: 13 }}>
                No photos in the gallery. Click "Add Photo" to add one.
              </div>
            ) : (
              s.items.map((item, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    display: "grid", 
                    gridTemplateColumns: "110px 2.2fr 1fr 120px auto", 
                    gap: 16, 
                    padding: "16px", 
                    background: "var(--paper-2)", 
                    borderRadius: "var(--r-sm)", 
                    border: "1px solid var(--line)", 
                    alignItems: "center" 
                  }}
                >
                  {/* Photo Upload */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
                    {item.image ? (
                      <div style={{ position: "relative", width: 90, height: 64, borderRadius: "var(--r-xs)", border: "1px solid var(--line)", overflow: "hidden" }}>
                        <LazyImage src={item.image} alt={item.title || `Photo #${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    ) : (
                      <div style={{ width: 90, height: 64, borderRadius: "var(--r-xs)", border: "1px dashed var(--line)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "var(--muted)", textAlign: "center" }}>No photo</div>
                    )}
                    <label
                      style={{
                        padding: "3px 8px", background: "#fff", border: "1px solid var(--line)", borderRadius: "var(--r-xs)",
                        fontSize: 10, fontWeight: 600, color: "var(--slate)", cursor: "pointer", display: "inline-flex", justifyContent: "center", width: "100%"
                      }}
                    >
                      {uploadingIdx?.type === "items" && uploadingIdx.index === idx ? "Uploading..." : "Upload"}
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, { type: "items", index: idx })} style={{ display: "none" }} />
                    </label>
                  </div>

                  {/* Title */}
                  <Field
                    label={`Photo #${idx + 1} Title`}
                    value={item.title}
                    onChange={(val) => {
                      const newItems = [...s.items];
                      newItems[idx] = { ...newItems[idx], title: val };
                      set("items", newItems);
                    }}
                    placeholder="e.g. Rotomoulding Production Floor"
                  />

                  {/* Category */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, fontFamily: "var(--font-display)" }}>
                      Category
                    </span>
                    <select
                      value={item.category}
                      onChange={(e) => {
                        const newItems = [...s.items];
                        newItems[idx] = { ...newItems[idx], category: e.target.value };
                        set("items", newItems);
                      }}
                      style={{
                        height: 42,
                        padding: "0 10px",
                        border: "1px solid var(--line)",
                        borderRadius: "var(--r-sm)",
                        fontSize: 13.5,
                        background: "#fff",
                        color: "var(--ink)",
                        outline: "none"
                      }}
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Span column toggle */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
                    <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, fontFamily: "var(--font-display)" }}>
                      Double Width
                    </span>
                    <div style={{ display: "flex", alignItems: "center", height: 42 }}>
                      <input 
                        type="checkbox" 
                        checked={item.span} 
                        onChange={(e) => {
                          const newItems = [...s.items];
                          newItems[idx] = { ...newItems[idx], span: e.target.checked };
                          set("items", newItems);
                        }}
                        style={{ width: 18, height: 18, cursor: "pointer" }}
                      />
                    </div>
                  </div>

                  {/* Action */}
                  <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={() => removeItem(idx)}
                    style={{ justifySelf: "end" }}
                  >
                    Delete
                  </Button>
                </div>
              ))
            )}
          </div>
        </SectionCard>

        {/* Video Walkthroughs */}
        <SectionCard 
          title="Video Walkthroughs" 
          description="Manage video items (e.g. tours, production processes)."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {s.videos.length === 0 ? (
              <div style={{ padding: "40px", textAlign: "center", border: "1px dashed var(--line)", borderRadius: "var(--r-sm)", color: "var(--muted)", fontSize: 13 }}>
                No videos in the gallery.
              </div>
            ) : (
              s.videos.map((vid, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    display: "grid", 
                    gridTemplateColumns: "110px 2fr 1fr 1.5fr", 
                    gap: 16, 
                    padding: "16px", 
                    background: "var(--paper-2)", 
                    borderRadius: "var(--r-sm)", 
                    border: "1px solid var(--line)", 
                    alignItems: "center" 
                  }}
                >
                  {/* Video Cover Upload */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
                    {vid.image ? (
                      <div style={{ position: "relative", width: 90, height: 64, borderRadius: "var(--r-xs)", border: "1px solid var(--line)", overflow: "hidden" }}>
                        <LazyImage src={vid.image} alt={vid.title || `Video #${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    ) : (
                      <div style={{ width: 90, height: 64, borderRadius: "var(--r-xs)", border: "1px dashed var(--line)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "var(--muted)", textAlign: "center" }}>No cover</div>
                    )}
                    <label
                      style={{
                        padding: "3px 8px", background: "#fff", border: "1px solid var(--line)", borderRadius: "var(--r-xs)",
                        fontSize: 10, fontWeight: 600, color: "var(--slate)", cursor: "pointer", display: "inline-flex", justifyContent: "center", width: "100%"
                      }}
                    >
                      {uploadingIdx?.type === "videos" && uploadingIdx.index === idx ? "Uploading..." : "Upload"}
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, { type: "videos", index: idx })} style={{ display: "none" }} />
                    </label>
                  </div>

                  {/* Title */}
                  <Field
                    label={`Video #${idx + 1} Title`}
                    value={vid.title}
                    onChange={(val) => {
                      const newVideos = [...s.videos];
                      newVideos[idx] = { ...newVideos[idx], title: val };
                      set("videos", newVideos);
                    }}
                    placeholder="e.g. Inside the Rotomoulding Production Floor"
                  />

                  {/* Duration */}
                  <Field
                    label="Duration"
                    value={vid.duration}
                    onChange={(val) => {
                      const newVideos = [...s.videos];
                      newVideos[idx] = { ...newVideos[idx], duration: val };
                      set("videos", newVideos);
                    }}
                    placeholder="e.g. 3:42"
                  />

                  {/* Video URL */}
                  <Field
                    label="Video URL / Link"
                    value={vid.videoUrl || ""}
                    onChange={async (val) => {
                      const newVideos = [...s.videos];
                      newVideos[idx] = { ...newVideos[idx], videoUrl: val };
                      set("videos", newVideos);

                      // Auto-fetch duration if it looks like a YouTube URL
                      if (val.includes("youtube.com") || val.includes("youtu.be")) {
                        try {
                          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/gallery/youtube-duration?url=${encodeURIComponent(val)}`);
                          if (res.ok) {
                            const resData = await res.json();
                            if (resData.duration) {
                              const updatedVideos = [...newVideos];
                              updatedVideos[idx] = { ...updatedVideos[idx], duration: resData.duration };
                              set("videos", updatedVideos);
                            }
                          }
                        } catch (err) {
                          console.error("Failed to fetch YouTube duration:", err);
                        }
                      }
                    }}
                    placeholder="e.g. https://youtube.com/..."
                  />
                </div>
              ))
            )}
          </div>
        </SectionCard>



        {/* Save Bar */}
        <SaveBar
          saved={saved}
          onSave={saveGalleryContent}
          onReset={fetchGalleryContent}
        />
      </main>
    </div>
  );
}
