import type { Signal } from '@/types'

/**
 * A signal's sentence, rendered per variant from typed fields.
 *
 * Nothing here parses or interpolates a pre-built string, so the bold subject
 * and the highlighted "2 pages" are spans the type system knows about rather
 * than the output of a regex.
 *
 * Role change and Company change read the same — the export words both rows
 * identically and tells them apart only by the coloured label below.
 */
export function SignalText({ signal }: { signal: Signal }) {
  if (signal.kind === 'website_view') {
    return (
      <>
        <b className="font-semibold">{signal.account.name}</b> viewed{' '}
        {/* Teal, but not bold — only the subject carries weight. */}
        <span className="text-brand-strong">{signal.pages} pages</span> of your
        website for {signal.seconds} sec
      </>
    )
  }

  return (
    <>
      <b className="font-semibold">{signal.person.name}</b> changed role from{' '}
      {signal.fromRole} to {signal.toRole} at {signal.company}
    </>
  )
}

/** The coloured label under the sentence. */
const LABELS: Record<Signal['kind'], { text: string; colour: string }> = {
  role_change: { text: 'Role change', colour: 'text-accent-purple' },
  company_change: { text: 'Company change', colour: 'text-accent-blue' },
  website_view: { text: 'Website view', colour: 'text-accent-pink' },
}

export function SignalTypeLabel({ kind }: { kind: Signal['kind'] }) {
  const { text, colour } = LABELS[kind]
  return (
    <span className={`text-meta leading-4 font-medium ${colour}`}>{text}</span>
  )
}
