type PersonTagProps = {
  name: string
  avatar?: string
  className?: string
}

// Figma: atom d-atoms/person_tag (Default). Pill on_white/gray_2, 20px avatar + body_2 name.
export function PersonTag({ name, avatar, className }: PersonTagProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-xs_1 rounded-max bg-project-on_white-gray_2 py-xs_1 pl-xs_1 pr-s',
        className ?? '',
      ].join(' ')}
    >
      <span
        className="shrink-0 overflow-hidden rounded-max bg-project-on_white-gray_3"
        style={{ width: 20, height: 20 }}
      >
        {avatar && <img src={avatar} alt="" className="h-full w-full object-cover" />}
      </span>
      <span className="type-body_2 whitespace-nowrap text-text-and-icon-primary">{name}</span>
    </span>
  )
}
