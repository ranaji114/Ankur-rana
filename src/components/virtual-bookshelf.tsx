"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Book, books } from "@/data/content";
import { bookSanctuaryCatalog } from "@/data/book-sanctuary-content";
import { sound } from "@/lib/audio-haptics";

type VirtualBookshelfProps = {
  onSelectBook: (book: Book) => void;
  selectedBookId?: string | null;
};

export function VirtualBookshelf({ onSelectBook, selectedBookId }: VirtualBookshelfProps) {
  const [hoveredBookId, setHoveredBookId] = useState<string | null>(null);
  const shelfRef = useRef<HTMLDivElement>(null);

  const hoveredBook = books.find((b) => b.id === hoveredBookId);
  const hoveredSanctuary = hoveredBookId ? bookSanctuaryCatalog[hoveredBookId] : null;

  return (
    <div className="virtual-bookshelf-wrapper">
      {/* Shelf Header & Atmosphere */}
      <div className="virtual-bookshelf-header">
        <div>
          <span className="eyebrow" style={{ color: "var(--accent-gold)" }}>
            ✦ CURATED PHYSICAL LIBRARY
          </span>
          <h3 className="section-title mt-2" style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)" }}>
            The Collector&apos;s Bookshelf
          </h3>
          <p className="body-copy mt-2" style={{ maxWidth: "600px", fontSize: "0.92rem" }}>
            Seven published works arranged as physical hardcover editions. Hover to inspect the spine; pull any volume to enter its reading sanctuary.
          </p>
        </div>

        {/* Live Hover Inspection Pill */}
        <div className="bookshelf-live-inspect">
          {hoveredBook && hoveredSanctuary ? (
            <div className="bookshelf-inspect-card">
              <div className="inspect-thumb-wrap">
                <Image
                  src={hoveredBook.cover}
                  alt={hoveredBook.title}
                  width={64}
                  height={96}
                  className="inspect-thumb"
                />
              </div>
              <div className="inspect-meta">
                <span className="inspect-badge">{hoveredSanctuary.badgeText}</span>
                <b className="inspect-title">{hoveredBook.title}</b>
                <span className="inspect-sub">{hoveredBook.category} · {hoveredBook.pages} pp</span>
                <span className="inspect-action">Pull to Read ↗</span>
              </div>
            </div>
          ) : (
            <div className="bookshelf-inspect-idle">
              <span className="idle-icon">📖</span>
              <div>
                <b>Hover or tap a spine</b>
                <p>Pull out any book for deep excerpts &amp; reader mode</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3D Shelf Stage */}
      <div className="bookshelf-stage" ref={shelfRef}>
        {/* Ambient Top Lighting Shadow */}
        <div className="bookshelf-ambient-light" aria-hidden="true" />

        {/* The Vertical Books Row */}
        <div className="bookshelf-books-row" role="list" aria-label="Books on physical shelf">
          {books.map((book, index) => {
            const sanctuary = bookSanctuaryCatalog[book.id];
            const isHovered = hoveredBookId === book.id;
            const isSelected = selectedBookId === book.id;

            return (
              <div
                key={book.id}
                role="listitem"
                className={`shelf-book-slot ${isHovered ? "is-hovered" : ""} ${isSelected ? "is-selected" : ""}`}
                onMouseEnter={() => {
                  sound.play("hover");
                  setHoveredBookId(book.id);
                }}
                onMouseLeave={() => setHoveredBookId(null)}
                onClick={() => {
                  sound.play("pop");
                  onSelectBook(book);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    sound.play("pop");
                    onSelectBook(book);
                  }
                }}
                tabIndex={0}
                aria-label={`${book.title}. ${book.category}. Click to pull from shelf.`}
              >
                {/* The Physical 3D Book Spine */}
                <div
                  className="book-spine-3d"
                  style={{
                    backgroundColor: sanctuary?.spineColor || "#1e293b",
                    borderColor: sanctuary?.spineAccent || "var(--accent-gold)",
                  }}
                >
                  {/* Spine Header Ribs */}
                  <div className="spine-rib-top" />
                  <div className="spine-rib-top-sub" />

                  {/* Ribbon Bookmark Tail (hanging top) */}
                  <div
                    className="spine-ribbon-tail"
                    style={{ backgroundColor: sanctuary?.ribbonColor || "var(--accent-gold)" }}
                    aria-hidden="true"
                  />

                  {/* Spine Title (Vertical) */}
                  <div className="spine-title-container">
                    <span
                      className="spine-title-text"
                      style={{ color: sanctuary?.spineAccent || "#f8fafc" }}
                    >
                      {book.title}
                    </span>
                  </div>

                  {/* Author Stamp */}
                  <div className="spine-author-stamp">
                    <span className="spine-author-name">A. RANA</span>
                    <span className="spine-year">Vol. 0{index + 1}</span>
                  </div>

                  {/* Spine Footer Ribs */}
                  <div className="spine-rib-bottom-sub" />
                  <div className="spine-rib-bottom" />

                  {/* Book Depth Spine Sheen & Leather Emboss */}
                  <div className="spine-lighting-sheen" />
                  <div className="spine-edge-shadow" />
                </div>

                {/* Ground Reflection / Drop Shadow beneath book */}
                <div className="spine-drop-shadow" />
              </div>
            );
          })}
        </div>

        {/* The Heavy Wooden / Obsidian Shelf Ledge */}
        <div className="bookshelf-ledge" aria-hidden="true">
          <div className="shelf-wood-surface" />
          <div className="shelf-brass-inlay" />
          <div className="shelf-bevel-front">
            <span className="shelf-engraved-plate">✦ PRIVATE LIBRARY COLLECTION · ANKUR RANA ✦</span>
          </div>
        </div>
      </div>
    </div>
  );
}
