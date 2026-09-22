import { cn } from '@/lib/cn'

/**
 * The amber count pill — the unread signals total and the sidebar's Inbox count.
 * `aria-label` is required: "12" alone tells a screen reader nothing.
 *
 * The white-on-amber text is sampled, not assumed: the Signals badge, the Inbox
 * badge and the "Upgrade plan" button all contain white glyphs and no dark ink
 * in the export. It is a deliberate fidelity call — white on #f9bb06 is roughly
 * 1.9:1, under WCAG AA — and is noted as a known deviation in the README.
 */
export function CountBadge({
  count,
  label,
  className,
}: {
  count: number
  label: string
  className?: string
}) {
  return (
    <span
      aria-label={`${count} ${label}`}
      className={cn(
        'inline-flex h-[22px] min-w-[26px] items-center justify-center rounded-full bg-accent-amber px-2 text-meta font-semibold text-card',
        className,
      )}
    >
      {count}
    </span>
  )
}
