import { useNavigate } from 'react-router-dom'
import { SegmentButton } from '@/shared/ui/molecules/SegmentButton'
import { Avatar } from '@/shared/ui/atoms/Avatar'
import { WeekCalendar } from '@/shared/ui/molecules/WeekCalendar'
import { StatsSummary } from '@/shared/ui/molecules/StatsSummary'
import { BankGoal } from '@/shared/ui/organisms/BankGoal'
import { EmployeeCard } from '@/shared/ui/organisms/EmployeeCard'
import { TabBar } from '@/shared/ui/organisms/TabBar'
import { type IconName } from '@/shared/ui/icons/Icon'
import { type Person } from '@/shared/ui/avatars/people'
import { PathLink } from '@/features/prototype/PathLink'
import { useFlow } from '@/features/prototype/flow'

const WEEK = [
  { weekday: 'Sat', day: '27' },
  { weekday: 'Sun', day: '28' },
  { weekday: 'Mon', day: '29' },
  { weekday: 'Tue', day: '30' },
  { weekday: 'Wed', day: '31' },
]

const SUMMARY = [
  { label: 'Pending', value: '4', delta: '+3%' },
  { label: 'Approved', value: '7', delta: '+24%' },
  { label: 'Earned', value: '₱700', delta: '+32%' },
]

type Card = {
  person: Person
  name: string
  status?: string | false
  statusIcon?: IconName
  tags: string[]
  actions?: IconName[]
  showOffers?: boolean
  slots?: ('approved' | 'pending')[]
  offersLabel?: string
  approvedLabel?: string
  pendingLabel?: string
}

// Stub data (rule 6: data inline in code).
const CARDS: Card[] = [
  {
    person: 'lyn-dela-cruz',
    name: 'Lyn Dela Cruz',
    status: 'On fire today!',
    statusIcon: 'fire',
    tags: ['Agent on the way', '~6 min'],
    actions: ['star', 'chating'],
    slots: ['approved', 'approved', 'pending', 'pending'],
    offersLabel: '4 offers',
    approvedLabel: '2 Approved',
    pendingLabel: '2 Pending',
  },
  {
    person: 'jun-reyes',
    name: 'Jun Reyes',
    status: false,
    tags: ['Pre-scoring', '2 min'],
    actions: ['chating'],
    slots: ['approved', 'pending'],
    offersLabel: '2 offers',
    approvedLabel: '1 Approved',
    pendingLabel: '1 Pending',
  },
  {
    person: 'jose-reyes',
    name: 'Jose Reyes',
    status: 'Needs POS loan training',
    statusIcon: 'alert',
    tags: ['Pre-scoring', '4 min'],
    actions: ['book', 'chating'],
    slots: ['approved', 'approved'],
    offersLabel: '2 offers',
    approvedLabel: '2 Approved',
    pendingLabel: '',
  },
  {
    person: 'maria-santos',
    name: 'Maria Santos',
    status: false,
    tags: ['Last activity', '45 min ago'],
    actions: ['chating'],
    slots: ['approved', 'approved', 'pending'],
    offersLabel: '3 offers',
    approvedLabel: '2 Approved',
    pendingLabel: '1 Pending',
  },
  {
    person: 'bea-ocampo',
    name: 'Bea Ocampo',
    status: 'New — say hello',
    statusIcon: 'alert',
    tags: ['Last activity', '1h 05m ago'],
    actions: ['star', 'chating'],
    showOffers: false,
  },
  {
    person: 'carlo-del-rosa',
    name: 'Carlo Del Rosa',
    status: false,
    tags: ['On leave'],
    actions: ['chating'],
    showOffers: false,
  },
]

export function HomeScreen() {
  const navigate = useNavigate()
  const { setScheduled } = useFlow()

  function openJose() {
    setScheduled(false)
    navigate('/employee')
  }

  return (
    // Fixed dark top (segment + week + stats) that always stays. Below it, a scroll
    // zone where the white sheet rises over the bank-goal until it caps just under the
    // stats; then the employee cards scroll inside the white sheet.
    <div className="flex h-full flex-col overflow-hidden bg-project-black_bg">
      <div data-sb-dark className="shrink-0 bg-project-black_bg">
        <div className="flex flex-col gap-xxl px-l pb-2xxl" style={{ paddingTop: 74 }}>
          <div className="flex items-center justify-between">
            <SegmentButton items={['D', 'W', 'M']} activeIndex={0} />
            <Avatar person="louis-bautista" size={44} />
          </div>
          <WeekCalendar days={WEEK} activeIndex={2} />
          <StatsSummary items={SUMMARY} />
        </div>
      </div>

      {/* Collapse area: the static bank-goal sits behind; the white sheet scrolls up
          over it and caps just under the stats. Only the white sheet moves. */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        {/* Static bank-goal (does not move). */}
        <div className="absolute inset-x-0 top-0 px-l pt-s">
          <BankGoal
            label="Period plan"
            title="81 of 100 approved"
            buttonLabel="Details"
            progress={0.81}
            getLabel="Bank bonus"
            getValue="₱10,000"
            needLabel="Left"
            needValue="3 days"
          />
        </div>

        {/* Scrolling white sheet. A transparent spacer reveals the bank-goal; the sheet's
            rounded top is a sticky backdrop that pins at the cap; cards clip at that line. */}
        <div className="hide-scrollbar absolute inset-0 overflow-y-auto">
          <div style={{ height: 203 }} />

          <div className="relative">
            <div className="pointer-events-none sticky top-0 z-0" style={{ height: 0 }}>
              <div
                className="bg-project-gray_bg"
                style={{ height: 1000, borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
              />
            </div>

            <div className="relative z-10 flex flex-col gap-m px-l pb-xl pt-2xl">
              {CARDS.map((c) =>
                c.person === 'jose-reyes' ? (
                  <PathLink key={c.person} onClick={openJose}>
                    <EmployeeCard {...c} />
                  </PathLink>
                ) : (
                  <EmployeeCard key={c.person} {...c} />
                ),
              )}
            </div>

            <div className="sticky bottom-0 z-20">
              <TabBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
