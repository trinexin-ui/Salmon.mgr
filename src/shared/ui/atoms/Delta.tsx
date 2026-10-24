type DeltaProps = {
  direction?: 'up' | 'down'
  label: string
  size?: 'body_1' | 'body_2'
  className?: string
}

// Figma: atom delta. Small triangle (10×7) + percent, body_1 (`size="body_2"` — в легендах). up — green, down — red.
// Выделен из stats_summary.
export function Delta({ direction = 'up', label, size = 'body_1', className }: DeltaProps) {
  const up = direction === 'up'
  const colorVar = up ? 'var(--color-project-green)' : 'var(--color-project-red)'
  return (
    <span className={['inline-flex items-center gap-xs_1', className ?? ''].join(' ')}>
      <span
        aria-hidden
        className="inline-block shrink-0"
        style={{
          width: 0,
          height: 0,
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          ...(up ? { borderBottom: `7px solid ${colorVar}` } : { borderTop: `7px solid ${colorVar}` }),
        }}
      />
      <span className={[size === 'body_2' ? 'type-body_2' : 'type-body_1', 'whitespace-nowrap', up ? 'text-project-green' : 'text-project-red'].join(' ')}>
        {label}
      </span>
    </span>
  )
}
