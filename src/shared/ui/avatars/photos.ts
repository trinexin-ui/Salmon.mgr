// Persona photos, keyed by Person slug. Shared by avatar / avatar_reaction atoms.
const files = import.meta.glob('./*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>

export const AVATAR_SRC: Record<string, string> = {}
for (const [path, url] of Object.entries(files)) {
  const key = path.split('/').pop()!.replace('.png', '')
  AVATAR_SRC[key] = url
}
