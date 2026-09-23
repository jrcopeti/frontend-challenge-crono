import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import App from '@/app/App'

describe('App shell', () => {
  it('renders the main navigation with Dashboard current', () => {
    render(<App />)

    const nav = screen.getByRole('navigation', { name: 'Main' })
    expect(nav).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /dashboard/i })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('labels the Inbox count for assistive tech', () => {
    render(<App />)

    expect(screen.getByLabelText('24 unread inbox items')).toHaveTextContent(
      '24',
    )
  })

  it('names the unread signals count for assistive tech', async () => {
    render(<App />)

    // A bare "12" tells a screen reader nothing, and the count arrives from
    // the async layer, so it has to be awaited.
    expect(
      await screen.findByLabelText('12 unread signals'),
    ).toBeInTheDocument()
  })

  it('collapses and expands the sidebar', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Collapse sidebar' }))

    // Labels go, the icons stay reachable by their accessible name.
    expect(screen.queryByText('Templates')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Expand sidebar' }))
    expect(screen.getByText('Templates')).toBeInTheDocument()
  })
})
