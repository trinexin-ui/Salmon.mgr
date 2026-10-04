import { Icon, type IconName } from '@/shared/ui/icons/Icon'

type ButtonProps = {
  label: string
  state?: 'primary' | 'secondary' | 'tertiary'
  color?: 'black' | 'gray'
  icon?: IconName
  className?: string
}

// Figma: atom d-atoms/button (state primary/secondary/tertiary, color black/gray).
// primary  -> project/action bg, gradient (white_gray) label, optional leading icon
// secondary-> line border, primary label, optional leading icon
// tertiary -> small pill, bg per color, button_input_2 label + trailing chevron
export function Button({
  label,
  state = 'primary',
  color = 'black',
  icon,
  className,
}: ButtonProps) {
  if (state === 'tertiary') {
    const bg = color === 'gray' ? 'bg-project-on_white-gray_2' : 'bg-project-on_black-gray_2'
    const ink = color === 'gray' ? 'text-text-and-icon-primary' : 'text-project-white'
    return (
      <button
        type="button"
        className={[
          'inline-flex cursor-pointer items-center gap-xs_1 rounded-max py-xs_2 pl-m pr-s',
          bg,
          className ?? '',
        ].join(' ')}
      >
        <span className={['type-button_input_2', ink].join(' ')}>{label}</span>
        <Icon name="chevron-right" size={16} className={ink} />
      </button>
    )
  }

  const base =
    'inline-flex w-full cursor-pointer items-center justify-center gap-s rounded-max px-m py-l'

  if (state === 'secondary') {
    return (
      <button
        type="button"
        className={[base, 'border border-line-on_white-gray_1', className ?? ''].join(' ')}
      >
        {icon && <Icon name={icon} size={24} className="text-text-and-icon-primary" />}
        <span className="type-button_input_1 text-text-and-icon-primary">{label}</span>
      </button>
    )
  }

  return (
    <button type="button" className={[base, 'bg-project-action', className ?? ''].join(' ')}>
      {icon && <Icon name={icon} size={24} className="text-project-white" />}
      <span className="type-button_input_1 bg-gradient-white_gray bg-clip-text text-transparent">
        {label}
      </span>
    </button>
  )
}
