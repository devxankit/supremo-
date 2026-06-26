"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { adminAuth } from "@/app/admin/_services/adminAuth";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

function MaintenanceWrapper({ children }: { children: React.ReactNode }) {
  // null = still checking, false = not in maintenance, true = in maintenance
  const [maintenance, setMaintenance] = useState<boolean | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Admin panel and API routes are always accessible
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
      setMaintenance(false);
      return;
    }

    // Authenticated admins can always access the site
    if (adminAuth.isAuthenticated()) {
      setMaintenance(false);
      return;
    }

    // Fetch settings to check maintenance mode
    fetch(`${API_BASE}/settings`)
      .then((res) => res.json())
      .then((data) => {
        setMaintenance(!!(data && data.maintenanceMode));
      })
      .catch((err) => {
        console.error("Error fetching maintenance settings:", err);
        setMaintenance(false);
      });
  }, [pathname]);

  // Track public page visits
  useEffect(() => {
    if (
      pathname.startsWith("/admin") ||
      pathname.startsWith("/api") ||
      pathname.includes("favicon") ||
      pathname.includes(".")
    ) {
      return;
    }

    fetch(`${API_BASE}/inquiries/visit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: pathname,
        referrer: typeof document !== "undefined" ? document.referrer : "",
      }),
    }).catch((err) => {
      console.error("Error logging page view:", err);
    });
  }, [pathname]);

  // While checking — render nothing visible (prevents flash)
  if (maintenance === null) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#f8f9fb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        {/* Invisible loading state — just blank screen while we check */}
      </div>
    );
  }

  if (maintenance) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes floatUp {
            0% { transform: translateY(0px) scale(1); opacity: 0.7; }
            50% { transform: translateY(-14px) scale(1.04); opacity: 1; }
            100% { transform: translateY(0px) scale(1); opacity: 0.7; }
          }
          @keyframes pulse-ring {
            0% { transform: scale(0.92); opacity: 0.6; }
            70% { transform: scale(1.12); opacity: 0; }
            100% { transform: scale(0.92); opacity: 0; }
          }
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(24px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes orbit {
            from { transform: rotate(0deg) translateX(52px) rotate(0deg); }
            to   { transform: rotate(360deg) translateX(52px) rotate(-360deg); }
          }
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          @keyframes blink {
            0%, 100% { opacity: 1; } 
            50% { opacity: 0.3; }
          }

          .maint-bg {
            min-height: 100vh;
            background: linear-gradient(-45deg, #0a0f1e, #0d1a3a, #091429, #0f2252);
            background-size: 400% 400%;
            animation: gradientShift 10s ease infinite;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            position: relative;
            overflow: hidden;
          }

          .maint-grid {
            position: absolute;
            inset: 0;
            background-image:
              linear-gradient(rgba(30,90,255,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(30,90,255,0.06) 1px, transparent 1px);
            background-size: 48px 48px;
            mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
          }

          .maint-orb-1 {
            position: absolute;
            width: 480px; height: 480px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(30,90,255,0.18) 0%, transparent 70%);
            top: -120px; left: -120px;
            pointer-events: none;
          }
          .maint-orb-2 {
            position: absolute;
            width: 360px; height: 360px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(90,30,255,0.14) 0%, transparent 70%);
            bottom: -80px; right: -80px;
            pointer-events: none;
          }

          .maint-card {
            position: relative;
            z-index: 10;
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 28px;
            padding: 56px 48px 48px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08);
            backdrop-filter: blur(20px);
            animation: fadeSlideUp 0.6s ease both;
            text-align: center;
          }

          .maint-icon-wrap {
            position: relative;
            width: 96px; height: 96px;
            margin: 0 auto 32px;
            animation: floatUp 4s ease-in-out infinite;
          }
          .maint-icon-ring {
            position: absolute;
            inset: -10px;
            border-radius: 50%;
            border: 2px solid rgba(60,130,255,0.5);
            animation: pulse-ring 2.5s ease-out infinite;
          }
          .maint-icon-ring-2 {
            position: absolute;
            inset: -10px;
            border-radius: 50%;
            border: 2px solid rgba(60,130,255,0.3);
            animation: pulse-ring 2.5s ease-out 0.8s infinite;
          }
          .maint-icon-circle {
            width: 96px; height: 96px;
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(30,90,255,0.25), rgba(90,30,255,0.2));
            border: 1.5px solid rgba(80,150,255,0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
          }
          .maint-icon-inner {
            width: 56px; height: 56px;
            border-radius: 50%;
            background: linear-gradient(135deg, #1a5fff, #5a1fff);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 24px rgba(30,90,255,0.5);
          }

          .maint-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: rgba(30,90,255,0.15);
            border: 1px solid rgba(30,90,255,0.35);
            border-radius: 999px;
            padding: 5px 14px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #7ab3ff;
            margin-bottom: 20px;
          }
          .maint-dot {
            width: 6px; height: 6px;
            border-radius: 50%;
            background: #4d8fff;
            animation: blink 1.4s ease-in-out infinite;
          }

          .maint-title {
            font-size: 38px;
            font-weight: 900;
            color: #fff;
            letter-spacing: -0.03em;
            line-height: 1.1;
            margin: 0 0 16px;
          }
          .maint-title span {
            background: linear-gradient(90deg, #7ab3ff, #a78bfa);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .maint-desc {
            font-size: 15px;
            line-height: 1.7;
            color: rgba(255,255,255,0.6);
            margin-bottom: 36px;
          }

          .maint-progress-wrap {
            background: rgba(255,255,255,0.06);
            border-radius: 999px;
            height: 4px;
            overflow: hidden;
            margin-bottom: 32px;
            position: relative;
          }
          .maint-progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #1a5fff, #a78bfa);
            border-radius: 999px;
            width: 65%;
            position: relative;
          }
          .maint-progress-bar::after {
            content: '';
            position: absolute;
            right: 0; top: 0;
            width: 40px; height: 100%;
            background: rgba(255,255,255,0.5);
            filter: blur(4px);
          }

          .maint-divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
            margin-bottom: 24px;
          }

          .maint-footer {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-size: 12px;
            color: rgba(255,255,255,0.3);
          }
          .maint-footer-logo {
            font-weight: 800;
            color: rgba(255,255,255,0.5);
            letter-spacing: 0.04em;
          }

          .maint-stars {
            position: absolute;
            inset: 0;
            pointer-events: none;
            overflow: hidden;
          }
          .maint-star {
            position: absolute;
            width: 2px;
            height: 2px;
            border-radius: 50%;
            background: rgba(255,255,255,0.6);
          }
        `}} />

        <div className="maint-bg">
          {/* Background grid */}
          <div className="maint-grid" />
          {/* Glow orbs */}
          <div className="maint-orb-1" />
          <div className="maint-orb-2" />

          {/* Stars */}
          <div className="maint-stars">
            {[...Array(30)].map((_, i) => (
              <div key={i} className="maint-star" style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.6 + 0.1,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
              }} />
            ))}
          </div>

          <div className="maint-card">
            {/* Floating icon */}
            <div className="maint-icon-wrap">
              <div className="maint-icon-ring" />
              <div className="maint-icon-ring-2" />
              <div className="maint-icon-circle">
                <div className="maint-icon-inner">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Live badge */}
            <div className="maint-badge">
              <span className="maint-dot" />
              Scheduled Maintenance
            </div>

            {/* Title */}
            <h1 className="maint-title">
              We&apos;ll be back<br />
              <span>very soon.</span>
            </h1>

            {/* Description */}
            <p className="maint-desc">
              We&apos;re currently performing scheduled maintenance to bring you a better experience.
              Our team is working hard — this won&apos;t take long!
            </p>

            {/* Progress bar */}
            <div className="maint-progress-wrap">
              <div className="maint-progress-bar" />
            </div>

            <div className="maint-divider" />

            {/* Footer */}
            <div className="maint-footer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span className="maint-footer-logo">SUPREMO</span>
              <span>·</span>
              <span>{new Date().getFullYear()} · All rights reserved</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <>{children}</>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MaintenanceWrapper>
        {children}
      </MaintenanceWrapper>
      <ProgressBar
        height="3px"
        color="var(--blue-600)"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
}
