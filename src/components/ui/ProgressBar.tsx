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
  // Sampled, not a slip: the Pipeline bar's track really is #e9f8f8
  // (brand-soft), not accent-green-soft (#e8f5d9) — that lighter green is
  // the Completed task tile's background.
  green: { fill: 'bg-accent-green', track: 'bg-brand-soft' },
  blue: { fill: 'bg-accent-blue', track: 'bg-accent-blue-soft' },
}

export function ProgressBar({
  value,
  max,
  tone,
  label,
  fill,
  className,
}: {
  value: number
  max: number
  tone: ProgressTone
  /** Names the metric for assistive tech, e.g. "Activities". */
  label: string
  /**
   * The fraction the export draws, 0–1, when it disagrees with `value / max`.
   *
   * The design's KPI bars do not derive from their own figures — five of the
   * six are drawn at exactly 88px of 166 whatever the numbers beside them say.
   * Fidelity to the design is the brief, so the bar renders this when given.
   * `aria-valuenow` still reports the real figure, so assistive tech is told
   * what the text says rather than what the mockup drew.
   */
  fill?: number
  className?: string
}) {
  const clamp = (n: number) => Math.min(100, Math.max(0, n))
  const percent =
    fill !== undefined
      ? clamp(fill * 100)
      : max > 0
        ? clamp((value / max) * 100)
        : 0
  const { fill: fillColour, track } = TONES[tone]

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
        className={cn('h-full rounded-full', fillColour)}
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
