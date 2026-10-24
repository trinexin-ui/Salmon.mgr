import { Chips } from '@/shared/ui/atoms/Chips'

type ChipsGroupProps = {
  // first chip, shown apart from the rest by a divider
  all?: string
  items?: string[]
  // selected chip (all or one of items); default — `all`
  value?: string
  onChange?: (value: string) => void
  // chips carrying the "new" badge until they are selected
  newItems?: string[]
  className?: string
}

// Molecule: chips_group = active chip + divider + group of chips. Собран из: chips.
// Без пропсов — как раньше (All / Pinned / Recognitions / Posts, активен All). `value` и
// `onChange` делают выбор живым: выбранный чип активен, остальные нет; чип из `newItems` показывает
// бейдж «new» (state new), пока не выбран.
export function ChipsGroup({
  all = 'All',
  items = ['Pinned', 'Recognitions', 'Posts'],
  value,
  onChange,
  newItems = [],
  className,
}: ChipsGroupProps) {
  const current = value ?? all
  const chip = (label: string) => {
    const state =
      current === label ? 'active' : newItems.includes(label) ? 'new' : 'non_active'
    const el = <Chips label={label} state={state} />
    if (!onChange) return <span key={label}>{el}</span>
    return (
      <span key={label} data-ui-path style={{ display: 'contents' }} onClick={() => onChange(label)}>
        {el}
      </span>
    )
  }
  return (
    <div className={['flex items-center gap-l px-l', className ?? ''].join(' ')}>
      {chip(all)}
      <span className="h-xl w-px self-center bg-line-on_white-gray_1" />
      <div className="flex items-center gap-xl">{items.map(chip)}</div>
    </div>
  )
}
