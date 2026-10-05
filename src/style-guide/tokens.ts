// Token names only — values are read at runtime from CSS variables so the
// showcase never hardcodes a value. Mirrors docs/DESIGN.md.

export const colorVariables: string[] = [
  'text-and-icon-primary',
  'text-and-icon-secondary_white',
  'text-and-icon-secondary_black',
  'text-and-icon-white',
  'project-action',
  'project-active_state',
  'project-black_bg',
  'project-gray_bg',
  'project-white',
  'project-blue',
  'project-green',
  'project-orange',
  'project-red',
  'project-on_black-gray_1',
  'project-on_black-gray_2',
  'project-on_white-gray_1',
  'project-on_white-gray_2',
  'project-on_white-gray_3',
  'line-on_white-gray_1',
  'line-on_black-gray',
]

export const gradients = ['white_gray', 'black_gold', 'gold'] as const

export const typeStyles = [
  'h1',
  'h2',
  'h3',
  'body_1',
  'body_2',
  'button_input_1',
  'button_input_2',
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
  'xl',
  '2xl',
  'xxl',
  '2xxl',
  'xxxl',
  'outer',
  'minus_1',
  'minus_2',
] as const

export const radii = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'max'] as const
