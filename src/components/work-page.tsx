"use client";

import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SiteShell } from "@/components/site-shell";
import { ProjectShowcase } from "@/components/project-showcase";
import { sound } from "@/lib/audio-haptics";

export function WorkPage() {
  return (
    <SiteShell>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Engineering Systems &amp; Products</p>
            <h1 className="page-title mt-5">Featured Projects &amp; Case Studies.</h1>
            <p className="body-large mt-6" style={{ maxWidth: "720px" }}>
              Five software systems built across compiler engineering in Rust, full-stack client web platforms, digital study libraries,
              editorial publishing systems, and institutional architecture. Each with its own deep architecture case study.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── All 5 Featured Projects Showcase (One below another) ── */}
      <section className="section">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Project Showcase</p>
            <h2 className="section-title mt-2">All 5 Production Systems</h2>
            <p className="body-large mt-3" style={{ maxWidth: "640px" }}>
              Detailed breakdown of the architecture, stack, key engineering decisions, and live interactive visualizers.
            </p>
          </Reveal>

          {/* Cinematic Individual Project Showcases */}
          <ProjectShowcase />
        </div>
      </section>

      {/* ── End strip ── */}
      <div className="work-end-strip" style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
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
                Want to see the development workflow behind these systems?
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <Link className="button-secondary" href="/about" onClick={() => sound.play("click")}>
                  My AI workflow →
                </Link>
                <Link className="button-secondary" href="/books" onClick={() => sound.play("click")}>
                  My 7 Books Vault →
                </Link>
                <Link className="button-primary" href="/contact" onClick={() => sound.play("click")}>
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
