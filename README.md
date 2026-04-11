# Inkwell

Config-driven Astro CMS for agent-first publishing on Cloudflare.

Inkwell is not a dashboard app and not a marketing site template. It is the content layer:
- markdown/MDX content collections
- config-driven theming and SEO
- static search via Pagefind
- optional Worker-backed reactions, newsletter, and publish APIs
- inbox-style publishing for agents and automation
- Obsidian-friendly vault mode for editing the same `content/en/` tree

This repo includes **reference demo content** so the system has something real to render. Treat that content as example material, not as required product logic.

## What Is Forkable

Fork this repo when you want:
- a blog/docs/content site on Astro
- a Markdown-first publishing workflow
- a Worker-backed publish/reaction/newsletter edge layer
- a site that agents can publish into through files or HTTP

Do **not** treat this repo as your customer app, dashboard, billing surface, or onboarding hub. It is the CMS layer.

## Quick Start

```bash
git clone https://github.com/your-org/inkwell.git
cd inkwell
npm install
npm run dev
```

Then replace these first:
1. `inkwell.config.ts`
2. `content/en/`
3. `.env` values for analytics and Worker bindings

If you want a clean starting point, use [`inkwell.config.example.ts`](./inkwell.config.example.ts) as the base for your own config.

## Core Ideas

- **Config, not scattered theme code** — site identity, theme, analytics, and feature flags live in `inkwell.config.ts`
- **Zero-JS by default** — Astro renders HTML; React hydrates only where interactivity matters
- **Agent-friendly publishing** — content can arrive from inbox files, HTTP APIs, or your own tool layer
- **Cloudflare-native optional edge layer** — use Pages, Workers, KV, D1, and R2 when you want them, but the content build itself stays simple

## Features

- Markdown + MDX content
- Wikilinks / backlinks
- Pagefind search
- Reading progress
- Table of contents
- Share buttons
- Reactions
- Newsletter CTA
- Knowledge graph / explore surface
- JSON-LD / sitemap / RSS
- OG image generation
- Inbox ingest + one-command publish flow

## Project Structure

```text
inkwell.config.ts          # Active site config
inkwell.config.example.ts  # Safer starter config for forks
content/
  inbox/                   # Drop markdown here for ingest/publish
  en/blog/                 # Demo blog content
  en/pages/                # Demo static pages
src/
  pages/                   # Astro routes
  components/
    content/               # Callout, figure, author card, etc.
    engagement/            # Reactions, newsletter, social proof
    layout/                # Header, footer, language switcher
    navigation/            # TOC, command palette, reading progress
    seo/                   # JSON-LD helpers
    visualization/         # Video hero, knowledge graph
workers/
  inkwell-api/             # Optional Cloudflare Worker API
scripts/
  ingest.ts                # Inbox -> content collections
  publish.sh               # Build, commit, push convenience flow
  generate-og.ts           # Open Graph image generator
```

## Commands

```bash
npm run dev
npm run build
npm run preview
npm run ingest
npm run publish
npm run generate:og
npm run deploy
```

## Publishing Modes

### 1. Inbox publish

Drop a markdown file into `content/inbox/` and run:

```bash
npm run publish
```

That flow ingests content, builds the site, commits the content changes, and pushes them.

### 2. Direct content authoring

Write markdown directly into `content/en/blog/` or `content/en/pages/`, then build and commit normally.

### 3. API-backed publishing

If you deploy the Worker layer, you can expose your own `POST /api/publish` path and send content from agents or external systems.

## Obsidian Vault Mode

The `content/en/` tree is also set up as an Obsidian vault. Open it directly in Obsidian, or use:

```bash
bash scripts/open-obsidian-vault.sh
```

The vault-specific settings live in `content/en/.obsidian/` and are intentionally lightweight so they do not interfere with Astro builds.

## Fork Checklist

Before calling your fork production-ready, replace:
- `inkwell.config.ts` site name, domain, theme, analytics, and Worker URL
- demo content under `content/en/`
- favicon/logo assets in `public/`
- any Worker/API tokens and Cloudflare account settings

You should also decide whether you want:
- a pure static content site
- a static site plus Worker APIs
- a CMS used by a larger hub/app elsewhere

## Notes On Demo Content

The current sample content documents one possible implementation because that is the first live reference. That does **not** mean Inkwell is tied to any specific brand or deployment.

The reusable parts are:
- content schemas
- layout system
- publishing scripts
- Worker integration points
- search, graph, and engagement components

## License

MIT
