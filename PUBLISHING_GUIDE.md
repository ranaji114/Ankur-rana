# Publishing Guide

The website is a static Next.js site and is ready to publish.

## Recommended: Vercel

1. Create or open a Vercel account.
2. Import this project folder:

```txt
C:\Users\ranaa\Downloads\premium-author-website
```

3. Use these settings:

```txt
Framework: Next.js
Install command: npm install
Build command: npm run build
Output directory: out
```

4. Deploy.

## Alternative: Netlify

Use these settings:

```txt
Build command: npm run build
Publish directory: out
```

## Local Final Check

Before publishing, run:

```bash
npm run lint
npm run build
```

The static website files are generated in:

```txt
out
```

