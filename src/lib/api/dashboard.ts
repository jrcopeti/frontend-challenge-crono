import { createStore, delay } from '@/lib/api/client'
import seed from '@/mocks/dashboard.json'
import type { Dashboard } from '@/types'

const store = createStore(seed as Dashboard)

export async function getDashboard(): Promise<Dashboard> {
  await delay()
  return store.read()
}

/**
 * The meter is 166px wide in the export, and `fillPx` says how much of it each
 * KPI fills. That is deliberately not `value / max`: five of the six are drawn
 * at 88px whatever their figures say. Keeping the pixel count in the seed data
 * and converting here keeps the fraction exact rather than rounding a decimal.
 */
export const DESIGN_BAR_PX = 166

export const fillFraction = (fillPx: number) => fillPx / DESIGN_BAR_PX
