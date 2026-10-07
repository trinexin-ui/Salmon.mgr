import { IconButton } from '@/shared/ui/atoms/IconButton'
import { type IconName } from '@/shared/ui/icons/Icon'

type HeaderProps = {
  title?: string
  description?: string
  rightIcon?: IconName | null
  onBack?: () => void
  onRight?: () => void
  className?: string
}

// Figma: d-organism/header. Nav bar: back icon_button + centered title/desc + a
// trailing icon_button. Variants in the flow: full (back + "..."), title-only
// (back + title, no trailing — rightIcon={null}), and bare (back + "..."). Собран из: icon_button.
export function Header({
  title,
  description,
  rightIcon = 'horizontal',
  onBack,
  onRight,
  className,
}: HeaderProps) {
  return (
    <div className={['flex w-full items-center justify-between gap-m', className ?? ''].join(' ')}>
      {onBack ? (
        <span data-ui-path style={{ display: 'contents' }}>
          <IconButton icon="chevron-left" color="gray" size="big" onClick={onBack} />
        </span>
      ) : (
        <IconButton icon="chevron-left" color="gray" size="big" />
      )}
      <div className="flex flex-1 flex-col items-center gap-xxs">
        {title && <span className="type-h3 text-text-and-icon-primary">{title}</span>}
        {description && (
          <span className="type-body_1 text-text-and-icon-secondary_black">{description}</span>
        )}
      </div>
      {rightIcon ? (
        <IconButton icon={rightIcon} color="gray" size="big" onClick={onRight} />
      ) : (
        // keep the back button left-aligned by reserving the trailing slot (44px)
        <span style={{ width: 44 }} aria-hidden />
      )}
    </div>
  )
}
