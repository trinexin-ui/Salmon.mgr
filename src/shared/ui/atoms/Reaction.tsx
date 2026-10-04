import type { ReactNode } from 'react'

type ReactionProps = {
  emoji: ReactNode
  type?: 'default' | 'more3'
  active?: boolean
  avatars?: string[]
  count?: number
  className?: string
}

// Figma: atom d-atoms/reaction (type default/more3, active? yes/no). Rounded-max pill.
// active -> on_white/gray_1 bg; inactive -> line border.
// default -> up to 3 overlapping 24px avatars; more3 -> count (body_1).
export function Reaction({
  emoji,
  type = 'default',
  active = false,
  avatars = [],
  count = 0,
  className,
}: ReactionProps) {
  const shell = active ? 'bg-project-on_white-gray_1' : 'border border-line-on_white-gray_1'
  const pad = type === 'more3' ? 'gap-xs_2 pl-s pr-m' : 'gap-xs_1 px-s'
  return (
    <span
      className={['inline-flex items-center rounded-max py-xs_1', shell, pad, className ?? ''].join(
        ' ',
      )}
    >
      <span className="inline-flex h-2xl w-2xl items-center justify-center leading-none">
        {emoji}
      </span>
      {type === 'more3' ? (
        <span className="type-body_1 text-text-and-icon-primary">{count}</span>
      ) : (
        <span className="flex items-center">
          {avatars.slice(0, 3).map((a, i) => (
            <span
              key={i}
              className={[
                'inline-block h-2xl w-2xl shrink-0 overflow-hidden rounded-max border border-text-and-icon-white bg-project-on_white-gray_3',
                i > 0 ? 'ml-minus_2' : '',
              ].join(' ')}
            >
              {a && <img src={a} alt="" className="h-full w-full object-cover" />}
            </span>
          ))}
        </span>
      )}
    </span>
  )
}
