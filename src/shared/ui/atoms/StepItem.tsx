type StepItemProps = {
  label: string
  active?: boolean
  className?: string
}

// Figma: atom d-atoms/step_item (active? yes/no). Column: body_2 label (secondary),
// 4px dot, full-width 4px progress line. active -> active_state, inactive -> line gray.
export function StepItem({ label, active = false, className }: StepItemProps) {
  const accent = active ? 'bg-project-active_state' : 'bg-line-on_white-gray_1'
  return (
    <div className={['flex w-full flex-col items-center gap-xs_1', className ?? ''].join(' ')}>
      <span className="type-body_2 w-full text-center text-text-and-icon-secondary_white">
        {label}
      </span>
      <span className={['h-xs_1 w-xs_1 rounded-max', accent].join(' ')} />
      <span className={['h-xs_1 w-full rounded-max', accent].join(' ')} />
    </div>
  )
}
