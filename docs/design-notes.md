# Design notes

How the values in this codebase were derived from the Figma design, and why the
implementation differs from it in the few places it does.

The reference is `design/Dashboard.png` (1794×1692). It holds two frames: the
default state at origin **(37, 92)**, exactly **1440×750**, and the state with
the Action menu and KPI tooltip open at (37, 892). The first frame is 1:1, so a
design coordinate maps to a viewport coordinate by subtracting (37, 92) at a
1440-wide viewport.

Nothing here is estimated by eye. Each section says how the value was obtained.

---

## Colour

Sampled from the export by decoding the PNG and reading pixels at measured
coordinates. Every value lives in the `@theme` block in `src/styles/index.css`;
**a raw hex in a component file is a bug**.

| Role                 | Value                                                                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Page / card / border | `#f5f7f9` / `#ffffff` / `#e6e9f2`                                                                                                          |
| Ink                  | `#010e27`, soft `#3e485b`, muted `#7a8395`                                                                                                 |
| Brand                | `#1ebab2` (Action button), strong `#0a9b94` (links, active nav), soft `#e9f8f8` (Replies panel, pills), chip `#ceeded` (Replies icon disc) |
| Tooltip              | `#151618`                                                                                                                                  |

Accent hues are each reused on three surfaces — a task tile, a KPI progress bar
and a signal type label — so they are named by hue rather than by use site:

| Hue    | Solid / soft                                        |
| ------ | --------------------------------------------------- |
| Red    | `#ed4c5e` / `#ffe9e9`                               |
| Amber  | `#f9bb06`, ink `#c69812`, bar `#e2ad13` / `#fef3d2` |
| Blue   | `#3b85e8` / `#eaf1fb`                               |
| Indigo | `#3b58db` / `#eaf3fb`                               |
| Green  | `#1a9d6e` / `#e8f5d9`                               |
| Purple | `#8846dc` / `#f2eaff`                               |
| Pink   | `#e769cb` / `#fde5f8`                               |

Cards are white with a **1px `#e6e9f2` border and no shadow**.

The wordmark carries its own teal, `#07c8c0` — a third teal, distinct from both
brand tokens. The asset is used unaltered rather than tinted to a token, because
that is what the export renders.

---

## Typography

**Poppins**, weights 400/500/600/700.

Sizes were first derived by measuring each string's ink width in the export and
solving for the font size whose canvas `actualBoundingBox` metrics match that
width — a method validated against a string of known size, accurate to 0.3px.
That is reliable for size but **cannot recover weight**; the weights and line
heights below are the designer's own Figma values.

| Use                                 | Size / weight / line-height |
| ----------------------------------- | --------------------------- |
| "Welcome Alex,"                     | 24 / 700 / 30               |
| Task tile counts                    | 24 / 500 / 30               |
| Replies count                       | 36 / 600                    |
| Card titles                         | 14 / 600 / 22               |
| Body, Welcome paragraph             | 14 / 400 / 20               |
| "Open inbox" link                   | 14 / 500 / 18               |
| Task tile labels                    | 14 / 500 / 16               |
| Meta — dates, durations, KPI labels | 12                          |

The scale is narrow on purpose: almost everything is 14px, and weight rather
than size carries the hierarchy.

---

## Layout

Measured from the export, then verified by reading `getBoundingClientRect` in a
browser at 1440×750 and comparing against those measurements.

|                   | Value                                            |
| ----------------- | ------------------------------------------------ |
| Sidebar           | 192px (191 + 1px right border)                   |
| Page padding      | 16px                                             |
| Main column       | x=208, width 800                                 |
| Right rail        | x=1016, width 408                                |
| Column gap        | 8px                                              |
| Main card rows    | y=16 h=142 · y=166 h=148 · y=322 h=412           |
| Nav rows          | 40px tall, 48px pitch, 8px gap                   |
| KPI tiles         | 184×72, 8px gaps, 16px card padding              |
| KPI progress bars | 3px tall, 164px wide, 10px tile padding          |
| Action buttons    | 90×32, rows pitched 73px                         |
| Dropdown menu     | 214×96, 40px items, 8px padding, `#e9f8f8` hover |
| Tooltip           | 246×67                                           |

---

## Corner radii

|                           | Value |
| ------------------------- | ----- |
| Cards                     | 16px  |
| Task tiles, Replies panel | 12px  |
| Trial card                | 8px   |
| Action button, menu       | 12px  |

These were wrong at first, and the reason is worth recording. Reading absolute
pixel counts off the export **understates** a radius: an antialiased curve only
reaches full colour some way past its true tangent point, so the corner looks
tighter than it is. That produced 12px for cards and 8px for tiles.

The reliable method is to render a candidate and diff its corner _inset profile_
against the export's, row by row — the antialiasing bias is present in both and
cancels out:

```
row:         0  1  2  3  4  5  6  7  8  9 10 11
design:     11  9  7  6  5  4  3  2  2  1  1  0
mine @16px: 11  9  7  6  5  4  3  2  2  1  1  0   ← exact match
mine @12px:  8  6  4  3  2  2  1  1  0  0  0  0
```

A related artefact: a **half-pixel line** appears in the export as 2px of a 50%
blend. The 1px rules between task tiles read as `#f2f4f8`, which is `#e6e9f2` at
half strength. Rendering a crisp 1px line at the same position is correct.

---

## Details that are easy to get wrong

- **The task tiles are grouped, not evenly spaced.** A 1px rule, 86px tall, sits
  in the gaps either side of the two Pending tiles and nowhere else, so the row
  reads `Overdue │ Pending Manual  Pending Auto │ Completed`. The gaps measure
  16/8/16 _because the wider ones carry the rule_ — which looks like a slip until
  the rules are accounted for. `TodaysTasks` takes groups so the grouping lives
  in the data rather than in an index check in the view.
- **Signal type labels are colour-coded by kind**: Role change purple, Company
  change blue, Website view pink — the same hues as the KPI bars.
- **Dashboard and Lists share one nav glyph**, differing only in colour.
- Replies avatar order is Reddit → Amazon → McDonald's → Medium, confirmed by
  sampling each avatar's dominant colour.

---

## Deliberate deviations from the design

| Item                                                                                                          | Decision                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The right rail's top card sits 5px lower than the main column's                                               | Aligned to the same top                                                                                                                                                 |
| KPI bars contradict their own numbers — "Companies engaged 0/500" is drawn ~52% full, as is Meetings at 20/30 | Bars derive from `value / max`, so two of six differ from the export. A bar that disagrees with the number beside it is worse than a bar that disagrees with the mockup |
| Amber badges use white text (~1.9:1, below WCAG AA)                                                           | Kept — fidelity is the brief, and the colour was sampled rather than assumed. Flagged here rather than silently "fixed"                                                 |
| The design's nav glyphs, the Onboarding icons and the brand avatars                                           | All are the designer's own exports. Only the two generic disclosure chevrons come from Lucide                                                                           |

---

## Assets

Exports live flat in `src/assets/figma/` with semantic names. Two notes for
anyone adding more:

- **Avoid `#` in a path.** It begins a URL fragment and breaks shell commands; a
  `PR#4/` folder took the dev server down.
- **Export bitmap logos as PNG @2x/@3x, not SVG.** An SVG wrapping a base64
  raster is strictly larger than the raster and carries no vector benefit. Frame
  exports — circular, with transparent corners — are ideal, because the framing
  comes from the design rather than being reconstructed.

Two supplied assets needed repair, both recorded in `src/assets/figma/README.md`:
the wordmark carried ~20% padding inside its `viewBox` (tightened to the
artwork's own bounding box, no path data changed), and the trial-card swoosh
embedded a 1668×2224 raster of which its pattern transform used a 138×188
window — cropped, with the transform re-anchored, 304 KB → 19 KB.

The nav icons ship with the inactive grey `#7A8395` baked in. They are inlined
by `vite-plugin-svgr` and that grey swapped for `currentColor`, so the active
row can render the same artwork in brand teal.
