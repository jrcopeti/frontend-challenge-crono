import brandAmazon from '@/assets/figma/brand-amazon.png'
import brandMcdonalds from '@/assets/figma/brand-mcdonalds.png'
import brandMedium from '@/assets/figma/brand-medium.png'
import brandReddit from '@/assets/figma/brand-reddit.png'
import signalAmazon from '@/assets/figma/signal-brand-amazon.png'
import onbAddContact from '@/assets/figma/onboarding-add-contact.png'
import onbAddToSequence from '@/assets/figma/onboarding-add-to-sequence.png'
import onbCreateSequence from '@/assets/figma/onboarding-create-sequence.png'
import onbIntegrations from '@/assets/figma/onboarding-integrations.png'
import onbRunTask from '@/assets/figma/onboarding-run-task.png'
import type { AvatarId, BrandId, OnboardingIcon } from '@/types'

/**
 * Seed JSON names an asset; these maps resolve the name to the URL Vite emits.
 * Keeping the indirection here means the mock data stays plain JSON — no
 * imports, no bundler-specific paths — and a real API could serve it unchanged.
 */

/**
 * Every signal row in the export carries the same Amazon mark, whoever the row
 * is about. One avatar was supplied and the design uses one avatar, so this map
 * has a single entry rather than a missing-asset placeholder.
 */
export const SIGNAL_AVATARS: Record<AvatarId, string> = {
  amazon: signalAmazon,
}

/** The Replies stack, which uses a differently-framed export of each mark. */
export const BRAND_AVATARS: Record<BrandId, string> = {
  reddit: brandReddit,
  amazon: brandAmazon,
  mcdonalds: brandMcdonalds,
  medium: brandMedium,
}

export const ONBOARDING_ICONS: Record<OnboardingIcon, string> = {
  integrations: onbIntegrations,
  'add-contact': onbAddContact,
  'create-sequence': onbCreateSequence,
  'add-to-sequence': onbAddToSequence,
  'run-task': onbRunTask,
}
