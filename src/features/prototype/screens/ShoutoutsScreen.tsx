import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Header } from '@/shared/ui/organisms/Header'
import { ChipsGroup } from '@/shared/ui/molecules/ChipsGroup'
import { PullHandle } from '@/shared/ui/molecules/PullHandle'
import { WallCard } from '@/shared/ui/organisms/WallCard'
import { TabBar } from '@/shared/ui/organisms/TabBar'
import { PathLink } from '@/features/prototype/PathLink'
import { useFlow } from '@/features/prototype/flow'
import { BottomSheet } from '@/shared/ui/organisms/BottomSheet'
import { MomentsBackdrop } from '@/features/prototype/screens/MomentsScreen'
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

// Wall status-bar zone above the pull handle (the status bar sits over it).
const TOP = 74
// Distance the grabber sits below the sheet's top edge in the Moments sheet (BottomSheet pt-xs_1).
const SHEET_PAD = 4

// Figma d-shoutouts-wall-new_post (3094:15073) + d-shoutouts-moments (3094:15074): one screen.
// The wall is a sheet over the dark Moments collage. Pulling it down (mouse drag, wheel, or a click
// on the handle) slides it down under the pointer until only its handle, header and the tab bar
// are left — that is the Moments sheet; pulling it back up returns the wall. The chips filter the
// cards.
export function ShoutoutsScreen() {
  const navigate = useNavigate()
  const open = useLocation().pathname.endsWith('/moments')
  const { pinnedSeen, setPinnedSeen } = useFlow()
  const [filter, setFilter] = useState('All')

  const rootRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const anchorRef = useRef<HTMLDivElement>(null)
  const tabRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLDivElement>(null)
  // Measured from the real elements: top edge of the Moments sheet, tab bar height, height of the
  // "Pull down" caption.
  const [m, setM] = useState({ sheetTop: 0, tab: 0, caption: 0 })

  // Two passes: the tab bar height first (it sets the invisible sheet's footer), then the rest.
  useLayoutEffect(() => {
    const tab = tabRef.current?.getBoundingClientRect()
    if (tab) setM((v) => ({ ...v, tab: tab.height }))
  }, [])
  useLayoutEffect(() => {
    if (!m.tab) return
    const root = rootRef.current?.getBoundingClientRect()
    const anchor = anchorRef.current?.getBoundingClientRect()
    // handle wrapper > PathLink span > PullHandle > [grabber, caption]
    const caption = handleRef.current?.firstElementChild?.firstElementChild?.lastElementChild
    if (!root || !anchor) return
    setM((v) => ({
      ...v,
      sheetTop: anchor.top - root.top,
      caption: caption?.getBoundingClientRect().height ?? 0,
    }))
  }, [m.tab])

  // The sheet's grabber must end up where the Moments sheet's grabber is.
  const distance = m.sheetTop + SHEET_PAD - TOP
  const clipTop = m.sheetTop - distance

  const pull = usePull(distance, open ? 1 : 0, scrollRef, (isOpen) => {
    navigate(isOpen ? '/shoutouts/moments' : '/shoutouts', { replace: true })
  })
  const p = pull.progress

  // The status bar ink follows what is behind it: dark Moments shows once the sheet leaves the top.
  const lifted = p > 0.02
  useEffect(() => {
    window.dispatchEvent(new Event('proto:ink'))
  }, [lifted])

  function select(value: string) {
    setFilter(value)
    if (value === 'Pinned') setPinnedSeen(true)
  }

  const visible = CARDS.filter((c) => filter === 'All' || c.kind === filter)
  const r = `calc(var(--radius-xl) * ${p})`

  return (
    <div ref={rootRef} className="relative h-full select-none overflow-hidden" {...pull.bind}>
      <MomentsBackdrop />

      {/* Invisible copy of the Moments sheet: only tells where its top edge is. */}
      <div
        ref={anchorRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 opacity-0"
      >
        <BottomSheet footer={<div style={{ height: m.tab }} />}>
          <div className="px-l">
            <Header leftAvatar="louis-bautista" title="Shoutouts" rightIcon="plus" />
          </div>
        </BottomSheet>
      </div>

      {/* The wall sheet. */}
      <div
        className="absolute inset-0 z-10 bg-project-gray_bg"
        style={{
          transform: `translateY(${distance * p}px)`,
          clipPath: `inset(${clipTop * p}px 0 0 0 round ${r} ${r} 0 0)`,
        }}
      >
        <div
          ref={scrollRef}
          className="hide-scrollbar h-full"
          style={{ overflowY: p > 0 ? 'hidden' : 'auto' }}
        >
          <div className="flex min-h-full flex-col">
            {/* Status bar zone: pinned and backed, so the wall scrolls under the status bar. */}
            <div className="sticky top-0 z-10 bg-project-gray_bg" style={{ height: TOP }} />
            <div ref={handleRef} style={{ marginBottom: -m.caption * p }}>
              <PathLink onClick={pull.toggle}>
                <PullHandle labelOpacity={Math.max(0, 1 - p * 3)} />
              </PathLink>
            </div>
            {/* Pinned nav: the header stays right under the status bar while the wall scrolls; the
                handle above it scrolls away. */}
            <div className="sticky z-10 mt-m bg-project-gray_bg px-l pb-s" style={{ top: TOP }}>
              <Header leftAvatar="louis-bautista" title="Shoutouts" rightIcon="plus" />
            </div>

            <div
              className="mt-2xl flex flex-col gap-l"
              style={{ opacity: Math.max(0, 1 - p * 1.6) }}
            >
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
              {/* room for the floating tab bar */}
              <div className="shrink-0" style={{ height: m.tab + 8 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Tab bar: one for both states, floats over the sheet with no backing. */}
      <div ref={tabRef} className="absolute inset-x-0 bottom-0 z-10">
        <TabBar active="shoutouts" links={{ home: () => navigate('/') }} />
      </div>
    </div>
  )
}
