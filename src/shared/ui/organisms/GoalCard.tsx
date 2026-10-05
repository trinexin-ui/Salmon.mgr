import { Radiobutton } from '@/shared/ui/atoms/Radiobutton'
import goal75 from '@/shared/ui/illustrations/goal-75.png'
import goal100 from '@/shared/ui/illustrations/goal-100.png'
import goal135 from '@/shared/ui/illustrations/goal-135.png'

type GoalImg = '75' | '100' | '135'

type GoalCardProps = {
  type?: 'period_plan' | 'distribution'
  img?: GoalImg
  category?: string
  title?: string
  subtitle?: string
  amount?: string
  selected?: boolean
  className?: string
}

// Figma: d-organism/goal_card (type period_plan/distribution). White card + radiobutton.
// period_plan: category + title + img_goal-card illustration (110px) + gold amount.
// distribution: title + subtitle. Собран из: radiobutton, img_goal-card.
const GOAL_IMG: Record<GoalImg, string> = { '75': goal75, '100': goal100, '135': goal135 }

export function GoalCard({
  type = 'period_plan',
  img = '75',
  category = 'Easy',
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
        'flex w-full flex-col gap-2xxl overflow-hidden bg-project-white p-l',
        className ?? '',
      ].join(' ')}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-xs_1">
          <span className="type-body_1 text-text-and-icon-secondary_white">{category}</span>
          <span className="type-h3 text-text-and-icon-primary">
            {title ?? '75 approved offers'}
          </span>
        </div>
        <Radiobutton active={selected} />
      </div>
      <div className="flex items-center justify-between">
        <img
          src={GOAL_IMG[img]}
          alt=""
          className="shrink-0 object-contain"
          style={{ width: 110, height: 110 }}
        />
        <span className="type-h2 bg-gradient-gold bg-clip-text text-transparent">{amount}</span>
      </div>
    </div>
  )
}
