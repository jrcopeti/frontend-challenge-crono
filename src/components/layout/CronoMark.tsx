import { cn } from '@/lib/cn'

/**
 * The Crono bolt on its own, lifted from the supplied wordmark (its sixth path)
 * rather than redrawn — the sidebar footer uses the mark as an avatar, at a
 * different colour from the logo, so it needs to be separable and take
 * `currentColor`. The viewBox is the path's own bounding box.
 */
export function CronoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="13.9 43.6 232.4 297.7"
      fill="currentColor"
      aria-hidden
      className={cn('shrink-0', className)}
    >
      <path d="M246.243 170.668C246.243 173.174 245.554 175.679 244.166 177.925C208.219 236.355 177.419 279.04 130.535 335.438C126.043 340.832 119.836 341.194 115.525 339.738C111.202 338.282 106.496 334.23 106.202 327.232C104.932 297.407 104.354 267.59 104.733 237.748C104.797 232.663 100.683 228.502 95.5984 228.524C73.1766 228.618 50.7573 228.39 28.3377 228.003C23.2476 227.913 18.7443 225.193 16.3178 220.746C13.9025 216.333 14.0379 211.141 16.6789 206.852C52.6259 148.434 83.4263 105.738 130.31 49.3402C134.79 43.9453 141.009 43.5842 145.321 45.0401C149.632 46.496 154.35 50.5478 154.643 57.5454C155.913 87.3787 156.493 117.205 156.113 147.055C156.048 152.13 160.146 156.288 165.222 156.274C187.656 156.215 210.085 156.391 232.519 156.786C237.609 156.876 242.101 159.585 244.527 164.032C245.679 166.131 246.243 168.4 246.243 170.668Z" />
    </svg>
  )
}
