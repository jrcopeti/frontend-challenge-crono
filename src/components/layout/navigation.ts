import type { FunctionComponent, SVGProps } from 'react'

import AnalyticsIcon from '@/assets/figma/nav-analytics.svg?react'
import DashboardIcon from '@/assets/figma/nav-dashboard.svg?react'
import DealsIcon from '@/assets/figma/nav-deals.svg?react'
import FindNewIcon from '@/assets/figma/nav-find-new.svg?react'
import InboxIcon from '@/assets/figma/nav-inbox.svg?react'
import SequencesIcon from '@/assets/figma/nav-sequences.svg?react'
import TasksIcon from '@/assets/figma/nav-tasks.svg?react'
import TemplatesIcon from '@/assets/figma/nav-templates.svg?react'

export type NavIcon = FunctionComponent<SVGProps<SVGSVGElement>>

export type NavEntry = {
  label: string
  icon: NavIcon
  /** Amber count pill, as on Inbox. */
  badge?: number
  /** Renders a disclosure chevron, as on Analytics. */
  expandable?: boolean
}

/**
 * Icons are the designer's own exports, inlined by vite-plugin-svgr so they can
 * take `currentColor` — the artwork ships with the inactive grey baked in, and
 * the active row needs the same shapes in brand teal.
 *
 * Dashboard and Lists deliberately share one glyph: the export uses the same
 * panel mark for both and distinguishes them only by colour.
 */
export const NAV_ENTRIES: NavEntry[] = [
  { label: 'Dashboard', icon: DashboardIcon },
  { label: 'Find New', icon: FindNewIcon },
  { label: 'Lists', icon: DashboardIcon },
  { label: 'Templates', icon: TemplatesIcon },
  { label: 'Sequences', icon: SequencesIcon },
  { label: 'Tasks', icon: TasksIcon },
  { label: 'Inbox', icon: InboxIcon, badge: 24 },
  { label: 'Deals', icon: DealsIcon },
  { label: 'Analytics', icon: AnalyticsIcon, expandable: true },
]
