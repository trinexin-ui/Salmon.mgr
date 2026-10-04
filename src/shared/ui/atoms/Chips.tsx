type ChipsProps = {
  label: string
  active?: boolean
  isNew?: boolean
  className?: string
}

// Figma: atom d-atoms/chips (active? yes/no). body_1 label + trailing 4px dot.
// active  -> active_state text + active_state dot
// inactive-> secondary_white text + secondary_white dot, optional "new" badge
export function Chips({ label, active = false, isNew = false, className }: ChipsProps) {
  return (
    <span
      className={['inline-flex cursor-pointer items-center gap-xs_1', className ?? ''].join(' ')}
    >
      <span
        className={[
          'type-body_1 whitespace-nowrap',
          active ? 'text-project-active_state' : 'text-text-and-icon-secondary_white',
        ].join(' ')}
      >
        {label}
      </span>
      {!active && isNew && (
        <span className="inline-flex items-center rounded-max bg-project-on_white-gray_2 px-xs_2 py-xxs">
          <span className="type-caption_1 text-text-and-icon-secondary_white">new</span>
        </span>
      )}
      <span
        className={[
          'h-xs_1 w-xs_1 rounded-max',
          active ? 'bg-project-active_state' : 'bg-text-and-icon-secondary_white',
        ].join(' ')}
      />
    </span>
  )
}
