"use client";

// Clean theme state manager with subscriber pattern for React 19
type Theme = "pearl" | "obsidian";
type Listener = (theme: Theme) => void;

class ThemeManager {
  private current: Theme = "pearl";
  private listeners: Set<Listener> = new Set();
  private initialized: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.init();
    }
  }

  private init() {
    if (this.initialized) return;
    this.initialized = true;
    const saved = localStorage.getItem("theme_preference") as Theme | null;
    const initial = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "obsidian" : "pearl");
    this.current = initial;
    document.documentElement.dataset.theme = initial;
  }

  public getTheme(): Theme {
    if (typeof window !== "undefined" && !this.initialized) {
      this.init();
    }
    return this.current;
  }

  public setTheme(next: Theme) {
    this.current = next;
    if (typeof window !== "undefined") {
      document.documentElement.dataset.theme = next;
      localStorage.setItem("theme_preference", next);
    }
    this.listeners.forEach((fn) => fn(next));
  }

  public toggleTheme(): Theme {
    const next = this.current === "pearl" ? "obsidian" : "pearl";
    this.setTheme(next);
    return next;
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

export const themeManager = typeof window !== "undefined" ? new ThemeManager() : {
  getTheme: () => "pearl" as Theme,
  setTheme: () => {},
  toggleTheme: () => "pearl" as Theme,
  subscribe: () => () => {},
};
