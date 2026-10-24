import { Avatar } from '@/shared/ui/atoms/Avatar'
import { ProgressBar } from '@/shared/ui/atoms/ProgressBar'
import { type Person } from '@/shared/ui/avatars/people'

type ProfileHeroProps = {
  person: Person
  name: string
  level: string
  progress: number
  needLabel?: string
  needValue: string
  nextLabel?: string
  nextValue: string
  className?: string
}

// Figma: организм profile_hero (верх профиля менеджера). Аватар 120 по центру, имя (h2) и
// уровень (h3, d/linear-silver), полоса уровня (progress_bar, tone silver) и строка Need / Next.
// Собран из: avatar, progress_bar.
export function ProfileHero({
  person,
  name,
  level,
  progress,
  needLabel = 'Need',
  needValue,
  nextLabel = 'Next',
  nextValue,
  className,
}: ProfileHeroProps) {
  return (
    <div className={['flex w-full flex-col items-center gap-xl', className ?? ''].join(' ')}>
      <Avatar person={person} size={120} />
      <div className="flex w-full flex-col items-center gap-s">
        <span className="type-h2 text-center text-text-and-icon-primary">{name}</span>
        <span className="type-h3 bg-gradient-silver whitespace-nowrap bg-clip-text text-transparent">
          {level}
        </span>
      </div>
      <div className="flex w-full flex-col gap-s">
        <ProgressBar type="on_white" tone="silver" progress={progress} />
        <div className="type-body_2 flex w-full items-center justify-between whitespace-nowrap">
          <div className="flex items-center gap-xs_1">
            <span className="text-text-and-icon-secondary_white">{needLabel}</span>
            <span className="text-text-and-icon-primary">{needValue}</span>
          </div>
          <div className="flex items-center gap-xs_1">
            <span className="text-text-and-icon-secondary_white">{nextLabel}</span>
            <span className="text-text-and-icon-primary">{nextValue}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
