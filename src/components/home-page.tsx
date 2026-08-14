"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SiteShell } from "@/components/site-shell";
import { PortraitCard } from "@/components/portrait-card";
import { BookVaultCard } from "@/components/book-vault-card";
import { BookPreviewModal } from "@/components/book-preview-modal";
import { WorkflowCircuit } from "@/components/workflow-circuit";
import { LiveClock } from "@/components/live-clock";
import { TickerStrip } from "@/components/ticker-strip";
import { Counter } from "@/components/counter";
import { ProjectShowcase } from "@/components/project-showcase";
import { SpotlightCard } from "@/components/spotlight-card";
import { sound } from "@/lib/audio-haptics";
import {
  author,
  books,
  researchPapers,
  Book,
} from "@/data/content";

export function HomePage() {
  const [persona, setPersona] = useState<"unified" | "dev" | "author">("unified");
  const [previewBook, setPreviewBook] = useState<Book | null>(null);

  const latestBook = books.find((b) => b.isLatest) || books[0];

  const handlePersonaChange = (mode: "unified" | "dev" | "author") => {
    sound.play("switch");
    setPersona(mode);
  };

  return (
    <SiteShell>
      {/* Book Quick Preview Modal */}
      <BookPreviewModal book={previewBook} onClose={() => setPreviewBook(null)} />

      {/* ── 1. Hero Section (Cinematic Split Screen) ── */}
      <section className="section" style={{ paddingBottom: "4rem" }}>
        <div className="container-page">
          <div className="hero-split-grid">
            {/* Left Side: Context & Persona Switcher */}
            <Reveal>
              <LiveClock />

              {/* Persona Switcher */}
              <div className="persona-switcher-wrap">
                <button
                  type="button"
                  className={`persona-btn ${persona === "unified" ? "persona-btn-active" : ""}`}
                  onClick={() => handlePersonaChange("unified")}
                >
                  ✦ Unified Identity
                </button>
                <button
                  type="button"
                  className={`persona-btn ${persona === "dev" ? "persona-btn-active" : ""}`}
                  onClick={() => handlePersonaChange("dev")}
                >
                  ⚡ Systems Dev
                </button>
                <button
                  type="button"
                  className={`persona-btn ${persona === "author" ? "persona-btn-active" : ""}`}
                  onClick={() => handlePersonaChange("author")}
                >
                  📖 Author
                </button>
              </div>

              <p className="eyebrow">
                {persona === "dev"
                  ? "RUST · COMPILERS · FULL-STACK SYSTEMS · AI WORKFLOWS"
                  : persona === "author"
                  ? "7 PUBLISHED BOOKS · 2 ZENODO PAPERS · TIME & MIND"
                  : "AI-ASSISTED DEVELOPER · PROGRAMMER · AUTHOR · RESEARCHER"}
              </p>

              <h1 className="display-title mt-4" style={{ maxWidth: "680px" }}>
                {persona === "dev"
                  ? "Compilers, state machines, and building robust systems."
                  : persona === "author"
                  ? "Inquiring into the structural boundaries of reality and mind."
                  : "Software, ideas, and the curiosity to understand how things work."}
              </h1>

              <p className="body-large mt-5" style={{ maxWidth: "560px" }}>
                {persona === "dev"
                  ? "Creator of Ezra (a readable scripting language in Rust) and engineering with AI as an intellectual force multiplier."
                  : persona === "author"
                  ? "Author of 7 published books and independent conceptual research on quantum entanglement and temporal layers."
                  : author.tagline}
              </p>

              <div className="hero-cta-row">
                <Link className="button-primary" href="/work" onClick={() => sound.play("click")}>
                  Explore My Work
                </Link>
                <Link className="button-secondary" href="/books" onClick={() => sound.play("click")}>
                  Books Vault
                </Link>
                <a
                  className="button-secondary"
                  href={author.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.play("click")}
                >
                  GitHub
                </a>
              </div>

              {/* Animated Stat Bar */}
              <div className="stat-bar mt-8">
                {[
                  { label: "Projects Built", value: 5 },
                  { label: "Published Books", value: 7 },
                  { label: "Zenodo Papers", value: 2 },
                ].map((stat) => (
                  <div key={stat.label} className="stat-bar-item">
                    <span className="stat-bar-value">
                      <Counter target={stat.value} />
                    </span>
                    <span className="stat-bar-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Right Side: 3D Portrait Centerpiece */}
            <Reveal delay={0.08}>
              <div style={{ maxWidth: "440px", marginInline: "auto", width: "100%" }}>
                <PortraitCard priority={true} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 2. Infinite Luxury Marquee Ticker ── */}
      <TickerStrip />

      {/* ── 3. Featured Projects & Live Ezra Compiler Playground ── */}
      <section
        className="section"
        style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}
      >
        <div className="container-page">
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <p className="eyebrow">Work &amp; Systems</p>
                <h2 className="section-title mt-3" style={{ maxWidth: "680px" }}>
                  Five production systems across compilers, education, study platforms, and the web.
                </h2>
                <p className="body-large mt-3" style={{ maxWidth: "580px" }}>
                  Each has an in-depth case study explaining the thinking, architecture, and story behind it.
                </p>
              </div>
              <Link className="button-secondary" href="/work" onClick={() => sound.play("click")}>
                All 5 Case Studies →
              </Link>
            </div>
          </Reveal>

          {/* Cinematic Individual Project Showcases */}
          <ProjectShowcase />
        </div>
      </section>

      {/* ── 4. AI Workflow Circuit Stepper ── */}
      <section className="section" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">How I Build</p>
            <h2 className="section-title mt-3" style={{ maxWidth: "640px" }}>
              AI as a development partner, not a replacement for thinking.
            </h2>
            <p className="body-large mt-3" style={{ maxWidth: "620px" }}>
              I use AI for exploration, implementation, debugging, and iteration — while remaining
              responsible for the direction, architecture decisions, and final result.
            </p>
          </Reveal>

          {/* Interactive Circuit Stepper */}
          <Reveal delay={0.06}>
            <WorkflowCircuit />
          </Reveal>
        </div>
      </section>

      {/* ── 5. Latest Release & Books Vault Feature ── */}
      <section
        className="section"
        style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}
      >
        <div className="container-page">
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <p className="eyebrow">Latest Release — July 2026</p>
                <h2 className="section-title mt-3">The newest published title.</h2>
                <p className="body-large mt-3" style={{ maxWidth: "560px" }}>
                  A total of 7 published titles spanning reality, time, attention, relationships, and language.
                </p>
              </div>
              <Link className="button-secondary" href="/books" onClick={() => sound.play("click")}>
                Explore All 7 Books Catalog →
              </Link>
            </div>
          </Reveal>

          {/* Latest Book Detailed Card */}
          <Reveal delay={0.06}>
            <div style={{ marginTop: "2.5rem", maxWidth: "900px" }}>
              <BookVaultCard
                book={latestBook}
                onPreview={(b) => setPreviewBook(b)}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 6. Research Section ── */}
      <section className="section" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container-page">
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <p className="eyebrow">Independent Conceptual Research</p>
                <h2 className="section-title mt-3" style={{ maxWidth: "600px" }}>
                  Two original papers published on Zenodo.
                </h2>
              </div>
              <Link className="button-secondary" href="/research" onClick={() => sound.play("click")}>
                Interactive Epistemology Map →
              </Link>
            </div>
          </Reveal>

          <div className="book-grid mt-10">
            {researchPapers.map((paper, index) => (
              <Reveal key={paper.id} delay={index * 0.04}>
                <SpotlightCard>
                  <article
                    style={{
                      padding: "clamp(1.5rem, 2.5vw, 2.2rem)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      height: "100%",
                      background: "var(--background)",
                    }}
                  >
                    <div className="meta-row">
                      <span className="meta-chip">Zenodo Open Access</span>
                      <span className="meta-chip">{paper.type}</span>
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display), Georgia, serif",
                        fontSize: "clamp(1.35rem, 2vw, 1.75rem)",
                        fontWeight: 700,
                        letterSpacing: "-0.015em",
                        lineHeight: 1.15,
                        flex: 1,
                      }}
                    >
                      {paper.title}
                    </h3>
                    <p className="body-copy">{paper.summary}</p>
                    <div style={{ marginTop: "0.5rem" }}>
                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noreferrer"
                        className="button-primary"
                        style={{ minHeight: "2.5rem", padding: "0.45rem 1rem", fontSize: "0.82rem" }}
                        onClick={() => sound.play("pop")}
                      >
                        Read on Zenodo →
                      </a>
                    </div>
                  </article>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Quote Block ── */}
      <section className="quote-block">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Core Philosophy</p>
            <blockquote className="quote-text mt-6">{author.quote}</blockquote>
            <p className="body-copy mt-5">— {author.name}</p>
          </Reveal>
        </div>
      </section>

      {/* ── 8. Final CTA ── */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container-page">
          <Reveal>
            <div
              className="surface-card"
              style={{ padding: "clamp(1.75rem, 4vw, 3.5rem)", maxWidth: "820px" }}
            >
              <p className="eyebrow">Collaboration &amp; Inquiries</p>
              <h2 className="section-title mt-3" style={{ fontSize: "clamp(1.8rem, 2.6vw, 2.8rem)" }}>
                Let&apos;s build something meaningful.
              </h2>
              <p className="body-large mt-4">
                I&apos;m interested in building software, exploring language runtimes, researching ideas,
                and having thoughtful conversations about how things work. If any of this resonates, let&apos;s connect.
              </p>
              <div style={{ marginTop: "2rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <Link className="button-primary" href="/contact" onClick={() => sound.play("click")}>
                  Send a Message
                </Link>
                <Link className="button-secondary" href="/work" onClick={() => sound.play("click")}>
                  View All Projects
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
