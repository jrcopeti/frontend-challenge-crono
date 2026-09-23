import { QueryClient } from '@tanstack/react-query'

/**
 * One client for the app.
 *
 * The data behind this screen is static seed JSON, so refetching on window
 * focus would spend a request to learn nothing. Retries are off for the same
 * reason: the fake service fails only when a mutation's target is genuinely
 * gone, and retrying that would just delay the rollback.
 */
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: Infinity,
      },
      mutations: { retry: false },
    },
  })
}

export const queryKeys = {
  dashboard: ['dashboard'] as const,
  signals: ['signals'] as const,
}
