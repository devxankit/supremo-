"use client";

import { createContext, useContext, useState, useCallback } from "react";

export type HeroMode = "image" | "video";

type HeroThemeValue = {
  mode: HeroMode;
  setMode: (m: HeroMode) => void;
  toggle: () => void;
};

const HeroThemeContext = createContext<HeroThemeValue | null>(null);

export function HeroThemeProvider({ children }: { children: React.ReactNode }) {
  // In-memory only (resets on reload) — a temporary, session-scoped toggle,
  // which also avoids any SSR hydration flash.
  const [mode, setMode] = useState<HeroMode>("image");

  const toggle = useCallback(() => {
    setMode((m) => (m === "image" ? "video" : "image"));
  }, []);

  return (
    <HeroThemeContext.Provider value={{ mode, setMode, toggle }}>
      {children}
    </HeroThemeContext.Provider>
  );
}

export function useHeroTheme() {
  const ctx = useContext(HeroThemeContext);
  if (!ctx) {
    throw new Error("useHeroTheme must be used within a HeroThemeProvider");
  }
  return ctx;
}
