import { Button } from '@/shared/ui/atoms/Button'

type DateTimeRowProps = {
  title: string
  subtitle: string
  className?: string
}

// Figma: training "Event Info" row — calendar emoji + date/time (button_input_1) over
// a caption (body_2 secondary), with a trailing Edit button. Собран из: button.
export function DateTimeRow({ title, subtitle, className }: DateTimeRowProps) {
  return (
    <div className={['flex w-full items-center justify-between gap-m', className ?? ''].join(' ')}>
      <div className="flex items-center gap-m">
        <img
          src="/assets/calendar-emoji.png"
          alt=""
          style={{ width: 41, height: 44 }}
          className="shrink-0 object-contain"
        />
        <div className="flex flex-col gap-xxs">
          <span className="type-button_input_1 text-text-and-icon-primary">{title}</span>
          <span className="type-body_2 text-text-and-icon-secondary_white">{subtitle}</span>
        </div>
      </div>
      <Button label="Edit" state="tertiary" color="gray" />
    </div>
  )
}
