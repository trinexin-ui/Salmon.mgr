import coins from '@/shared/ui/illustrations/goal-card.png'
import bag from '@/shared/ui/illustrations/goal-card-ambitious.png'
import chest from '@/shared/ui/illustrations/goal-card-legendary.png'

// The whole bag as drawn on the Review card (the `bag` above is a zoomed crop for the period_plan card).
export { default as GOAL_SUMMARY_BAG } from '@/shared/ui/illustrations/goal-summary-bag.png'

// img_goal-card variants: the goal level drawn on the card (Easy / Ambitious / Legendary).
export const GOAL_ILLUSTRATIONS = { coins, bag, chest } as const
export type GoalIllustration = keyof typeof GOAL_ILLUSTRATIONS
