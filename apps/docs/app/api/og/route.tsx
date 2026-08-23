import type { CSSProperties } from 'react'
import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

const TITLE_FONT_SIZE = {
  large: 110,
  medium: 96,
  small: 85,
} as const
/** Average glyph width as a fraction of font size, for this weight/family — used to pack words into lines. */
const LATIN_CHAR_WIDTH_EM = 0.42
/** CJK glyphs (docs ships `ja`/`zh` locales) render near-square, roughly 2.4x a Latin glyph at this weight. */
const CJK_CHAR_WIDTH_EM = 1
const CJK_RANGE = /[\u3000-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff00-\uffef]/
const TITLE_BOX_WIDTH = 1020
const FONT_CACHE_REVALIDATE_SECONDS = 60 * 60 * 24 * 30
/** Exact hex from a vector trace of the reference cover template, not an estimate off compressed JPEG pixels. */
const INK_COLOR = '#515151'
const OG_CONTAINER_STYLE = {
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '26px',
  background: '#c1c1c1',
  fontFamily: 'Soehne',
} satisfies CSSProperties
const OG_HEADER_STYLE = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  width: '100%',
} satisfies CSSProperties
const OG_TITLE_STYLE = {
  display: 'flex',
  flexDirection: 'column',
  fontWeight: 500,
  color: INK_COLOR,
  lineHeight: 1.1,
  width: `${TITLE_BOX_WIDTH}px`,
  /** Compensates for Satori adding extra invisible leading below the last line instead of splitting it evenly. */
  transform: 'translateY(14px)',
} satisfies CSSProperties

function getTitleFontSize(title: string): number {
  if (title.length > 45) return TITLE_FONT_SIZE.small
  if (title.length > 30) return TITLE_FONT_SIZE.medium
  return TITLE_FONT_SIZE.large
}

function getTitleStyle(title: string): CSSProperties {
  return {
    ...OG_TITLE_STYLE,
    fontSize: getTitleFontSize(title),
  }
}

/** Sums per-character em-widths rather than counting characters, so wide CJK glyphs (docs ships `ja`/`zh`) don't under-wrap. */
function estimateWidthEm(text: string): number {
  let width = 0
  for (const char of text) {
    width += CJK_RANGE.test(char) ? CJK_CHAR_WIDTH_EM : LATIN_CHAR_WIDTH_EM
  }
  return width
}

/**
 * Splits a single word wider than `maxWidthEm` into character-level chunks
 * that each fit. CJK titles (docs ships `ja`/`zh` locales) are often
 * space-free, so a whole run can arrive as one "word" from `wrapTitleLines`'
 * space-based split. Breaking mid-word is correct for CJK, where each glyph
 * is independently readable; Latin words never reach this path since they
 * stay under `maxWidthEm` in practice.
 */
function splitOversizedWord(word: string, maxWidthEm: number): string[] {
  const chunks: string[] = []
  let chunk = ''

  for (const char of word) {
    const candidate = chunk + char
    if (estimateWidthEm(candidate) > maxWidthEm && chunk) {
      chunks.push(chunk)
      chunk = char
    } else {
      chunk = candidate
    }
  }
  if (chunk) chunks.push(chunk)

  return chunks
}

/**
 * Greedily packs words into lines that fit `TITLE_BOX_WIDTH` at `fontSize`,
 * then joins each line with U+00A0 instead of a plain space. Satori
 * (`next/og`'s renderer) has a text-measurement bug where the first plain
 * space (U+0020) in a text node renders at roughly double width — a
 * non-breaking space measures correctly and reads identically at this size,
 * so it sidesteps the bug instead of fighting Satori's own line-wrapping
 * (which is also disabled here — lines are pre-split, not auto-wrapped).
 */
function wrapTitleLines(title: string, fontSize: number): string[] {
  const maxWidthEm = TITLE_BOX_WIDTH / fontSize
  const words = title.split(' ')
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    if (estimateWidthEm(word) > maxWidthEm) {
      if (current) {
        lines.push(current)
        current = ''
      }
      const chunks = splitOversizedWord(word, maxWidthEm)
      lines.push(...chunks.slice(0, -1))
      current = chunks[chunks.length - 1] ?? ''
      continue
    }

    const candidate = current ? `${current} ${word}` : word
    if (estimateWidthEm(candidate) > maxWidthEm && current) {
      lines.push(current)
      current = word
    } else {
      current = candidate
    }
  }
  if (current) lines.push(current)

  return lines.map((line) => line.replace(/ /g, ' '))
}

/**
 * Loads Söhne Kräftig (weight 500), the typeface used on the reference cover
 * template this OG image matches. Converted to a plain TTF from the
 * last-shipped `soehne-kraftig.woff2` since Satori (`next/og`'s renderer)
 * can't parse WOFF2 or variable fonts. Fetched over HTTP since the edge
 * runtime has no filesystem access — served from `/static/fonts/` (not
 * `/fonts/`) so it isn't intercepted by the site's i18n proxy (`proxy.ts`),
 * whose matcher excludes `static` but not `fonts`.
 */
async function loadTitleFont(baseUrl: string): Promise<ArrayBuffer> {
  const response = await fetch(new URL('/static/fonts/Soehne-Kraftig.ttf', baseUrl), {
    next: { revalidate: FONT_CACHE_REVALIDATE_SECONDS },
  })

  if (!response.ok) {
    throw new Error(`Failed to load font data: ${response.status} ${response.statusText}`)
  }

  return await response.arrayBuffer()
}

/** Ame wordmark, no icon — intentionally bold enough to read at share-card size. */
function AmeWordmark() {
  return (
    <div
      style={{
        color: INK_COLOR,
        display: 'flex',
        fontSize: '76px',
        fontWeight: 700,
        letterSpacing: '-7px',
        lineHeight: 1,
      }}
    >
      ame
    </div>
  )
}

/** Diagonal "open" arrow, top-right — square caps and a miter join to match the reference's sharp corners. */
function CornerArrow() {
  return (
    <svg width='58' height='58' viewBox='0 0 24 24' fill='none'>
      <path
        d='M2 22 22 2M22 2H12M22 2V12'
        stroke={INK_COLOR}
        strokeWidth={3.6}
        strokeLinecap='square'
        strokeLinejoin='miter'
      />
    </svg>
  )
}

/**
 * Generates dynamic Open Graph images for documentation pages. Matches the
 * site's library/blog cover template: light gray background, Ame wordmark
 * top-left, an open/diagonal arrow top-right, and the page title large and
 * bold at the bottom-left.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Documentation'

  const fontData = await loadTitleFont(request.url)
  const fontSize = getTitleFontSize(title)
  const titleLines = wrapTitleLines(title, fontSize)

  return new ImageResponse(
    <div style={OG_CONTAINER_STYLE}>
      <div style={OG_HEADER_STYLE}>
        <AmeWordmark />
        <CornerArrow />
      </div>

      <div style={getTitleStyle(title)}>
        {titleLines.map((line, index) => (
          <span key={index}>{line}</span>
        ))}
      </div>
    </div>,
    {
      width: 1200,
      height: 675,
      fonts: [
        {
          name: 'Soehne',
          data: fontData,
          style: 'normal',
          weight: 500,
        },
      ],
    }
  )
}
