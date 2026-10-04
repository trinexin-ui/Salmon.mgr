# DESIGN — Foundation

Источник: Figma «Anton-Vasilev», фрейм **Основа** (node `3094:12112`). Значения взяты из переменных Figma (а где нужно — из фреймов макета). Имена переменных сохранены один в один.

Десктоп-прототип, ширина 1440, без брейкпоинтов.

---

## Spacing

Два набора имён, как в макете: `spacing/none` и шкала `indent/*`. Значения в px.

| Имя (Figma)  | px  |
| ------------ | --- |
| spacing/none | 0   |
| indent/xxs   | 2   |
| indent/xs_1  | 4   |
| indent/xs_2  | 6   |
| indent/s     | 8   |
| indent/m     | 12  |
| indent/l     | 16  |
| indent/2xl   | 24  |
| indent/xxl   | 28  |
| indent/2xxl  | 32  |
| indent/xxxl  | 40  |

> Примечание: в демо-фрейме «indents» спейсер-компонент подписан старыми метками (XXS: 3, XS: 5, S: 10…), но реальные высоты баров и переменные дают шкалу выше. Берём переменные.

---

## Radius

| Имя (Figma) | px  |
| ----------- | --- |
| round/m     | 10  |

Один радиус. Других в макете нет.

---

## Shadows

В макете теней нет (нет соответствующих переменных и стилей). Набор пустой.

---

## Typography

Семейство — **Geist** для всех стилей (`font/family/headers` = Geist, `font/family/text` = Geist). Начертания: `font/weights/Medium` = 500, `font/weights/Regular` = 400.

Переносятся готовыми стилями: имя → шрифт, начертание, размер, интерлиньяж, трекинг вместе. Служебные переменные размеров/интерлиньяжа/трекинга уходят внутрь стилей, отдельными наборами не выносятся.

| Стиль (Figma)    | Семейство | Начертание    | Размер | Интерлиньяж | Трекинг |
| ---------------- | --------- | ------------- | ------ | ----------- | ------- |
| d/H1             | Geist     | Medium (500)  | 36     | 44          | -2      |
| d/H2             | Geist     | Medium (500)  | 24     | 28          | -0.6    |
| d/H3             | Geist     | Medium (500)  | 18     | 19          | -0.5    |
| d/body_1         | Geist     | Regular (400) | 16     | 22          | -0.5    |
| d/body_2         | Geist     | Regular (400) | 14     | 19          | -0.5    |
| d/button_input_1 | Geist     | Medium (500)  | 16     | 20          | -0.7    |
| d/caption_1      | Geist     | Regular (400) | 12     | 15          | -0.1    |
| d/caption_2      | Geist     | Regular (400) | 10     | 12          | -0.1    |

Трекинг указан в px (как в Figma). 8 стилей — ровно столько, сколько заведено.

> Решение владельца (2026-10-04): источник размеров/интерлиньяжа — **переменные `d/*`** (не визуальная таблица макета). Исключение: line-height у `caption_2` = **12px** по таблице (у переменной было 100%). Всё остальное — по переменным.

---

## Colors

Один уровень — **переменные Figma** (точные имена), хекс объявляется прямо в переменной. Слой «примитивов» не ведём: берём полный список переменных из панели Variables как есть.

### Переменные цветов (20 — точные имена Figma)

| Переменная (Figma)                  | Значение |
| ----------------------------------- | -------- |
| color/text-and-icon/primary         | #2a2a2a  |
| color/text-and-icon/secondary_white | #969696  |
| color/text-and-icon/secondary_black | #b1b1b1  |
| color/text-and-icon/white           | #ffffff  |
| color/project/action                | #221f22  |
| color/project/active_state          | #c2a377  |
| color/project/black_bg              | #221f22  |
| color/project/gray_bg               | #f6f6f6  |
| color/project/white                 | #ffffff  |
| color/project/blue                  | #647feb  |
| color/project/green                 | #00b98b  |
| color/project/orange                | #fe8f0b  |
| color/project/red                   | #eb6e78  |
| color/project/on_black/gray_1       | #312e31  |
| color/project/on_black/gray_2       | #474547  |
| color/project/on_white/gray_1       | #f2f2f2  |
| color/project/on_white/gray_2       | #eaebeb  |
| color/project/on_white/gray_3       | #dddddd  |
| color/line/on_white/gray_1          | #e8e8e8  |
| color/line/on_black/gray            | #3a3a3a  |

Дубли значений оставлены как в Figma: `action` / `black_bg` = #221f22; `text-and-icon/white` / `project/white` = #ffffff.

> Ранее MCP отдавал `text-and-icon/tertiary` (#4e4f5c) и `surface/glass` (#ffffff) — в полном списке владельца их нет, поэтому убраны (`surface/glass` в коде заменён на `project/white`).

### Градиенты (3)

Металлические, экспортированы из Figma как многоступенчатые. Стопы точные, направление по координатам Figma.

| Градиент (Figma)    | Направление    | Стопы                                                                  |
| ------------------- | -------------- | ---------------------------------------------------------------------- |
| d/linear-white_gray | ≈255°          | #9C9C9C 0% → #FFFFFF 100%                                              |
| d/linear-black_gold | 90° (to right) | #2A2A2A 0% → #787776 25% → #DBCAB4 41.83% → #787776 75% → #2A2A2A 100% |
| d/linear-gold       | 90° (to right) | #6C6459 0% → #EEDDC4 51.92% → #6C6459 100%                             |

---

## Проверка количества

- Переменных цветов (точные имена Figma): **20**
- Градиентов: **3**
