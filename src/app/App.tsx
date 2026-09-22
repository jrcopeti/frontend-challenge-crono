import { AppShell } from '@/components/layout/AppShell'
import { Card } from '@/components/ui/Card'
import { TooltipProvider } from '@/components/ui/Tooltip'
import { cn } from '@/lib/cn'

/** Placeholder for a card that a later phase fills in. */
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
            <Placeholder title="Welcome" className="h-[142px]" />
            <Placeholder title="Replies" className="h-[142px]" />
          </div>
          <Placeholder title="Today's tasks" className="h-[148px]" />
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
