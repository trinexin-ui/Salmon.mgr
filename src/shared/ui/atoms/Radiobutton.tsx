import { Icon } from '@/shared/ui/icons/Icon'

type RadiobuttonProps = {
  active?: boolean
  className?: string
}

// Figma: atom d-atoms/radiobutton. 28x28, fully round.
// active=no  -> empty, 2px border line/on_white/gray_1
// active=yes -> filled project/active_state with a white 20px check
export function Radiobutton({ active = false, className }: RadiobuttonProps) {
  return (
    <span
      className={[
        'inline-flex h-xxl w-xxl items-center justify-center rounded-max',
        active ? 'bg-project-active_state' : 'border-2 border-line-on_white-gray_1',
        className ?? '',
      ].join(' ')}
    >
      {active && <Icon name="check" size={20} className="text-project-white" />}
    </span>
  )
}
