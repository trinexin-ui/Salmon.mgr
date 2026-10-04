type TagProps = {
  label: string
  className?: string
}

// Figma: atom d-atoms/tag (Default). White bg, 1px line border, rounded-xs,
// px-s py-xs_1, body_2 primary text.
export function Tag({ label, className }: TagProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-xs border border-line-on_white-gray_1 bg-project-white px-s py-xs_1',
        className ?? '',
      ].join(' ')}
    >
      <span className="type-body_2 whitespace-nowrap text-text-and-icon-primary">{label}</span>
    </span>
  )
}
