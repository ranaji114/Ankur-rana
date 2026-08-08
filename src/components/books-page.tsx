"use client";

import Image from "next/image";
import { BookCard } from "@/components/book-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";
import { author, books, categories, readingPaths } from "@/data/content";

const pathLabels = {
  curiousMinds: "Curious Minds",
  selfGrowth: "Self Growth",
  relationships: "Relationships",
  cultureAndLanguage: "Culture & Language",
};

const getBookTitle = (id: string) => books.find((book) => book.id === id)?.title ?? id;

export function BooksPage() {
  const latestBook = books.find((b) => b.isLatest);
  const otherBooks = books.filter((b) => !b.isLatest);

  return (
    <SiteShell>
      <section className="page-hero">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Books</p>
            <h1 className="page-title mt-5">Seven published books.</h1>
            <p className="body-large mt-6" style={{ maxWidth: "680px" }}>
              A catalog spanning time, reality, attention, relationships, Hindi poetry, and language —
              each book a distinct entry point into a connected body of thought.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Latest Release ── */}
      {latestBook && (
        <section className="section border-b border-[#E5E5E5]">
          <div className="container-page">
            <Reveal>
              <SectionHeading
                eyebrow="Latest Release"
                title="The newest book — July 2026."
              />
            </Reveal>
            <Reveal delay={0.06}>
              <article
                className="book-card"
                id={latestBook.id}
                style={{ marginTop: "2rem", scrollMarginTop: "6rem" }}
              >
                <div className="book-cover-wrap" style={{ position: "relative" }}>
                  <span className="latest-badge" style={{ marginBottom: "0.5rem" }}>
                    Latest Release
                  </span>
                  <Image
                    src={latestBook.cover}
                    alt={`${latestBook.title} cover`}
                    width={420}
                    height={630}
                    className="book-cover"
                    sizes="(max-width: 720px) 52vw, 190px"
                    onError={() => {}}
                  />
                </div>
                <div>
                  <div className="meta-row">
                    <span className="meta-chip">{latestBook.category}</span>
                    <span className="meta-chip">{latestBook.difficulty}</span>
                    {latestBook.pages && (
                      <span className="meta-chip">{latestBook.pages} pages</span>
                    )}
                    {latestBook.publishDate && (
                      <span className="meta-chip">{latestBook.publishDate}</span>
                    )}
                  </div>
                  <h2 className="book-title mt-4">{latestBook.title}</h2>
                  <p className="book-subtitle mt-2">{latestBook.subtitle}</p>
                  <p className="body-copy mt-4">{latestBook.description}</p>
                  <div className="meta-row mt-5">
                    {latestBook.themes.map((theme) => (
                      <span key={theme} className="theme-chip">{theme}</span>
                    ))}
                  </div>
                  <div className="mt-6" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    <a className="button-primary" href={latestBook.amazonUrl} target="_blank" rel="noreferrer">
                      Read on Amazon →
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Categories ── */}
      <section className="section bg-white">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Categories"
              title="Six areas of work, one connected body of ideas."
            />
          </Reveal>
          <div className="meta-row mt-8">
            {categories.map((category) => (
              <span key={category} className="theme-chip">
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reading Paths ── */}
      <section className="section border-y border-[#E5E5E5] bg-white">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Reading paths"
              title="Not sure where to start? These paths help."
              copy="Each path is a curated sequence of books by reader intent."
            />
          </Reveal>
          <div className="reading-path-grid mt-12">
            {Object.entries(readingPaths).map(([key, ids]) => (
              <Reveal key={key}>
                <article className="path-card">
                  <p className="eyebrow">{pathLabels[key as keyof typeof pathLabels]}</p>
                  <ol style={{ marginTop: "1.4rem", display: "grid", gap: "0.85rem", color: "var(--muted)", listStylePosition: "inside" }}>
                    {ids.map((id) => (
                      <li key={id}>{getBookTitle(id)}</li>
                    ))}
                  </ol>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── All Books ── */}
      <section className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="All books"
              title="The complete catalog."
            />
          </Reveal>
          <div className="grid gap-8 mt-12">
            {otherBooks.map((book, index) => (
              <Reveal key={book.id} delay={index * 0.025}>
                <div id={book.id} className="scroll-mt-28">
                  <BookCard book={book} />
                  <div className="book-detail-grid">
                    <div>
                      <p className="detail-title">Why read this</p>
                      <div className="mt-4 grid gap-3">
                        {book.whyRead.map((reason) => (
                          <p key={reason} className="list-line">
                            {reason}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="detail-title">Related books</p>
                      <div className="meta-row mt-4">
                        {book.related.map((related) => (
                          <span key={related} className="theme-chip">
                            {related}
                          </span>
                        ))}
                      </div>
                      <div className="mt-7" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                        <a className="button-primary" href={book.amazonUrl} target="_blank" rel="noreferrer">
                          Read on Amazon →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Amazon CTA ── */}
      <section className="section border-t border-[#E5E5E5] bg-white">
        <div className="container-page split-grid">
          <Reveal>
            <SectionHeading
              eyebrow="Amazon"
              title="All books are available on Amazon Kindle."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <a className="button-primary" href={author.amazonAuthorUrl} target="_blank" rel="noreferrer">
              Visit Amazon Author Page
            </a>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
