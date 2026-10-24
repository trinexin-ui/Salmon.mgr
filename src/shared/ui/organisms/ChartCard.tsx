import { Gauge } from '@/shared/ui/atoms/Gauge'

type ChartCardProps = {
  title: string
  centerLabel: string
  ratio: string
  percent: number
  legend: [string, string]
  className?: string
}

// Figma: организм chart_card (Split / Distribution на Period plan). Белая карточка:
// заголовок, gauge с подписью по центру внизу, легенда с цветными точками.
// Собран из: gauge.
export function ChartCard({
  title,
  centerLabel,
  ratio,
  percent,
  legend,
  className,
}: ChartCardProps) {
  return (
    <div
      style={{ borderRadius: 'var(--radius-l)' }}
      className={[
        'flex min-w-px flex-1 flex-col items-center justify-end gap-2xl bg-project-white p-m',
        className ?? '',
      ].join(' ')}
    >
      <span className="type-body_1 w-full text-text-and-icon-primary">{title}</span>
      <div className="flex w-full flex-col items-start gap-xl">
        <div className="relative" style={{ width: 155, height: 76 }}>
          <Gauge percent={percent} />
          <div className="type-body_2 absolute bottom-xs_2 left-1/2 flex -translate-x-1/2 flex-col items-center whitespace-nowrap">
            <span className="text-text-and-icon-primary">{centerLabel}</span>
            <span className="text-text-and-icon-secondary_white">{ratio}</span>
          </div>
        </div>
        <div className="type-body_2 flex flex-col items-start gap-s text-text-and-icon-secondary_white">
          <div className="flex items-center gap-s">
            <span
              className="block shrink-0 rounded-max bg-project-green"
              style={{ width: 12, height: 12 }}
            />
            <span className="whitespace-nowrap">{legend[0]}</span>
          </div>
          <div className="flex items-center gap-s">
            <span
              className="block shrink-0 rounded-max bg-project-blue"
              style={{ width: 12, height: 12 }}
            />
            <span className="whitespace-nowrap">{legend[1]}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
