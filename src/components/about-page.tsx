"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SiteShell } from "@/components/site-shell";
import {
  author,
  publicationTimeline,
  researchTopics,
  skillCategories,
  aiWorkflowSteps,
} from "@/data/content";

export function AboutPage() {
  return (
    <SiteShell>

      {/* ── Hero ── */}
      <section className="page-hero">
        <div className="container-page split-grid">
          <Reveal>
            <p className="eyebrow">About</p>
            <h1 className="page-title mt-5">
              I like building things I don&apos;t fully understand yet.
            </h1>
            <p className="body-large mt-6">{author.longBio}</p>
            <div className="about-cta-row">
              <Link className="button-primary" href="/work">
                View My Work
              </Link>
              <a
                className="button-secondary"
                href={author.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="portrait-frame">
              <Image
                src={author.portrait}
                alt={`${author.name} portrait`}
                width={640}
                height={760}
                className="portrait-image"
                priority
                sizes="(max-width: 920px) 100vw, 520px"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Skills & Technologies ── */}
      <section className="section" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Skills &amp; Technologies</p>
            <h2 className="section-title mt-4">Technologies I&apos;ve worked with.</h2>
            <p className="body-large mt-4" style={{ maxWidth: "620px" }}>
              Based on projects actually built and tools actually used — not a wishlist.
              No proficiency bars. No invented claims.
            </p>
          </Reveal>
          <div className="skills-grid">
            {skillCategories.map((group, i) => (
              <Reveal key={group.label} delay={i * 0.04}>
                <div className="skill-group">
                  <p className="skill-group-label">{group.label}</p>
                  <div className="skill-pills">
                    {group.skills.map((skill) => (
                      <span key={skill} className="skill-pill">{skill}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Development Identity & AI Workflow ── */}
      <section
        className="section"
        style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}
      >
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">As a developer</p>
            <h2 className="section-title mt-4" style={{ maxWidth: "640px" }}>
              Building software with AI as a partner.
            </h2>
            <p className="body-large mt-5" style={{ maxWidth: "680px" }}>
              {author.devBio}
            </p>
            <blockquote className="pull-quote mt-6" style={{ maxWidth: "520px" }}>
              &ldquo;{author.devQuote}&rdquo;
            </blockquote>
          </Reveal>

          {/* Full 9-step workflow */}
          <Reveal delay={0.06}>
            <div style={{ marginTop: "2.5rem", maxWidth: "680px" }}>
              <div className="workflow-steps">
                {aiWorkflowSteps.map((step) => (
                  <div key={step.step} className="workflow-step">
                    <div className="workflow-step-num">{step.step}</div>
                    <div className="workflow-step-body">
                      <div className="workflow-step-label">{step.label}</div>
                      <div className="workflow-step-desc">{step.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              style={{
                marginTop: "2rem",
                display: "grid",
                gap: "1rem",
                maxWidth: "680px",
              }}
            >
              <div
                className="surface-card"
                style={{ padding: "1.25rem" }}
              >
                <p className="detail-title" style={{ marginBottom: "0.75rem" }}>AI helps me with</p>
                <div style={{ display: "grid", gap: "0.5rem" }}>
                  {["Exploration & research", "Implementation & iteration", "Debugging & root-cause analysis", "Refactoring & code quality", "Documentation"].map((item) => (
                    <p key={item} className="list-line">{item}</p>
                  ))}
                </div>
              </div>
              <div
                className="surface-card"
                style={{ padding: "1.25rem" }}
              >
                <p className="detail-title" style={{ marginBottom: "0.75rem" }}>I remain responsible for</p>
                <div style={{ display: "grid", gap: "0.5rem" }}>
                  {["Product direction & requirements", "Architecture & system design", "Testing & quality assurance", "Final implementation decisions", "Understanding & owning the result"].map((item) => (
                    <p key={item} className="list-line">{item}</p>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── As a writer ── */}
      <section
        className="section"
        style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}
      >
        <div className="container-page split-grid">
          <Reveal>
            <p className="eyebrow">As a writer</p>
            <h2 className="section-title mt-4">Books and research written in human language.</h2>
            <p className="body-large mt-5">{author.philosophy}</p>
            <div className="about-cta-row">
              <Link className="button-secondary" href="/books">View books</Link>
              <Link className="button-secondary" href="/research">Research papers</Link>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="surface-card" style={{ padding: "1.5rem" }}>
              <p className="detail-title" style={{ marginBottom: "0.75rem" }}>Intellectual interests</p>
              <div style={{ display: "grid", gap: "0.5rem" }}>
                {researchTopics.map((topic) => (
                  <p key={topic.title} className="list-line">{topic.title}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Publication Timeline ── */}
      <section className="section" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Publication timeline</p>
            <h2 className="section-title mt-4" style={{ maxWidth: "640px" }}>
              Books and research spanning mind, time, attention, language, relationships, and poetry.
            </h2>
          </Reveal>
          <div className="timeline mt-12">
            {publicationTimeline.map((item) => (
              <Reveal key={`${item.year}-${item.title}`}>
                <article className="timeline-item">
                  <p className="eyebrow">{item.year}</p>
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display), Georgia, serif",
                        fontSize: "clamp(1.4rem, 2vw, 1.85rem)",
                        fontWeight: 700,
                        lineHeight: 1.15,
                        letterSpacing: "-0.015em",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p className="body-copy mt-2">{item.note}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="quote-block">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">In his own words</p>
            <blockquote className="quote-text mt-6">{author.quote}</blockquote>
          </Reveal>
        </div>
      </section>

      {/* ── End CTA ── */}
      <div className="work-end-strip" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container-page">
          <Reveal>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <p style={{ color: "var(--muted)", fontSize: "0.9rem", fontWeight: 500 }}>
                Explore the work
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <Link className="button-secondary" href="/work">Projects</Link>
                <Link className="button-secondary" href="/books">Books</Link>
                <Link className="button-secondary" href="/contact">Contact</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

    </SiteShell>
  );
}
