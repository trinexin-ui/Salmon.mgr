import { Avatar } from '@/shared/ui/atoms/Avatar'
import { IconButton } from '@/shared/ui/atoms/IconButton'
import { type Person } from '@/shared/ui/avatars/people'
import { type IconName } from '@/shared/ui/icons/Icon'

type HeaderProps = {
  title?: string
  description?: string
  rightIcon?: IconName | null
  // several trailing buttons (profile: bell + setting); takes precedence over rightIcon
  rightIcons?: IconName[]
  theme?: 'light' | 'dark'
  backHidden?: boolean
  // persona photo instead of the back button (Shoutouts)
  leftAvatar?: Person
  onBack?: () => void
  onRight?: () => void
  className?: string
}

// Figma: d-organism/header. Nav bar: back icon_button + centered title/desc + a
// trailing icon_button. Variants in the flow: full (back + "..."), title-only
// (back + title, no trailing — rightIcon={null}), and bare (back + "..."). `theme="dark"` —
// для тёмного экрана: белый заголовок и кнопки on_black/gray_2; `backHidden` — без «‹» (место сохранено). Собран из: icon_button.
export function Header({
  title,
  description,
  rightIcon = 'horizontal',
  rightIcons,
  theme = 'light',
  backHidden = false,
  leftAvatar,
  onBack,
  onRight,
  className,
}: HeaderProps) {
  const dark = theme === 'dark'
  const btn = dark ? 'dark' : 'gray'
  return (
    <div className={['flex w-full items-center justify-between gap-m', className ?? ''].join(' ')}>
      {leftAvatar ? (
        <Avatar person={leftAvatar} size={44} />
      ) : backHidden ? (
        // no back button on this step — keep its 44px slot so the title stays centered
        <span style={{ width: 44, height: 44 }} aria-hidden />
      ) : onBack ? (
        <span data-ui-path style={{ display: 'contents' }}>
          <IconButton icon="chevron-left" color={btn} size="big" onClick={onBack} />
        </span>
      ) : (
        <IconButton icon="chevron-left" color={btn} size="big" />
      )}
      <div className="flex flex-1 flex-col items-center gap-xxs">
        {title && (
          <span
            className={[
              'type-h3',
              dark ? 'text-text-and-icon-white' : 'text-text-and-icon-primary',
            ].join(' ')}
          >
            {title}
          </span>
        )}
        {description && (
          <span
            className={[
              'type-body_1',
              dark ? 'text-text-and-icon-secondary_black' : 'text-text-and-icon-secondary_white',
            ].join(' ')}
          >
            {description}
          </span>
        )}
      </div>
      {rightIcons ? (
        <div className="flex items-center gap-s">
          {rightIcons.map((ic) => (
            <IconButton key={ic} icon={ic} color={btn} size="big" />
          ))}
        </div>
      ) : rightIcon ? (
        onRight ? (
          <span data-ui-path style={{ display: 'contents' }}>
            <IconButton icon={rightIcon} color={btn} size="big" onClick={onRight} />
          </span>
        ) : (
          <IconButton icon={rightIcon} color={btn} size="big" />
        )
      ) : (
        // keep the back button left-aligned by reserving the trailing slot (44px)
        <span style={{ width: 44 }} aria-hidden />
      )}
    </div>
  )
}
