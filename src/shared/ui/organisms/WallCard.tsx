import { Avatar } from '@/shared/ui/atoms/Avatar'
import { AvatarReaction } from '@/shared/ui/atoms/AvatarReaction'
import { IconButton } from '@/shared/ui/atoms/IconButton'
import { Tag } from '@/shared/ui/atoms/Tag'
import { Icon } from '@/shared/ui/icons/Icon'
import { Reaction } from '@/shared/ui/molecules/Reaction'
import { PersonTag } from '@/shared/ui/molecules/PersonTag'
import { type Person } from '@/shared/ui/avatars/people'
import bellUrl from '@/shared/ui/illustrations/bell.png'

type WallCardProps = {
  type?: 'vote' | 'recognitions' | 'post'
  description?: boolean
  img?: boolean
  className?: string
}

const VOTE_PEOPLE: Person[] = ['louis-bautista', 'lyn-dela-cruz', 'jun-reyes', 'jose-reyes']
const REACT_PEOPLE: Person[] = ['louis-bautista', 'lyn-dela-cruz', 'jun-reyes']

// Figma: d-organism/wall_card (type vote/recognitions/post). White card, rounded-l.
// vote: title+Pin + "Voting open" tag + prompt + avatar stack + "X of Y responded" progress.
// recognitions: illustration + person_tag + quote + reactions + time.
// post: author (avatar+name) + menu + text bubbles (+optional image) + reaction + time.
// Собран из: reaction, person_tag, avatar, avatar_reaction, tag, icon_button, icon.
export function WallCard({ type = 'vote', description = false, img = false, className }: WallCardProps) {
  const base = 'flex w-full flex-col bg-project-white'

  if (type === 'recognitions') {
    return (
      <div
        style={{ borderRadius: 'var(--radius-l)' }}
        className={[base, 'items-center gap-xxxl overflow-hidden px-l pt-2xxl pb-l', className ?? ''].join(
          ' ',
        )}
      >
        <div className="flex w-full flex-col items-center gap-2xl">
          <img src={bellUrl} alt="" className="object-contain" style={{ width: 80, height: 80 }} />
          <div className="flex w-full flex-col items-center gap-s">
            <PersonTag person="maria-santos" />
            <span className="type-h2 text-center text-text-and-icon-primary">
              Closed three offers before lunch. Unstoppable!
            </span>
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-s">
            <Reaction smile="heart" people={REACT_PEOPLE} />
            <Reaction smile="heart" type="more3" active count={5} />
          </div>
          <span className="type-body_2 text-text-and-icon-secondary_white">6 min ago</span>
        </div>
      </div>
    )
  }

  if (type === 'post') {
    const lines = [
      'Thanks everyone who helped with the walk-ins',
      'this afternoon. We were so fast when we',
      'worked together',
    ]
    return (
      <div
        style={{ borderRadius: 'var(--radius-l)' }}
        className={[base, 'items-start gap-xxxl overflow-hidden p-l', className ?? ''].join(' ')}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-m">
            <Avatar person="lyn-dela-cruz" size={44} />
            <div className="flex flex-col justify-center gap-xxs">
              <span className="type-h3 text-text-and-icon-primary">Lyn Dela Cruz</span>
              {description && (
                <span className="type-body_2 text-text-and-icon-secondary_white">You</span>
              )}
            </div>
          </div>
          <IconButton icon="horizontal" color="gray" size="big" />
        </div>
        <div className="flex w-full flex-col items-start gap-l">
          {img && (
            <div
              className="w-full bg-project-on_white-gray_1"
              style={{ height: 200, borderRadius: 'var(--radius-m)' }}
            />
          )}
          <div className="flex flex-col items-start gap-xxs">
            {lines.map((l) => (
              <span
                key={l}
                className="type-body_1 inline-flex items-center rounded-max bg-project-gray_bg px-s py-xs_1 text-text-and-icon-primary"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <Reaction smile="heart" people={REACT_PEOPLE} />
          <span className="type-body_2 text-text-and-icon-secondary_white">3:56 PM</span>
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
