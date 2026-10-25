import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Mic2, Sparkles } from "lucide-react";
import { PortfolioAssistant } from "@/components/portfolio-assistant";
import { SiteShell } from "@/components/site-shell";

import "./ai-guide.css";

export const metadata: Metadata = {
  title: "AI Guide",
  description: "Talk with Ankur Rana’s AI portfolio guide about his projects, books, research, and work.",
};

export default function AIGuidePage() {
  return (
    <SiteShell>
    <div className="ai-guide-page">
      <section className="ai-guide-intro container-page">
        <div className="ai-guide-intro-copy">
          <span className="ai-guide-eyebrow"><Sparkles size={14} /> A CONVERSATION WITH ANKUR</span>
          <h1>Curious about<br /><em>what I do?</em></h1>
          <p>Ask me about the things I build, research, write, and believe in.</p>
          <div className="ai-guide-intro-actions">
            <a className="ai-guide-start-link" href="#conversation"><Mic2 size={17} /> Let&apos;s talk <ArrowDown size={15} /></a>
            <Link href="/about" className="ai-guide-about-link">Meet Ankur <ArrowUpRight size={15} /></Link>
          </div>
        </div>
        <div className="ai-guide-live-stage" id="conversation">
          <PortfolioAssistant mode="page" />
        </div>
      </section>
    </div>
    </SiteShell>
  );
}
