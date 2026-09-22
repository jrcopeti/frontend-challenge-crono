import {
  ChartColumn,
  ChartNoAxesCombined,
  Database,
  FilePlus2,
  ListChecks,
  Mailbox,
  PanelsTopLeft,
  Search,
  Table2,
  type LucideIcon,
} from 'lucide-react'

export type NavEntry = {
  label: string
  icon: LucideIcon
  /** Amber count pill, as on Inbox. */
  badge?: number
  /** Renders a disclosure chevron, as on Analytics. */
  expandable?: boolean
}

/**
 * The design's nav glyphs are not from a published icon set we could identify,
 * so these are the closest Lucide equivalents — substituting was agreed with
 * the designer rather than assumed. Each was picked by enlarging the export and
 * matching the actual shape: Inbox is a flagged mailbox rather than a tray, and
 * Deals is a stack of discs rather than sheets.
 *
 * Recorded in the README's "Known deviations".
 */
export const NAV_ENTRIES: NavEntry[] = [
  { label: 'Dashboard', icon: PanelsTopLeft },
  { label: 'Find New', icon: Search },
  { label: 'Lists', icon: Table2 },
  { label: 'Templates', icon: FilePlus2 },
  { label: 'Sequences', icon: ChartNoAxesCombined },
  { label: 'Tasks', icon: ListChecks },
  { label: 'Inbox', icon: Mailbox, badge: 24 },
  { label: 'Deals', icon: Database },
  { label: 'Analytics', icon: ChartColumn, expandable: true },
]
