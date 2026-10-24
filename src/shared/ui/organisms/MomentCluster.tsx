import { AvatarReaction } from '@/shared/ui/atoms/AvatarReaction'
import { MomentTile } from '@/shared/ui/molecules/MomentTile'
import { PEOPLE, type Person } from '@/shared/ui/avatars/people'

type MomentClusterProps = {
  images: { left?: string; center: string; right?: string }
  person: Person
  selected?: boolean
  className?: string
}

// Figma: организм moment_cluster (тройка фото в коллаже Moments). Контейнер 314×184: слева и
// справа наклонённые фото (±16°), по центру карточка; под центральной аватар 36px с белой
// обводкой и имя автора (body_2 white). Собран из: moment_tile, avatar_reaction.
export function MomentCluster({ images, person, selected = false, className }: MomentClusterProps) {
  return (
    <div className={['relative', className ?? ''].join(' ')} style={{ width: 314.126, height: 184 }}>
      {images.left && (
        <div className="absolute" style={{ left: 0, top: 15.43 }}>
          <MomentTile variant="side" image={images.left} tilt={-16} />
        </div>
      )}
      {images.right && (
        <div className="absolute" style={{ left: 185.75, top: 15.43 }}>
          <MomentTile variant="side" image={images.right} tilt={16} />
        </div>
      )}
      <div className="absolute" style={{ left: 93.75, top: 0, width: 128, height: 184 }}>
        <MomentTile variant="center" image={images.center} selected={selected} />
        <div
          className="absolute left-0 flex w-full flex-col items-center gap-xs_1"
          style={{ top: 125 }}
        >
          <AvatarReaction person={person} size={36} className="border border-text-and-icon-white" />
          <span className="type-body_2 whitespace-nowrap text-text-and-icon-white">
            {PEOPLE[person]}
          </span>
        </div>
      </div>
    </div>
  )
}
