import { Grabber } from '@/shared/ui/atoms/Grabber'

type PullHandleProps = {
  label?: string
  className?: string
}

// Figma: молекула pull_handle (верх ленты Shoutouts). Планка grabber и подпись caption_1
// secondary_white по центру («Pull down»). Собран из: grabber.
export function PullHandle({ label = 'Pull down', className }: PullHandleProps) {
  return (
    <div className={['flex w-full flex-col items-center', className ?? ''].join(' ')}>
      <Grabber />
      <span className="type-caption_1 whitespace-nowrap text-text-and-icon-secondary_white">
        {label}
      </span>
    </div>
  )
}
