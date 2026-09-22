import { Lock } from 'lucide-react'

/**
 * "Trial ends in 2 days" panel above the sidebar footer. Measured at 64px tall
 * with an 8px inset and a 116x24 button.
 *
 * The export shows a yellow swoosh graphic behind the text; that asset has not
 * been supplied, so the panel renders without it rather than with an invented
 * stand-in (see src/assets/figma/README.md).
 */
export function TrialCard({ daysLeft }: { daysLeft: number }) {
  return (
    <div className="h-16 rounded-tile bg-accent-amber-soft px-2 pt-1.5">
      <p className="text-body font-semibold text-ink">
        Trial ends in {daysLeft} {daysLeft === 1 ? 'day' : 'days'}
      </p>
      <button
        type="button"
        className="mt-1.5 inline-flex h-6 items-center gap-1.5 rounded-md bg-accent-amber px-2 text-meta font-medium text-card"
      >
        Upgrade plan
        <Lock size={12} strokeWidth={2.5} aria-hidden />
      </button>
    </div>
  )
}
