import { Button } from '@/shared/ui/atoms/Button'
import { ProgressBar } from '@/shared/ui/atoms/ProgressBar'

type BankGoalProps = {
  label?: string
  title?: string
  progress?: number
  buttonLabel?: string
  getLabel?: string
  getValue?: string
  needLabel?: string
  needValue?: string
  bare?: boolean
  className?: string
}

// Figma: d-organism/bank-goal. Dark card (on_black/gray_1), header (texts + View All),
// gold progress bar, offer details row. `bare` — без карточки и кнопки (на тёмном фоне экрана).
// Собран из: button, progress_bar.
export function BankGoal({
  label = 'Bank bonus',
  title = '34 of 50 offers',
  progress = 0.71,
  buttonLabel = 'View All',
  getLabel = 'Get',
  getValue = '₱2,000',
  needLabel = 'Need offers',
  needValue = '+1.8/day',
  bare = false,
  className,
}: BankGoalProps) {
  return (
    <div
      style={bare ? undefined : { borderRadius: 'var(--radius-l)' }}
      className={[
        'flex w-full flex-col gap-2xl',
        bare ? '' : 'bg-project-on_black-gray_1 p-l',
        className ?? '',
      ].join(' ')}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-xs_1">
          <span className="type-body_1 text-text-and-icon-secondary_black">{label}</span>
          <span className="type-h2 text-text-and-icon-white">{title}</span>
        </div>
        {!bare && <Button label={buttonLabel} state="tertiary" color="black" />}
      </div>
      <div className="flex flex-col gap-s">
        <ProgressBar type="on_black" progress={progress} />
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
