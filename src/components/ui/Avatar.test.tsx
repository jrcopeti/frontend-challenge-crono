import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Avatar } from '@/components/ui/Avatar'

describe('Avatar', () => {
  it('shows initials when no image is supplied', () => {
    render(<Avatar name="Robert Smith" />)

    expect(screen.getByText('RS')).toBeInTheDocument()
  })

  it('falls back to initials when the image fails to load', () => {
    const { container } = render(
      <Avatar name="Robert Smith" src="/missing.png" />,
    )

    const image = container.querySelector('img')
    expect(image).not.toBeNull()

    // A broken src is the likely case here, not an edge case: the design's
    // avatars have not been exported yet.
    fireEvent.error(image!)

    expect(screen.getByText('RS')).toBeInTheDocument()
    expect(container.querySelector('img')).toBeNull()
  })
})
