type GaugeProps = {
  percent?: number
  className?: string
}

// Figma: atom gauge (Frame 2131333499) — 155×78 semicircle of two arcs: green (first
// share) and blue (rest), 11.8px thick, round caps, small gap between the arcs.
// Geometry from the owner's export: centre (77.5, 77.5), mid radius 71.6, arcs span
// 4.6°…175.4°, caps gap ≈ 11° (cap centres).
const CX = 77.5
const CY = 77.5
const R = 71.6
const START = 4.6
const END = 175.4
const GAP = 11

const pt = (deg: number) => {
  const a = (Math.PI * deg) / 180
  return [CX - R * Math.cos(a), CY - R * Math.sin(a)] as const
}
const arc = (from: number, to: number) => {
  const [x1, y1] = pt(from)
  const [x2, y2] = pt(to)
  return `M${x1.toFixed(2)} ${y1.toFixed(2)}A${R} ${R} 0 ${to - from > 180 ? 1 : 0} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`
}

export function Gauge({ percent = 50, className }: GaugeProps) {
  const p = Math.max(0, Math.min(100, percent)) / 100
  const usable = END - START - GAP
  const mid = START + usable * p
  return (
    <svg
      aria-hidden
      width="155"
      height="78"
      viewBox="0 0 155 78"
      fill="none"
      className={['block shrink-0 overflow-visible', className ?? ''].join(' ')}
      strokeWidth="11.8"
      strokeLinecap="round"
    >
      {p > 0 && <path d={arc(START, mid)} className="stroke-project-green" />}
      {p < 1 && <path d={arc(mid + GAP, END)} className="stroke-project-blue" />}
    </svg>
  )
}
