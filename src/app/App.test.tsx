import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import App from '@/app/App'

describe('App', () => {
  it('renders the design system preview', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: /colour tokens/i }),
    ).toBeInTheDocument()
  })

  it('labels count badges for assistive tech', () => {
    render(<App />)

    expect(screen.getByLabelText('12 unread signals')).toHaveTextContent('12')
  })
})
