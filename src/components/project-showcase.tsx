"use client";

import Link from "next/link";
import { Project, projects } from "@/data/content";
import { StatusBadge } from "@/components/status-badge";
import { EzraPlayground } from "@/components/ezra-playground";
import { sound } from "@/lib/audio-haptics";

function ProjectVisualPreview({ project }: { project: Project }) {
  // 01 Ezra
  if (project.id === "ezra") {
    return (
      <div className="showcase-visual-box">
        <EzraPlayground />
      </div>
    );
  }

  // 02 Shri Krishna Coaching Center
  if (project.id === "shri-krishna") {
    return (
      <div className="showcase-visual-card">
        <div className="mockup-topbar">
          <div className="mockup-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <span className="mockup-url">shri-krishna-coaching-center.vercel.app</span>
        </div>

        <div className="mockup-inner">
          <div className="mockup-header-badge" style={{ background: "rgba(196, 138, 42, 0.15)", color: "#eab308" }}>
            <span className="live-pulse-dot" />
            <span>Next.js 16.2 · React 19 · Supabase Cloud · Kadipur, UP</span>
          </div>

          <h4 className="mockup-title">Shri Krishna Coaching Center Platform</h4>
          <p className="mockup-desc">
            Production full-stack educational application for Classes 6th–12th (Physics, Chemistry, Math, Biology, English). Built with multi-step digital student admissions, faculty spotlight (Krishna Sir &amp; Priyanshu Singh Sir), interactive Google Maps coordinate navigation, and a secure double-field authenticated management portal (/admin) backed by Supabase.
          </p>

          <div className="mockup-metrics-grid">
            <div className="mockup-metric">
              <span className="metric-val" style={{ color: "#eab308" }}>Class 6–12</span>
              <span className="metric-lbl">Tuition Curriculum</span>
            </div>
            <div className="mockup-metric">
              <span className="metric-val">Supabase</span>
              <span className="metric-lbl">Cloud DB &amp; Storage</span>
            </div>
            <div className="mockup-metric">
              <span className="metric-val">/admin</span>
              <span className="metric-lbl">SHA-256 Auth Portal</span>
            </div>
          </div>

          <div className="mockup-cta-row">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="button-primary"
                style={{ fontSize: "0.82rem", minHeight: "2.4rem", padding: "0.4rem 1rem" }}
                onClick={() => sound.play("pop")}
              >
                Launch Live Site ↗
              </a>
            )}
            <a
              href="https://wa.me/916389647711"
              target="_blank"
              rel="noreferrer"
              className="button-secondary"
              style={{ fontSize: "0.82rem", minHeight: "2.4rem", padding: "0.4rem 1rem" }}
              onClick={() => sound.play("click")}
            >
              💬 WhatsApp (+91 6389647711) ↗
            </a>
            <Link
              href={`/work/${project.slug}`}
              className="button-secondary"
              style={{ fontSize: "0.82rem", minHeight: "2.4rem", padding: "0.4rem 1rem" }}
              onClick={() => sound.play("click")}
            >
              Case Study →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 03 Maa Sarswati Digital Library
  if (project.id === "maa-sarswati-digital-library") {
    return (
      <div className="showcase-visual-card sarswati-theme">
        <div className="mockup-topbar">
          <div className="mockup-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <span className="mockup-url">ma-sarswati-digital-library-fronten.vercel.app</span>
        </div>

        <div className="mockup-inner">
          <div className="mockup-header-badge" style={{ background: "rgba(34, 197, 94, 0.15)", color: "#22c55e" }}>
            <span className="live-pulse-dot" />
            <span>React 19 · Express 5 · Supabase Postgres · Kadipur, UP</span>
          </div>

          <h4 className="mockup-title">Maa Sarswati Digital Library Platform</h4>
          <p className="mockup-desc">
            Production full-stack study library portal for MudilaDeeh, Kadipur. Features digital student admissions with Multer photo &amp; Aadhaar document upload, instant student reviews, notices board, photo gallery, and a secure JWT admin dashboard (/admin/login) on Express 5 &amp; Supabase.
          </p>

          <div className="mockup-metrics-grid">
            <div className="mockup-metric">
              <span className="metric-val" style={{ color: "#22c55e" }}>Live API</span>
              <span className="metric-lbl">Render Edge</span>
            </div>
            <div className="mockup-metric">
              <span className="metric-val">Multipart</span>
              <span className="metric-lbl">Aadhaar &amp; Photo</span>
            </div>
            <div className="mockup-metric">
              <span className="metric-val">Postgres</span>
              <span className="metric-lbl">Supabase DB</span>
            </div>
          </div>

          <div className="mockup-cta-row">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="button-primary"
                style={{ fontSize: "0.82rem", minHeight: "2.4rem", padding: "0.4rem 1rem" }}
                onClick={() => sound.play("pop")}
              >
                Launch Library Website ↗
              </a>
            )}
            <a
              href="https://ma-sarswati-digital-library-fronten.vercel.app/admin/login"
              target="_blank"
              rel="noreferrer"
              className="button-secondary"
              style={{ fontSize: "0.82rem", minHeight: "2.4rem", padding: "0.4rem 1rem" }}
              onClick={() => sound.play("click")}
            >
              Admin Panel ↗
            </a>
            <Link
              href={`/work/${project.slug}`}
              className="button-secondary"
              style={{ fontSize: "0.82rem", minHeight: "2.4rem", padding: "0.4rem 1rem" }}
              onClick={() => sound.play("click")}
            >
              Case Study →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 04 Vani
  if (project.id === "vani") {
    return (
      <div className="showcase-visual-card vani-theme">
        <div className="mockup-topbar">
          <div className="mockup-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <span className="mockup-url">github.com/ranaji114/Vani</span>
        </div>

        <div className="mockup-inner">
          <div className="mockup-header-badge" style={{ background: "rgba(168, 85, 247, 0.15)", color: "#c084fc" }}>
            <span>📜 Full MERN Architecture · Archived</span>
          </div>

          <h4 className="mockup-title">Vani — Editorial Publishing Engine</h4>
          <p className="mockup-desc">
            A medium-scale writing and publishing platform featuring rich markdown authoring, estimated reading time, JWT authentication, and category taxonomy.
          </p>

          <div className="vani-editor-snippet">
            <div className="vani-editor-header">
              <span>✍ Markdown Draft Engine</span>
              <span style={{ color: "#a855f7" }}>Auto-Saved</span>
            </div>
            <code>
              <span style={{ color: "#c084fc" }}># On Time and Language</span>
              <br />
              <span style={{ color: "var(--muted)" }}>&gt; &quot;Words are time-stamps of human consciousness...&quot;</span>
              <br />
              <span style={{ color: "#38bdf8" }}>[Word Count: 1,420 · Read Time: 4 mins]</span>
            </code>
          </div>

          <div className="mockup-cta-row">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="button-secondary"
              style={{ fontSize: "0.82rem", minHeight: "2.4rem", padding: "0.4rem 1rem" }}
              onClick={() => sound.play("click")}
            >
              View MERN Code on GitHub ↗
            </a>
            <Link
              href={`/work/${project.slug}`}
              className="button-primary"
              style={{ fontSize: "0.82rem", minHeight: "2.4rem", padding: "0.4rem 1rem" }}
              onClick={() => sound.play("click")}
            >
              Case Study →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 05 Al-Farooq
  return (
    <div className="showcase-visual-card alfarooq-theme">
      <div className="mockup-topbar">
        <div className="mockup-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <span className="mockup-url">github.com/ranaji114/alfarooq</span>
      </div>

      <div className="mockup-inner">
        <div className="mockup-header-badge" style={{ background: "rgba(56, 189, 248, 0.15)", color: "#38bdf8" }}>
          <span>🏛 React 19 · TypeScript · Vite · Tailwind · Radix UI</span>
        </div>

        <h4 className="mockup-title">AL FAROOQ — Dual Institutional Architecture</h4>
        <p className="mockup-desc">
          A comprehensive digital presence pairing an 11-page public experience (Academics, Admissions, Gallery, Infrastructure, Staff, Notices, SMC, Mandatory Disclosure) with a dedicated centralized admin management dashboard (Admissions Manager, Notices Manager, Gallery Manager, Staff Manager, Hero Manager).
        </p>

        <div className="mockup-metrics-grid">
          <div className="mockup-metric">
            <span className="metric-val" style={{ color: "#38bdf8" }}>11 Pages</span>
            <span className="metric-lbl">Public Portal</span>
          </div>
          <div className="mockup-metric">
            <span className="metric-val">6 Modules</span>
            <span className="metric-lbl">Admin Dashboard</span>
          </div>
          <div className="mockup-metric">
            <span className="metric-val">Radix UI</span>
            <span className="metric-lbl">Design System</span>
          </div>
        </div>

        <div className="mockup-cta-row">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="button-primary"
            style={{ fontSize: "0.82rem", minHeight: "2.4rem", padding: "0.4rem 1rem" }}
            onClick={() => sound.play("click")}
          >
            View Code on GitHub ↗
          </a>
          <Link
            href={`/work/${project.slug}`}
            className="button-secondary"
            style={{ fontSize: "0.82rem", minHeight: "2.4rem", padding: "0.4rem 1rem" }}
            onClick={() => sound.play("click")}
          >
            Read Case Study →
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ProjectShowcase() {
  return (
    <div className="project-showcase-container">
      {projects.map((project) => (
        <article
          key={project.id}
          id={`showcase-${project.slug}`}
          className="project-showcase-item"
        >
          <div className="showcase-split-grid">
            {/* Left Column: Project Details & Story */}
            <div className="showcase-info-col">
              <div className="showcase-num-badge">
                <span className="showcase-number">{project.number}</span>
                <StatusBadge status={project.status} />
              </div>

              <h3 className="showcase-title mt-3">{project.title}</h3>
              <p className="showcase-tagline mt-2">{project.tagline}</p>
              <p className="body-copy mt-4" style={{ fontSize: "0.95rem" }}>
                {project.description}
              </p>

              {/* Highlights */}
              <div className="showcase-highlights mt-5">
                <p className="detail-title" style={{ marginBottom: "0.6rem" }}>
                  Key Engineering Highlights
                </p>
                <div style={{ display: "grid", gap: "0.45rem" }}>
                  {project.highlights.map((h, i) => (
                    <div key={i} className="highlight-item" style={{ fontSize: "0.88rem" }}>
                      <span className="highlight-marker" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="showcase-stack mt-5">
                <p className="detail-title" style={{ marginBottom: "0.5rem" }}>
                  Technologies Used
                </p>
                <div className="project-stack-pills">
                  {project.stack.map((tech) => (
                    <span key={tech} className="stack-pill" style={{ fontSize: "0.78rem" }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="showcase-actions mt-6">
                <Link
                  href={`/work/${project.slug}`}
                  className="button-primary"
                  onClick={() => sound.play("click")}
                >
                  Full Case Study &amp; Architecture →
                </Link>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="button-secondary"
                  onClick={() => sound.play("click")}
                >
                  GitHub Repository ↗
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="button-secondary"
                    onClick={() => sound.play("pop")}
                  >
                    Live Demo ↗
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Live Interactive Visual Mockup / IDE */}
            <div className="showcase-visual-col">
              <ProjectVisualPreview project={project} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
