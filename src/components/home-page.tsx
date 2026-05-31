"use client";

import Image from "next/image";
import Link from "next/link";
import { BookCard } from "@/components/book-card";
import { ResearchCard } from "@/components/research-card";
import { ResearchPaperCard } from "@/components/research-paper-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";
import { author, books, featuredBookIds, researchPapers, researchTopics } from "@/data/content";

export function HomePage() {
  const featuredBooks = featuredBookIds
    .map((id) => books.find((book) => book.id === id))
    .filter((book): book is (typeof books)[number] => Boolean(book));

  const selectedWorks = books.slice(0, 4);

  return (
    <SiteShell>
      <section className="section">
        <div className="container-page hero-grid">
          <Reveal>
            <p className="eyebrow">{author.role}</p>
            <h1 className="display-title mt-6">
              Books and research on time, mind, and meaning.
            </h1>
            <p className="body-large mt-7 max-w-3xl">{author.shortBio}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link className="button-primary" href="/books">
                Explore books
              </Link>
              <a className="button-secondary" href={author.amazonAuthorUrl} target="_blank" rel="noreferrer">
                View on Amazon
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="hero-note">
              <p className="eyebrow">Current focus</p>
              <p className="hero-note-title mt-4">
                Independent writing and conceptual research shaped by science, philosophy,
                psychology, relationships, poetry, and culture.
              </p>
              <p className="body-copy mt-5">
                The work moves between the scale of cosmology and the immediacy of everyday life:
                how we think, remember, love, focus, speak, and make sense of the world.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section border-t border-[#E5E5E5] bg-white">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Featured books"
              title="Three entry points into Ankur Rana's intellectual identity."
              copy="These titles best represent the author's work across time, mind, and attention."
            />
          </Reveal>
          <div className="book-grid mt-12">
            {featuredBooks.map((book, index) => (
              <Reveal key={book.id} delay={index * 0.05}>
                <BookCard book={book} compact />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page split-grid">
          <Reveal>
            <SectionHeading
              eyebrow="About"
              title="A writer working between large questions and everyday human experience."
              copy={author.longBio}
            />
            <Link className="button-secondary mt-8" href="/about">
              Read about Ankur
            </Link>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="portrait-frame">
              <Image
                src={author.portrait}
                alt={`${author.name} portrait`}
                width={640}
                height={760}
                className="portrait-image"
                sizes="(max-width: 920px) 100vw, 520px"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section border-y border-[#E5E5E5] bg-white">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Research & Ideas"
              title="Independent conceptual research beyond the books."
              copy="Beyond books, Ankur Rana develops independent conceptual research exploring questions about time, quantum reality, perception, consciousness, and human understanding."
            />
          </Reveal>
          <div className="book-grid mt-12">
            {researchPapers.map((paper, index) => (
              <Reveal key={paper.id} delay={index * 0.03}>
                <ResearchPaperCard paper={paper} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Conceptual fields"
              title="The recurring questions across the work."
              copy="Across books, papers, and thought experiments, the work returns to how human beings understand reality, themselves, and one another."
            />
          </Reveal>
          <div className="research-grid mt-12">
            {researchTopics.slice(0, 6).map((topic, index) => (
              <Reveal key={topic.title} delay={index * 0.03}>
                <ResearchCard {...topic} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-[#E5E5E5] bg-white">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Selected works"
              title="A catalog that moves from physics and perception to focus, love, poetry, and language."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {selectedWorks.map((book) => (
              <Reveal key={book.id}>
                <article className="surface-card p-4">
                  <Image
                    src={book.cover}
                    alt={`${book.title} book cover`}
                    width={320}
                    height={480}
                    className="book-cover"
                    sizes="(max-width: 760px) 45vw, 220px"
                  />
                  <h3 className="mt-5 font-display text-2xl font-bold leading-tight">{book.title}</h3>
                  <p className="body-copy mt-3">{book.hook}</p>
                  <Link className="mt-5 inline-flex font-semibold text-[#1F2937]" href={`/books/#${book.id}`}>
                    View book
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="quote-block">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Author note</p>
            <blockquote className="quote-text mt-6">{author.quote}</blockquote>
          </Reveal>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-page">
          <Reveal>
            <div className="surface-card p-6 md:p-10">
              <p className="eyebrow">Begin reading</p>
              <h2 className="section-title mt-4">Explore the complete Kindle catalog.</h2>
              <p className="body-large mt-5 max-w-3xl">
                Start with time, attention, perception, language, relationships, or poetry. Each
                book offers a distinct doorway into the author&apos;s wider body of thought.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link className="button-primary" href="/books">
                  View all books
                </Link>
                <a className="button-secondary" href={author.amazonAuthorUrl} target="_blank" rel="noreferrer">
                  Open Amazon
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
