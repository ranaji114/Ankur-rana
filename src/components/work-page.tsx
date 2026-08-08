"use client";

import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { StatusBadge } from "@/components/status-badge";
import { SiteShell } from "@/components/site-shell";
import { projects } from "@/data/content";

const projectCtas: Record<string, string> = {
  ezra: "Explore Ezra →",
  "shri-krishna-coaching-center": "See the platform →",
  vani: "Explore the system →",
  alfarooq: "View the concept →",
};

export function WorkPage() {
  return (
    <SiteShell>

      <section className="page-hero">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Work</p>
            <h1 className="page-title mt-5">Projects.</h1>
            <p className="body-large mt-6" style={{ maxWidth: "620px" }}>
              Four projects built across programming languages, education, publishing, and the web.
              Each has a case study explaining the thinking, engineering, and story behind it.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div
            className="project-index"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.04}>
                <Link
                  href={`/work/${project.slug}`}
                  style={{ display: "block", textDecoration: "none", color: "inherit" }}
                >
                  <article className="project-row" style={{ paddingInline: "0.5rem" }}>
                    <span className="project-number">{project.number}</span>

                    <div className="project-title-row">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          flexWrap: "wrap",
                        }}
                      >
                        <h2 className="project-index-title">{project.title}</h2>
                        <StatusBadge status={project.status} />
                      </div>
                      <p className="project-tagline">{project.tagline}</p>
                      <div
                        className="project-stack-pills"
                        style={{ marginTop: "0.5rem" }}
                      >
                        {project.stack.map((tech) => (
                          <span key={tech} className="stack-pill">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <span
                      className="project-cta"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {projectCtas[project.slug] ?? "View →"}
                    </span>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* End strip — meaningful action */}
      <div className="work-end-strip">
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
                Want to see how I build?
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <Link className="button-secondary" href="/about">
                  Development workflow →
                </Link>
                <Link className="button-secondary" href="/contact">
                  Get in touch
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

    </SiteShell>
  );
}
