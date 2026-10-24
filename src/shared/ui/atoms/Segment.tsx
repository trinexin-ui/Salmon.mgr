type SegmentProps = {
  label: string
  state?: 'default' | 'active'
  className?: string
}

// Figma: atom segment (один сегмент segment_button). default — прозрачный, active — плашка
// on_black/gray_2; текст body_2 text-and-icon/white. Выделен из segment_button.
export function Segment({ label, state = 'default', className }: SegmentProps) {
  return (
    <span
      className={[
        'type-body_2 inline-flex cursor-pointer items-center justify-center rounded-max px-m py-xs_2 text-text-and-icon-white',
        state === 'active' ? 'bg-project-on_black-gray_2' : '',
        className ?? '',
      ].join(' ')}
    >
      {label}
    </span>
  )
}
