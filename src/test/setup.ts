import '@testing-library/jest-dom/vitest'

import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

/**
 * jsdom implements no ResizeObserver, and Radix's ScrollArea measures its
 * viewport with one. A no-op is enough: the tests assert what the list renders,
 * not how tall its scrollbar thumb turns out.
 */
if (!('ResizeObserver' in globalThis)) {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}

afterEach(() => {
  cleanup()
})
