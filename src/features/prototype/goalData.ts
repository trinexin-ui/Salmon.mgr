import type { GoalLevel } from '@/features/prototype/flow'

// Stub data for flow_2 (rule 6: data inline in code).

export const peso = (n: number) => '₱' + n.toLocaleString('en-US')

export const WIZARD_STEPS = ['Period plan', 'Choose split', 'Distribution', 'Review']

export const LEVELS: {
  id: GoalLevel
  category: string
  title: string
  amount: number
  illustration: 'coins' | 'bag' | 'chest'
}[] = [
  { id: 'easy', category: 'Easy', title: '75 approved offers', amount: 5000, illustration: 'coins' },
  {
    id: 'ambitious',
    category: 'Ambitious',
    title: '100 approved offers',
    amount: 10000,
    illustration: 'bag',
  },
  {
    id: 'legendary',
    category: 'Legendary',
    title: '135 approved offers',
    amount: 15000,
    illustration: 'chest',
  },
]

export const levelOf = (id: GoalLevel) => LEVELS.find((l) => l.id === id)!

// Cascade of amounts: level → total, splitPct → employees' part, hybridPct → equal part.
export const totalAmount = (level: GoalLevel) => levelOf(level).amount
export const employeesAmount = (level: GoalLevel, splitPct: number) =>
  Math.round((totalAmount(level) * splitPct) / 100)
export const teamAmount = (level: GoalLevel, splitPct: number) =>
  totalAmount(level) - employeesAmount(level, splitPct)
export const equalPart = (employees: number, hybridPct: number) =>
  Math.round((employees * hybridPct) / 100)
