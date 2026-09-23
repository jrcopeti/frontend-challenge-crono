import { ScrollArea } from 'radix-ui'

import { ActionButton } from '@/components/signals/ActionButton'
import { SignalRow } from '@/components/signals/SignalRow'
import { Card, CardTitle } from '@/components/ui/Card'
import { CountBadge } from '@/components/ui/CountBadge'
import { Skeleton } from '@/components/ui/Skeleton'
import type { Signal } from '@/types'

const SUBTITLE =
  'Never miss a single opportunity: check out your top signals from your 1st-degree LinkedIn connections.'

/**
 * The Signals card.
 *
 * The 16px top padding, the 24px header, the 24px subtitle and a 16px gap put
 * the first row at y=80, and the list runs to the card's bottom edge — 332px,
 * with no padding beneath it.
 *
 * Rows are separated the way the task tiles and the Onboarding list are: a
 * 16px gap, a 1px rule, another 16px gap, which is why the pitch is 73 rather
 * than 56.
 */
export function SignalsCard({
  signals,
  unreadCount,
  isPending,
  renderAction,
}: {
  signals: Signal[] | undefined
  unreadCount: number
  isPending: boolean
  renderAction?: (signal: Signal) => React.ReactNode
}) {
  return (
    <Card className="flex h-[412px] flex-col pt-[15px]">
      <div className="flex h-6 items-center gap-1.5 px-[15px]">
        <CardTitle>Signals</CardTitle>
        {isPending ? (
          <Skeleton className="h-6 w-7 rounded-xl" />
        ) : (
          <CountBadge
            count={unreadCount}
            label="unread signals"
            className="h-6 min-w-7"
          />
        )}
      </div>

      <p className="px-[15px] text-body leading-6 text-muted">{SUBTITLE}</p>

      {/* "always": the export draws the scrollbar at rest, not on hover. */}
      <ScrollArea.Root
        type="always"
        className="mt-4 min-h-0 flex-1 overflow-hidden"
      >
        <ScrollArea.Viewport className="h-full w-full">
          <ul className="flex flex-col gap-4 pr-[13px]">
            {isPending
              ? Array.from({ length: 5 }, (_, i) => (
                  <li
                    key={i}
                    className={
                      i > 0 ? 'border-t border-border pt-4' : undefined
                    }
                  >
                    <SignalRowSkeleton />
                  </li>
                ))
              : signals?.map((signal, i) => (
                  <li
                    key={signal.id}
                    className={
                      i > 0 ? 'border-t border-border pt-4' : undefined
                    }
                  >
                    <SignalRow
                      signal={signal}
                      action={
                        renderAction?.(signal) ?? (
                          <ActionButton
                            label={`Action for the signal about ${
                              signal.kind === 'website_view'
                                ? signal.account.name
                                : signal.person.name
                            }`}
                          />
                        )
                      }
                    />
                  </li>
                ))}
          </ul>
        </ScrollArea.Viewport>

        <ScrollArea.Scrollbar
          orientation="vertical"
          className="mr-[3px] flex w-2 touch-none select-none"
        >
          <ScrollArea.Thumb className="flex-1 rounded-full bg-border" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </Card>
  )
}

/** Sized to a real row so the list does not jump when the data lands. */
function SignalRowSkeleton() {
  return (
    <div className="flex h-10 items-center gap-4 pr-[6px] pl-[15px]">
      <Skeleton className="size-8 shrink-0 rounded-full" />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <Skeleton className="h-3.5 w-[380px]" />
        <Skeleton className="h-3 w-[120px]" />
      </div>
      <Skeleton className="h-3 w-[60px] shrink-0" />
      <Skeleton className="h-8 w-[90px] shrink-0 rounded-full" />
    </div>
  )
}
