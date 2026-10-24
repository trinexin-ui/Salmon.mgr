import { type ReactNode } from 'react'

type SuccessNoticeProps = {
  image: string
  title: string
  text: string[]
  children?: ReactNode
  className?: string
}

// Figma: организм success_notice (экран «Sent to the team»). Фон-картинка на весь экран и два
// белых градиента (сверху 80%→0 на 2–14%, снизу 0→100% на 57–74%); внизу заголовок H1
// (d/linear-gold), текст body_1 secondary_white, под ними children (кнопка).
export function SuccessNotice({ image, title, text, children, className }: SuccessNoticeProps) {
  return (
    <div className={['relative flex min-h-full flex-col overflow-hidden', className ?? ''].join(' ')}>
      <img
        src={image}
        alt=""
        className="pointer-events-none absolute inset-0 block h-full w-full object-cover object-bottom"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-project-white/80 from-2% to-project-white/0 to-14%"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-project-white/0 from-57% to-project-white to-74%"
      />

      <div className="relative mt-auto flex flex-col gap-xxxl px-l py-xxl">
        <div className="flex flex-col items-center gap-m text-center">
          <span className="type-h1 bg-gradient-gold bg-clip-text whitespace-nowrap text-transparent">
            {title}
          </span>
          <p className="type-body_1 text-text-and-icon-secondary_white">
            {text.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
        </div>
        {children}
      </div>
    </div>
  )
}
