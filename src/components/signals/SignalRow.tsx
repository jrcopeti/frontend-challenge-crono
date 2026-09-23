import { SignalText, SignalTypeLabel } from '@/components/signals/SignalText'
import { Pill } from '@/components/ui/Pill'
import { cn } from '@/lib/cn'
import type { Signal } from '@/types'

/** "2025-04-02" as the export writes it: "Apr 2, 2025". */
const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

const subject = (signal: Signal) =>
  signal.kind === 'website_view' ? signal.account : signal.person

/**
 * One 40px row: avatar, the typed sentence over its label, the date, and the
 * Action button.
 *
 * The two text lines are 22 and 16 tall, so they fill 38 of the row's 40 —
 * which is why they sit in a tight column rather than a gapped one.
 */
export function SignalRow({
  signal,
  action,
}: {
  signal: Signal
  action?: React.ReactNode
}) {
  const who = subject(signal)

  return (
    <div className="flex h-10 items-center gap-4 pr-[6px] pl-[15px]">
      <span className="relative flex size-8 shrink-0">
        {/*
          A plain image, not the circular Avatar: these marks carry their own
          circle, and the unread one carries the dot too, which a round clip
          would cut off. The unread file's canvas is 2px wider on each side to
          hold that dot, so it is drawn at 34px offset by -2 — which lands both
          the dot and the circle exactly where the export draws them.
        */}
        <img
          src={signal.read ? who.avatar : who.avatarUnread}
          alt=""
          className={cn(
            'size-8',
            !signal.read &&
              'absolute -top-0.5 -left-0.5 size-[34px] max-w-none',
          )}
        />
        {!signal.read && <span className="sr-only">Unread</span>}
      </span>

      <span className="flex min-w-0 flex-col">
        <span className="truncate text-body leading-[22px] font-medium text-ink">
          <SignalText signal={signal} />
        </span>
        <span className="flex items-center gap-1">
          <SignalTypeLabel kind={signal.kind} />
          {'inSequence' in signal && signal.inSequence && (
            // 10px: the designer gave the chip's box but not its type, and
            // the export's text ink measures 60px wide, not the 72 that 12px
            // would draw.
            <Pill className="h-4 px-1 text-[10px]">In sequence</Pill>
          )}
        </span>
      </span>

      <time
        dateTime={signal.date}
        className="ml-auto shrink-0 text-micro font-medium text-muted"
      >
        {formatDate(signal.date)}
      </time>

      {action}
    </div>
  )
}
