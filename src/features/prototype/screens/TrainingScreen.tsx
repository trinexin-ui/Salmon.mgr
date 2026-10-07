import { useNavigate } from 'react-router-dom'
import { Header } from '@/shared/ui/organisms/Header'
import { PersonTag } from '@/shared/ui/molecules/PersonTag'
import { DateTimeRow } from '@/shared/ui/molecules/DateTimeRow'
import { Button } from '@/shared/ui/atoms/Button'
import { PathLink } from '@/features/prototype/PathLink'

export function TrainingScreen() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-full flex-col bg-project-gray_bg">
      <div className="px-l" style={{ paddingTop: 74 }}>
        <Header title="Training" rightIcon={null} onBack={() => navigate('/employee')} />
      </div>

      <div className="flex flex-1 flex-col items-center px-l">
        <PersonTag person="jose-reyes" className="mt-s" />

        <div className="my-auto flex flex-col items-center gap-m">
          <div className="flex items-center justify-center gap-xxs">
            <span className="type-h1 text-text-and-icon-primary">POS loan pitch</span>
            <span
              aria-hidden
              className="inline-block"
              style={{ width: 2, height: 34, background: 'var(--color-project-action)' }}
            />
          </div>
          <span className="type-body_1 text-text-and-icon-secondary_white">Add note</span>
        </div>

        <DateTimeRow className="mb-s" title="Mon, July 31, 05:30 PM" subtitle="Date and time" />
      </div>

      <div>
        <div className="px-l py-m">
          <PathLink onClick={() => navigate('/success')}>
            <Button label="Schedule" state="primary" color="black" />
          </PathLink>
        </div>
        <img src="/assets/keyboard.png" alt="" style={{ width: 402 }} className="block" />
      </div>
    </div>
  )
}
