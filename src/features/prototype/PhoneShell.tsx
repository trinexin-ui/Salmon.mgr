import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { StatusBar } from '@/shared/ui/organisms/StatusBar'
import './prototype.css'

// Vertical sample line inside the status bar band (where the glyphs sit).
const SB_SAMPLE_Y = 34

// Persistent desktop canvas (1440) with a centered 402×874 phone frame. The frame does
// not re-mount between routes (rule 7); only the screen inside it animates and scrolls.
// Clicks that do not land on a wired path control ([data-ui-path]) raise the inactive hint.
export function PhoneShell() {
  const location = useLocation()
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

  function onContentClick(e: MouseEvent) {
    const el = e.target as HTMLElement
    if (el.closest('[data-ui-path]')) return
    setHint({ x: e.clientX, y: e.clientY })
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setHint(null), 2000)
  }

  return (
    <div className="flex min-h-full w-full justify-center bg-project-black_bg py-xxxl">
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
          <div className="bg-project-black_bg" style={{ padding: 13, borderRadius: 63 }}>
            {/* Screen */}
            <div
              className="relative overflow-hidden bg-project-gray_bg"
              style={{ width: 402, height: 874, borderRadius: 50 }}
            >
              <div
                key={location.pathname}
                ref={scrollRef}
                onClick={onContentClick}
                onScroll={updateInk}
                className="screen-anim phone-screen h-full overflow-y-auto"
              >
                <Outlet />
              </div>

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
          </div>
        </div>
      </div>

      {hint && (
        <div
          className="proto-hint rounded-s bg-project-black_bg px-s py-xs_1"
          style={{ left: hint.x, top: hint.y }}
        >
          <span className="type-caption_1 text-text-and-icon-white">этого нет в сценарии</span>
        </div>
      )}
    </div>
  )
}
