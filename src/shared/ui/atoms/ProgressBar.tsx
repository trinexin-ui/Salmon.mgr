import { Pattern } from '@/shared/ui/atoms/Pattern'

type ProgressBarProps = {
  type?: 'on_black' | 'on_white'
  progress?: number
  tone?: 'gold' | 'silver'
  className?: string
}

// Figma: atom progress_bar (type on_black / on_white). 1px line border (xs radius),
// 4px inner padding, 16px track: unfilled part is the line_pattern hatch, filled part
// is the d/linear-gold gradient (`tone="silver"` — d/linear-silver, уровень Silver). Выделен из bank-goal.
export function ProgressBar({
  type = 'on_black',
  progress = 0,
  tone = 'gold',
  className,
}: ProgressBarProps) {
  const border = type === 'on_black' ? 'border-line-on_black-gray' : 'border-line-on_white-gray_1'
  return (
    <div
      style={{ borderRadius: 'var(--radius-xs)' }}
      className={['w-full border p-xs_1', border, className ?? ''].join(' ')}
    >
      <div
        className="relative h-l w-full overflow-hidden"
        style={{ borderRadius: 'var(--radius-xxs)' }}
      >
        <Pattern type={type} className="absolute inset-0" />
        <div
          className={[
            tone === 'silver' ? 'bg-gradient-silver' : 'bg-gradient-gold',
            'absolute inset-y-0 left-0',
          ].join(' ')}
          style={{
            width: `${Math.round(Math.max(0, Math.min(1, progress)) * 100)}%`,
            borderRadius: 'var(--radius-xxs)',
          }}
        />
      </div>
    </div>
  )
}
