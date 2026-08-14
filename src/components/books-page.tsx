"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";
import { BookVaultCard } from "@/components/book-vault-card";
import { BookPreviewModal } from "@/components/book-preview-modal";
import { sound } from "@/lib/audio-haptics";
import { author, books, categories, readingPaths, Book } from "@/data/content";

const pathLabels = {
  curiousMinds: "Curious Minds",
  selfGrowth: "Self Growth",
  relationships: "Relationships",
  cultureAndLanguage: "Culture & Language",
};

const getBookTitle = (id: string) => books.find((book) => book.id === id)?.title ?? id;

export function BooksPage() {
  const [previewBook, setPreviewBook] = useState<Book | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const latestBook = books.find((b) => b.isLatest) || books[0];
  const filteredBooks = selectedCategory === "All"
    ? books
    : books.filter((b) => b.category === selectedCategory);

  const handleCategoryFilter = (cat: string) => {
    sound.play("click");
    setSelectedCategory(cat);
  };

  return (
    <SiteShell>
      {/* Interactive Quick Preview Modal */}
      <BookPreviewModal book={previewBook} onClose={() => setPreviewBook(null)} />

      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">The Complete Catalog</p>
            <h1 className="page-title mt-5">Seven published books.</h1>
            <p className="body-large mt-6" style={{ maxWidth: "720px" }}>
              A connected intellectual universe spanning cosmology and time, cognitive perception,
              digital minimalism, relationships, Hindi poetry, and the Awadhi language.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Latest Release Feature ── */}
      {latestBook && (
        <section className="section" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="container-page">
            <Reveal>
              <SectionHeading
                eyebrow="Flagship Release — July 2026"
                title="The newest inquiry into understanding."
              />
            </Reveal>
            <Reveal delay={0.06}>
              <div style={{ marginTop: "2.5rem", maxWidth: "920px" }}>
                <BookVaultCard
                  book={latestBook}
                  onPreview={(b) => setPreviewBook(b)}
                />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Interactive Categories Filter ── */}
      <section className="section" style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Explore by Domain"
              title="Six areas of inquiry, one unified worldview."
            />
          </Reveal>
          <div className="meta-row mt-8">
            <button
              type="button"
              className={`theme-chip ${selectedCategory === "All" ? "button-primary" : ""}`}
              style={{ cursor: "pointer", border: "none" }}
              onClick={() => handleCategoryFilter("All")}
            >
              All 7 Titles ({books.length})
            </button>
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={`theme-chip ${selectedCategory === category ? "button-primary" : ""}`}
                style={{ cursor: "pointer", border: "none" }}
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Curated Reading Paths ── */}
      <section className="section" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Curated Reading Sequences"
              title="Where should you start? Choose your path."
              copy="Sequential reading paths tailored to reader intent."
            />
          </Reveal>
          <div className="reading-path-grid mt-12">
            {Object.entries(readingPaths).map(([key, ids]) => (
              <Reveal key={key}>
                <article
                  className="path-card"
                  onClick={() => {
                    const firstId = ids[0];
                    const target = books.find((b) => b.id === firstId);
                    if (target) {
                      sound.play("pop");
                      setPreviewBook(target);
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <p className="eyebrow">{pathLabels[key as keyof typeof pathLabels]}</p>
                  <ol style={{ marginTop: "1.4rem", display: "grid", gap: "0.85rem", color: "var(--muted)", listStylePosition: "inside" }}>
                    {ids.map((id) => (
                      <li key={id} style={{ fontWeight: 600 }}>{getBookTitle(id)}</li>
                    ))}
                  </ol>
                  <span style={{ display: "block", marginTop: "1.2rem", fontSize: "0.75rem", color: "var(--accent)", fontWeight: 700 }}>
                    Click to preview starting title →
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── All Books Vault Grid ── */}
      <section className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Full Vault"
              title={selectedCategory === "All" ? "All 7 Published Titles" : `${selectedCategory} Titles`}
            />
          </Reveal>
          <div className="grid gap-8 mt-12">
            {filteredBooks.map((book, index) => (
              <Reveal key={book.id} delay={index * 0.03}>
                <BookVaultCard
                  book={book}
                  onPreview={(b) => setPreviewBook(b)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Amazon Direct CTA ── */}
      <section className="section" style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
        <div className="container-page split-grid">
          <Reveal>
            <SectionHeading
              eyebrow="Amazon Kindle"
              title="All books available worldwide on Amazon."
              copy="Instant download available across Kindle readers, iOS, Android, and Web."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div style={{ marginTop: "1rem" }}>
              <a
                className="button-primary"
                href={author.amazonAuthorUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.play("pop")}
              >
                Visit Amazon Author Page ↗
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
