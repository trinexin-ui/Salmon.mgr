import { Avatar } from '@/shared/ui/atoms/Avatar'
import { Delta } from '@/shared/ui/atoms/Delta'
import { type Person } from '@/shared/ui/avatars/people'

type ContributionRowProps = {
  person: Person
  name: string
  amount: string
  offers: string
  delta?: string
  direction?: 'up' | 'down'
  className?: string
}

// Figma: молекула contribution_row (строка «Team contribution»). Аватар 52px + имя и
// сумма слева; число офферов и delta справа. Собран из: avatar, delta.
export function ContributionRow({
  person,
  name,
  amount,
  offers,
  delta,
  direction = 'up',
  className,
}: ContributionRowProps) {
  return (
    <div className={['flex w-full items-center justify-between', className ?? ''].join(' ')}>
      <div className="flex items-center gap-m">
        <Avatar person={person} size={52} />
        <div className="type-body_1 flex flex-col items-start gap-xs_1">
          <span className="text-text-and-icon-primary">{name}</span>
          <span className="text-text-and-icon-secondary_white">{amount}</span>
        </div>
      </div>
      <div className="type-body_1 flex flex-col items-end gap-xs_1">
        <span className="whitespace-nowrap text-text-and-icon-primary">{offers}</span>
        {delta && <Delta direction={direction} label={delta} />}
      </div>
    </div>
  )
}

export type { ContributionRowProps }
