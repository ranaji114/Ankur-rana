import type { Metadata } from "next";
import { ResearchPage } from "@/components/research-page";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Independent research by Ankur Rana — two papers on quantum entanglement and the nature of time, published on Zenodo.",
};

export default function Research() {
  return <ResearchPage />;
}
