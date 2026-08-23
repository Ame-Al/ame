import { cn } from '@/lib/utils'

interface SimLogoProps {
  className?: string
}

/**
 * Inline `ame` wordmark. Its tighter, taller canvas counterbalances the lower
 * perceived cap-height of the name relative to the original Sim outline.
 */
export function SimWordmark({ className }: SimLogoProps) {
  return (
    <svg
      viewBox='0 0 110 48'
      width={55}
      height={24}
      fill='none'
      aria-hidden='true'
      className={cn('-translate-y-px h-6 w-auto', className)}
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
