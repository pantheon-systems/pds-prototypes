/**
 * Shared data type definitions
 */

export interface User {
  id: string
  name: string
  email: string
  role: string
  organization: string
  avatar: string
  status: 'active' | 'inactive'
  joinDate: string
}

export type SiteUpstream =
  | 'Drupal (Composer Managed)'
  | 'WordPress'
  | 'Drupal 7'
  | 'Drupal 8'
  | 'WordPress Multisite'
  | 'Empty Upstream'
  | 'nextjs 15'
  | ''  // blank

export type SitePlan =
  | 'Sandbox'
  | 'Performance Medium'
  | 'Basic'
  | 'Performance Extra Large'
  | 'Performance Small'
  | 'Performance Large'
  | 'Elite'
  | 'Performance 2XL'
  | 'Elite Custom Super'
  | 'Elite Starter'

export type SiteStatus = 'Frozen' | 'Active'

export interface Site {
  id: string
  name: string
  created: string  // e.g., "February 15th, 2023"
  userInCharge: string
  upstream: SiteUpstream
  plan: SitePlan
  monthlyVisitsUsed: string
  monthlyVisitsAllowed: string
  status: SiteStatus
}
