import { Icon, type IconName } from '@/shared/ui/icons/Icon'

type TagProps = {
  label: string
  icon?: IconName
  className?: string
}

// Figma: atom d-atoms/tag (Default). White bg, 1px line border, rounded-xs,
// px-s py-xs_1, optional 16px leading icon, body_2 primary text.
export function Tag({ label, icon, className }: TagProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-xs_1 rounded-xs border border-line-on_white-gray_1 bg-project-white px-s py-xs_1',
        className ?? '',
      ].join(' ')}
    >
      {icon && <Icon name={icon} size={16} className="text-text-and-icon-primary" />}
      <span className="type-body_2 whitespace-nowrap text-text-and-icon-primary">{label}</span>
    </span>
  )
}
