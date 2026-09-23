import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { SignalActionMenu } from '@/components/signals/SignalActionMenu'

/**
 * One mount, walked end to end.
 *
 * Radix keeps module-level state for its dismissable layers which unmounting
 * does not fully clear: a menu opened in one test cannot be opened again in the
 * next, in jsdom. Repeated opens within a single mount work fine — as they do
 * in a browser — so the menu's contract is asserted as one sequence rather than
 * split into cases that would each need their own file.
 *
 * What the actions then do to the list is covered separately, and without
 * Radix, in `src/features/useSignalActions.test.tsx`.
 */
describe('SignalActionMenu', () => {
  it('opens on demand, runs the chosen action and closes', async () => {
    const user = userEvent.setup()
    const onComplete = vi.fn()
    const onDelete = vi.fn()

    render(
      <SignalActionMenu
        label="Action for the signal about Amazon"
        onComplete={onComplete}
        onDelete={onDelete}
      />,
    )

    const trigger = screen.getByRole('button', {
      name: 'Action for the signal about Amazon',
    })

    // Closed until asked.
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()

    // Opens with both items.
    await user.click(trigger)
    const menu = await screen.findByRole('menu')
    expect(
      within(menu).getByRole('menuitem', { name: 'Complete' }),
    ).toBeVisible()
    expect(within(menu).getByRole('menuitem', { name: 'Delete' })).toBeVisible()

    // Complete runs its action and dismisses the menu.
    await user.click(within(menu).getByRole('menuitem', { name: 'Complete' }))
    expect(onComplete).toHaveBeenCalledTimes(1)
    expect(onDelete).not.toHaveBeenCalled()
    await waitFor(() =>
      expect(screen.queryByRole('menu')).not.toBeInTheDocument(),
    )

    // Delete runs the other one.
    await user.click(trigger)
    const reopened = await screen.findByRole('menu')
    await user.click(within(reopened).getByRole('menuitem', { name: 'Delete' }))
    expect(onDelete).toHaveBeenCalledTimes(1)
    await waitFor(() =>
      expect(screen.queryByRole('menu')).not.toBeInTheDocument(),
    )

    // Escape dismisses without choosing anything, and focus comes back to the
    // button so a keyboard user is not stranded.
    await user.click(trigger)
    await screen.findByRole('menu')
    await user.keyboard('{Escape}')

    await waitFor(() =>
      expect(screen.queryByRole('menu')).not.toBeInTheDocument(),
    )
    expect(onComplete).toHaveBeenCalledTimes(1)
    expect(onDelete).toHaveBeenCalledTimes(1)
    expect(trigger).toHaveFocus()
  })
})
