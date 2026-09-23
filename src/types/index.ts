/** Domain types for the dashboard. The seed data in `src/mocks` is typed against these. */

/** Whoever a signal is about: a contact on some rows, a company on others. */
export type Actor = {
  name: string
  /** The mark on its own, as a read row draws it. */
  avatar: string
  /**
   * The same mark with the unread dot baked into its corner. The export ships
   * the two states as separate images rather than composing the dot in CSS,
   * and its canvas is 2px larger on each side to make room for the dot.
   */
  avatarUnread: string
}

type ContactSignal = {
  id: string
  read: boolean
  /** ISO date; the row formats it as "Apr 2, 2025". */
  date: string
  person: Actor
  fromRole: string
  toRole: string
  company: string
  inSequence: boolean
}

/**
 * A signal, discriminated on `kind`.
 *
 * Each row's sentence is rendered per-variant from these fields. Nothing in the
 * view parses or interpolates a pre-built string, so the bold name and the
 * highlighted "2 pages" stay typed rather than becoming a regex.
 *
 * Role change and Company change carry the same fields and render the same
 * sentence — "Robert Smith changed role from SDR to Senior SDR at WeRoad". The
 * export words both rows identically and separates them only by the coloured
 * label, so `kind` selects the label rather than the wording.
 */
export type Signal =
  | ({ kind: 'role_change' } & ContactSignal)
  | ({ kind: 'company_change' } & ContactSignal)
  | {
      id: string
      kind: 'website_view'
      read: boolean
      date: string
      account: Actor
      pages: number
      seconds: number
    }

export type SignalKind = Signal['kind']

export type TaskTone = 'overdue' | 'pendingManual' | 'pendingAuto' | 'completed'

export type TaskSummary = {
  tone: TaskTone
  count: number
  label: string
  /** Drawn with a trailing chevron. */
  actionable?: boolean
  /** The "1 error" badge on Pending Auto. */
  errors?: number
}

export type KpiTone = 'blue' | 'indigo' | 'purple' | 'amber' | 'pink' | 'green'

/** Names a glyph in `KpiTile`'s icon map — these are SVG components, not URLs. */
export type KpiIcon = 'contacts' | 'companies' | 'list' | 'meetings'

export type Kpi = {
  label: string
  value: number
  max: number
  tone: KpiTone
  /** Pipeline is the one row the design draws without a glyph. */
  icon?: KpiIcon
  /** Renders 50000 as "50K". Applied to both figures. */
  format?: (n: number) => string
  /** Sits on the value only, so the design's "€50K /100K" comes out right. */
  prefix?: string
  /** Present only on Contacts engaged, which carries the info tooltip. */
  hint?: string
  /** The fraction the export draws, where it disagrees with `value / max`. */
  fill?: number
}

export type OnboardingStep = {
  /** An imported PNG — these five glyphs are full-colour artwork, not line icons. */
  icon: string
  title: string
  minutes: number
}

export type Replier = {
  name: string
  src: string
}

export type Dashboard = {
  /** Greeted in the Welcome card. */
  userName: string
  /** Labels the performance card, e.g. "May". */
  month: string
  replies: {
    count: number
    repliers: Replier[]
  }
  /** Grouped, because the 1px rules in the row separate status groups. */
  taskGroups: TaskSummary[][]
  kpis: Kpi[]
  onboarding: OnboardingStep[]
}
