# Inkwell v3 Roadmap

## P1 — Core CMS (the CMS doesn't work without these)

- [ ] **Wikilinks** — Parse `[[page]]` and `[[page|text]]` in markdown, resolve to URLs
- [ ] **Backlinks** — Build reverse index, show "pages that link here" on each post
- [ ] **:: block rendering** — Wire Callout, Tldr, PullQuote, Figure, StatsBar components to Astro's markdown pipeline via remark plugin
- [ ] **Inline charts** — `::chart[bar]` markdown blocks rendered via Recharts island
- [ ] **TOC in post layout** — Wire the TOC React island into Post.astro sidebar
- [ ] **JSON-LD verified** — Confirm schema renders correctly on all page types
- [ ] **Reading time** — Calculate and display in post header
- [ ] **Analytics injection** — Verify GA/Clarity/Hotjar script tags render from config IDs

## P2 — Product (makes it usable by others)

- [ ] **Search** — Pagefind static search (npm install, build integration)
- [ ] **Command palette** — Wire Cmd+K island, feed it content index
- [ ] **Video hero** — Video-first page layout with chapters
- [ ] **API publish** — Deploy inkwell-api Worker for POST → KV publish
- [ ] **OG image generation** — Playwright script, auto-generate per post
- [ ] **D1 analytics** — Wire view counts, reaction storage, newsletter subs
- [ ] **Feature flags** — Config features actually toggle components in templates
- [ ] **Mermaid diagrams** — Render `::mermaid` blocks via remark plugin
- [ ] **Twitter Card meta** — Verify large image cards work
- [ ] **Auto-description** — Generate meta description if missing in frontmatter

## P3 — Differentiators (what no other CMS does)

- [ ] **i18n routing** — /en/, /fa/ with language switcher
- [ ] **RTL support** — dir="rtl" for Arabic, Farsi
- [ ] **Hreflang tags** — Auto-generate for multi-language content
- [ ] **Comments** — GitHub Discussions or lightweight custom
- [ ] **Bus publish** — SOS MCP message → content published
- [ ] **MCP server** — Agents connect and publish via MCP protocol
- [ ] **Content flywheel** — Worker cron monitors HN/Reddit/RSS, drafts posts
- [ ] **KV edge cache** — Pre-render to KV for instant global reads
- [ ] **R2 media pipeline** — Upload, optimize, serve from R2
- [ ] **Social proof bar** — Real view/read/reaction counts from D1
- [ ] **KaTeX math** — LaTeX rendering in markdown
- [ ] **Auto-tags** — Suggest tags from content analysis

## P4 — Organism (the system that improves itself)

- [ ] **Adaptive pages** — Weekly cron reads analytics, Gemma suggests improvements
- [ ] **A/B testing** — KV variant configs, serve different versions
- [ ] **Video generation** — Remotion renders posts as animated video
- [ ] **Schema predator** — Read competitor SERPs, generate richer structured data
- [ ] **Content as context** — Vectorize all posts, derive opinions from body of work
- [ ] **Programmatic generation** — Template × Variable matrix for scale SEO
- [ ] **Content pruning** — Archive underperformers monthly
- [ ] **Referral program** — Subscribers recruit subscribers

## Done

- [x] Astro scaffold with content collections (Zod schemas)
- [x] Config-driven theme (inkwell.config.ts → CSS custom properties)
- [x] Dark/light/system toggle in header
- [x] 9 Astro server components (Header, Footer, Callout, PullQuote, Tldr, Figure, StatsBar, AuthorCard, JsonLd)
- [x] 8 React islands (Reactions, ShareButtons, NewsletterCTA, ReadingProgress, CommandPalette, TOC, KnowledgeGraph, VideoHero)
- [x] Blog listing + individual post pages
- [x] Explore page with knowledge graph
- [x] RSS feed + sitemap
- [x] 404 page
- [x] Ingest script (content/inbox/ → content/en/)
- [x] Publishing skill (inkwell-publish)
- [x] Content strategy document
- [x] 14 blog posts
- [x] Deployed to Cloudflare Pages
- [x] Cloudflare D1 + R2 + KV created
- [x] Screenshots captured (Playwright)
