# Inkwell

AI-first content framework on Astro + Cloudflare. Config-driven. Zero hardcoded values. Agents publish by dropping markdown or calling an API.

## Quick Start

```bash
git clone https://github.com/Mumega-com/inkwell.git
cd inkwell
npm install
npm run dev
```

## What It Does

- **Content engine** — markdown/MDX with wikilinks, backlinks, 14 content block types, inline charts, KaTeX math, mermaid diagrams
- **Config-driven** — `inkwell.config.ts` controls theme, features, analytics, SEO. Change one file, entire site changes
- **Zero JS by default** — Astro serves static HTML. React components hydrate as islands only where needed
- **Cloudflare native** — Pages (hosting), D1 (analytics), R2 (media), KV (cache), Workers (API)
- **Publish API** — `POST /api/publish` with auth token. Any agent with HTTP can publish
- **Agent inbox** — drop markdown in `content/inbox/`, run `npm run publish`

## Content Blocks

14 block types available in markdown:

| Block | Usage |
|-------|-------|
| `::tldr` | Summary box at top |
| `::pullquote` | Highlighted quote |
| `::callout[info\|warning\|tip\|danger]` | Callout box with icon |
| `::figure[/path/image.png]` | Image with caption |
| `::stats` | Horizontal stat counters |
| `::faq` | Q&A accordion |
| `::chart[bar\|line\|scatter\|donut]` | Data charts (Recharts) |
| `::mermaid` | Flowcharts, diagrams |
| `::embed[url]` | YouTube, Twitter, CodePen |
| `::comparison` | Side-by-side table with verdict |
| `::timeline` | Visual event timeline |
| `::metric{value="69" label="tasks"}` | Single big number |
| `::cta{url="..." button="..."}` | Call to action |
| `::before-after` | Two-state comparison |

## Commands

```bash
npm run dev          # Dev server
npm run build        # Production build (includes Pagefind search indexing)
npm run publish      # Ingest inbox → build → commit → push → deploy
npm run deploy       # Build + deploy to Cloudflare Pages
npm run ingest       # Process content/inbox/ → content/en/
npm run flywheel     # Scan RSS feeds for trending topics
npm run generate:og  # Generate OG images (Playwright)
npm run upload       # Upload files to R2
npm run cache        # Cache built HTML to KV
```

## Publishing

Three ways to publish:

```bash
# 1. HTTP API (any agent, anywhere)
curl -X POST https://your-worker.workers.dev/api/publish \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Post","content":"# Hello","author":"agent","tags":["test"]}'

# 2. File inbox (server agents)
echo '---
title: My Post
tags: [test]
---
Content here' > content/inbox/my-post.md
npm run publish

# 3. Direct git
# Write markdown to content/en/blog/, commit, push
```

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Astro 6 |
| Islands | React 19 |
| Content | Markdown + MDX |
| Hosting | Cloudflare Pages |
| Database | Cloudflare D1 |
| Media | Cloudflare R2 |
| Cache | Cloudflare KV |
| API | Cloudflare Workers (Hono) |
| Search | Pagefind |
| Math | KaTeX (remark-math + rehype-katex) |
| Diagrams | Mermaid |
| Charts | Recharts |

## Config

Everything flows from `inkwell.config.ts`:

```typescript
export const config = {
  name: 'My Site',
  domain: 'example.com',
  tagline: 'Your tagline',

  theme: {
    colors: { primary: '#D4A017', secondary: '#06B6D4' },
    fonts: { display: "'JetBrains Mono'" },
    darkFirst: true,
  },

  features: {
    reactions: true,
    newsletter: true,
    knowledgeGraph: true,
    search: true,
    readingProgress: true,
    toc: true,
    commandPalette: true,
    darkModeToggle: true,
  },

  analytics: {
    clarity: 'your-id',
    googleAnalytics: 'G-XXXXX',
    hotjar: '',
    plausible: '',
  },

  i18n: {
    defaultLang: 'en',
    languages: ['en'],
    rtl: ['fa', 'ar'],
  },

  workerUrl: 'https://your-worker.workers.dev',
}
```

## Project Structure

```
inkwell.config.ts          # All configuration
content/
  inbox/                   # Drop markdown here → npm run publish
  en/blog/                 # Published blog posts
  en/pages/                # Static pages
src/
  pages/                   # Astro routes
  components/
    layout/                # Header, Footer, LanguageSwitcher
    content/               # Callout, PullQuote, Figure, etc.
    engagement/            # Reactions, ShareButtons, NewsletterCTA
    navigation/            # TOC, CommandPalette, ReadingProgress
    visualization/         # KnowledgeGraph, VideoHero
    seo/                   # JsonLd
  lib/
    config.ts              # Config re-export
    theme.ts               # Config → CSS custom properties
    remark-wikilinks.ts    # [[page]] parser
    remark-blocks.ts       # :: block renderer (14 types)
    annotations.ts         # Annotation interface
    kv-cache.ts            # Edge cache helper
    reading-time.ts        # Word count calculation
  styles/
    base.css               # Typography, block styles, theme
workers/
  inkwell-api/             # Cloudflare Worker (publish, analytics, reactions)
scripts/
  ingest.ts                # Process inbox
  publish.sh               # One-command publish
  flywheel.ts              # Trending topic scanner
  generate-og.ts           # OG image generation
  upload-media.ts          # R2 upload
  cache-to-kv.ts           # Edge cache builder
```

## License

MIT
