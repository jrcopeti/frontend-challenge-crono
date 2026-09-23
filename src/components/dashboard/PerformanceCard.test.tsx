import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PerformanceCard } from '@/components/dashboard/PerformanceCard'
import { TooltipProvider } from '@/components/ui/Tooltip'
import type { Kpi } from '@/types'

const thousands = (n: number) => (n >= 1000 ? `${n / 1000}K` : String(n))

const KPIS: Kpi[] = [
  {
    label: 'Contacts engaged',
    value: 0,
    max: 500,
    tone: 'blue',
    icon: 'contacts',
    hint: 'Contacts who have at least one logged activity',
  },
  {
    label: 'Meetings',
    value: 20,
    max: 30,
    tone: 'amber',
    icon: 'meetings',
    fill: 88 / 166,
  },
  {
    label: 'Pipeline',
    value: 50_000,
    max: 100_000,
    tone: 'green',
    format: thousands,
    prefix: '€',
  },
]

const renderCard = () =>
  render(
    <TooltipProvider>
      <PerformanceCard month="May" kpis={KPIS} />
    </TooltipProvider>,
  )

describe('PerformanceCard', () => {
  it('reports each meter against its own maximum', () => {
    renderCard()

    const meetings = screen.getByRole('progressbar', { name: 'Meetings' })
    expect(meetings).toHaveAttribute('aria-valuenow', '20')
    expect(meetings).toHaveAttribute('aria-valuemax', '30')

    const contacts = screen.getByRole('progressbar', {
      name: 'Contacts engaged',
    })
    expect(contacts).toHaveAttribute('aria-valuenow', '0')
  })

  it('draws the width the export draws, not the one the figures imply', () => {
    renderCard()

    // Meetings reads 20/30 but the export fills 88px of 166. Fidelity wins for
    // the pixels; the accessible value still reports the real figure.
    const meetings = screen.getByRole('progressbar', { name: 'Meetings' })
    expect(meetings.firstElementChild).toHaveStyle({
      width: '53.01204819277109%',
    })
    expect(meetings).toHaveAttribute('aria-valuenow', '20')
  })

  it('formats a figure and its maximum, prefixing only the figure', () => {
    renderCard()

    expect(screen.getByText('€50K')).toBeInTheDocument()
    expect(screen.getByText('/100K')).toBeInTheDocument()
  })

  it('gives the info affordance a label naming what it explains', () => {
    renderCard()

    expect(
      screen.getByRole('button', { name: 'What "Contacts engaged" counts' }),
    ).toBeInTheDocument()
  })
})
