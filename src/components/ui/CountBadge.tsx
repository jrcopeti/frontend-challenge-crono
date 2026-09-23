import { cn } from '@/lib/cn'

/**
 * The amber count pill. `aria-label` is required: "12" alone tells a screen
 * reader nothing.
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
