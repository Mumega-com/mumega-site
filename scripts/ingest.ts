/**
 * Inkwell v3 — Content Ingest Script
 *
 * Processes markdown files from content/inbox/ → moves to content/en/{type}/
 * Validates frontmatter, adds defaults, generates slugs.
 *
 * Usage: npm run ingest
 */

import { readFileSync, readdirSync, renameSync, existsSync, mkdirSync, writeFileSync } from 'fs'
import { join, basename } from 'path'

const INBOX = join(process.cwd(), 'content/inbox')
const CONTENT_DIR = join(process.cwd(), 'content/en')

interface Frontmatter {
  title?: string
  date?: string
  author?: string
  tags?: string[]
  description?: string
  status?: string
  type?: string
  [key: string]: unknown
}

function parseFrontmatter(content: string): { data: Frontmatter; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { data: {}, body: content }

  const data: Frontmatter = {}
  for (const line of match[1].split('\n')) {
    const m = line.match(/^(\w[\w_]*)\s*:\s*(.+)/)
    if (m) {
      const val = m[2].trim()
      if (val.startsWith('[') && val.endsWith(']')) {
        data[m[1]] = val.slice(1, -1).split(',').map(s => s.trim().replace(/['"]/g, ''))
      } else {
        data[m[1]] = val.replace(/^['"]|['"]$/g, '')
      }
    }
  }
  return { data, body: match[2] }
}

function generateSlug(filename: string, title?: string): string {
  const base = title || filename.replace(/\.md$/, '')
  return base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function run() {
  if (!existsSync(INBOX)) {
    console.log('No inbox directory. Nothing to ingest.')
    return
  }

  const files = readdirSync(INBOX).filter(f => f.endsWith('.md'))
  if (files.length === 0) {
    console.log('Inbox empty. Nothing to ingest.')
    return
  }

  console.log(`Found ${files.length} file(s) in inbox.`)

  for (const file of files) {
    const filepath = join(INBOX, file)
    const raw = readFileSync(filepath, 'utf-8')
    const { data, body } = parseFrontmatter(raw)

    // Determine type
    const type = (data.type as string) || 'blog'
    const targetDir = join(CONTENT_DIR, type)
    if (!existsSync(targetDir)) mkdirSync(targetDir, { recursive: true })

    // Generate slug
    const slug = generateSlug(file, data.title as string | undefined)

    // Add defaults
    const now = new Date().toISOString().slice(0, 10)
    const defaults: Record<string, unknown> = {
      title: data.title || slug.replace(/-/g, ' '),
      date: data.date || now,
      author: data.author || 'Mumega',
      tags: data.tags || [],
      description: data.description || '',
      status: data.status || 'published',
    }

    // Merge
    const merged = { ...defaults, ...data }
    delete merged.type // type is determined by directory

    // Rebuild frontmatter
    const frontmatter = Object.entries(merged)
      .map(([k, v]) => {
        if (Array.isArray(v)) return `${k}: [${v.map(s => `"${s}"`).join(', ')}]`
        if (typeof v === 'string') return `${k}: "${v}"`
        return `${k}: ${v}`
      })
      .join('\n')

    const output = `---\n${frontmatter}\n---\n${body}`
    const targetPath = join(targetDir, `${slug}.md`)

    writeFileSync(targetPath, output)
    renameSync(filepath, join(INBOX, `.processed-${file}`))

    console.log(`  ${file} → content/en/${type}/${slug}.md`)
  }

  console.log('Done. Run `npm run build` to deploy.')
}

run()
