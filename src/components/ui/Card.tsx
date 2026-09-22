import { cn } from '@/lib/cn'

/** The white panel every dashboard section sits in: 1px border, 12px radius, no shadow. */
export function Card({ className, ...props }: React.ComponentProps<'section'>) {
  return (
    <section
      className={cn('rounded-card border border-border bg-card', className)}
      {...props}
    />
  )
}

/** Section heading inside a card. */
export function CardTitle({
  className,
  children,
  ...props
}: React.ComponentProps<'h2'>) {
  return (
    <h2
      className={cn('text-title font-semibold text-ink', className)}
      {...props}
    >
      {children}
    </h2>
  )
}
