import medal from '@/shared/ui/illustrations/medal.png'
import analytics from '@/shared/ui/illustrations/possibility-analytics.png'
import spotlight from '@/shared/ui/illustrations/possibility-spotlight.png'
import fund from '@/shared/ui/illustrations/possibility-fund.png'
import target from '@/shared/ui/illustrations/possibility-target.png'
import shield from '@/shared/ui/illustrations/possibility-shield.png'

// 48px pictures of the possibilities_card (one per possibility).
export const POSSIBILITY_ILLUSTRATIONS = { medal, analytics, spotlight, fund, target, shield } as const
export type PossibilityIllustration = keyof typeof POSSIBILITY_ILLUSTRATIONS
