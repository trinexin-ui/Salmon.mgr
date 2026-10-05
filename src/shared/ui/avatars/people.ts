// Fixed personas used across the prototype (Figma avatar / avatar_reaction variants).
export const PEOPLE = {
  'louis-bautista': 'Louis Bautista',
  'lyn-dela-cruz': 'Lyn Dela Cruz',
  'jun-reyes': 'Jun Reyes',
  'jose-reyes': 'Jose Reyes',
  'maria-santos': 'Maria Santos',
  'bea-ocampo': 'Bea Ocampo',
  'carlo-del-rosa': 'Carlo Del Rosa',
  'carlos-domingo': 'Carlos Domingo',
} as const

export type Person = keyof typeof PEOPLE

export const PERSON_LIST = Object.keys(PEOPLE) as Person[]
