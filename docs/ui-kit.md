# UI-kit — что собираем

Разложено по уровням **из макета** (секции `d-atoms`, `d-molecules`, `d-organism`, `d-icon`), не по общим представлениям. Варианты — из имён компонентов Figma (свойство=значение); `свойство?` → логический проп. Отмечаем собранное галочкой.

Порядок сборки: основа → атомы → молекулы → организмы. Снизу вверх, по одному компоненту, со сверкой скриншота с макетом.

---

## Основа

- [x] Токены (цвета: 20 переменных + 3 градиента; типографика 9 стилей; spacing 14; radius 7) → `docs/DESIGN.md`, `src/index.css`
- [x] Витрина `/style-guide`: секция «основа»

---

## Атомы (`d-atoms`) — `src/shared/ui/atoms`

- [x] **radiobutton** — `active` (yes/no)
- [x] **icon_button** — `color` (black / gray), `size` (big / middle / small); проп `icon`
- [x] **card_button** — без вариантов (Default); пропсы `label`, `icon`, `notification`
- [x] **tag** — без вариантов (Default); проп `label` (иконку убрали по решению владельца). _(в макете было type white/black — сейчас один Default)_
- [x] **step_item** — `active` (yes/no); проп `label`
- [x] **reaction** — `type` (default / more3), `active` (yes/no); пропсы `emoji`, `avatars`, `count`
- [x] **chips** — `state` (active / non_active / new); проп `label`
- [x] **button** — `state` (primary / secondary / tertiary), `color` (black / gray); пропсы `label`, `icon` _(перенесён из молекул в атомы)_
- [x] **input** — `state` (filled / active / default / disabled); пропсы `label`, `value`, `placeholder`, `leftIcon` _(перенесён в атомы; иконка Search отсутствует в d-icon → `leftIcon` опционален)_
- [ ] **smile_reaction** — `name` (cry / ok / cool / laugh / heart) — нужны ассеты
- [ ] **avatar** — `person` (7 персон, 68px) — нужны ассеты
- [ ] **avatar_reaction** — `person` (7 персон, 24px) — нужны ассеты
- [x] **person_tag** — без вариантов (Default); пропсы `name`, `avatar`

Все 8 атомов собраны и показаны на витрине. Контент (иконки/аватары/эмодзи) — через пропсы.

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

- [x] Chevron Right · Chevron Left · Notification · Fire · Crown · Bubble-Chat · Bubble-Chat_fill · Horizontal · Book · Phone
- [x] Group · Award · Favourite · Star · Alert · Close · Calendar · Edit · slider · home
- [x] home_fill · Chating · Plus · Pin · Wallet · Possibilities · File · Unlock · Lock · Exit · Setting

Выгружены в `src/shared/ui/icons/*.svg` (24×24, `currentColor`), доступ через `Icon` (`name`, `size`, `className`). Имена → kebab-case (`bubble-chat-fill`, `home-fill`). Показаны на витрине в секции «Атомы».

- [x] `check` — добавлен из глифа radiobutton (в `d-icon` отдельной галочки не было; решение владельца). Итого иконок: **32**.

---

## «Собран из» (заполняется при сборке)

Для молекул и организмов фиксируем состав (компоненты уровнем ниже) по мере сборки — для витрины и проверки переиспользования.
