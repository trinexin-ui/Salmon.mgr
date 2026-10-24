import { Tag } from '@/shared/ui/atoms/Tag'
import laurel from '@/shared/ui/illustrations/laurel-left.svg'

type LeagueCardProps = {
  title: string
  rank: string
  text: string[]
  tag: string
  image?: string
  className?: string
}

// Figma: организм league_card (карточка «Gold League» в профиле). Белая карточка: заголовок h3 и
// номер между лавровыми ветвями, описание (secondary_black), tag; справа кубок.
// Собран из: tag.
export function LeagueCard({
  title,
  rank,
  text,
  tag,
  image = '/assets/league-cup.png',
  className,
}: LeagueCardProps) {
  return (
    <div
      style={{ borderRadius: 'var(--radius-l)' }}
      className={[
        'relative flex w-full flex-col items-start gap-2xl overflow-hidden bg-project-white p-l',
        className ?? '',
      ].join(' ')}
    >
      <div className="flex flex-col items-start gap-s" style={{ width: 196 }}>
        <div className="flex items-center gap-s">
          <span className="type-h3 whitespace-nowrap text-text-and-icon-primary">{title}</span>
          <div className="flex items-center">
            <img src={laurel} alt="" className="block" style={{ width: 18, height: 18 }} />
            <span className="type-h3 text-text-and-icon-primary">{rank}</span>
            <img
              src={laurel}
              alt=""
              className="block"
              style={{ width: 18, height: 18, transform: 'scaleX(-1)' }}
            />
          </div>
        </div>
        <p className="type-body_2 text-text-and-icon-secondary_black">
          {text.map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </p>
      </div>
      <img
        src={image}
        alt=""
        className="pointer-events-none absolute block"
        style={{ right: 31, top: 4, width: 126, height: 144, maxWidth: 'none' }}
      />
      <Tag label={tag} />
    </div>
  )
}
