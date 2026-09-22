import { Info } from 'lucide-react'

import { Avatar, AvatarStack } from '@/components/ui/Avatar'
import { Card, CardTitle } from '@/components/ui/Card'
import { CountBadge } from '@/components/ui/CountBadge'
import { IconTile } from '@/components/ui/IconTile'
import { Pill } from '@/components/ui/Pill'
import { ProgressBar, type ProgressTone } from '@/components/ui/ProgressBar'
import { Skeleton } from '@/components/ui/Skeleton'
import { Tooltip } from '@/components/ui/Tooltip'

/**
 * Scratch page for eyeballing the tokens and primitives against the design
 * export. PR 3 replaces this with the real dashboard shell.
 */

const SURFACES = [
  ['page', 'bg-page'],
  ['card', 'bg-card'],
  ['border', 'bg-border'],
  ['tooltip', 'bg-tooltip'],
  ['brand', 'bg-brand'],
  ['brand-strong', 'bg-brand-strong'],
  ['brand-soft', 'bg-brand-soft'],
  ['accent-red', 'bg-accent-red'],
  ['accent-red-soft', 'bg-accent-red-soft'],
  ['accent-amber', 'bg-accent-amber'],
  ['accent-amber-soft', 'bg-accent-amber-soft'],
  ['accent-blue', 'bg-accent-blue'],
  ['accent-blue-soft', 'bg-accent-blue-soft'],
  ['accent-indigo', 'bg-accent-indigo'],
  ['accent-green', 'bg-accent-green'],
  ['accent-green-soft', 'bg-accent-green-soft'],
  ['accent-purple', 'bg-accent-purple'],
  ['accent-purple-soft', 'bg-accent-purple-soft'],
  ['accent-pink', 'bg-accent-pink'],
  ['accent-pink-soft', 'bg-accent-pink-soft'],
] as const

const BARS: {
  label: string
  tone: ProgressTone
  value: number
  max: number
}[] = [
  { label: 'Companies engaged', tone: 'indigo', value: 0, max: 500 },
  { label: 'Activities', tone: 'purple', value: 1000, max: 2000 },
  { label: 'Meetings', tone: 'amber', value: 20, max: 30 },
  { label: 'Deals', tone: 'pink', value: 100, max: 200 },
  { label: 'Pipeline', tone: 'green', value: 50, max: 100 },
  { label: 'Contacts engaged', tone: 'blue', value: 0, max: 500 },
]

export function DesignSystemPreview() {
  return (
    <main className="mx-auto flex max-w-[800px] flex-col gap-2 p-4">
      <Card className="p-4">
        <CardTitle>Type scale</CardTitle>
        <div className="mt-3 space-y-2">
          <p className="text-display font-semibold">Welcome Alex,</p>
          <p className="text-stat font-semibold text-ink-soft">24</p>
          <p className="text-title font-semibold">Today&rsquo;s tasks</p>
          <p className="text-body text-muted">
            Never miss a single opportunity: check out your top signals from
            your 1st-degree LinkedIn connections.
          </p>
          <p className="text-meta text-muted">Apr 2, 2025</p>
        </div>
      </Card>

      <Card className="p-4">
        <CardTitle>Colour tokens</CardTitle>
        <ul className="mt-3 grid grid-cols-4 gap-2">
          {SURFACES.map(([name, bg]) => (
            <li key={name} className="text-meta text-muted">
              <span
                className={`block h-10 rounded-md border border-border ${bg}`}
              />
              <span className="mt-1 block truncate">{name}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-4">
        <CardTitle>Primitives</CardTitle>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <CountBadge count={12} label="unread signals" />
          <CountBadge count={24} label="unread replies" />
          <Pill>In sequence</Pill>
          <Avatar name="Robert Smith" />
          <AvatarStack
            people={[
              { name: 'Reddit' },
              { name: 'Acme Co' },
              { name: "McDonald's" },
              { name: 'Monday' },
            ]}
          />
          <IconTile className="bg-brand-soft text-brand-strong">
            <Info size={18} />
          </IconTile>
          <Tooltip content="Contacts who have at least one logged activity within the current month">
            <button
              type="button"
              aria-label="About contacts engaged"
              className="text-muted hover:text-ink-soft"
            >
              <Info size={16} />
            </button>
          </Tooltip>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          {BARS.map((bar) => (
            <div key={bar.label}>
              <p className="mb-2 text-meta text-ink-soft">{bar.label}</p>
              <ProgressBar {...bar} />
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-2">
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-4 w-40" />
        </div>
      </Card>
    </main>
  )
}
