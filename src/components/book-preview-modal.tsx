"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Book } from "@/data/content";
import { sound } from "@/lib/audio-haptics";

type BookPreviewModalProps = {
  book: Book | null;
  onClose: () => void;
};

export function BookPreviewModal({ book, onClose }: BookPreviewModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (book) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [book, onClose]);

  if (!book) return null;

  return (
    <div
      className="book-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.play("click");
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-book-title"
    >
      <div className="book-modal-box">
        {/* Mobile Drawer Handle */}
        <div className="mobile-sheet-handle" aria-hidden="true" />

        {/* Close Button */}
        <button
          type="button"
          className="book-modal-close"
          onClick={() => {
            sound.play("click");
            onClose();
          }}
          aria-label="Close book preview"
        >
          ✕
        </button>

        <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {/* Cover & Quick Meta */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ position: "relative", maxWidth: "240px", width: "100%" }}>
              <Image
                src={book.cover}
                alt={`${book.title} cover`}
                width={420}
                height={630}
                className="book-cover-3d"
                sizes="240px"
              />
              <div className="book-spine-shine" />
            </div>

            <div className="meta-row mt-6" style={{ justifyContent: "center" }}>
              <span className="meta-chip">{book.category}</span>
              {book.pages && <span className="meta-chip">{book.pages} pages</span>}
              {book.language && <span className="meta-chip">{book.language}</span>}
              {book.publishDate && <span className="meta-chip">{book.publishDate}</span>}
            </div>

            <div style={{ marginTop: "1.5rem", width: "100%" }}>
              <a
                className="button-primary"
                href={book.amazonUrl}
                target="_blank"
                rel="noreferrer"
                style={{ width: "100%" }}
                onClick={() => sound.play("pop")}
              >
                Read on Amazon Kindle →
              </a>
            </div>
          </div>

          {/* Book Intel & Why Read */}
          <div>
            <span className="eyebrow">{book.difficulty}</span>
            <h2 id="modal-book-title" className="book-title mt-2">
              {book.title}
            </h2>
            <p className="book-subtitle mt-2">{book.subtitle}</p>

            <div style={{ marginBlock: "1.25rem", borderTop: "1px solid var(--border)", paddingTop: "1.25rem" }}>
              <p className="body-copy">{book.description}</p>
            </div>

            {/* Themes */}
            <p className="detail-title" style={{ marginBottom: "0.5rem" }}>Key Conceptual Themes</p>
            <div className="meta-row mb-6">
              {book.themes.map((theme) => (
                <span key={theme} className="theme-chip">{theme}</span>
              ))}
            </div>

            {/* Why Read This */}
            <p className="detail-title" style={{ marginBottom: "0.75rem" }}>Why Read This</p>
            <div style={{ display: "grid", gap: "0.5rem" }}>
              {book.whyRead.map((reason, idx) => (
                <p key={idx} className="list-line">{reason}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
