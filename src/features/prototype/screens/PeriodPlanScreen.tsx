import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/shared/ui/organisms/Header'
import { BankGoal } from '@/shared/ui/organisms/BankGoal'
import { GoalBanner } from '@/shared/ui/molecules/GoalBanner'
import { ChartCard } from '@/shared/ui/organisms/ChartCard'
import { GoalProgressCard } from '@/shared/ui/organisms/GoalProgressCard'
import { ContributionCard } from '@/shared/ui/organisms/ContributionCard'
import { PathLink } from '@/features/prototype/PathLink'
import { useFlow } from '@/features/prototype/flow'

// Stub data (rule 6: data inline in code).
const ROWS = [
  { person: 'maria-santos', name: 'Maria Santos', amount: '₱4,100', offers: '21 offers', delta: '+24%' },
  { person: 'lyn-dela-cruz', name: 'Lyn Dela Cruz', amount: '₱3,200', offers: '17 offers', delta: '+12%' },
  { person: 'jose-reyes', name: 'Jose Reyes', amount: '₱3,300', offers: '18 offers', delta: '-11%', direction: 'down' },
  { person: 'jun-reyes', name: 'Jun Reyes', amount: '₱2,400', offers: '14 offers', delta: '+18%' },
  { person: 'carlo-del-rosa', name: 'Carlo Del Rosa', amount: '₱2,000', offers: '10 offers', delta: '+32%' },
  { person: 'bea-ocampo', name: 'Bea Ocampo', amount: '₱100', offers: '1 offer' },
] as const

// The pinned header turns light (gray backing) once the white sheet rises under it: when the
// sheet's top edge is within this many px of the screen top (the band is 122px, the sheet's
// rounded corner is 24px, so the band always covers the corners).
const HEADER_SWITCH = 98

// Figma d-team_goal (3094:14320). Dark top (banner, progress) + white sheet. As on Home, the dark
// block stays put and the white sheet rises over it; the header is pinned and, over the white
// sheet, gets a gray backing and the light colors of the employee screen.
export function PeriodPlanScreen() {
  const navigate = useNavigate()
  const { goalSent, resetGoal } = useFlow()
  const rootRef = useRef<HTMLDivElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const [over, setOver] = useState(false)

  function openWizard() {
    resetGoal()
    navigate('/goal/1')
  }

  const update = useCallback(() => {
    const root = rootRef.current
    const sheet = sheetRef.current
    if (!root || !sheet) return
    const top = sheet.getBoundingClientRect().top - root.getBoundingClientRect().top
    setOver(top <= HEADER_SWITCH)
  }, [])

  useLayoutEffect(update, [update, goalSent])

  // PhoneShell computes the status bar ink from what is behind it; ask it to recompute when the
  // header flips between the dark and the light-on-gray look.
  useEffect(() => {
    window.dispatchEvent(new Event('proto:ink'))
  }, [over])

  // The dark block. It is drawn twice with the same layout: once static behind (visible), once as
  // a transparent spacer on top of the scroll layer (carries the banner link).
  const dark = (interactive: boolean) => {
    const banner = <GoalBanner title="Set a goal for the next period" subtitle="August 1–31" />
    return (
      <div className="flex flex-col gap-xxxl px-l pb-2xxl" style={{ paddingTop: 74 }}>
        <div style={{ height: 44 }} />
        {!goalSent &&
          (interactive ? <PathLink onClick={openWizard}>{banner}</PathLink> : banner)}
        <BankGoal
          bare
          label="Ambitious"
          title="81 of 100 approved"
          progress={0.81}
          getLabel="Bank bonus"
          getValue="₱10,000"
          needLabel="Left"
          needValue="3 days"
        />
      </div>
    )
  }

  return (
    <div ref={rootRef} className="relative h-full overflow-hidden bg-project-black_bg">
      {/* Static dark block (does not move). */}
      <div data-sb-dark className="pointer-events-none absolute inset-x-0 top-0">
        {dark(false)}
      </div>

      {/* Scroll layer: a transparent spacer over the dark block, then the white sheet whose rounded
          top is a sticky backdrop that pins at the screen top; the cards scroll over it. */}
      <div className="hide-scrollbar absolute inset-0 overflow-y-auto" onScroll={update}>
        <div className="opacity-0">{dark(true)}</div>

        <div className="relative">
          <div className="pointer-events-none sticky top-0 z-0" style={{ height: 0 }}>
            <div
              ref={sheetRef}
              className="bg-project-gray_bg"
              style={{ height: 874, borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
            />
          </div>

          <div className="relative z-10 flex flex-col gap-xl px-l pb-2xxl pt-l">
            <div className="flex w-full items-start gap-m">
              <ChartCard
                title="Split"
                centerLabel="Bank bonus"
                ratio="60/40"
                percent={60}
                legend={['₱6,000 employees', '₱4,000 team goal']}
              />
              <ChartCard
                title="Distribution"
                centerLabel="Employees"
                ratio="80/20"
                percent={80}
                legend={['₱4,800 equal split', '₱1,200 by offers']}
              />
            </div>
            <GoalProgressCard
              title="Coffee machine"
              subtitle="Gemilai CRM3005G"
              tag="Team goal"
              progress={0.75}
              needValue="₱15,000"
              leftValue="₱3,750"
            />
            <ContributionCard rows={[...ROWS]} />
          </div>
        </div>
      </div>

      {/* Pinned header: dark over the black block, light with a gray backing over the white sheet.
          z-10 keeps it above the scroll layer but below the status bar (z-20) of the phone chrome. */}
      <div
        data-sb-dark={over ? undefined : ''}
        className={[
          'absolute inset-x-0 top-0 z-10 px-l pb-xs_1 transition-colors duration-150',
          over ? 'bg-project-gray_bg' : '',
        ].join(' ')}
        style={{ paddingTop: 74 }}
      >
        <Header
          theme={over ? 'light' : 'dark'}
          title="Period plan"
          description="July"
          rightIcon={null}
          onBack={() => navigate('/')}
        />
      </div>
    </div>
  )
}
