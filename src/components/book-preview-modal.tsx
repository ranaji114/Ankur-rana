"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Book, books } from "@/data/content";
import { bookSanctuaryCatalog } from "@/data/book-sanctuary-content";
import { sound } from "@/lib/audio-haptics";

type ReadingTheme = "obsidian" | "parchment" | "sepia";
type ReadingTab = "prelude" | "axioms" | "synopsis";

type BookPreviewModalProps = {
  book: Book | null;
  onClose: () => void;
  onSelectBook?: (book: Book) => void;
};

export function BookPreviewModal({ book, onClose, onSelectBook }: BookPreviewModalProps) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<ReadingTheme>("obsidian");
  const [fontSerif, setFontSerif] = useState(true);
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");
  const [activeTab, setActiveTab] = useState<ReadingTab>("prelude");

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentIndex = book ? books.findIndex((b) => b.id === book.id) : -1;
  const prevBook = currentIndex > 0 ? books[currentIndex - 1] : books[books.length - 1];
  const nextBook = currentIndex >= 0 && currentIndex < books.length - 1 ? books[currentIndex + 1] : books[0];

  const handlePrevBook = useCallback(() => {
    if (!prevBook) return;
    sound.play("click");
    if (onSelectBook) {
      onSelectBook(prevBook);
    }
  }, [prevBook, onSelectBook]);

  const handleNextBook = useCallback(() => {
    if (!nextBook) return;
    sound.play("click");
    if (onSelectBook) {
      onSelectBook(nextBook);
    }
  }, [nextBook, onSelectBook]);

  useEffect(() => {
    if (!book) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && onSelectBook) {
        handlePrevBook();
      } else if (e.key === "ArrowRight" && onSelectBook) {
        handleNextBook();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [book, onClose, onSelectBook, handlePrevBook, handleNextBook]);

  if (!mounted || !book || typeof document === "undefined") return null;

  const sanctuary = bookSanctuaryCatalog[book.id];

  const modalContent = (
    <div
      className="book-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.play("click");
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-book-title"
    >
      <div className={`book-modal-box reader-sanctuary-box theme-${theme}`}>
        {/* Mobile Drag Indicator */}
        <div className="mobile-sheet-handle" aria-hidden="true" />

        {/* Sanctuary Top Control Bar */}
        <div className="sanctuary-top-bar">
          <div className="sanctuary-book-tag">
            <span className="sanctuary-tag-badge">
              {sanctuary?.badgeText || book.category.toUpperCase()}
            </span>
            <span className="sanctuary-tag-sub">Volume 0{currentIndex + 1} of 0{books.length}</span>
          </div>

          {/* Reader Preferences Bar */}
          <div className="sanctuary-controls">
            {/* Theme Switcher */}
            <div className="sanctuary-theme-pills" role="group" aria-label="Reading themes">
              <button
                type="button"
                className={`theme-pill pill-obsidian ${theme === "obsidian" ? "is-active" : ""}`}
                onClick={() => {
                  sound.play("click");
                  setTheme("obsidian");
                }}
                title="Obsidian (Dark Luxury)"
              >
                <span>Obsidian</span>
              </button>
              <button
                type="button"
                className={`theme-pill pill-parchment ${theme === "parchment" ? "is-active" : ""}`}
                onClick={() => {
                  sound.play("click");
                  setTheme("parchment");
                }}
                title="Parchment (Warm Antique Paper)"
              >
                <span>Parchment</span>
              </button>
              <button
                type="button"
                className={`theme-pill pill-sepia ${theme === "sepia" ? "is-active" : ""}`}
                onClick={() => {
                  sound.play("click");
                  setTheme("sepia");
                }}
                title="Sepia (Warm Reading Room)"
              >
                <span>Sepia</span>
              </button>
            </div>

            {/* Typography Controls */}
            <div className="sanctuary-font-controls">
              <button
                type="button"
                className={`font-toggle-btn ${fontSerif ? "is-active" : ""}`}
                onClick={() => {
                  sound.play("click");
                  setFontSerif(!fontSerif);
                }}
                title={fontSerif ? "Switch to Modern Sans" : "Switch to Editorial Serif"}
              >
                {fontSerif ? "Serif" : "Sans"}
              </button>

              <div className="font-size-group">
                <button
                  type="button"
                  className={`size-btn ${fontSize === "sm" ? "is-active" : ""}`}
                  onClick={() => setFontSize("sm")}
                  title="Smaller Text"
                >
                  A-
                </button>
                <button
                  type="button"
                  className={`size-btn ${fontSize === "md" ? "is-active" : ""}`}
                  onClick={() => setFontSize("md")}
                  title="Normal Text"
                >
                  A
                </button>
                <button
                  type="button"
                  className={`size-btn ${fontSize === "lg" ? "is-active" : ""}`}
                  onClick={() => setFontSize("lg")}
                  title="Larger Text"
                >
                  A+
                </button>
              </div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              className="book-modal-close sanctuary-close-btn"
              onClick={() => {
                sound.play("click");
                onClose();
              }}
              aria-label="Close reading sanctuary"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="sanctuary-content-layout">
          {/* Left Column: Physical Book Showcase & Metadata */}
          <div className="sanctuary-sidebar">
            <div className="sanctuary-cover-frame">
              <Image
                src={book.cover}
                alt={`${book.title} cover`}
                width={360}
                height={540}
                className="sanctuary-cover-img"
                priority
              />
              <div className="sanctuary-cover-glare" />
            </div>

            {/* Book Meta Details */}
            <div className="sanctuary-meta-box">
              <div className="sanctuary-meta-row">
                <span className="meta-label">Category</span>
                <span className="meta-val">{book.category}</span>
              </div>
              <div className="sanctuary-meta-row">
                <span className="meta-label">Reading Length</span>
                <span className="meta-val">{book.pages ? `${book.pages} Pages` : "Curated Volume"}</span>
              </div>
              <div className="sanctuary-meta-row">
                <span className="meta-label">Language</span>
                <span className="meta-val">{book.language || "English"}</span>
              </div>
              <div className="sanctuary-meta-row">
                <span className="meta-label">Published</span>
                <span className="meta-val">{book.publishDate || "Independent Edition"}</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="sanctuary-action-wrap">
              <a
                className="button-primary sanctuary-buy-btn"
                href={book.amazonUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.play("pop")}
              >
                Buy Kindle Edition on Amazon ↗
              </a>
              {book.previewUrl && book.previewUrl !== book.amazonUrl && (
                <a
                  className="button-secondary sanctuary-excerpt-btn"
                  href={book.previewUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.play("click")}
                >
                  Inspect Sample on Amazon ↗
                </a>
              )}
            </div>

            {/* Shelf Navigation Pill (Previous / Next Volume) */}
            {onSelectBook && (
              <div className="sanctuary-shelf-nav">
                <button
                  type="button"
                  className="shelf-nav-btn"
                  onClick={handlePrevBook}
                  title={`Previous: ${prevBook.title}`}
                >
                  ← Vol. 0{books.indexOf(prevBook) + 1}
                </button>
                <span className="shelf-nav-divider">|</span>
                <button
                  type="button"
                  className="shelf-nav-btn"
                  onClick={handleNextBook}
                  title={`Next: ${nextBook.title}`}
                >
                  Vol. 0{books.indexOf(nextBook) + 1} →
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Literary Reader Chamber */}
          <div className="sanctuary-reading-chamber">
            {/* Book Header */}
            <div className="sanctuary-header-block">
              <span className="sanctuary-eyebrow">{book.difficulty}</span>
              <h2
                id="modal-book-title"
                className={`sanctuary-title ${fontSerif ? "font-serif" : "font-sans"}`}
              >
                {book.title}
              </h2>
              <p className="sanctuary-subtitle">{book.subtitle}</p>

              {book.hook && (
                <blockquote className="sanctuary-quote-hook">
                  &ldquo;{book.hook}&rdquo;
                </blockquote>
              )}
            </div>

            {/* Content Tabs (Excerpt vs Axioms vs Synopsis) */}
            <div className="sanctuary-tab-strip" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "prelude"}
                className={`sanctuary-tab-btn ${activeTab === "prelude" ? "is-active" : ""}`}
                onClick={() => {
                  sound.play("click");
                  setActiveTab("prelude");
                }}
              >
                📖 Excerpt &amp; Prelude
                {sanctuary?.readingMinutes && (
                  <span className="tab-min-badge">{sanctuary.readingMinutes} min read</span>
                )}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "axioms"}
                className={`sanctuary-tab-btn ${activeTab === "axioms" ? "is-active" : ""}`}
                onClick={() => {
                  sound.play("click");
                  setActiveTab("axioms");
                }}
              >
                ✦ Key Philosophical Axioms ({sanctuary?.axioms?.length || book.whyRead.length})
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "synopsis"}
                className={`sanctuary-tab-btn ${activeTab === "synopsis" ? "is-active" : ""}`}
                onClick={() => {
                  sound.play("click");
                  setActiveTab("synopsis");
                }}
              >
                📜 Full Synopsis &amp; Themes
              </button>
            </div>

            {/* Tab 1: Excerpt & Prelude */}
            {activeTab === "prelude" && (
              <div
                className={`sanctuary-body-text ${fontSerif ? "font-serif" : "font-sans"} text-${fontSize}`}
              >
                {sanctuary?.sampleChapterTitle && (
                  <h4 className="sanctuary-chapter-heading">
                    {sanctuary.sampleChapterTitle}
                  </h4>
                )}

                <div className="sanctuary-paragraphs">
                  {(sanctuary?.prelude || book.description).split("\n\n").map((para, i) => (
                    <p key={i} className="sanctuary-para">
                      {para}
                    </p>
                  ))}
                </div>

                <div className="sanctuary-read-more-note">
                  <p>
                    ✦ This is a selected excerpt from <b>{book.title}</b>. The complete inquiry is available worldwide on Kindle.
                  </p>
                  <a
                    href={book.amazonUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="sanctuary-inline-link"
                  >
                    Open Kindle Reader on Amazon ↗
                  </a>
                </div>
              </div>
            )}

            {/* Tab 2: Key Axioms */}
            {activeTab === "axioms" && (
              <div
                className={`sanctuary-axioms-list ${fontSerif ? "font-serif" : "font-sans"} text-${fontSize}`}
              >
                <p className="axioms-intro">
                  Core conceptual takeaways and structural insights formulated in this volume:
                </p>

                <div className="axioms-grid">
                  {(sanctuary?.axioms || book.whyRead).map((axiom, idx) => (
                    <div key={idx} className="axiom-card">
                      <span className="axiom-num">0{idx + 1}</span>
                      <p className="axiom-text">&ldquo;{axiom}&rdquo;</p>
                    </div>
                  ))}
                </div>

                {book.themes && book.themes.length > 0 && (
                  <div className="sanctuary-themes-block">
                    <p className="themes-label">Associated Conceptual Threads:</p>
                    <div className="meta-row">
                      {book.themes.map((t) => (
                        <span key={t} className="theme-chip">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Synopsis & Intellectual Intent */}
            {activeTab === "synopsis" && (
              <div
                className={`sanctuary-synopsis-view ${fontSerif ? "font-serif" : "font-sans"} text-${fontSize}`}
              >
                <div className="sanctuary-synopsis-prose">
                  <h4 className="synopsis-title">About the Volume</h4>
                  <p className="sanctuary-para">{book.description}</p>
                </div>

                <div className="sanctuary-why-section">
                  <h4 className="synopsis-title">Why Read This Work</h4>
                  <div className="why-read-bullets">
                    {book.whyRead.map((item, idx) => (
                      <div key={idx} className="why-bullet-item">
                        <span className="why-bullet-icon">✦</span>
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
