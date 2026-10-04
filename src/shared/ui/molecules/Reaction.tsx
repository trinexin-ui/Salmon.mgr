import { SmileReaction, type SmileName } from '@/shared/ui/atoms/SmileReaction'
import { AvatarReaction } from '@/shared/ui/atoms/AvatarReaction'
import { type Person } from '@/shared/ui/avatars/people'

type ReactionProps = {
  smile: SmileName
  type?: 'default' | 'more3'
  active?: boolean
  people?: Person[]
  count?: number
  className?: string
}

// Molecule: reaction = smile_reaction + avatar_reaction stack (default) or count (more3).
// active -> on_white/gray_1 bg; inactive -> line border.
export function Reaction({
  smile,
  type = 'default',
  active = false,
  people = [],
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
      <SmileReaction name={smile} size={24} />
      {type === 'more3' ? (
        <span className="type-body_1 text-text-and-icon-primary">{count}</span>
      ) : (
        <span className="flex items-center">
          {people.slice(0, 3).map((p, i) => (
            <AvatarReaction
              key={p}
              person={p}
              size={24}
              className={['border border-text-and-icon-white', i > 0 ? 'ml-minus_2' : ''].join(' ')}
            />
          ))}
        </span>
      )}
    </span>
  )
}
