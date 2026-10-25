import type { Metadata } from "next";
import { PortfolioHome } from "@/components/portfolio-home";

export const metadata: Metadata = {
  title: "Ankur Rana — AI-Assisted Developer, Programmer, Author & Researcher",
  description:
    "Building software, exploring ideas, and turning curiosity into working products. Five software projects, seven books, and independent research.",
};

export default function Home() {
  return <PortfolioHome />;
}
