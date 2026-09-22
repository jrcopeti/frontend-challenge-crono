import { ChevronsLeft } from 'lucide-react'

import { CronoLogo } from '@/components/layout/CronoLogo'
import { NavItem } from '@/components/layout/NavItem'
import { NAV_ENTRIES } from '@/components/layout/navigation'
import { SidebarUser } from '@/components/layout/SidebarUser'
import { TrialCard } from '@/components/layout/TrialCard'
import { cn } from '@/lib/cn'

/**
 * Fixed 192px rail: 191px of surface plus a 1px right border.
 *
 * The offsets here are measured from the export rather than rounded to a
 * spacing scale — the sidebar is the most rhythm-sensitive part of the screen,
 * and a 4px drift compounds down nine nav rows. Figma gives this frame as a
 * space-between column, so the user footer pins to the bottom.
 */
export function Sidebar({
  collapsed,
  onToggle,
  activeLabel = 'Dashboard',
}: {
  collapsed: boolean
  onToggle: () => void
  activeLabel?: string
}) {
  return (
    <nav
      aria-label="Main"
      className={cn(
        'flex shrink-0 flex-col justify-between border-r border-border bg-card px-2 pt-[25px]',
        collapsed ? 'w-16' : 'w-48',
      )}
    >
      <div>
        <div className="flex h-6 items-center justify-between">
          {!collapsed && <CronoLogo className="ml-[9px] h-[23px] w-auto" />}
          <button
            type="button"
            onClick={onToggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!collapsed}
            className={cn(
              'grid h-6 w-6 shrink-0 place-items-center rounded-full bg-page text-muted transition-colors hover:text-ink-soft',
              collapsed && 'mx-auto rotate-180',
            )}
          >
            <ChevronsLeft size={16} strokeWidth={2.5} aria-hidden />
          </button>
        </div>

        {/* 28px puts the first row at y=76, as measured. */}
        <ul className="mt-7 flex flex-col gap-2">
          {NAV_ENTRIES.map((entry) => (
            <li key={entry.label}>
              <NavItem
                entry={entry}
                active={entry.label === activeLabel}
                collapsed={collapsed}
              />
            </li>
          ))}
        </ul>

        {!collapsed && (
          <div className="mt-3">
            <TrialCard daysLeft={2} />
          </div>
        )}
      </div>

      <SidebarUser
        name="William Robertson"
        jobTitle="Sales"
        collapsed={collapsed}
      />
    </nav>
  )
}
