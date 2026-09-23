import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/app/queryClient'
import { getDashboard } from '@/lib/api/dashboard'

export function useDashboard() {
  return useQuery({ queryKey: queryKeys.dashboard, queryFn: getDashboard })
}
