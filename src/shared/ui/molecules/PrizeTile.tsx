type PrizeTileProps = {
  variant?: 'selected' | 'side'
  label: string
  image: string
  // side tiles lean outward by this angle (deg): -6 on the left, +6 on the right
  tilt?: number
  className?: string
}

// Figma: молекула prize_tile (карусель призов на step2). Плитка 175×196, radius m:
// картинка + белый градиент снизу + подпись h3. selected — подпись d/linear-gold_label, рамка 2px
// active_state/50% (отступ 2px); side — полупрозрачный (52%), наклон ±6°, подпись
// d/linear-black_gold. Статичная.
export function PrizeTile({ variant = 'selected', label, image, tilt = 0, className }: PrizeTileProps) {
  const selected = variant === 'selected'
  const tile = (
    <div
      style={{ width: 175, height: 196, borderRadius: 'var(--radius-m)' }}
      className="relative flex shrink-0 flex-col items-center justify-end overflow-hidden pb-m"
    >
      <img
        src={image}
        alt=""
        className={[
          'pointer-events-none absolute',
          // Figma: the selected photo fills the 175×196 tile exactly (plain size-full, no aspect
          // lock), so it is not scaled uniformly; the side photos keep their aspect and own crop.
          selected ? 'object-fill' : 'object-cover object-bottom',
        ].join(' ')}
        style={
          selected
            ? { inset: 0, width: '100%', height: '100%', maxWidth: 'none' }
            : {
                left: '-3.22%',
                top: '-18.41%',
                width: '104.61%',
                height: '125.1%',
                maxWidth: 'none',
              }
        }
      />
      <span
        aria-hidden
        className={[
          'pointer-events-none absolute inset-0 bg-linear-to-b from-project-white/0 from-2% via-project-white/0 to-project-white',
          selected ? 'via-62% to-86%' : 'via-78%',
        ].join(' ')}
      />
      <span
        className={[
          'type-h3 relative whitespace-nowrap bg-clip-text text-center text-transparent',
          selected ? 'bg-gradient-gold_label' : 'bg-gradient-black_gold',
        ].join(' ')}
      >
        {label}
      </span>
    </div>
  )

  if (selected) {
    return (
      <div
        style={{ width: 183, height: 204, borderRadius: 'var(--radius-l)' }}
        className={[
          'flex items-center justify-center border-2 border-project-active_state/50',
          className ?? '',
        ].join(' ')}
      >
        {tile}
      </div>
    )
  }
  return (
    <div
      style={{ opacity: 0.52, transform: `rotate(${tilt}deg)` }}
      className={['shrink-0', className ?? ''].join(' ')}
    >
      {tile}
    </div>
  )
}
