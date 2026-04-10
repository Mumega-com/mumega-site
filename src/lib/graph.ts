/**
 * Inkwell v2 — Knowledge graph builder
 *
 * Transforms the content index into graph data (nodes + edges)
 * for the KnowledgeGraph visualization component.
 */

import { getAllContent, getContentIndex } from './content'
import type { ContentItem } from './content'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface GraphNode {
  slug: string
  title: string
  type: string
  author: string
  tags: string[]
  views: number
  date: string
  series?: string
  url: string
}

export interface GraphEdge {
  source: string
  target: string
  type: 'wikilink' | 'tag' | 'series' | 'backlink'
}

export interface GraphData {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Canonical key for an edge — ensures A→B and B→A are treated as one */
function edgeKey(source: string, target: string, type: string): string {
  const [a, b] = source < target ? [source, target] : [target, source]
  return `${a}::${b}::${type}`
}

function toNode(item: ContentItem): GraphNode {
  return {
    slug: item.slug,
    title: item.frontmatter.title,
    type: item.frontmatter.type,
    author: item.frontmatter.author,
    tags: item.frontmatter.tags,
    views: 0, // Will come from D1 analytics later
    date: item.frontmatter.date,
    series: item.frontmatter.series,
    url: item.url,
  }
}

// ─── Builder ─────────────────────────────────────────────────────────────────

/**
 * Build the full knowledge graph from the content index.
 *
 * Edges are created from four sources:
 *  - wikilinks: explicit [[link]] references between content items
 *  - tags: items sharing 2+ tags (threshold avoids noise)
 *  - series: items in the same series
 *  - backlinks: reverse wikilinks (A links to B → backlink from B to A)
 *
 * All edges are deduplicated — no A→B and B→A for the same type.
 */
export function buildGraphData(lang?: string): GraphData {
  const items = getAllContent(lang)
  const index = getContentIndex()
  const slugSet = new Set(items.map((item) => item.slug))

  // Build nodes
  const nodes = items.map(toNode)

  // Build edges with deduplication
  const seen = new Set<string>()
  const edges: GraphEdge[] = []

  function addEdge(source: string, target: string, type: GraphEdge['type']): void {
    if (source === target) return
    if (!slugSet.has(source) || !slugSet.has(target)) return

    const key = edgeKey(source, target, type)
    if (seen.has(key)) return
    seen.add(key)

    edges.push({ source, target, type })
  }

  for (const item of items) {
    // 1. Wikilinks — explicit references
    for (const link of item.wikilinks) {
      addEdge(item.slug, link.target, 'wikilink')
    }

    // 2. Series — items in the same series
    if (item.frontmatter.series) {
      for (const other of items) {
        if (other.frontmatter.series === item.frontmatter.series) {
          addEdge(item.slug, other.slug, 'series')
        }
      }
    }

    // 3. Shared tags — only when 2+ tags overlap to avoid noise
    for (const other of items) {
      if (other.slug === item.slug) continue

      const sharedCount = item.frontmatter.tags.filter((tag) =>
        other.frontmatter.tags.includes(tag)
      ).length

      if (sharedCount >= 2) {
        addEdge(item.slug, other.slug, 'tag')
      }
    }
  }

  // 4. Backlinks — reverse direction of wikilinks
  for (const [target, sources] of index.backlinks) {
    for (const source of sources) {
      addEdge(source, target, 'backlink')
    }
  }

  return { nodes, edges }
}
