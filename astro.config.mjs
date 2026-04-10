import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import remarkWikilinks from './src/lib/remark-wikilinks'
import remarkBlocks from './src/lib/remark-blocks'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

export default defineConfig({
  site: 'https://mumega.com',
  output: 'static',
  integrations: [react(), sitemap(), mdx()],
  image: { remotePatterns: [{ protocol: 'https' }] },
  markdown: {
    remarkPlugins: [remarkWikilinks, remarkBlocks, remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: { prefixDefaultLocale: false },
  },
})
