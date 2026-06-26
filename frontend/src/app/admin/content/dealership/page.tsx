"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "../../_components/AdminHeader";
import { SectionCard, Field, TextArea, Button, SaveBar, useSavedFlash } from "../../_components/ui";
import { adminAuth } from "../../_services/adminAuth";
import { LazyImage } from "@/components/LazyImage";

interface OfferItem {
  key: string;
  title: string;
  description: string;
}

interface StepItem {
  n: string;
  title: string;
  desc: string;
}

interface FAQItem {
  q: string;
  a: string;
}

interface DealershipState {
  heroEyebrow: string;
  heroHeading: string;
  heroHeadingHighlight: string;
  heroSub: string;
  heroImage: string;
  
  whyEyebrow: string;
  whyHeading: string;
  offers: OfferItem[];

  applyEyebrow: string;
  applyHeading: string;
  applyDescription: string;
  benefits: string[];
  
  asideEyebrow: string;
  asideHeading: string;
  asideDescription: string;
  steps: StepItem[];
  
  faqs: FAQItem[];
  productInterests: string[];
}

const DEFAULT: DealershipState = {
  heroEyebrow: "",
  heroHeading: "",
  heroHeadingHighlight: "",
  heroSub: "",
  heroImage: "",
  whyEyebrow: "",
  whyHeading: "",
  offers: [
    { key: "top-left", title: "", description: "" },
    { key: "mid-left", title: "", description: "" },
    { key: "bot-left", title: "", description: "" },
    { key: "top-right", title: "", description: "" },
    { key: "mid-right", title: "", description: "" },
    { key: "bot-right", title: "", description: "" },
    { key: "bot-center", title: "", description: "" }
  ],
  applyEyebrow: "",
  applyHeading: "",
  applyDescription: "",
  benefits: ["", "", ""],
  asideEyebrow: "",
  asideHeading: "",
  asideDescription: "",
  steps: [
    { n: "01", title: "", desc: "" },
    { n: "02", title: "", desc: "" },
    { n: "03", title: "", desc: "" }
  ],
  faqs: [],
  productInterests: []
};

export default function DealershipEditorPage() {
  const [s, setS] = useState<DealershipState>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { saved, flash } = useSavedFlash();
  const [newInterest, setNewInterest] = useState("");

  const fetchDealershipContent = () => {
    setLoading(true);
    setErrorMsg("");
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/dealership`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to retrieve dealership page content.");
        return res.json();
      })
      .then((data) => {
        setS({
          heroEyebrow: data.heroEyebrow || DEFAULT.heroEyebrow,
          heroHeading: data.heroHeading || DEFAULT.heroHeading,
          heroHeadingHighlight: data.heroHeadingHighlight || DEFAULT.heroHeadingHighlight,
          heroSub: data.heroSub || DEFAULT.heroSub,
          heroImage: data.heroImage || DEFAULT.heroImage,
          whyEyebrow: data.whyEyebrow || DEFAULT.whyEyebrow,
          whyHeading: data.whyHeading || DEFAULT.whyHeading,
          offers: data.offers && data.offers.length > 0 ? data.offers : DEFAULT.offers,
          applyEyebrow: data.applyEyebrow || DEFAULT.applyEyebrow,
          applyHeading: data.applyHeading || DEFAULT.applyHeading,
          applyDescription: data.applyDescription || DEFAULT.applyDescription,
          benefits: data.benefits && data.benefits.length > 0 ? data.benefits : DEFAULT.benefits,
          asideEyebrow: data.asideEyebrow || DEFAULT.asideEyebrow,
          asideHeading: data.asideHeading || DEFAULT.asideHeading,
          asideDescription: data.asideDescription || DEFAULT.asideDescription,
          steps: data.steps && data.steps.length > 0 ? data.steps : DEFAULT.steps,
          faqs: data.faqs || [],
          productInterests: data.productInterests || DEFAULT.productInterests,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading dealership page data:", err);
        setErrorMsg("Failed to load dealership section data from the server.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDealershipContent();
  }, []);

  function set<K extends keyof DealershipState>(key: K, value: DealershipState[K]) {
    setS((prev) => ({ ...prev, [key]: value }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/media/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        set("heroImage", data.url);
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(`Image upload failed: ${errData.message || res.statusText}`);
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Error uploading image. Check console for details.");
    } finally {
      setUploading(false);
    }
  }

  const saveDealershipContent = async () => {
    const user = adminAuth.getUser();
    if (!user?.token) {
      alert("Not authenticated. Please log in.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/dealership`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(s),
      });

      if (res.ok) {
        flash();
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(`Failed to save: ${errData.message || res.statusText}`);
      }
    } catch (err) {
      console.error("Error saving dealership content:", err);
      alert("Error saving dealership content.");
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <AdminHeader title="Dealership Page Settings" breadcrumb={[{ label: "Dealership Page Settings" }]} />
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
      <AdminHeader title="Dealership Page Settings" breadcrumb={[{ label: "Dealership Page Settings" }]} />

      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 24, maxWidth: 1000 }}>
        {errorMsg && (
          <div style={{ background: "rgba(239, 68, 68, 0.08)", border: "1px solid #EF4444", color: "#b91c1c", padding: "12px 18px", borderRadius: "var(--r-sm)", fontSize: 14 }}>
            {errorMsg}
          </div>
        )}

        {/* Hero Section */}
        <SectionCard title="Hero Section Text Copy" description="Modify the primary text block visible at the top of the Dealership Page.">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field
              label="Eyebrow text"
              value={s.heroEyebrow}
              onChange={(val) => set("heroEyebrow", val)}
              placeholder="e.g. Partner Programme"
            />
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field
                label="Heading Start"
                value={s.heroHeading}
                onChange={(val) => set("heroHeading", val)}
                placeholder="e.g. Grow your business"
              />
              <Field
                label="Heading Highlight (Blue Color)"
                value={s.heroHeadingHighlight}
                onChange={(val) => set("heroHeadingHighlight", val)}
                placeholder="e.g. with Supremo."
              />
            </div>

            <TextArea
              label="Hero Sub/Description"
              value={s.heroSub}
              onChange={(val) => set("heroSub", val)}
              placeholder="Provide a detailed description of partnership benefits..."
              rows={4}
            />

            <div>
              <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, fontFamily: "var(--font-display)", display: "block", marginBottom: 8 }}>
                Hero Image
              </span>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                {s.heroImage ? (
                  <div style={{ position: "relative", width: 120, height: 90, borderRadius: "var(--r-sm)", border: "1px solid var(--line)", overflow: "hidden", flexShrink: 0 }}>
                    <LazyImage src={s.heroImage} alt="Hero Visual" style={{ width: "100%", height: "100%", objectFit: "contain", background: "var(--paper-2)" }} />
                  </div>
                ) : (
                  <div style={{ width: 120, height: 90, borderRadius: "var(--r-sm)", border: "1px dashed var(--line)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "var(--muted)", flexShrink: 0 }}>No image</div>
                )}
                <label
                  style={{
                    height: 36, padding: "0 14px", background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 600, color: "var(--slate)", cursor: "pointer", transition: "background .15s"
                  }}
                >
                  {uploading ? "Uploading..." : "Upload New Image"}
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                </label>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Why Partner With Us / What Supremo Offers */}
        <SectionCard title="What Supremo Offers Section" description="Manage the titles and descriptions of the 7 core features in the interactive circular layout.">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field
                label="Section Eyebrow"
                value={s.whyEyebrow}
                onChange={(val) => set("whyEyebrow", val)}
                placeholder="e.g. Why partner with us"
              />
              <Field
                label="Section Heading"
                value={s.whyHeading}
                onChange={(val) => set("whyHeading", val)}
                placeholder="e.g. What Supremo Offers"
              />
            </div>

            <div style={{ borderTop: "1px solid var(--line)", paddingTop: 16, marginTop: 8 }}>
              <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, fontFamily: "var(--font-display)", display: "block", marginBottom: 12 }}>
                Offer Cards Copy ({s.offers.length})
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {s.offers.map((offer, idx) => (
                  <div key={offer.key} style={{ padding: "16px", background: "var(--paper-2)", borderRadius: "var(--r-sm)", border: "1px solid var(--line)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "var(--blue-600)", textTransform: "uppercase" }}>Card: {offer.key}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <Field
                        label="Card Title"
                        value={offer.title}
                        onChange={(val) => {
                          const newOffers = [...s.offers];
                          newOffers[idx] = { ...newOffers[idx], title: val };
                          set("offers", newOffers);
                        }}
                        placeholder="e.g. Certifications"
                      />
                      <TextArea
                        label="Card Description"
                        value={offer.description}
                        onChange={(val) => {
                          const newOffers = [...s.offers];
                          newOffers[idx] = { ...newOffers[idx], description: val };
                          set("offers", newOffers);
                        }}
                        placeholder="Card details..."
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Apply Section Headings & Steps */}
        <SectionCard title="Apply Section & Mini Steps" description="Configure headings, benefits, and steps for the partnership onboarding process.">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field
              label="Apply Eyebrow"
              value={s.applyEyebrow}
              onChange={(val) => set("applyEyebrow", val)}
              placeholder="e.g. Apply to partner"
            />
            <Field
              label="Apply Heading"
              value={s.applyHeading}
              onChange={(val) => set("applyHeading", val)}
              placeholder="e.g. Become an authorized Supremo partner."
            />
            <TextArea
              label="Apply Section Description"
              value={s.applyDescription}
              onChange={(val) => set("applyDescription", val)}
              placeholder="Enter sub-header text copy..."
              rows={3}
            />

            <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, fontFamily: "var(--font-display)", display: "block", marginTop: 8 }}>
              Partner Benefits Checkboxes (3 items)
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {s.benefits.map((benefit, idx) => (
                <Field
                  key={idx}
                  label={`Benefit #${idx + 1}`}
                  value={benefit}
                  onChange={(val) => {
                    const newBenefits = [...s.benefits];
                    newBenefits[idx] = val;
                    set("benefits", newBenefits);
                  }}
                  placeholder="e.g. Protected sales territory"
                />
              ))}
            </div>

            <div style={{ borderTop: "1px solid var(--line)", paddingTop: 16, marginTop: 8 }}>
              <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, fontFamily: "var(--font-display)", display: "block", marginBottom: 12 }}>
                Aside Panel / Steps Text
              </span>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <Field
                  label="Aside Eyebrow"
                  value={s.asideEyebrow}
                  onChange={(val) => set("asideEyebrow", val)}
                  placeholder="e.g. Partner application"
                />
                <Field
                  label="Aside Heading"
                  value={s.asideHeading}
                  onChange={(val) => set("asideHeading", val)}
                  placeholder="e.g. Sell Supremo in your area."
                />
              </div>
              <TextArea
                label="Aside Description"
                value={s.asideDescription}
                onChange={(val) => set("asideDescription", val)}
                placeholder="Aside description copy..."
                rows={3}
              />

              <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, fontFamily: "var(--font-display)", display: "block", marginBottom: 8 }}>
                Mini Steps Onboarding Flow (3 steps)
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {s.steps.map((step, idx) => (
                  <div key={step.n} style={{ display: "grid", gridTemplateColumns: "80px 1fr 2fr", gap: 16, padding: "16px", background: "var(--paper-2)", borderRadius: "var(--r-sm)", border: "1px solid var(--line)" }}>
                    <Field
                      label="Step #"
                      value={step.n}
                      onChange={(val) => {
                        const newSteps = [...s.steps];
                        newSteps[idx] = { ...newSteps[idx], n: val };
                        set("steps", newSteps);
                      }}
                      placeholder="e.g. 01"
                    />
                    <Field
                      label="Step Title"
                      value={step.title}
                      onChange={(val) => {
                        const newSteps = [...s.steps];
                        newSteps[idx] = { ...newSteps[idx], title: val };
                        set("steps", newSteps);
                      }}
                      placeholder="e.g. Submit your application"
                    />
                    <Field
                      label="Step Description"
                      value={step.desc}
                      onChange={(val) => {
                        const newSteps = [...s.steps];
                        newSteps[idx] = { ...newSteps[idx], desc: val };
                        set("steps", newSteps);
                      }}
                      placeholder="e.g. Tell us about your firm..."
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Product Interests */}
        <SectionCard title="Product Interests" description="Manage the available product options in the customer application dropdown.">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, fontFamily: "var(--font-display)", display: "block" }}>
              Active Product Interests ({s.productInterests ? s.productInterests.length : 0})
            </span>
            
            {!s.productInterests || s.productInterests.length === 0 ? (
              <div style={{ padding: "16px", background: "var(--paper-2)", borderRadius: "var(--r-sm)", border: "1px dashed var(--line)", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
                No product interests added yet. Add some below.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {s.productInterests.map((interest, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "var(--paper-2)", borderRadius: "var(--r-sm)", border: "1px solid var(--line)" }}>
                    <span style={{ fontSize: 14, color: "var(--ink)", fontWeight: 500 }}>{interest}</span>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        const newInterests = s.productInterests.filter((_, i) => i !== idx);
                        set("productInterests", newInterests);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            <div style={{ borderTop: "1px solid var(--line-2)", paddingTop: 16, marginTop: 8 }}>
              <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, fontFamily: "var(--font-display)", display: "block", marginBottom: 8 }}>
                Add New Product Interest
              </span>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
                <div style={{ flex: 1 }}>
                  <Field
                    label="Interest Name"
                    value={newInterest}
                    onChange={(val) => setNewInterest(val)}
                    placeholder="e.g. Water Storage Tanks"
                  />
                </div>
                <Button
                  onClick={() => {
                    const val = newInterest.trim();
                    if (!val) return;
                    if (s.productInterests && s.productInterests.includes(val)) {
                      alert("This interest already exists.");
                      return;
                    }
                    set("productInterests", [...(s.productInterests || []), val]);
                    setNewInterest("");
                  }}
                  style={{ height: 42 }}
                >
                  Add Interest
                </Button>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* FAQs */}
        <SectionCard title="Frequently Asked Questions" description="Edit the FAQ accordion items. Add or delete questions as required.">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, fontFamily: "var(--font-display)" }}>
                FAQs ({s.faqs.length})
              </span>
              <Button 
                size="sm" 
                onClick={() => {
                  set("faqs", [...s.faqs, { q: "", a: "" }]);
                }}
              >
                + Add FAQ
              </Button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {s.faqs.map((faq, idx) => (
                <div key={idx} style={{ padding: "16px", background: "var(--paper-2)", borderRadius: "var(--r-sm)", border: "1px solid var(--line)", position: "relative" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <Field
                      label={`Question #${idx + 1}`}
                      value={faq.q}
                      onChange={(val) => {
                        const newFaqs = [...s.faqs];
                        newFaqs[idx] = { ...newFaqs[idx], q: val };
                        set("faqs", newFaqs);
                      }}
                      placeholder="e.g. What investment is required to become a partner?"
                    />
                    <TextArea
                      label={`Answer #${idx + 1}`}
                      value={faq.a}
                      onChange={(val) => {
                        const newFaqs = [...s.faqs];
                        newFaqs[idx] = { ...newFaqs[idx], a: val };
                        set("faqs", newFaqs);
                      }}
                      placeholder="Provide answer details..."
                      rows={3}
                    />
                  </div>
                  <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end" }}>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => {
                        const newFaqs = s.faqs.filter((_, i) => i !== idx);
                        set("faqs", newFaqs);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        {/* Save/Reset strip */}
        <SaveBar
          saved={saved}
          onSave={saveDealershipContent}
          onReset={fetchDealershipContent}
        />
      </main>
    </div>
  );
}
