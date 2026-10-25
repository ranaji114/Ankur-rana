"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Atom, BookOpen, Code2, Layers3, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { author, books, projects, researchPapers } from "@/data/content";
import { Reveal } from "@/components/reveal";
import { sound } from "@/lib/audio-haptics";

const codeLines = [
  <><span className="hb-code-keyword">fn</span> <span className="hb-code-function">compute_entropy</span>(energy, layer) &#123;</>,
  <>  <span className="hb-code-keyword">let</span> base_rate = <span className="hb-code-number">1.618</span>;</>,
  <>  <span className="hb-code-keyword">let</span> delta = energy * base_rate / layer;</>,
  <>  <span className="hb-code-keyword">return</span> delta;</>,
  <>&#125;</>,
];

export function HomeBento() {
  const reduceMotion = useReducedMotion();
  const featuredProject = projects.find((project) => project.id === "ezra") || projects[0];
  const latestBook = books.find((book) => book.isLatest) || books[0];
  const leadPaper = researchPapers[0];
  const secondPaper = researchPapers[1];

  return (
    <section className="home-bento-section" aria-labelledby="home-bento-title">
      <div className="container-page">
        <Reveal>
          <div className="home-bento-heading">
            <div>
              <p className="eyebrow">A SMALL UNIVERSE OF WORK</p>
              <h2 id="home-bento-title">Different mediums.<br /><em>One curiosity.</em></h2>
            </div>
            <p className="home-bento-intro">Software, research, and writing sit closer together than they first appear. Here’s a map of the things I make and the questions behind them.</p>
          </div>
        </Reveal>

        <div className="home-bento-grid">
          <Reveal className="home-bento-cell hb-cell-code">
            <Link className="hb-card hb-code-card" href={featuredProject ? `/work/${featuredProject.slug}` : "/work"} onClick={() => sound.play("click")}>
              <div className="hb-card-head"><span className="hb-icon"><Code2 size={16} /></span><span className="hb-overline">01 / SYSTEMS ENGINEERING</span><ArrowUpRight className="hb-card-arrow" size={17} /></div>
              <div className="hb-code-title"><span>Rust · Language Runtime</span><h3>Meet <em>Ezra.</em></h3><p>A readable scripting language, from lexer to bytecode VM.</p></div>
              <div className="hb-terminal" aria-label="A sample Ezra code snippet">
                <div className="hb-terminal-bar"><div><i /><i /><i /></div><span>entropy.ez</span><span>EZRA VM <b>●</b></span></div>
                <pre>{codeLines.map((line, index) => <span className="hb-code-line" key={index}><i>{String(index + 1).padStart(2, "0")}</i><code>{line}</code></span>)}</pre>
                <span className="hb-terminal-glow" aria-hidden="true" />
              </div>
              <div className="hb-card-foot"><span>Explore the language runtime</span><ArrowDownRight size={16} /></div>
            </Link>
          </Reveal>

          <Reveal className="home-bento-cell hb-cell-book" delay={0.05}>
            <Link className="hb-card hb-book-card" href="/books" onClick={() => sound.play("click")}>
              <div className="hb-card-head"><span className="hb-icon"><BookOpen size={16} /></span><span className="hb-overline">02 / AUTHOR</span><ArrowUpRight className="hb-card-arrow" size={17} /></div>
              <div className="hb-book-copy"><p>THE LATEST BOOK</p><h3>{latestBook.title}</h3><span>{latestBook.subtitle}</span></div>
              <div className="hb-book-art"><div className="hb-book-shadow" /><Image src={latestBook.cover} alt={`${latestBook.title} cover`} width={260} height={390} priority={false} sizes="(max-width: 700px) 35vw, 180px" /><span className="hb-book-orbit hb-book-orbit-one" /><span className="hb-book-orbit hb-book-orbit-two" /></div>
              <div className="hb-card-foot"><span>Open the Books Vault</span><ArrowDownRight size={16} /></div>
            </Link>
          </Reveal>

          <Reveal className="home-bento-cell hb-cell-research" delay={0.1}>
            <Link className="hb-card hb-research-card" href="/research" onClick={() => sound.play("click")}>
              <div className="hb-card-head"><span className="hb-icon"><Atom size={16} /></span><span className="hb-overline">03 / RESEARCH</span><ArrowUpRight className="hb-card-arrow" size={17} /></div>
              <div className="hb-research-orbit" aria-hidden="true"><span /><i /><i /><i /><b>?</b></div>
              <div className="hb-research-copy"><span>IDEAS IN MOTION · ZENODO</span><h3>{leadPaper.title}</h3><p>{secondPaper.title}</p></div>
              <div className="hb-card-foot"><span>Follow the questions</span><ArrowDownRight size={16} /></div>
            </Link>
          </Reveal>

          <Reveal className="home-bento-cell hb-cell-stack" delay={0.05}>
            <div className="hb-card hb-stack-card">
              <div className="hb-card-head"><span className="hb-icon"><Layers3 size={16} /></span><span className="hb-overline">04 / THE TOOLKIT</span></div>
              <h3>Small tools.<br /><em>Big systems.</em></h3>
              <div className="hb-stack-list">{featuredProject?.stack.map((item, index) => <motion.span key={item} initial={reduceMotion ? false : { opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>{item}</motion.span>)}</div>
              <p>Tools are the medium. Understanding is the craft.</p>
            </div>
          </Reveal>

          <Reveal className="home-bento-cell hb-cell-note" delay={0.1}>
            <div className="hb-card hb-note-card">
              <Sparkles className="hb-note-spark" size={17} />
              <p>THE THREAD THROUGH EVERYTHING</p>
              <blockquote>“{author.quote}”</blockquote>
              <span>— {author.name}</span>
              <div className="hb-note-rings" aria-hidden="true"><i /><i /><i /></div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
