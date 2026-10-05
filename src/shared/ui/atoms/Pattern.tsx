type PatternProps = {
  type?: 'on_black' | 'on_white'
  className?: string
}

// Figma: atom pattern (type on_black / on_white) — "line_pattern" hatch.
// Diagonal lines (/) at ~45°, stroke 1.5px, 20% opacity, perpendicular step ≈4.36px
// (6px horizontal). on_black: light lines (#F4F4F4) on a medium-gray base;
// on_white: dark lines (#474547) on a light base. Imports nothing (foundational).
const LINE = {
  on_black: 'rgba(244,244,244,0.2)',
  on_white: 'rgba(71,69,71,0.2)',
} as const
const BASE = {
  on_black: '#4f4f4f',
  on_white: 'var(--color-project-on_white-gray_1)',
} as const

export function Pattern({ type = 'on_black', className }: PatternProps) {
  const line = LINE[type]
  return (
    <div
      aria-hidden
      className={['h-full w-full', className ?? ''].join(' ')}
      style={{
        backgroundColor: BASE[type],
        backgroundImage: `repeating-linear-gradient(135deg, ${line} 0, ${line} 1.5px, transparent 1.5px, transparent 4.36px)`,
      }}
    />
  )
}
