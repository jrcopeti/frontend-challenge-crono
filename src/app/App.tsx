import onbAddContact from '@/assets/figma/onboarding-add-contact.png'
import onbAddToSequence from '@/assets/figma/onboarding-add-to-sequence.png'
import onbCreateSequence from '@/assets/figma/onboarding-create-sequence.png'
import onbIntegrations from '@/assets/figma/onboarding-integrations.png'
import onbRunTask from '@/assets/figma/onboarding-run-task.png'
import brandAmazon from '@/assets/figma/brand-amazon.png'
import brandMcdonalds from '@/assets/figma/brand-mcdonalds.png'
import brandMedium from '@/assets/figma/brand-medium.png'
import brandReddit from '@/assets/figma/brand-reddit.png'
import { type Kpi } from '@/components/dashboard/KpiTile'
import {
  OnboardingCard,
  type OnboardingStep,
} from '@/components/dashboard/OnboardingCard'
import { PerformanceCard } from '@/components/dashboard/PerformanceCard'
import { RepliesCard } from '@/components/dashboard/RepliesCard'
import {
  TodaysTasks,
  type TaskSummary,
} from '@/components/dashboard/TodaysTasks'
import { WelcomeCard } from '@/components/dashboard/WelcomeCard'
import { AppShell } from '@/components/layout/AppShell'
import { Card } from '@/components/ui/Card'
import { TooltipProvider } from '@/components/ui/Tooltip'
import { cn } from '@/lib/cn'

/**
 * Screen content is still literal here. Phase 6 introduces the fake async
 * service and these values move into the seed JSON behind it.
 */
const REPLIERS = [
  { name: 'Reddit', src: brandReddit },
  { name: 'Amazon', src: brandAmazon },
  { name: "McDonald's", src: brandMcdonalds },
  { name: 'Medium', src: brandMedium },
]

const TASK_GROUPS: TaskSummary[][] = [
  [{ tone: 'overdue', count: 3, label: 'Overdue', actionable: true }],
  [
    {
      tone: 'pendingManual',
      count: 10,
      label: 'Pending Manual',
      actionable: true,
    },
    {
      tone: 'pendingAuto',
      count: 20,
      label: 'Pending Auto',
      errors: 1,
      actionable: true,
    },
  ],
  [{ tone: 'completed', count: 8, label: 'Completed' }],
]

const thousands = (n: number) => (n >= 1000 ? `${n / 1000}K` : String(n))

/**
 * The export draws five of the six KPI meters at exactly 88px of 166 — one bar
 * copied across the grid — regardless of the figures printed beside them.
 * Contacts engaged is the only one drawn empty. Matching the design is the
 * brief, so these fills are carried as data rather than derived.
 */
const DESIGN_FILL = 88 / 166

const KPIS: Kpi[] = [
  {
    label: 'Contacts engaged',
    value: 0,
    max: 500,
    tone: 'blue',
    icon: 'contacts',
    fill: 0,
    hint: 'Contacts who have at least one logged activity within the current month',
  },
  {
    label: 'Companies engaged',
    value: 0,
    max: 500,
    tone: 'indigo',
    icon: 'companies',
    fill: DESIGN_FILL,
  },
  {
    label: 'Activities',
    value: 1000,
    max: 2000,
    tone: 'purple',
    icon: 'list',
    fill: DESIGN_FILL,
  },
  {
    label: 'Meetings',
    value: 20,
    max: 30,
    tone: 'amber',
    icon: 'meetings',
    fill: DESIGN_FILL,
  },
  {
    label: 'Deals',
    value: 100,
    max: 200,
    tone: 'pink',
    icon: 'list',
    fill: DESIGN_FILL,
  },
  {
    label: 'Pipeline',
    value: 50_000,
    max: 100_000,
    tone: 'green',
    format: thousands,
    prefix: '\u20ac',
    fill: DESIGN_FILL,
  },
]

const ONBOARDING: OnboardingStep[] = [
  { icon: onbIntegrations, title: 'Integrations Setup', minutes: 5 },
  { icon: onbAddContact, title: 'Add new Contact', minutes: 5 },
  { icon: onbCreateSequence, title: 'Create your first sequence', minutes: 10 },
  { icon: onbAddToSequence, title: 'Add contacts to sequence', minutes: 5 },
  { icon: onbRunTask, title: 'Run your first task', minutes: 10 },
]

/** Placeholder for a card a later phase fills in. */
function Placeholder({
  title,
  className,
}: {
  title: string
  className?: string
}) {
  return (
    <Card className={cn('grid place-items-center text-muted', className)}>
      {title}
    </Card>
  )
}

export default function App() {
  return (
    <TooltipProvider>
      <AppShell>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <WelcomeCard name="Alex" />
            <RepliesCard count={24} repliers={REPLIERS} />
          </div>
          <TodaysTasks groups={TASK_GROUPS} />
          <Placeholder title="Signals" className="h-[412px]" />
        </div>

        <div className="flex flex-col gap-2">
          <PerformanceCard month="May" kpis={KPIS} />
          <OnboardingCard steps={ONBOARDING} />
        </div>
      </AppShell>
    </TooltipProvider>
  )
}
