import { describe, expect, it } from 'vitest'

import { cn } from '@/lib/cn'

describe('cn', () => {
  it('keeps a custom font size alongside a custom text colour', () => {
    // Both are `text-*`; tailwind-merge drops one unless the size group is
    // declared. This is what made the tooltip render at the wrong size.
    expect(cn('text-card', 'text-meta')).toBe('text-card text-meta')
  })

  it('still resolves genuine conflicts, last one winning', () => {
    expect(cn('text-meta', 'text-title')).toBe('text-title')
    expect(cn('text-ink', 'text-muted')).toBe('text-muted')
  })

  it('merges conditional values', () => {
    const isHidden = false

    expect(cn('p-2', isHidden && 'hidden', ['gap-1'])).toBe('p-2 gap-1')
  })
})
