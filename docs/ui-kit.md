# UI-kit — что собираем

Разложено по уровням **из макета** (секции `d-atoms`, `d-molecules`, `d-organism`, `d-icon`), не по общим представлениям. Варианты — из имён компонентов Figma (свойство=значение); `свойство?` → логический проп. Отмечаем собранное галочкой.

Порядок сборки: основа → атомы → молекулы → организмы. Снизу вверх, по одному компоненту, со сверкой скриншота с макетом.

---

## Основа

- [x] Токены (цвета: 20 переменных + 3 градиента; типографика 8 стилей; spacing 11; radius 1) → `docs/DESIGN.md`, `src/index.css`
- [x] Витрина `/style-guide`: секция «основа»

---

## Атомы (`d-atoms`) — `src/shared/ui/atoms`

- [ ] **radiobutton** — `active` (yes/no)
- [ ] **icon_button** — `color` (black / gray), `size` (big / middle / small)
- [ ] **card_button** — без вариантов (Default)
- [ ] **tag** — `type` (white / black)
- [ ] **step_item** — `active` (yes/no)
- [ ] **reaction** — `type` (default / more3), `active` (yes/no)
- [ ] **chips** — `active` (yes/no)
- [ ] **person_tag** — без вариантов (Default)

---

## Молекулы (`d-molecules`) — `src/shared/ui/molecules`

> В макете `button` и `input` лежат в молекулах — оставляю уровень как в макете.

- [ ] **segment_button** — `size` (small)
- [ ] **tab** — `active` (yes/no)
- [ ] **item_menu** — `type` (up / middle / down)
- [ ] **step_bar** — без вариантов (Default)
- [ ] **edit_card** — без вариантов (Default)
- [ ] **chips_group** — без вариантов (Default)
- [ ] **button** — `state` (primary / secondary / tertiary), `color` (black / gray)
- [ ] **input** — `state` (filled / active / default / disabled) _(в Figma опечатка «acrive» = active)_

---

## Организмы (`d-organism`) — `src/shared/ui/organisms`

- [ ] **bank-goal** — без вариантов (Default)
- [ ] **employee_card** — `state` (state2) _(в макете захвачен один вариант; уточнить остальные состояния)_
- [ ] **tab_bar** — без вариантов (Default)
- [ ] **important_information** — без вариантов (Default)
- [ ] **name_row** — без вариантов (Default)
- [ ] **menu** — без вариантов (Default)
- [ ] **header** — `type` (#1 / #2)
- [ ] **goal_card** — `type` (period_plan / distribution)
- [ ] **slider** — `type` (60/40)
- [ ] **wall_card** — `type` (vote / recognitions / post)
- [ ] **stats_card** — `type` (employee / manager)
- [ ] **possibilities_card** — `unlock` (yes/no)

---

## Иконки (`d-icon`) — `src/shared/ui/icons` (SVG 24×24, имена сохраняются)

31 шт. Экспортируются из Figma, подставляются везде, в т.ч. внутрь компонентов, где иконка вшита.

- [ ] Chevron Right · Chevron Left · Notification · Fire · Crown · Bubble-Chat · Bubble-Chat_fill · Horizontal · Book · Phone
- [ ] Group · Award · Favourite · Star · Alert · Close · Calendar · Edit · slider · home
- [ ] home_fill · Chating · Plus · Pin · Wallet · Possibilities · File · Unlock · Lock · Exit · Setting

---

## «Собран из» (заполняется при сборке)

Для молекул и организмов фиксируем состав (компоненты уровнем ниже) по мере сборки — для витрины и проверки переиспользования.
