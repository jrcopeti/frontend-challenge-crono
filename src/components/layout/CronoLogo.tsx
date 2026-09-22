import logoUrl from '@/assets/figma/crono-logo.svg'

/**
 * The wordmark carries its own teal (#07c8c0), which is a third teal distinct
 * from --color-brand and --color-brand-strong. That is what the export renders,
 * so the asset is used unaltered rather than tinted to a token.
 */
export function CronoLogo({ className }: { className?: string }) {
  return <img src={logoUrl} alt="Crono" className={className} />
}
