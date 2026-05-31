"use client";

import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";
import { author } from "@/data/content";

export function ContactPage() {
  return (
    <SiteShell>
      <section className="page-hero">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h1 className="page-title mt-5">Contact Ankur Rana.</h1>
            <p className="body-large mt-7 max-w-3xl">
              Reach out by email, follow the author&apos;s social profiles, or continue to the
              complete Kindle catalog.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Connect"
              title="Choose the easiest way to reach or follow the work."
            />
          </Reveal>
          <div className="research-grid mt-12">
            <Reveal>
              <a className="contact-card block" href={`mailto:${author.email}`}>
                <p className="eyebrow">Email</p>
                <h3 className="mt-4 font-display text-3xl font-bold">Write directly</h3>
                <p className="body-copy mt-4">
                  For reader messages, thoughtful notes, collaboration ideas, and professional
                  inquiries.
                </p>
                <p className="mt-7 font-semibold">{author.email}</p>
              </a>
            </Reveal>

            {author.socialLinks.map((link, index) => (
              <Reveal key={link.label} delay={(index + 1) * 0.05}>
                <a className="contact-card block" href={link.href} target="_blank" rel="noreferrer">
                  <p className="eyebrow">{link.label}</p>
                  <h3 className="mt-4 font-display text-3xl font-bold">Follow on {link.label}</h3>
                  <p className="body-copy mt-4">
                    Follow updates, writing notes, and public posts from Ankur Rana.
                  </p>
                  <p className="mt-7 font-semibold">Open {link.label}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-[#E5E5E5] bg-white">
        <div className="container-page split-grid">
          <Reveal>
            <SectionHeading
              eyebrow="Books"
              title="Explore the published Kindle catalog."
              copy="Discover books on time, reality, attention, language, relationships, and poetry."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="surface-card p-6">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link className="button-primary" href="/books">
                  View books
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
