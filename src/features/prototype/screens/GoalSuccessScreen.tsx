import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/ui/atoms/Button'
import { SuccessNotice } from '@/shared/ui/organisms/SuccessNotice'
import { PathLink } from '@/features/prototype/PathLink'
import { useFlow } from '@/features/prototype/flow'

// Figma d-team_goal-success (3094:14321): the goal was sent to the team. "Great!" returns to
// Period plan without the "set a goal" banner.
export function GoalSuccessScreen() {
  const navigate = useNavigate()
  const { setGoalSent } = useFlow()

  function done() {
    setGoalSent(true)
    navigate('/period-plan')
  }

  return (
    <SuccessNotice
      image="/assets/goal-success-heart.webp"
      title="Sent to the team"
      text={["They can vote when they're free. You'll get", "notified once it's done"]}
    >
      <PathLink onClick={done}>
        <Button label="Great!" state="primary" color="black" />
      </PathLink>
    </SuccessNotice>
  )
}
