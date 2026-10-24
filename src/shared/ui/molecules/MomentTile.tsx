type MomentTileProps = {
  variant?: 'center' | 'side'
  image: string
  // center: gold frame (the highlighted moment)
  selected?: boolean
  // side: lean outward (-16° left, +16° right)
  tilt?: number
  className?: string
}

// Figma: молекула moment_tile (фото в коллаже Moments). side — фото 100×117 в скруглении m
// с наклоном ±16°, контейнер 128×140; center — карточка 128×148 с фото 120×140 (selected — рамка
// 2px moment_frame (#ddc8a9, непрозрачная), отступ 2px; без рамки отступ 4px). Статичная.
export function MomentTile({
  variant = 'center',
  image,
  selected = false,
  tilt = 0,
  className,
}: MomentTileProps) {
  if (variant === 'side') {
    return (
      <div
        className={['flex items-center justify-center', className ?? ''].join(' ')}
        style={{ width: 128.376, height: 140.031 }}
      >
        <img
          src={image}
          alt=""
          className="block shrink-0 object-cover"
          style={{
            width: 100,
            height: 117,
            borderRadius: 'var(--radius-m)',
            transform: `rotate(${tilt}deg)`,
          }}
        />
      </div>
    )
  }
  const inset = selected ? 2 : 4
  return (
    <div
      style={{ width: 128, height: 148, borderRadius: 'var(--radius-l)' }}
      className={[
        'relative',
        selected ? 'border-2 border-project-moment_frame' : '',
        className ?? '',
      ].join(' ')}
    >
      <img
        src={image}
        alt=""
        className="absolute block object-cover"
        style={{
          left: inset,
          top: inset,
          width: 120,
          height: 140,
          borderRadius: 'var(--radius-m)',
        }}
      />
    </div>
  )
}
