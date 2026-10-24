import { useNavigate } from 'react-router-dom'
import { GoalCard } from '@/shared/ui/organisms/GoalCard'
import { Slider } from '@/shared/ui/organisms/Slider'
import { PathLink } from '@/features/prototype/PathLink'
import { useFlow } from '@/features/prototype/flow'
import { employeesAmount, peso } from '@/features/prototype/goalData'
import { GoalWizardLayout } from '@/features/prototype/screens/GoalWizardLayout'

// Figma d-team_goal-step3 (3094:14324): how the employees' amount is shared — Equal,
// By offers or Hybrid (Hybrid shows a slider splitting it into equal part / by offers).
export function GoalStep3Screen() {
  const navigate = useNavigate()
  const { level, splitPct, distribution, setDistribution, hybridPct, setHybridPct } = useFlow()
  const amount = employeesAmount(level, splitPct)

  return (
    <GoalWizardLayout
      step={2}
      backTo="/goal/2"
      buttonLabel="Continue"
      onContinue={() => navigate('/goal/4')}
    >
      <div className="flex flex-col gap-m">
        <PathLink onClick={() => setDistribution('equal')}>
          <GoalCard
            type="distribution"
            title="Equal"
            subtitle={`Split evenly ${peso(amount)} across all team`}
            selected={distribution === 'equal'}
          />
        </PathLink>
        <PathLink onClick={() => setDistribution('by_offers')}>
          <GoalCard
            type="distribution"
            title="By offers"
            subtitle={`Split ${peso(amount)} by approved offers`}
            selected={distribution === 'by_offers'}
          />
        </PathLink>
        <PathLink onClick={() => setDistribution('hybrid')}>
          <GoalCard
            type="distribution"
            title="Hybrid"
            subtitle="Part equal, part by offers"
            selected={distribution === 'hybrid'}
          >
            {distribution === 'hybrid' && (
              <Slider
                total={amount}
                percent={hybridPct}
                onPercentChange={setHybridPct}
                leftLabel="Equal split"
                rightLabel="By offers"
              />
            )}
          </GoalCard>
        </PathLink>
      </div>
    </GoalWizardLayout>
  )
}
