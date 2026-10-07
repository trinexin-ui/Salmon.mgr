import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

// Shared flow state: whether Jose's training has been scheduled. Drives the two states
// of the employee card (banner shown when entered from Home; banner hidden after "Great!").
type FlowState = {
  scheduled: boolean
  setScheduled: (v: boolean) => void
}

const FlowContext = createContext<FlowState | null>(null)

export function FlowProvider({ children }: { children: ReactNode }) {
  const [scheduled, setScheduled] = useState(false)
  const value = useMemo(() => ({ scheduled, setScheduled }), [scheduled])
  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>
}

export function useFlow() {
  const ctx = useContext(FlowContext)
  if (!ctx) throw new Error('useFlow must be used within FlowProvider')
  return ctx
}
