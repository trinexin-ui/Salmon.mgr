import { useNavigate } from 'react-router-dom'
import { Header } from '@/shared/ui/organisms/Header'
import { Avatar } from '@/shared/ui/atoms/Avatar'
import { CardButton } from '@/shared/ui/molecules/CardButton'
import { ImportantInformation } from '@/shared/ui/organisms/ImportantInformation'
import { StatsCard } from '@/shared/ui/organisms/StatsCard'
import { NameRow } from '@/shared/ui/organisms/NameRow'
import { Menu } from '@/shared/ui/organisms/Menu'
import { PathLink } from '@/features/prototype/PathLink'
import { useFlow } from '@/features/prototype/flow'

export function EmployeeCardScreen() {
  const navigate = useNavigate()
  const { scheduled } = useFlow()

  const goTraining = () => navigate('/training')

  return (
    <div className="flex min-h-full flex-col bg-project-gray_bg">
      {/* Pinned nav: back + "..." stay on top while the page scrolls, over a backdrop
          that matches the page background. */}
      <div className="sticky top-0 z-10 bg-project-gray_bg px-l pb-xs_1" style={{ paddingTop: 74 }}>
        <Header rightIcon="horizontal" onBack={() => navigate('/')} />
      </div>

      <div className="flex flex-col px-l pb-xl">
        <div className="mt-s flex flex-col items-center">
          <Avatar person="jose-reyes" size={120} />
          <span className="type-h2 mt-xl text-text-and-icon-primary">Jose Reyes</span>
          <span className="type-h3 mt-s bg-gradient-gold bg-clip-text text-transparent">
            Gold level
          </span>

          <div className="mt-xl flex w-full items-stretch gap-m">
            <PathLink onClick={goTraining}>
              <CardButton fluid icon="book" label="Training" className="flex-1" />
            </PathLink>
            <CardButton fluid icon="star" label="Recognition" className="flex-1" />
            <CardButton fluid icon="chating" label="Whisper" className="flex-1" />
          </div>
        </div>

        <div className="mt-xxxl flex flex-col gap-xl">
          {!scheduled && (
            <ImportantInformation
              title="Jose rarely offers POS loans"
              subtitle="Schedule a training session"
              buttonLabel="Schedule"
              onSchedule={goTraining}
            />
          )}
          <StatsCard type="employee" title="Stats for July" />
          <NameRow
            person="carlos-domingo"
            name="Carlos Domingo"
            role="Agent"
            located="Electronics section"
            avg="7 min"
          />
          <Menu
            items={[
              { label: 'Clients', icon: 'group' },
              { label: 'Challenges', icon: 'award' },
            ]}
          />
        </div>
      </div>
    </div>
  )
}
