import { type Person } from '@/shared/ui/avatars/people'
import { AVATAR_SRC } from '@/shared/ui/avatars/photos'

// Figma: atom d-atoms/avatar. Round persona photo with a 1px linear-gradient stroke
// (gradient white_gray), drawn inside the frame — Figma: Stroke · Linear · weight 1 · Inside.
// The 1px gradient padding is the ring; the photo fills the remaining area.
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
    <span
      className={[
        'bg-gradient-white_gray_avatar block shrink-0 overflow-hidden rounded-max',
        className ?? '',
      ].join(' ')}
      style={{ width: size, height: size, padding: 1 }}
    >
      <img
        src={AVATAR_SRC[person]}
        alt=""
        className="block h-full w-full rounded-max object-cover"
      />
    </span>
  )
}
