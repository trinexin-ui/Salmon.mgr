import { Input } from '@/shared/ui/atoms/Input'
import { EditCard } from '@/shared/ui/molecules/EditCard'
import { PrizeTile } from '@/shared/ui/molecules/PrizeTile'

type PrizeCardProps = {
  title?: string
  subtitle?: string
  prize?: string
  saveUpTo?: string
  placeName?: string
  placeAddress?: string
  className?: string
}

// Figma: организм prize_card (карточка «Select the team goal» на step2). Белая карточка:
// заголовок + описание, карусель призов (центр выбран, по бокам полупрозрачные), поле
// «Save up to» и edit_card с местом. Собран из: prize_tile, input, edit_card.
export function PrizeCard({
  title = 'Select the team goal',
  subtitle = 'You can complete the current goal — choose a new one',
  prize = 'Team dinner',
  saveUpTo = '₱8,000',
  placeName = 'Kanin Club',
  placeAddress = 'SM Megamall, Mandaluyong City',
  className,
}: PrizeCardProps) {
  return (
    <div
      style={{ borderRadius: 'var(--radius-l)' }}
      className={[
        'flex w-full flex-col gap-2xxl overflow-hidden bg-project-white p-l',
        className ?? '',
      ].join(' ')}
    >
      <div className="flex flex-col items-start gap-s">
        <span className="type-h3 whitespace-nowrap text-text-and-icon-primary">{title}</span>
        <span className="type-body_2 text-text-and-icon-secondary_white">{subtitle}</span>
      </div>

      <div className="relative w-full" style={{ height: 214 }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2">
          <PrizeTile variant="selected" label={prize} image="/assets/prize-team-dinner.png" />
        </div>
        <div className="absolute" style={{ left: -116, top: 12 }}>
          <PrizeTile variant="side" tilt={-6} label="For store" image="/assets/prize-side.png" />
        </div>
        <div className="absolute" style={{ left: 277, top: 12 }}>
          <PrizeTile variant="side" tilt={6} label="Something else" image="/assets/prize-side.png" />
        </div>
      </div>

      <div className="flex w-full flex-col gap-m">
        <Input state="filled" label="Save up to" value={saveUpTo} />
        <EditCard title={placeName} left={placeAddress} />
      </div>
    </div>
  )
}
