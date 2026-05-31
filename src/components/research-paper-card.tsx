import type { ResearchPaper } from "@/data/content";

type ResearchPaperCardProps = {
  paper: ResearchPaper;
};

export function ResearchPaperCard({ paper }: ResearchPaperCardProps) {
  return (
    <article className="paper-card">
      <div className="meta-row">
        <span className="meta-chip">{paper.publication}</span>
        <span className="meta-chip">{paper.type}</span>
      </div>
      <h3 className="paper-title mt-6">{paper.title}</h3>
      <p className="body-copy mt-5">{paper.summary}</p>
      <a className="button-secondary mt-8" href={paper.url} target="_blank" rel="noreferrer">
        Read Paper
      </a>
    </article>
  );
}
