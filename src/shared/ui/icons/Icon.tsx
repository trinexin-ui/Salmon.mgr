// Icon set exported from Figma (d-icon). Each ./*.svg is a 24x24 glyph whose
// strokes/fills use currentColor, so color comes from the surrounding text
// color token and size from the `size` prop. Foundational: importable from any
// level (like vendor), since icons are embedded inside components everywhere.

const raws = import.meta.glob('./*.svg', {
  query: '?raw',
  eager: true,
  import: 'default',
}) as Record<string, string>

const inner: Record<string, string> = {}
for (const [path, raw] of Object.entries(raws)) {
  const name = path.slice(2, -4) // './chevron-right.svg' -> 'chevron-right'
  inner[name] = raw.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')
}

export type IconName =
  | 'check'
  | 'chevron-right'
  | 'chevron-left'
  | 'notification'
  | 'fire'
  | 'crown'
  | 'bubble-chat'
  | 'bubble-chat-fill'
  | 'horizontal'
  | 'book'
  | 'phone'
  | 'group'
  | 'award'
  | 'favourite'
  | 'star'
  | 'alert'
  | 'close'
  | 'calendar'
  | 'edit'
  | 'slider'
  | 'home'
  | 'home-fill'
  | 'chating'
  | 'plus'
  | 'pin'
  | 'wallet'
  | 'possibilities'
  | 'file'
  | 'unlock'
  | 'lock'
  | 'exit'
  | 'setting'

export const iconNames = Object.keys(inner).sort() as IconName[]

export function Icon({
  name,
  size = 24,
  className,
}: {
  name: IconName
  size?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: inner[name] ?? '' }}
    />
  )
}
