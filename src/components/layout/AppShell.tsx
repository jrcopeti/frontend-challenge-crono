import { useState } from 'react'

import { Sidebar } from '@/components/layout/Sidebar'

/**
 * Page frame: the fixed sidebar plus the scrolling content area.
 *
 * The content grid is two columns — an 800px main column and a 408px rail with
 * an 8px gutter, inside 16px page padding, all measured from the export. Below
 * 1024px the rail drops under the main column; the design has no narrower
 * layout, so nothing beyond that is invented.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex min-h-dvh bg-page">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />

      <main className="min-w-0 flex-1 p-4">
        <div className="mx-auto grid max-w-[1232px] grid-cols-1 items-start gap-2 lg:grid-cols-[minmax(0,800fr)_408fr]">
          {children}
        </div>
      </main>
    </div>
  )
}
