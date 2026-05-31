"use client";

import { BookCard } from "@/components/book-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";
import { author, books, categories, readingPaths } from "@/data/content";

const pathLabels = {
  curiousMinds: "Curious Minds",
  selfGrowth: "Self Growth",
  relationships: "Relationships",
  cultureAndLanguage: "Culture and Language",
};

const getBookTitle = (id: string) => books.find((book) => book.id === id)?.title ?? id;

export function BooksPage() {
  return (
    <SiteShell>
      <section className="page-hero">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Books</p>
            <h1 className="page-title mt-5">A complete Kindle catalog arranged by reader intent.</h1>
            <p className="body-large mt-7 max-w-3xl">
              Each book has a clear promise, direct Amazon action, and a place inside the larger
              author universe: time, mind, attention, relationships, poetry, language, and culture.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
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

      <section className="section border-y border-[#E5E5E5] bg-white">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Reading paths"
              title="Help readers choose the right starting point."
              copy="These paths make the catalog feel intentional instead of random."
            />
          </Reveal>
          <div className="reading-path-grid mt-12">
            {Object.entries(readingPaths).map(([key, ids]) => (
              <Reveal key={key}>
                <article className="path-card">
                  <p className="eyebrow">{pathLabels[key as keyof typeof pathLabels]}</p>
                  <ol>
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

      <section className="section">
        <div className="container-page grid gap-8">
          {books.map((book, index) => (
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
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <a className="button-primary" href={book.amazonUrl} target="_blank" rel="noreferrer">
                        Buy on Kindle
                      </a>
                      <a className="button-secondary" href={book.previewUrl} target="_blank" rel="noreferrer">
                        Open preview
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section border-t border-[#E5E5E5] bg-white">
        <div className="container-page split-grid">
          <Reveal>
            <SectionHeading
              eyebrow="Amazon"
              title="Every purchase path leads directly to Kindle."
              copy="The site keeps conversion simple: readers discover the right book here, then continue to Amazon for purchase and preview."
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
