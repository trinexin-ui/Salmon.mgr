import { IconButton } from '@/shared/ui/atoms/IconButton'

type GoalBannerProps = {
  title: string
  subtitle: string
  onClick?: () => void
  className?: string
}

// Figma: молекула goal_banner (строка «Set a goal for the next period» на Period plan).
// Тёмная карточка on_black/gray_1: картинка 44px + тексты + icon_button chevron-right.
// Собран из: icon_button.
export function GoalBanner({ title, subtitle, onClick, className }: GoalBannerProps) {
  return (
    <div
      style={{ borderRadius: 'var(--radius-l)' }}
      className={[
        'flex w-full items-center justify-between bg-project-on_black-gray_1 p-m',
        className ?? '',
      ].join(' ')}
    >
      <div className="flex items-center gap-m">
        <img
          src="/assets/period-goal-thumb.png"
          alt=""
          className="block shrink-0 object-cover"
          style={{ width: 44, height: 44 }}
        />
        <div className="flex flex-col items-start gap-xxs">
          <span className="type-button_input_1 text-text-and-icon-white">{title}</span>
          <span className="type-body_2 text-text-and-icon-secondary_white">{subtitle}</span>
        </div>
      </div>
      <IconButton icon="chevron-right" color="dark" size="middle" onClick={onClick} />
    </div>
  )
}
