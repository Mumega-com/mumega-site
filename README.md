# Inkwell

AI-first content framework on Astro + Cloudflare. Config-driven. Zero hardcoded values. Agents publish by dropping markdown.

## Quick Start

```bash
git clone https://github.com/Mumega-com/inkwell.git
cd inkwell
npm install
npm run dev
```

## What It Does

- **Content engine** — markdown with wikilinks, backlinks, 9 extended block types, inline charts, KaTeX math, mermaid diagrams
- **Config-driven** — `inkwell.config.ts` controls theme, features, analytics, SEO. Change one file, entire site changes
- **Zero JS by default** — Astro serves static HTML. React components hydrate only where needed
- **Cloudflare native** — Pages (hosting), D1 (analytics), R2 (media), KV (cache), Workers (API)
- **Agent publishing** — drop markdown in `content/inbox/`, run `npm run ingest`, deploy

## Commands

```bash
npm run dev          # Dev server
npm run build        # Production build (includes Pagefind indexing)
npm run deploy       # Build + deploy to Cloudflare Pages
npm run ingest       # Process content/inbox/ → content/en/
npm run flywheel     # Scan feeds for trending topics
npm run generate:og  # Generate OG images for all posts
npm run upload       # Upload files to R2
npm run cache        # Cache built HTML to KV
```

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Astro 6 |
| Islands | React 19 |
| Hosting | Cloudflare Pages |
| Database | Cloudflare D1 |
| Media | Cloudflare R2 |
| Cache | Cloudflare KV |
| API | Cloudflare Workers (Hono) |
| Search | Pagefind |
| Math | KaTeX |
| Diagrams | Mermaid |

## Config

Everything flows from `inkwell.config.ts`:

```typescript
export const config = {
  name: 'My Site',
  theme: {
    colors: { primary: '#D4A017' },
    fonts: { display: "'JetBrains Mono'" },
    darkFirst: true,
  },
  features: {
    reactions: true,
    newsletter: true,
    knowledgeGraph: true,
    search: true,
  },
  analytics: {
    clarity: 'your-id',
    googleAnalytics: 'G-XXXXX',
  },
}
```

## License

MIT
