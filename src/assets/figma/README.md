# Figma exports

Design assets exported from the Figma file. SVG preferred, PNG @2x otherwise.

**Do not substitute a lookalike asset for a missing one.** Ask for the export first; only
fall back once it is confirmed unavailable.

## Present

| Asset                                                   | Notes                                                                                                                                                                                                              |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `crono-logo.svg`                                        | Sidebar wordmark. Its `viewBox` was tightened to the artwork's own bounding box (measured with `getBBox`); the supplied file carried ~20% vertical padding, which made the mark render too small when sized by height. No path data changed. |
| `nav-*.svg` (8 files)                                   | Sidebar navigation. The designer's inactive grey (`#7A8395`) was swapped for `currentColor` so the active row can render the same artwork in brand teal. `nav-dashboard.svg` serves both Dashboard and Lists — the export uses one panel glyph for both and distinguishes them only by colour. |
| `user-avatar.svg`                                       | Sidebar footer. The Crono mark on a `#d5e0f0` disc, background included.                                                                                                                                             |
| `gift.svg`                                              | "Upgrade plan" button. White stroke swapped for `currentColor`.                                                                                                                                                      |
| `trial-swoosh.svg` | Decoration on the trial card, 40x64 — exactly the card's height. Carries `mix-blend-mode: color-burn`, which only composites correctly when the blend is applied to the element: inside an `<img>` the SVG renders isolated and the swoosh comes out olive instead of pale yellow. **Optimised 304 KB -> 19 KB**: it embedded a 1668x2224 raster of which the pattern transform used only a 138x188 window, so the raster was cropped to that window and the transform re-anchored. Verified pixel-identical against the original render. |

## Outstanding

| Asset                                                 | Where it appears  | Status                                                          |
| ----------------------------------------------------- | ----------------- | ---------------------------------------------------------------- |
| Onboarding icons (5, coloured)                        | Onboarding card   | ✅ available — exportable on request; **ask before building the Onboarding card** (phase 5) |
| Cartoon avatar                                        | Signals rows      | ⏳ requested                                                     |
| Reply avatar stack (Reddit / black / McDonald's / "M") | Replies card      | ⏳ requested                                                     |
| KPI row icons                                         | May's performance | ⏳ requested                                                     |
| Favicon                                               | Browser tab       | ⏳ requested                                                     |

## Substituted

Only the two generic disclosure chevrons — the sidebar collapse control and the Analytics
row — come from Lucide. Every distinctive glyph is the designer's own export.
