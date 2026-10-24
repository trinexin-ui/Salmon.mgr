import { useNavigate } from 'react-router-dom'
import { GoalSummary } from '@/shared/ui/organisms/GoalSummary'
import { EditCard } from '@/shared/ui/molecules/EditCard'
import { useFlow } from '@/features/prototype/flow'
import {
  employeesAmount,
  equalPart,
  levelOf,
  peso,
  teamAmount,
} from '@/features/prototype/goalData'
import { GoalWizardLayout } from '@/features/prototype/screens/GoalWizardLayout'

// Figma d-team_goal-step4 (3094:14325): review of everything chosen in the wizard.
export function GoalStep4Screen() {
  const navigate = useNavigate()
  const { level, splitPct, distribution, hybridPct } = useFlow()
  const l = levelOf(level)
  const employees = employeesAmount(level, splitPct)
  const equal = equalPart(employees, hybridPct)

  const distributionCard =
    distribution === 'equal'
      ? { left: `${peso(employees)} equal split` }
      : distribution === 'by_offers'
        ? { left: `${peso(employees)} by offers` }
        : { left: `${peso(equal)} equal split`, right: `${peso(employees - equal)} by offers` }

  return (
    <GoalWizardLayout
      step={3}
      backTo="/goal/3"
      buttonLabel="Announce to team"
      onContinue={() => navigate('/goal/success')}
    >
      <GoalSummary illustration={l.illustration} category={l.category} title={l.title}>
        <EditCard
          title="Split"
          left={`${peso(employees)} employees`}
          right={`${peso(teamAmount(level, splitPct))} team goal`}
        />
        <EditCard title="Distribution" {...distributionCard} />
      </GoalSummary>
    </GoalWizardLayout>
  )
}
