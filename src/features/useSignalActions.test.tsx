import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import { Providers } from '@/app/Providers'
import { useCompleteSignal, useDeleteSignal } from '@/features/useSignalActions'
import { countUnread, useSignals } from '@/features/useSignals'
import { resetSignals } from '@/lib/api'

/** The seeded list: twelve signals, all unread. */
const SEEDED = 12

/**
 * The two mutations and the list they act on, sharing one query cache — which
 * is the point: the count has to fall out of the list rather than be tracked
 * beside it.
 */
function useSignalsScreen() {
  return {
    signals: useSignals(),
    complete: useCompleteSignal(),
    remove: useDeleteSignal(),
  }
}

const renderScreen = async () => {
  const view = renderHook(useSignalsScreen, { wrapper: Providers })
  await waitFor(() => expect(view.result.current.signals.data).toBeDefined())
  return view
}

describe('the signal actions', () => {
  beforeEach(resetSignals)

  it('Complete marks the signal read and keeps it in the list', async () => {
    const { result } = await renderScreen()
    const target = result.current.signals.data![0]!

    result.current.complete.mutate(target.id)

    await waitFor(() =>
      expect(countUnread(result.current.signals.data)).toBe(SEEDED - 1),
    )
    expect(result.current.signals.data).toHaveLength(SEEDED)
    expect(
      result.current.signals.data!.find((s) => s.id === target.id)?.read,
    ).toBe(true)
    await waitFor(() => expect(result.current.complete.isSuccess).toBe(true))
  })

  it('Delete removes the signal from the list', async () => {
    const { result } = await renderScreen()
    const target = result.current.signals.data![0]!

    result.current.remove.mutate(target.id)

    await waitFor(() =>
      expect(result.current.signals.data).toHaveLength(SEEDED - 1),
    )
    expect(countUnread(result.current.signals.data)).toBe(SEEDED - 1)
    expect(result.current.signals.data!.some((s) => s.id === target.id)).toBe(
      false,
    )
    await waitFor(() => expect(result.current.remove.isSuccess).toBe(true))
  })

  it('updates the list before the request resolves', async () => {
    const { result } = await renderScreen()
    const target = result.current.signals.data![0]!

    result.current.remove.mutate(target.id)

    // The service takes 250ms or more; the row is gone well before that, which
    // is what makes the menu feel immediate.
    await waitFor(
      () => expect(result.current.signals.data).toHaveLength(SEEDED - 1),
      { timeout: 150 },
    )

    // Let it settle before the test ends: a request still in flight would
    // otherwise land after the next test has reset the list.
    await waitFor(() => expect(result.current.remove.isSuccess).toBe(true))
  })

  it('deleting an already-completed signal leaves the count alone', async () => {
    const { result } = await renderScreen()
    const target = result.current.signals.data![0]!

    result.current.complete.mutate(target.id)
    await waitFor(() =>
      expect(countUnread(result.current.signals.data)).toBe(SEEDED - 1),
    )

    result.current.remove.mutate(target.id)
    await waitFor(() =>
      expect(result.current.signals.data).toHaveLength(SEEDED - 1),
    )

    // The case a decrementing counter gets wrong: the signal was already read,
    // so removing it must not change the unread total.
    expect(countUnread(result.current.signals.data)).toBe(SEEDED - 1)
    await waitFor(() => expect(result.current.remove.isSuccess).toBe(true))
  })

  it('rolls the list back when the service rejects', async () => {
    const { result } = await renderScreen()

    result.current.remove.mutate('does-not-exist')

    await waitFor(() => expect(result.current.remove.isError).toBe(true))
    // The optimistic update removed nothing it could find, and the rollback
    // restores the list either way.
    expect(result.current.signals.data).toHaveLength(SEEDED)
    expect(countUnread(result.current.signals.data)).toBe(SEEDED)
  })
})
