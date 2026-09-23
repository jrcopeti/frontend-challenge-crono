import { createStore, delay, NotFoundError } from '@/lib/api/client'
import seed from '@/mocks/signals.json'
import type { Signal } from '@/types'

const store = createStore(seed as Signal[])

/** Test seam — see `createStore`. */
export const resetSignals = store.reset

export async function getSignals(): Promise<Signal[]> {
  await delay()
  return store.read()
}

/**
 * Marks a signal read. The row stays in the list; only its unread mark clears.
 *
 * The unread count is derived from this list rather than decremented, so
 * completing an already-read signal correctly changes nothing.
 */
export async function completeSignal(id: string): Promise<Signal[]> {
  await delay()
  const current = store.read()
  if (!current.some((s) => s.id === id)) throw new NotFoundError(`Signal ${id}`)

  store.write(current.map((s) => (s.id === id ? { ...s, read: true } : s)))
  return store.read()
}

/** Removes a signal outright. */
export async function deleteSignal(id: string): Promise<Signal[]> {
  await delay()
  const current = store.read()
  if (!current.some((s) => s.id === id)) throw new NotFoundError(`Signal ${id}`)

  store.write(current.filter((s) => s.id !== id))
  return store.read()
}
