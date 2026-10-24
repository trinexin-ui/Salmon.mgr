import { useRef, type PointerEvent as ReactPointerEvent, type WheelEvent } from 'react'

const THRESHOLD = 60

// Prototype gesture for the "pull" between Shoutouts and Moments (desktop, mouse):
//  - 'down': drag down with the mouse, or scroll the wheel up, while the screen is at its top;
//  - 'up':   drag up with the mouse, or scroll the wheel down.
// Returns props to spread on the element that listens. `onPull` fires once per gesture.
export function usePull(direction: 'down' | 'up', onPull: () => void) {
  const wheel = useRef(0)
  const fired = useRef(false)

  const atTop = (el: HTMLElement) => {
    const sc = el.closest('.phone-screen')
    return !sc || sc.scrollTop <= 0
  }

  const fire = () => {
    if (fired.current) return
    fired.current = true
    onPull()
  }

  function onWheel(e: WheelEvent<HTMLElement>) {
    if (direction === 'down' && !atTop(e.currentTarget)) {
      wheel.current = 0
      return
    }
    const d = direction === 'down' ? -e.deltaY : e.deltaY
    wheel.current = d > 0 ? wheel.current + d : 0
    if (wheel.current > THRESHOLD) fire()
  }

  function onPointerDown(e: ReactPointerEvent<HTMLElement>) {
    if (direction === 'down' && !atTop(e.currentTarget)) return
    const startY = e.clientY
    const move = (ev: PointerEvent) => {
      const dy = direction === 'down' ? ev.clientY - startY : startY - ev.clientY
      if (dy > THRESHOLD) {
        cleanup()
        fire()
      }
    }
    const cleanup = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', cleanup)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', cleanup)
  }

  return { onWheel, onPointerDown }
}
