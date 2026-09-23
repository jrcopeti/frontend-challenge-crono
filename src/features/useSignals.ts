import { useQuery } from '@tanstack/react-query'

import { getSignals } from '@/lib/api'
import type { Signal } from '@/types'

export const SIGNALS_KEY = ['signals'] as const

export function useSignals() {
  return useQuery({ queryKey: SIGNALS_KEY, queryFn: getSignals })
}

/**
 * The unread count is derived, never decremented. That keeps "complete an
 * already-read signal" and "delete a read signal" correct without either case
 * needing its own branch.
 */
export const countUnread = (signals: Signal[] | undefined) =>
  signals?.filter((s) => !s.read).length ?? 0
