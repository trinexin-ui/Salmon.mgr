import { useNavigate } from 'react-router-dom'
import { Header } from '@/shared/ui/organisms/Header'
import { TabBar } from '@/shared/ui/organisms/TabBar'
import { BottomSheet } from '@/shared/ui/organisms/BottomSheet'
import { MomentCluster } from '@/shared/ui/organisms/MomentCluster'
import { GridPattern } from '@/shared/ui/atoms/GridPattern'
import { usePull } from '@/features/prototype/usePull'

const photo = (n: number) => `/assets/moments/moment-${n}.jpg`

// Figma d-shoutouts-moments (3094:15074): dark collage of moments with the Shoutouts sheet
// pinned at the bottom. Pulling the sheet up (or clicking its grabber) returns to the wall.
export function MomentsScreen() {
  const navigate = useNavigate()
  const back = () => navigate('/shoutouts')
  const pull = usePull('up', back)

  return (
    <div data-sb-dark className="relative h-full overflow-hidden bg-project-black_bg">
      <GridPattern />

      {/* Scattered clusters (layout: positions from the macet). */}
      <div className="absolute" style={{ left: 118, top: 62 }}>
        <MomentCluster
          person="lyn-dela-cruz"
          selected
          images={{ left: photo(2), center: photo(4), right: photo(3) }}
        />
      </div>
      <div className="absolute" style={{ left: -119, top: 249 }}>
        <MomentCluster
          person="jose-reyes"
          images={{ left: photo(8), center: photo(10), right: photo(9) }}
        />
      </div>
      <div className="absolute" style={{ left: 198, top: 400 }}>
        <MomentCluster
          person="carlo-del-rosa"
          images={{ left: photo(5), center: photo(7), right: photo(6) }}
        />
      </div>
      <div className="absolute" style={{ left: -105, top: 580 }}>
        <MomentCluster person="lyn-dela-cruz" selected images={{ center: photo(1), right: photo(0) }} />
      </div>

      <div className="absolute inset-x-0 bottom-0" {...pull}>
        <BottomSheet
          onGrab={back}
          footer={<TabBar active="shoutouts" links={{ home: () => navigate('/') }} />}
        >
          <div className="px-l">
            <Header leftAvatar="louis-bautista" title="Shoutouts" rightIcon="plus" />
          </div>
        </BottomSheet>
      </div>
    </div>
  )
}
