import CompaniesIcon from '@/assets/figma/kpi-companies.svg?react'
import ContactsIcon from '@/assets/figma/kpi-contacts.svg?react'
import ListIcon from '@/assets/figma/kpi-list.svg?react'
import MeetingsIcon from '@/assets/figma/kpi-meetings.svg?react'
import InfoIcon from '@/assets/figma/info.svg?react'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Tooltip } from '@/components/ui/Tooltip'
import { cn } from '@/lib/cn'
import type { Kpi, KpiTone } from '@/types'

/**
 * Per-tone colours. The icon is a lighter tint than the number beside it on
 * two of the six rows — sampled, not a slip: Activities draws its glyph in
 * #995aff over a #8846dc number, and Deals #f376d8 over #e769cb.
 */
const TONES: Record<KpiTone, { icon: string; value: string }> = {
  blue: { icon: 'text-accent-blue', value: 'text-accent-blue' },
  indigo: { icon: 'text-accent-indigo', value: 'text-accent-indigo' },
  purple: { icon: 'text-accent-purple-light', value: 'text-accent-purple' },
  amber: { icon: 'text-accent-amber-bar', value: 'text-accent-amber-bar' },
  pink: { icon: 'text-accent-pink-light', value: 'text-accent-pink' },
  green: { icon: 'text-accent-green', value: 'text-accent-green' },
}

/** Activities and Deals are the same exported glyph in two colours. */
const ICONS = {
  contacts: ContactsIcon,
  companies: CompaniesIcon,
  list: ListIcon,
  meetings: MeetingsIcon,
} as const

/**
 * One 184×71 cell of the performance grid: label, figure, meter.
 *
 * The inner rhythm is 8 / 16 / 8 / 24 / 4 / 3 / 8 top to bottom, which is why
 * the paddings are odd pixel values rather than scale steps — the tile is
 * 71px and the 1px border eats into it.
 */
export function KpiTile({ kpi }: { kpi: Kpi }) {
  const { label, value, max, tone, icon, format, prefix, hint, fill } = kpi
  const Icon = icon ? ICONS[icon] : null
  const show = format ?? ((n: number) => String(n))
  const { icon: iconColour, value: valueColour } = TONES[tone]

  return (
    <div className="flex h-[71px] flex-col rounded-callout border border-border px-2 pt-[7px] pb-[7px]">
      <div className="flex h-4 items-center justify-between">
        <span className="text-meta leading-4 font-medium text-ink-soft">
          {label}
        </span>
        {hint && (
          <Tooltip content={hint} side="bottom">
            <button
              type="button"
              aria-label={`What "${label}" counts`}
              className="grid size-4 shrink-0 place-items-center text-muted transition-colors hover:text-ink focus-visible:text-ink"
            >
              <InfoIcon aria-hidden className="size-4" />
            </button>
          </Tooltip>
        )}
      </div>

      {/* Figma reports a 1px gap, but its icon frame is wider than the 16px
          glyph it holds; 4px here reproduces the export's spacing. */}
      <div className="mt-2 flex h-6 items-center gap-1">
        {Icon && (
          <Icon aria-hidden className={cn('size-4 shrink-0', iconColour)} />
        )}
        <span className="text-figure font-medium">
          <span className={valueColour}>
            {prefix}
            {show(value)}
          </span>
          <span className="text-faint">/{show(max)}</span>
        </span>
      </div>

      <ProgressBar
        className="mt-1"
        value={value}
        max={max}
        tone={tone}
        label={label}
        fill={fill}
      />
    </div>
  )
}
