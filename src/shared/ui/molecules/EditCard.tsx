import { Button } from '@/shared/ui/atoms/Button'

type EditCardProps = {
  title: string
  left: string
  right: string
  className?: string
}

// Figma: d-molecules/edit_card (Default). gray_bg card, rounded-s, p-m, space-between:
// title (body_1) + "left • right" (body_2 secondary) and an Edit tertiary button.
// Собран из: button. rounded-s via var (rounded-s is a Tailwind side utility).
export function EditCard({ title, left, right, className }: EditCardProps) {
  return (
    <div
      style={{ borderRadius: 'var(--radius-s)' }}
      className={[
        'flex items-center justify-between gap-m bg-project-gray_bg p-m',
        className ?? '',
      ].join(' ')}
    >
      <div className="flex flex-col gap-xs_1">
        <span className="type-body_1 text-text-and-icon-primary">{title}</span>
        <div className="type-body_2 flex items-center gap-xs_1 text-text-and-icon-secondary_white">
          <span>{left}</span>
          <span>•</span>
          <span>{right}</span>
        </div>
      </div>
      <Button label="Edit" state="tertiary" color="gray" />
    </div>
  )
}
