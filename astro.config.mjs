import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import remarkWikilinks from './src/lib/remark-wikilinks'
import remarkBlocks from './src/lib/remark-blocks'

export default defineConfig({
  site: 'https://mumega.com',
  output: 'static',
  integrations: [react(), sitemap()],
  image: { remotePatterns: [{ protocol: 'https' }] },
  markdown: {
    remarkPlugins: [remarkWikilinks, remarkBlocks],
  },
})
