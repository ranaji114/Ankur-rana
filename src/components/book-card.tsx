import Image from "next/image";
import type { Book } from "@/data/content";

type BookCardProps = {
  book: Book;
  compact?: boolean;
};

export function BookCard({ book, compact = false }: BookCardProps) {
  return (
    <article className="book-card">
      <div className="book-cover-wrap">
        <Image
          src={book.cover}
          alt={`${book.title} book cover`}
          width={420}
          height={630}
          className="book-cover"
          sizes="(max-width: 720px) 52vw, 190px"
        />
      </div>

      <div>
        <div className="meta-row">
          <span className="meta-chip">{book.category}</span>
          <span className="meta-chip">{book.difficulty}</span>
        </div>
        <h3 className="book-title mt-5">{book.title}</h3>
        <p className="book-subtitle mt-2">{book.subtitle}</p>
        <p className="body-copy mt-5">{compact ? book.hook : book.description}</p>
        <div className="meta-row mt-5">
          {book.themes.map((theme) => (
            <span key={theme} className="theme-chip">
              {theme}
            </span>
          ))}
        </div>
        <div style={{ marginTop: "1.75rem" }}>
          <a
            className="button-primary"
            href={book.amazonUrl}
            target="_blank"
            rel="noreferrer"
          >
            Read on Amazon →
          </a>
        </div>
      </div>
    </article>
  );
}
