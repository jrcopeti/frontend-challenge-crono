import { Card } from '@/components/ui/Card'

/**
 * Greeting panel. Inset 24px, wider than the other cards' 16px.
 *
 * The right inset is 20px rather than 24: the paragraph's first line is 346.2px
 * and a symmetric 24px inset leaves exactly 346.0px, so it wrapped a word early.
 * Figma lays the same line out in the same box without wrapping — the disagreement
 * is two tenths of a pixel of text measurement, not a spacing difference.
 */
export function WelcomeCard({ name }: { name: string }) {
  return (
    <Card className="h-full pt-[30px] pr-5 pl-6">
      <h1 className="text-display font-bold text-ink">Welcome {name},</h1>
      <p className="mt-2 text-body text-muted">
        Here&rsquo;s your performance overview where you can track your daily
        and monthly KPIs
      </p>
    </Card>
  )
}
