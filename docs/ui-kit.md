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
- [x] **avatar** — `person` (8 персон, 68px, обводка 1px градиентом `white_gray`, inside) _(добавлен Carlos Domingo)_
- [x] **date_item** — пропсы `weekday`, `day` (оба body_1), `opacity`. Цвет один — `text-and-icon/secondary_black`; активность задаётся прозрачностью (активный 100%, не чисто белый). _(добавлен для flow_1: Home)_
- [x] **pattern** — `type` (on_black / on_white); диагональная штриховка line_pattern (#F4F4F4/20% или #474547/20%, 1.5px, ~45°). Используется в bank-goal
- [x] **progress_bar** — `type` (on_black / on_white), проп `progress` (0–1). Рамка 1px, внутри 16px: золотая заливка (`d/linear-gold`) + штриховка `pattern` на незаполненной части. Выделен из bank-goal, где был встроен. _(flow_2: Period plan)_
- [x] **delta** — `direction` (up / down), проп `label`. Треугольник + процент body_1: up — `green`, down — `red`. Выделен из stats_summary. _(flow_2: Period plan)_
- [x] **gauge** — полукруглая диаграмма 155×78 из двух дуг (зелёная `green` / синяя `blue`) с зазором и круглыми концами; проп `percent` (доля зелёной, 0–100). _(flow_2: Period plan, Split/Distribution)_
- [x] **grabber** — планка 36×5, `project/on_white/gray_2` (в макете `gray_22` #ebebeb, ближайшая роль), высота блока 16. Ручка bottom-sheet. _(flow_4)_
- [x] **segment** — `state` (default / active), проп `label`; один сегмент segment_button: body_2 white, active — плашка `on_black/gray_2`. Выделен из segment_button.
- [x] **grid_pattern** — фоновая перспективная сетка Moments (два SVG 532×532 из макета в `public/assets`), на всю высоту экрана. _(flow_4: Moments)_
- [x] **img_goal-card** — один вариант (монеты на подставке), 110px, PNG в `src/shared/ui/illustrations`. Используется в goal_card

> `reaction`, `person_tag`, `card_button` перенесены в молекулы (состоят из атомов).

---

## Молекулы (`d-molecules` + перенесённые) — `src/shared/ui/molecules`

- [x] **reaction** — `type` (default / more3), `active`; пропсы `smile`, `people`, `count`. Собран из: smile_reaction, avatar_reaction
- [x] **person_tag** — проп `person`. Собран из: avatar_reaction
- [x] **card_button** — пропсы `label`, `icon`, `notification`; фикс-ширина 118px. Собран из: icon _(перенесён в молекулы)_
- [x] **segment_button** — пропсы `items`, `activeIndex` (сегменты D/W/M). Собран из: segment
- [x] **step_bar** — пропсы `steps`, `activeIndex`. Собран из: step_item
- [x] **chips_group** — активный + разделитель + группа. Собран из: chips
- [x] **tab** — `active`; пропсы `label`, `icon`, `iconActive`. Собран из: icon
- [x] **item_menu** — `type` (up / middle / down); пропсы `label`, `icon`. иконка и шеврон — `secondary_white` (серые), подпись — primary; Собран из: icon
- [x] **edit_card** — пропсы `title`, `left`, `right`. Собран из: button
- [x] **week_calendar** — пропсы `days`, `activeIndex`; прозрачность по удалению от активного дня (100/40/20%). Собран из: date_item. _(добавлен для flow_1: Home)_
- [x] **stats_summary** — пропсы `items` (label/value/delta); лейбл `secondary_black`, значение `text-and-icon/white`, дельта `green` (всё body_1); первые колонки flex-1, последняя по контенту (раскладка по ширине). Pending/Approved/Earned на Home. _(добавлен для flow_1: Home)_
- [x] **datetime_row** — пропсы `title`, `subtitle`; эмодзи-календарь + тексты + Edit. Собран из: button. Строка даты/времени на экране тренировки. _(добавлен для flow_1: Training)_
- [x] **goal_banner** — проп `title`, `subtitle`, `onClick`; тёмная строка `on_black/gray_1`: картинка 44px (3D-иконка, `public/assets/period-goal-thumb.png`) + тексты + `icon_button` (chevron-right, middle). Собран из: icon_button. _(flow_2: Period plan)_
- [x] **prize_tile** — `variant` (selected / side), проп `label`, `image`; плитка приза 175×196, radius m: картинка + белый градиент снизу + подпись h3 (selected — `d/linear-gold`, side — `d/linear-black_gold`); selected в рамке 2px `active_state`/50%, side повёрнут ±6° и полупрозрачный (52%). Статичная. _(flow_2: step2)_
- [x] **contribution_row** — пропсы `person`, `name`, `amount`, `offers`, `delta?`, `direction?`; аватар 52px + имя/сумма слева, офферы + delta справа. Собран из: avatar, delta. _(flow_2: Period plan)_
- [x] **pull_handle** — проп `labelOpacity` (плавно гасит подпись); проп `label`; планка `grabber` + подпись caption_1 `secondary_white` («Pull down») по центру. Собран из: grabber. _(flow_4: лента)_
- [x] **moment_tile** — `variant` (center / side), `selected?`, `tilt`, проп `image`; фото в скруглении m: side 100×117 с наклоном ±16°, center 120×140 (selected — в рамке 2px `moment_frame` (#ddc8a9, непрозрачная) на карточке 128×148). Статичная. _(flow_4: Moments)_

---

## Организмы (`d-organism`) — `src/shared/ui/organisms`

- [x] **bank-goal** — пропсы label/title/progress/… Собран из: button
- [x] **employee_card** — пропсы person/name/tags/status/starButton/offerProgress/slots. Собран из: avatar, icon_button, tag, icon
- [x] **tab_bar** — без вариантов. Собран из: tab
- [x] **important_information** — gold-градиент заголовок (d/linear-gold, пик 56.4%) + секундомер с размытым тёплым эллипсом (Layer Blur) позади. Собран из: button
- [x] **name_row** — пропсы person/name/role/located/avg. Собран из: avatar, icon_button
- [x] **menu** — проп `items`. Собран из: item_menu
- [x] **header** — один вариант; пропсы `title`, `description`. Собран из: icon_button _(в ките один вариант: назад + заголовок + одна кнопка)_
- [x] **goal_card** — `type` (period_plan / distribution); фикс-высота 140px, иллюстрация img_goal-card (110px, absolute left:16/top:53) + gold-сумма + radiobutton. Собран из: radiobutton, img_goal-card _(slider в distribution — через `children`, flow_2 step3)_
- [x] **slider** — интерактивный сплит (перетаскивание ползунка); пропсы `defaultPercent`, `total`. Собран из: icon
- [x] **wall_card** — `type` (vote / recognitions / post); проп `description`. Собран из: reaction, person_tag, avatar, avatar_reaction, tag, icon_button, icon
- [x] **stats_card** — `type` (employee / manager); employee: бар-чарт по дням, manager: 2 плитки. Собран из: button, icon_button
- [x] **possibilities_card** — `unlock` (yes/no); медаль + unlock/lock. Собран из: icon
- [x] **chart_card** — пропсы `title`, `centerLabel`, `ratio`, `percent`, `legend` (две подписи); белая карточка: заголовок + gauge, по центру внизу дуги подпись и соотношение, под ней легенда с цветными точками. Собран из: gauge. _(flow_2: Period plan — Split / Distribution)_
- [x] **goal_progress_card** — пропсы `title`, `subtitle`, `tag`, `progress`, `needLabel/needValue`, `leftLabel/leftValue`; белая карточка: название + тег справа, progress_bar (on_white), строка Need / Left. Собран из: tag, icon_button, progress_bar. _(flow_2: Period plan)_
- [x] **contribution_card** — пропсы `title`, `rows`; белая карточка с заголовком h3 и списком contribution_row. Собран из: contribution_row. _(flow_2: Period plan)_
- [x] **prize_card** — пропсы `title`, `subtitle`, `prize`, `saveUpTo`, `placeName`, `placeAddress`; белая карточка «Select the team goal»: заголовок + карусель из 3 prize_tile (центр выбран) + input «Save up to» + edit_card. Собран из: prize_tile, input, edit_card. _(flow_2: step2)_
- [x] **goal_summary** — пропсы `illustration` (coins / bag / chest), `category`, `title`, `children`; белая карточка review: иллюстрация цели 80px по центру, категория (body_1 secondary) + название (h3), кнопка Edit (tertiary gray), под ними `children` — edit_card со сводкой Split / Distribution. Собран из: button, img_goal-card (+ edit_card снаружи). _(flow_2: step4)_
- [x] **success_notice** — пропсы `image`, `title`, `text`, `children`; полноэкранный фон-картинка (`public/assets/goal-success-heart.webp`) + два белых градиента (сверху 80%→0 на 2–14%, снизу 0→100% на 57–74%), внизу заголовок H1 `d/linear-gold` по центру, текст body_1 `secondary_white`, под ними `children` (кнопка). Собран из: button (снаружи). _(flow_2: success)_
- [x] **profile_hero** — пропсы `person`, `name`, `level`, `progress`, `needLabel/needValue`, `nextLabel/nextValue`; аватар 120 по центру, имя (h2) и уровень (h3, `d/linear-silver`), полоса уровня `progress_bar` (tone silver, on_white) и строка Need / Next. Собран из: avatar, progress_bar. _(flow_3: профиль)_
- [x] **league_card** — пропсы `title`, `rank`, `text`, `tag`, `image`; белая карточка лиги: заголовок h3 + лавровые ветви вокруг номера, описание (2 строки, `secondary_black`), tag, кубок справа (`public/assets/league-cup.png`). Собран из: tag. _(flow_3: профиль)_
- [x] **moment_cluster** — пропсы `images` (left / center / right), `person`, `selected?`; три `moment_tile` в ряд (контейнер 314×184) + под центральным аватар 36px с белой обводкой и имя body_2 white. Собран из: moment_tile, avatar_reaction. _(flow_4: Moments)_
- [x] **bottom_sheet** — пропсы `children`, `onGrab`; панель `gray_bg` со скруглением сверху xl, наверху `grabber` (клик/тяга — `onGrab`); внутри children (шапка + таб-бар). Собран из: grabber. _(flow_4: Moments)_
- [x] **status_bar** — пропсы `ink` (#ffffff / #000000), `className`; вектор из `Status Bar.svg` владельца (currentColor), прозрачный фон. Закреплён сверху экрана в `PhoneShell` (всегда виден при скролле). **НЕ срисовывать с макета заново.** Цвет ink **динамический**: вычисляется в `PhoneShell` по тому, что под баром (`elementFromPoint`) — белый над зоной с атрибутом `data-sb-dark`, иначе `#000000`. Чрома устройства iOS — не из секций `d-*`, но нужна для рендера фреймов. _(добавлен для flow_1)_

> Примечание по flow_2 (расширены существующие, стили не менялись): **icon_button** — `color="dark"` (фон `on_black/gray_2`, для тёмного экрана и карточек `on_black/gray_1`); **header** — `theme="dark"` (белый заголовок, описание `secondary_black`, кнопки `dark`); **bank-goal** — `bare` (без карточки и кнопки, для заголовка на тёмном фоне); **bank-goal** и **stats_summary** переведены на атомы `progress_bar` и `delta` — вид не изменился.

> Примечание по flow_4 (Shoutouts, расширены существующие): **wall_card** — данные через пропсы (`recognitions`: `illustration`, `person`, `text`, `reactions`, `time`; `post`: `author`, `subtitle`, `lines`, `reactions`, `time`), без пропсов выглядит как раньше; **header** — `leftAvatar` (аватар 44 слева вместо «‹») и `onAvatar` (аватар — контрол пути); **tab_bar** — `active` (home / team / shoutouts) и `links` (контролы пути); **chips_group** — `newItems` (чип с бейджем «new», пока не выбран).

> Примечание по flow_3 (профиль и Possibilities, расширены существующие): **progress_bar** — `tone` (gold / silver; silver — `d/linear-silver`, токен добавлен владельцем); **header** — `rightIcons` (несколько кнопок справа); **stats_card** (manager) — `wallet` (кнопка кошелька, по умолчанию есть) и на атоме `delta`; **item_menu** / **menu** — `onClick`, `danger` (красный пункт), разделитель только под текстом; **chips_group** — пропсы `all`, `items`, `value`, `onChange` (по умолчанию как раньше); **possibilities_card** — `illustration` (analytics / spotlight / fund / target / shield / medal; картинки в `src/shared/ui/illustrations`), разделитель закрытой карточки 40%.

> Примечание по flow_2 (шаги 2–3, расширены существующие): **slider** — управляемый режим (`percent`, `onPercentChange`), подписи плиток (`leftLabel`, `rightLabel`), `card` (белая карточка вокруг); **edit_card** — `right` необязателен.

> Примечание по flow_2 (мастер «Set team goal», расширены существующие): **goal_card** — `illustration` (coins / bag / chest; картинки в `src/shared/ui/illustrations`: `goal-card`, `goal-card-ambitious`, `goal-card-legendary`) и `onClick`; **step_bar** — `progressive` (активны все шаги до `activeIndex` включительно); **header** — `backHidden` (место под «‹» занято, кнопки нет — step1).

> Примечание по flow_1: расширены существующие компоненты — **header** (необязательный `title`, настраиваемая/скрываемая правая кнопка `rightIcon`, `onBack`/`onRight`), **bank-goal** (`buttonLabel`), **important_information** (дефолт «POS loans», `onSchedule`), **employee_card** (`statusIcon`, `actions`, `showOffers`, `onClick`, опциональный `pendingLabel`), **card_button** (`fluid`, `onClick`), **button**/**icon_button** (`onClick`). Стили не менялись — только пропы для вариантов из макета и кликабельности.

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
