import { type ReactNode } from 'react'

// Wraps a wired control that belongs to the clicked flow path. Marks it with
// data-ui-path (restores the pointer cursor and tells the inactive-boundary to stay
// quiet) and runs the navigation on click. Uses display:contents so it never changes
// layout — it is a pure behavior/marker wrapper, not a visible element.
export function PathLink({
  onClick,
  children,
  className,
}: {
  onClick: () => void
  children: ReactNode
  className?: string
}) {
  return (
    <span
      data-ui-path
      style={{ display: 'contents' }}
      className={className}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      {children}
    </span>
  )
}
