type GridPatternProps = {
  className?: string
}

// Figma: atom grid_pattern (grid, Moments). Два SVG «Perspective Grid» 532×532 друг под другом,
// сдвинуты на -65px по горизонтали; лежат в public/assets/moments (экспорт владельца).
export function GridPattern({ className }: GridPatternProps) {
  return (
    <div
      aria-hidden
      className={['pointer-events-none absolute top-0 flex flex-col items-start', className ?? ''].join(' ')}
      style={{ left: -65, height: 874 }}
    >
      <img src="/assets/moments/grid-0.svg" alt="" className="block" style={{ width: 532, height: 532 }} />
      <img src="/assets/moments/grid-1.svg" alt="" className="block" style={{ width: 532, height: 532 }} />
    </div>
  )
}
