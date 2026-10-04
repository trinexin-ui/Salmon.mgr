import { useEffect, useRef, useState, type ReactNode } from 'react'
import { colorVariables, gradients, radii, spacingScale, typeStyles } from './tokens'
import { readVar, resolveColorHex } from './cssValue'
import { Icon, iconNames } from '@/shared/ui/icons/Icon'
import { Radiobutton } from '@/shared/ui/atoms/Radiobutton'
import { Tag } from '@/shared/ui/atoms/Tag'
import { CardButton } from '@/shared/ui/atoms/CardButton'
import { Chips } from '@/shared/ui/atoms/Chips'
import { IconButton } from '@/shared/ui/atoms/IconButton'
import { StepItem } from '@/shared/ui/atoms/StepItem'
import { PersonTag } from '@/shared/ui/atoms/PersonTag'
import { Reaction } from '@/shared/ui/atoms/Reaction'
import { Button } from '@/shared/ui/atoms/Button'
import { Input } from '@/shared/ui/atoms/Input'

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
        </div>
      </Block>
      <Block id="card_button" title="card_button">
        <div className="flex items-start gap-l">
          <CardButton label="Summary" icon="book" />
          <CardButton label="Recognition" icon="star" />
          <CardButton label="Whisper" icon="chating" />
        </div>
      </Block>
      <Block id="icon_button" title="icon_button">
        <div className="flex flex-col gap-l">
          {(['black', 'gray'] as const).map((color) => (
            <div key={color} className="flex items-center gap-l">
              <span className="type-caption_1 w-16 text-text-and-icon-secondary_white">
                {color}
              </span>
              {(['big', 'middle', 'small'] as const).map((size) => (
                <div key={size} className="flex flex-col items-center gap-xs_1">
                  <IconButton icon="close" color={color} size={size} />
                  <span className="type-caption_2 text-text-and-icon-secondary_white">{size}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Block>
      <Block id="step_item" title="step_item">
        <div className="flex gap-2xl">
          <div style={{ width: 120 }}>
            <StepItem label="Period goal" active />
          </div>
          <div style={{ width: 120 }}>
            <StepItem label="Choose split" />
          </div>
        </div>
      </Block>
      <Block id="person_tag" title="person_tag">
        <div className="flex items-center gap-l">
          <PersonTag name="Jose Reyes" />
          <PersonTag name="Maria Santos" />
        </div>
      </Block>
      <Block id="reaction" title="reaction">
        <div className="flex items-center gap-2xl">
          <div className="flex flex-col items-center gap-xs_1">
            <Reaction emoji="🔔" type="default" active avatars={['', '', '']} />
            <span className="type-caption_2 text-text-and-icon-secondary_white">
              default · active
            </span>
          </div>
          <div className="flex flex-col items-center gap-xs_1">
            <Reaction emoji="🔔" type="default" avatars={['', '', '']} />
            <span className="type-caption_2 text-text-and-icon-secondary_white">default · no</span>
          </div>
          <div className="flex flex-col items-center gap-xs_1">
            <Reaction emoji="🔔" type="more3" active count={4} />
            <span className="type-caption_2 text-text-and-icon-secondary_white">
              more3 · active
            </span>
          </div>
          <div className="flex flex-col items-center gap-xs_1">
            <Reaction emoji="🔔" type="more3" count={4} />
            <span className="type-caption_2 text-text-and-icon-secondary_white">more3 · no</span>
          </div>
        </div>
      </Block>
      <Block id="button" title="button">
        <div className="flex flex-col gap-l" style={{ maxWidth: 386 }}>
          <Button label="Create new trip" state="primary" icon="plus" />
          <Button label="Create new trip" state="secondary" icon="plus" />
          <div className="flex items-center gap-l">
            <Button label="View All" state="tertiary" color="black" />
            <Button label="View All" state="tertiary" color="gray" />
          </div>
        </div>
      </Block>
      <Block id="input" title="input">
        <div className="flex flex-col gap-l" style={{ maxWidth: 362 }}>
          <Input state="filled" label="Label" value="Search for a distanation" />
          <Input state="active" label="Label" value="Search for a distanation" />
          <Input state="default" placeholder="Search for a distanation" />
          <Input state="disabled" placeholder="Search for a distanation" />
        </div>
      </Block>
    </section>
  )
}

function ChipsDemo() {
  return (
    <Block id="chips" title="chips">
      <div className="flex items-center gap-2xl">
        <div className="flex flex-col items-center gap-xs_1">
          <Chips label="All" state="active" />
          <span className="type-caption_2 text-text-and-icon-secondary_white">active</span>
        </div>
        <div className="flex flex-col items-center gap-xs_1">
          <Chips label="Posts" state="non_active" />
          <span className="type-caption_2 text-text-and-icon-secondary_white">non_active</span>
        </div>
        <div className="flex flex-col items-center gap-xs_1">
          <Chips label="Pinned" state="new" />
          <span className="type-caption_2 text-text-and-icon-secondary_white">new</span>
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
