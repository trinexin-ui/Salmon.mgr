import { type Person } from '@/shared/ui/avatars/people'

// Figma: atom d-atoms/avatar_reaction. Small round persona photo (24px).
const photos = import.meta.glob('../avatars/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const byPerson: Record<string, string> = {}
for (const [path, url] of Object.entries(photos)) {
  const key = path.split('/').pop()!.replace('.png', '')
  byPerson[key] = url
}

export function AvatarReaction({
  person,
  size = 24,
  className,
}: {
  person: Person
  size?: number
  className?: string
}) {
  return (
    <img
      src={byPerson[person]}
      alt=""
      style={{ width: size, height: size }}
      className={['shrink-0 rounded-max object-cover', className ?? ''].join(' ')}
    />
  )
}
