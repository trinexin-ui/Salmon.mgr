import { Button } from '@/shared/ui/atoms/Button'
import { IconButton } from '@/shared/ui/atoms/IconButton'

type Seg = 'green' | 'gray'
type Bar = { label: string; segments: Seg[] }

type StatsCardProps = {
  type?: 'employee' | 'manager'
  title?: string
  className?: string
}

// Figma: d-organism/stats_card (type employee/manager). White card, rounded-l.
// employee: "Total earned" + Approved/Pending legend + per-day bar chart.
// manager: two gray tiles — Team offers (+delta) / Your reward (+wallet button).
// Собран из: button, icon_button.
const DAYS: Bar[] = [
  { label: '9', segments: ['gray', 'green'] },
  { label: '12', segments: ['gray', 'gray'] },
  { label: '13', segments: ['gray', 'gray', 'green', 'green'] },
  { label: '16', segments: ['gray', 'green'] },
  { label: '17', segments: ['gray', 'gray', 'green'] },
  { label: '20', segments: ['gray', 'green', 'green'] },
  { label: '21', segments: ['gray'] },
  { label: '24', segments: ['green'] },
  { label: '25', segments: ['gray', 'green', 'green'] },
  { label: '28', segments: ['gray', 'gray'] },
  { label: '29', segments: ['green', 'green'] },
]

// Small upward delta triangle (Figma Polygon 2), green.
function DeltaUp() {
  return (
    <span
      aria-hidden
      className="inline-block shrink-0"
      style={{
        width: 0,
        height: 0,
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderBottom: '7px solid var(--color-project-green)',
      }}
    />
  )
}

function Header({ title }: { title: string }) {
  return (
    <div className="flex w-full items-center justify-between">
      <span className="type-h3 text-text-and-icon-primary">{title}</span>
      <Button label="See all" state="tertiary" color="gray" />
    </div>
  )
}

export function StatsCard({ type = 'employee', title = 'Stats for July', className }: StatsCardProps) {
  if (type === 'manager') {
    return (
      <div
        style={{ borderRadius: 'var(--radius-l)' }}
        className={['flex w-full flex-col gap-xl bg-project-white p-l', className ?? ''].join(' ')}
      >
        <Header title={title} />
        <div className="flex w-full items-stretch gap-m">
          <div
            style={{ borderRadius: 'var(--radius-m)' }}
            className="flex flex-1 flex-col justify-between gap-m bg-project-gray_bg p-m"
          >
            <span className="type-body_2 text-text-and-icon-secondary_white">Team offers</span>
            <div className="flex items-end gap-s">
              <span className="type-h2 text-text-and-icon-primary">120</span>
              <div className="flex items-center gap-xs_1">
                <DeltaUp />
                <span className="type-body_1 text-project-green">+12%</span>
              </div>
            </div>
          </div>
          <div
            style={{ borderRadius: 'var(--radius-m)' }}
            className="flex flex-1 flex-col gap-s bg-project-gray_bg p-m"
          >
            <span className="type-body_2 text-text-and-icon-secondary_white">Your reward</span>
            <div className="flex items-center justify-between">
              <span className="type-h2 text-text-and-icon-primary">₱2,500</span>
              <IconButton icon="wallet" color="gray" size="middle" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{ borderRadius: 'var(--radius-l)' }}
      className={['flex w-full flex-col gap-xl bg-project-white p-l', className ?? ''].join(' ')}
    >
      <Header title={title} />
      <div className="flex w-full flex-col gap-l">
        <div className="flex flex-col gap-xs_1">
          <span className="type-body_2 text-text-and-icon-secondary_white">Total earned</span>
          <div className="flex items-end gap-xs_2">
            <span className="type-h2 text-text-and-icon-primary">₱3,300</span>
            <div className="flex items-center gap-xs_1">
              <DeltaUp />
              <span className="type-body_1 text-project-green">+3%</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-s">
          <LegendRow dot="green" label="Approved" value="18" delta="+21%" />
          <LegendRow dot="gray" label="Pending" value="2" delta="+3%" />
        </div>
      </div>
      <div className="flex w-full items-end gap-s">
        {DAYS.map((bar) => (
          <div key={bar.label} className="flex min-w-px flex-1 flex-col items-center gap-xxs">
            <div
              className="flex w-full flex-col justify-end gap-xxs p-xxs"
              style={{ height: 152 }}
            >
              {bar.segments.map((s, i) => (
                <span
                  key={i}
                  className={[
                    'w-full shrink-0',
                    s === 'green' ? 'bg-project-green' : 'bg-project-on_white-gray_1',
                  ].join(' ')}
                  style={{ height: 35, borderRadius: 4 }}
                />
              ))}
            </div>
            <span className="type-caption_1 text-text-and-icon-secondary_white">{bar.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function LegendRow({
  dot,
  label,
  value,
  delta,
}: {
  dot: Seg
  label: string
  value: string
  delta: string
}) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-s">
        <span
          className={[
            'size-3 rounded-max',
            dot === 'green' ? 'bg-project-green' : 'bg-project-on_white-gray_1',
          ].join(' ')}
        />
        <span className="type-body_2 text-text-and-icon-secondary_white">{label}</span>
      </div>
      <div className="flex w-[72px] items-center justify-between">
        <span className="type-body_2 text-text-and-icon-primary">{value}</span>
        <div className="flex items-center gap-xs_1">
          <DeltaUp />
          <span className="type-body_2 text-project-green">{delta}</span>
        </div>
      </div>
    </div>
  )
}
