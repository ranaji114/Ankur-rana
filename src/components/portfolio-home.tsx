"use client";

import { useSyncExternalStore } from "react";
import { HomePage } from "@/components/home-page";
import { PortfolioTree } from "@/components/portfolio-tree";
import { getPortfolioExperience, subscribePortfolioExperience } from "@/lib/portfolio-experience";

export function PortfolioHome() {
  const mode = useSyncExternalStore(subscribePortfolioExperience, getPortfolioExperience, () => "classic");
  return mode === "tree" ? <PortfolioTree /> : <HomePage />;
}
