import { ChevronDown } from 'lucide-react'

import type { NavEntry } from '@/components/layout/navigation'
import { CountBadge } from '@/components/ui/CountBadge'
import { cn } from '@/lib/cn'

/**
 * A 40px sidebar row. The active item is marked by a 3px brand bar flush to the
 * sidebar's left edge — it sits outside the row's padding, hence the negative
 * offset rather than a border on the row itself.
 */
export function NavItem({
  entry,
  active = false,
  collapsed = false,
}: {
  entry: NavEntry
  active?: boolean
  collapsed?: boolean
}) {
  const { label, icon: Icon, badge, expandable } = entry

  return (
    <button
      type="button"
      aria-current={active ? 'page' : undefined}
      title={collapsed ? label : undefined}
      className={cn(
        'relative flex h-10 w-full items-center rounded-lg text-left',
        collapsed ? 'justify-center px-0' : 'pr-2 pl-2.5',
        'text-body font-medium transition-colors',
        active ? 'text-brand-strong' : 'text-muted hover:text-ink-soft',
      )}
    >
      {active && (
        <span
          aria-hidden
          className="absolute top-1/2 -left-2 h-[30px] w-[3px] -translate-y-1/2 rounded-r-full bg-brand-strong"
        />
      )}

      <Icon size={20} strokeWidth={1.75} className="shrink-0" />

      {!collapsed && (
        <>
          <span className="ml-3 truncate">{label}</span>
          {badge !== undefined && (
            <CountBadge
              count={badge}
              label={`unread ${label.toLowerCase()} items`}
              className="ml-auto h-5"
            />
          )}
          {expandable && (
            <ChevronDown
              size={16}
              strokeWidth={2}
              aria-hidden
              className="ml-auto shrink-0"
            />
          )}
        </>
      )}
    </button>
  )
}
