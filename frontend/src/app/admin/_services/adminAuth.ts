const AUTH_KEY = "supremo_admin_auth";

const ADMIN_CREDENTIALS = {
  email: "admin@supremo.com",
  password: "admin@123",
};

export const adminAuth = {
  login(email: string, password: string): boolean {
    if (
      email.toLowerCase() === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password
    ) {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ email, loggedInAt: Date.now() }));
      return true;
    }
    return false;
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
      return Date.now() - data.loggedInAt < 8 * 60 * 60 * 1000;
    } catch {
      return false;
    }
  },

  getUser(): { email: string } | null {
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
