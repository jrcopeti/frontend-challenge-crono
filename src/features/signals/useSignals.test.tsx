import { QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import { createQueryClient } from '@/app/queryClient'
import { countUnread, useSignals } from '@/features/signals/useSignals'
import { completeSignal, resetSignals } from '@/lib/api/signals'
import type { Signal } from '@/types'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={createQueryClient()}>
    {children}
  </QueryClientProvider>
)

describe('useSignals', () => {
  beforeEach(resetSignals)

  it('starts pending, then resolves from the async layer', async () => {
    const { result } = renderHook(() => useSignals(), { wrapper })

    expect(result.current.isPending).toBe(true)
    expect(result.current.data).toBeUndefined()

    await waitFor(() => expect(result.current.isPending).toBe(false))
    expect(result.current.data).toHaveLength(12)
  })

  it('derives the unread count rather than tracking it', async () => {
    const [first] = await (async () => {
      const { result } = renderHook(() => useSignals(), { wrapper })
      await waitFor(() => expect(result.current.data).toBeDefined())
      return result.current.data!
    })()

    await completeSignal(first!.id)

    const { result } = renderHook(() => useSignals(), { wrapper })
    await waitFor(() => expect(result.current.data).toBeDefined())

    expect(result.current.data).toHaveLength(12)
    expect(countUnread(result.current.data)).toBe(11)
  })
})

describe('countUnread', () => {
  const signal = (id: string, read: boolean): Signal => ({
    id,
    kind: 'website_view',
    read,
    date: '2025-04-02',
    account: { name: 'Amazon', avatar: 'amazon' },
    pages: 2,
    seconds: 65,
  })

  it('counts only unread signals', () => {
    expect(countUnread([signal('a', false), signal('b', true)])).toBe(1)
  })

  it('is zero before the query resolves', () => {
    expect(countUnread(undefined)).toBe(0)
  })

  it('ignores a completed signal that is later removed', () => {
    // The case a decrementing counter gets wrong: the signal was already read,
    // so deleting it must not change the count.
    const list = [signal('a', false), signal('b', true)]
    const afterDelete = list.filter((s) => s.id !== 'b')

    expect(countUnread(list)).toBe(1)
    expect(countUnread(afterDelete)).toBe(1)
  })
})
