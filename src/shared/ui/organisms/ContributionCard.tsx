import { ContributionRow, type ContributionRowProps } from '@/shared/ui/molecules/ContributionRow'

type ContributionCardProps = {
  title?: string
  rows: ContributionRowProps[]
  className?: string
}

// Figma: организм contribution_card («Team contribution» на Period plan). Белая карточка:
// заголовок h3 + список contribution_row. Собран из: contribution_row.
export function ContributionCard({
  title = 'Team contribution',
  rows,
  className,
}: ContributionCardProps) {
  return (
    <div
      style={{ borderRadius: 'var(--radius-l)' }}
      className={['flex w-full flex-col gap-2xl bg-project-white p-l', className ?? ''].join(' ')}
    >
      <span className="type-h3 text-text-and-icon-primary">{title}</span>
      <div className="flex flex-col gap-xl">
        {rows.map((r) => (
          <ContributionRow key={r.person} {...r} />
        ))}
      </div>
    </div>
  )
}
