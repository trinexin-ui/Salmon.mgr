import { type Person } from '@/shared/ui/avatars/people'
import { AVATAR_SRC } from '@/shared/ui/avatars/photos'

// Figma: atom d-atoms/avatar. Round persona photo (68px) with white border.
export function Avatar({
  person,
  size = 68,
  className,
}: {
  person: Person
  size?: number
  className?: string
}) {
  return (
    <img
      src={AVATAR_SRC[person]}
      alt=""
      style={{ width: size, height: size }}
      className={[
        'shrink-0 rounded-max border border-text-and-icon-white object-cover',
        className ?? '',
      ].join(' ')}
    />
  )
}
