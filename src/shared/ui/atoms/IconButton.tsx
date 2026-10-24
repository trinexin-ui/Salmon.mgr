import { Icon, type IconName } from '@/shared/ui/icons/Icon'

type IconButtonProps = {
  icon: IconName
  color?: 'black' | 'gray' | 'dark'
  size?: 'big' | 'middle' | 'small'
  onClick?: () => void
  className?: string
}

// Figma: atom d-atoms/icon_button. Round button, icon centered.
// Outer size big=44 / middle=32 / small=20 reached via padding token + glyph size.
// color=black -> on_black/gray_1 bg, white icon; gray -> on_white/gray_2 bg, ink icon;
// dark -> on_black/gray_2 bg, white icon (for black screens and on_black/gray_1 cards).
const PADDING = { big: 'p-m', middle: 'p-s', small: 'p-xxs' } as const
const GLYPH = { big: 20, middle: 16, small: 16 } as const

export function IconButton({
  icon,
  color = 'black',
  size = 'big',
  onClick,
  className,
}: IconButtonProps) {
  const bg =
    color === 'black'
      ? 'bg-project-on_black-gray_1'
      : color === 'dark'
        ? 'bg-project-on_black-gray_2'
        : 'bg-project-on_white-gray_2'
  const ink = color === 'gray' ? 'text-text-and-icon-primary' : 'text-project-white'
  return (
    <button
      type="button"
      onClick={onClick}
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
