import { Icon, type IconName } from '@/shared/ui/icons/Icon'

type CardButtonProps = {
  label: string
  icon?: IconName
  notification?: boolean
  fluid?: boolean
  onClick?: () => void
  className?: string
}

// Figma: d-atoms/card_button (118x78). on_white/gray_2 card, rounded-l, p-m,
// flex-col center: 24px icon + body_1 label, optional 8px corner dot.
// Fixed 118 width (no spacing token for 118); height follows content = 78.
export function CardButton({
  label,
  icon = 'book',
  notification = false,
  fluid = false,
  onClick,
  className,
}: CardButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ width: fluid ? undefined : 118, borderRadius: 'var(--radius-l)' }}
      className={[
        'relative cursor-pointer flex-col items-center justify-center gap-s bg-project-on_white-gray_2 p-m',
        fluid ? 'flex w-full' : 'inline-flex',
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
