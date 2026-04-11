"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  createElement,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
}

// @ts-expect-error — populated by provider
const ThemeContext = createContext<ThemeContextType>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  // On mount: read localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem("spownext-theme") as Theme | null;
    if (stored === "light" || stored === "dark") {
      apply(stored);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      apply(prefersDark ? "dark" : "light");
    }
  }, []);

  function apply(t: Theme) {
    setThemeState(t);
    const root = document.documentElement;
    if (t === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("spownext-theme", t);
  }

  function toggle() {
    apply(theme === "light" ? "dark" : "light");
  }

  function setTheme(t: Theme) {
    apply(t);
  }

  return createElement(ThemeContext.Provider, { value: { theme, toggle, setTheme } }, children);
}

export function useTheme() {
  return useContext(ThemeContext);
}
