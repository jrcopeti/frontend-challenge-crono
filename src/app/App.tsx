import brandAmazon from '@/assets/figma/brand-amazon.png'
import brandMcdonalds from '@/assets/figma/brand-mcdonalds.png'
import brandMedium from '@/assets/figma/brand-medium.png'
import brandReddit from '@/assets/figma/brand-reddit.png'
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
          <Placeholder title="May's performance" className="h-[298px]" />
          <Placeholder title="Onboarding" className="h-[412px]" />
        </div>
      </AppShell>
    </TooltipProvider>
  )
}
