import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TodaysTasks } from '@/components/dashboard/TodaysTasks'

const GROUPS = [
  [{ tone: 'overdue' as const, count: 3, label: 'Overdue', actionable: true }],
  [
    {
      tone: 'pendingAuto' as const,
      count: 20,
      label: 'Pending Auto',
      errors: 1,
    },
  ],
  [{ tone: 'completed' as const, count: 8, label: 'Completed' }],
]

describe('TodaysTasks', () => {
  it('renders a tile per task with its count', () => {
    render(<TodaysTasks groups={GROUPS} />)

    expect(screen.getByText('Overdue')).toBeInTheDocument()
    expect(screen.getByText('20')).toBeInTheDocument()
    expect(screen.getByText('8')).toBeInTheDocument()
  })

  it('shows an error badge only where there are errors', () => {
    render(<TodaysTasks groups={GROUPS} />)

    expect(screen.getByText(/1 error/)).toBeInTheDocument()
    expect(screen.queryByText(/errors/)).not.toBeInTheDocument()
  })

  it('makes only actionable tiles focusable', () => {
    render(<TodaysTasks groups={GROUPS} />)

    // Completed carries no chevron in the export, so it is not a control.
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(1)
    expect(buttons[0]).toHaveTextContent('Overdue')
  })
})
