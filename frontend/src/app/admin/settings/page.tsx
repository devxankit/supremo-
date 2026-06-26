"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "../_components/AdminHeader";
import { adminAuth } from "../_services/adminAuth";

interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

function Section({ title, description, children }: SectionProps) {
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

interface ToggleRowProps {
  label: string;
  description: string;
  on: boolean;
  onChange: (val: boolean) => void;
}

function ToggleRow({ label, description, on, onChange }: ToggleRowProps) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", fontFamily: "var(--font-display)" }}>{label}</div>
        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{description}</div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => onChange(!on)}
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
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Profile fields state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Password fields state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // Toggle states
  const [newInquiryAlerts, setNewInquiryAlerts] = useState(true);
  const [dealerApplicationAlerts, setDealerApplicationAlerts] = useState(true);
  const [lowStockAlerts, setLowStockAlerts] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const fetchSettingsAndProfile = () => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const user = adminAuth.getUser();
    if (!user) {
      setErrorMsg("Failed to authenticate. Please login again.");
      setLoading(false);
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    };

    // Parallel fetch profile details and global settings
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/auth/me`, { headers }),
      fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/settings`)
    ])
      .then(async ([profileRes, settingsRes]) => {
        if (!profileRes.ok || !settingsRes.ok) {
          throw new Error("Could not retrieve setting data from server.");
        }
        const profileData = await profileRes.json();
        const settingsData = await settingsRes.json();

        // Bind profile
        setName(profileData.name || "");
        setEmail(profileData.email || "");
        setPhone(profileData.phone || "");

        // Bind toggles
        setNewInquiryAlerts(settingsData.newInquiryAlerts ?? true);
        setDealerApplicationAlerts(settingsData.dealerApplicationAlerts ?? true);
        setLowStockAlerts(settingsData.lowStockAlerts ?? false);
        setMaintenanceMode(settingsData.maintenanceMode ?? false);
 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching admin settings:", err);
        setErrorMsg("Failed to load settings from server.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSettingsAndProfile();
  }, []);

  const handleSave = async () => {
    setErrorMsg("");
    setSuccessMsg("");
    setErrorMsg("");

    const user = adminAuth.getUser();
    if (!user) {
      const msg = "Not authenticated. Please log in.";
      setErrorMsg(msg);
      alert(msg);
      return;
    }

    // Validation
    if (newPassword && newPassword !== confirmNewPassword) {
      const msg = "Confirm Password must match the New Password.";
      setErrorMsg(msg);
      alert(msg);
      return;
    }

    setSubmitting(true);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    };

    try {
      // 1. Save global settings toggles
      const settingsPayload = {
        newInquiryAlerts,
        dealerApplicationAlerts,
        lowStockAlerts,
        maintenanceMode,
      };

      const settingsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/settings`, {
        method: "PUT",
        headers,
        body: JSON.stringify(settingsPayload),
      });

      if (!settingsRes.ok) {
        const err = await settingsRes.json();
        throw new Error(err.message || "Failed to update global website and notification settings.");
      }

      // 2. Save profile settings
      const profileRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/auth/profile`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ name, email, phone }),
      });

      if (!profileRes.ok) {
        const err = await profileRes.json();
        throw new Error(err.message || "Failed to update profile information.");
      }

      const updatedProfile = await profileRes.json();

      // Refresh adminAuth localStorage storage
      const updatedUser = {
        ...user,
        name: updatedProfile.name,
        email: updatedProfile.email,
        phone: updatedProfile.phone,
      };
      localStorage.setItem("supremo_admin_auth", JSON.stringify(updatedUser));

      // 3. Save password if filled
      if (newPassword) {
        const passwordRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/auth/password`, {
          method: "PUT",
          headers,
          body: JSON.stringify({ currentPassword, newPassword }),
        });

        if (!passwordRes.ok) {
          const err = await passwordRes.json();
          throw new Error(err.message || "Failed to update password settings.");
        }

        // Clear password forms
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      }

      setSuccessMsg("Changes saved successfully!");
      alert("Details are saved successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err: any) {
      const errMsg = err.message || "Something went wrong while saving settings.";
      setErrorMsg(errMsg);
      alert("Error: " + errMsg);
    } finally {
      setSubmitting(false);
    }
  };



  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <AdminHeader title="Settings" breadcrumb={[{ label: "Settings" }]} />
        <main style={{ flex: 1, padding: "28px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", border: "3px solid var(--line)", borderTopColor: "var(--blue-600)", animation: "spin 1s linear infinite" }} />
            <div style={{ fontSize: 13, color: "var(--muted)" }}>Loading admin settings...</div>
          </div>
          <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }` }} />
        </main>
      </div>
    );
  }

  const avatarLetter = (name || "A").charAt(0).toUpperCase();

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader title="Settings" breadcrumb={[{ label: "Settings" }]} />

      <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 24, maxWidth: 760 }}>

        {/* Feedback Banners */}
        {successMsg && (
          <div style={{
            background: "rgba(31, 174, 106, 0.08)",
            border: "1px solid #1FAE6A",
            color: "#167e4d",
            padding: "12px 18px",
            borderRadius: "var(--r-sm)",
            fontSize: 14,
            fontWeight: 600
          }}>
            {successMsg}
          </div>
        )}

        {errorMsg && (
          <div style={{
            background: "rgba(239, 68, 68, 0.08)",
            border: "1px solid #EF4444",
            color: "#b91c1c",
            padding: "12px 18px",
            borderRadius: "var(--r-sm)",
            fontSize: 14,
            fontWeight: 600
          }}>
            {errorMsg}
          </div>
        )}

        {/* Profile */}
        <Section title="Profile" description="Your admin account details">
          <div style={{ display: "flex", alignItems: "center", gap: 16, paddingBottom: 18, borderBottom: "1px solid var(--line-2)" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg, var(--blue-600), var(--blue-400))", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 22, fontWeight: 800, fontFamily: "var(--font-display)", flexShrink: 0 }}>
              {avatarLetter}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: "var(--ink)", fontFamily: "var(--font-display)" }}>{name}</div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>{email}</div>
              <div style={{ marginTop: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: "var(--r-pill)", background: "var(--blue-50)", color: "var(--blue-700)" }}>Super Admin</span>
              </div>
            </div>
          </div>
          <div className="adm-cols-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="field">
              <label>Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="field">
              <label>Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label>Phone Number</label>
            <input type="tel" value={phone} placeholder="+91 00000 00000" onChange={(e) => setPhone(e.target.value)} />
          </div>
        </Section>

        {/* Security */}
        <Section title="Security" description="Manage your password and session settings">
          <div className="adm-cols-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="field">
              <label>Current Password</label>
              <input type="password" value={currentPassword} placeholder="••••••••" onChange={(e) => setCurrentPassword(e.target.value)} />
            </div>
          </div>
          <div className="adm-cols-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="field">
              <label>New Password</label>
              <input type="password" value={newPassword} placeholder="Min. 8 characters" onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div className="field">
              <label>Confirm New Password</label>
              <input type="password" value={confirmNewPassword} placeholder="Repeat new password" onChange={(e) => setConfirmNewPassword(e.target.value)} />
            </div>
          </div>
          <div style={{ background: "var(--paper-2)", borderRadius: "var(--r-sm)", padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>Sessions expire after 8 hours of inactivity.</span>
          </div>
        </Section>

        {/* Website Settings */}
        <Section title="Website Settings" description="Control public-facing website behaviour">
          <ToggleRow label="Maintenance Mode" description="Show a maintenance page to website visitors" on={maintenanceMode} onChange={setMaintenanceMode} />
        </Section>

        {/* Save/Discard Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={handleSave}
            disabled={submitting}
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
              cursor: submitting ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "background .15s",
              boxShadow: "0 4px 12px -4px rgba(20,102,230,.4)",
              opacity: submitting ? 0.8 : 1
            }}
            onMouseEnter={(e) => { if (!submitting) (e.currentTarget as HTMLElement).style.background = "var(--blue-700)"; }}
            onMouseLeave={(e) => { if (!submitting) (e.currentTarget as HTMLElement).style.background = "var(--blue-600)"; }}
          >
            {submitting ? (
              "Saving changes..."
            ) : successMsg ? (
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
            onClick={fetchSettingsAndProfile}
            disabled={submitting}
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
              cursor: submitting ? "not-allowed" : "pointer",
            }}
          >
            Discard
          </button>
        </div>

      </main>
    </div>
  );
}
