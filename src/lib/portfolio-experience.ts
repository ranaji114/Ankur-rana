export type PortfolioExperienceMode = "classic" | "tree";

const STORAGE_KEY = "portfolio-experience-mode";
const listeners = new Set<() => void>();

export function subscribePortfolioExperience(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getPortfolioExperience(): PortfolioExperienceMode {
  return window.localStorage.getItem(STORAGE_KEY) === "tree" ? "tree" : "classic";
}

export function setPortfolioExperience(mode: PortfolioExperienceMode) {
  window.localStorage.setItem(STORAGE_KEY, mode);
  listeners.forEach((listener) => listener());
}
