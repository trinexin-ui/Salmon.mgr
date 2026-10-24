import { type ReactNode } from 'react'
import { Radiobutton } from '@/shared/ui/atoms/Radiobutton'
import { GOAL_ILLUSTRATIONS, type GoalIllustration } from '@/shared/ui/illustrations/goalIllustrations'

type GoalCardProps = {
  type?: 'period_plan' | 'distribution'
  category?: string
  title?: string
  subtitle?: string
  amount?: string
  selected?: boolean
  illustration?: GoalIllustration
  onClick?: () => void
  // distribution: content shown under the title row (Hybrid — the embedded slider)
  children?: ReactNode
  className?: string
}

// Figma: d-organism/goal_card (type period_plan/distribution). White card + radiobutton.
// period_plan: fixed 140px card, category + title (top) + gold amount (bottom), with the
// img_goal-card coins illustration absolutely placed at left:16/top:53 (clipped).
// distribution: title + subtitle (+ `children` под строкой — у Hybrid встроенный slider).
// Собран из: radiobutton, img_goal-card.
export function GoalCard({
  type = 'period_plan',
  category = 'Realistic',
  title,
  subtitle = 'Split evenly ₱6,000 across all team',
  amount = '₱5,000',
  selected = false,
  illustration = 'coins',
  onClick,
  children,
  className,
}: GoalCardProps) {
  if (type === 'distribution') {
    return (
      <div
        style={{ borderRadius: 'var(--radius-l)' }}
        onClick={onClick}
        className={['flex w-full flex-col gap-2xl bg-project-white p-l', className ?? ''].join(' ')}
      >
        <div className="flex w-full items-center gap-xl">
          <div className="flex flex-1 flex-col gap-s">
            <span className="type-h3 text-text-and-icon-primary">{title ?? 'Equal'}</span>
            {subtitle && (
              <span className="type-body_2 text-text-and-icon-secondary_white">{subtitle}</span>
            )}
          </div>
          <Radiobutton active={selected} />
        </div>
        {children}
      </div>
    )
  }
  return (
    <div
      style={{ borderRadius: 'var(--radius-l)', height: 140 }}
      onClick={onClick}
      className={[
        'relative flex w-full flex-col overflow-hidden bg-project-white p-l',
        className ?? '',
      ].join(' ')}
    >
      <div className="flex w-full flex-1 flex-col items-end justify-between">
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col gap-xs_1">
            <span className="type-body_1 text-text-and-icon-secondary_white">{category}</span>
            <span className="type-h3 text-text-and-icon-primary">
              {title ?? '75 approved offers'}
            </span>
          </div>
          <Radiobutton active={selected} />
        </div>
        <span className="type-h2 bg-gradient-gold bg-clip-text text-transparent">{amount}</span>
      </div>
      {/* Figma: img_goal-card — coins, absolute left:16 / top:53, clipped by the card. */}
      <img
        src={GOAL_ILLUSTRATIONS[illustration]}
        alt=""
        className="pointer-events-none absolute"
        style={{ left: 16, top: 53, width: 110, height: 110, objectFit: 'contain', objectPosition: 'bottom' }}
      />
    </div>
  )
}
