type SegmentButtonProps = {
  items: string[]
  activeIndex?: number
  className?: string
}

// Figma: d-molecules/segment_button. Pill on_black/gray_1 with segments;
// active segment on_black/gray_2, white body_2 text.
export function SegmentButton({ items, activeIndex = 0, className }: SegmentButtonProps) {
  return (
    <div
      className={[
        'inline-flex items-center rounded-max bg-project-on_black-gray_1 p-xs_1',
        className ?? '',
      ].join(' ')}
    >
      {items.map((label, i) => (
        <span
          key={label}
          className={[
            'type-body_2 inline-flex cursor-pointer items-center justify-center rounded-max px-m py-xs_2 text-text-and-icon-white',
            i === activeIndex ? 'bg-project-on_black-gray_2' : '',
          ].join(' ')}
        >
          {label}
        </span>
      ))}
    </div>
  )
}
