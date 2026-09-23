import { DropdownMenu } from 'radix-ui'

import CompleteIcon from '@/assets/figma/signal-complete.svg?react'
import TrashIcon from '@/assets/figma/signal-trash.svg?react'
import { ActionButton } from '@/components/signals/ActionButton'
import { cn } from '@/lib/cn'

/**
 * The Action menu: 216×96 opening below the button and aligned to its right
 * edge, as the second frame shows.
 *
 * The padding is 7px, not the 8 the item spec implies: the export's 216×96
 * counts the 1px border, so 1 + 7 + 40 + 40 + 7 + 1 is what leaves each item
 * exactly 200×40. The corner is 16px — its border arc matches the cards', not
 * the 12px tiles'.
 *
 * Radix supplies what a hand-rolled menu gets wrong — Escape and outside-click
 * to close, arrow-key navigation, only one menu open at a time, and focus
 * returning to the button afterwards.
 */
export function SignalActionMenu({
  label,
  onComplete,
  onDelete,
}: {
  /** Names the row this menu belongs to, for assistive tech. */
  label: string
  onComplete: () => void
  onDelete: () => void
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <ActionButton label={label} />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="bottom"
          align="end"
          sideOffset={9}
          collisionPadding={8}
          className="z-50 w-[216px] rounded-card border border-border bg-card p-[7px] shadow-menu"
        >
          <Item icon={CompleteIcon} onSelect={onComplete} tone="brand">
            Complete
          </Item>
          <Item icon={TrashIcon} onSelect={onDelete} tone="ink">
            Delete
          </Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

/** A 200×40 row: label left, 24px glyph right, both in the item's own colour. */
function Item({
  icon: Icon,
  tone,
  onSelect,
  children,
}: {
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  tone: 'brand' | 'ink'
  onSelect: () => void
  children: React.ReactNode
}) {
  return (
    <DropdownMenu.Item
      onSelect={onSelect}
      className={cn(
        'flex h-10 cursor-pointer items-center justify-between rounded-callout px-2 text-meta leading-4 font-medium outline-none select-none',
        // The export draws the hovered item on brand-soft; Radix marks both
        // pointer hover and keyboard focus as "highlighted".
        'data-highlighted:bg-brand-soft',
        tone === 'brand' ? 'text-brand-strong' : 'text-ink',
      )}
    >
      {children}
      {/* A 24px box, but the glyph keeps its own size — the export draws the
          check at 20×20 and the trash at 14×16, and forcing both to 24 would
          stretch the trash, which is not square. */}
      <span className="grid size-6 shrink-0 place-items-center">
        <Icon aria-hidden />
      </span>
    </DropdownMenu.Item>
  )
}
