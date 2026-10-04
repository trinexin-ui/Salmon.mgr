import { Icon, type IconName } from '@/shared/ui/icons/Icon'

type IconButtonProps = {
  icon: IconName
  color?: 'black' | 'gray'
  size?: 'big' | 'middle' | 'small'
  className?: string
}

// Figma: atom d-atoms/icon_button. Round button, icon centered.
// Outer size big=44 / middle=32 / small=20 reached via padding token + glyph size.
// color=black -> on_black/gray_1 bg, white icon; gray -> on_white/gray_2 bg, ink icon.
const PADDING = { big: 'p-m', middle: 'p-s', small: 'p-xxs' } as const
const GLYPH = { big: 20, middle: 16, small: 16 } as const

export function IconButton({ icon, color = 'black', size = 'big', className }: IconButtonProps) {
  const bg = color === 'black' ? 'bg-project-on_black-gray_1' : 'bg-project-on_white-gray_2'
  const ink = color === 'black' ? 'text-project-white' : 'text-text-and-icon-primary'
  return (
    <button
      type="button"
      className={[
        'inline-flex cursor-pointer items-center justify-center rounded-max',
        PADDING[size],
        bg,
        className ?? '',
      ].join(' ')}
    >
      <Icon name={icon} size={GLYPH[size]} className={ink} />
    </button>
  )
}
