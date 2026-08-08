"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { author } from "@/data/content";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/books", label: "Books" },
  { href: "/research", label: "Research" },
  { href: "/contact", label: "Contact" },
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

function SocialIcon({ platform }: { platform: "instagram" | "facebook" | "github" }) {
  if (platform === "github") return <GitHubIcon />;

  if (platform === "instagram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="social-icon">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="social-icon">
      <path
        fill="currentColor"
        stroke="none"
        d="M14.1 8.1V6.7c0-.7.5-.9.9-.9h2.2V2.2L14.1 2c-3.4 0-4.2 2.5-4.2 4.1v2H7.2v3.9h2.7V22h4.2V12h3.1l.5-3.9h-3.6Z"
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
  const currentYear = new Date().getFullYear();

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container-page header-inner">
          <Link className="brand-mark" href="/" onClick={() => setOpen(false)}>
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
            >
              <GitHubIcon />
            </a>
          </nav>

          <button
            className="menu-button"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        {open ? (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <div className="container-page mobile-nav-inner">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ))}
              <a
                href={author.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
              >
                GitHub
              </a>
            </div>
          </nav>
        ) : null}
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
              <Link href="/work">Work</Link>
              <Link href="/books">Books</Link>
              <Link href="/research">Research</Link>
              <Link href="/about">About</Link>
            </div>
          </div>

          <div>
            <p className="eyebrow">Connect</p>
            <div className="mt-4 grid gap-2">
              <a href={author.githubUrl} target="_blank" rel="noreferrer">GitHub</a>
              <Link href="/contact">Contact</Link>
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
