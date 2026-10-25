"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, BookOpen, Braces, Code2, Mail, Network, Orbit, Search, Sparkles, Volume2, VolumeX, X, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { aiWorkflowSteps, author, books, projects, publicationTimeline, researchPapers, researchTopics, skillCategories } from "@/data/content";
import { AmbientBackground } from "@/components/ambient-background";
import { ThemeToggle } from "@/components/theme-toggle";
import { PaletteToggle } from "@/components/palette-toggle";
import { ExperienceToggle } from "@/components/experience-toggle";
import { CommandPalette } from "@/components/command-palette";
import { sound } from "@/lib/audio-haptics";

const branches = [
  { id: "work", title: "Work & Systems", meta: "05 PROJECTS", x: 17, y: 24, icon: Code2 },
  { id: "research", title: "Research", meta: "02 PAPERS", x: 50, y: 13, icon: Orbit },
  { id: "ai", title: "AI Guide", meta: "ASK ABOUT ANKUR", x: 50, y: 34, icon: Sparkles },
  { id: "books", title: "Books", meta: "07 TITLES", x: 83, y: 24, icon: BookOpen },
  { id: "about", title: "About", meta: "THE THINKING", x: 17, y: 75, icon: Network },
  { id: "stack", title: "Tech Stack", meta: "TOOLS & CRAFT", x: 50, y: 86, icon: Braces },
  { id: "contact", title: "Contact", meta: "START A CONVERSATION", x: 83, y: 75, icon: Mail },
] as const;

type BranchId = (typeof branches)[number]["id"];
type TreeChild = { id: string; title: string; meta: string; icon: LucideIcon };

export function PortfolioTree() {
  const [treeRevealed, setTreeRevealed] = useState(false);
  const [expandedBranch, setExpandedBranch] = useState<BranchId | null>(null);
  const [selectedChild, setSelectedChild] = useState<TreeChild | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const soundActive = useSyncExternalStore((callback) => sound.subscribe(callback), () => sound.isEnabled(), () => false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (selectedChild) setSelectedChild(null);
      else setExpandedBranch(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedChild]);

  const expanded = branches.find((branch) => branch.id === expandedBranch);
  const childNodes = expandedBranch ? getTreeChildren(expandedBranch) : [];

  return (
    <main className="portfolio-tree-page">
      <AmbientBackground />
      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <header className="tree-header">
        <a href="#home" className="tree-brand" onClick={() => { setSelectedChild(null);setExpandedBranch(null);setTreeRevealed(false); }}>
          <span className="tree-brand-mark">AR</span>
          <span>Ankur Rana<small>PERSONAL UNIVERSE · 2026</small></span>
        </a>
        <div className="tree-header-actions">
          <span className="tree-live"><i /> AVAILABLE FOR SELECT PROJECTS</span>
          <button type="button" className="tree-utility-button" aria-label="Search the portfolio" title="Search the portfolio" onClick={() => setSearchOpen(true)}><Search size={16}/></button>
          <button type="button" className="tree-utility-button" aria-label={soundActive ? "Mute UI sounds" : "Enable UI sounds"} title={soundActive ? "Mute UI sounds" : "Enable UI sounds"} onClick={() => sound.toggle()}>{soundActive ? <Volume2 size={16}/> : <VolumeX size={16}/>}</button>
          <PaletteToggle />
          <ThemeToggle />
          <ExperienceToggle />
        </div>
      </header>

      <div className="tree-intro" id="home">
        <p className="tree-kicker"><span>01</span> A LIVING MAP OF IDEAS, SYSTEMS & STORIES</p>
        <h1>One mind.<br /><em>Many branches.</em></h1>
        <p className="tree-subtitle">I build software, explore difficult questions, and write things worth keeping. Follow a branch to explore.</p>
      </div>

      <section className="tree-stage-wrap" aria-label="Interactive portfolio tree">
        <div
          className={`tree-stage ${treeRevealed ? "is-revealed" : ""} ${expandedBranch ? "has-expanded-branch" : ""}`}
        >
          <div className="tree-spatial-plane">
            <div className="tree-aura tree-aura-one" />
            <div className="tree-aura tree-aura-two" />
            <div className={`tree-diagram ${treeRevealed ? "is-revealed" : ""}`}>
            <svg className={`tree-connections ${treeRevealed ? "is-visible" : ""}`} viewBox="0 0 1200 760" preserveAspectRatio="none" aria-hidden="true">
              <defs><linearGradient id="branch-line" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--tree-accent)" stopOpacity=".12"/><stop offset="52%" stopColor="var(--tree-accent)" stopOpacity=".72"/><stop offset="100%" stopColor="var(--tree-accent)" stopOpacity=".2"/></linearGradient><filter id="branch-glow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
              <path className="tree-trunk" d="M600 430 C600 500 600 585 600 700"/>
              {branches.map((branch) => {
                const originalX = branch.x * 12;
                const targetPercent = branch.id === expandedBranch ? (branch.x < 50 ? 37 : branch.x > 50 ? 63 : branch.id === "ai" ? 65 : 35) : branch.x;
                const targetX = targetPercent * 12;
                const targetY = branch.y * 7.6;
                const path = `M600 430 C${600 + (targetX - 600) * .35} 350 ${600 + (targetX - 600) * .78} ${targetY + 55} ${targetX} ${targetY}`;
                return <path key={branch.id} d={path} data-branch-line={branch.id} data-original-x={originalX}/>;
              })}
              {branches.map((branch) => {
                const targetPercent = branch.id === expandedBranch ? (branch.x < 50 ? 37 : branch.x > 50 ? 63 : branch.id === "ai" ? 65 : 35) : branch.x;
                const targetX = targetPercent * 12;
                const targetY = branch.y * 7.6;
                const path = `M600 430 C${600 + (targetX - 600) * .35} 350 ${600 + (targetX - 600) * .78} ${targetY + 55} ${targetX} ${targetY}`;
                return <circle key={branch.id} className="tree-pulse" r="3"><animateMotion dur={`${4 + branches.indexOf(branch) * .45}s`} begin={`${branches.indexOf(branch) * -.6}s`} repeatCount="indefinite" path={path}/></circle>;
              })}
            </svg>
            <div className="tree-root-level">
            <div className="tree-node tree-root-node">
              <div className="tree-root-orbit" aria-hidden="true"><i/><i/><i/></div>
              <button type="button" className={`tree-root-card ${treeRevealed ? "is-grown" : "is-seed"}`} aria-label={treeRevealed ? "Hide the portfolio branches" : "Reveal all portfolio branches"} aria-expanded={treeRevealed} aria-controls="tree-primary-nodes" onClick={() => {
                sound.play("click");
                setSelectedChild(null);
                setExpandedBranch(null);
                setTreeRevealed((current) => !current);
              }}>
                <span className="tree-root-avatar"><Image src={author.portrait} alt="" fill sizes="72px" priority /></span>
                <span className="tree-root-copy"><b>ANKUR RANA</b><small>DEVELOPER · AUTHOR · RESEARCHER</small></span>
                <span className="tree-root-status">{treeRevealed ? "ROOT NODE" : "TAP TO GROW"}</span>
              </button>
            </div>
            </div>

            {treeRevealed && <div id="tree-primary-nodes" className="tree-primary-level">
            {branches.map((branch, index) => {
              const Icon = branch.icon;
              return (
                <section key={branch.id} className={`tree-node-group ${expandedBranch === branch.id ? "is-expanded" : ""}`} data-branch={branch.id} style={{ left: `${expandedBranch === branch.id ? (branch.x < 50 ? 37 : branch.x > 50 ? 63 : branch.id === "ai" ? 65 : 35) : branch.x}%`, top: `${branch.y}%`, "--node-index": index } as React.CSSProperties}>
                  <button type="button" className={`tree-node tree-branch-node ${expandedBranch === branch.id ? "is-active" : ""}`} onClick={() => {
                      sound.play("click");
                      setSelectedChild(null);
                      setExpandedBranch((current) => current === branch.id ? null : branch.id);
                    }}
                    aria-expanded={expandedBranch === branch.id}
                    aria-controls={expandedBranch === branch.id ? `tree-child-${branch.id}` : undefined}
                    aria-label={`${branch.title}: ${branch.meta}. Click to show its nodes.`}
                  >
                    <span className="tree-node-icon"><Icon size={16} strokeWidth={1.6} /></span>
                    <span className="tree-node-copy"><b>{branch.title}</b><small>{branch.meta}</small></span>
                    <ArrowDownRight className="tree-node-arrow" size={14} />
                  </button>
                  {expandedBranch === branch.id && <div id={`tree-child-${branch.id}`} className="tree-child-constellation" aria-label={`${branch.title} nodes`}>
                    <div className="tree-child-heading"><small>{branch.title} / NODES</small><span>{String(childNodes.length).padStart(2,"0")}</span></div>
                    <div className="tree-child-grid">
                      {childNodes.map((child,childIndex) => {
                        const ChildIcon = child.icon;
                        return <button key={child.id} type="button" className="tree-child-node" style={{ "--child-index": childIndex } as React.CSSProperties} onClick={() => { sound.play("click");setSelectedChild(child); }}>
                          <span className="tree-child-icon"><ChildIcon size={15}/></span><span className="tree-child-copy"><b>{child.title}</b><small>{child.meta}</small></span><ArrowUpRight className="tree-child-open" size={14}/>
                        </button>;
                      })}
                    </div>
                  </div>}
                </section>
              );
            })}
            </div>}
            </div>
            <div className="tree-canopy-glow" aria-hidden="true" />
            <div className="tree-particle-field" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
          </div>
        </div>
      </section>

      <footer className="tree-footer">
        <span><kbd>{expanded ? "CHOOSE" : "CLICK"}</kbd> {expanded ? "A NODE TO OPEN ITS DETAILS" : treeRevealed ? "A BRANCH TO REVEAL ITS CHILD NODES" : "THE ROOT TO GROW THE TREE"}</span>
        <span>SOFTWARE <i/> IDEAS <i/> STORIES</span>
        <a href={`mailto:${author.email}`}>LET&apos;S CONNECT <ArrowUpRight size={13}/></a>
      </footer>

      {selectedChild && expanded && <>
        <button className="tree-drawer-scrim" aria-label="Close details" onClick={() => setSelectedChild(null)} />
        <aside id="tree-branch-drawer" className="tree-drawer" aria-label={`${selectedChild.title} details`}>
          <div className="tree-drawer-top"><span><i/> {expanded.title.toUpperCase()} / NODE DETAILS</span><button onClick={() => setSelectedChild(null)} aria-label="Close details"><X size={18}/></button></div>
          <div className="tree-drawer-heading"><p>{selectedChild.meta}</p><h2>{selectedChild.title}</h2></div>
          <div className="tree-drawer-content">{renderTreeChild(expandedBranch!, selectedChild.id, () => setSelectedChild(null))}</div>
          <div className="tree-drawer-foot"><span>CONNECTED TO ANKUR RANA</span><Network size={15}/></div>
        </aside>
      </>}
    </main>
  );
}

function getTreeChildren(id: BranchId): TreeChild[] {
  if (id === "work") return projects.map((item) => ({ id: item.id, title: item.title, meta: item.number, icon: Code2 }));
  if (id === "research") return researchPapers.map((item) => ({ id: item.id, title: item.title, meta: `${item.type} · ${item.publication}`, icon: Orbit }));
  if (id === "books") return books.map((item) => ({ id: item.id, title: item.title, meta: `${item.category} · ${item.difficulty}`, icon: BookOpen }));
  if (id === "about") return [
    { id: "biography", title: "Biography", meta: "THE STORY SO FAR", icon: Network },
    { id: "philosophy", title: "Philosophy", meta: "HOW I THINK", icon: Orbit },
    { id: "workflow", title: "How I work", meta: "FROM IDEA TO PRODUCT", icon: Braces },
    { id: "ideas", title: "Ideas I return to", meta: "RESEARCH THEMES", icon: Sparkles },
    { id: "timeline", title: "Publication timeline", meta: "WORK & WRITING", icon: BookOpen },
  ];
  if (id === "stack") return skillCategories.map((item) => ({ id: item.label, title: item.label, meta: `${item.skills.length} TOOLS & SKILLS`, icon: Braces }));
  if (id === "contact") return [
    { id: "email", title: "Email Ankur", meta: author.email, icon: Mail },
    ...author.socialLinks.map((item) => ({ id: item.label, title: item.label, meta: "OPEN PROFILE", icon: Network })),
  ];
  return [{ id: "guide", title: "Ankur’s AI Guide", meta: "VOICE + TEXT ASSISTANT", icon: Sparkles }];
}

function renderTreeChild(branch: BranchId, childId: string, close: () => void) {
  if (branch === "work") {
    const project = projects.find((item) => item.id === childId);
    if (!project) return null;
    return <article className="tree-selected-detail"><p>{project.tagline}</p><div className="tree-tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="tree-detail-links">{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">LIVE PROJECT <ArrowUpRight size={13}/></a>}{project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer"><Code2 size={13}/> SOURCE</a>}</div><p>{project.description}</p>{project.sections.map((section) => <section className="tree-selected-section" key={section.id}><h3>{section.label}</h3><p>{section.content}</p></section>)}<h3 className="tree-subsection-title">Key highlights</h3><ul>{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul>{project.architecture && <><h3 className="tree-subsection-title">Architecture</h3><p>{project.architecture.join(" → ")}</p></>}{project.features.length > 0 && <><h3 className="tree-subsection-title">Built-in features</h3><ul>{project.features.map((item) => <li key={item.title}><b>{item.title}:</b> {item.description}</li>)}</ul></>}<h3 className="tree-subsection-title">Challenges & learning</h3><ul>{[...project.challenges,...project.learned].map((item) => <li key={item}>{item}</li>)}</ul></article>;
  }
  if (branch === "research") {
    const paper = researchPapers.find((item) => item.id === childId);
    return paper ? <article className="tree-selected-detail"><span className="tree-detail-eyebrow">{paper.type} · {paper.publication}</span><p>{paper.summary}</p><a className="tree-detail-cta" href={paper.url} target="_blank" rel="noreferrer">READ THE PAPER <ArrowUpRight size={13}/></a></article> : null;
  }
  if (branch === "books") {
    const book = books.find((item) => item.id === childId);
    return book ? <article className="tree-selected-detail"><div className="tree-selected-book-cover"><Image src={book.cover} alt={`${book.title} cover`} fill sizes="160px"/></div><p className="tree-book-subtitle">{book.subtitle}</p><p>{book.hook}</p><p>{book.description}</p><div className="tree-tags">{book.themes.map((theme) => <span key={theme}>{theme}</span>)}</div><h3 className="tree-subsection-title">Why read it</h3><ul>{book.whyRead.map((reason) => <li key={reason}>{reason}</li>)}</ul><a className="tree-detail-cta" href={book.amazonUrl} target="_blank" rel="noreferrer">VIEW BOOK <ArrowUpRight size={13}/></a></article> : null;
  }
  if (branch === "about") {
    if (childId === "biography") return <article className="tree-selected-detail"><blockquote>“{author.quote}”</blockquote><p>{author.longBio}</p></article>;
    if (childId === "philosophy") return <article className="tree-selected-detail"><p>{author.philosophy}</p><div className="tree-tags"><span>PRODUCT THINKING</span><span>SYSTEMS ENGINEERING</span><span>INDEPENDENT RESEARCH</span></div></article>;
    if (childId === "workflow") return <article className="tree-selected-detail"><p>{author.devBio}</p><div className="tree-workflow-list">{aiWorkflowSteps.map((step) => <section key={step.step}><span>{step.step}</span><div><b>{step.label}</b><p>{step.description}</p></div></section>)}</div></article>;
    if (childId === "ideas") return <div className="tree-detail-list">{researchTopics.map((topic) => <article className="tree-topic-row" key={topic.title}><h3>{topic.title}</h3><p>{topic.description}</p></article>)}</div>;
    return <div className="tree-detail-list">{publicationTimeline.map((item) => <article className="tree-topic-row" key={`${item.year}-${item.title}`}><span className="tree-detail-eyebrow">{item.year}</span><h3>{item.title}</h3><p>{item.note}</p></article>)}</div>;
  }
  if (branch === "stack") {
    const group = skillCategories.find((item) => item.label === childId);
    return group ? <article className="tree-selected-detail"><p>Tools and skills I use within {group.label.toLowerCase()}.</p><div className="tree-tags tree-selected-tags">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></article> : null;
  }
  if (branch === "contact") {
    if (childId === "email") return <div className="tree-contact-card"><span className="tree-contact-orbit"><Mail size={34}/></span><h3>Let’s talk.</h3><p>Send a note about software, research, writing, or a thoughtful collaboration.</p><a className="tree-contact-button" href={`mailto:${author.email}`} onClick={close}><Mail size={15}/> EMAIL ANKUR <ArrowUpRight size={14}/></a></div>;
    const social = author.socialLinks.find((item) => item.label === childId);
    return social ? <div className="tree-contact-card"><span className="tree-contact-orbit"><Network size={34}/></span><h3>Find Ankur on {social.label}.</h3><p>Open the profile in a new tab.</p><a className="tree-contact-button" href={social.href} target="_blank" rel="noreferrer" onClick={close}>OPEN {social.label.toUpperCase()} <ArrowUpRight size={14}/></a></div> : null;
  }
  return <div className="tree-contact-card tree-ai-card"><span className="tree-contact-orbit"><Sparkles size={38}/></span><h3>Ask the portfolio guide.</h3><p>Explore Ankur’s software, research, books, and ideas through a voice or text conversation.</p><Link className="tree-contact-button" href="/ai" onClick={close}><Sparkles size={15}/> OPEN AI GUIDE <ArrowUpRight size={14}/></Link><span className="tree-ai-note">VOICE + TEXT · PORTFOLIO CONTEXT</span></div>;
}
