import { cn } from '@/lib/cn'

/** Soft teal status pill, e.g. "In sequence" on a signal row. */
export function Pill({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'inline-flex h-5 items-center rounded-full bg-brand-soft px-2 text-meta font-medium text-brand-strong',
        className,
      )}
      {...props}
    />
  )
}
