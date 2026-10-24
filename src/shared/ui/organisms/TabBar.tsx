import { Tab } from '@/shared/ui/molecules/Tab'

type TabId = 'home' | 'team' | 'shoutouts'

type TabBarProps = {
  // selected tab (white pill, filled icon); Home by default
  active?: TabId
  // tabs wired to the flow path (get the pointer cursor and run the handler)
  links?: Partial<Record<TabId, () => void>>
  className?: string
}

// Figma: d-organism/tab_bar (Default). Pill on_white/gray_2 with 3 tabs (flex-1):
// Home / Team / Shoutouts; `active` — выбранная вкладка. Собран из: tab.
export function TabBar({ active = 'home', links, className }: TabBarProps) {
  const tab = (id: TabId, label: string, icon: 'home' | 'crown' | 'bubble-chat', iconActive: 'home-fill' | 'crown' | 'bubble-chat-fill') => {
    const el = (
      <Tab
        className="flex-1"
        label={label}
        icon={icon}
        iconActive={iconActive}
        active={active === id}
      />
    )
    const go = links?.[id]
    return go ? (
      <span key={id} data-ui-path style={{ display: 'contents' }} onClick={go}>
        {el}
      </span>
    ) : (
      <span key={id} style={{ display: 'contents' }}>
        {el}
      </span>
    )
  }
  return (
    <div className={['flex w-full flex-col items-center px-s py-l', className ?? ''].join(' ')}>
      <div
        className="flex items-center gap-xs_1 rounded-max bg-project-on_white-gray_2 p-xs_1"
        style={{ width: 268 }}
      >
        {tab('home', 'Home', 'home', 'home-fill')}
        {tab('team', 'Team', 'crown', 'crown')}
        {tab('shoutouts', 'Shoutouts', 'bubble-chat', 'bubble-chat-fill')}
      </div>
    </div>
  )
}
