import { IconButton } from '@/shared/ui/atoms/IconButton'
import { Avatar } from '@/shared/ui/atoms/Avatar'
import { type Person } from '@/shared/ui/avatars/people'

type HeaderProps = {
  title: string
  description?: string
  type?: '#1' | '#2'
  secondButton?: boolean
  person?: Person
  className?: string
}

// Figma: d-organism/header (type #1/#2).
// #1 nav: back icon_button + centered title/desc + 1-2 more icon_buttons.
// #2 profile: title (h2) + desc + 44px avatar. Собран из: icon_button, avatar.
export function Header({
  title,
  description,
  type = '#1',
  secondButton = false,
  person = 'jose-reyes',
  className,
}: HeaderProps) {
  if (type === '#2') {
    return (
      <div className={['flex w-full items-center justify-between', className ?? ''].join(' ')}>
        <div className="flex flex-1 flex-col gap-xxs">
          <span className="type-h2 text-text-and-icon-primary">{title}</span>
          {description && (
            <span className="type-body_1 text-text-and-icon-secondary_black">{description}</span>
          )}
        </div>
        <Avatar person={person} size={44} />
      </div>
    )
  }
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
