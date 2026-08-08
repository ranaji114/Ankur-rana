"use client";

import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { StatusBadge } from "@/components/status-badge";
import { SiteShell } from "@/components/site-shell";
import type { Project } from "@/data/content";

type CaseStudyProps = {
  project: Project;
};

// Tabs are used only for projects with 4+ sections (Ezra).
// Shorter projects use stacked prose sections.
const USE_TABS_THRESHOLD = 4;

function TabbedSections({ sections }: { sections: Project["sections"] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const current = sections.find((s) => s.id === active);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Case study sections"
        style={{
          display: "flex",
          gap: 0,
          borderBottom: "1px solid var(--border)",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {sections.map((section) => {
          const isActive = active === section.id;
          return (
            <button
              key={section.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`tab-panel-${section.id}`}
              id={`tab-${section.id}`}
              onClick={() => setActive(section.id)}
              style={{
                padding: "0.7rem 1.15rem",
                fontSize: "0.82rem",
                fontWeight: 600,
                background: "none",
                border: "none",
                borderBottom: isActive ? "2px solid var(--text)" : "2px solid transparent",
                color: isActive ? "var(--text)" : "var(--muted)",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "color 160ms ease, border-color 160ms ease",
                marginBottom: "-1px",
                outline: "none",
              }}
              onFocus={(e) => { e.currentTarget.style.outline = "2px solid var(--accent)"; e.currentTarget.style.outlineOffset = "2px"; }}
              onBlur={(e) => { e.currentTarget.style.outline = "none"; }}
            >
              {section.label}
            </button>
          );
        })}
      </div>

      {current && (
        <div
          id={`tab-panel-${current.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${current.id}`}
          style={{ marginTop: "1.75rem", maxWidth: "760px" }}
        >
          <p className="case-section-stacked-content">{current.content}</p>
        </div>
      )}
    </div>
  );
}

function StackedSections({ sections }: { sections: Project["sections"] }) {
  return (
    <div className="case-sections-stacked">
      {sections.map((section) => (
        <div key={section.id} className="case-section-stacked">
          <p className="case-section-stacked-label">{section.label}</p>
          <p className="case-section-stacked-content">{section.content}</p>
        </div>
      ))}
    </div>
  );
}

export function CaseStudy({ project }: CaseStudyProps) {
  const useTabs = project.sections.length >= USE_TABS_THRESHOLD;
  const isLast = (index: number, arr: unknown[]) => index === arr.length - 1;

  return (
    <SiteShell>

      {/* ── Hero ── */}
      <section className="case-hero">
        <div className="container-page">
          <Reveal>
            <Link href="/work" className="back-link">
              ← All Projects
            </Link>
            <p className="eyebrow">Project {project.number}</p>
            <h1 className="page-title mt-3">{project.title}</h1>
            <p className="body-large mt-5" style={{ maxWidth: "680px" }}>
              {project.tagline}
            </p>

            <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
              <StatusBadge status={project.status} liveUrl={project.liveUrl} asLink />
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  color: "var(--muted)",
                  textDecoration: "none",
                  transition: "color 160ms ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--muted)")}
              >
                GitHub →
              </a>
            </div>
          </Reveal>

          {/* Meta strip */}
          <Reveal delay={0.06}>
            <div className="case-meta-grid">
              <div className="case-meta-item">
                <span className="case-meta-label">Stack</span>
                <span className="case-meta-value">{project.stack.join(" · ")}</span>
              </div>
              <div className="case-meta-item">
                <span className="case-meta-label">Status</span>
                <span className="case-meta-value" style={{ textTransform: "capitalize" }}>
                  {project.status === "archived" ? "Archived / Offline" : "Live"}
                </span>
              </div>
              <div className="case-meta-item">
                <span className="case-meta-label">Repository</span>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="case-meta-value"
                  style={{ color: "var(--accent)", textDecoration: "none" }}
                >
                  github.com →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="case-section">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Overview</p>
            <p
              style={{
                marginTop: "1.25rem",
                fontSize: "clamp(1.05rem, 1.5vw, 1.2rem)",
                lineHeight: "1.8",
                color: "var(--text)",
                maxWidth: "780px",
              }}
            >
              {project.description}
            </p>
          </Reveal>

          {project.highlights.length > 0 && (
            <Reveal delay={0.06}>
              <div className="highlights-list">
                {project.highlights.map((h) => (
                  <div key={h} className="highlight-item">
                    <span className="highlight-marker" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── Architecture (if present) ── */}
      {project.architecture && project.architecture.length > 0 && (
        <section className="case-section" style={{ background: "var(--surface)" }}>
          <div className="container-page">
            <div className="split-grid">
              <Reveal>
                <p className="eyebrow">Architecture</p>
                <h2 className="heading-large mt-4">
                  {project.id === "ezra"
                    ? "From source to execution."
                    : "How the data flows."}
                </h2>
                <p className="body-copy mt-4">
                  {project.id === "ezra"
                    ? "The complete language pipeline — every stage from raw source code to program output."
                    : "The actual data flow from user action to persistence, based on the repository."}
                </p>
              </Reveal>

              <Reveal delay={0.06}>
                <div className="arch-diagram">
                  {project.architecture.map((node, i) => (
                    <div key={node} className="arch-node">
                      <span
                        className={`arch-label${
                          i === 0 || i === project.architecture!.length - 1
                            ? " arch-label-highlight"
                            : ""
                        }`}
                      >
                        {node}
                      </span>
                      {i < project.architecture!.length - 1 && (
                        <span className="arch-arrow">↓</span>
                      )}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ── Features ── */}
      {project.features.length > 0 && (
        <section className="case-section">
          <div className="container-page">
            <Reveal>
              <p className="eyebrow">Features</p>
              <h2 className="heading-large mt-4">What it can do.</h2>
            </Reveal>
            <div className="feature-cards">
              {project.features.map((feature, i) => (
                <Reveal key={feature.title} delay={i * 0.03}>
                  <div className="feature-card-item">
                    <p className="feature-card-title">{feature.title}</p>
                    <p className="feature-card-desc">{feature.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Case Study Sections (adaptive: tabs vs stacked) ── */}
      {project.sections.length > 0 && (
        <section className="case-section" style={{ background: "var(--surface)" }}>
          <div className="container-page">
            <Reveal>
              <p className="eyebrow">Case Study</p>
              <h2 className="heading-large mt-4">The story behind it.</h2>
            </Reveal>

            <Reveal delay={0.04}>
              <div style={{ marginTop: "2rem" }}>
                {useTabs ? (
                  <TabbedSections sections={project.sections} />
                ) : (
                  <StackedSections sections={project.sections} />
                )}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Challenges + Learned ── */}
      <section className="case-section">
        <div className="container-page">
          <div className="split-grid">
            <Reveal>
              <div>
                <p className="eyebrow">Challenges</p>
                <h2 className="heading-large mt-4">What was hard.</h2>
                <div className="highlights-list">
                  {project.challenges.map((c) => (
                    <div key={c} className="highlight-item">
                      <span className="highlight-marker" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div>
                <p className="eyebrow">What I Learned</p>
                <h2 className="heading-large mt-4">What it taught me.</h2>
                <div className="highlights-list">
                  {project.learned.map((l) => (
                    <div key={l} className="highlight-item">
                      <span className="highlight-marker" />
                      <span>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Links ── */}
      <section className={`case-section case-section-last`} style={{ background: "var(--surface)" }}>
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Links</p>
            <h2 className="heading-large mt-4">Project resources.</h2>
          </Reveal>
          <Reveal delay={0.04}>
            <div style={{ marginTop: "1.75rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="button-primary"
                >
                  Visit Live Site
                </a>
              )}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="button-secondary"
              >
                View on GitHub
              </a>
              <Link href="/work" className="button-secondary">
                ← All Projects
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </SiteShell>
  );
}
