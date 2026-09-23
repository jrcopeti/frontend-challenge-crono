import '@testing-library/jest-dom/vitest'

import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

/**
 * jsdom implements neither of the browser APIs Radix's primitives reach for.
 * These stubs are enough for the components to mount and respond: the tests
 * assert what the menu does, not how the platform measures it.
 *
 * - `ResizeObserver` — `ScrollArea` measures its viewport with one.
 * - pointer capture and `scrollIntoView` — `DropdownMenu` calls them while
 *   opening, and without them the menu never appears.
 */
if (!('ResizeObserver' in globalThis)) {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}

if (!Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false
  Element.prototype.setPointerCapture = () => {}
  Element.prototype.releasePointerCapture = () => {}
}

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {}
}

afterEach(() => {
  cleanup()

  // Radix disables pointer events on <body> while a menu is open. Unmounting
  // with one still open leaves that inline style behind, and every click in
  // the next test is then silently swallowed.
  document.body.style.pointerEvents = ''
})
