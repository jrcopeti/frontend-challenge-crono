/**
 * The seam where a real API would go.
 *
 * There is no backend. These helpers give the rest of the app the shape of one
 * — asynchronous, latent, and mutable — so the query layer, its loading states
 * and its optimistic updates are exercised for real rather than mocked away.
 */

/** Latency a local call never has, so loading states are visible in dev. */
const MIN_MS = 250
const MAX_MS = 400

export function delay(ms = MIN_MS + Math.random() * (MAX_MS - MIN_MS)) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

/**
 * A mutable copy of seed JSON, so a mutation persists for the session the way a
 * server would persist it. Structured-cloning on read would defeat that; the
 * copy is taken once, when the store is created.
 */
export function createStore<T>(seed: T) {
  let data: T = structuredClone(seed)

  return {
    read: () => data,
    write: (next: T) => {
      data = next
    },
    /** Test seam: restores the seed so each test starts from a known list. */
    reset: () => {
      data = structuredClone(seed)
    },
  }
}

/** Thrown for a mutation whose target is gone, so `onError` has something real. */
export class NotFoundError extends Error {
  constructor(what: string) {
    super(`${what} not found`)
    this.name = 'NotFoundError'
  }
}
