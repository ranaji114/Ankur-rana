# Ankur Rana Author Website - Customization Guide

This project is built so most future changes happen in one central file.

Main config and content file:

```txt
C:\Users\ranaa\Downloads\premium-author-website\src\data\content.ts
```

Edit this file to update author details, placeholders, book data, Amazon links, research topics, social links, newsletter URL, and optional asset checklist.

## Replace Temporary Placeholders

Open:

```txt
src\data\content.ts
```

Update these fields inside `author`:

```ts
email: "contact@example.com",
portrait: "/assets/author/portrait.jpeg",
newsletterUrl: "https://example.com/newsletter",
socialLinks: [
  { label: "Instagram", href: "https://example.com/instagram" },
  { label: "LinkedIn", href: "https://example.com/linkedin" },
  { label: "Goodreads", href: "https://example.com/goodreads" },
],
```

## Replace Author Photo

Put the final image here:

```txt
public\assets\author
```

Then update:

```ts
portrait: "/assets/author/your-photo.jpg",
```

Recommended: vertical professional portrait, at least `900 x 1100`.

## Replace Book Covers

Book cover files live here:

```txt
public\assets\books
```

Each book has a `cover` field:

```ts
cover: "/assets/books/architecture-of-existence.jpg",
```

Replace the file or change the path. Recommended book cover ratio: `1024 x 1536`.

## Update Books

Each book uses this structure:

```ts
{
  id: "",
  title: "",
  subtitle: "",
  cover: "",
  category: "",
  difficulty: "",
  hook: "",
  description: "",
  themes: [],
  whyRead: [],
  amazonUrl: "",
  previewUrl: "",
  related: [],
}
```

Use clean Amazon links when possible:

```txt
https://www.amazon.in/dp/YOUR_ASIN
```

## Update Featured Books

Featured homepage books are controlled here:

```ts
export const featuredBookIds = [
  "architecture-of-existence",
  "world-through-our-mind",
  "attention-asset",
];
```

Use book `id` values only.

## Update Reading Paths

The Books page reading paths are controlled here:

```ts
export const readingPaths = {
  curiousMinds: [...],
  selfGrowth: [...],
  relationships: [...],
  cultureAndLanguage: [...],
};
```

Use book `id` values only.

## Update Research Page

Research topics are controlled here:

```ts
export const researchTopics = [
  {
    title: "Time",
    description: "...",
    relatedBook: "The Architecture of Existence",
  },
];
```

This page is designed as an accessible intellectual-interest page, not a technical academic archive.

## Update About Timeline

The About page publication timeline is controlled here:

```ts
export const publicationTimeline = [
  {
    year: "2026",
    title: "The Architecture of Existence",
    note: "...",
  },
];
```

## Design System

The locked visual style is editorial luxury:

- Background: `#F8F7F4`
- Surface: `#FFFFFF`
- Primary text: `#111111`
- Secondary text: `#525252`
- Border: `#E5E5E5`
- Accent: `#1F2937`

Main design file:

```txt
src\app\globals.css
```

Fonts are configured in:

```txt
src\app\layout.tsx
```

Current fonts:

- Headings: Playfair Display
- Body: Inter

## Run Locally

```bash
npm run dev
```

Current local preview:

```txt
http://127.0.0.1:3007
```

If you need the same port:

```bash
npm run dev -- --hostname 127.0.0.1 --port 3007
```

## Check Before Publishing

```bash
npm run lint
npm run build
```

The project is configured for static export through Next.js.

