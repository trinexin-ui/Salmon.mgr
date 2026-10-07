import { Avatar } from '@/shared/ui/atoms/Avatar'
import { IconButton } from '@/shared/ui/atoms/IconButton'
import { Tag } from '@/shared/ui/atoms/Tag'
import { Icon, type IconName } from '@/shared/ui/icons/Icon'
import { type Person } from '@/shared/ui/avatars/people'

type OfferSlot = 'approved' | 'pending'

type EmployeeCardProps = {
  person?: Person
  name?: string
  tags?: string[]
  status?: string | false
  statusIcon?: IconName
  starButton?: boolean
  actions?: IconName[]
  showOffers?: boolean
  offerProgress?: boolean
  slots?: OfferSlot[]
  offersLabel?: string
  approvedLabel?: string
  pendingLabel?: string
  onClick?: () => void
  className?: string
}

// Figma: d-organism/employee_card. White card: avatar + Star/Chating icon buttons,
// "Best result" status, name (h2), two tags, offers progress (4 slots) + legend.
// Собран из: avatar, icon_button, tag, icon.
const SLOT_BG: Record<OfferSlot, string> = {
  approved: 'bg-project-green',
  pending: 'bg-project-on_white-gray_1',
}

export function EmployeeCard({
  person = 'lyn-dela-cruz',
  name = 'Lyn Dela Cruz',
  tags = ['Tag name', 'Tag name'],
  status = 'Best result',
  statusIcon = 'fire',
  starButton = true,
  actions,
  showOffers = true,
  offerProgress = true,
  slots = ['approved', 'approved', 'pending', 'pending'],
  offersLabel = '4 offers',
  approvedLabel = '2 Approved',
  pendingLabel = '2 Pending',
  onClick,
  className,
}: EmployeeCardProps) {
  const iconButtons = actions ?? (starButton ? ['star', 'chating'] : ['chating'])
  return (
    <div
      onClick={onClick}
      style={{ borderRadius: 'var(--radius-l)' }}
      className={[
        'flex w-full flex-col gap-2xxl bg-project-white p-l',
        onClick ? 'cursor-pointer' : '',
        className ?? '',
      ].join(' ')}
    >
      <div className="flex flex-col gap-2xl">
        <div className="flex items-start justify-between">
          <Avatar person={person} size={68} />
          <div className="flex items-start gap-s">
            {iconButtons.map((ic, i) => (
              <IconButton key={ic + i} icon={ic} color="gray" size="big" />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-s">
          {status && (
            <div className="flex items-center gap-xs_1">
              <Icon name={statusIcon} size={18} className="text-project-orange" />
              <span className="type-body_1 text-text-and-icon-secondary_white">{status}</span>
            </div>
          )}
          <div className="flex flex-col gap-m">
            <span className="type-h2 text-text-and-icon-primary">{name}</span>
            <div className="flex items-start gap-xs_1">
              {tags.map((t, i) => (
                <Tag key={i} label={t} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {showOffers && (
        <div className="flex w-full flex-col gap-s">
          {offerProgress && (
            <div
              style={{ borderRadius: 'var(--radius-xs)' }}
              className="flex w-full flex-col border border-line-on_white-gray_1 p-xs_1"
            >
              <div className="flex w-full items-center gap-xs_1">
                {slots.map((s, i) => (
                  <span
                    key={i}
                    className={['h-l min-w-px flex-1 rounded-xxs', SLOT_BG[s]].join(' ')}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="flex items-center gap-l">
            <span className="type-body_2 text-text-and-icon-primary">{offersLabel}</span>
            <div className="flex items-center gap-s">
              <span className="size-3 rounded-max bg-project-green" />
              <span className="type-body_2 text-text-and-icon-secondary_white">{approvedLabel}</span>
            </div>
            {pendingLabel && (
              <div className="flex items-center gap-s">
                <span className="size-3 rounded-max bg-project-on_white-gray_1" />
                <span className="type-body_2 text-text-and-icon-secondary_white">
                  {pendingLabel}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
