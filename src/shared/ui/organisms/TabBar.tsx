import { Tab } from '@/shared/ui/molecules/Tab'

// Figma: d-organism/tab_bar (Default). Pill on_white/gray_2 with 3 tabs (flex-1):
// Home (active) / Team / Shoutouts. Собран из: tab.
export function TabBar({ className }: { className?: string }) {
  return (
    <div className={['flex w-full flex-col items-center px-s py-l', className ?? ''].join(' ')}>
      <div
        className="flex items-center gap-xs_1 rounded-max bg-project-on_white-gray_2 p-xs_1"
        style={{ width: 268 }}
      >
        <Tab className="flex-1" label="Home" icon="home" iconActive="home-fill" active />
        <Tab className="flex-1" label="Team" icon="crown" iconActive="crown" />
        <Tab
          className="flex-1"
          label="Shoutouts"
          icon="bubble-chat"
          iconActive="bubble-chat-fill"
        />
      </div>
    </div>
  )
}
