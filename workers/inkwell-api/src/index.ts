import { Hono } from 'hono'
import { cors } from 'hono/cors'

interface Env {
  DB: D1Database
  CONTENT: KVNamespace
  SITE_URL: string
  PUBLISH_TOKEN?: string
  CF_PAGES_DEPLOY_HOOK?: string
}

const app = new Hono<{ Bindings: Env }>()

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
}))

// Health check
app.get('/health', (c) => c.json({ status: 'ok', ts: Date.now() }))

// Record page view
app.post('/api/view', async (c) => {
  const body = await c.req.json<{ slug: string; referrer?: string; scroll_depth?: number }>()
  const { slug, referrer, scroll_depth } = body

  if (!slug) return c.json({ error: 'slug required' }, 400)

  const country = c.req.header('cf-ipcountry') ?? 'unknown'
  const mobile = c.req.header('sec-ch-ua-mobile')
  const device = mobile === '?1' ? 'mobile' : 'desktop'

  await c.env.DB.prepare(
    'INSERT INTO page_views (slug, referrer, scroll_depth, country, device, timestamp) VALUES (?, ?, ?, ?, ?, ?)'
  ).bind(slug, referrer ?? null, scroll_depth ?? null, country, device, new Date().toISOString()).run()

  return c.json({ ok: true })
})

// Record reaction
app.post('/api/reaction', async (c) => {
  const body = await c.req.json<{ slug: string; emoji: string }>()
  const { slug, emoji } = body

  if (!slug || !emoji) return c.json({ error: 'slug and emoji required' }, 400)

  const ip = c.req.header('cf-connecting-ip') ?? 'anonymous'
  const encoder = new TextEncoder()
  const data = encoder.encode(ip + slug)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const visitorHash = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 16)

  await c.env.DB.prepare(
    'INSERT INTO reactions (slug, emoji, visitor_hash, timestamp) VALUES (?, ?, ?, ?)'
  ).bind(slug, emoji, visitorHash, new Date().toISOString()).run()

  const counts = await c.env.DB.prepare(
    'SELECT emoji, COUNT(*) as count FROM reactions WHERE slug = ? GROUP BY emoji'
  ).bind(slug).all<{ emoji: string; count: number }>()

  const result: Record<string, number> = {}
  for (const row of counts.results) {
    result[row.emoji] = row.count
  }

  return c.json({ ok: true, counts: result })
})

// Get reaction counts for a slug
app.get('/api/reactions/:slug', async (c) => {
  const slug = c.req.param('slug')

  const counts = await c.env.DB.prepare(
    'SELECT emoji, COUNT(*) as count FROM reactions WHERE slug = ? GROUP BY emoji'
  ).bind(slug).all<{ emoji: string; count: number }>()

  const result: Record<string, number> = {}
  for (const row of counts.results) {
    result[row.emoji] = row.count
  }

  return c.json({ counts: result })
})

// Subscribe
app.post('/api/subscribe', async (c) => {
  const body = await c.req.json<{ email: string; name?: string; source?: string }>()
  const { email, name, source } = body

  if (!email) return c.json({ error: 'email required' }, 400)

  await c.env.DB.prepare(
    'INSERT OR IGNORE INTO subscribers (email, name, status, source) VALUES (?, ?, ?, ?)'
  ).bind(email, name ?? '', 'active', source ?? 'website').run()

  return c.json({ ok: true, status: 'subscribed' })
})

// Unsubscribe
app.post('/api/unsubscribe', async (c) => {
  const body = await c.req.json<{ email: string }>()
  const { email } = body

  if (!email) return c.json({ error: 'email required' }, 400)

  await c.env.DB.prepare(
    'UPDATE subscribers SET status = ? WHERE email = ?'
  ).bind('unsubscribed', email).run()

  return c.json({ ok: true, status: 'unsubscribed' })
})

// Stats for a slug
app.get('/api/stats/:slug', async (c) => {
  const slug = c.req.param('slug')

  const views = await c.env.DB.prepare(
    'SELECT COUNT(*) as count, AVG(scroll_depth) as avg_scroll FROM page_views WHERE slug = ?'
  ).bind(slug).first<{ count: number; avg_scroll: number | null }>()

  const reactions = await c.env.DB.prepare(
    'SELECT emoji, COUNT(*) as count FROM reactions WHERE slug = ? GROUP BY emoji'
  ).bind(slug).all<{ emoji: string; count: number }>()

  const reactionCounts: Record<string, number> = {}
  for (const row of reactions.results) {
    reactionCounts[row.emoji] = row.count
  }

  return c.json({
    slug,
    views: views?.count ?? 0,
    avg_scroll_depth: views?.avg_scroll ?? null,
    reactions: reactionCounts,
  })
})

// ── Publishing ─────────────────────────────────────────────────────────

app.post('/api/publish', async (c) => {
  // Auth check
  const token = c.env.PUBLISH_TOKEN
  if (token) {
    const auth = c.req.header('Authorization')
    if (auth !== `Bearer ${token}`) {
      return c.json({ error: 'unauthorized' }, 401)
    }
  }

  const body = await c.req.json<{
    title: string
    content: string
    slug?: string
    author?: string
    tags?: string[]
    description?: string
    status?: string
  }>()

  const overwrite = (body as Record<string, unknown>).overwrite === true

  if (!body.title || !body.content) {
    return c.json({ error: 'title and content required' }, 400)
  }

  const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80)
  const author = body.author || 'agent'
  const tags = body.tags || []
  const description = body.description || body.content.replace(/[#*>\[\]_`-]/g, '').trim().slice(0, 160)
  const status = body.status || 'published'
  const date = new Date().toISOString().slice(0, 10)

  // Slug uniqueness check
  if (!overwrite) {
    const existing = await c.env.CONTENT.get(`meta:${slug}`)
    if (existing) {
      return c.json({ error: 'slug_exists', slug, hint: 'Use overwrite:true to replace, or choose a different slug' }, 409)
    }
  }

  // Build frontmatter
  const frontmatter = [
    `title: "${body.title}"`,
    `date: "${date}"`,
    `author: "${author}"`,
    `tags: [${tags.map(t => `"${t}"`).join(', ')}]`,
    `description: "${description}"`,
    `status: "${status}"`,
  ].join('\n')

  const markdown = `---\n${frontmatter}\n---\n\n${body.content}`

  // Store in KV
  await c.env.CONTENT.put(`post:${slug}`, markdown)
  await c.env.CONTENT.put(`meta:${slug}`, JSON.stringify({
    title: body.title, slug, author, tags, description, date, status,
  }))

  // Index in D1
  await c.env.DB.prepare(
    'INSERT OR REPLACE INTO content_index (slug, title, type, lang, author, tags, description, published_at, updated_at, word_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  ).bind(slug, body.title, 'blog', 'en', author, JSON.stringify(tags), description, date, date, body.content.split(/\s+/).length).run()

  // Trigger CF Pages deploy hook if configured
  if (c.env.CF_PAGES_DEPLOY_HOOK) {
    await fetch(c.env.CF_PAGES_DEPLOY_HOOK, { method: 'POST' }).catch(() => {})
  }

  return c.json({
    ok: true,
    slug,
    url: `${c.env.SITE_URL}/blog/${slug}`,
    stored: 'kv',
    deploy: c.env.CF_PAGES_DEPLOY_HOOK ? 'triggered' : 'manual',
  })
})

// List published content (public — no auth needed)
app.get('/api/posts', async (c) => {
  const posts = await c.env.DB.prepare(
    "SELECT slug, title, author, tags, description, published_at FROM content_index WHERE type = 'blog' ORDER BY published_at DESC LIMIT 50"
  ).all()

  // Filter out drafts from public listing
  const published = []
  for (const post of posts.results) {
    const meta = await c.env.CONTENT.get(`meta:${post.slug}`, 'json') as Record<string, unknown> | null
    if (!meta || meta.status !== 'draft') published.push(post)
  }

  return c.json({ posts: published })
})

// List drafts (auth required)
app.get('/api/drafts', async (c) => {
  const token = c.env.PUBLISH_TOKEN
  if (token) {
    const auth = c.req.header('Authorization')
    if (auth !== `Bearer ${token}`) {
      return c.json({ error: 'unauthorized' }, 401)
    }
  }

  const all = await c.env.DB.prepare(
    "SELECT slug, title, author, tags, description, published_at FROM content_index WHERE type = 'blog' ORDER BY published_at DESC LIMIT 50"
  ).all()

  const drafts = []
  for (const post of all.results) {
    const meta = await c.env.CONTENT.get(`meta:${post.slug}`, 'json') as Record<string, unknown> | null
    if (meta && meta.status === 'draft') drafts.push(post)
  }

  return c.json({ drafts })
})

// Get single post from KV
app.get('/api/posts/:slug', async (c) => {
  const slug = c.req.param('slug')
  const content = await c.env.CONTENT.get(`post:${slug}`)
  if (!content) return c.json({ error: 'not found' }, 404)
  const meta = await c.env.CONTENT.get(`meta:${slug}`, 'json')
  return c.json({ slug, meta, markdown: content })
})

export default { fetch: app.fetch }
