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

// `lineWidth` — rendered stroke thickness in px. By default the stroke scales with the icon
// (1.5 in the 24px box); pass it to keep a line as thin as on a smaller icon, e.g. the slider
// handle (33px) uses the same 1.25px line as the 20px chevron / close in the header.
export function Icon({
  name,
  size = 24,
  lineWidth,
  className,
}: {
  name: IconName
  size?: number
  lineWidth?: number
  className?: string
}) {
  const html =
    lineWidth === undefined
      ? (inner[name] ?? '')
      : (inner[name] ?? '').replace(
          /stroke-width="[^"]*"/g,
          `stroke-width="${((lineWidth * 24) / size).toFixed(3)}"`,
        )
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
