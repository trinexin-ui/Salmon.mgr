import { StepItem } from '@/shared/ui/atoms/StepItem'

type StepBarProps = {
  steps: string[]
  activeIndex?: number
  className?: string
}

// Molecule: step_bar = row of step_item (each flex-1). Собран из: step_item.
export function StepBar({ steps, activeIndex = 0, className }: StepBarProps) {
  return (
    <div className={['flex items-start gap-xs_1', className ?? ''].join(' ')}>
      {steps.map((label, i) => (
        <div key={label} className="flex-1">
          <StepItem label={label} active={i === activeIndex} />
        </div>
      ))}
    </div>
  )
}
