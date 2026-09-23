import { Providers } from '@/app/Providers'
import { OnboardingCard } from '@/components/dashboard/OnboardingCard'
import { PerformanceCard } from '@/components/dashboard/PerformanceCard'
import { RepliesCard } from '@/components/dashboard/RepliesCard'
import { TodaysTasks } from '@/components/dashboard/TodaysTasks'
import { WelcomeCard } from '@/components/dashboard/WelcomeCard'
import { AppShell } from '@/components/layout/AppShell'
import { SignalActionMenu } from '@/components/signals/SignalActionMenu'
import { SignalsCard } from '@/components/signals/SignalsCard'
import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { useDashboard } from '@/features/useDashboard'
import { useCompleteSignal, useDeleteSignal } from '@/features/useSignalActions'
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

      {/* 5px lower than the main column, as the export draws it. */}
      <div className="flex flex-col gap-2 lg:mt-[5px]">
        <PerformanceCard month={data.month} kpis={data.kpis} />
        <OnboardingCard steps={data.onboarding} />
      </div>
    </>
  )
}

/** Wires the Signals card to the query and the two mutations. */
function SignalsPanel() {
  const { data: signals, isPending } = useSignals()
  const complete = useCompleteSignal()
  const remove = useDeleteSignal()

  return (
    <SignalsCard
      signals={signals}
      unreadCount={countUnread(signals)}
      isPending={isPending}
      renderAction={(signal) => (
        <SignalActionMenu
          label={`Action for the signal about ${
            signal.kind === 'website_view'
              ? signal.account.name
              : signal.person.name
          }`}
          onComplete={() => complete.mutate(signal.id)}
          onDelete={() => remove.mutate(signal.id)}
        />
      )}
    />
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
      <div className="flex flex-col gap-2 lg:mt-[5px]">
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
