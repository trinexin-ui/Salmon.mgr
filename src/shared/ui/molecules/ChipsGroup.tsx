import { Chips } from '@/shared/ui/atoms/Chips'

// Molecule: chips_group = active chip + divider + group of chips. Собран из: chips.
export function ChipsGroup({ className }: { className?: string }) {
  return (
    <div className={['flex items-center gap-l px-l', className ?? ''].join(' ')}>
      <Chips label="All" state="active" />
      <span className="h-xl w-px self-center bg-line-on_white-gray_1" />
      <div className="flex items-center gap-xl">
        <Chips label="Pinned" state="non_active" />
        <Chips label="Recognitions" state="non_active" />
        <Chips label="Posts" state="non_active" />
      </div>
    </div>
  )
}
