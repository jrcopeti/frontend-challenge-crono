# CLAUDE.md

Guidance for working in this repository.

## Read this first

- **`docs/design-notes.md`** — how every design value was derived from the
  export, and why the implementation deliberately differs where it does. Read it
  before touching anything visual, and add to it whenever a value is confirmed.
- **`PLAN.md`** — scratch file holding the current phase status and what is
  waiting on the user. Not committed, so it will not exist in a fresh clone;
  that is expected, and nothing in it is needed to understand the code.

## Working agreement

### Git — stage only, never commit

**Run `git add` and stop there.** Do not run `git commit`, `git push`, `gh repo create`
or `gh pr create` without the user explicitly approving that specific action first.

The user reviews every diff in VS Code's staged view before it becomes history. So:

- Finish a unit of work, stage it, then report what's staged and wait.
- Each commit, each push and each PR is its own separate approval. Approval for one does
  not carry to the next.
- Answering a scoping question ("what should the repo be called?", "public or private?")
  is **not** approval to create, commit or push anything.

### Asset rule — ask, don't substitute

When a component needs an icon, logo, avatar or illustration that is not in
`src/assets/figma/`, **ask the user for that specific export** before building something
in its place. An empty folder is not evidence the asset cannot be produced.

Keep building the components that don't depend on it, render a visible placeholder, and
track what's outstanding in `src/assets/figma/README.md`. Only fall back to a Lucide icon
or a hand-written SVG once the user confirms the asset is unavailable.

## What this is

A take-home assessment for a frontend engineer role at **Crono**: rebuild a single static
dashboard screen from a Figma design in React + TypeScript.

The brief:

- Static screen; APIs may be simulated or read from JSON.
- The **only** required interaction is the Signals list: clicking **Action** opens a menu
  with **Complete** and **Delete**; picking either decreases the unread-signals counter.
- React + TypeScript required; library stack free (Crono uses Tailwind internally).
- **The submission is graded on how faithfully it matches the Figma design.** Visual
  fidelity is the top priority — treat a spacing or colour mismatch as a real bug.

`design/Dashboard.png` is the reference. It holds two frames: the default state, and the
state with the Action menu and the KPI tooltip open.

## Commands

Package manager is **pnpm**.

| Command                             | Purpose                                        |
| ----------------------------------- | ---------------------------------------------- |
| `pnpm dev`                          | Vite dev server                                |
| `pnpm build`                        | Typecheck project refs + production build      |
| `pnpm preview`                      | Serve the production build                     |
| `pnpm lint` / `pnpm lint:fix`       | ESLint (flat config)                           |
| `pnpm typecheck`                    | `tsc -b --noEmit`                              |
| `pnpm format` / `pnpm format:check` | Prettier, with the Tailwind class-order plugin |
| `pnpm test` / `pnpm test:watch`     | Vitest + React Testing Library                 |

CI runs format:check, lint, typecheck, test and build on every push and PR.

## Stack and why

- **Vite + React 19 + TypeScript (strict)** — required by the brief; Vite keeps the
  scaffold small and deploys to Vercel with zero config.
- **Tailwind CSS v4** — Crono uses Tailwind internally. Tokens are declared CSS-first in
  `@theme` in `src/styles/index.css`.
- **Radix UI primitives** (`radix-ui` package) — `DropdownMenu` for the Action menu,
  `Tooltip` for the KPI info icon, `ScrollArea` for the Signals list's visible scrollbar.
  Unstyled, so they don't fight the design, and they supply focus management,
  Esc/outside-click and keyboard navigation.
- **TanStack Query v5** over a hand-rolled fake async service — gives loading states and
  optimistic mutations without pretending a real backend exists.
- **ESLint flat config** — typescript-eslint with type-aware rules, plus `react-hooks`,
  `react-refresh` and **`jsx-a11y`**. The accessibility rules earn their place: the
  dropdown, the tooltip and the icon-only sidebar buttons are all easy to get wrong.
  ESLint is pinned to v9 because `eslint-plugin-jsx-a11y` does not yet declare v10 support.
- **Lucide React** — only for icons that could not be exported from the design.

## Conventions

### Folder layout

```
src/
  app/            App, providers, query client
  components/
    layout/       AppShell, Sidebar and its parts
    dashboard/    Welcome, Replies, Today's tasks, Performance, Onboarding
    signals/      Signals card, rows, action menu
    ui/           Generic primitives (Card, Badge, Pill, Avatar, ProgressBar, ...)
  features/signals/  Query hooks for the signals feature
  lib/api/        Fake async service + in-memory store
  mocks/          Seed JSON
  types/          Domain types
  styles/         Tailwind entrypoint + design tokens
  assets/figma/   Exports from the design (see the asset rule above)
```

Import with the `@/` alias, never long relative chains.

### Design tokens

Colours, radii and shadows are **sampled from `design/Dashboard.png`**, not guessed. Decode
the PNG and read the pixel at a known coordinate, or take the most frequent colour across a
region. Sampled values go into the `@theme` block in `src/styles/index.css`.

**Components must not contain raw hex values** — if a colour is missing, add a token.

### Signals

- Signal variants are modelled as a **discriminated union on `kind`**. The sentence in each
  row is rendered per-variant from typed fields — never parse or interpolate a pre-built
  string in the view.
- **The unread counter is derived, never decremented**:
  `signals.filter((s) => !s.read).length`. This keeps "complete an already-read signal" and
  "delete a read signal" correct for free.
- `Complete` marks the signal read in place (the unread dot clears, the row stays).
  `Delete` removes the row. Both therefore reduce the unread count.
- The sidebar's Inbox badge is a separate, static replies count — do not couple it to the
  signals counter.
