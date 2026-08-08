import type { Metadata } from "next";
import { WorkPage } from "@/components/work-page";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects by Ankur Rana — a programming language built in Rust, a full-stack coaching platform, a publishing app, and a school website.",
};

export default function Work() {
  return <WorkPage />;
}
