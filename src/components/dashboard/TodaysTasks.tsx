import { Fragment } from 'react'

import { TaskTile, type TaskTone } from '@/components/dashboard/TaskTile'
import { Card, CardTitle } from '@/components/ui/Card'

export type TaskSummary = {
  tone: TaskTone
  count: number
  label: string
  errors?: number
  actionable?: boolean
}

/**
 * The four task tiles.
 *
 * They are grouped rather than evenly spaced: the export draws a 1px rule in
 * the gaps either side of the two "Pending" tiles and none between them, so the
 * row reads as Overdue | Pending | Completed. That is also why the gaps measure
 * 16 / 8 / 16 — the wider ones carry the rule — which looked like a slip until
 * the rules were accounted for.
 */
export function TodaysTasks({ groups }: { groups: TaskSummary[][] }) {
  return (
    <Card className="p-4">
      <CardTitle>Today&rsquo;s tasks</CardTitle>
      <div className="mt-1.5 flex">
        {groups.map((group, groupIndex) => (
          <Fragment key={group.map((t) => t.label).join()}>
            {groupIndex > 0 && (
              <span
                aria-hidden
                className="grid w-4 shrink-0 place-items-center"
              >
                <span className="h-[86px] w-px bg-border" />
              </span>
            )}
            {group.map((task, taskIndex) => (
              <Fragment key={task.label}>
                {taskIndex > 0 && <span aria-hidden className="w-2 shrink-0" />}
                <TaskTile {...task} />
              </Fragment>
            ))}
          </Fragment>
        ))}
      </div>
    </Card>
  )
}
