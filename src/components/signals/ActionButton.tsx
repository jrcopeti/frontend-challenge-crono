import { cn } from '@/lib/cn'

/**
 * The teal pill on each signal row — 90×32 at radius 34, which past half the
 * height is simply a full round.
 */
export function ActionButton({
  label,
  className,
  ...props
}: React.ComponentProps<'button'> & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        'inline-flex h-8 w-[90px] shrink-0 items-center justify-center gap-1 rounded-full bg-brand text-body leading-[18px] font-medium text-card transition-colors hover:bg-brand-strong',
        className,
      )}
      {...props}
    >
      Action
    </button>
  )
}
