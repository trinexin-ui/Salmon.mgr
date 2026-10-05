import { useId } from 'react'

type PatternProps = {
  type?: 'on_black' | 'on_white'
  className?: string
}

// Figma: atom pattern (type on_black / on_white) — "line_pattern" hatch.
// Even diagonal lines (/) at ~45°, stroke 1.5px, 20% opacity, perpendicular
// step ≈4.36px (6px horizontal). No background fill — the surface shows through.
// on_black: light lines (#F4F4F4). on_white: dark lines (#474547).
// SVG keeps every line the same width (CSS gradients alias at fractional steps).
const LINE = {
  on_black: '#f4f4f4',
  on_white: '#474547',
} as const

export function Pattern({ type = 'on_black', className }: PatternProps) {
  const uid = useId()
  const pid = `line-pattern-${uid}`
  return (
    <svg
      aria-hidden
      preserveAspectRatio="none"
      className={['h-full w-full', className ?? ''].join(' ')}
    >
      <defs>
        <pattern
          id={pid}
          patternUnits="userSpaceOnUse"
          width="4.364"
          height="20"
          patternTransform="rotate(43.35)"
        >
          <line
            x1="0.75"
            y1="0"
            x2="0.75"
            y2="20"
            stroke={LINE[type]}
            strokeWidth="1.5"
            strokeOpacity="0.2"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pid})`} />
    </svg>
  )
}
