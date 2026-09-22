import { cn } from '@/lib/cn'

/** Placeholder block sized to the content it stands in for. */
export function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-border', className)}
      {...props}
    />
  )
}
