import { CronoMark } from '@/components/layout/CronoMark'

/**
 * Signed-in user, pinned to the bottom of the sidebar.
 *
 * The name is held on one line: the export gives it exactly 126px, which the
 * browser renders a hair wider, so without `nowrap` it wraps and pushes the
 * whole block out of position.
 */
export function SidebarUser({
  name,
  jobTitle,
  collapsed = false,
}: {
  name: string
  jobTitle: string
  collapsed?: boolean
}) {
  return (
    <div className="flex items-center gap-[9px] overflow-hidden border-t border-border px-1 pt-[17px] pb-5">
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-avatar-disc">
        <CronoMark className="h-[19px] w-auto text-card" />
      </span>
      {!collapsed && (
        <span className="min-w-0">
          <span className="block text-body leading-5 font-medium whitespace-nowrap text-ink">
            {name}
          </span>
          <span className="block text-meta leading-4 text-muted">
            {jobTitle}
          </span>
        </span>
      )}
    </div>
  )
}
