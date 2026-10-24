import { MomentCluster } from '@/shared/ui/organisms/MomentCluster'
import { GridPattern } from '@/shared/ui/atoms/GridPattern'

const photo = (n: number) => `/assets/moments/moment-${n}.jpg`

// Figma d-shoutouts-moments (3094:15074): the dark collage of moments. The Shoutouts sheet that
// sits over it (pulled down from the wall) lives in ShoutoutsScreen, so the two are one screen.
export function MomentsBackdrop() {
  return (
    <div data-sb-dark className="absolute inset-0 overflow-hidden bg-project-black_bg">
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
    </div>
  )
}
