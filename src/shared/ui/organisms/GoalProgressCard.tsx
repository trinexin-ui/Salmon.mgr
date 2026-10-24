import { IconButton } from '@/shared/ui/atoms/IconButton'
import { ProgressBar } from '@/shared/ui/atoms/ProgressBar'
import { Tag } from '@/shared/ui/atoms/Tag'

type GoalProgressCardProps = {
  title: string
  subtitle: string
  tag: string
  progress: number
  needLabel?: string
  needValue: string
  leftLabel?: string
  leftValue: string
  className?: string
}

// Figma: организм goal_progress_card (карточка «Coffee machine» на Period plan).
// Белая карточка: название + модель с chevron, тег справа, progress_bar (on_white),
// строка Need / Left. Собран из: tag, icon_button, progress_bar.
export function GoalProgressCard({
  title,
  subtitle,
  tag,
  progress,
  needLabel = 'Need',
  needValue,
  leftLabel = 'Left',
  leftValue,
  className,
}: GoalProgressCardProps) {
  return (
    <div
      style={{ borderRadius: 'var(--radius-l)' }}
      className={['flex w-full flex-col gap-2xl bg-project-white p-l', className ?? ''].join(' ')}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col items-start gap-xxs">
          <span className="type-body_1 text-text-and-icon-primary">{title}</span>
          <div className="flex items-center gap-xs_1">
            <span className="type-body_1 whitespace-nowrap text-text-and-icon-secondary_white">
              {subtitle}
            </span>
            <IconButton icon="chevron-right" color="gray" size="small" />
          </div>
        </div>
        <Tag label={tag} />
      </div>
      <div className="flex flex-col gap-s">
        <ProgressBar type="on_white" progress={progress} />
        <div className="type-body_2 flex items-center justify-between whitespace-nowrap">
          <div className="flex items-center gap-xs_1">
            <span className="text-text-and-icon-secondary_white">{needLabel}</span>
            <span className="text-text-and-icon-primary">{needValue}</span>
          </div>
          <div className="flex items-center gap-xs_1">
            <span className="text-text-and-icon-secondary_white">{leftLabel}</span>
            <span className="text-text-and-icon-primary">{leftValue}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
