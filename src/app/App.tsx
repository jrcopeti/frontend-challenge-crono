import { Providers } from '@/app/Providers'
import { OnboardingCard } from '@/components/dashboard/OnboardingCard'
import { PerformanceCard } from '@/components/dashboard/PerformanceCard'
import { RepliesCard } from '@/components/dashboard/RepliesCard'
import { TodaysTasks } from '@/components/dashboard/TodaysTasks'
import { WelcomeCard } from '@/components/dashboard/WelcomeCard'
import { AppShell } from '@/components/layout/AppShell'
import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { useDashboard } from '@/features/useDashboard'
import { countUnread, useSignals } from '@/features/useSignals'
import type { Dashboard } from '@/types'

function DashboardColumns({ data }: { data: Dashboard }) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <WelcomeCard name={data.userName} />
          <RepliesCard
            count={data.replies.count}
            repliers={data.replies.repliers}
          />
        </div>
        <TodaysTasks groups={data.taskGroups} />
        <SignalsPanel />
      </div>

      <div className="flex flex-col gap-2">
        <PerformanceCard month={data.month} kpis={data.kpis} />
        <OnboardingCard steps={data.onboarding} />
      </div>
    </>
  )
}

/**
 * Stands in for the Signals card until the next phase builds it. It reads the
 * real query so the async layer, its loading state and the derived unread count
 * are exercised now rather than on paper.
 */
function SignalsPanel() {
  const { data: signals, isPending } = useSignals()

  return (
    <Card className="h-[412px] p-4">
      <div className="flex items-center gap-1.5">
        <h2 className="text-title font-semibold text-ink">Signals</h2>
        {isPending ? (
          <Skeleton className="h-6 w-7 rounded-xl" />
        ) : (
          <span className="grid h-6 min-w-7 place-items-center rounded-xl bg-accent-amber px-2 text-meta font-semibold text-card">
            {countUnread(signals)}
          </span>
        )}
      </div>

      <ul className="mt-3 flex flex-col gap-4">
        {isPending
          ? Array.from({ length: 5 }, (_, i) => (
              <li key={i} className="flex h-10 items-center gap-3">
                <Skeleton className="size-8 shrink-0 rounded-full" />
                <Skeleton className="h-4 w-[420px]" />
              </li>
            ))
          : signals?.slice(0, 5).map((signal) => (
              <li key={signal.id} className="flex h-10 items-center gap-3">
                <span className="size-8 shrink-0 rounded-full bg-border" />
                <span className="text-body text-muted">
                  {signal.kind} ·{' '}
                  {signal.kind === 'website_view'
                    ? signal.account.name
                    : signal.person.name}
                </span>
              </li>
            ))}
      </ul>
    </Card>
  )
}

/** Sized to the cards they stand in for, so the layout does not jump. */
function DashboardSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Skeleton className="h-[142px] rounded-card" />
          <Skeleton className="h-[142px] rounded-card" />
        </div>
        <Skeleton className="h-[148px] rounded-card" />
        <Skeleton className="h-[412px] rounded-card" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-[293px] rounded-card" />
        <Skeleton className="h-[412px] rounded-card" />
      </div>
    </>
  )
}

function DashboardScreen() {
  const { data, isPending, isError } = useDashboard()

  if (isError) {
    return (
      <Card className="col-span-full grid h-40 place-items-center text-body text-muted">
        Could not load the dashboard.
      </Card>
    )
  }

  return isPending || !data ? (
    <DashboardSkeleton />
  ) : (
    <DashboardColumns data={data} />
  )
}

export default function App() {
  return (
    <Providers>
      <AppShell>
        <DashboardScreen />
      </AppShell>
    </Providers>
  )
}
