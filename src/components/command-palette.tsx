"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { sound } from "@/lib/audio-haptics";
import { themeManager } from "@/lib/theme";
import { author, books, projects, researchPapers } from "@/data/content";

type CommandItem = {
  id: string;
  title: string;
  category: "Navigation" | "Projects" | "Books" | "Research" | "Actions";
  subtitle?: string;
  action: () => void;
  badge?: string;
};

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        sound.play("pop");
        onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const items: CommandItem[] = [
    // Actions
    {
      id: "action-email",
      title: copied ? "✓ Email Copied to Clipboard!" : `Copy Email (${author.email})`,
      category: "Actions",
      subtitle: "Instant clipboard copy",
      badge: "Action",
      action: () => {
        navigator.clipboard.writeText(author.email);
        setCopied(true);
        sound.play("chime");
        setTimeout(() => setCopied(false), 2000);
      },
    },
    {
      id: "action-theme",
      title: "Toggle Theme (Obsidian / Pearl)",
      category: "Actions",
      subtitle: "Switch visual lighting mode",
      badge: "Theme",
      action: () => {
        themeManager.toggleTheme();
        sound.play("switch");
        onClose();
      },
    },
    {
      id: "action-github",
      title: "Open GitHub Profile (ranaji114)",
      category: "Actions",
      subtitle: "View repositories, commits, and open source",
      badge: "External",
      action: () => {
        window.open(author.githubUrl, "_blank");
        onClose();
      },
    },
    ...(author.linkedinUrl ? [{
      id: "action-linkedin",
      title: "Open LinkedIn Profile (Ankur Rana)",
      category: "Actions" as const,
      subtitle: "Connect and network on LinkedIn",
      badge: "External",
      action: () => {
        window.open(author.linkedinUrl, "_blank");
        onClose();
      },
    }] : []),

    // Navigation
    {
      id: "nav-home",
      title: "Home",
      category: "Navigation",
      subtitle: "Hero, Overview & Highlights",
      action: () => { router.push("/"); onClose(); },
    },
    {
      id: "nav-work",
      title: "Work & Engineering Projects",
      category: "Navigation",
      subtitle: "All 4 software projects",
      action: () => { router.push("/work"); onClose(); },
    },
    {
      id: "nav-books",
      title: "Books Vault",
      category: "Navigation",
      subtitle: "All 7 published Kindle titles",
      action: () => { router.push("/books"); onClose(); },
    },
    {
      id: "nav-research",
      title: "Independent Research",
      category: "Navigation",
      subtitle: "Quantum & Time papers on Zenodo",
      action: () => { router.push("/research"); onClose(); },
    },
    {
      id: "nav-about",
      title: "About & Philosophy",
      category: "Navigation",
      subtitle: "Author bio, workflow, and skills",
      action: () => { router.push("/about"); onClose(); },
    },
    {
      id: "nav-contact",
      title: "Contact & Enquiry",
      category: "Navigation",
      subtitle: "Send a direct message",
      action: () => { router.push("/contact"); onClose(); },
    },

    // Projects
    ...projects.map((p) => ({
      id: `proj-${p.slug}`,
      title: p.title,
      category: "Projects" as const,
      subtitle: p.tagline,
      badge: p.status.toUpperCase(),
      action: () => { router.push(`/work/${p.slug}`); onClose(); },
    })),

    // Books
    ...books.map((b) => ({
      id: `book-${b.id}`,
      title: b.title,
      category: "Books" as const,
      subtitle: `${b.category} · ${b.difficulty}`,
      badge: "Kindle",
      action: () => { router.push(`/books#${b.id}`); onClose(); },
    })),

    // Research
    ...researchPapers.map((r) => ({
      id: `research-${r.id}`,
      title: r.title,
      category: "Research" as const,
      subtitle: r.type,
      badge: "Zenodo",
      action: () => { window.open(r.url, "_blank"); onClose(); },
    })),
  ];

  const filtered = items.filter((item) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
      item.category.toLowerCase().includes(q)
    );
  });

  if (!isOpen) return null;

  return (
    <div
      className="cmd-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.play("click");
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cmd-search-input"
    >
      <div className="cmd-modal">
        {/* Search Input Box */}
        <div className="cmd-input-row">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--muted)" }}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            id="cmd-search-input"
            type="text"
            className="cmd-search-input"
            placeholder="Search projects, books, research, or type an action..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <kbd className="cmd-kbd-badge">ESC</kbd>
        </div>

        {/* Results List */}
        <div className="cmd-list">
          {filtered.length === 0 ? (
            <p style={{ padding: "1.5rem", color: "var(--muted)", textAlign: "center", fontSize: "0.9rem" }}>
              No results found for &ldquo;{query}&rdquo;
            </p>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="cmd-option"
                onClick={() => {
                  sound.play("click");
                  item.action();
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{item.title}</div>
                  {item.subtitle && (
                    <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "2px" }}>
                      {item.subtitle}
                    </div>
                  )}
                </div>
                {item.badge && (
                  <span className="meta-chip" style={{ fontSize: "0.68rem", padding: "0.2rem 0.45rem" }}>
                    {item.badge}
                  </span>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer info bar */}
        <div className="cmd-footer-bar">
          <span>Navigate with mouse or touch</span>
          <span><b>Cmd + K</b> to toggle</span>
        </div>
      </div>
    </div>
  );
}
