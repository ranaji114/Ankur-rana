"use client";

import { useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Network } from "lucide-react";
import { getPortfolioExperience, setPortfolioExperience, subscribePortfolioExperience } from "@/lib/portfolio-experience";

export function ExperienceToggle() {
  const mode = useSyncExternalStore(subscribePortfolioExperience, getPortfolioExperience, () => "classic");
  const pathname = usePathname();
  const router = useRouter();
  const isTree = mode === "tree";

  function toggle() {
    const next = isTree ? "classic" : "tree";
    setPortfolioExperience(next);
    if (pathname !== "/") router.push("/");
  }

  return (
    <button
      className="experience-toggle-btn"
      type="button"
      onClick={toggle}
      aria-pressed={isTree}
      aria-label={isTree ? "Switch to the classic portfolio" : "Explore the portfolio as an interactive tree"}
      title={isTree ? "Switch to the classic portfolio" : "Try the interactive portfolio tree"}
    >
      <Network size={15} aria-hidden="true" />
      <span>{isTree ? "Classic" : "Tree"}</span>
    </button>
  );
}
