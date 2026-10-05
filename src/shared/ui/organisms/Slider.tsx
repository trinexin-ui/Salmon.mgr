import { useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { Icon } from '@/shared/ui/icons/Icon'

type SliderProps = {
  defaultPercent?: number
  total?: number
  className?: string
}

const peso = (n: number) => '₱' + n.toLocaleString('en-US')

// Figma: d-organism/slider. Two summary cards (Employees / Team needs) + a draggable
// track with tick marks and a ‹› thumb that splits `total` by percent. Собран из: icon.
export function Slider({ defaultPercent = 60, total = 10000, className }: SliderProps) {
  const [pct, setPct] = useState(defaultPercent)
  const trackRef = useRef<HTMLDivElement>(null)
  const employees = Math.round((total * pct) / 100)
  const team = total - employees

  const setFromClientX = (clientX: number) => {
    const el = trackRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const p = Math.round(((clientX - rect.left) / rect.width) * 100)
    setPct(Math.max(0, Math.min(100, p)))
  }
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    setFromClientX(e.clientX)
    const move = (ev: PointerEvent) => setFromClientX(ev.clientX)
    const up = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  return (
    <div className={['flex w-full flex-col gap-m select-none', className ?? ''].join(' ')}>
      <div className="flex items-center gap-m">
        <div
          style={{ borderRadius: 'var(--radius-s)' }}
          className="flex flex-1 flex-col items-center gap-xs_1 bg-project-gray_bg p-m"
        >
          <span className="type-body_2 text-text-and-icon-secondary_white">Employees</span>
          <div className="type-h3 flex items-center gap-xs_1">
            <span className="text-text-and-icon-secondary_white">{pct}%</span>
            <span className="text-text-and-icon-secondary_white">•</span>
            <span className="text-text-and-icon-primary">{peso(employees)}</span>
          </div>
        </div>
        <div
          style={{ borderRadius: 'var(--radius-s)' }}
          className="flex flex-1 flex-col items-center gap-xs_1 bg-project-gray_bg p-m"
        >
          <span className="type-body_2 text-text-and-icon-secondary_white">Team needs</span>
          <div className="type-h3 flex items-center gap-xs_1">
            <span className="text-text-and-icon-primary">{peso(team)}</span>
            <span className="text-text-and-icon-secondary_white">•</span>
            <span className="text-text-and-icon-secondary_white">{100 - pct}%</span>
          </div>
        </div>
      </div>
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        style={{
          borderRadius: 'var(--radius-s)',
          height: 71,
          // Figma: slider track gradient — gray edges fading to white centre,
          // stops run past the element (132.25%) so it bleeds past the border.
          backgroundImage:
            'linear-gradient(90deg, #dddddd 30.325%, #f4f4f4 9.5364%, #ffffff 50.18%, #f4f4f4 91.605%, #dddddd 132.25%)',
        }}
        className="relative flex cursor-pointer items-center overflow-hidden px-m"
      >
        <div className="flex w-full items-center justify-between">
          {Array.from({ length: 41 }).map((_, i) => (
            <span
              key={i}
              className="w-px shrink-0 bg-text-and-icon-secondary_black"
              style={{ height: i % 4 === 0 ? 32 : 20 }}
            />
          ))}
        </div>
        <div
          className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-max bg-project-action"
          style={{ left: `${pct}%`, width: 44, height: 44 }}
        >
          <Icon name="slider" size={24} className="text-project-white" />
        </div>
      </div>
    </div>
  )
}
