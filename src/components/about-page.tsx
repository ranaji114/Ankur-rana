"use client";

import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SiteShell } from "@/components/site-shell";
import { PortraitCard } from "@/components/portrait-card";
import { WorkflowCircuit } from "@/components/workflow-circuit";
import { sound } from "@/lib/audio-haptics";
import {
  author,
  publicationTimeline,
  researchTopics,
  skillCategories,
} from "@/data/content";

export function AboutPage() {
  return (
    <SiteShell>
      {/* ── Page Hero with 3D Portrait ── */}
      <section className="page-hero">
        <div className="container-page split-grid">
          <Reveal>
            <p className="eyebrow">My Story &amp; Philosophy</p>
            <h1 className="page-title mt-5">
              I like building things I don&apos;t fully understand yet.
            </h1>
            <p className="body-large mt-6">{author.longBio}</p>
            <div className="about-cta-row">
              <Link className="button-primary" href="/work" onClick={() => sound.play("click")}>
                Explore My Work
              </Link>
              <a
                className="button-secondary"
                href={author.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.play("click")}
              >
                My GitHub Profile
              </a>
            </div>
          </Reveal>

          {/* 3D Glassmorphic Portrait Frame with Live Badges & Signature */}
          <Reveal delay={0.08}>
            <PortraitCard priority={true} />
          </Reveal>
        </div>
      </section>

      {/* ── Skills & Technologies ── */}
      <section className="section" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Engineering Stack</p>
            <h2 className="section-title mt-4">Technologies I build with.</h2>
            <p className="body-large mt-4" style={{ maxWidth: "620px" }}>
              These are tools and systems I have actually built with from first principles — no inflated claims.
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

      {/* ── Development Identity & Interactive AI Workflow ── */}
      <section
        className="section"
        style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}
      >
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">How I Work with AI</p>
            <h2 className="section-title mt-4" style={{ maxWidth: "640px" }}>
              AI as an engineering partner, not a replacement for my thinking.
            </h2>
            <p className="body-large mt-5" style={{ maxWidth: "680px" }}>
              {author.devBio}
            </p>
            <blockquote className="pull-quote mt-6" style={{ maxWidth: "560px" }}>
              &ldquo;{author.devQuote}&rdquo;
            </blockquote>
          </Reveal>

          {/* 9-Step Interactive Workflow Circuit */}
          <Reveal delay={0.06}>
            <div style={{ marginTop: "2rem" }}>
              <WorkflowCircuit />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Literary & Conceptual Work ── */}
      <section
        className="section"
        style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}
      >
        <div className="container-page split-grid">
          <Reveal>
            <p className="eyebrow">My Books &amp; Inquiries</p>
            <h2 className="section-title mt-4">Writing in clear, human language.</h2>
            <p className="body-large mt-5">{author.philosophy}</p>
            <div className="about-cta-row">
              <Link className="button-secondary" href="/books" onClick={() => sound.play("click")}>View My 7 Books</Link>
              <Link className="button-secondary" href="/research" onClick={() => sound.play("click")}>My Zenodo Papers</Link>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="surface-card" style={{ padding: "1.75rem" }}>
              <p className="detail-title" style={{ marginBottom: "0.75rem" }}>Questions I Explore</p>
              <div style={{ display: "grid", gap: "0.5rem" }}>
                {researchTopics.map((topic) => (
                  <p key={topic.title} className="list-line"><b>{topic.title}</b> — {topic.description}</p>
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
            <p className="eyebrow">My Publication Journey</p>
            <h2 className="section-title mt-4" style={{ maxWidth: "640px" }}>
              Works spanning mind, time, attention, language, relationships, and poetry.
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

      {/* ── Personal Quote Block ── */}
      <section className="quote-block">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">My Core Conviction</p>
            <blockquote className="quote-text mt-6">{author.quote}</blockquote>
            <p className="body-copy mt-4" style={{ fontWeight: 600 }}>— Ankur Rana</p>
          </Reveal>
        </div>
      </section>

      {/* ── End Strip ── */}
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
                Want to collaborate or discuss an idea?
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <Link className="button-secondary" href="/work" onClick={() => sound.play("click")}>My Projects</Link>
                <Link className="button-secondary" href="/books" onClick={() => sound.play("click")}>My Books</Link>
                <Link className="button-primary" href="/contact" onClick={() => sound.play("click")}>Send Me a Message</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </SiteShell>
  );
}
