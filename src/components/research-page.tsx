"use client";

import { Reveal } from "@/components/reveal";
import { SiteShell } from "@/components/site-shell";
import { researchPapers, researchTopics } from "@/data/content";

export function ResearchPage() {
  return (
    <SiteShell>

      {/* ── Hero ── */}
      <section className="page-hero">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Research</p>
            <h1 className="page-title mt-5">Independent Research.</h1>
            <p className="body-large mt-6" style={{ maxWidth: "640px" }}>
              Two published papers on Zenodo exploring quantum entanglement and the subjective
              experience of time — presented honestly as independent conceptual research, not
              institutional academic work.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Papers ── */}
      <section className="section">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Published papers</p>
            <h2 className="section-title mt-4" style={{ maxWidth: "640px" }}>
              Original conceptual investigations.
            </h2>
            <p className="body-large mt-5" style={{ maxWidth: "720px" }}>
              These works are shaped by conceptual inquiry, careful speculation, and an interest
              in the assumptions beneath familiar explanations. The goal is not to claim final
              answers but to expand the space of questions worth asking.
            </p>
          </Reveal>

          <div style={{ display: "grid", gap: "1.5rem", marginTop: "3rem" }}>
            {researchPapers.map((paper, index) => (
              <Reveal key={paper.id} delay={index * 0.06}>
                <article
                  style={{
                    border: "1px solid var(--border)",
                    background: "var(--surface)",
                    padding: "clamp(1.5rem, 3vw, 2.25rem)",
                  }}
                >
                  <div className="meta-row">
                    <span className="meta-chip">{paper.publication}</span>
                    <span className="meta-chip">{paper.type}</span>
                  </div>

                  <h2
                    style={{
                      fontFamily: "var(--font-display), Georgia, serif",
                      fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                      marginTop: "1.25rem",
                      maxWidth: "820px",
                    }}
                  >
                    {paper.title}
                  </h2>

                  <p
                    style={{
                      marginTop: "1rem",
                      fontSize: "1rem",
                      lineHeight: "1.8",
                      color: "var(--muted)",
                      maxWidth: "760px",
                    }}
                  >
                    {paper.summary}
                  </p>

                  <div
                    style={{
                      marginTop: "1.75rem",
                      display: "flex",
                      gap: "0.75rem",
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <a
                      className="button-primary"
                      href={paper.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Read on Zenodo
                    </a>
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontWeight: 700, fontSize: "0.82rem", color: "var(--muted)", textDecoration: "none" }}
                    >
                      DOI / Reference →
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section
        className="section"
        style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--surface)" }}
      >
        <div className="container-page split-grid">
          <Reveal>
            <p className="eyebrow">Research philosophy</p>
            <h2 className="section-title mt-4" style={{ maxWidth: "500px" }}>
              What if a basic assumption is incomplete?
            </h2>
            <p className="body-large mt-5">
              Research begins with a foundational question, tests the conceptual boundary of familiar
              explanations, and separates possibility from certainty. The work is presented in language
              that remains open to revision.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="surface-card" style={{ padding: "1.5rem" }}>
              <p className="detail-title" style={{ marginBottom: "0.75rem" }}>Method</p>
              <div style={{ display: "grid", gap: "0.5rem" }}>
                {[
                  "Begin with a foundational assumption",
                  "Test its conceptual boundary",
                  "Separate possibility from certainty",
                  "Use thought experiments to clarify the question",
                  "Present ideas in language open to revision",
                  "Publish independently via Zenodo",
                ].map((item) => (
                  <p key={item} className="list-line">{item}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Conceptual Fields — no repeated eyebrow ── */}
      <section className="section">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Conceptual fields</p>
            <h2 className="section-title mt-4" style={{ maxWidth: "580px" }}>
              The questions that continue to shape the work.
            </h2>
            <p className="body-large mt-4" style={{ maxWidth: "640px" }}>
              The research moves through foundational questions rather than disciplinary labels —
              keeping the work exploratory, careful, and intellectually honest.
            </p>
          </Reveal>

          <div
            style={{
              display: "grid",
              gap: "1px",
              background: "var(--border)",
              border: "1px solid var(--border)",
              marginTop: "3rem",
            }}
            className="research-grid"
          >
            {researchTopics.map((topic, index) => (
              <Reveal key={topic.title} delay={index * 0.025}>
                <article className="topic-card">
                  <h3 className="topic-card-title">{topic.title}</h3>
                  <p className="topic-card-desc">{topic.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Disclaimer ── */}
      <section
        className="section"
        style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}
      >
        <div className="container-page">
          <Reveal>
            <div
              style={{
                maxWidth: "680px",
                borderLeft: "3px solid var(--border)",
                paddingLeft: "1.5rem",
              }}
            >
              <p className="eyebrow" style={{ marginBottom: "0.65rem" }}>
                A note on independent research
              </p>
              <p className="body-copy">
                The papers on this page are independent conceptual research contributions —
                not the output of an academic institution or peer-reviewed journal. They are
                published openly on Zenodo and are presented accurately as independent work.
                The ideas are speculative and exploratory by design, offered as contributions
                to the space of questions worth asking, not as established fact.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

    </SiteShell>
  );
}
