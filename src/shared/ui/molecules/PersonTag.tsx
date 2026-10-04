import { AvatarReaction } from '@/shared/ui/atoms/AvatarReaction'
import { PEOPLE, type Person } from '@/shared/ui/avatars/people'

// Molecule: person_tag = avatar_reaction (20px) + name, pill on_white/gray_2.
export function PersonTag({ person, className }: { person: Person; className?: string }) {
  return (
    <span
      className={[
        'inline-flex items-center gap-xs_1 rounded-max bg-project-on_white-gray_2 py-xs_1 pl-xs_1 pr-s',
        className ?? '',
      ].join(' ')}
    >
      <AvatarReaction person={person} size={20} />
      <span className="type-body_2 whitespace-nowrap text-text-and-icon-primary">
        {PEOPLE[person]}
      </span>
    </span>
  )
}
