import { Tooltip as RadixTooltip } from 'radix-ui'

import { cn } from '@/lib/cn'

/** Wrap the app once so tooltips share timing. */
export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return (
    <RadixTooltip.Provider delayDuration={150}>
      {children}
    </RadixTooltip.Provider>
  )
}

/**
 * Dark tooltip, as on the "Contacts engaged" info icon.
 *
 * Radix handles the hover/focus timing and Escape, and renders the content in a
 * portal so it is never clipped by a card's overflow.
 */
export function Tooltip({
  content,
  children,
  side = 'right',
  className,
}: {
  content: React.ReactNode
  children: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  className?: string
}) {
  return (
    <RadixTooltip.Root>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          side={side}
          sideOffset={8}
          collisionPadding={8}
          className={cn(
            'z-50 max-w-[246px] rounded-chip bg-tooltip px-3 py-2 text-center text-meta leading-4 font-medium text-card',
            className,
          )}
        >
          {content}
          {/* The export draws an 8×3 caret on the tooltip's leading edge. */}
          <RadixTooltip.Arrow width={8} height={3} className="fill-tooltip" />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  )
}
