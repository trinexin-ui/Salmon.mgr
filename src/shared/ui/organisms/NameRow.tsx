import { Avatar } from '@/shared/ui/atoms/Avatar'
import { IconButton } from '@/shared/ui/atoms/IconButton'
import { PEOPLE, type Person } from '@/shared/ui/avatars/people'

type NameRowProps = {
  person?: Person
  name?: string
  role?: string
  located?: string
  avg?: string
  className?: string
}

// Figma: d-organism/name_row. White card: gray sub-card (avatar + name/role + phone
// button) + two info rows. Собран из: avatar, icon_button.
export function NameRow({
  person = 'carlos-domingo',
  name,
  role = 'Agent',
  located = 'Electronics section',
  avg = '7 min',
  className,
}: NameRowProps) {
  return (
    <div
      style={{ borderRadius: 'var(--radius-l)' }}
      className={['flex w-full flex-col gap-l bg-project-white p-l', className ?? ''].join(' ')}
    >
      <div
        style={{ borderRadius: 'var(--radius-m)' }}
        className="flex items-center justify-between bg-project-gray_bg p-m"
      >
        <div className="flex items-center gap-m">
          <Avatar person={person} size={52} />
          <div className="flex flex-col gap-xxs">
            <span className="type-body_1 text-text-and-icon-primary">{name ?? PEOPLE[person]}</span>
            <span className="type-body_1 text-text-and-icon-secondary_white">{role}</span>
          </div>
        </div>
        <IconButton icon="phone" color="gray" size="big" />
      </div>
      <div className="flex flex-col gap-s">
        <div className="type-body_1 flex items-center justify-between">
          <span className="text-text-and-icon-secondary_white">Currently located</span>
          <span className="text-text-and-icon-primary">{located}</span>
        </div>
        <div className="type-body_1 flex items-center justify-between">
          <span className="text-text-and-icon-secondary_white">Avg arrival</span>
          <span className="text-text-and-icon-primary">{avg}</span>
        </div>
      </div>
    </div>
  )
}
