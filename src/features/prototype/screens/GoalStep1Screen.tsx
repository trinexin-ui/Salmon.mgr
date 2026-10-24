import { useNavigate } from 'react-router-dom'
import { GoalCard } from '@/shared/ui/organisms/GoalCard'
import { PathLink } from '@/features/prototype/PathLink'
import { useFlow } from '@/features/prototype/flow'
import { LEVELS, peso } from '@/features/prototype/goalData'
import { GoalWizardLayout } from '@/features/prototype/screens/GoalWizardLayout'

// Figma d-team_goal-step1 (3094:14322): pick the goal level (sets the total amount).
export function GoalStep1Screen() {
  const navigate = useNavigate()
  const { level, setLevel } = useFlow()

  return (
    <GoalWizardLayout step={0} buttonLabel="Continue" onContinue={() => navigate('/goal/2')}>
      <div className="flex flex-col gap-m">
        {LEVELS.map((l) => (
          <PathLink key={l.id} onClick={() => setLevel(l.id)}>
            <GoalCard
              type="period_plan"
              category={l.category}
              title={l.title}
              amount={peso(l.amount)}
              illustration={l.illustration}
              selected={level === l.id}
            />
          </PathLink>
        ))}
      </div>
    </GoalWizardLayout>
  )
}
