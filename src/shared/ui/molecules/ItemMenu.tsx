import { Icon, type IconName } from '@/shared/ui/icons/Icon'

type ItemMenuProps = {
  label: string
  icon?: IconName
  type?: 'up' | 'middle' | 'down'
  className?: string
}

// Figma: d-molecules/item_menu (type up/middle/down). List row: icon + h3 label +
// chevron, with a divider (up/middle have bottom border, down is last). Собран из: icon.
export function ItemMenu({ label, icon = 'group', type = 'up', className }: ItemMenuProps) {
  const divider = type === 'down' ? '' : 'border-b border-line-on_white-gray_1'
  return (
    <div className={['flex items-center gap-m py-m', divider, className ?? ''].join(' ')}>
      <Icon name={icon} size={24} className="text-text-and-icon-primary" />
      <span className="type-h3 flex-1 text-text-and-icon-primary">{label}</span>
      <Icon name="chevron-right" size={20} className="text-text-and-icon-primary" />
    </div>
  )
}
