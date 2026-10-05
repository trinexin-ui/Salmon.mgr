import { Button } from '@/shared/ui/atoms/Button'

type BankGoalProps = {
  label?: string
  title?: string
  progress?: number
  getLabel?: string
  getValue?: string
  needLabel?: string
  needValue?: string
  className?: string
}

// Figma: d-organism/bank-goal. Dark card (on_black/gray_1), header (texts + View All),
// gold progress bar, offer details row. Собран из: button.
export function BankGoal({
  label = 'Bank bonus',
  title = '34 of 50 offers',
  progress = 0.71,
  getLabel = 'Get',
  getValue = '₱2,000',
  needLabel = 'Need offers',
  needValue = '+1.8/day',
  className,
}: BankGoalProps) {
  return (
    <div
      style={{ borderRadius: 'var(--radius-l)' }}
      className={[
        'flex w-full flex-col gap-2xl bg-project-on_black-gray_1 p-l',
        className ?? '',
      ].join(' ')}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-xs_1">
          <span className="type-body_1 text-text-and-icon-secondary_black">{label}</span>
          <span className="type-h2 text-text-and-icon-white">{title}</span>
        </div>
        <Button label="View All" state="tertiary" color="black" />
      </div>
      <div className="flex flex-col gap-s">
        <div
          style={{ borderRadius: 'var(--radius-xs)' }}
          className="w-full border border-line-on_black-gray p-xxs"
        >
          <div className="h-l w-full overflow-hidden" style={{ borderRadius: 'var(--radius-xxs)' }}>
            <div
              className="bg-gradient-gold h-l"
              style={{ width: `${Math.round(progress * 100)}%`, borderRadius: 'var(--radius-xxs)' }}
            />
          </div>
        </div>
        <div className="type-body_2 flex items-center justify-between">
          <div className="flex items-center gap-xs_1">
            <span className="text-text-and-icon-secondary_black">{getLabel}</span>
            <span className="text-text-and-icon-white">{getValue}</span>
          </div>
          <div className="flex items-center gap-xs_1">
            <span className="text-text-and-icon-secondary_black">{needLabel}</span>
            <span className="text-text-and-icon-white">{needValue}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
