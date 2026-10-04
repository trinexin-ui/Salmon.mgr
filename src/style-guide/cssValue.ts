// Helpers to read resolved token values from the DOM at runtime,
// so the showcase displays real values without hardcoding them.

export function readVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

function rgbToHex(rgb: string): string {
  const m = rgb.match(/rgba?\(([^)]+)\)/)
  if (!m) return rgb
  const parts = m[1].split(',').map((p) => parseFloat(p.trim()))
  const [r, g, b] = parts
  const hex = (n: number) => n.toString(16).padStart(2, '0')
  return `#${hex(r)}${hex(g)}${hex(b)}`
}

// Resolve a color CSS variable (including a role that aliases a primitive)
// to its final hex, by probing a detached element's computed color.
export function resolveColorHex(varName: string): string {
  const probe = document.createElement('span')
  probe.style.color = `var(${varName})`
  probe.style.display = 'none'
  document.body.appendChild(probe)
  const color = getComputedStyle(probe).color
  document.body.removeChild(probe)
  return rgbToHex(color)
}
