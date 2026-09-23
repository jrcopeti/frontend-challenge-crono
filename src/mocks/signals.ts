import avatar from '@/assets/figma/brand-amazon.png'
import avatarUnread from '@/assets/figma/signal-brand-amazon.png'
import type { Signal } from '@/types'

/**
 * The twelve the count chip reports.
 *
 * The export draws five rows and repeats them, so nothing here is invented: a
 * role change in sequence, a company change in sequence, a role change with no
 * chip, then two website views — cycled to twelve. Every row carries the same
 * Amazon mark, whoever the row is about, because the design does.
 */
const contact = { name: 'Robert Smith', avatar, avatarUnread }
const account = { name: 'Amazon', avatar, avatarUnread }

const aboutContact = (id: string, inSequence: boolean) => ({
  id,
  read: false,
  date: '2025-04-02',
  person: contact,
  fromRole: 'SDR',
  toRole: 'Senior SDR',
  company: 'WeRoad',
  inSequence,
})

const roleChange = (id: string, inSequence: boolean): Signal => ({
  kind: 'role_change',
  ...aboutContact(id, inSequence),
})

const companyChange = (id: string, inSequence: boolean): Signal => ({
  kind: 'company_change',
  ...aboutContact(id, inSequence),
})

const websiteView = (id: string): Signal => ({
  id,
  kind: 'website_view',
  read: false,
  date: '2025-04-02',
  account,
  pages: 2,
  seconds: 65,
})

/** The export's visible order, repeated. */
const pattern = [
  (id: string) => roleChange(id, true),
  (id: string) => companyChange(id, true),
  (id: string) => roleChange(id, false),
  websiteView,
  websiteView,
]

export const signals: Signal[] = Array.from({ length: 12 }, (_, i) => {
  const id = `sig-${String(i + 1).padStart(2, '0')}`
  return pattern[i % pattern.length]!(id)
})
