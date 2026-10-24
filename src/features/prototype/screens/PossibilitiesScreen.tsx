import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/shared/ui/organisms/Header'
import { ChipsGroup } from '@/shared/ui/molecules/ChipsGroup'
import { PossibilitiesCard } from '@/shared/ui/organisms/PossibilitiesCard'
import { type PossibilityIllustration } from '@/shared/ui/illustrations/possibilityIllustrations'

type Possibility = {
  kind: 'By level' | 'By league'
  title: string
  description: string
  illustration: PossibilityIllustration
  hint?: string
  locked?: boolean
}

// Stub data (rule 6: data inline in code). Unlocked first, then locked, as in the layout.
const POSSIBILITIES: Possibility[] = [
  {
    kind: 'By level',
    title: 'Extended analytics',
    description: 'Time-of-day patterns, goal forecast',
    illustration: 'analytics',
  },
  {
    kind: 'By league',
    title: 'Salmon spotlight',
    description: 'Store gets featured company-wide',
    illustration: 'spotlight',
  },
  {
    kind: 'By league',
    title: 'Higher team fund limit',
    description: 'Bigger spending cap for team rewards',
    illustration: 'fund',
  },
  {
    kind: 'By level',
    title: 'Custom challenge templates',
    description: 'Build your own team challenges',
    illustration: 'target',
    hint: 'Become a Golden Manager',
    locked: true,
  },
  {
    kind: 'By league',
    title: 'Priority Salmon support',
    description: 'Faster help on flagged applications',
    illustration: 'shield',
    hint: 'Get into the Platinum League',
    locked: true,
  },
]

// Figma d-profile-possibilities (3094:15478): possibilities list; the filter chips
// (All / By level / By league) rebuild the list.
export function PossibilitiesScreen() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')

  const visible = POSSIBILITIES.filter((p) => filter === 'All' || p.kind === filter)
  const open = visible.filter((p) => !p.locked)
  const locked = visible.filter((p) => p.locked)

  const card = (p: Possibility) => (
    <PossibilitiesCard
      key={p.title}
      unlock={!p.locked}
      category={p.kind}
      hint={p.hint}
      title={p.title}
      description={p.description}
      illustration={p.illustration}
    />
  )

  return (
    <div className="flex min-h-full flex-col bg-project-gray_bg pb-2xxl">
      {/* Pinned nav: stays on top while the list scrolls (as on the employee card). */}
      <div className="sticky top-0 z-10 bg-project-gray_bg px-l pb-s" style={{ paddingTop: 'var(--status-h)' }}>
        <Header title="Possibilities" rightIcon={null} onBack={() => navigate('/profile')} />
      </div>

      <div className="mt-2xl flex flex-col gap-l">
        <ChipsGroup
          all="All"
          items={['By level', 'By league']}
          value={filter}
          onChange={setFilter}
        />
        <div className="flex flex-col gap-2xl px-l">
          {open.length > 0 && <div className="flex flex-col gap-m">{open.map(card)}</div>}
          {locked.length > 0 && <div className="flex flex-col gap-m">{locked.map(card)}</div>}
        </div>
      </div>
    </div>
  )
}
