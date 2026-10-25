"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { sound } from "@/lib/audio-haptics";

export type CosmicNode = {
  id: string;
  label: string;
  category: "quantum" | "time" | "mind" | "systems" | "culture";
  categoryLabel: string;
  icon: string;
  color: string;
  description: string;
  inquiry: string;
  connections: string[];
  outputType: "Zenodo Paper" | "Book" | "Language Runtime" | "Poetry";
  outputTitle: string;
  link?: string;
  x: number; // percentage in coordinate space (0-100)
  y: number; // percentage in coordinate space (0-100)
  radius: number;
};

export const COSMIC_NODES: CosmicNode[] = [
  {
    id: "quantum",
    label: "Quantum Entanglement",
    category: "quantum",
    categoryLabel: "Physics Hypothesis",
    icon: "⚛️",
    color: "#38bdf8", // Sky Blue
    description: "Proposing entangled particles as dual facets of a single underlying quantum object with emerging spatial dimensions.",
    inquiry: "What if spatial separation is not fundamental, but an emergent projection of a unified underlying state?",
    connections: ["time", "horizon", "compilers", "observer"],
    outputType: "Zenodo Paper",
    outputTitle: "Zenodo Paper (DOI: 10.5281/zenodo.16827645)",
    link: "https://zenodo.org/records/16827645",
    x: 24,
    y: 35,
    radius: 36,
  },
  {
    id: "time",
    label: "Architecture of Time",
    category: "time",
    categoryLabel: "Cosmology & Relativity",
    icon: "⏳",
    color: "#f59e0b", // Gold Amber
    description: "Inquiry into time across physics (relativity, entropy, loop quantum gravity) and subjective human experience.",
    inquiry: "Is time a fundamental river flowing through the cosmos, or the thermodynamic foam left behind as reality computes?",
    connections: ["quantum", "observer", "mind", "attention"],
    outputType: "Book",
    outputTitle: "The Architecture of Existence & Zenodo 17274810",
    link: "https://zenodo.org/records/17274810",
    x: 52,
    y: 22,
    radius: 40,
  },
  {
    id: "horizon",
    label: "The Unknowable Horizon",
    category: "mind",
    categoryLabel: "Epistemology of Intelligence",
    icon: "🌌",
    color: "#a855f7", // Purple
    description: "Investigating why any observer embedded inside the universe faces geometric structural limits to omniscience.",
    inquiry: "Why do we assume more information alone will dissolve boundaries that may be structural properties of mind?",
    connections: ["quantum", "mind", "compilers"],
    outputType: "Book",
    outputTitle: "The Unknowable Reality (July 2026)",
    link: "https://amzn.in/d/06YNVlNC",
    x: 78,
    y: 32,
    radius: 38,
  },
  {
    id: "observer",
    label: "Observer Coordinates",
    category: "quantum",
    categoryLabel: "Relational Physics",
    icon: "🔭",
    color: "#06b6d4", // Cyan
    description: "Examining how observer horizons and reference frames define observable reality in relativistic and quantum domains.",
    inquiry: "Can reality ever be formulated without reference to the boundary condition of who or what is measuring it?",
    connections: ["quantum", "time", "mind"],
    outputType: "Zenodo Paper",
    outputTitle: "Zenodo Conceptual Physics Research",
    link: "https://zenodo.org/records/17274810",
    x: 35,
    y: 65,
    radius: 32,
  },
  {
    id: "mind",
    label: "Consciousness & Filters",
    category: "mind",
    categoryLabel: "Cognitive Predictive Science",
    icon: "🧠",
    color: "#ec4899", // Rose Pink
    description: "Examining how neural machinery and cognitive predictive filters turn incoming sensory chaos into subjective truth.",
    inquiry: "Why do cognitive systems mistake their internal predictive representations for the external world?",
    connections: ["time", "horizon", "attention", "culture"],
    outputType: "Book",
    outputTitle: "The World Through Our Mind",
    link: "https://www.amazon.in/dp/B0GX2XL7BN",
    x: 68,
    y: 58,
    radius: 38,
  },
  {
    id: "attention",
    label: "Attention Sovereignty",
    category: "mind",
    categoryLabel: "Cognitive Bandwidth",
    icon: "🎯",
    color: "#10b981", // Emerald Green
    description: "Protecting human mental agency and deep sustained thought against algorithmic fragmentation and noise.",
    inquiry: "How do humans preserve sovereign agency in an information economy optimized for involuntary distraction?",
    connections: ["mind", "time", "compilers"],
    outputType: "Book",
    outputTitle: "The Attention Asset",
    link: "https://www.amazon.in/dp/B0GX2XL7BN",
    x: 84,
    y: 75,
    radius: 34,
  },
  {
    id: "compilers",
    label: "Formal Logic & Compilers",
    category: "systems",
    categoryLabel: "Deterministic Runtimes",
    icon: "⚙️",
    color: "#f97316", // Rust Orange
    description: "Building executable language runtimes (Lexers, ASTs, Bytecode VM) in Rust from first principles.",
    inquiry: "How does human semantic thought translate into deterministic, verifiable machine bytecode?",
    connections: ["quantum", "horizon", "mind"],
    outputType: "Language Runtime",
    outputTitle: "Ezra Programming Language Ecosystem",
    link: "https://ezra-programming-lang.vercel.app/",
    x: 18,
    y: 78,
    radius: 36,
  },
  {
    id: "culture",
    label: "Cultural Cadence & Language",
    category: "culture",
    categoryLabel: "Linguistic Heritage",
    icon: "📜",
    color: "#eab308", // Yellow Amber
    description: "Preserving and modernizing the Awadhi linguistic heritage and human emotional memory through poetry.",
    inquiry: "How does the cadenced architecture of language shape the emotional texture of human consciousness?",
    connections: ["mind"],
    outputType: "Book",
    outputTitle: "Learn Awadhi & Tumhare Baad....",
    link: "https://www.amazon.in/dp/B0DFM9XTY9",
    x: 48,
    y: 85,
    radius: 32,
  },
];

type CategoryFilter = "all" | "quantum" | "time" | "mind" | "systems" | "culture";

export function CosmicConceptGraph() {
  const [selectedId, setSelectedId] = useState<string>("quantum");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedNode = COSMIC_NODES.find((n) => n.id === selectedId) || COSMIC_NODES[0];
  const activeHoveredNode = hoveredId ? COSMIC_NODES.find((n) => n.id === hoveredId) : null;
  const inspectedNode = activeHoveredNode || selectedNode;

  // Handle pointer parallax
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: x * 20, y: y * 20 });
  };

  const handlePointerLeave = () => {
    setParallax({ x: 0, y: 0 });
    setHoveredId(null);
  };

  const handleSelectNode = useCallback((id: string) => {
    sound.play("click");
    setSelectedId(id);
  }, []);

  // Compute connections pairs for drawing lines
  const connectionLines = useRef<{ from: CosmicNode; to: CosmicNode; id: string }[]>([]);
  useEffect(() => {
    const lines: { from: CosmicNode; to: CosmicNode; id: string }[] = [];
    const seen = new Set<string>();

    COSMIC_NODES.forEach((source) => {
      source.connections.forEach((targetId) => {
        const target = COSMIC_NODES.find((n) => n.id === targetId);
        if (target) {
          const pairKey = [source.id, target.id].sort().join("---");
          if (!seen.has(pairKey)) {
            seen.add(pairKey);
            lines.push({ from: source, to: target, id: pairKey });
          }
        }
      });
    });
    connectionLines.current = lines;
  }, []);

  return (
    <div className="cosmic-graph-wrapper">
      {/* Top Header & Filter Bar */}
      <div className="cosmic-graph-header">
        <div>
          <span className="eyebrow" style={{ color: "var(--accent-gold)" }}>
            ✦ INTERACTIVE COSMIC EPISTEMOLOGY GRAPH
          </span>
          <h3 className="section-title mt-2" style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)" }}>
            The Architecture of Inquiry
          </h3>
          <p className="body-copy mt-2" style={{ maxWidth: "660px", fontSize: "0.92rem" }}>
            A dynamic constellation tracing how quantum entanglement hypotheses, the physics of time, cognitive perception, Rust compilers, and Awadhi linguistic cadence form a single unified worldview.
          </p>
        </div>

        {/* Domain Filter Pills */}
        <div className="cosmic-filter-bar" role="group" aria-label="Constellation domain filters">
          {[
            { id: "all", label: "✦ All (8)", icon: "" },
            { id: "quantum", label: "Quantum & Space", icon: "⚛️" },
            { id: "time", label: "Time & Cosmology", icon: "⏳" },
            { id: "mind", label: "Mind & Perception", icon: "🧠" },
            { id: "systems", label: "Rust & Compilers", icon: "⚙️" },
            { id: "culture", label: "Culture & Awadhi", icon: "📜" },
          ].map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                className={`cosmic-filter-pill ${isActive ? "is-active" : ""}`}
                onClick={() => {
                  sound.play("click");
                  setActiveFilter(filter.id as CategoryFilter);
                }}
              >
                {filter.icon && <span className="pill-icon">{filter.icon}</span>}
                <span>{filter.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Dual Grid: Interactive Constellation Stage + Live Inspection Card */}
      <div className="cosmic-stage-layout">
        {/* Constellation Canvas / SVG Stage */}
        <div
          className="cosmic-viewport"
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          {/* Deep Space Background Atmosphere & Star Particles */}
          <div
            className="cosmic-starfield"
            style={{
              transform: `translate(${parallax.x * 0.4}px, ${parallax.y * 0.4}px)`,
            }}
            aria-hidden="true"
          />

          {/* SVG Gravitational Lines */}
          <svg className="cosmic-svg-canvas" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="line-glow-default" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.12)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.04)" />
              </linearGradient>
              <linearGradient id="line-glow-active" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {connectionLines.current.map((line) => {
              const isSourceActive = inspectedNode.id === line.from.id;
              const isTargetActive = inspectedNode.id === line.to.id;
              const isConnected = isSourceActive || isTargetActive;

              const isFilteredOut =
                activeFilter !== "all" &&
                line.from.category !== activeFilter &&
                line.to.category !== activeFilter;

              return (
                <line
                  key={line.id}
                  x1={line.from.x}
                  y1={line.from.y}
                  x2={line.to.x}
                  y2={line.to.y}
                  stroke={isConnected ? "url(#line-glow-active)" : "url(#line-glow-default)"}
                  strokeWidth={isConnected ? 0.75 : 0.35}
                  strokeDasharray={isConnected ? "1 0.5" : "none"}
                  className={`cosmic-line ${isConnected ? "is-connected-glow" : ""} ${
                    isFilteredOut ? "is-dimmed" : ""
                  }`}
                />
              );
            })}
          </svg>

          {/* Constellation Nodes */}
          {COSMIC_NODES.map((node) => {
            const isSelected = selectedId === node.id;
            const isHovered = hoveredId === node.id;
            const isConnectedToActive =
              inspectedNode.id !== node.id && inspectedNode.connections.includes(node.id);

            const isFiltered = activeFilter !== "all" && node.category !== activeFilter;

            return (
              <div
                key={node.id}
                className={`cosmic-node-anchor ${isSelected ? "is-selected" : ""} ${
                  isHovered ? "is-hovered" : ""
                } ${isConnectedToActive ? "is-connected" : ""} ${isFiltered ? "is-filtered" : ""}`}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: `translate(-50%, -50%) translate(${parallax.x * 0.7}px, ${
                    parallax.y * 0.7
                  }px)`,
                }}
                onMouseEnter={() => {
                  sound.play("hover");
                  setHoveredId(node.id);
                }}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleSelectNode(node.id)}
                role="button"
                tabIndex={0}
                aria-label={`Inspect concept: ${node.label}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelectNode(node.id);
                  }
                }}
              >
                {/* Orbital Pulsing Rings */}
                <div
                  className="node-pulse-ring"
                  style={{ borderColor: node.color }}
                  aria-hidden="true"
                />

                {/* Core Planetary Disk */}
                <div
                  className="node-core-disk"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--surface) 88%, transparent)",
                    borderColor: isSelected || isHovered ? node.color : "var(--border)",
                    boxShadow: isSelected || isHovered ? `0 0 24px ${node.color}` : "none",
                  }}
                >
                  <span className="node-icon">{node.icon}</span>
                </div>

                {/* Node Label Capsule */}
                <div className="node-label-pill" style={{ borderColor: node.color }}>
                  <span className="node-label-text">{node.label}</span>
                </div>
              </div>
            );
          })}

          {/* Corner Guidance Overlay */}
          <div className="cosmic-guidance-badge">
            <span className="guidance-dot" />
            <span>Click any node to navigate conceptual bridge · Hover to illuminate</span>
          </div>
        </div>

        {/* Live Inspection Terminal Card */}
        <div className="cosmic-inspect-terminal">
          <div className="terminal-header-strip">
            <div className="terminal-category-tag" style={{ borderColor: inspectedNode.color }}>
              <span className="cat-icon">{inspectedNode.icon}</span>
              <span className="cat-text">{inspectedNode.categoryLabel}</span>
            </div>
            <span className="terminal-output-chip">{inspectedNode.outputType}</span>
          </div>

          <h4 className="terminal-title mt-3" style={{ color: "var(--text)" }}>
            {inspectedNode.label}
          </h4>

          <p className="terminal-desc mt-2">{inspectedNode.description}</p>

          {/* Core Philosophical Inquiry Quote */}
          <div className="terminal-inquiry-box mt-4">
            <span className="inquiry-label">Core Foundational Inquiry:</span>
            <blockquote className="inquiry-quote">&ldquo;{inspectedNode.inquiry}&rdquo;</blockquote>
          </div>

          {/* Associated Output (Book, Zenodo Paper, Compiler) */}
          <div className="terminal-output-box mt-4">
            <span className="output-label">Manifestation / Published Work:</span>
            <div className="output-row">
              <b className="output-name">{inspectedNode.outputTitle}</b>
              {inspectedNode.link && (
                <a
                  href={inspectedNode.link}
                  target="_blank"
                  rel="noreferrer"
                  className="button-primary terminal-link-btn"
                  onClick={() => sound.play("pop")}
                >
                  Inspect Publication ↗
                </a>
              )}
            </div>
          </div>

          {/* Connected Neighbor Nodes (Interactive Hop) */}
          <div className="terminal-connections-box mt-5">
            <span className="connections-label">Direct Interconnected Concept Threads:</span>
            <div className="connections-list mt-2">
              {inspectedNode.connections.map((connId) => {
                const target = COSMIC_NODES.find((n) => n.id === connId);
                if (!target) return null;

                return (
                  <button
                    key={connId}
                    type="button"
                    className="connection-hop-pill"
                    onClick={() => handleSelectNode(connId)}
                    title={`Jump to: ${target.label}`}
                  >
                    <span>{target.icon}</span>
                    <span>{target.label}</span>
                    <span className="hop-arrow">→</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
