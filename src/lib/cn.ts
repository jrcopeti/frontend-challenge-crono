import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * The theme adds custom font sizes (`text-title`, `text-meta`, ...) alongside
 * custom colours (`text-ink`, `text-card`, ...). Both land in the `text-*`
 * namespace, and tailwind-merge's heuristics can only recognise t-shirt sizes,
 * so it mistook the sizes for colours and dropped one of each pair — the
 * tooltip rendered at 14px instead of 12px. Naming the font sizes explicitly
 * puts each class in the right conflict group.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: ['display', 'stat', 'figure', 'title', 'body', 'meta', 'micro'],
        },
      ],
    },
  },
})

/** Merge conditional class names, with later Tailwind utilities winning. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
