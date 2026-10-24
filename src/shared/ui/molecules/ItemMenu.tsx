import { Icon, type IconName } from '@/shared/ui/icons/Icon'

type ItemMenuProps = {
  label: string
  icon?: IconName
  type?: 'up' | 'middle' | 'down'
  // profile layout: 20px label row, 12px gaps, divider only under the text column
  dense?: boolean
  // red item (Exit)
  danger?: boolean
  onClick?: () => void
  className?: string
}

// Figma: d-molecules/item_menu (type up/middle/down). List row: icon + h3 label +
// chevron, with a divider (up/middle have bottom border, down is last). Собран из: icon.
// `dense` — раскладка из профиля: разделитель только под колонкой текста, шаг 44px.
export function ItemMenu({
  label,
  icon = 'group',
  type = 'up',
  dense = false,
  danger = false,
  onClick,
  className,
}: ItemMenuProps) {
  const ink = danger ? 'text-project-red' : 'text-text-and-icon-primary'
  // Figma: icon and chevron are text-and-icon/secondary_white (gray); only the label is primary.
  const glyph = danger ? 'text-project-red' : 'text-text-and-icon-secondary_white'

  if (dense) {
    return (
      <div
        onClick={onClick}
        className={[
          'flex gap-m',
          type === 'up' ? 'items-start' : 'items-center',
          type === 'down' ? 'pt-m' : '',
          className ?? '',
        ].join(' ')}
      >
        <Icon name={icon} size={24} className={glyph} />
        <div
          className={[
            'relative flex flex-1 items-center justify-between',
            type === 'up' ? 'pb-m' : type === 'middle' ? 'py-m' : '',
          ].join(' ')}
        >
          <span className={['type-h3', ink].join(' ')}>{label}</span>
          <Icon name="chevron-right" size={20} className={glyph} />
          {/* Figma: the divider has zero height (overlays the edge), so rows keep a 44px pitch. */}
          {type !== 'down' && (
            <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-line-on_white-gray_1" />
          )}
        </div>
      </div>
    )
  }

  const divider = type === 'down' ? '' : 'border-b border-line-on_white-gray_1'
  return (
    <div
      onClick={onClick}
      className={['flex items-center gap-m py-m', divider, className ?? ''].join(' ')}
    >
      <Icon name={icon} size={24} className={glyph} />
      <span className={['type-h3 flex-1', ink].join(' ')}>{label}</span>
      <Icon name="chevron-right" size={20} className={glyph} />
    </div>
  )
}
