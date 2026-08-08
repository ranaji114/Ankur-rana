"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { StatusBadge } from "@/components/status-badge";
import { SiteShell } from "@/components/site-shell";
import {
  author,
  books,
  projects,
  researchPapers,
} from "@/data/content";

const projectCtas: Record<string, string> = {
  ezra: "Explore Ezra →",
  "shri-krishna-coaching-center": "See the platform →",
  vani: "Explore the system →",
  alfarooq: "View the concept →",
};

function BookCoverImage({ book }: { book: typeof books[number] }) {
  return (
    <div style={{ position: "relative" }}>
      <Image
        src={book.cover}
        alt={`${book.title} cover`}
        width={420}
        height={630}
        className="book-cover"
        sizes="(max-width: 720px) 52vw, 190px"
      />
    </div>
  );
}

export function HomePage() {
  const latestBook = books.find((b) => b.isLatest);
  const featuredProjects = projects.slice(0, 4);

  return (
    <SiteShell>

      {/* ── 1. Hero ── */}
      <section className="section" style={{ paddingBottom: "3.5rem" }}>
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">AI-ASSISTED DEVELOPER · PROGRAMMER · AUTHOR · RESEARCHER</p>
            <h1 className="display-title mt-5" style={{ maxWidth: "800px" }}>
              Software, ideas, and the curiosity to understand how things work.
            </h1>
            <p className="body-large mt-5" style={{ maxWidth: "580px" }}>
              {author.tagline}
            </p>
            <div className="hero-cta-row">
              <Link className="button-primary" href="/work">
                Explore My Work
              </Link>
              <a
                className="button-secondary"
                href={author.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <Link className="button-secondary" href="/contact">
                Let&apos;s Talk
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="stat-bar">
              {[
                { label: "Projects", value: "4" },
                { label: "Published Books", value: "7" },
                { label: "Research Papers", value: "2" },
              ].map((stat) => (
                <div key={stat.label} className="stat-bar-item">
                  <span className="stat-bar-value">{stat.value}</span>
                  <span className="stat-bar-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 2. Featured Projects ── */}
      <section className="section" style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Work</p>
            <h2 className="section-title mt-4" style={{ maxWidth: "680px" }}>
              Four projects across languages, education, publishing, and the web.
            </h2>
            <p className="body-large mt-4" style={{ maxWidth: "560px" }}>
              Each has a case study explaining the thinking, engineering, and story behind it.
            </p>
          </Reveal>

          <div className="project-card-grid">
            {featuredProjects.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.04}>
                <Link
                  href={`/work/${project.slug}`}
                  className="project-card"
                  style={{ height: "100%" }}
                >
                  <div>
                    <span className="project-card-number">{project.number}</span>
                    <div style={{ marginTop: "0.5rem", marginBottom: "0.25rem" }}>
                      <StatusBadge status={project.status} />
                    </div>
                  </div>
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-desc">{project.tagline}</p>
                  <div className="project-card-footer">
                    <div className="project-stack-pills">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span key={tech} className="stack-pill">{tech}</span>
                      ))}
                      {project.stack.length > 3 && (
                        <span className="stack-pill">+{project.stack.length - 3}</span>
                      )}
                    </div>
                    <span className="project-cta">
                      {projectCtas[project.slug] ?? "View →"}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div style={{ marginTop: "2rem" }}>
              <Link className="button-secondary" href="/work">
                All projects →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. About / Identity ── */}
      <section className="section" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container-page split-grid">
          <Reveal>
            <p className="eyebrow">About</p>
            <h2 className="section-title mt-4">
              Developer, author, and independent researcher.
            </h2>
            <p className="body-large mt-5">{author.longBio}</p>
            <div className="about-cta-row">
              <Link className="button-secondary" href="/about">
                More about me
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
                sizes="(max-width: 920px) 100vw, 520px"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 4. AI Workflow — condensed ── */}
      <section className="section" style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">How I Build</p>
            <h2 className="section-title mt-4" style={{ maxWidth: "640px" }}>
              AI as a development partner, not a replacement.
            </h2>
            <p className="body-large mt-5" style={{ maxWidth: "620px" }}>
              I use AI for exploration, implementation, debugging, and iteration — while remaining
              responsible for the direction, architecture decisions, and final result.
            </p>
            <blockquote className="pull-quote mt-6" style={{ maxWidth: "540px" }}>
              &ldquo;{author.devQuote}&rdquo;
            </blockquote>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="workflow-inline">
              {["Idea", "Requirements", "Architecture", "Build", "Test", "Iterate", "Deploy"].map(
                (label, i, arr) => (
                  <span key={label} className="workflow-inline-step">
                    <span className="workflow-inline-label">{label}</span>
                    {i < arr.length - 1 && (
                      <span className="workflow-inline-arrow">→</span>
                    )}
                  </span>
                )
              )}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div style={{ marginTop: "2rem" }}>
              <Link className="button-secondary" href="/about">
                See how I work →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 5. Latest Book ── */}
      {latestBook && (
        <section className="section" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="container-page">
            <Reveal>
              <p className="eyebrow">Latest Release — July 2026</p>
              <h2 className="section-title mt-4">New book.</h2>
            </Reveal>
            <Reveal delay={0.06}>
              <article className="book-card" style={{ marginTop: "2rem", maxWidth: "860px" }}>
                <div className="book-cover-wrap">
                  <span className="latest-badge" style={{ display: "block", marginBottom: "0.6rem" }}>
                    Latest Release
                  </span>
                  <BookCoverImage book={latestBook} />
                </div>
                <div>
                  <div className="meta-row">
                    <span className="meta-chip">{latestBook.category}</span>
                    {latestBook.pages && (
                      <span className="meta-chip">{latestBook.pages} pages</span>
                    )}
                    {latestBook.language && (
                      <span className="meta-chip">{latestBook.language}</span>
                    )}
                  </div>
                  <h3 className="book-title mt-4">{latestBook.title}</h3>
                  <p className="book-subtitle mt-2">{latestBook.subtitle}</p>
                  <p className="body-copy mt-4">{latestBook.hook}</p>
                  <div className="mt-6" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    <a
                      className="button-primary"
                      href={latestBook.amazonUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Read on Amazon →
                    </a>
                    <Link className="button-secondary" href="/books">
                      All seven books
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── 6. Research ── */}
      <section className="section" style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Research</p>
            <h2 className="section-title mt-4" style={{ maxWidth: "600px" }}>
              Two independent papers on Zenodo.
            </h2>
          </Reveal>
          <div className="book-grid mt-10">
            {researchPapers.map((paper, index) => (
              <Reveal key={paper.id} delay={index * 0.04}>
                <article
                  style={{
                    border: "1px solid var(--border)",
                    background: "var(--background)",
                    padding: "clamp(1.25rem, 2.5vw, 2rem)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    height: "100%",
                  }}
                >
                  <div className="meta-row">
                    <span className="meta-chip">{paper.type}</span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display), Georgia, serif",
                      fontSize: "clamp(1.25rem, 2vw, 1.6rem)",
                      fontWeight: 700,
                      letterSpacing: "-0.015em",
                      lineHeight: 1.15,
                      flex: 1,
                    }}
                  >
                    {paper.title}
                  </h3>
                  <p className="body-copy">{paper.summary}</p>
                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--accent)", textDecoration: "none" }}
                  >
                    Read on Zenodo →
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.06}>
            <div style={{ marginTop: "2rem" }}>
              <Link className="button-secondary" href="/research">
                Research page →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 7. Quote ── */}
      <section className="quote-block">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">In his own words</p>
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
              style={{ padding: "clamp(1.75rem, 4vw, 3rem)", maxWidth: "760px" }}
            >
              <p className="eyebrow">Contact</p>
              <h2 className="section-title mt-4" style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.6rem)" }}>
                Get in touch.
              </h2>
              <p className="body-large mt-4">
                I&apos;m interested in building software, exploring language systems, researching ideas,
                and having thoughtful conversations about how things work. If any of this resonates, write to me.
              </p>
              <div style={{ marginTop: "1.75rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <Link className="button-primary" href="/contact">
                  Get in touch
                </Link>
                <Link className="button-secondary" href="/work">
                  View my work
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </SiteShell>
  );
}
