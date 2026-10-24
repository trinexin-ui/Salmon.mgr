import { Avatar } from '@/shared/ui/atoms/Avatar'
import { AvatarReaction } from '@/shared/ui/atoms/AvatarReaction'
import { IconButton } from '@/shared/ui/atoms/IconButton'
import { Tag } from '@/shared/ui/atoms/Tag'
import { type SmileName } from '@/shared/ui/atoms/SmileReaction'
import { Icon } from '@/shared/ui/icons/Icon'
import { Reaction } from '@/shared/ui/molecules/Reaction'
import { PersonTag } from '@/shared/ui/molecules/PersonTag'
import { PEOPLE, type Person } from '@/shared/ui/avatars/people'
import bellUrl from '@/shared/ui/illustrations/bell.png'
import flameUrl from '@/shared/ui/illustrations/shoutout-flame.png'
import ribbonUrl from '@/shared/ui/illustrations/shoutout-ribbon.png'

const ILLUSTRATIONS = { bell: bellUrl, flame: flameUrl, ribbon: ribbonUrl } as const

export type WallReaction = {
  smile: SmileName
  type?: 'default' | 'more3'
  active?: boolean
  people?: Person[]
  count?: number
}

type WallCardProps = {
  type?: 'vote' | 'recognitions' | 'post'
  // post: show the "You" caption under the author (kept for the old API)
  description?: boolean
  // recognitions
  illustration?: keyof typeof ILLUSTRATIONS
  person?: Person
  text?: string
  // recognitions / post
  reactions?: WallReaction[]
  time?: string
  // post
  author?: Person
  subtitle?: string
  lines?: string[]
  className?: string
}

const VOTE_PEOPLE: Person[] = ['louis-bautista', 'lyn-dela-cruz', 'jun-reyes', 'jose-reyes']
const REACT_PEOPLE: Person[] = ['louis-bautista', 'lyn-dela-cruz', 'jun-reyes']

const DEFAULT_LINES = [
  'Thanks everyone who helped with the walk-ins',
  'this afternoon. We were so fast when we',
  'worked together',
]

function Reactions({ items }: { items: WallReaction[] }) {
  return (
    <div className="flex items-center gap-s">
      {items.map((r, i) => (
        <Reaction
          key={i}
          smile={r.smile}
          type={r.type}
          active={r.active}
          people={r.people}
          count={r.count}
        />
      ))}
    </div>
  )
}

// Figma: d-organism/wall_card (type vote/recognitions/post). White card, rounded-l.
// vote: title+Pin + "Voting open" tag + prompt + avatar stack + "X of Y responded" progress.
// recognitions: illustration + person_tag + quote + reactions + time.
// post: author (avatar+name[+caption]) + menu + text bubbles (tight, no gap) + reactions + time.
// Данные recognitions / post — пропсами (без пропсов выглядят как раньше).
// Собран из: reaction, person_tag, avatar, avatar_reaction, tag, icon_button, icon.
export function WallCard({
  type = 'vote',
  description = false,
  illustration = 'bell',
  person = 'maria-santos',
  text = 'Closed three offers before lunch. Unstoppable!',
  reactions,
  time,
  author = 'lyn-dela-cruz',
  subtitle,
  lines = DEFAULT_LINES,
  className,
}: WallCardProps) {
  const base = 'flex w-full flex-col bg-project-white'

  if (type === 'recognitions') {
    const items: WallReaction[] = reactions ?? [
      { smile: 'heart', people: REACT_PEOPLE },
      { smile: 'heart', type: 'more3', active: true, count: 5 },
    ]
    return (
      <div
        style={{ borderRadius: 'var(--radius-l)' }}
        className={[base, 'items-center gap-xxxl overflow-hidden px-l pt-2xxl pb-l', className ?? ''].join(
          ' ',
        )}
      >
        <div className="flex w-full flex-col items-center gap-2xl">
          <img
            src={ILLUSTRATIONS[illustration]}
            alt=""
            className="object-contain"
            style={{ width: 80, height: 80 }}
          />
          <div className="flex w-full flex-col items-center gap-s">
            <PersonTag person={person} />
            <span className="type-h2 text-center text-text-and-icon-primary">{text}</span>
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <Reactions items={items} />
          <span className="type-body_2 text-text-and-icon-secondary_white">{time ?? '6 min ago'}</span>
        </div>
      </div>
    )
  }

  if (type === 'post') {
    const items: WallReaction[] = reactions ?? [{ smile: 'heart', people: REACT_PEOPLE }]
    const caption = subtitle ?? (description ? 'You' : undefined)
    return (
      <div
        style={{ borderRadius: 'var(--radius-l)' }}
        className={[base, 'items-start gap-xxxl overflow-hidden p-l', className ?? ''].join(' ')}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-m">
            <Avatar person={author} size={44} />
            <div className="flex flex-col justify-center gap-xxs">
              <span className="type-h3 whitespace-nowrap text-text-and-icon-primary">
                {PEOPLE[author]}
              </span>
              {caption && (
                <span className="type-body_2 text-text-and-icon-secondary_white">{caption}</span>
              )}
            </div>
          </div>
          <IconButton icon="horizontal" color="gray" size="big" />
        </div>
        <div className="flex w-full flex-col items-start">
          {lines.map((l) => (
            <span
              key={l}
              className="type-body_1 inline-flex items-center whitespace-nowrap rounded-max bg-project-gray_bg px-s py-xs_1 text-text-and-icon-primary"
            >
              {l}
            </span>
          ))}
        </div>
        <div className="flex w-full items-center justify-between">
          <Reactions items={items} />
          <span className="type-body_2 text-text-and-icon-secondary_white">{time ?? '3:56 PM'}</span>
        </div>
      </div>
    )
  }

  // vote
  return (
    <div
      style={{ borderRadius: 'var(--radius-l)' }}
      className={[base, 'items-start gap-xs_1 p-l', className ?? ''].join(' ')}
    >
      <div className="flex w-full flex-col items-start gap-m">
        <div className="flex w-full flex-col items-start gap-xs_1">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-s">
              <span className="type-h3 text-text-and-icon-primary">Team vote</span>
              <Icon name="pin" size={16} className="text-text-and-icon-secondary_white" />
            </div>
            <Tag label="Voting open" />
          </div>
          <span className="type-body_1 text-text-and-icon-secondary_white" style={{ maxWidth: 249 }}>
            Tara, let's decide together — vote when you're free today
          </span>
        </div>
        <div className="flex items-center">
          {VOTE_PEOPLE.map((p, i) => (
            <AvatarReaction
              key={p}
              person={p}
              size={36}
              className={['border-[1.5px] border-text-and-icon-white', i > 0 ? 'ml-minus_2' : ''].join(
                ' ',
              )}
            />
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col items-end gap-s">
        <span className="type-body_2 text-text-and-icon-primary">4 of 6 responded</span>
        <div
          style={{ borderRadius: 'var(--radius-xs)' }}
          className="flex w-full flex-col border border-line-on_white-gray_1 p-xs_1"
        >
          <div className="flex w-full items-center gap-xs_1">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className={[
                  'h-l min-w-px flex-1 rounded-xxs',
                  i < 4 ? 'bg-project-green' : 'bg-project-on_white-gray_1',
                ].join(' ')}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
