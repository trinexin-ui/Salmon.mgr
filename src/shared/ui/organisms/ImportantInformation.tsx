import { Button } from '@/shared/ui/atoms/Button'
import bellUrl from '@/shared/ui/illustrations/bell.png'

type ImportantInformationProps = {
  title?: string
  subtitle?: string
  buttonLabel?: string
  className?: string
}

// Figma: d-organism/important_information. Dark card (black_bg), gold-gradient title,
// subtitle, Schedule tertiary button, decorative bell. Собран из: button.
export function ImportantInformation({
  title = 'Jose rarely offers moto loans',
  subtitle = 'Schedule a training session',
  buttonLabel = 'Schedule',
  className,
}: ImportantInformationProps) {
  return (
    <div
      style={{ borderRadius: 'var(--radius-l)' }}
      className={[
        'relative flex w-full flex-col gap-m overflow-hidden bg-project-black_bg p-l',
        className ?? '',
      ].join(' ')}
    >
      <img
        src={bellUrl}
        alt=""
        className="pointer-events-none absolute object-contain"
        style={{ width: 150, right: -12, top: 0 }}
      />
      <div className="relative flex flex-col gap-xs_1">
        <span className="type-h3 bg-gradient-gold bg-clip-text whitespace-nowrap text-transparent">
          {title}
        </span>
        <span className="type-body_1 text-text-and-icon-secondary_black">{subtitle}</span>
      </div>
      <div className="relative">
        <Button label={buttonLabel} state="tertiary" color="black" />
      </div>
    </div>
  )
}
