import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/app/queryClient'
import { getSignals } from '@/lib/api/signals'
import type { Signal } from '@/types'

export function useSignals() {
  return useQuery({ queryKey: queryKeys.signals, queryFn: getSignals })
}

/**
 * The unread count is derived, never decremented. That keeps "complete an
 * already-read signal" and "delete a read signal" correct without either case
 * needing its own branch.
 */
export const countUnread = (signals: Signal[] | undefined) =>
  signals?.filter((s) => !s.read).length ?? 0
