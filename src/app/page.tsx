import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";

export const metadata: Metadata = {
  title: "Ankur Rana — AI-Assisted Developer, Programmer, Author & Researcher",
  description:
    "Building software, exploring ideas, and turning curiosity into working products. Four projects, seven books, and independent research.",
};

export default function Home() {
  return <HomePage />;
}
