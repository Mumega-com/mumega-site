# Inkwell v3 Roadmap

## P1 — Core CMS (the CMS doesn't work without these)

- [x] **Wikilinks** — remark-wikilinks.ts parses [[page]] and [[page|text]]
- [x] **Backlinks** — reverse index built by wikilinks plugin
- [x] **:: block rendering** — remark-blocks.ts renders 8 block types
- [x] **Inline charts** — ::chart blocks output data attributes for Recharts
- [x] **TOC in post layout** — 220px sticky sidebar, hidden on mobile
- [x] **JSON-LD verified** — BlogPosting + Organization + WebSite schemas
- [x] **Reading time** — calculated from actual word count in post header
- [x] **Analytics injection** — GA, GTM, Clarity, Hotjar, Plausible conditional on config

## P2 — Product (makes it usable by others)

- [x] **Search** — Pagefind static search, /search page, dark themed
- [x] **Command palette** — Cmd+K wired in Base.astro with nav links
- [ ] **Video hero** — Video-first page layout with chapters (needs video content)
- [x] **API publish** — inkwell-api Worker with view, reaction, subscribe endpoints
- [x] **OG image generation** — Playwright script (npm run generate:og)
- [x] **D1 analytics** — Worker wired to inkwell-analytics D1 (page_views, reactions, subscribers)
- [x] **Feature flags** — Config toggles gate ReadingProgress, Reactions, ShareButtons, NewsletterCTA
- [x] **Mermaid diagrams** — ::mermaid blocks with CDN lazy-load, dark theme
- [x] **Twitter Card meta** — summary_large_image verified in Base.astro
- [x] **Auto-description** — Ingest generates from first sentence if missing

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
