# Inkwell

## What This Is
Astro-based content framework and publishing engine. Config-driven, agent-first, and designed to be forked.

## Commands
```bash
npm run dev          # Dev server
npm run build        # Production build
npm run deploy       # Build + deploy to Cloudflare Pages
npm run ingest       # Process content/inbox/ → content/en/
```

## Key Files
| File | Purpose |
|------|---------|
| `inkwell.config.ts` | ALL configuration — theme, features, analytics, SEO |
| `src/content.config.ts` | Astro content collection schemas (Zod) |
| `src/lib/theme.ts` | Config → CSS custom properties generator |
| `src/lib/config.ts` | Re-exports config for use in components |
| `src/lib/seo.ts` | JSON-LD generator (14 schema types) |
| `src/layouts/Base.astro` | Root layout (theme, analytics injection) |
| `src/layouts/Post.astro` | Blog post layout (TOC, reactions, share) |

## Rules
1. **NEVER hardcode colors** — use `var(--ink-primary)`, `var(--ink-bg)`, etc.
2. **Config drives everything** — change inkwell.config.ts, not component code
3. **React islands** use `client:visible` (lazy) or `client:load` (immediate)
4. **Astro components** are server-rendered, zero JS
5. **Content** goes in content/en/{type}/ as markdown with frontmatter

## Theme Colors
All from config → CSS vars:
- `--ink-primary` — gold (#D4A017 dark, #96780A light)
- `--ink-secondary` — cyan (#06B6D4)
- `--ink-bg` — background
- `--ink-surface` — card/panel background
- `--ink-text` — body text
- `--ink-muted` — secondary text
- `--ink-dim` — tertiary text
- `--ink-border` — borders

## Agent Publishing
Drop markdown in `content/inbox/`, run `npm run ingest`. Or POST to a Worker API. Or wire your own publish command/tooling.
