import { type ReactNode } from 'react'
import { Button } from '@/shared/ui/atoms/Button'
import { GOAL_ILLUSTRATIONS, GOAL_SUMMARY_BAG, type GoalIllustration } from '@/shared/ui/illustrations/goalIllustrations'

type GoalSummaryProps = {
  illustration?: GoalIllustration
  category: string
  title: string
  children?: ReactNode
  className?: string
}

// Figma: организм goal_summary (карточка review на step4). Белая карточка: иллюстрация цели
// 80×73 по центру (мешок растянут на весь размер, верёвка справа), категория + название, кнопка Edit; под ними children (edit_card со
// сводкой Split / Distribution). Собран из: button, img_goal-card.
export function GoalSummary({
  illustration = 'bag',
  category,
  title,
  children,
  className,
}: GoalSummaryProps) {
  return (
    <div
      style={{ borderRadius: 'var(--radius-l)' }}
      className={[
        'flex w-full flex-col items-center gap-2xl bg-project-white px-l pt-2xxl pb-l',
        className ?? '',
      ].join(' ')}
    >
      <div className="flex flex-col items-center gap-m">
        <img
          src={illustration === 'bag' ? GOAL_SUMMARY_BAG : GOAL_ILLUSTRATIONS[illustration]}
          alt=""
          className="block"
          // Figma: the bag fills the 80×73 box exactly (size-full, no aspect lock); the owner wants
          // the rope on the right (unmirrored); the other variants keep their aspect.
          style={
            illustration === 'bag'
              ? { width: 80, height: 73, maxWidth: 'none', objectFit: 'fill' }
              : { width: 80, height: 73, objectFit: 'contain', objectPosition: 'bottom' }
          }
        />
        <div className="flex flex-col items-center gap-m">
          <div className="flex flex-col items-center gap-xs_1 whitespace-nowrap">
            <span className="type-body_1 text-text-and-icon-secondary_white">{category}</span>
            <span className="type-h3 text-text-and-icon-primary">{title}</span>
          </div>
          <Button label="Edit" state="tertiary" color="gray" />
        </div>
      </div>
      <div className="flex w-full flex-col gap-m">{children}</div>
    </div>
  )
}
