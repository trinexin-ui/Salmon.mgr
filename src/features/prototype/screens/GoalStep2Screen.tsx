import { useNavigate } from 'react-router-dom'
import { Slider } from '@/shared/ui/organisms/Slider'
import { PrizeCard } from '@/shared/ui/organisms/PrizeCard'
import { PathLink } from '@/features/prototype/PathLink'
import { useFlow } from '@/features/prototype/flow'
import { levelOf } from '@/features/prototype/goalData'
import { GoalWizardLayout } from '@/features/prototype/screens/GoalWizardLayout'

// Figma d-team_goal-step2 (3094:14323): split the chosen total between employees and
// the team goal with the slider (default 50/50).
export function GoalStep2Screen() {
  const navigate = useNavigate()
  const { level, splitPct, setSplitPct } = useFlow()

  return (
    <GoalWizardLayout
      step={1}
      backTo="/goal/1"
      buttonLabel="Continue"
      onContinue={() => navigate('/goal/3')}
    >
      <div className="flex flex-col gap-xl">
        {/* The slider is a live control of the path: it keeps the pointer cursor and stays
            quiet in the inactive-hint boundary. */}
        <PathLink onClick={() => {}}>
          <Slider
            card
            total={levelOf(level).amount}
            percent={splitPct}
            onPercentChange={setSplitPct}
            leftLabel="Employees"
            rightLabel="Team goal"
          />
        </PathLink>
        <PrizeCard />
      </div>
    </GoalWizardLayout>
  )
}
