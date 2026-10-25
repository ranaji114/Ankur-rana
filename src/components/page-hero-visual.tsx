"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Atom, BookOpen, Braces, GitBranch, Mail, Sparkles } from "lucide-react";
import { books, projects, researchPapers } from "@/data/content";

type PageHeroVisualProps = { variant: "work" | "books" | "research" | "contact" };

const visualCopy = {
  work: { label: "SYSTEMS, BUILT TO RUN", title: "From first token to live product." },
  books: { label: "SEVEN TITLES · ONE THREAD", title: "Ideas, made tangible." },
  research: { label: "OPEN QUESTIONS", title: "Patterns beneath the surface." },
  contact: { label: "THE NEXT GOOD CONVERSATION", title: "A signal, sent both ways." },
} as const;

export function PageHeroVisual({ variant }: PageHeroVisualProps) {
  const reduceMotion = useReducedMotion();
  const latest = books.find((book) => book.isLatest) ?? books[0];
  const other = books.find((book) => book.id !== latest?.id) ?? books[1];
  const featured = projects.find((project) => project.id === "ezra") ?? projects[0];
  const paper = researchPapers[0];
  const copy = visualCopy[variant];

  return (
    <motion.div
      className={`page-scene page-scene-${variant}`}
      aria-hidden="true"
      initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="page-scene-glow" />
      <div className="page-scene-orbit"><i /><i /><i /></div>
      <div className="page-scene-core">
        <div className="page-scene-label"><span /><span>{copy.label}</span><Sparkles size={13} /></div>

        {variant === "work" && (
          <div className="scene-work-stack">
            <div className="scene-window scene-window-back"><div><i /><i /><i /></div><span>architecture.rs</span><Braces size={16} /></div>
            <div className="scene-window scene-window-main">
              <div className="scene-window-top"><div><i /><i /><i /></div><span>ezra / runtime</span><b>● LIVE</b></div>
              <div className="scene-code-lines"><i>fn <b>execute</b>(program) &#123;</i><i>  let runtime = <b>Vm::new</b>();</i><i>  runtime.<b>run</b>(program)</i><i>&#125;</i></div>
              <div className="scene-project-meta"><span>{featured?.title ?? "Ezra"}</span><span>RUST · VM · TOOLING</span></div>
            </div>
            <div className="scene-float-tag">05 <span>PRODUCTION SYSTEMS</span></div>
          </div>
        )}

        {variant === "books" && (
          <div className="scene-books-stack">
            <div className="scene-book scene-book-back"><Image src={other.cover} alt="" width={250} height={375} sizes="120px" /></div>
            <div className="scene-book scene-book-front"><Image src={latest.cover} alt="" width={300} height={450} sizes="150px" /></div>
            <div className="scene-book-caption"><BookOpen size={15} /><span>THE AUTHOR’S SHELF</span></div>
            <div className="scene-book-count">07 <span>PUBLISHED TITLES</span></div>
          </div>
        )}

        {variant === "research" && (
          <div className="scene-research-map">
            <svg viewBox="0 0 420 260" fill="none">
              <path d="M52 166 130 72l92 55 88-75 56 111-93 58-87-31-95 28-39-52Z" />
              <path d="m130 72 56 146m36-91 101 36m-193-46 171-65m-79 120 88-58" />
              <circle cx="52" cy="166" r="8" /><circle cx="130" cy="72" r="7" /><circle cx="222" cy="127" r="12" /><circle cx="310" cy="52" r="8" /><circle cx="366" cy="163" r="7" /><circle cx="273" cy="221" r="6" /><circle cx="186" cy="190" r="7" /><circle cx="91" cy="218" r="5" />
            </svg>
            <div className="scene-research-center"><Atom size={22} /><span>ONE CONNECTED<br />QUESTION</span></div>
            <div className="scene-paper-tag">{paper?.type ?? "CONCEPTUAL INQUIRY"}</div>
          </div>
        )}

        {variant === "contact" && (
          <div className="scene-contact-orbit">
            <div className="scene-contact-ring scene-contact-ring-one" />
            <div className="scene-contact-ring scene-contact-ring-two" />
            <div className="scene-contact-center"><Mail size={27} /></div>
            <div className="scene-contact-node scene-contact-node-one"><GitBranch size={17} /></div>
            <div className="scene-contact-node scene-contact-node-two"><span>in</span></div>
            <div className="scene-contact-node scene-contact-node-three"><Sparkles size={16} /></div>
            <div className="scene-contact-caption">{copy.title}</div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
