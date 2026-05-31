type ResearchCardProps = {
  title: string;
  description: string;
};

export function ResearchCard({ title, description }: ResearchCardProps) {
  return (
    <article className="research-card">
      <p className="eyebrow">Conceptual field</p>
      <h3 className="mt-4">{title}</h3>
      <p className="body-copy mt-5">{description}</p>
    </article>
  );
}
