"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { adminAuth } from "../_services/adminAuth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (adminAuth.isAuthenticated()) {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const ok = adminAuth.login(email, password);
    if (ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    }
  }

  if (!mounted) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0D1B35 0%, #0A3F8F 60%, #062D6B 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(20,102,230,.18) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-15%",
            left: "-8%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,180,240,.12) 0%, transparent 70%)",
          }}
        />
        {/* Grid dots */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }}>
          <defs>
            <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 420, position: "relative", zIndex: 1 }}>
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "var(--blue-600)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(20,102,230,.5)",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L3 7l9 5 9-5-9-5zM3 17l9 5 9-5M3 12l9 5 9-5" />
            </svg>
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 20, fontFamily: "var(--font-display)", lineHeight: 1.1 }}>Supremo</div>
            <div style={{ color: "rgba(255,255,255,.45)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>Admin Portal</div>
          </div>
        </div>

        {/* Card */}
        <div
          style={{
            width: "100%",
            background: "rgba(255,255,255,.97)",
            backdropFilter: "blur(20px)",
            borderRadius: 20,
            padding: "36px 36px 32px",
            boxShadow: "0 40px 80px -20px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.08)",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: 22,
              color: "var(--ink)",
              marginBottom: 6,
            }}
          >
            Welcome back
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 28 }}>
            Sign in to access the admin dashboard.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Email */}
            <div className="field">
              <label>Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@supremo.com"
                autoComplete="email"
                disabled={loading}
                style={{ opacity: loading ? 0.7 : 1 }}
              />
            </div>

            {/* Password */}
            <div className="field" style={{ position: "relative" }}>
              <label>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={loading}
                  style={{
                    width: "100%",
                    height: 48,
                    padding: "0 44px 0 14px",
                    border: "1px solid var(--line)",
                    borderRadius: "var(--r-sm)",
                    font: "inherit",
                    fontSize: 15,
                    color: "var(--ink)",
                    background: "var(--paper-2)",
                    outline: "none",
                    opacity: loading ? 0.7 : 1,
                    transition: "border-color .15s",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--blue-600)";
                    (e.currentTarget as HTMLElement).style.background = "#fff";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 4px var(--blue-100)";
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
                    (e.currentTarget as HTMLElement).style.background = "var(--paper-2)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--soft)",
                    padding: 4,
                    display: "flex",
                    alignItems: "center",
                  }}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: "var(--r-sm)",
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#ef4444",
                  fontSize: 13,
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                height: 48,
                background: loading ? "var(--blue-700)" : "var(--blue-600)",
                color: "#fff",
                border: "none",
                borderRadius: "var(--r-sm)",
                fontSize: 15,
                fontWeight: 600,
                fontFamily: "var(--font-display)",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                marginTop: 4,
                transition: "background .15s, transform .15s, box-shadow .15s",
                boxShadow: loading ? "none" : "0 4px 14px -4px rgba(20,102,230,.5)",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "var(--blue-700)";
                  el.style.transform = "translateY(-1px)";
                  el.style.boxShadow = "0 8px 20px -4px rgba(20,102,230,.6)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "var(--blue-600)";
                  el.style.transform = "";
                  el.style.boxShadow = "0 4px 14px -4px rgba(20,102,230,.5)";
                }
              }}
            >
              {loading ? (
                <>
                  <span
                    style={{
                      width: 16,
                      height: 16,
                      border: "2px solid rgba(255,255,255,.3)",
                      borderTopColor: "#fff",
                      borderRadius: "50%",
                      animation: "spin .6s linear infinite",
                    }}
                  />
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                  Signing in…
                </>
              ) : (
                <>
                  Sign in to Admin
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Demo creds hint */}
        <div
          style={{
            marginTop: 20,
            background: "rgba(255,255,255,.07)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,.12)",
            borderRadius: "var(--r-md)",
            padding: "12px 20px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <div style={{ color: "rgba(255,255,255,.5)", fontSize: 11, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 600 }}>
            Demo Credentials
          </div>
          <div style={{ color: "rgba(255,255,255,.75)", fontSize: 13, display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            <span><span style={{ color: "rgba(255,255,255,.45)" }}>Email:</span> admin@supremo.com</span>
            <span><span style={{ color: "rgba(255,255,255,.45)" }}>Password:</span> admin@123</span>
          </div>
        </div>
      </div>
    </div>
  );
}
