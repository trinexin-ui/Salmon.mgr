import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

export type GoalLevel = 'easy' | 'ambitious' | 'legendary'
export type Distribution = 'equal' | 'by_offers' | 'hybrid'

// Shared flow state.
// flow_1: whether Jose's training has been scheduled. Drives the two states of the
//   employee card (banner shown when entered from Home; banner hidden after "Great!").
// flow_2: the team-goal wizard. `goalSent` hides the "Set a goal" banner on Period plan
//   (after "Great!"); the rest are the wizard choices, cascaded step to step.
type FlowState = {
  scheduled: boolean
  setScheduled: (v: boolean) => void
  goalSent: boolean
  setGoalSent: (v: boolean) => void
  level: GoalLevel
  setLevel: (v: GoalLevel) => void
  splitPct: number // % of the total that goes to employees (step 2), default 50
  setSplitPct: (v: number) => void
  distribution: Distribution
  setDistribution: (v: Distribution) => void
  hybridPct: number // % of the employees' amount that is the equal part (step 3), default 50
  setHybridPct: (v: number) => void
  resetGoal: () => void
  // flow_4: the Pinned chip in Shoutouts shows "new" until it is opened; each entry from Home resets it
  pinnedSeen: boolean
  setPinnedSeen: (v: boolean) => void
}

const FlowContext = createContext<FlowState | null>(null)

export function FlowProvider({ children }: { children: ReactNode }) {
  const [scheduled, setScheduled] = useState(false)
  const [goalSent, setGoalSent] = useState(false)
  const [level, setLevel] = useState<GoalLevel>('ambitious')
  const [splitPct, setSplitPctRaw] = useState(50)
  const [distribution, setDistribution] = useState<Distribution>('hybrid')
  const [hybridPct, setHybridPct] = useState(50)
  const [pinnedSeen, setPinnedSeen] = useState(false)

  const value = useMemo<FlowState>(
    () => ({
      scheduled,
      setScheduled,
      goalSent,
      setGoalSent,
      level,
      setLevel: (v) => {
        setLevel(v)
        setHybridPct(50)
      },
      splitPct,
      // The step-3 slider returns to 50/50 whenever the employees' amount changes.
      setSplitPct: (v) => {
        setSplitPctRaw(v)
        setHybridPct(50)
      },
      distribution,
      setDistribution,
      hybridPct,
      setHybridPct,
      resetGoal: () => {
        setLevel('ambitious')
        setSplitPctRaw(50)
        setDistribution('hybrid')
        setHybridPct(50)
      },
      pinnedSeen,
      setPinnedSeen,
    }),
    [scheduled, goalSent, level, splitPct, distribution, hybridPct, pinnedSeen],
  )
  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>
}

export function useFlow() {
  const ctx = useContext(FlowContext)
  if (!ctx) throw new Error('useFlow must be used within FlowProvider')
  return ctx
}
