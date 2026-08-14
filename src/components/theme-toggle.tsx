"use client";

import { useSyncExternalStore } from "react";
import { sound } from "@/lib/audio-haptics";
import { themeManager } from "@/lib/theme";

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    (callback) => themeManager.subscribe(callback),
    () => themeManager.getTheme(),
    () => "pearl"
  );

  const toggleTheme = () => {
    themeManager.toggleTheme();
    sound.play("switch");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle-btn"
      aria-label={`Switch to ${theme === "pearl" ? "Obsidian Dark" : "Pearl Light"} theme`}
      title={`Switch to ${theme === "pearl" ? "Obsidian Dark" : "Pearl Light"} theme`}
    >
      <span className="theme-toggle-icon">
        {theme === "pearl" ? (
          /* Moon icon for switching to dark */
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        ) : (
          /* Sun icon for switching to light */
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        )}
      </span>
      <span className="theme-toggle-label">{theme === "pearl" ? "Obsidian" : "Pearl"}</span>
    </button>
  );
}
