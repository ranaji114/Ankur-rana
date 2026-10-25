"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { sound } from "@/lib/audio-haptics";

export type TimelineFilter = "all" | "projects" | "books" | "research";

export type TimelineItem = {
  id: string;
  year: "2026" | "2025";
  period: string;
  title: string;
  subtitle?: string;
  category: "projects" | "books" | "research";
  categoryLabel: string;
  icon: string;
  color: string;
  narrative: string;
  artifactLabel: string;
  link: string;
  isExternal?: boolean;
  coverImage?: string;
};

export const TIMELINE_ITEMS: TimelineItem[] = [
  // ── 2026 FLAGSHIPS ──
  {
    id: "shri-krishna-project",
    year: "2026",
    period: "2026 · Production System",
    title: "Shri Krishna Coaching Center",
    subtitle: "Complete Educational Platform & Student Management System",
    category: "projects",
    categoryLabel: "Production System",
    icon: "🏫",
    color: "#f59e0b",
    narrative:
      "A complete educational platform designed for Shri Krishna Coaching Center with sub-second performance, interactive course catalogs, student admissions intake, faculty directory, and academic notices.",
    artifactLabel: "View Case Study & Platform →",
    link: "/work/shri-krishna-coaching-center",
  },
  {
    id: "unknowable-reality-book",
    year: "2026",
    period: "July 2026 · Flagship Book",
    title: "The Unknowable Reality",
    subtitle: "The Evolution of Intelligence and the Structural Limits of Understanding",
    category: "books",
    categoryLabel: "Epistemology & AI Boundaries",
    icon: "🌌",
    color: "#a855f7",
    narrative:
      "A flagship inquiry establishing that limits of understanding are structural geometric properties of any observer embedded inside the reality it models—holding profound implications for human minds and artificial general intelligence.",
    artifactLabel: "Inspect on Books Vault →",
    link: "/books#unknowable-reality",
    coverImage: "/assets/books/unknowable-reality.jpeg",
  },

  // ── 2025 FOUNDATIONS & CREATIONS ──
  {
    id: "ezra-systems",
    year: "2025",
    period: "2025 · Language Architecture",
    title: "Ezra Programming Language & Ecosystem",
    subtitle: "Rust Lexer, Pratt Parser, AST Compiler, Bytecode VM & CLI",
    category: "projects",
    categoryLabel: "Compilers & Systems",
    icon: "⚙️",
    color: "#f97316",
    narrative:
      "Designed Ezra, an expressive programming language written in Rust from first principles. Features a complete developer toolchain: lexer, Pratt parser, AST transformations, compiler, stack-based bytecode VM, and VS Code extension.",
    artifactLabel: "Explore Ezra Language Ecosystem ↗",
    link: "https://ezra-programming-lang.vercel.app/",
    isExternal: true,
  },
  {
    id: "maa-sarswati-project",
    year: "2025",
    period: "2025 · Web Platform",
    title: "Maa Sarswati Digital Library",
    subtitle: "Modern Library Management & Digital Reading System",
    category: "projects",
    categoryLabel: "Web Platform",
    icon: "📚",
    color: "#10b981",
    narrative:
      "A modern, responsive platform for Maa Sarswati Digital Library built to manage student seat allocations, study chambers, memberships, and book catalogs with fast accessibility.",
    artifactLabel: "View Case Study & Platform →",
    link: "/work/maa-sarswati-digital-library",
  },
  {
    id: "vani-project",
    year: "2025",
    period: "2025 · AI Voice Systems",
    title: "Vani — Voice-First AI Companion",
    subtitle: "Streaming Speech Synthesis & Intelligent Interaction Engine",
    category: "projects",
    categoryLabel: "AI & Voice Systems",
    icon: "🎙️",
    color: "#38bdf8",
    narrative:
      "An intelligent, voice-first AI companion featuring low-latency speech synthesis, dynamic conversational state tracking, and natural speech-to-intent mapping.",
    artifactLabel: "Inspect Vani Architecture →",
    link: "/work/vani",
  },
  {
    id: "alfarooq-project",
    year: "2025",
    period: "2025 · Architecture & CMS",
    title: "Al-Farooq Educational Portal",
    subtitle: "11-Page Public Portal & Administrative CMS Core",
    category: "projects",
    categoryLabel: "Architecture & CMS",
    icon: "🏛️",
    color: "#06b6d4",
    narrative:
      "A modern institutional web platform pairing an 11-page public experience with a dedicated administrative management dashboard for admissions, staff, and notice publishing.",
    artifactLabel: "Inspect Al-Farooq Project →",
    link: "/work/alfarooq",
  },
  {
    id: "quantum-entanglement-zenodo",
    year: "2025",
    period: "2025 · Zenodo Publication",
    title: "Unified Connectivity Hypothesis for Quantum Entanglement",
    subtitle: "Zenodo Open Access Conceptual Paper (DOI: 10.5281/zenodo.16827645)",
    category: "research",
    categoryLabel: "Physics Hypothesis",
    icon: "⚛️",
    color: "#38bdf8",
    narrative:
      "Independent physics research paper published on Zenodo proposing entangled particles as dual facets of a single underlying quantum object with emerging spatial separation.",
    artifactLabel: "Read Zenodo DOI Paper ↗",
    link: "https://zenodo.org/records/16827645",
    isExternal: true,
  },
  {
    id: "temporal-layers-zenodo",
    year: "2025",
    period: "2025 · Zenodo Publication",
    title: "Temporal Layers: Divergence of Human Perception & Physical Time",
    subtitle: "Zenodo Open Access Conceptual Paper (DOI: 10.5281/zenodo.17274810)",
    category: "research",
    categoryLabel: "Cosmology & Time",
    icon: "⏳",
    color: "#06b6d4",
    narrative:
      "Investigating the structural divergence between relativistic physical entropy and the human neurological perception of time, proposing coexisting operational layers.",
    artifactLabel: "Read Zenodo DOI Paper ↗",
    link: "https://zenodo.org/records/17274810",
    isExternal: true,
  },
  {
    id: "architecture-of-existence-book",
    year: "2025",
    period: "2025 · Published Book",
    title: "The Architecture of Existence",
    subtitle: "The Biography of Time across History and Physics",
    category: "books",
    categoryLabel: "Cosmology & Philosophy",
    icon: "⏳",
    color: "#f59e0b",
    narrative:
      "A sweeping intellectual journey through humanity's greatest question: what is time? Spanning shadow clocks, Einstein's relativity, quantum loop gravity, memory, and cosmic entropy.",
    artifactLabel: "Inspect on Books Vault →",
    link: "/books#architecture-of-existence",
    coverImage: "/assets/books/architecture-of-existence.jpg",
  },
  {
    id: "attention-asset-book",
    year: "2025",
    period: "2025 · Published Book",
    title: "The Attention Asset",
    subtitle: "Protect Your Focus, Reclaim Your Time, and Win Back Your Mind",
    category: "books",
    categoryLabel: "Cognitive Sovereignty",
    icon: "🎯",
    color: "#10b981",
    narrative:
      "A practical manifesto on reclaiming sustained human focus from algorithmic commodification, treating unbroken attention as sovereign life capital.",
    artifactLabel: "Inspect on Books Vault →",
    link: "/books#attention-asset",
    coverImage: "/assets/books/attention-asset.jpg",
  },
  {
    id: "world-through-our-mind-book",
    year: "2025",
    period: "2025 · Published Book",
    title: "The World Through Our Mind",
    subtitle: "The Psychology of Subjective Perception",
    category: "books",
    categoryLabel: "Cognitive Epistemology",
    icon: "🧠",
    color: "#fb7185",
    narrative:
      "Formulating the invisible predictive machinery of human perception—how neural filters and electrochemical predictive engines turn physical chaos into personal truth.",
    artifactLabel: "Inspect on Books Vault →",
    link: "/books#world-through-our-mind",
    coverImage: "/assets/books/world-through-our-mind.jpg",
  },
  {
    id: "learn-awadhi-book",
    year: "2025",
    period: "2025 · Published Book",
    title: "Learn Awadhi: Heritage & Living Cadence",
    subtitle: "Complete Language & Cultural Preservation Guide",
    category: "books",
    categoryLabel: "Linguistic Heritage",
    icon: "📜",
    color: "#eab308",
    narrative:
      "A complete bridge into the Awadhi language, unlocking centuries of poetic cadence, folk wisdom, and the emotional intimacy of the Gangetic plains.",
    artifactLabel: "Inspect on Books Vault →",
    link: "/books#learn-awadhi",
    coverImage: "/assets/books/learn-awadhi.jpg",
  },
  {
    id: "long-distance-love-book",
    year: "2025",
    period: "2025 · Published Book",
    title: "Long Distance Love Blueprint",
    subtitle: "Emotional Architecture & Overcoming Overthinking",
    category: "books",
    categoryLabel: "Relationships",
    icon: "💜",
    color: "#c084fc",
    narrative:
      "Reframing long-distance intimacy as emotional system design—overcoming sensory deprivation anxiety through transparent trust, milestones, and rituals.",
    artifactLabel: "Inspect on Books Vault →",
    link: "/books#long-distance-love-blueprint",
    coverImage: "/assets/books/long-distance-love-blueprint.jpg",
  },
  {
    id: "tumhare-baad-book",
    year: "2025",
    period: "2025 · Published Book",
    title: "Tumhare Baad....",
    subtitle: "एक अधूरी मोहब्बत की कविताएँ",
    category: "books",
    categoryLabel: "Hindi Poetry",
    icon: "✍️",
    color: "#94a3b8",
    narrative:
      "A tender literary collection giving voice to unfinished love, late-night silence, heartbreak, and emotional recognition in candid Hindi verse.",
    artifactLabel: "Inspect on Books Vault →",
    link: "/books#tumhare-baad",
    coverImage: "/assets/books/tumhare-baad.jpg",
  },
];

export function WorksTimeline() {
  const [selectedCategory, setSelectedCategory] = useState<TimelineFilter>("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredItems =
    selectedCategory === "all"
      ? TIMELINE_ITEMS
      : TIMELINE_ITEMS.filter((m) => m.category === selectedCategory);

  return (
    <div className="works-timeline-container">
      {/* Header & Filter Row */}
      <div className="works-timeline-header">
        <div>
          <span className="eyebrow" style={{ color: "var(--accent-gold)" }}>
            ✦ TRAJECTORY OF CREATION · 2025 — 2026
          </span>
          <h2 className="section-title mt-2" style={{ maxWidth: "680px" }}>
            The Full Engineering &amp; Publication Timeline
          </h2>
          <p className="body-large mt-3" style={{ maxWidth: "700px" }}>
            All five production software projects, two published Zenodo quantum physics papers, and seven published books organized across 2025 and 2026.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="works-timeline-filters" role="group" aria-label="Timeline category filters">
          {[
            { id: "all", label: "✦ All Works (14)" },
            { id: "projects", label: "⚙️ Projects Built (5)" },
            { id: "books", label: "📚 Books (7)" },
            { id: "research", label: "🔬 Zenodo Papers (2)" },
          ].map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                className={`timeline-filter-btn ${isActive ? "is-active" : ""}`}
                onClick={() => {
                  sound.play("click");
                  setSelectedCategory(tab.id as TimelineFilter);
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Static Clean Timeline Track */}
      <div className="works-timeline-track">
        {/* Central Clean Accent Line */}
        <div className="works-timeline-line" aria-hidden="true" />

        {/* Timeline Entries List */}
        <div className="works-timeline-list">
          {filteredItems.map((item, index) => {
            const isHovered = hoveredId === item.id;
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id}
                className={`works-timeline-row ${isEven ? "align-left" : "align-right"} ${
                  isHovered ? "is-hovered" : ""
                }`}
                onMouseEnter={() => {
                  sound.play("hover");
                  setHoveredId(item.id);
                }}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Node Pin Anchor */}
                <div
                  className="timeline-pin-node"
                  style={{ borderColor: item.color }}
                  aria-hidden="true"
                >
                  <div
                    className="timeline-pin-dot"
                    style={{
                      backgroundColor: item.color,
                      boxShadow: `0 0 12px ${item.color}`,
                    }}
                  />
                </div>

                {/* Milestone Content Card */}
                <article
                  className="timeline-entry-card"
                  style={{
                    borderTop: `2px solid ${item.color}`,
                  }}
                >
                  {/* Card Header Strip */}
                  <div className="timeline-card-meta">
                    <div className="timeline-category-badge" style={{ borderColor: item.color }}>
                      <span className="badge-icon">{item.icon}</span>
                      <span className="badge-text">{item.categoryLabel}</span>
                    </div>

                    <div className="timeline-year-badge">
                      <span className="year-val">{item.year}</span>
                      <span className="period-val">· {item.period}</span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="timeline-entry-title mt-3">{item.title}</h3>
                  {item.subtitle && <p className="timeline-entry-subtitle">{item.subtitle}</p>}

                  {/* Narrative Body */}
                  <p className="timeline-entry-narrative mt-3">{item.narrative}</p>

                  {/* Artifact Strip */}
                  <div className="timeline-artifact-bar mt-4">
                    {item.coverImage && (
                      <div className="timeline-cover-preview">
                        <Image
                          src={item.coverImage}
                          alt={item.title}
                          width={48}
                          height={72}
                          className="timeline-cover-img"
                        />
                      </div>
                    )}

                    <div className="timeline-cta-wrap">
                      {item.isExternal ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="timeline-cta-btn"
                          onClick={() => sound.play("pop")}
                        >
                          <span>{item.artifactLabel}</span>
                        </a>
                      ) : (
                        <Link
                          href={item.link}
                          className="timeline-cta-btn"
                          onClick={() => sound.play("click")}
                        >
                          <span>{item.artifactLabel}</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
