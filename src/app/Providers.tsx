import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

import { TooltipProvider } from '@/components/ui/Tooltip'

/**
 * A client per mount rather than a module singleton, so each test gets a fresh
 * cache instead of inheriting the previous test's entries.
 *
 * The data behind this screen is static seed data, so refetching on window
 * focus would spend a request to learn nothing. Retries are off for the same
 * reason: a mutation fails only when its target is genuinely gone, and retrying
 * that would just delay the rollback.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: Infinity,
          },
          mutations: { retry: false },
        },
      }),
  )

  return (
    <QueryClientProvider client={client}>
      <TooltipProvider>{children}</TooltipProvider>
    </QueryClientProvider>
  )
}
