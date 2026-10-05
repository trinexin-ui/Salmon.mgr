import { Radiobutton } from '@/shared/ui/atoms/Radiobutton'
import bellUrl from '@/shared/ui/illustrations/bell.png'

type GoalCardProps = {
  type?: 'period_plan' | 'distribution'
  category?: string
  title?: string
  subtitle?: string
  amount?: string
  selected?: boolean
  className?: string
}

// Figma: d-organism/goal_card (type period_plan/distribution). White card + radiobutton.
// period_plan: category + title + gold amount + bell. distribution: title + subtitle.
// Собран из: radiobutton. (Опциональный встроенный slider пока не включён.)
export function GoalCard({
  type = 'period_plan',
  category = 'Realistic',
  title,
  subtitle = 'Split evenly ₱6,000 across all team',
  amount = '₱5,000',
  selected = false,
  className,
}: GoalCardProps) {
  if (type === 'distribution') {
    return (
      <div
        style={{ borderRadius: 'var(--radius-l)' }}
        className={['flex w-full items-center gap-xl bg-project-white p-l', className ?? ''].join(
          ' ',
        )}
      >
        <div className="flex flex-1 flex-col gap-s">
          <span className="type-h3 text-text-and-icon-primary">{title ?? 'Equal'}</span>
          {subtitle && (
            <span className="type-body_2 text-text-and-icon-secondary_white">{subtitle}</span>
          )}
        </div>
        <Radiobutton active={selected} />
      </div>
    )
  }
  return (
    <div
      style={{ borderRadius: 'var(--radius-l)' }}
      className={[
        'relative flex w-full flex-col justify-between gap-2xxl overflow-hidden bg-project-white p-l',
        className ?? '',
      ].join(' ')}
    >
      <img
        src={bellUrl}
        alt=""
        className="pointer-events-none absolute object-contain"
        style={{ width: 168, left: -14, bottom: -8 }}
      />
      <div className="relative flex items-start justify-between">
        <div className="flex flex-col gap-xs_1">
          <span className="type-body_1 text-text-and-icon-secondary_white">{category}</span>
          <span className="type-h3 text-text-and-icon-primary">
            {title ?? '75 approved offers'}
          </span>
        </div>
        <Radiobutton active={selected} />
      </div>
      <span className="type-h2 bg-gradient-gold relative self-end bg-clip-text text-transparent">
        {amount}
      </span>
    </div>
  )
}
