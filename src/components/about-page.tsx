"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";
import { author, publicationTimeline, researchTopics } from "@/data/content";

export function AboutPage() {
  return (
    <SiteShell>
      <section className="page-hero">
        <div className="container-page split-grid">
          <Reveal>
            <p className="eyebrow">About</p>
            <h1 className="page-title mt-5">Author, independent researcher, and thinker.</h1>
            <p className="body-large mt-7">{author.longBio}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="portrait-frame">
              <Image
                src={author.portrait}
                alt={`${author.name} portrait`}
                width={640}
                height={760}
                className="portrait-image"
                priority
                sizes="(max-width: 920px) 100vw, 520px"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-page split-grid">
          <Reveal>
            <SectionHeading
              eyebrow="Writing philosophy"
              title="Books, hypotheses, and thought experiments written in human language."
              copy={author.philosophy}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="surface-card p-6">
              <p className="detail-title">Core concerns</p>
              <div className="mt-5 grid gap-3">
                {researchTopics.map((topic) => (
                  <p key={topic.title} className="list-line">
                    {topic.title}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section border-y border-[#E5E5E5] bg-white">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Publication timeline"
              title="A body of work spanning books, research, language, mind, relationships, time, and poetry."
            />
          </Reveal>
          <div className="timeline mt-12">
            {publicationTimeline.map((item) => (
              <Reveal key={`${item.year}-${item.title}`}>
                <article className="timeline-item">
                  <p className="eyebrow">{item.year}</p>
                  <div>
                    <h3 className="font-display text-3xl font-bold leading-tight">{item.title}</h3>
                    <p className="body-copy mt-2">{item.note}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="quote-block">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Author perspective</p>
            <blockquote className="quote-text mt-6">{author.quote}</blockquote>
          </Reveal>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-page split-grid">
          <Reveal>
            <SectionHeading
              eyebrow="Next"
              title="Explore the books and independent research."
              copy="The site brings together Ankur Rana's published books and conceptual investigations into time, reality, perception, consciousness, language, and human understanding."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <Link className="button-primary" href="/books">
              View books
            </Link>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
