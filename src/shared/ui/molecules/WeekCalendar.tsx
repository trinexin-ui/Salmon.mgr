import { DateItem } from '@/shared/ui/atoms/DateItem'

export type WeekDay = { weekday: string; day: string }

type WeekCalendarProps = {
  days: WeekDay[]
  activeIndex?: number
  className?: string
}

// Opacity by distance from the active day (Figma: active 100%, neighbours 40%, edges 20%).
const OPACITY = [1, 0.4, 0.2]

// Figma: home week strip — date cells spread across the width, the active day full,
// the rest dimmed. Собран из: date_item.
export function WeekCalendar({ days, activeIndex = 0, className }: WeekCalendarProps) {
  return (
    <div className={['flex w-full items-start justify-between', className ?? ''].join(' ')}>
      {days.map((d, i) => (
        <DateItem
          key={d.weekday}
          weekday={d.weekday}
          day={d.day}
          opacity={OPACITY[Math.min(Math.abs(i - activeIndex), 2)]}
        />
      ))}
    </div>
  )
}
