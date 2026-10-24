import { useNavigate } from 'react-router-dom'
import { Header } from '@/shared/ui/organisms/Header'
import { ProfileHero } from '@/shared/ui/organisms/ProfileHero'
import { StatsCard } from '@/shared/ui/organisms/StatsCard'
import { LeagueCard } from '@/shared/ui/organisms/LeagueCard'
import { Menu } from '@/shared/ui/organisms/Menu'

// Figma d-profile (3094:15477): manager profile reached from the Home avatar.
export function ManagerProfileScreen() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-full flex-col bg-project-gray_bg pb-2xxl">
      {/* Pinned nav: back + icons stay on top while the page scrolls, over a backdrop that
          matches the page background (as on the employee card). */}
      <div className="sticky top-0 z-10 bg-project-gray_bg px-l pb-s" style={{ paddingTop: 74 }}>
        <Header rightIcons={['notification', 'setting']} onBack={() => navigate('/')} />
      </div>
      <div className="flex flex-col px-l">
        <ProfileHero
          person="louis-bautista"
          name="Louis Bautista"
          level="Silver Manager"
          progress={0.68}
          needValue="42 offers"
          nextValue="Gold Manager"
        />
      </div>

      <div className="mt-xxxl flex flex-col gap-xl px-l">
        <StatsCard type="manager" wallet={false} />
        <LeagueCard
          title="Gold League"
          rank="3"
          text={['A great month lifts your store', 'to Platinum!']}
          tag="Hold for 3 more days"
        />
        <Menu
          dense
          items={[
            {
              label: 'Possibilities',
              icon: 'possibilities',
              onClick: () => navigate('/profile/possibilities'),
            },
            { label: 'Reports', icon: 'file' },
            { label: 'Withdraw funds', icon: 'wallet' },
            { label: 'Exit', icon: 'exit', danger: true },
          ]}
        />
      </div>
    </div>
  )
}
