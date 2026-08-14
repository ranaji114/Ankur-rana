"use client";

import { useState } from "react";
import { sound } from "@/lib/audio-haptics";

type Node = {
  id: string;
  label: string;
  category: string;
  icon: string;
  description: string;
  inquiry: string;
  connections: string[];
  output: string;
  link?: string;
};

const knowledgeNodes: Node[] = [
  {
    id: "quantum",
    label: "Quantum Entanglement",
    category: "Physics Hypothesis",
    icon: "⚛️",
    description: "Proposing entangled particles as dual facets of a single underlying quantum object with emerging spatial dimensions.",
    inquiry: "What if spatial separation is not fundamental, but an emergent projection?",
    connections: ["time", "perception", "compilers"],
    output: "Zenodo Research Paper (2025)",
    link: "https://zenodo.org/records/16827645",
  },
  {
    id: "time",
    label: "The Architecture of Time",
    category: "Cosmology & Philosophy",
    icon: "⏳",
    description: "Inquiry into time across physics (relativity, entropy, loop quantum gravity) and subjective human experience.",
    inquiry: "Is time a fundamental fabric of reality, or an emergent thermodynamic property?",
    connections: ["quantum", "perception", "attention"],
    output: "The Architecture of Existence & Zenodo Paper",
    link: "https://zenodo.org/records/17274810",
  },
  {
    id: "perception",
    label: "Consciousness & Perception",
    category: "Mind & Epistemology",
    icon: "🧠",
    description: "Examining how neural machinery and cognitive filters turn incoming data into subjective personal truth.",
    inquiry: "Why do cognitive systems mistake their internal representations for external reality?",
    connections: ["time", "attention", "compilers", "culture"],
    output: "The World Through Our Mind & The Unknowable Reality",
  },
  {
    id: "attention",
    label: "The Attention Asset",
    category: "Cognitive Design & Focus",
    icon: "🎯",
    description: "Protecting human mental bandwidth against algorithmic fragmentation and modern digital overstimulation.",
    inquiry: "How do humans preserve deep agency in an environment optimized for distraction?",
    connections: ["perception", "time", "compilers"],
    output: "The Attention Asset (Kindle Title)",
  },
  {
    id: "compilers",
    label: "Formal Logic & Compilers",
    category: "System Engineering",
    icon: "⚙️",
    description: "Building executable language runtimes (Lexers, ASTs, Bytecode VM) in Rust from scratch.",
    inquiry: "How does human thought transform into deterministic machine bytecode?",
    connections: ["perception", "quantum", "attention"],
    output: "Ezra Programming Language Ecosystem",
    link: "https://ezra-programming-lang.vercel.app/",
  },
  {
    id: "culture",
    label: "Cultural Memory & Language",
    category: "Linguistics & Heritage",
    icon: "📜",
    description: "Preserving and modernizing the Awadhi linguistic heritage through structured pedagogy and literature.",
    inquiry: "How does language shape the worldview and emotional texture of human consciousness?",
    connections: ["perception"],
    output: "Learn Awadhi & Hindi Poetry Works",
  },
];

export function KnowledgeGraph() {
  const [selectedId, setSelectedId] = useState<string>("quantum");
  const selectedNode = knowledgeNodes.find((n) => n.id === selectedId) || knowledgeNodes[0];

  const handleSelect = (id: string) => {
    sound.play("click");
    setSelectedId(id);
  };

  return (
    <div className="knowledge-graph-box">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        <div>
          <p className="eyebrow">Interactive Epistemology Map</p>
          <h3 className="section-title mt-1" style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.8rem)" }}>
            Architecture of Reality &amp; Mind
          </h3>
        </div>
        <span style={{ fontSize: "0.75rem", color: "var(--muted)", fontWeight: 600 }}>
          ✦ Click any node to trace intellectual interconnections
        </span>
      </div>

      {/* Nodes Grid */}
      <div className="knowledge-nodes-grid">
        {knowledgeNodes.map((node) => {
          const isSelected = node.id === selectedId;
          const isConnected = selectedNode.connections.includes(node.id);

          return (
            <button
              type="button"
              key={node.id}
              onClick={() => handleSelect(node.id)}
              className={`knowledge-node-card ${isSelected ? "active" : ""}`}
              style={{
                borderColor: isSelected
                  ? "var(--accent)"
                  : isConnected
                  ? "rgba(56, 189, 248, 0.4)"
                  : "var(--border)",
              }}
            >
              <div className="knowledge-node-icon">{node.icon}</div>
              <span className="eyebrow" style={{ fontSize: "0.68rem" }}>{node.category}</span>
              <h4 style={{ fontSize: "1rem", fontWeight: 700, marginTop: "0.25rem", color: "var(--text)" }}>
                {node.label}
              </h4>
              {isConnected && (
                <span
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    fontSize: "0.65rem",
                    color: "#38bdf8",
                    fontWeight: 700,
                  }}
                >
                  ⚡ Connected
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Deep Inspection Panel */}
      <div className="knowledge-inspect-panel">
        <div>
          <div className="meta-row">
            <span className="meta-chip">{selectedNode.category}</span>
            <span className="meta-chip">{selectedNode.output}</span>
          </div>
          <h4 className="book-title mt-3" style={{ fontSize: "1.4rem" }}>
            {selectedNode.label}
          </h4>
          <p className="body-copy mt-2">{selectedNode.description}</p>
        </div>

        <div style={{ background: "var(--background)", padding: "1.25rem", borderRadius: "8px", border: "1px solid var(--border)" }}>
          <p className="detail-title" style={{ marginBottom: "0.5rem" }}>Core Philosophical Inquiry</p>
          <p className="pull-quote" style={{ fontSize: "0.95rem" }}>
            &ldquo;{selectedNode.inquiry}&rdquo;
          </p>

          <p className="detail-title mt-4" style={{ marginBottom: "0.5rem" }}>Direct Interconnected Domains</p>
          <div className="meta-row">
            {selectedNode.connections.map((connId) => {
              const target = knowledgeNodes.find((n) => n.id === connId);
              return target ? (
                <span
                  key={connId}
                  className="theme-chip"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSelect(connId)}
                >
                  {target.icon} {target.label} →
                </span>
              ) : null;
            })}
          </div>

          {selectedNode.link && (
            <div style={{ marginTop: "1rem" }}>
              <a
                href={selectedNode.link}
                target="_blank"
                rel="noreferrer"
                className="button-primary"
                style={{ minHeight: "2.4rem", padding: "0.4rem 0.85rem", fontSize: "0.8rem" }}
              >
                Inspect Paper / Live Project →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
