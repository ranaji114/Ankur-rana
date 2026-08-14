"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { author } from "@/data/content";
import { ThemeToggle } from "@/components/theme-toggle";
import { AmbientBackground } from "@/components/ambient-background";
import { CommandPalette } from "@/components/command-palette";
import { ScrollProgress } from "@/components/scroll-progress";
import { sound } from "@/lib/audio-haptics";

const navItems = [
  { href: "/", label: "Home", subtitle: "Hero & Key Highlights" },
  { href: "/work", label: "Work & Systems", subtitle: "Ezra & Software Case Studies" },
  { href: "/about", label: "About & Philosophy", subtitle: "My Story & AI Workflow" },
  { href: "/books", label: "Books Vault", subtitle: "7 Published Kindle Titles" },
  { href: "/research", label: "Zenodo Research", subtitle: "Quantum & Temporal Inquiries" },
  { href: "/contact", label: "Contact", subtitle: "Send a Direct Message" },
];

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="social-icon">
      <path
        fill="currentColor"
        stroke="none"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="social-icon">
      <path
        fill="currentColor"
        stroke="none"
        d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"
      />
    </svg>
  );
}

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const currentYear = new Date().getFullYear();

  const soundActive = useSyncExternalStore(
    (callback) => sound.subscribe(callback),
    () => sound.isEnabled(),
    () => false
  );

  const handleToggleSound = () => {
    sound.toggle();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(author.email);
    setCopied(true);
    sound.play("chime");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="site-shell">
      {/* Top Scroll Laser Progress Bar */}
      <ScrollProgress />

      {/* Ambient background aura & lighting */}
      <AmbientBackground />

      {/* Global Command Palette (Cmd+K) */}
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />

      <header className="site-header">
        <div className="container-page header-inner">
          <Link
            className="brand-mark"
            href="/"
            onClick={() => {
              sound.play("click");
              setOpen(false);
            }}
          >
            <span className="brand-name">{author.name}</span>
            <span className="brand-role">Developer · Author · Researcher</span>
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => {
              const active =
                item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  className={`nav-link ${active ? "nav-link-active" : ""}`}
                  href={item.href}
                  onClick={() => sound.play("click")}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={author.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="nav-link"
              aria-label="GitHub profile"
              onClick={() => sound.play("click")}
              title="GitHub Profile"
            >
              <GitHubIcon />
            </a>
            {author.linkedinUrl && (
              <a
                href={author.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="nav-link"
                aria-label="LinkedIn profile"
                onClick={() => sound.play("click")}
                title="LinkedIn Profile"
              >
                <LinkedInIcon />
              </a>
            )}
          </nav>

          {/* Header Action Tools */}
          <div className="header-actions">
            {/* Cmd+K trigger */}
            <button
              type="button"
              className="cmd-trigger-btn"
              onClick={() => {
                sound.play("pop");
                setCmdOpen(true);
              }}
              title="Search and actions (Cmd + K)"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <span className="cmd-kbd-badge">⌘K</span>
            </button>

            {/* Audio Haptics Toggle */}
            <button
              type="button"
              className={`audio-toggle-btn ${soundActive ? "active" : ""}`}
              onClick={handleToggleSound}
              title={soundActive ? "Mute UI sounds" : "Enable tactile UI sounds"}
              aria-label="Toggle UI sounds"
            >
              {soundActive ? "🔊" : "🔈"}
            </button>

            {/* Theme Toggle (Obsidian / Pearl) */}
            <ThemeToggle />

            {/* Mobile Animated Hamburger Button */}
            <button
              className={`menu-button ${open ? "menu-button-open" : ""}`}
              type="button"
              onClick={() => {
                sound.play("pop");
                setOpen((value) => !value);
              }}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span>{open ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        {/* ── Ultra-Luxury Full-Screen Mobile Glass Sheet ── */}
        {open && (
          <div className="mobile-sheet-overlay" role="dialog" aria-modal="true">
            <div className="container-page mobile-sheet-content">
              <p className="eyebrow" style={{ color: "var(--accent)" }}>Navigation</p>
              
              <div className="mobile-links-list">
                {navItems.map((item) => {
                  const active =
                    item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`mobile-link-item ${active ? "mobile-link-active" : ""}`}
                      onClick={() => {
                        sound.play("click");
                        setOpen(false);
                      }}
                    >
                      <div className="mobile-link-title">{item.label}</div>
                      <div className="mobile-link-sub">{item.subtitle}</div>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Quick Action Strip */}
              <div className="mobile-sheet-actions">
                <button
                  type="button"
                  className="mobile-action-pill"
                  onClick={handleCopyEmail}
                >
                  <span>✉</span>
                  <span>{copied ? "✓ Copied!" : "Copy Email"}</span>
                </button>

                <a
                  href={author.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mobile-action-pill"
                  onClick={() => sound.play("click")}
                >
                  <GitHubIcon />
                  <span>GitHub</span>
                </a>

                {author.linkedinUrl && (
                  <a
                    href={author.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mobile-action-pill"
                    onClick={() => sound.play("click")}
                  >
                    <LinkedInIcon />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div className="container-page footer-grid">
          <div>
            <Link className="brand-mark" href="/">
              <span className="brand-name">{author.name}</span>
              <span className="brand-role">Developer · Author · Researcher</span>
            </Link>
            <p className="body-copy mt-5 max-w-xl">{author.shortBio}</p>
          </div>

          <div>
            <p className="eyebrow">Explore</p>
            <div className="mt-4 grid gap-2">
              <Link href="/work" onClick={() => sound.play("click")}>Work &amp; Engineering</Link>
              <Link href="/books" onClick={() => sound.play("click")}>Books Vault</Link>
              <Link href="/research" onClick={() => sound.play("click")}>Zenodo Research</Link>
              <Link href="/about" onClick={() => sound.play("click")}>About &amp; Philosophy</Link>
            </div>
          </div>

          <div>
            <p className="eyebrow">Connect</p>
            <div className="mt-4 grid gap-2">
              <a href={author.githubUrl} target="_blank" rel="noreferrer">GitHub</a>
              <Link href="/contact" onClick={() => sound.play("click")}>Contact Form</Link>
              {author.socialLinks.filter(l => l.platform !== "github").map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="container-page footer-bottom">
          <p>© {currentYear} {author.name}. All rights reserved.</p>
          <p>Building software, exploring ideas, and turning curiosity into working products.</p>
        </div>
      </footer>
    </div>
  );
}
