import { beforeEach, describe, expect, it } from 'vitest'

import { NotFoundError } from '@/lib/api/client'
import {
  completeSignal,
  deleteSignal,
  getSignals,
  resetSignals,
} from '@/lib/api/signals'

describe('signals service', () => {
  beforeEach(resetSignals)

  it('seeds twelve unread signals, matching the count on the card', async () => {
    const signals = await getSignals()

    expect(signals).toHaveLength(12)
    expect(signals.filter((s) => !s.read)).toHaveLength(12)
  })

  it('completing marks the signal read and leaves it in the list', async () => {
    const before = await getSignals()
    const target = before[0]!

    const after = await completeSignal(target.id)

    expect(after).toHaveLength(before.length)
    expect(after.find((s) => s.id === target.id)?.read).toBe(true)
  })

  it('deleting removes the signal', async () => {
    const before = await getSignals()
    const target = before[0]!

    const after = await deleteSignal(target.id)

    expect(after).toHaveLength(before.length - 1)
    expect(after.some((s) => s.id === target.id)).toBe(false)
  })

  it('persists a mutation across reads, the way a server would', async () => {
    const [first] = await getSignals()
    await completeSignal(first!.id)

    const reread = await getSignals()

    expect(reread.find((s) => s.id === first!.id)?.read).toBe(true)
  })

  it('rejects a mutation whose target is gone, so a rollback has a cause', async () => {
    await expect(completeSignal('does-not-exist')).rejects.toBeInstanceOf(
      NotFoundError,
    )
    await expect(deleteSignal('does-not-exist')).rejects.toBeInstanceOf(
      NotFoundError,
    )
  })

  it('does not leak mutations between tests', async () => {
    // Guards the reset seam the suite depends on: the deletion above must not
    // be visible here.
    const signals = await getSignals()

    expect(signals).toHaveLength(12)
  })
})
