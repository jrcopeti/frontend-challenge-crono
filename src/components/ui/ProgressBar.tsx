import { cn } from '@/lib/cn'

/**
 * The 3px meter under each KPI. Tailwind needs literal class names, so the
 * tones are a lookup rather than an interpolated string.
 */
export type ProgressTone =
  'indigo' | 'purple' | 'amber' | 'pink' | 'green' | 'blue'

const TONES: Record<ProgressTone, { fill: string; track: string }> = {
  indigo: { fill: 'bg-accent-indigo', track: 'bg-accent-indigo-soft' },
  purple: { fill: 'bg-accent-purple', track: 'bg-accent-purple-soft' },
  amber: { fill: 'bg-accent-amber-bar', track: 'bg-accent-amber-soft' },
  pink: { fill: 'bg-accent-pink', track: 'bg-accent-pink-soft' },
  green: { fill: 'bg-accent-green', track: 'bg-brand-soft' },
  blue: { fill: 'bg-accent-blue', track: 'bg-accent-blue-soft' },
}

export function ProgressBar({
  value,
  max,
  tone,
  label,
  className,
}: {
  value: number
  max: number
  tone: ProgressTone
  /** Names the metric for assistive tech, e.g. "Activities". */
  label: string
  className?: string
}) {
  const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0
  const { fill, track } = TONES[tone]

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn(
        'h-[3px] w-full overflow-hidden rounded-full',
        track,
        className,
      )}
    >
      <div
        className={cn('h-full rounded-full', fill)}
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
