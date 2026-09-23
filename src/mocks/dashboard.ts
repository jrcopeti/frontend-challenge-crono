import brandAmazon from '@/assets/figma/brand-amazon.png'
import brandMcdonalds from '@/assets/figma/brand-mcdonalds.png'
import brandMedium from '@/assets/figma/brand-medium.png'
import brandReddit from '@/assets/figma/brand-reddit.png'
import onbAddContact from '@/assets/figma/onboarding-add-contact.png'
import onbAddToSequence from '@/assets/figma/onboarding-add-to-sequence.png'
import onbCreateSequence from '@/assets/figma/onboarding-create-sequence.png'
import onbIntegrations from '@/assets/figma/onboarding-integrations.png'
import onbRunTask from '@/assets/figma/onboarding-run-task.png'
import type { Dashboard } from '@/types'

/** "50K" for a currency figure; plain digits otherwise, as the export shows. */
const thousands = (n: number) => (n >= 1000 ? `${n / 1000}K` : String(n))

/**
 * The export draws five of the six KPI meters at exactly 88px of the 166px bar
 * — one bar copied across the grid — regardless of the figures printed beside
 * them. Contacts engaged is the only one drawn empty. Fidelity is the brief, so
 * the meters carry this rather than deriving from `value / max`.
 */
const DESIGN_FILL = 88 / 166

export const dashboard: Dashboard = {
  userName: 'Alex',
  month: 'May',
  replies: {
    count: 24,
    repliers: [
      { name: 'Reddit', src: brandReddit },
      { name: 'Amazon', src: brandAmazon },
      { name: "McDonald's", src: brandMcdonalds },
      { name: 'Medium', src: brandMedium },
    ],
  },
  taskGroups: [
    [{ tone: 'overdue', count: 3, label: 'Overdue', actionable: true }],
    [
      {
        tone: 'pendingManual',
        count: 10,
        label: 'Pending Manual',
        actionable: true,
      },
      {
        tone: 'pendingAuto',
        count: 20,
        label: 'Pending Auto',
        errors: 1,
        actionable: true,
      },
    ],
    [{ tone: 'completed', count: 8, label: 'Completed' }],
  ],
  kpis: [
    {
      label: 'Contacts engaged',
      value: 0,
      max: 500,
      tone: 'blue',
      icon: 'contacts',
      fill: 0,
      hint: 'Contacts who have at least one logged activity within the current month',
    },
    {
      label: 'Companies engaged',
      value: 0,
      max: 500,
      tone: 'indigo',
      icon: 'companies',
      fill: DESIGN_FILL,
    },
    {
      label: 'Activities',
      value: 1000,
      max: 2000,
      tone: 'purple',
      icon: 'list',
      fill: DESIGN_FILL,
    },
    {
      label: 'Meetings',
      value: 20,
      max: 30,
      tone: 'amber',
      icon: 'meetings',
      fill: DESIGN_FILL,
    },
    {
      label: 'Deals',
      value: 100,
      max: 200,
      tone: 'pink',
      icon: 'list',
      fill: DESIGN_FILL,
    },
    {
      label: 'Pipeline',
      value: 50_000,
      max: 100_000,
      tone: 'green',
      format: thousands,
      prefix: '€',
      fill: DESIGN_FILL,
    },
  ],
  onboarding: [
    { icon: onbIntegrations, title: 'Integrations Setup', minutes: 5 },
    { icon: onbAddContact, title: 'Add new Contact', minutes: 5 },
    {
      icon: onbCreateSequence,
      title: 'Create your first sequence',
      minutes: 10,
    },
    { icon: onbAddToSequence, title: 'Add contacts to sequence', minutes: 5 },
    { icon: onbRunTask, title: 'Run your first task', minutes: 10 },
  ],
}
