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
- [x] **avatar** — `person` (8 персон, 68px, белый бордер) _(добавлен Carlos Domingo)_
- [x] **pattern** — `type` (on_black / on_white); диагональная штриховка line_pattern (#F4F4F4/20% или #474547/20%, 1.5px, ~45°). Используется в bank-goal
- [x] **img_goal-card** — `type` (75 / 100 / 135); иллюстрации (монеты / мешок / сундук), 110px, PNG в `src/shared/ui/illustrations`. Используется в goal_card

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

- [x] **bank-goal** — пропсы label/title/progress/… Собран из: button
- [x] **employee_card** — пропсы person/name/tags/status/starButton/offerProgress/slots. Собран из: avatar, icon_button, tag, icon
- [x] **tab_bar** — без вариантов. Собран из: tab
- [x] **important_information** — gold-градиент заголовок (d/linear-gold, пик 56.4%) + секундомер с размытым тёплым эллипсом (Layer Blur) позади. Собран из: button
- [x] **name_row** — пропсы person/name/role/located/avg. Собран из: avatar, icon_button
- [x] **menu** — проп `items`. Собран из: item_menu
- [x] **header** — один вариант; пропсы `title`, `description`. Собран из: icon_button _(в ките один вариант: назад + заголовок + одна кнопка)_
- [x] **goal_card** — `type` (period_plan / distribution), `img` (75 / 100 / 135); иллюстрация img_goal-card (110px) + gold-сумма + radiobutton. Собран из: radiobutton, img_goal-card _(встроенный slider в distribution пока не включён)_
- [x] **slider** — интерактивный сплит (перетаскивание ползунка); пропсы `defaultPercent`, `total`. Собран из: icon
- [x] **wall_card** — `type` (vote / recognitions / post); пропсы `description`, `img`. Собран из: reaction, person_tag, avatar, avatar_reaction, tag, icon_button, icon
- [x] **stats_card** — `type` (employee / manager); employee: бар-чарт по дням, manager: 2 плитки. Собран из: button, icon_button
- [x] **possibilities_card** — `unlock` (yes/no); медаль + unlock/lock. Собран из: icon

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
