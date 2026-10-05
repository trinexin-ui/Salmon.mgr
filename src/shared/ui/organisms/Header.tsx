import { IconButton } from '@/shared/ui/atoms/IconButton'

type HeaderProps = {
  title: string
  description?: string
  secondButton?: boolean
  className?: string
}

// Figma: d-organism/header. Nav bar: back icon_button + centered title/desc +
// 1-2 more icon_buttons. Собран из: icon_button.
export function Header({ title, description, secondButton = false, className }: HeaderProps) {
  return (
    <div className={['flex w-full items-center justify-between', className ?? ''].join(' ')}>
      <IconButton icon="chevron-left" color="gray" size="big" />
      <div className="flex flex-1 flex-col items-center gap-xxs">
        <span className="type-h3 text-text-and-icon-primary">{title}</span>
        {description && (
          <span className="type-body_1 text-text-and-icon-secondary_black">{description}</span>
        )}
      </div>
      <div className="flex items-center gap-s">
        <IconButton icon="horizontal" color="gray" size="big" />
        {secondButton && <IconButton icon="horizontal" color="gray" size="big" />}
      </div>
    </div>
  )
}
