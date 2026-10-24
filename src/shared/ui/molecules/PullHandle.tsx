import { Grabber } from '@/shared/ui/atoms/Grabber'

type PullHandleProps = {
  label?: string
  // 0..1, fades the caption out (the screen hides it while the sheet is pulled away)
  labelOpacity?: number
  className?: string
}

// Figma: молекула pull_handle (верх ленты Shoutouts). Планка grabber и подпись caption_1
// secondary_white по центру («Pull down»). Собран из: grabber.
export function PullHandle({ label = 'Pull down', labelOpacity = 1, className }: PullHandleProps) {
  return (
    <div className={['flex w-full flex-col items-center', className ?? ''].join(' ')}>
      <Grabber />
      <span
        style={{ opacity: labelOpacity }}
        className="type-caption_1 whitespace-nowrap text-text-and-icon-secondary_white"
      >
        {label}
      </span>
    </div>
  )
}
