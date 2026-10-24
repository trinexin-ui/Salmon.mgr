import { Delta } from '@/shared/ui/atoms/Delta'

export type SummaryStat = { label: string; value: string; delta: string }

type StatsSummaryProps = {
  items: SummaryStat[]
  className?: string
}

// Figma: home summary row — Pending / Approved / Earned. Each: label (secondary_black)
// + value (text-and-icon/white) over a green trend (triangle + percent). All body_1.
// First columns grow (flex-1), the last is content-width, so the row spreads across the
// full width instead of bunching at the left.
export function StatsSummary({ items, className }: StatsSummaryProps) {
  return (
    <div className={['flex items-start gap-xl', className ?? ''].join(' ')}>
      {items.map((s, i) => (
        <div
          key={s.label}
          className={[
            'flex flex-col items-start gap-xs_1',
            i < items.length - 1 ? 'min-w-px flex-1' : 'shrink-0',
          ].join(' ')}
        >
          <div className="type-body_1 flex items-center gap-xs_1">
            <span className="text-text-and-icon-secondary_black">{s.label}</span>
            <span className="text-text-and-icon-white">{s.value}</span>
          </div>
          <Delta direction="up" label={s.delta} />
        </div>
      ))}
    </div>
  )
}
