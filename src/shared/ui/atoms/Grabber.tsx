type GrabberProps = {
  className?: string
}

// Figma: atom grabber. Planka 36×5 (round) in a 16px-high block — the handle of a pull-down
// / bottom sheet. Макет: gray_22 — ближайшая роль on_white/gray_2.
export function Grabber({ className }: GrabberProps) {
  return (
    <span
      aria-hidden
      className={['relative block w-full', className ?? ''].join(' ')}
      style={{ height: 16 }}
    >
      <span
        className="absolute left-1/2 rounded-max bg-project-on_white-gray_2"
        style={{ width: 36, height: 5, top: 5, transform: 'translateX(-50%)' }}
      />
    </span>
  )
}
