import { Icon, type IconName } from '@/shared/ui/icons/Icon'

type InputProps = {
  state?: 'filled' | 'active' | 'default' | 'disabled'
  label?: string
  value?: string
  placeholder?: string
  leftIcon?: IconName
  className?: string
}

// Figma: atom d-atoms/input (state filled/active/default/disabled). Rounded-m, border,
// px-m py-s. filled/active -> caption label + button_input_1 value (active: caret).
// default/disabled -> button_input_1 placeholder (secondary); disabled dimmed.
export function Input({
  state = 'default',
  label = 'Label',
  value = 'Search for a distanation',
  placeholder = 'Search for a distanation',
  leftIcon,
  className,
}: InputProps) {
  const filledOrActive = state === 'filled' || state === 'active'
  const border =
    state === 'active' ? 'border-project-on_white-gray_1' : 'border-line-on_white-gray_1'
  const dim = state === 'disabled' ? 'opacity-50' : ''
  return (
    <div
      style={{ height: 50 }}
      className={[
        'flex w-full items-center gap-s rounded-m border px-m py-s',
        border,
        dim,
        className ?? '',
      ].join(' ')}
    >
      {leftIcon && (
        <Icon name={leftIcon} size={24} className="text-text-and-icon-secondary_white" />
      )}
      {filledOrActive ? (
        <span className="flex flex-col gap-xxs">
          <span className="type-caption_1 text-text-and-icon-secondary_white">{label}</span>
          <span className="type-button_input_1 text-text-and-icon-primary">
            {value}
            {state === 'active' && '|'}
          </span>
        </span>
      ) : (
        <span className="type-button_input_1 text-text-and-icon-secondary_white">
          {placeholder}
        </span>
      )}
    </div>
  )
}
