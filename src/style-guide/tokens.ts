// Token names only — values are read at runtime from CSS variables so the
// showcase never hardcodes a value. Mirrors docs/DESIGN.md.

export const colorPrimitives = [
  'black',
  'charcoal',
  'slate',
  'gray-mid',
  'gray-light',
  'gray-line',
  'gray-bg',
  'white',
  'gold',
  'green',
  'orange',
  'red',
] as const

export const colorRoles: { role: string; primitive: string }[] = [
  { role: 'text-and-icon-primary', primitive: 'charcoal' },
  { role: 'text-and-icon-secondary_white', primitive: 'gray-mid' },
  { role: 'text-and-icon-secondary_black', primitive: 'gray-light' },
  { role: 'text-and-icon-tertiary', primitive: 'slate' },
  { role: 'text-and-icon-white', primitive: 'white' },
  { role: 'line-on_white-gray_1', primitive: 'gray-line' },
  { role: 'project-action', primitive: 'black' },
  { role: 'project-active_state', primitive: 'gold' },
  { role: 'project-green', primitive: 'green' },
  { role: 'project-orange', primitive: 'orange' },
  { role: 'project-red', primitive: 'red' },
  { role: 'project-gray_bg', primitive: 'gray-bg' },
  { role: 'surface-glass', primitive: 'white' },
]

export const gradients = ['white_gray', 'black_gold', 'gold'] as const

export const typeStyles = [
  'h1',
  'h2',
  'h3',
  'body_1',
  'body_2',
  'button_input_1',
  'caption_1',
  'caption_2',
] as const

export const spacingScale = [
  'none',
  'xxs',
  'xs_1',
  'xs_2',
  's',
  'm',
  'l',
  '2xl',
  'xxl',
  '2xxl',
  'xxxl',
] as const

export const radii = ['m'] as const
