import { ItemMenu } from '@/shared/ui/molecules/ItemMenu'
import { type IconName } from '@/shared/ui/icons/Icon'

type MenuItem = { label: string; icon?: IconName; danger?: boolean; onClick?: () => void }

// Figma: d-organism/menu (Default). White card, rounded-l, p-l, list of item_menu.
// Собран из: item_menu. rounded-l via var (Tailwind side-utility collision).
// `dense` — раскладка профиля (см. item_menu); пункт с `onClick` — контрол пути (курсор-указатель).
export function Menu({
  items,
  dense = false,
  className,
}: {
  items: MenuItem[]
  dense?: boolean
  className?: string
}) {
  return (
    <div
      style={{ borderRadius: 'var(--radius-l)' }}
      className={['flex flex-col bg-project-white p-l', className ?? ''].join(' ')}
    >
      {items.map((it, i) => (
        <span
          key={it.label + i}
          data-ui-path={it.onClick ? '' : undefined}
          style={{ display: 'contents' }}
        >
          <ItemMenu
            label={it.label}
            icon={it.icon}
            danger={it.danger}
            onClick={it.onClick}
            dense={dense}
            type={i === 0 ? 'up' : i === items.length - 1 ? 'down' : 'middle'}
          />
        </span>
      ))}
    </div>
  )
}
