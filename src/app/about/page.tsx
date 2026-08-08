import type { Metadata } from "next";
import { AboutPage } from "@/components/about-page";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ankur Rana — AI-assisted developer, programmer, author, and independent researcher based in India. Building software with AI as a development partner.",
};

export default function About() {
  return <AboutPage />;
}
