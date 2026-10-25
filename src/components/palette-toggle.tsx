"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Palette } from "lucide-react";

const STORAGE_KEY = "portfolio-design-mode";
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) === "studio";
}

export function PaletteToggle() {
  const studio = useSyncExternalStore(subscribe, getSnapshot, () => false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) === "studio";
    if (saved) document.documentElement.setAttribute("data-design", "studio");
  }, []);

  function togglePalette() {
    const next = !studio;
    if (next) document.documentElement.setAttribute("data-design", "studio");
    else document.documentElement.removeAttribute("data-design");
    window.localStorage.setItem(STORAGE_KEY, next ? "studio" : "classic");
    listeners.forEach((listener) => listener());
  }

  return (
    <button
      type="button"
      className="palette-toggle-btn"
      onClick={togglePalette}
      aria-label={studio ? "Switch to the original portfolio design" : "Switch to Studio colors"}
      aria-pressed={studio}
      title={studio ? "Switch to original cinematic colors" : "Try the electric lime Studio palette"}
    >
      <Palette size={15} aria-hidden="true" />
      <span>{studio ? "Original" : "Studio"}</span>
    </button>
  );
}
