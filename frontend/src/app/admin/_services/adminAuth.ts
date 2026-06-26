const AUTH_KEY = "supremo_admin_auth";

export const adminAuth = {
  async login(email: string, password: string): Promise<boolean> {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        return false;
      }

      const data = await res.json();
      localStorage.setItem(
        AUTH_KEY,
        JSON.stringify({
          email: data.email,
          name: data.name,
          phone: data.phone,
          token: data.token,
          loggedInAt: Date.now(),
        })
      );
      return true;
    } catch (error) {
      console.error("Login request failed:", error);
      return false;
    }
  },

  logout(): void {
    localStorage.removeItem(AUTH_KEY);
  },

  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return false;
    try {
      const data = JSON.parse(raw);
      // Session expires after 8 hours
      return !!data.token && (Date.now() - data.loggedInAt < 8 * 60 * 60 * 1000);
    } catch {
      return false;
    }
  },

  getUser(): { email: string; name?: string; phone?: string; token?: string } | null {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
};

