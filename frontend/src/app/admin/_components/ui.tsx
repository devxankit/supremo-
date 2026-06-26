"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

/* Mobile breakpoint hook — drives the drawer sidebar & hamburger */
export function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);
  return isMobile;
}

/* Lets AdminHeader (a sibling of the sidebar) open the mobile drawer */
export const AdminUIContext = createContext<{ openSidebar: () => void }>({ openSidebar: () => {} });
export const useAdminUI = () => useContext(AdminUIContext);

/* ─────────────────────────────────────────────────────────
   Shared admin UI primitives — keeps content editors lean
   and visually consistent with the existing design system.
───────────────────────────────────────────────────────── */

export function Card({
  children,
  style,
  pad = true,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  pad?: boolean;
}) {
  return (
    <div
      style={{
        background: "var(--paper)",
        borderRadius: "var(--r-md)",
        border: "1px solid var(--line-2)",
        boxShadow: "var(--sh-sm)",
        ...(pad ? { padding: 22 } : {}),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function SectionCard({
  title,
  description,
  right,
  children,
}: {
  title: string;
  description?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div style={{ background: "var(--paper)", borderRadius: "var(--r-md)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-sm)", overflow: "hidden" }}>
      <div style={{ padding: "18px 22px 14px", borderBottom: "1px solid var(--line-2)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, fontFamily: "var(--font-display)", color: "var(--ink)" }}>{title}</div>
          {description && <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 3 }}>{description}</div>}
        </div>
        {right}
      </div>
      <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 16 }}>{children}</div>
    </div>
  );
}

export function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  hint?: string;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, fontFamily: "var(--font-display)" }}>{label}</span>
      <input
        type={type}
        value={value || ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{
          height: 42,
          padding: "0 13px",
          border: "1px solid var(--line)",
          borderRadius: "var(--r-sm)",
          font: "inherit",
          fontSize: 14,
          color: "var(--ink)",
          background: "var(--paper-2)",
          outline: "none",
          transition: "border-color .15s, box-shadow .15s, background .15s",
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "var(--blue-600)"; e.currentTarget.style.background = "#fff"; e.currentTarget.style.boxShadow = "0 0 0 3px var(--blue-100)"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.background = "var(--paper-2)"; e.currentTarget.style.boxShadow = "none"; }}
      />
      {hint && <span style={{ fontSize: 11.5, color: "var(--soft)" }}>{hint}</span>}
    </label>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  hint?: string;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700, fontFamily: "var(--font-display)" }}>{label}</span>
      <textarea
        value={value || ""}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: "10px 13px",
          border: "1px solid var(--line)",
          borderRadius: "var(--r-sm)",
          font: "inherit",
          fontSize: 14,
          lineHeight: 1.6,
          color: "var(--ink)",
          background: "var(--paper-2)",
          outline: "none",
          resize: "vertical",
          transition: "border-color .15s, box-shadow .15s, background .15s",
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "var(--blue-600)"; e.currentTarget.style.background = "#fff"; e.currentTarget.style.boxShadow = "0 0 0 3px var(--blue-100)"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.background = "var(--paper-2)"; e.currentTarget.style.boxShadow = "none"; }}
      />
      {hint && <span style={{ fontSize: 11.5, color: "var(--soft)" }}>{hint}</span>}
    </label>
  );
}

export function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      style={{
        width: 44, height: 24, borderRadius: 999,
        background: on ? "var(--blue-600)" : "var(--line)",
        border: "none", cursor: "pointer", position: "relative", flexShrink: 0, transition: "background .2s",
      }}
    >
      <span style={{ position: "absolute", top: 2, left: on ? 22 : 2, width: 20, height: 20, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", transition: "left .2s" }} />
    </button>
  );
}

export function ToggleRow({ label, description, on, onToggle }: { label: string; description?: string; on: boolean; onToggle: () => void }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", fontFamily: "var(--font-display)" }}>{label}</div>
        {description && <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{description}</div>}
      </div>
      <Toggle on={on} onToggle={onToggle} />
    </div>
  );
}

export function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  style,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md";
  style?: React.CSSProperties;
  type?: "button" | "submit";
}) {
  const base: React.CSSProperties = {
    height: size === "sm" ? 34 : 40,
    padding: size === "sm" ? "0 13px" : "0 18px",
    borderRadius: "var(--r-sm)",
    fontSize: size === "sm" ? 12.5 : 13,
    fontWeight: 600,
    fontFamily: "var(--font-display)",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    whiteSpace: "nowrap",
    transition: "background .15s, border-color .15s, color .15s",
  };
  const variants: Record<string, React.CSSProperties> = {
    primary: { background: "var(--blue-600)", color: "#fff", border: "1px solid var(--blue-600)" },
    outline: { background: "transparent", color: "var(--slate)", border: "1px solid var(--line)" },
    ghost: { background: "var(--paper-2)", color: "var(--slate)", border: "1px solid transparent" },
    danger: { background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" },
  };
  return (
    <button type={type} onClick={onClick} style={{ ...base, ...variants[variant], ...style }}>
      {children}
    </button>
  );
}

export function Badge({ children, color = "blue" }: { children: React.ReactNode; color?: "blue" | "green" | "amber" | "red" | "gray" }) {
  const map: Record<string, { bg: string; color: string }> = {
    blue: { bg: "var(--blue-50)", color: "var(--blue-700)" },
    green: { bg: "#f0fdf4", color: "#15803d" },
    amber: { bg: "#fffbeb", color: "#b45309" },
    red: { bg: "#fef2f2", color: "#dc2626" },
    gray: { bg: "var(--paper-2)", color: "var(--muted)" },
  };
  const c = map[color];
  return (
    <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: "var(--r-pill)", background: c.bg, color: c.color, fontFamily: "var(--font-display)", whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

/** Tiny toast-style "Saved" confirmation hook */
export function useSavedFlash() {
  const [saved, setSaved] = useState(false);
  function flash() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }
  return { saved, flash };
}

export function SaveBar({ onSave, onReset, saved }: { onSave: () => void; onReset?: () => void; saved: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, position: "sticky", bottom: 0, padding: "14px 0" }}>
      <Button onClick={onSave} style={{ height: 44, padding: "0 26px", fontSize: 14, boxShadow: "0 4px 12px -4px rgba(20,102,230,.4)" }}>
        {saved ? (
          <>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
            Saved!
          </>
        ) : (
          <>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
            Save Changes
          </>
        )}
      </Button>
      {onReset && (
        <Button variant="outline" onClick={onReset} style={{ height: 44, padding: "0 20px", fontSize: 14 }}>
          Discard
        </Button>
      )}
      {saved && <span style={{ fontSize: 12.5, color: "var(--ok)", fontWeight: 600 }}>Changes published to the live site.</span>}
    </div>
  );
}
