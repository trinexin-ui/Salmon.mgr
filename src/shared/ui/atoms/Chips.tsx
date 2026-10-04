type ChipsProps = {
  label: string
  state?: 'active' | 'non_active' | 'new'
  className?: string
}

// Figma: atom d-atoms/chips (state active/non_active/new). body_1 label.
// active -> active_state text + dot; non_active -> secondary text + dot;
// new -> secondary text + "new" badge (no dot).
export function Chips({ label, state = 'non_active', className }: ChipsProps) {
  const isActive = state === 'active'
  return (
    <span
      className={['inline-flex cursor-pointer items-center gap-xs_1', className ?? ''].join(' ')}
    >
      <span
        className={[
          'type-body_1 whitespace-nowrap',
          isActive ? 'text-project-active_state' : 'text-text-and-icon-secondary_white',
        ].join(' ')}
      >
        {label}
      </span>
      {state === 'new' ? (
        <span className="inline-flex items-center rounded-max bg-project-on_white-gray_2 px-xs_2 py-xxs">
          <span className="type-caption_1 text-text-and-icon-secondary_white">new</span>
        </span>
      ) : (
        <span
          className={[
            'h-xs_1 w-xs_1 rounded-max',
            isActive ? 'bg-project-active_state' : 'bg-text-and-icon-secondary_white',
          ].join(' ')}
        />
      )}
    </span>
  )
}
