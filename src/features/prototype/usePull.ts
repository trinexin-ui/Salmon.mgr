import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
  type WheelEvent,
} from 'react'

const SETTLE_MS = 320
const DRAG_SLOP = 6

const clamp = (v: number) => Math.max(0, Math.min(1, v))

// Prototype gesture for the "pull" between Shoutouts and Moments (desktop, mouse). The wall is a
// sheet; `progress` is how far it has slid down: 0 — the wall, 1 — Moments. The sheet follows the
// pointer while it is dragged (mouse drag, or the wheel), and on release it eases the rest of the
// way to whichever end is closer. `distance` is the sheet travel in design px (`scale` — screen px
// per design px, a phone shows the design scaled); `scroller` is the wall's own scroll container
// (the sheet can only be pulled down from its top); `root` listens for touch drags (a phone).
export function usePull(
  distance: number,
  scale: number,
  initial: 0 | 1,
  scroller: RefObject<HTMLElement | null>,
  root: RefObject<HTMLElement | null>,
  onSettle: (open: boolean) => void,
) {
  const [progress, setProgress] = useState<number>(initial)
  const pRef = useRef<number>(initial)
  const raf = useRef(0)
  const wheelTimer = useRef<number | undefined>(undefined)
  const wheelStart = useRef(0)
  const dragged = useRef(false)
  const settleCb = useRef(onSettle)
  useEffect(() => {
    settleCb.current = onSettle
  })

  const set = (v: number) => {
    pRef.current = v
    setProgress(v)
  }

  const animateTo = (target: 0 | 1) => {
    cancelAnimationFrame(raf.current)
    const from = pRef.current
    if (from === target) {
      settleCb.current(target === 1)
      return
    }
    const t0 = performance.now()
    const dur = SETTLE_MS * Math.max(0.35, Math.abs(target - from))
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / dur)
      set(from + (target - from) * (1 - Math.pow(1 - k, 3)))
      if (k < 1) raf.current = requestAnimationFrame(step)
      else settleCb.current(target === 1)
    }
    raf.current = requestAnimationFrame(step)
  }

  // After a pull: past a quarter of the way the sheet keeps going, otherwise it springs back.
  const settle = (startP: number) => {
    const p = pRef.current
    animateTo(startP === 0 ? (p > 0.25 ? 1 : 0) : p < 0.75 ? 0 : 1)
  }

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const atTop = () => (scroller.current?.scrollTop ?? 0) <= 0

  function onPointerDown(e: ReactPointerEvent<HTMLElement>) {
    if (e.pointerType === 'touch' || e.button !== 0 || distance <= 0) return
    if (pRef.current === 0 && !atTop()) return
    cancelAnimationFrame(raf.current)
    const startY = e.clientY
    const startP = pRef.current
    let moving = false
    const move = (ev: PointerEvent) => {
      const dy = ev.clientY - startY
      if (!moving) {
        if (Math.abs(dy) < DRAG_SLOP) return
        // From the wall only a pull down starts the gesture (up is the wall's own scroll).
        if (startP === 0 && dy < 0) return
        moving = true
        dragged.current = true
      }
      set(clamp(startP + dy / scale / distance))
    }
    const up = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      if (moving) {
        settle(startP)
        window.setTimeout(() => (dragged.current = false), 0)
      }
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  function onWheel(e: WheelEvent<HTMLElement>) {
    if (distance <= 0) return
    const p = pRef.current
    if (p === 0 && (e.deltaY >= 0 || !atTop())) return
    if (p === 1 && e.deltaY <= 0) return
    cancelAnimationFrame(raf.current)
    set(clamp(p - e.deltaY / scale / (distance * 1.5)))
    if (wheelTimer.current === undefined) wheelStart.current = p === 0 ? 0 : 1
    window.clearTimeout(wheelTimer.current)
    wheelTimer.current = window.setTimeout(() => {
      wheelTimer.current = undefined
      settle(wheelStart.current)
    }, 140)
  }

  // Touch: the browser would scroll the page on a vertical drag, so the gesture is listened to with
  // native non-passive handlers that cancel the scroll while the sheet is being pulled.
  useEffect(() => {
    const el = root.current
    if (!el || distance <= 0) return
    let startY = 0
    let startP = 0
    let active = false
    let moving = false
    const onStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return
      cancelAnimationFrame(raf.current)
      startY = e.touches[0].clientY
      startP = pRef.current
      active = startP > 0 || atTop()
      moving = false
    }
    const onMove = (e: TouchEvent) => {
      if (!active) return
      const dy = e.touches[0].clientY - startY
      if (!moving) {
        if (Math.abs(dy) < DRAG_SLOP) return
        // From the wall only a pull down starts the gesture (up is the wall's own scroll).
        if (startP === 0 && dy < 0) {
          active = false
          return
        }
        moving = true
        dragged.current = true
      }
      e.preventDefault()
      set(clamp(startP + dy / scale / distance))
    }
    const onEnd = () => {
      if (!moving) return
      moving = false
      settle(startP)
      window.setTimeout(() => (dragged.current = false), 0)
    }
    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchmove', onMove, { passive: false })
    el.addEventListener('touchend', onEnd)
    el.addEventListener('touchcancel', onEnd)
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchmove', onMove)
      el.removeEventListener('touchend', onEnd)
      el.removeEventListener('touchcancel', onEnd)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distance, scale])

  // A click that ends a drag must not press whatever lies under the pointer.
  function onClickCapture(e: { stopPropagation: () => void }) {
    if (dragged.current) {
      e.stopPropagation()
      dragged.current = false
    }
  }

  return {
    progress,
    open: () => animateTo(1),
    close: () => animateTo(0),
    toggle: () => animateTo(pRef.current > 0.5 ? 0 : 1),
    bind: { onPointerDown, onWheel, onClickCapture },
  }
}
