import { cn } from '@/lib/cn'

/** Rounded square that holds an icon — the Onboarding rows and the Replies glyph. */
export function IconTile({
  className,
  size = 34,
  ...props
}: React.ComponentProps<'span'> & { size?: number }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-tile',
        className,
      )}
      style={{ width: size, height: size }}
      {...props}
    />
  )
}
