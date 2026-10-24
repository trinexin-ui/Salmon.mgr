import { type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/shared/ui/organisms/Header'
import { StepBar } from '@/shared/ui/molecules/StepBar'
import { Button } from '@/shared/ui/atoms/Button'
import { PathLink } from '@/features/prototype/PathLink'
import { WIZARD_STEPS } from '@/features/prototype/goalData'

// Shared layout of the "Set team goal" wizard (steps 1–4). Layout only — everything visible comes
// from shared/ui. The header and the step bar are pinned at the top and the action button at the
// bottom; only the middle (the step's content) scrolls. Kept in one place so the four steps do not
// redraw their own chrome.
export function GoalWizardLayout({
  step,
  backTo,
  buttonLabel,
  onContinue,
  children,
}: {
  step: 0 | 1 | 2 | 3
  backTo?: string
  buttonLabel: string
  onContinue: () => void
  children: ReactNode
}) {
  const navigate = useNavigate()
  return (
    <div className="relative flex h-full flex-col bg-project-gray_bg">
      {/* Pinned top: header + step bar. */}
      <div className="flex shrink-0 flex-col gap-2xxl bg-project-gray_bg px-l" style={{ paddingTop: 74 }}>
        <Header
          title="Set team goal"
          rightIcon="close"
          backHidden={!backTo}
          onBack={backTo ? () => navigate(backTo) : undefined}
          onRight={() => navigate('/period-plan')}
        />
        <StepBar steps={WIZARD_STEPS} activeIndex={step} progressive />
      </div>

      {/* Scrolling middle: runs down to the bottom edge of the screen, the button floats over it. */}
      <div className="hide-scrollbar min-h-0 flex-1 overflow-y-auto">
        <div className="flex flex-col px-l pt-2xl">{children}</div>
        {/* room for the floating button (88px) so the last content can scroll clear of it */}
        <div className="shrink-0" style={{ height: 100 }} />
      </div>

      {/* Pinned bottom: the action button, no backing. The strip itself lets clicks through. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 px-l pb-2xl pt-m">
        <div className="pointer-events-auto">
          <PathLink onClick={onContinue}>
            <Button label={buttonLabel} state="primary" color="black" />
          </PathLink>
        </div>
      </div>
    </div>
  )
}
