"use client";

import { ResearchCard } from "@/components/research-card";
import { ResearchPaperCard } from "@/components/research-paper-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";
import { researchPapers, researchTopics } from "@/data/content";

export function ResearchPage() {
  return (
    <SiteShell>
      <section className="page-hero">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Research</p>
            <h1 className="page-title mt-5">Independent Research</h1>
            <p className="body-large mt-7 max-w-4xl">
              A collection of original hypotheses, conceptual investigations, and thought
              experiments exploring questions about time, reality, perception, consciousness, and
              the foundations of understanding.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Published research"
              title="Original papers and conceptual investigations."
              copy="These works are independent research contributions shaped by conceptual inquiry, careful speculation, and an interest in the assumptions beneath familiar explanations."
            />
          </Reveal>
          <div className="book-grid mt-12">
            {researchPapers.map((paper, index) => (
              <Reveal key={paper.id} delay={index * 0.05}>
                <ResearchPaperCard paper={paper} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-y border-[#E5E5E5] bg-white">
        <div className="container-page split-grid">
          <Reveal>
            <SectionHeading
              eyebrow="Research philosophy"
              title="What if a basic assumption about reality is incomplete?"
              copy="Research often begins with a simple question. The work presented here explores conceptual possibilities surrounding time, reality, perception, consciousness, and the structure of understanding. Rather than claiming final answers, these investigations aim to expand the space of questions worth asking."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="surface-card p-6">
              <p className="detail-title">Method</p>
              <div className="mt-5 grid gap-3">
                {[
                  "Begin with a foundational assumption",
                  "Test the conceptual boundary of that assumption",
                  "Separate possibility from certainty",
                  "Use thought experiments to clarify the question",
                  "Present ideas in language that remains open to revision",
                ].map((item) => (
                  <p key={item} className="list-line">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Conceptual fields"
              title="The questions that continue to shape the research."
              copy="The research body moves through foundational questions rather than disciplinary labels, keeping the work exploratory, careful, and intellectually honest."
            />
          </Reveal>
          <div className="research-grid mt-12">
            {researchTopics.map((topic, index) => (
              <Reveal key={topic.title} delay={index * 0.025}>
                <ResearchCard {...topic} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
