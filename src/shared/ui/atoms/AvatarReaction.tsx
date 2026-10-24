import { type CSSProperties } from 'react'
import { type Person } from '@/shared/ui/avatars/people'
import { AVATAR_SRC } from '@/shared/ui/avatars/photos'

// Figma: atom d-atoms/avatar_reaction. Small round persona photo (24px).
export function AvatarReaction({
  person,
  size = 24,
  style,
  className,
}: {
  person: Person
  size?: number
  style?: CSSProperties
  className?: string
}) {
  return (
    <img
      src={AVATAR_SRC[person]}
      alt=""
      style={{ width: size, height: size, ...style }}
      className={['shrink-0 rounded-max object-cover', className ?? ''].join(' ')}
    />
  )
}
