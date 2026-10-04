// Figma: atom d-atoms/smile_reaction (name cry/ok/cool/laugh/heart). Emoji glyph (24px).
const smiles = import.meta.glob('../smiles/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const byName: Record<string, string> = {}
for (const [path, url] of Object.entries(smiles)) {
  const key = path.split('/').pop()!.replace('.png', '')
  byName[key] = url
}

export type SmileName = 'cry' | 'ok' | 'cool' | 'laugh' | 'heart'

export function SmileReaction({
  name,
  size = 24,
  className,
}: {
  name: SmileName
  size?: number
  className?: string
}) {
  return (
    <img
      src={byName[name]}
      alt={name}
      style={{ width: size, height: size }}
      className={['shrink-0', className ?? ''].join(' ')}
    />
  )
}
