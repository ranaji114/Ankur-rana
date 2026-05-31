"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { author } from "@/data/content";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/books", label: "Books" },
  { href: "/research", label: "Research" },
  { href: "/contact", label: "Contact" },
];

function SocialIcon({ platform }: { platform: "instagram" | "facebook" }) {
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
            <span className="brand-role">{author.role}</span>
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
              <span className="brand-role">{author.role}</span>
            </Link>
            <p className="body-copy mt-5 max-w-xl">{author.shortBio}</p>
          </div>

          <div>
            <p className="eyebrow">Navigate</p>
            <div className="mt-4 grid gap-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow">Actions</p>
            <div className="mt-4 grid gap-2">
              <a href={author.amazonAuthorUrl} target="_blank" rel="noreferrer">
                Amazon Kindle Books
              </a>
              <Link href="/books">Book Catalog</Link>
            </div>
          </div>

          <div>
            <p className="eyebrow">Follow</p>
            <div className="social-links mt-4">
              {author.socialLinks.map((link) => (
                <a
                  key={link.label}
                  className="social-link"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                >
                  <SocialIcon platform={link.platform} />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="container-page footer-bottom">
          <p>© {currentYear} {author.name}. All rights reserved.</p>
          <p>Books, research, and writing by {author.name}.</p>
        </div>
      </footer>
    </div>
  );
}
