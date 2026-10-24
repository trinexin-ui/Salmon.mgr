import {
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { Icon } from '@/shared/ui/icons/Icon'

type SliderProps = {
  defaultPercent?: number
  // controlled mode: the owner keeps the value (percent of `total` for the left tile)
  percent?: number
  onPercentChange?: (percent: number) => void
  total?: number
  leftLabel?: string
  rightLabel?: string
  // wrap in a white card (radius l, p-l) — as the slider sits on the wizard steps
  card?: boolean
  className?: string
}

// Figma: 41 ticks, every 4th tall (32), the rest 20, 1px wide, color on_white/gray_3.
// Each tick is placed on the device-pixel grid and is a whole number of device pixels wide, so all
// ticks are exactly equally thin at any page zoom / display scale (1px boxes at fractional
// positions or scales alternate between thick and thin).
const TICKS = 41
function Ticks() {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [dpr, setDpr] = useState(1)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => {
      setWidth(el.getBoundingClientRect().width)
      setDpr(window.devicePixelRatio || 1)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const thick = Math.max(1, Math.floor(dpr)) / dpr
  return (
    <div ref={ref} className="relative w-full" style={{ height: 32 }}>
      {width > 0 &&
        Array.from({ length: TICKS }).map((_, i) => {
          const tall = i % 4 === 0
          const left = Math.min(Math.round(((i * width) / (TICKS - 1)) * dpr) / dpr, width - thick)
          return (
            <span
              key={i}
              aria-hidden
              className="absolute bg-project-on_white-gray_3"
              style={{ left, top: tall ? 0 : 6, width: thick, height: tall ? 32 : 20 }}
            />
          )
        })}
    </div>
  )
}

const peso = (n: number) => '₱' + n.toLocaleString('en-US')

// Figma: d-organism/slider. Two summary cards (Employees / Team needs) + a draggable
// track with tick marks and a ‹› thumb that splits `total` by percent. Собран из: icon.
export function Slider({
  defaultPercent = 60,
  percent,
  onPercentChange,
  total = 10000,
  leftLabel = 'Employees',
  rightLabel = 'Team needs',
  card = false,
  className,
}: SliderProps) {
  const [inner, setInner] = useState(defaultPercent)
  const pct = percent ?? inner
  const setPct = (p: number) => {
    setInner(p)
    onPercentChange?.(p)
  }
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

  const body = (
    <div className={['flex w-full flex-col gap-m select-none', card ? '' : (className ?? '')].join(' ')}>
      <div className="flex items-center gap-m">
        <div
          style={{ borderRadius: 'var(--radius-s)' }}
          className="flex flex-1 flex-col items-center gap-xs_1 bg-project-gray_bg p-m"
        >
          <span className="type-body_2 text-text-and-icon-secondary_white">{leftLabel}</span>
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
          <span className="type-body_2 text-text-and-icon-secondary_white">{rightLabel}</span>
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
          // Figma: slider track gradient — smooth symmetric vignette, light-gray
          // edges fading to white centre. Dark stops (gray_3) sit past the element
          // (−32.25% / 132.25%) so the gradient bleeds beyond the border without a
          // flat gray band (monotonic stops avoid the clamping artefact). Colors are tokens:
          // gray_3 / gray_1 / white.
          backgroundImage:
            'linear-gradient(90deg, var(--color-project-on_white-gray_3) -32.25%, var(--color-project-on_white-gray_1) 8.395%, var(--color-project-white) 50.18%, var(--color-project-on_white-gray_1) 91.605%, var(--color-project-on_white-gray_3) 132.25%)',
        }}
        className="relative flex cursor-pointer items-center overflow-hidden px-m"
      >
        <Ticks />
        <div
          className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-max bg-project-action"
          style={{ left: `${pct}%`, width: 44, height: 44 }}
        >
          <Icon name="slider" size={33} lineWidth={1.25} className="text-project-white" />
        </div>
      </div>
    </div>
  )
  if (!card) return body
  return (
    <div
      style={{ borderRadius: 'var(--radius-l)' }}
      className={['w-full bg-project-white p-l', className ?? ''].join(' ')}
    >
      {body}
    </div>
  )
}
