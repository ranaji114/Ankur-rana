"use client";

import Image from "next/image";
import { Book } from "@/data/content";
import { sound } from "@/lib/audio-haptics";

type BookVaultCardProps = {
  book: Book;
  onPreview: (book: Book) => void;
};

export function BookVaultCard({ book, onPreview }: BookVaultCardProps) {
  return (
    <article className="book-vault-card" id={book.id}>
      {/* 3D Perspective Cover */}
      <div
        className="book-3d-cover-box"
        onClick={() => {
          sound.play("pop");
          onPreview(book);
        }}
        title="Click to open interactive preview"
      >
        {book.isLatest && (
          <span className="latest-badge" style={{ display: "block", marginBottom: "0.5rem" }}>
            Latest Release
          </span>
        )}
        <Image
          src={book.cover}
          alt={`${book.title} cover`}
          width={420}
          height={630}
          className="book-cover-3d"
          sizes="(max-width: 720px) 52vw, 190px"
        />
        <div className="book-spine-shine" />
      </div>

      {/* Book Metadata & Actions */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="meta-row">
          <span className="meta-chip">{book.category}</span>
          <span className="meta-chip">{book.difficulty}</span>
          {book.pages && <span className="meta-chip">{book.pages} pages</span>}
        </div>

        <h3 className="book-title mt-4">{book.title}</h3>
        <p className="book-subtitle mt-1">{book.subtitle}</p>
        <p className="body-copy mt-4" style={{ flex: 1 }}>{book.hook}</p>

        {/* Theme Pills */}
        <div className="meta-row mt-4">
          {book.themes.slice(0, 3).map((theme) => (
            <span key={theme} className="theme-chip">{theme}</span>
          ))}
        </div>

        {/* Actions */}
        <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
          <button
            type="button"
            className="button-primary"
            onClick={() => {
              sound.play("pop");
              onPreview(book);
            }}
          >
            Quick Preview 📖
          </button>
          <a
            className="button-secondary"
            href={book.amazonUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => sound.play("click")}
          >
            Amazon Kindle →
          </a>
        </div>
      </div>
    </article>
  );
}
