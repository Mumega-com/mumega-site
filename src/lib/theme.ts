import { config } from './config'

type ColorPair = { dark: string; light: string }
type ColorValue = string | ColorPair

function isColorPair(v: ColorValue): v is ColorPair {
  return typeof v === 'object' && 'dark' in v && 'light' in v
}

export function generateCssVars(): string {
  const { colors, fonts, radius, contentWidth, pageWidth } = config.theme

  const lightVars: string[] = []
  const darkVars: string[] = []

  for (const [key, value] of Object.entries(colors)) {
    if (isColorPair(value as ColorValue)) {
      const pair = value as ColorPair
      lightVars.push(`  --ink-${key}: ${pair.light};`)
      darkVars.push(`  --ink-${key}: ${pair.dark};`)
    } else {
      const v = value as string
      lightVars.push(`  --ink-${key}: ${v};`)
      darkVars.push(`  --ink-${key}: ${v};`)
    }
  }

  const sharedVars = [
    `  --ink-font-display: ${fonts.display};`,
    `  --ink-font-body: ${fonts.body};`,
    `  --ink-font-mono: ${fonts.mono};`,
    `  --ink-radius: ${radius};`,
    `  --ink-content-width: ${contentWidth};`,
    `  --ink-page-width: ${pageWidth};`,
  ].join('\n')

  return `/* Auto-generated from inkwell.config.ts — do not edit */
:root {
${lightVars.join('\n')}
${sharedVars}
}

:root.dark {
${darkVars.join('\n')}
}

@media (prefers-color-scheme: dark) {
  :root:not(.light) {
${darkVars.join('\n')}
  }
}
`
}
