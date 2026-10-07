import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/ui/atoms/Button'
import { PathLink } from '@/features/prototype/PathLink'
import { useFlow } from '@/features/prototype/flow'

export function SuccessScreen() {
  const navigate = useNavigate()
  const { setScheduled } = useFlow()

  function done() {
    setScheduled(true)
    navigate('/employee')
  }

  return (
    <div className="relative flex min-h-full flex-col overflow-hidden">
      <img
        src="/assets/success-tree.webp"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative mt-auto flex flex-col items-center px-l pb-xl">
        {/* Figma 3094:8675 — whole heading is one d/linear-gold fill (no dark first word). */}
        <span className="type-h1 bg-gradient-gold bg-clip-text text-center text-transparent">
          Sige, scheduled!
        </span>
        <p className="type-body_1 mt-m text-center text-text-and-icon-secondary_white">
          Training starts on Mon, Jul 31 at 5:30 PM.
          <br />
          Notification sent to Jose Reyes
        </p>
        <Button className="mt-m" label="Edit" state="tertiary" color="gray" />
        <PathLink onClick={done}>
          <Button className="mt-xxxl" label="Great!" state="primary" color="black" />
        </PathLink>
      </div>
    </div>
  )
}
