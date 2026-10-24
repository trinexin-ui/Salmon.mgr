import { type ReactNode } from 'react'
import { Grabber } from '@/shared/ui/atoms/Grabber'

type BottomSheetProps = {
  // header row under the grabber
  children?: ReactNode
  // content under the header (tab bar)
  footer?: ReactNode
  // click on the grabber area (the page also wires the drag)
  onGrab?: () => void
  className?: string
}

// Figma: организм bottom_sheet (нижняя панель Shoutouts в Moments). Панель gray_bg со скруглением
// сверху xl: grabber (отступ 4px), 12px, шапка, затем footer (таб-бар). Собран из: grabber.
export function BottomSheet({ children, footer, onGrab, className }: BottomSheetProps) {
  return (
    <div
      style={{ borderTopLeftRadius: 'var(--radius-xl)', borderTopRightRadius: 'var(--radius-xl)' }}
      className={['flex w-full flex-col bg-project-gray_bg', className ?? ''].join(' ')}
    >
      <div className="flex flex-col gap-m">
        <div className="pt-xs_1" data-ui-path={onGrab ? '' : undefined} onClick={onGrab}>
          <Grabber />
        </div>
        {children}
      </div>
      {footer}
    </div>
  )
}
