import { ItemMenu } from '@/shared/ui/molecules/ItemMenu'
import { type IconName } from '@/shared/ui/icons/Icon'

type MenuItem = { label: string; icon?: IconName }

// Figma: d-organism/menu (Default). White card, rounded-l, p-l, list of item_menu.
// Собран из: item_menu. rounded-l via var (Tailwind side-utility collision).
export function Menu({ items, className }: { items: MenuItem[]; className?: string }) {
  return (
    <div
      style={{ borderRadius: 'var(--radius-l)' }}
      className={['flex flex-col bg-project-white p-l', className ?? ''].join(' ')}
    >
      {items.map((it, i) => (
        <ItemMenu
          key={it.label + i}
          label={it.label}
          icon={it.icon}
          type={i === 0 ? 'up' : i === items.length - 1 ? 'down' : 'middle'}
        />
      ))}
    </div>
  )
}
