import { Icon, type IconName } from '@/shared/ui/icons/Icon'

type CardButtonProps = {
  label: string
  icon?: IconName
  notification?: boolean
  className?: string
}

// Figma: atom d-atoms/card_button (Default). on_white/gray_2 bg, rounded-l,
// p-m, flex-col center, 24px icon + body_1 label, optional 8px corner dot.
export function CardButton({
  label,
  icon = 'book',
  notification = false,
  className,
}: CardButtonProps) {
  return (
    <button
      type="button"
      className={[
        'relative inline-flex cursor-pointer flex-col items-center justify-center gap-s rounded-l bg-project-on_white-gray_2 p-m',
        className ?? '',
      ].join(' ')}
    >
      <Icon name={icon} size={24} className="text-text-and-icon-primary" />
      <span className="type-body_1 whitespace-nowrap text-center text-text-and-icon-primary">
        {label}
      </span>
      {notification && (
        <span className="absolute right-s top-s h-s w-s rounded-max bg-text-and-icon-primary" />
      )}
    </button>
  )
}
