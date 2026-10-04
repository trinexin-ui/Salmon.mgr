// Token names only — values are read at runtime from CSS variables so the
// showcase never hardcodes a value. Mirrors docs/DESIGN.md.

export const colorRoles: string[] = [
  'text-and-icon-primary',
  'text-and-icon-secondary_white',
  'text-and-icon-secondary_black',
  'text-and-icon-tertiary',
  'text-and-icon-white',
  'line-on_white-gray_1',
  'project-action',
  'project-active_state',
  'project-green',
  'project-orange',
  'project-red',
  'project-gray_bg',
  'surface-glass',
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
