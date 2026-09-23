import { dashboard } from '@/mocks/dashboard'
import { signals as seed } from '@/mocks/signals'
import type { Dashboard, Signal } from '@/types'

/**
 * The seam where a real API would go.
 *
 * There is no backend. These functions return the seed data after a short
 * delay, so the query layer, its loading states and phase 8's optimistic
 * updates are exercised for real rather than mocked away.
 */

/** Latency a local call never has, so the loading states are visible. */
const delay = () =>
  new Promise((resolve) => setTimeout(resolve, 250 + Math.random() * 150))

export async function getDashboard(): Promise<Dashboard> {
  await delay()
  return dashboard
}

/**
 * The session's signals.
 *
 * Both mutations rebuild the array with `map` or `filter`, so `seed` is never
 * modified and a reset is a plain reassignment — no copy is needed.
 */
let signals: Signal[] = seed

export async function getSignals(): Promise<Signal[]> {
  await delay()
  return signals
}

/**
 * Marks a signal read. The row stays in the list; only its unread mark clears.
 *
 * The unread count is derived from this list rather than decremented, so
 * completing an already-read signal correctly changes nothing.
 */
export async function completeSignal(id: string): Promise<Signal[]> {
  await delay()
  if (!signals.some((s) => s.id === id))
    throw new Error(`Signal ${id} not found`)

  signals = signals.map((s) => (s.id === id ? { ...s, read: true } : s))
  return signals
}

/** Removes a signal outright. */
export async function deleteSignal(id: string): Promise<Signal[]> {
  await delay()
  if (!signals.some((s) => s.id === id))
    throw new Error(`Signal ${id} not found`)

  signals = signals.filter((s) => s.id !== id)
  return signals
}

/** Test seam: each test starts from the seed list. */
export function resetSignals() {
  signals = seed
}
