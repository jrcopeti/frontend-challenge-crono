import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SignalsCard } from '@/components/signals/SignalsCard'
import type { Signal } from '@/types'

const person = { name: 'Robert Smith', avatar: '/avatar.png' }
const account = { name: 'Amazon', avatar: '/avatar.png' }

const roleChange: Signal = {
  id: 'a',
  kind: 'role_change',
  read: false,
  date: '2025-04-02',
  person,
  fromRole: 'SDR',
  toRole: 'Senior SDR',
  company: 'WeRoad',
  inSequence: true,
}

const companyChange: Signal = { ...roleChange, id: 'b', kind: 'company_change' }

const readNoChip: Signal = {
  ...roleChange,
  id: 'c',
  read: true,
  inSequence: false,
}

const websiteView: Signal = {
  id: 'd',
  kind: 'website_view',
  read: false,
  date: '2025-04-02',
  account,
  pages: 2,
  seconds: 65,
}

const SIGNALS = [roleChange, companyChange, readNoChip, websiteView]

const renderCard = (signals = SIGNALS) =>
  render(
    <SignalsCard
      signals={signals}
      unreadCount={signals.filter((s) => !s.read).length}
      isPending={false}
    />,
  )

describe('SignalsCard', () => {
  it('renders one row per signal', () => {
    renderCard()

    expect(screen.getAllByRole('listitem')).toHaveLength(4)
  })

  it('writes each sentence from the signal, not from a stored string', () => {
    renderCard()

    // The two contact kinds are worded identically in the export; only the
    // label below them differs.
    expect(
      screen.getAllByText(/changed role from SDR to Senior SDR at WeRoad/),
    ).toHaveLength(3)

    expect(screen.getByText(/viewed/).closest('span')).toHaveTextContent(
      'Amazon viewed 2 pages of your website for 65 sec',
    )
  })

  it('labels each row by kind', () => {
    renderCard()

    expect(screen.getByText('Company change')).toBeInTheDocument()
    expect(screen.getByText('Website view')).toBeInTheDocument()
    expect(screen.getAllByText('Role change')).toHaveLength(2)
  })

  it('shows the sequence chip only where the signal is in one', () => {
    renderCard()

    expect(screen.getAllByText('In sequence')).toHaveLength(2)
  })

  it('marks unread signals and leaves read ones unmarked', () => {
    renderCard()

    // Three of the four are unread; the read one carries no dot.
    expect(screen.getAllByRole('img', { name: 'Unread' })).toHaveLength(3)
  })

  it('formats the date the way the export writes it', () => {
    renderCard()

    expect(screen.getAllByText('Apr 2, 2025')).toHaveLength(4)
  })

  it('names each Action button by its row', () => {
    renderCard()

    expect(
      screen.getByRole('button', {
        name: 'Action for the signal about Amazon',
      }),
    ).toBeInTheDocument()
  })

  it('shows the derived unread count', () => {
    renderCard()

    expect(screen.getByLabelText('3 unread signals')).toHaveTextContent('3')
  })

  it('renders placeholder rows while the query is pending', () => {
    render(<SignalsCard signals={undefined} unreadCount={0} isPending />)

    expect(screen.getAllByRole('listitem')).toHaveLength(5)
    expect(screen.queryByText(/changed role/)).not.toBeInTheDocument()
  })

  it('lets a caller supply its own Action control', () => {
    render(
      <SignalsCard
        signals={[roleChange]}
        unreadCount={1}
        isPending={false}
        renderAction={(s) => <button type="button">Menu {s.id}</button>}
      />,
    )

    const row = screen.getByRole('listitem')
    expect(within(row).getByRole('button')).toHaveTextContent('Menu a')
  })
})
