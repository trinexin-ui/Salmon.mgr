import { Button } from '@/shared/ui/atoms/Button'
import stopwatchUrl from '@/shared/ui/illustrations/stopwatch.png'

type ImportantInformationProps = {
  title?: string
  subtitle?: string
  buttonLabel?: string
  className?: string
}

// Figma: d-organism/important_information. Dark card (black_bg), gold-gradient title
// (d/linear-gold, peak 56.4%), subtitle, Schedule tertiary button, stopwatch image
// with a blurred warm ellipse behind it. Собран из: button.
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
      {/* Figma: Ellipse 1391 — warm glow with Layer Blur behind the image. */}
      <div
        aria-hidden
        className="pointer-events-none absolute rounded-max"
        style={{
          width: 225,
          height: 225,
          right: -121,
          top: 47,
          background: '#FFF4E4',
          filter: 'blur(60px)',
        }}
      />
      {/* Figma: image 109370 — stopwatch, top-right, slightly cropped. */}
      <div
        className="pointer-events-none absolute overflow-hidden"
        style={{ width: 111, height: 104, right: 0, top: 13 }}
      >
        <img
          src={stopwatchUrl}
          alt=""
          style={{ display: 'block', width: 111, maxWidth: 'none', marginTop: -8 }}
        />
      </div>
      <div className="relative flex flex-col gap-xs_1">
        <span className="type-h3 bg-gradient-gold whitespace-nowrap bg-clip-text text-transparent">
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
