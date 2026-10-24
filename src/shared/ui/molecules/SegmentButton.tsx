import { Segment } from '@/shared/ui/atoms/Segment'

type SegmentButtonProps = {
  items: string[]
  activeIndex?: number
  className?: string
}

// Figma: d-molecules/segment_button. Pill on_black/gray_1 with segments;
// собран из: segment (default / active).
export function SegmentButton({ items, activeIndex = 0, className }: SegmentButtonProps) {
  return (
    <div
      className={[
        'inline-flex items-center rounded-max bg-project-on_black-gray_1 p-xs_1',
        className ?? '',
      ].join(' ')}
    >
      {items.map((label, i) => (
        <Segment key={label} label={label} state={i === activeIndex ? 'active' : 'default'} />
      ))}
    </div>
  )
}
