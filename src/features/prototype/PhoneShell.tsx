import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { StatusBar } from '@/shared/ui/organisms/StatusBar'
import { DESKTOP_TOP, PHONE_TOP, ShellContext } from '@/features/prototype/shell'
import './prototype.css'

// Vertical sample line inside the status bar band (where the glyphs sit).
const SB_SAMPLE_Y = 34

// Design size of the screen, and the widest viewport that counts as a phone (shown without the
// mockup, filling the display).
const SCREEN_W = 402
const PHONE_MAX_W = 600

// Persistent desktop canvas (1440) with a centered 402×874 phone frame. The frame does
// not re-mount between routes (rule 7); only the screen inside it animates and scrolls.
// Clicks that do not land on a wired path control ([data-ui-path]) raise the inactive hint.
export function PhoneShell() {
  const location = useLocation()
  // Shoutouts and Moments are one screen (a sheet pulled between two states): the path changes
  // under it without a remount.
  const screenKey = location.pathname.startsWith('/shoutouts') ? '/shoutouts' : location.pathname
  const [vp, setVp] = useState({ w: window.innerWidth, h: window.innerHeight })
  useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  const phone = vp.w <= PHONE_MAX_W
  const scale = phone ? vp.w / SCREEN_W : 1
  const top = phone ? PHONE_TOP : DESKTOP_TOP
  const [hint, setHint] = useState<{ x: number; y: number } | null>(null)
  const timer = useRef<number | undefined>(undefined)

  // Status bar ink flips to white only while a [data-sb-dark] region sits behind the bar.
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [ink, setInk] = useState<'#ffffff' | '#000000'>('#000000')

  function updateInk() {
    const sc = scrollRef.current
    if (!sc) return
    const r = sc.getBoundingClientRect()
    // Sample the topmost element behind the status bar glyphs, left of the island.
    // The status bar and island are pointer-events-none, so they are ignored.
    const el = document.elementFromPoint(r.left + 28, r.top + SB_SAMPLE_Y)
    const dark = !!el && !!el.closest('[data-sb-dark]')
    setInk(dark ? '#ffffff' : '#000000')
  }

  // Recompute on route change (new screen mounted).
  useEffect(() => {
    const id = requestAnimationFrame(updateInk)
    return () => cancelAnimationFrame(id)
  }, [location.pathname])

  // A screen whose backdrop changes without a route change (e.g. a pinned header turning light
  // over a white sheet) asks for a fresh ink with `window.dispatchEvent(new Event('proto:ink'))`.
  useEffect(() => {
    let raf = 0
    const onInk = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(updateInk)
    }
    window.addEventListener('proto:ink', onInk)
    return () => {
      window.removeEventListener('proto:ink', onInk)
      cancelAnimationFrame(raf)
    }
  }, [])

  function onContentClick(e: MouseEvent) {
    const el = e.target as HTMLElement
    if (el.closest('[data-ui-path]')) return
    setHint({ x: e.clientX, y: e.clientY })
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setHint(null), 2000)
  }

  const screen = (
    <div
      key={screenKey}
      ref={scrollRef}
      onClick={onContentClick}
      onScroll={updateInk}
      className="screen-anim phone-screen h-full overflow-y-auto"
    >
      <Outlet />
    </div>
  )
  const hintEl = hint && (
    <div
      className="proto-hint rounded-s bg-project-black_bg px-s py-xs_1"
      style={{ left: hint.x, top: hint.y }}
    >
      <span className="type-caption_1 text-text-and-icon-white">этого нет в сценарии</span>
    </div>
  )
  const vars = { '--status-h': `${top}px` } as CSSProperties

  // A phone: no mockup — the screen fills the display (the 402px design is scaled to its width).
  if (phone) {
    return (
      <ShellContext.Provider value={{ phone, top, scale }}>
        <div style={vars} className="fixed inset-0 overflow-hidden bg-project-gray_bg">
          <div
            className="relative overflow-hidden bg-project-gray_bg"
            style={{
              width: SCREEN_W,
              height: vp.h / scale,
              transform: `scale(${scale})`,
              transformOrigin: '0 0',
            }}
          >
            {screen}
          </div>
          {hintEl}
        </div>
      </ShellContext.Provider>
    )
  }

  return (
    <ShellContext.Provider value={{ phone, top, scale }}>
      <div
        style={vars}
        className="flex min-h-full w-full justify-center bg-project-black_bg py-xxxl"
      >
        {/* Device mockup wrapper: titanium rim (white_gray gradient) + black bezel +
          screen, with Dynamic Island and side buttons. Chrome only — not the mockup art. */}
        <div className="relative shrink-0">
          {/* Side buttons (titanium). */}
          <span
            aria-hidden
            className="bg-gradient-white_gray absolute"
            style={{ left: -2, top: 150, width: 3, height: 28, borderRadius: 2 }}
          />
          <span
            aria-hidden
            className="bg-gradient-white_gray absolute"
            style={{ left: -3, top: 210, width: 4, height: 54, borderRadius: 2 }}
          />
          <span
            aria-hidden
            className="bg-gradient-white_gray absolute"
            style={{ left: -3, top: 278, width: 4, height: 54, borderRadius: 2 }}
          />
          <span
            aria-hidden
            className="bg-gradient-white_gray absolute"
            style={{ right: -3, top: 240, width: 4, height: 86, borderRadius: 2 }}
          />

          {/* Titanium outer rim */}
          <div className="bg-gradient-white_gray" style={{ padding: 3, borderRadius: 66 }}>
            {/* Black bezel */}
            <div
              className="relative overflow-hidden bg-project-black_bg"
              style={{ padding: 13, borderRadius: 63 }}
            >
              {/* Screen */}
              <div
                className="relative overflow-hidden bg-project-gray_bg"
                style={{ width: 402, height: 874, borderRadius: 50 }}
              >
                {screen}

                {/* Pinned status bar — transparent, stays on top while the screen scrolls;
                  ink flips white/#000 based on what is behind it. */}
                <StatusBar
                  ink={ink}
                  className="pointer-events-none absolute inset-x-0 top-0 z-20"
                />

                {/* Dynamic Island */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 z-30 bg-project-black_bg"
                  style={{
                    top: 12,
                    width: 126,
                    height: 36,
                    transform: 'translateX(-50%)',
                    borderRadius: 999,
                  }}
                />
              </div>

              {/* Corner mask. A browser (Firefox) may not clip nested scrolling layers to the screen's
                border-radius, so the square corners of the screen content would stick out over the
                bezel. This mask sits on the bezel (outside the screen, so the screen's clip does not
                apply to it) and paints the corner wedges around the rounded screen in the bezel color. */}
              <div
                aria-hidden
                className="pointer-events-none absolute"
                style={{
                  zIndex: 40,
                  left: 13,
                  top: 13,
                  width: 402,
                  height: 874,
                  borderRadius: 50,
                  boxShadow: '0 0 0 24px var(--color-project-black_bg)',
                }}
              />
            </div>
          </div>
        </div>

        {hintEl}
      </div>
    </ShellContext.Provider>
  )
}
