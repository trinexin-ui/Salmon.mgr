import { useEffect, useRef, useState, type ReactNode } from 'react'
import { colorVariables, gradients, radii, spacingScale, typeStyles } from './tokens'
import { readVar, resolveColorHex } from './cssValue'
import { Icon, iconNames } from '@/shared/ui/icons/Icon'
import { Radiobutton } from '@/shared/ui/atoms/Radiobutton'
import { Tag } from '@/shared/ui/atoms/Tag'
import { CardButton } from '@/shared/ui/atoms/CardButton'
import { Chips } from '@/shared/ui/atoms/Chips'

function useText<T extends HTMLElement>(compute: () => string, deps: unknown[]) {
  const ref = useRef<T>(null)
  useEffect(() => {
    if (ref.current) ref.current.textContent = compute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return ref
}

function ColorSwatch({ varName, label }: { varName: string; label: string }) {
  const hexRef = useText<HTMLDivElement>(() => resolveColorHex(varName), [varName])
  return (
    <div className="flex flex-col gap-xs_1">
      <div
        className="h-xxxl w-full rounded-m border border-line-on_white-gray_1"
        style={{ background: `var(${varName})` }}
      />
      <div className="type-caption_1 text-text-and-icon-primary">{label}</div>
      <div ref={hexRef} className="type-caption_2 text-text-and-icon-secondary_white" />
    </div>
  )
}

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-l">
      <h3 className="type-h3 text-text-and-icon-primary mb-m">{title}</h3>
      {children}
    </section>
  )
}

function TypeMeta({ name }: { name: string }) {
  const ref = useText<HTMLDivElement>(() => {
    const el = document.querySelector(`.type-${name}`)
    if (!el) return ''
    const cs = getComputedStyle(el)
    return `${parseFloat(cs.fontSize)}/${parseFloat(cs.lineHeight)} · ${cs.fontWeight}`
  }, [name])
  return (
    <div ref={ref} className="type-caption_1 text-text-and-icon-secondary_white w-40 text-right" />
  )
}

function SpacingRow({ name }: { name: string }) {
  const pxRef = useText<HTMLDivElement>(() => readVar(`--spacing-${name}`), [name])
  return (
    <div className="flex items-center gap-l">
      <div className="type-caption_1 text-text-and-icon-primary w-24">{name}</div>
      <div ref={pxRef} className="type-caption_2 text-text-and-icon-secondary_white w-16" />
      <div className="h-s bg-project-green rounded-m" style={{ width: `var(--spacing-${name})` }} />
    </div>
  )
}

function RadiusCard({ name }: { name: string }) {
  const pxRef = useText<HTMLDivElement>(() => readVar(`--radius-${name}`), [name])
  return (
    <div className="flex flex-col items-center gap-xs_1">
      <div
        className="h-xxxl w-xxxl bg-project-white border border-line-on_white-gray_1"
        style={{ borderRadius: `var(--radius-${name})` }}
      />
      <div className="type-caption_1 text-text-and-icon-primary">round/{name}</div>
      <div ref={pxRef} className="type-caption_2 text-text-and-icon-secondary_white" />
    </div>
  )
}

function Foundation() {
  return (
    <div className="flex flex-col gap-2xxl">
      <h2 id="foundation" className="type-h2 text-text-and-icon-primary scroll-mt-l">
        Основа
      </h2>

      <Block id="colors" title="Цвета">
        <div className="grid grid-cols-6 gap-l">
          {colorVariables.map((name) => (
            <ColorSwatch key={name} varName={`--color-${name}`} label={name} />
          ))}
        </div>
      </Block>

      <Block id="gradients" title="Градиенты">
        <div className="grid grid-cols-6 gap-l">
          {gradients.map((name) => (
            <div key={name} className="flex flex-col gap-xs_1">
              <div
                className="h-xxxl w-full rounded-m border border-line-on_white-gray_1"
                style={{ backgroundImage: `var(--gradient-${name})` }}
              />
              <div className="type-caption_1 text-text-and-icon-primary">gradient-{name}</div>
            </div>
          ))}
        </div>
      </Block>

      <Block id="typography" title="Типографика">
        <div className="flex flex-col gap-l">
          {typeStyles.map((name) => (
            <div
              key={name}
              className="flex items-baseline gap-l border-b border-line-on_white-gray_1 pb-m"
            >
              <div className={`type-${name} text-text-and-icon-primary flex-1`}>
                {name} — Salmon Manager
              </div>
              <TypeMeta name={name} />
            </div>
          ))}
        </div>
      </Block>

      <Block id="spacing" title="Отступы">
        <div className="flex flex-col gap-s">
          {spacingScale.map((name) => (
            <SpacingRow key={name} name={name} />
          ))}
        </div>
      </Block>

      <Block id="radius" title="Радиусы">
        <div className="flex gap-l">
          {radii.map((name) => (
            <RadiusCard key={name} name={name} />
          ))}
        </div>
      </Block>
    </div>
  )
}

const NAV: { label: string; href: string; children?: { label: string; href: string }[] }[] = [
  {
    label: 'Основа',
    href: '#foundation',
    children: [
      { label: 'Цвета', href: '#colors' },
      { label: 'Градиенты', href: '#gradients' },
      { label: 'Типографика', href: '#typography' },
      { label: 'Отступы', href: '#spacing' },
      { label: 'Радиусы', href: '#radius' },
    ],
  },
  { label: 'Атомы', href: '#atoms', children: [{ label: 'Иконки', href: '#icons' }] },
  { label: 'Молекулы', href: '#molecules' },
  { label: 'Организмы', href: '#organisms' },
]

function Atoms() {
  return (
    <section id="atoms" className="scroll-mt-l flex flex-col gap-2xl">
      <h2 className="type-h2 text-text-and-icon-primary">Атомы</h2>
      <Block id="icons" title={`Иконки (${iconNames.length})`}>
        <div className="grid grid-cols-8 gap-l">
          {iconNames.map((n) => (
            <div
              key={n}
              className="flex flex-col items-center gap-xs_1 rounded-m border border-line-on_white-gray_1 py-m"
            >
              <Icon name={n} className="text-text-and-icon-primary" />
              <div className="type-caption_2 text-text-and-icon-secondary_white">{n}</div>
            </div>
          ))}
        </div>
      </Block>
      <RadiobuttonDemo />
      <ChipsDemo />
      <Block id="tag" title="tag">
        <div className="flex items-center gap-l">
          <Tag label="Tag name" />
          <Tag label="On fire" icon="fire" />
        </div>
      </Block>
      <Block id="card_button" title="card_button">
        <div className="flex items-start gap-l">
          <CardButton label="Summary" icon="book" />
          <CardButton label="Training" icon="award" notification />
          <CardButton label="Whisper" icon="bubble-chat" />
        </div>
      </Block>
      <p className="type-body_2 text-text-and-icon-secondary_white">
        Остальные атомы собираются по одному — скоро.
      </p>
    </section>
  )
}

function ChipsDemo() {
  const [active, setActive] = useState(false)
  const [isNew, setIsNew] = useState(true)
  return (
    <Block id="chips" title="chips">
      <div className="flex flex-col gap-l">
        <div className="flex items-center gap-2xl">
          <Chips label="All" active />
          <Chips label="Pinned" isNew />
          <Chips label="Posts" />
        </div>
        <div className="flex items-center gap-l">
          <label className="type-body_2 flex cursor-pointer items-center gap-s text-text-and-icon-primary">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="cursor-pointer"
            />
            active
          </label>
          <label className="type-body_2 flex cursor-pointer items-center gap-s text-text-and-icon-primary">
            <input
              type="checkbox"
              checked={isNew}
              onChange={(e) => setIsNew(e.target.checked)}
              className="cursor-pointer"
            />
            isNew
          </label>
        </div>
        <div className="flex items-center gap-l">
          <Chips label="Recognitions" active={active} isNew={isNew} />
          <code className="type-caption_1 text-text-and-icon-secondary_white">{`<Chips label="Recognitions" active={${active}} isNew={${isNew}} />`}</code>
        </div>
      </div>
    </Block>
  )
}

function RadiobuttonDemo() {
  const [active, setActive] = useState(false)
  return (
    <Block id="radiobutton" title="radiobutton">
      <div className="flex flex-col gap-l">
        <div className="flex items-end gap-2xl">
          <div className="flex flex-col items-center gap-xs_1">
            <Radiobutton active={false} />
            <span className="type-caption_2 text-text-and-icon-secondary_white">active=no</span>
          </div>
          <div className="flex flex-col items-center gap-xs_1">
            <Radiobutton active={true} />
            <span className="type-caption_2 text-text-and-icon-secondary_white">active=yes</span>
          </div>
        </div>
        <label className="type-body_2 text-text-and-icon-primary flex cursor-pointer items-center gap-s">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="cursor-pointer"
          />
          active
        </label>
        <div className="flex items-center gap-l">
          <Radiobutton active={active} />
          <code className="type-caption_1 text-text-and-icon-secondary_white">{`<Radiobutton active={${active}} />`}</code>
        </div>
      </div>
    </Block>
  )
}

function Placeholder({ id, title }: { id: string; title: string }) {
  return (
    <section id={id} className="scroll-mt-l">
      <h2 className="type-h2 text-text-and-icon-primary">{title}</h2>
      <p className="type-body_2 text-text-and-icon-secondary_white mt-s">
        Скоро — собирается по макету.
      </p>
    </section>
  )
}

export function StyleGuide() {
  return (
    <div className="mx-auto flex w-[1440px] gap-2xxl bg-project-white">
      <nav className="sticky top-0 h-screen w-60 shrink-0 border-r border-line-on_white-gray_1 p-l">
        <div className="type-h3 text-text-and-icon-primary mb-l">Salmon UI</div>
        <ul className="flex flex-col gap-s">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="type-body_2 text-text-and-icon-primary block cursor-pointer hover:text-project-green"
              >
                {item.label}
              </a>
              {item.children && (
                <ul className="mt-xs_1 ml-m flex flex-col gap-xs_1">
                  {item.children.map((c) => (
                    <li key={c.href}>
                      <a
                        href={c.href}
                        className="type-caption_1 text-text-and-icon-secondary_white block cursor-pointer hover:text-project-green"
                      >
                        {c.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <main className="flex flex-1 flex-col gap-xxxl py-xxxl pr-xxxl">
        <Foundation />
        <Atoms />
        <Placeholder id="molecules" title="Молекулы" />
        <Placeholder id="organisms" title="Организмы" />
      </main>
    </div>
  )
}
