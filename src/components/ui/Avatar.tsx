import { useState } from 'react'

import { cn } from '@/lib/cn'

/**
 * Avatar with an initials fallback.
 *
 * The design's avatars are bespoke illustrations that have not been exported
 * yet, so `src` is optional and the fallback keeps layout honest until the real
 * images land (see src/assets/figma/README.md).
 */
export function Avatar({
  src,
  name,
  size = 32,
  className,
}: {
  src?: string
  name: string
  size?: number
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0] ?? '')
    .join('')
    .toUpperCase()

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-border text-[10px] font-semibold text-ink-soft',
        className,
      )}
      style={{ width: size, height: size }}
    >
      {src && !failed ? (
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        initials
      )}
    </span>
  )
}

/** Overlapping avatars, as in the Replies card. */
export function AvatarStack({
  people,
  size = 32,
  className,
}: {
  people: { name: string; src?: string }[]
  size?: number
  className?: string
}) {
  return (
    <span className={cn('flex items-center', className)}>
      {people.map((person, index) => (
        <Avatar
          key={person.name}
          {...person}
          size={size}
          className={cn('ring-2 ring-card', index > 0 && '-ml-2')}
        />
      ))}
    </span>
  )
}
