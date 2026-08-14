"use client";

import { useState } from "react";
import { sound } from "@/lib/audio-haptics";

type WorkflowStepDetail = {
  num: string;
  title: string;
  tagline: string;
  ankurRole: string;
  aiRole: string;
  rule: string;
};

const steps: WorkflowStepDetail[] = [
  {
    num: "01",
    title: "Idea & Framing",
    tagline: "Define the core problem and human intent.",
    ankurRole: "Conceptualizes the foundational question, product boundary, and human purpose.",
    aiRole: "Explores domain landscape, related prior art, and edge considerations.",
    rule: "No code starts without a crystallized thesis.",
  },
  {
    num: "02",
    title: "Requirements",
    tagline: "Break down into testable technical specifications.",
    ankurRole: "Sets strict operational constraints, database schemas, and performance criteria.",
    aiRole: "Drafts comprehensive user stories, boundary conditions, and acceptance criteria.",
    rule: "Specs must be deterministic and verifiable.",
  },
  {
    num: "03",
    title: "Research & Systems",
    tagline: "Evaluate architecture options and theoretical limits.",
    ankurRole: "Studies compiler pipeline paradigms (Rust ASTs, Bytecode VMs) and API contracts.",
    aiRole: "Synthesizes documentation, benchmark trade-offs, and library comparisons.",
    rule: "Choose simple, robust primitives over fragile frameworks.",
  },
  {
    num: "04",
    title: "Architecture Design",
    tagline: "Define invariants, data flows, and state machines.",
    ankurRole: "Solely architects system modules, ownership hierarchy, and error recovery policies.",
    aiRole: "Simulates failure modes, data flow diagrams, and type-system boundaries.",
    rule: "System architecture is 100% human-owned and non-delegable.",
  },
  {
    num: "05",
    title: "AI-Assisted Build",
    tagline: "Iterative paired programming and modular synthesis.",
    ankurRole: "Guides implementation, refines memory safety, and audits generated code.",
    aiRole: "Generates boilerplate, implements pure logic helpers, and drafts subroutines.",
    rule: "Never commit code you cannot explain line-by-line from first principles.",
  },
  {
    num: "06",
    title: "Rigorous Testing",
    tagline: "Verify behavior against all edge states.",
    ankurRole: "Designs critical regression tests, fuzzing vectors, and integration scenarios.",
    aiRole: "Automates unit test matrix generation, property tests, and mock harnesses.",
    rule: "Unproven code is broken code.",
  },
  {
    num: "07",
    title: "Root-Cause Debugging",
    tagline: "Diagnose discrepancies down to machine memory/logic.",
    ankurRole: "Traces call-stacks, isolates VM pointer behavior, and pinpoints conceptual bugs.",
    aiRole: "Assists with log analysis, regex pattern matching, and refactor proposals.",
    rule: "Treat bugs as clues to incomplete assumptions.",
  },
  {
    num: "08",
    title: "Refactor & Polish",
    tagline: "Elevate typography, performance, and ergonomics.",
    ankurRole: "Fine-tunes design tokens, eliminates latency, and ensures editorial elegance.",
    aiRole: "Lint audits, bundle size optimization, and documentation generation.",
    rule: "Professional polish is the signature of respect for the user.",
  },
  {
    num: "09",
    title: "Deployment & Ownership",
    tagline: "Ship static artifacts and stand behind the live product.",
    ankurRole: "Conducts production build audit, DNS/Edge verification, and live maintenance.",
    aiRole: "Generates release notes, deployment checks, and CI configuration.",
    rule: "Full responsibility for the running system.",
  },
];

export function WorkflowCircuit() {
  const [activeIdx, setActiveIdx] = useState<number>(3); // Default to Architecture
  const current = steps[activeIdx];

  const handleStepClick = (idx: number) => {
    sound.play("click");
    setActiveIdx(idx);
  };

  return (
    <div className="workflow-circuit-wrap">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        <div>
          <p className="eyebrow">Engineering Workflow</p>
          <h3 className="section-title mt-1" style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.8rem)" }}>
            The 9-Step Collaborative AI Circuit
          </h3>
        </div>
        <span style={{ fontSize: "0.75rem", color: "var(--muted)", fontWeight: 600 }}>
          ✦ Click any phase to inspect the Human-AI boundary
        </span>
      </div>

      {/* Horizontal Steps Stepper Bar */}
      <div className="circuit-steps-bar mt-6">
        {steps.map((s, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              type="button"
              key={s.num}
              onClick={() => handleStepClick(idx)}
              className={`circuit-step-pill ${isActive ? "active" : ""}`}
            >
              <span>{s.num}</span> {s.title}
            </button>
          );
        })}
      </div>

      {/* Split Deep Dive Card */}
      <div className="circuit-split-detail">
        {/* What Ankur Owns */}
        <div className="circuit-box-ankur">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.2rem" }}>🧠</span>
            <p className="detail-title">What Ankur Decides &amp; Owns</p>
          </div>
          <h4 style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: "0.75rem", color: "var(--text)" }}>
            {current.num} — {current.title}
          </h4>
          <p className="body-copy mt-2" style={{ fontSize: "0.92rem" }}>
            {current.ankurRole}
          </p>
          <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border)" }}>
            <span style={{ fontSize: "0.74rem", fontWeight: 700, color: "var(--accent)" }}>
              ✦ First-Principle Rule:
            </span>
            <p style={{ fontSize: "0.82rem", fontStyle: "italic", color: "var(--muted)", marginTop: "0.2rem" }}>
              &ldquo;{current.rule}&rdquo;
            </p>
          </div>
        </div>

        {/* What AI Assists With */}
        <div className="circuit-box-ai">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.2rem" }}>🤖</span>
            <p className="detail-title" style={{ color: "#38bdf8" }}>What AI Assists With</p>
          </div>
          <h4 style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: "0.75rem", color: "var(--text)" }}>
            Acceleration &amp; Synthesis
          </h4>
          <p className="body-copy mt-2" style={{ fontSize: "0.92rem" }}>
            {current.aiRole}
          </p>
          <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border)" }}>
            <span style={{ fontSize: "0.74rem", fontWeight: 700, color: "#38bdf8" }}>
              ✦ AI Collaboration Role:
            </span>
            <p style={{ fontSize: "0.82rem", color: "var(--muted)", marginTop: "0.2rem" }}>
              Collaborative coding partner, rapid edge-case tester &amp; documentation auditor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
