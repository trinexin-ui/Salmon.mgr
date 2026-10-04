import { useEffect, useRef, type ReactNode } from 'react'
import { colorRoles, gradients, radii, spacingScale, typeStyles } from './tokens'
import { readVar, resolveColorHex } from './cssValue'

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
        className="h-xxxl w-xxxl bg-surface-glass border border-line-on_white-gray_1"
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

      <Block id="colors" title="Цвета — роли">
        <div className="grid grid-cols-6 gap-l">
          {colorRoles.map((role) => (
            <ColorSwatch key={role} varName={`--color-${role}`} label={role} />
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
  { label: 'Атомы', href: '#atoms' },
  { label: 'Молекулы', href: '#molecules' },
  { label: 'Организмы', href: '#organisms' },
]

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
    <div className="mx-auto flex w-[1440px] gap-2xxl bg-surface-glass">
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
        <Placeholder id="atoms" title="Атомы" />
        <Placeholder id="molecules" title="Молекулы" />
        <Placeholder id="organisms" title="Организмы" />
      </main>
    </div>
  )
}
