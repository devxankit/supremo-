"use client";

import { useState } from "react";
import { AdminHeader } from "../_components/AdminHeader";

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", overflow: "hidden" }}>
      <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid var(--line-2)" }}>
        <div style={{ fontWeight: 700, fontSize: 15, fontFamily: "var(--font-display)", color: "var(--ink)" }}>{title}</div>
        {description && <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>{description}</div>}
      </div>
      <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", gap: 18 }}>
        {children}
      </div>
    </div>
  );
}

function ToggleRow({ label, description, defaultOn = false }: { label: string; description: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", fontFamily: "var(--font-display)" }}>{label}</div>
        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{description}</div>
      </div>
      <button
        role="switch"
        aria-checked={on}
        onClick={() => setOn((o) => !o)}
        style={{
          width: 44,
          height: 24,
          borderRadius: 999,
          background: on ? "var(--blue-600)" : "var(--line)",
          border: "none",
          cursor: "pointer",
          position: "relative",
          flexShrink: 0,
          transition: "background .2s",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 2,
            left: on ? 22 : 2,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 1px 3px rgba(0,0,0,.2)",
            transition: "left .2s",
          }}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader title="Settings" breadcrumb={[{ label: "Settings" }]} />

      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 24, maxWidth: 760 }}>

        {/* Profile */}
        <Section title="Profile" description="Your admin account details">
          <div style={{ display: "flex", alignItems: "center", gap: 16, paddingBottom: 18, borderBottom: "1px solid var(--line-2)" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg, var(--blue-600), var(--blue-400))", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 22, fontWeight: 800, fontFamily: "var(--font-display)", flexShrink: 0 }}>
              A
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: "var(--ink)", fontFamily: "var(--font-display)" }}>Admin</div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>admin@supremo.com</div>
              <div style={{ marginTop: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: "var(--r-pill)", background: "var(--blue-50)", color: "var(--blue-700)" }}>Super Admin</span>
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="field">
              <label>Full Name</label>
              <input type="text" defaultValue="Admin" />
            </div>
            <div className="field">
              <label>Email Address</label>
              <input type="email" defaultValue="admin@supremo.com" />
            </div>
          </div>
          <div className="field">
            <label>Phone Number</label>
            <input type="tel" placeholder="+91 00000 00000" />
          </div>
        </Section>

        {/* Security */}
        <Section title="Security" description="Manage your password and session settings">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="field">
              <label>Current Password</label>
              <input type="password" placeholder="••••••••" />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="field">
              <label>New Password</label>
              <input type="password" placeholder="Min. 8 characters" />
            </div>
            <div className="field">
              <label>Confirm New Password</label>
              <input type="password" placeholder="Repeat new password" />
            </div>
          </div>
          <div style={{ background: "var(--paper-2)", borderRadius: "var(--r-sm)", padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>Sessions expire after 8 hours of inactivity.</span>
          </div>
        </Section>

        {/* Notifications */}
        <Section title="Notifications" description="Control what alerts you receive">
          <ToggleRow label="New Inquiry Alerts" description="Email notification when a contact inquiry is submitted" defaultOn={true} />
          <ToggleRow label="Dealer Application Alerts" description="Email notification for new dealer partnership requests" defaultOn={true} />
          <ToggleRow label="Low Stock Alerts" description="Alert when a product stock falls below 10 units" defaultOn={false} />
          <ToggleRow label="Weekly Summary" description="Receive a weekly digest of admin activity" defaultOn={true} />
        </Section>

        {/* Website Settings */}
        <Section title="Website Settings" description="Control public-facing website behaviour">
          <ToggleRow label="Maintenance Mode" description="Show a maintenance page to website visitors" defaultOn={false} />
          <ToggleRow label="Show Dealer CTA" description="Display the Become a Dealer banner across the site" defaultOn={true} />
          <ToggleRow label="Product Reviews" description="Allow customers to submit product reviews" defaultOn={false} />
        </Section>

        {/* Save */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={handleSave}
            style={{
              height: 44,
              padding: "0 28px",
              background: "var(--blue-600)",
              color: "#fff",
              border: "none",
              borderRadius: "var(--r-sm)",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "var(--font-display)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "background .15s",
              boxShadow: "0 4px 12px -4px rgba(20,102,230,.4)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--blue-700)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--blue-600)"; }}
          >
            {saved ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                Saved!
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
                Save Changes
              </>
            )}
          </button>
          <button
            style={{
              height: 44,
              padding: "0 20px",
              background: "transparent",
              color: "var(--muted)",
              border: "1px solid var(--line)",
              borderRadius: "var(--r-sm)",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "var(--font-display)",
              cursor: "pointer",
            }}
          >
            Discard
          </button>
        </div>

      </main>
    </div>
  );
}
