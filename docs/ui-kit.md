# UI-kit — что собираем

Разложено по уровням **из макета** (секции `d-atoms`, `d-molecules`, `d-organism`, `d-icon`), не по общим представлениям. Варианты — из имён компонентов Figma (свойство=значение); `свойство?` → логический проп. Отмечаем собранное галочкой.

Порядок сборки: основа → атомы → молекулы → организмы. Снизу вверх, по одному компоненту, со сверкой скриншота с макетом.

---

## Основа

- [x] Токены (цвета: 20 переменных + 3 градиента; типографика 9 стилей; spacing 15; radius 7) → `docs/DESIGN.md`, `src/index.css`
- [x] Витрина `/style-guide`: секция «основа»

---

## Атомы (`d-atoms`) — `src/shared/ui/atoms`

- [x] **radiobutton** — `active` (yes/no)
- [x] **icon_button** — `color` (black / gray), `size` (big / middle / small); проп `icon`
- [x] **tag** — без вариантов (Default); проп `label` (иконку убрали). _(в макете было type white/black — сейчас один Default)_
- [x] **step_item** — `active` (yes/no); проп `label`
- [x] **chips** — `state` (active / non_active / new); проп `label`
- [x] **button** — `state` (primary / secondary / tertiary), `color` (black / gray); пропсы `label`, `icon` _(перенесён из молекул в атомы)_
- [x] **input** — `state` (filled / active / default / disabled); пропсы `label`, `value`, `placeholder`, `leftIcon` _(перенесён в атомы; иконка Search отсутствует в d-icon → `leftIcon` опционален; высота 50px фикс)_
- [x] **smile_reaction** — `name` (cry / ok / cool / laugh / heart); PNG 48px в `src/shared/ui/smiles`
- [x] **avatar_reaction** — `person` (7 персон); фото в `src/shared/ui/avatars`, рендер 24px
- [x] **avatar** — `person` (7 персон, 68px, белый бордер)

> `reaction`, `person_tag`, `card_button` перенесены в молекулы (состоят из атомов).

---

## Молекулы (`d-molecules` + перенесённые) — `src/shared/ui/molecules`

- [x] **reaction** — `type` (default / more3), `active`; пропсы `smile`, `people`, `count`. Собран из: smile_reaction, avatar_reaction
- [x] **person_tag** — проп `person`. Собран из: avatar_reaction
- [x] **card_button** — пропсы `label`, `icon`, `notification`; фикс-ширина 118px. Собран из: icon _(перенесён в молекулы)_
- [x] **segment_button** — пропсы `items`, `activeIndex` (сегменты D/W/M)
- [x] **step_bar** — пропсы `steps`, `activeIndex`. Собран из: step_item
- [x] **chips_group** — активный + разделитель + группа. Собран из: chips
- [x] **tab** — `active`; пропсы `label`, `icon`, `iconActive`. Собран из: icon
- [x] **item_menu** — `type` (up / middle / down); пропсы `label`, `icon`. Собран из: icon
- [x] **edit_card** — пропсы `title`, `left`, `right`. Собран из: button

Все молекулы собраны.

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

- [x] Chevron Right · Chevron Left · Notification · Fire · Crown · Bubble-Chat · Bubble-Chat_fill · Horizontal · Book · Phone
- [x] Group · Award · Favourite · Star · Alert · Close · Calendar · Edit · slider · home
- [x] home_fill · Chating · Plus · Pin · Wallet · Possibilities · File · Unlock · Lock · Exit · Setting

Выгружены в `src/shared/ui/icons/*.svg` (24×24, `currentColor`), доступ через `Icon` (`name`, `size`, `className`). Имена → kebab-case (`bubble-chat-fill`, `home-fill`). Показаны на витрине в секции «Атомы».

- [x] `check` — добавлен из глифа radiobutton (в `d-icon` отдельной галочки не было; решение владельца). Итого иконок: **32**.

---

## «Собран из» (заполняется при сборке)

Для молекул и организмов фиксируем состав (компоненты уровнем ниже) по мере сборки — для витрины и проверки переиспользования.
