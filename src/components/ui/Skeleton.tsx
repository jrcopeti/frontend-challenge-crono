import { cn } from '@/lib/cn'

/**
 * Placeholder block sized to the content it stands in for.
 *
 * `rounded-md` rather than a token on purpose: a loading shape has no
 * counterpart in the design, so there is no sampled value to name.
 */
export function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-border', className)}
      {...props}
    />
  )
}
