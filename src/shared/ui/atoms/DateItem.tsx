type DateItemProps = {
  weekday: string
  day: string
  /** 1 = active day; neighbours/edges dim via opacity (set by WeekCalendar). */
  opacity?: number
  className?: string
}

// Figma: home week strip cell ("Date Group"): weekday over day number (both body_1),
// centered. One color (text-and-icon/secondary_black); the active day is full opacity,
// the rest dim by distance — so the active day reads light but is not pure white.
export function DateItem({ weekday, day, opacity = 1, className }: DateItemProps) {
  return (
    <div
      style={{ opacity }}
      className={[
        'flex flex-col items-center gap-xs_1 text-text-and-icon-secondary_black',
        className ?? '',
      ].join(' ')}
    >
      <span className="type-body_1">{weekday}</span>
      <span className="type-body_1">{day}</span>
    </div>
  )
}
