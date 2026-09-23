/** Domain types for the dashboard. The seed JSON in `src/mocks` matches these. */

/**
 * Avatars are bundled assets, so the seed data names one rather than carrying a
 * URL — `src/lib/api/avatars.ts` resolves the name to the imported file.
 */
export type AvatarId = 'amazon'

/** Whoever a signal is about: a contact on some, a company on others. */
export type Actor = {
  name: string
  avatar: AvatarId
}

/**
 * A signal, discriminated on `kind`.
 *
 * Each row's sentence is rendered per-variant from these fields. Nothing in the
 * view parses or interpolates a pre-built string, so the bold name and the
 * highlighted "2 pages" stay typed rather than becoming a regex.
 */
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

export type Signal =
  /**
   * Role change and Company change carry the same fields and render the same
   * sentence — "Robert Smith changed role from SDR to Senior SDR at WeRoad".
   * The export words both rows identically and distinguishes them only by the
   * coloured label, so `kind` selects the label rather than the wording.
   */
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

export type KpiIcon = 'contacts' | 'companies' | 'list' | 'meetings'

export type KpiUnit = 'count' | 'currency'

export type KpiRecord = {
  label: string
  value: number
  max: number
  tone: KpiTone
  /** Pipeline is the one row the design draws without a glyph. */
  icon?: KpiIcon
  unit: KpiUnit
  /**
   * How many pixels of the 166px meter the export fills, which is not
   * `value / max` — see `src/lib/api/dashboard.ts`.
   */
  fillPx: number
  /** Present only on Contacts engaged, which carries the info tooltip. */
  hint?: string
}

export type OnboardingIcon =
  | 'integrations'
  | 'add-contact'
  | 'create-sequence'
  | 'add-to-sequence'
  | 'run-task'

export type OnboardingRecord = {
  icon: OnboardingIcon
  title: string
  minutes: number
}

export type BrandId = 'reddit' | 'amazon' | 'mcdonalds' | 'medium'

export type Dashboard = {
  /** Greeted in the Welcome card. */
  userName: string
  /** Labels the performance card, e.g. "May". */
  month: string
  replies: {
    count: number
    repliers: { name: string; brand: BrandId }[]
  }
  /** Grouped, because the 1px rules in the row separate status groups. */
  taskGroups: TaskSummary[][]
  kpis: KpiRecord[]
  onboarding: OnboardingRecord[]
}
