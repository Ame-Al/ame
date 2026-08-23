/**
 * Inline "ame" brand logotype (wordmark, no separate icon mark). The mark
 * remains inline so it ships as zero-request server-rendered HTML.
 *
 * Filled with a single solid `var(--text-body)` - the navbar's own text color
 * (the same token its nav-link chips use) - so the wordmark reads as one solid
 * ink that matches the surrounding nav text, with no gradient or glow.
 *
 * Lowercase `ame` has materially less cap-height and dark mass than the original
 * `sim` outline at identical CSS dimensions. Its artwork is therefore drawn on a
 * tighter 48px canvas at 24px high, giving the visible letters the same apparent
 * authority as the original mark while remaining inside the existing 30px slot.
 */
export function SimWordmark() {
  return (
    <svg
      viewBox='0 0 110 48'
      width={55}
      height={24}
      fill='none'
      aria-hidden='true'
      className='-translate-y-px h-6 w-auto'
    >
      <text
        x='0'
        y='39'
        fill='var(--text-body)'
        fontFamily='ui-sans-serif, system-ui, sans-serif'
        fontSize='48'
        fontWeight='800'
        letterSpacing='-5.4'
      >
        ame
      </text>
    </svg>
  )
}
