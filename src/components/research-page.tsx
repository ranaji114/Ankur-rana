"use client";

import { Reveal } from "@/components/reveal";
import { SiteShell } from "@/components/site-shell";
import { KnowledgeGraph } from "@/components/knowledge-graph";
import { sound } from "@/lib/audio-haptics";
import { researchPapers, researchTopics } from "@/data/content";

export function ResearchPage() {
  return (
    <SiteShell>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Independent Conceptual Inquiries</p>
            <h1 className="page-title mt-5">Research &amp; Foundations.</h1>
            <p className="body-large mt-6" style={{ maxWidth: "680px" }}>
              Two published conceptual papers on Zenodo exploring quantum entanglement and the divergence
              between subjective and physical time — presented honestly as independent research.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Interactive Epistemology Map & Knowledge Graph ── */}
      <section className="section" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="container-page">
          <Reveal>
            <KnowledgeGraph />
          </Reveal>
        </div>
      </section>

      {/* ── Published Papers Showcase ── */}
      <section className="section">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Zenodo Publications</p>
            <h2 className="section-title mt-4" style={{ maxWidth: "640px" }}>
              Original conceptual physics &amp; time papers.
            </h2>
            <p className="body-large mt-5" style={{ maxWidth: "720px" }}>
              These works test the assumptions beneath familiar explanations. The goal is not to claim
              final dogma, but to rigorously map new questions worth asking.
            </p>
          </Reveal>

          <div style={{ display: "grid", gap: "1.5rem", marginTop: "3rem" }}>
            {researchPapers.map((paper, index) => (
              <Reveal key={paper.id} delay={index * 0.06}>
                <article
                  style={{
                    border: "1px solid var(--border)",
                    background: "var(--surface)",
                    padding: "clamp(1.5rem, 3vw, 2.5rem)",
                    borderRadius: "10px",
                  }}
                >
                  <div className="meta-row">
                    <span className="meta-chip">{paper.publication} Open Access</span>
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
                      onClick={() => sound.play("pop")}
                    >
                      Read Full Paper on Zenodo ↗
                    </a>
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontWeight: 700, fontSize: "0.82rem", color: "var(--muted)", textDecoration: "none" }}
                    >
                      DOI &amp; Citation Metadata →
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Research Methodology ── */}
      <section
        className="section"
        style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--surface)" }}
      >
        <div className="container-page split-grid">
          <Reveal>
            <p className="eyebrow">Inquiry Methodology</p>
            <h2 className="section-title mt-4" style={{ maxWidth: "500px" }}>
              What if a foundational assumption is incomplete?
            </h2>
            <p className="body-large mt-5">
              Research begins with a foundational assumption, tests its conceptual boundary, and separates
              mathematical possibility from subjective certainty.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="surface-card" style={{ padding: "1.75rem" }}>
              <p className="detail-title" style={{ marginBottom: "0.75rem" }}>Methodology Principles</p>
              <div style={{ display: "grid", gap: "0.5rem" }}>
                {[
                  "Begin with a foundational postulate",
                  "Test its conceptual boundaries through thought experiments",
                  "Separate emergent properties from fundamental mechanics",
                  "Formulate hypotheses in precise, falsifiable language",
                  "Maintain openness to revision and peer discourse",
                  "Publish openly via Zenodo Open Access",
                ].map((item) => (
                  <p key={item} className="list-line">{item}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Conceptual Fields ── */}
      <section className="section">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Exploratory Fields</p>
            <h2 className="section-title mt-4" style={{ maxWidth: "580px" }}>
              The questions shaping the inquiry.
            </h2>
            <p className="body-large mt-4" style={{ maxWidth: "640px" }}>
              Moving through foundational questions rather than disciplinary silos.
            </p>
          </Reveal>

          <div
            style={{
              display: "grid",
              gap: "1rem",
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

      {/* ── Independent Research Note ── */}
      <section
        className="section"
        style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}
      >
        <div className="container-page">
          <Reveal>
            <div
              style={{
                maxWidth: "680px",
                borderLeft: "3px solid var(--accent)",
                paddingLeft: "1.5rem",
              }}
            >
              <p className="eyebrow" style={{ marginBottom: "0.65rem" }}>
                Note on Independent Conceptual Research
              </p>
              <p className="body-copy">
                The papers on this page are independent conceptual contributions — not the output of an
                academic university laboratory. They are published openly on Zenodo and are presented
                with intellectual honesty as independent inquiries.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
