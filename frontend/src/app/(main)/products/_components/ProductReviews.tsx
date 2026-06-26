"use client";

import { useEffect, useState } from "react";

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export function ProductReviews({ productSlug }: { productSlug: string }) {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Form State
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // 1. Fetch settings to see if reviews are enabled
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/settings`)
      .then((res) => res.json())
      .then((settings) => {
        if (settings.productReviews) {
          setEnabled(true);
          // 2. Fetch reviews
          return fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/reviews/${productSlug}`);
        } else {
          setEnabled(false);
          setLoading(false);
        }
      })
      .then((res) => {
        if (res) return res.json();
      })
      .then((data) => {
        if (data) {
          setReviews(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading reviews:", err);
        setLoading(false);
      });
  }, [productSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!name.trim() || !comment.trim()) {
      setError("Please fill out all fields.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/reviews/${productSlug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, rating, comment }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to submit review.");
      }

      const newReview = await res.json();
      setReviews((prev) => [newReview, ...prev]);
      setSuccess(true);
      setName("");
      setComment("");
      setRating(5);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", border: "3px solid var(--line)", borderTopColor: "var(--blue-600)", animation: "spin 1s linear infinite" }} />
        <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }` }} />
      </div>
    );
  }

  if (!enabled) {
    return null;
  }

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : "0.0";

  return (
    <section style={{ padding: "64px 0", borderTop: "1px solid var(--line)" }}>
      <div className="container">
        <span className="eyebrow">Customer Feedback</span>
        <h2 style={{ fontSize: "clamp(24px,3vw,36px)", marginTop: 16, marginBottom: 40 }}>
          Product Reviews
        </h2>

        <div className="mob-1col" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 56, alignItems: "start" }}>
          {/* Left: Summary & Add Review Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {/* Rating Summary Card */}
            <div
              style={{
                background: "var(--paper-2)",
                border: "1px solid var(--line)",
                borderRadius: "var(--r-md)",
                padding: "24px 28px",
                display: "flex",
                alignItems: "center",
                gap: 24,
              }}
            >
              <div style={{ fontSize: 48, fontWeight: 800, color: "var(--ink)", fontFamily: "var(--font-display)" }}>
                {averageRating}
              </div>
              <div>
                <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = star <= Math.round(Number(averageRating));
                    return (
                      <svg
                        key={star}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill={isFilled ? "#FFB020" : "none"}
                        stroke={isFilled ? "#FFB020" : "var(--muted)"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    );
                  })}
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>
                  Based on {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
                </div>
              </div>
            </div>

            {/* Write Review Form */}
            <form
              onSubmit={handleSubmit}
              style={{
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: "var(--r-md)",
                padding: 28,
                boxShadow: "var(--sh-sm)",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>
                Write a Review
              </h3>

              {success && (
                <div
                  style={{
                    background: "rgba(31, 174, 106, 0.08)",
                    border: "1px solid #1FAE6A",
                    color: "#167e4d",
                    padding: "10px 14px",
                    borderRadius: "var(--r-sm)",
                    fontSize: 13,
                  }}
                >
                  Thank you! Your review has been submitted successfully.
                </div>
              )}

              {error && (
                <div
                  style={{
                    background: "rgba(239, 68, 68, 0.08)",
                    border: "1px solid #EF4444",
                    color: "#b91c1c",
                    padding: "10px 14px",
                    borderRadius: "var(--r-sm)",
                    fontSize: 13,
                  }}
                >
                  {error}
                </div>
              )}

              {/* Name Input */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)" }}>Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    height: 40,
                    padding: "0 12px",
                    borderRadius: "var(--r-sm)",
                    border: "1px solid var(--line-2)",
                    fontSize: 14,
                    outline: "none",
                    background: "var(--paper)",
                    color: "var(--ink)",
                  }}
                />
              </div>

              {/* Rating Selector */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)" }}>Rating *</label>
                <div style={{ display: "flex", gap: 6 }}>
                  {[1, 2, 3, 4, 5].map((star) => {
                    const activeRating = hoverRating !== null ? hoverRating : rating;
                    const isFilled = star <= activeRating;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          outline: "none",
                        }}
                      >
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 24 24"
                          fill={isFilled ? "#FFB020" : "none"}
                          stroke={isFilled ? "#FFB020" : "var(--muted)"}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ transition: "transform 0.1s" }}
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Comment Textarea */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)" }}>Review Details *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share your experience with this product..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{
                    padding: "10px 12px",
                    borderRadius: "var(--r-sm)",
                    border: "1px solid var(--line-2)",
                    fontSize: 14,
                    outline: "none",
                    background: "var(--paper)",
                    color: "var(--ink)",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  height: 42,
                  background: "var(--blue-600)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "var(--r-sm)",
                  fontSize: 13.5,
                  fontWeight: 600,
                  cursor: submitting ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  opacity: submitting ? 0.7 : 1,
                  boxShadow: "0 4px 12px -4px rgba(20,102,230,.4)",
                  transition: "background .15s",
                }}
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>

          {/* Right: Reviews List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {reviews.length === 0 ? (
              <div
                style={{
                  border: "2px dashed var(--line)",
                  borderRadius: "var(--r-md)",
                  padding: "48px 24px",
                  textAlign: "center",
                  color: "var(--muted)",
                  fontSize: 14.5,
                }}
              >
                No reviews yet. Be the first to leave a review!
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    style={{
                      background: "var(--paper)",
                      border: "1px solid var(--line-2)",
                      borderRadius: "var(--r-md)",
                      padding: 20,
                      boxShadow: "var(--sh-sm)",
                    }}
                  >
                    {/* Header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14.5, color: "var(--ink)" }}>
                          {review.name}
                        </div>
                        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
                          {new Date(review.createdAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </div>

                      {/* Stars */}
                      <div style={{ display: "flex", gap: 2 }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill={star <= review.rating ? "#FFB020" : "none"}
                            stroke={star <= review.rating ? "#FFB020" : "var(--muted)"}
                            strokeWidth="2.5"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <p style={{ fontSize: 14, color: "var(--slate)", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
