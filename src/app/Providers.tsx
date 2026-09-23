import { QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

import { createQueryClient } from '@/app/queryClient'
import { TooltipProvider } from '@/components/ui/Tooltip'

/**
 * A client per mount rather than a module singleton, so each test gets a fresh
 * cache instead of inheriting the previous test's entries.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(createQueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>{children}</TooltipProvider>
    </QueryClientProvider>
  )
}
