import { Icon, type IconName } from '@/shared/ui/icons/Icon'

type TabProps = {
  label: string
  icon: IconName
  iconActive: IconName
  active?: boolean
  className?: string
}

// Figma: d-molecules/tab (active? yes/no). Bottom-nav item: 28px icon + caption_2 label.
// active -> white pill bg + filled icon. Fixed 123 width (no token).
export function Tab({ label, icon, iconActive, active = false, className }: TabProps) {
  return (
    <span
      style={{ width: 123 }}
      className={[
        'inline-flex cursor-pointer flex-col items-center gap-xxs rounded-max py-xs_2',
        active ? 'bg-project-white' : '',
        className ?? '',
      ].join(' ')}
    >
      <Icon name={active ? iconActive : icon} size={28} className="text-text-and-icon-primary" />
      <span className="type-caption_2 text-text-and-icon-primary">{label}</span>
    </span>
  )
}
