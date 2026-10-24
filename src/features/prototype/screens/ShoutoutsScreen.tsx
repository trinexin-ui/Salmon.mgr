import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/shared/ui/organisms/Header'
import { ChipsGroup } from '@/shared/ui/molecules/ChipsGroup'
import { PullHandle } from '@/shared/ui/molecules/PullHandle'
import { WallCard } from '@/shared/ui/organisms/WallCard'
import { TabBar } from '@/shared/ui/organisms/TabBar'
import { PathLink } from '@/features/prototype/PathLink'
import { useFlow } from '@/features/prototype/flow'
import { usePull } from '@/features/prototype/usePull'

type Card = { kind: 'Pinned' | 'Recognitions' | 'Posts'; card: Parameters<typeof WallCard>[0] }

// Stub data (rule 6: data inline in code). The kind decides which filter shows the card.
const CARDS: Card[] = [
  { kind: 'Pinned', card: { type: 'vote' } },
  {
    kind: 'Recognitions',
    card: {
      type: 'recognitions',
      illustration: 'flame',
      person: 'maria-santos',
      text: 'Closed three offers before lunch. Unstoppable!',
      reactions: [
        { smile: 'heart', people: ['louis-bautista', 'lyn-dela-cruz'] },
        { smile: 'laugh', type: 'more3', active: true, count: 4 },
      ],
      time: '6 min ago',
    },
  },
  {
    kind: 'Posts',
    card: {
      type: 'post',
      author: 'lyn-dela-cruz',
      reactions: [{ smile: 'cool', people: ['louis-bautista', 'lyn-dela-cruz'] }],
      time: '3:56 PM',
    },
  },
  {
    kind: 'Recognitions',
    card: {
      type: 'recognitions',
      illustration: 'ribbon',
      person: 'bea-ocampo',
      text: 'Landed her first approved offer. Welcome to the board!',
      reactions: [
        { smile: 'heart', active: true, people: ['louis-bautista', 'jun-reyes'] },
        { smile: 'ok', people: ['lyn-dela-cruz'] },
      ],
      time: '10:02 AM',
    },
  },
  {
    kind: 'Posts',
    card: {
      type: 'post',
      author: 'louis-bautista',
      subtitle: 'You',
      lines: ['Reminder: shift huddle Monday 8:30 before', "opening. Kape's on me"],
      reactions: [{ smile: 'laugh', people: ['louis-bautista', 'jose-reyes', 'jun-reyes'] }],
      time: 'Yesterday',
    },
  },
]

// Figma d-shoutouts-wall-new_post (3094:15073): the Shoutouts wall. The chips filter the cards;
// pulling the wall down (or clicking "Pull down") opens Moments.
export function ShoutoutsScreen() {
  const navigate = useNavigate()
  const { pinnedSeen, setPinnedSeen } = useFlow()
  const [filter, setFilter] = useState('All')
  const pull = usePull('down', () => navigate('/shoutouts/moments'))

  function select(value: string) {
    setFilter(value)
    if (value === 'Pinned') setPinnedSeen(true)
  }

  const visible = CARDS.filter((c) => filter === 'All' || c.kind === filter)

  return (
    <div className="flex min-h-full flex-col bg-project-gray_bg" {...pull}>
      <div className="flex flex-col gap-2xxl" style={{ paddingTop: 74 }}>
        <div className="flex flex-col gap-m">
          <PathLink onClick={() => navigate('/shoutouts/moments')}>
            <PullHandle />
          </PathLink>
          <div className="px-l">
            <Header leftAvatar="louis-bautista" title="Shoutouts" rightIcon="plus" />
          </div>
        </div>

        <div className="flex flex-col gap-l">
          <ChipsGroup
            all="All"
            items={['Pinned', 'Recognitions', 'Posts']}
            value={filter}
            onChange={select}
            newItems={pinnedSeen ? [] : ['Pinned']}
          />
          <div className="flex flex-col gap-m px-l">
            {visible.map((c, i) => (
              <WallCard key={i} {...c.card} />
            ))}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 z-10 mt-auto bg-project-gray_bg pt-2xxl">
        <TabBar active="shoutouts" links={{ home: () => navigate('/') }} />
      </div>
    </div>
  )
}
