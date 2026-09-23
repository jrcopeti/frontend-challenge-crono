import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SIGNALS_KEY } from '@/features/useSignals'
import { completeSignal, deleteSignal } from '@/lib/api'
import type { Signal } from '@/types'

/**
 * The two signal mutations differ only in how they change the list, so the
 * optimistic plumbing lives here once.
 *
 * The list is updated in the cache before the request resolves, so the row
 * responds immediately; `onError` puts the previous list back if the call
 * fails, and `onSettled` refetches so the cache ends up agreeing with the
 * service either way.
 */
function useSignalMutation(
  mutationFn: (id: string) => Promise<Signal[]>,
  apply: (signals: Signal[], id: string) => Signal[],
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onMutate: async (id: string) => {
      // Stop an in-flight refetch from landing on top of the optimistic list.
      await queryClient.cancelQueries({ queryKey: SIGNALS_KEY })

      const previous = queryClient.getQueryData<Signal[]>(SIGNALS_KEY)
      queryClient.setQueryData<Signal[]>(SIGNALS_KEY, (current) =>
        current ? apply(current, id) : current,
      )

      return { previous }
    },
    onError: (_error, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(SIGNALS_KEY, context.previous)
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: SIGNALS_KEY }),
  })
}

/** Marks the signal read. The row stays; its unread dot clears. */
export const useCompleteSignal = () =>
  useSignalMutation(completeSignal, (signals, id) =>
    signals.map((signal) =>
      signal.id === id ? { ...signal, read: true } : signal,
    ),
  )

/** Removes the row outright. */
export const useDeleteSignal = () =>
  useSignalMutation(deleteSignal, (signals, id) =>
    signals.filter((signal) => signal.id !== id),
  )
