"use client";

import Image from "next/image";
import type { Book } from "@/data/content";
import { sound } from "@/lib/audio-haptics";

type BookCardProps = {
  book: Book;
  compact?: boolean;
  onPreview?: (book: Book) => void;
};

export function BookCard({ book, compact = false, onPreview }: BookCardProps) {
  const handlePreview = () => {
    sound.play("pop");
    if (onPreview) {
      onPreview(book);
    }
  };

  return (
    <article className="book-card">
      <div
        className="book-cover-wrap"
        role={onPreview ? "button" : undefined}
        tabIndex={onPreview ? 0 : undefined}
        onClick={onPreview ? handlePreview : undefined}
        onKeyDown={onPreview ? (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handlePreview();
          }
        } : undefined}
        style={onPreview ? { cursor: "pointer" } : undefined}
      >
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
        <h3
          className="book-title mt-5"
          role={onPreview ? "button" : undefined}
          tabIndex={onPreview ? 0 : undefined}
          onClick={onPreview ? handlePreview : undefined}
          onKeyDown={onPreview ? (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handlePreview();
            }
          } : undefined}
          style={onPreview ? { cursor: "pointer" } : undefined}
        >
          {book.title}
        </h3>
        <p className="book-subtitle mt-2">{book.subtitle}</p>
        <p className="body-copy mt-5">{compact ? book.hook : book.description}</p>
        <div className="meta-row mt-5">
          {book.themes.map((theme) => (
            <span key={theme} className="theme-chip">
              {theme}
            </span>
          ))}
        </div>
        <div style={{ marginTop: "1.75rem", display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
          {onPreview && (
            <button
              type="button"
              className="button-primary"
              onClick={handlePreview}
            >
              Quick Preview 📖
            </button>
          )}
          <a
            className={onPreview ? "button-secondary" : "button-primary"}
            href={book.amazonUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => sound.play("click")}
          >
            Read on Amazon →
          </a>
        </div>
      </div>
    </article>
  );
}
