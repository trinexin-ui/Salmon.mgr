import { Icon } from '@/shared/ui/icons/Icon'
import medalUrl from '@/shared/ui/illustrations/medal.png'

type PossibilitiesCardProps = {
  unlock?: boolean
  category?: string
  hint?: string
  title?: string
  description?: string
  className?: string
}

// Figma: d-organism/possibilities_card (unlock yes/no). White card: 48px medal +
// category/title (border-b) + description + unlock/lock icon. Собран из: icon.
export function PossibilitiesCard({
  unlock = true,
  category = 'By level',
  hint,
  title = 'Extended analytics',
  description = 'Time-of-day patterns, goal forecast',
  className,
}: PossibilitiesCardProps) {
  return (
    <div
      style={{ borderRadius: 'var(--radius-l)' }}
      className={['flex w-full flex-col gap-l bg-project-white p-l', className ?? ''].join(' ')}
    >
      <div className="flex items-center gap-l border-b border-line-on_white-gray_1 pb-l">
        <img
          src={medalUrl}
          alt=""
          className={['object-contain', unlock ? '' : 'opacity-40'].join(' ')}
          style={{ width: 48, height: 48 }}
        />
        <div className="flex flex-1 flex-col gap-xs_1">
          <div className="type-body_2 flex items-center gap-xs_1 text-text-and-icon-secondary_white">
            <span>{category}</span>
            {hint && (
              <>
                <span>•</span>
                <span>{hint}</span>
              </>
            )}
          </div>
          <span
            className={[
              'type-h3',
              unlock ? 'text-text-and-icon-primary' : 'text-text-and-icon-secondary_white',
            ].join(' ')}
          >
            {title}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2xl">
        <span className="type-body_1 flex-1 text-text-and-icon-secondary_white">{description}</span>
        <Icon
          name={unlock ? 'unlock' : 'lock'}
          size={20}
          className="text-text-and-icon-secondary_white"
        />
      </div>
    </div>
  )
}
