"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "./_components/AdminSidebar";
import { AdminUIContext } from "./_components/ui";
import { adminAuth } from "./_services/adminAuth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLoginPage = pathname === "/admin/login";

  // Close the mobile drawer whenever the route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isLoginPage && !adminAuth.isAuthenticated()) {
      router.replace("/admin/login");
    } else {
      setChecked(true);
    }
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!checked) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--paper-2)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "3px solid var(--line)",
              borderTopColor: "var(--blue-600)",
              animation: "spin .7s linear infinite",
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <span style={{ color: "var(--muted)", fontSize: 13 }}>Loading admin panel…</span>
        </div>
      </div>
    );
  }

  return (
    <AdminUIContext.Provider value={{ openSidebar: () => setMobileOpen(true) }}>
      <div style={{ display: "flex", minHeight: "100vh", background: "#EEF2F8", alignItems: "flex-start" }}>
        <AdminSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <div className="admin-content" style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          {children}
        </div>
      </div>
    </AdminUIContext.Provider>
  );
}
