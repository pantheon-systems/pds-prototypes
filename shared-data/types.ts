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

export interface Site {
  id: string
  name: string
  siteType: 'WordPress' | 'Drupal' | 'Next.js'
  status: 'live' | 'development' | 'frozen' | 'inactive'
  environment: 'production' | 'staging' | 'dev'
  created: string
  lastDeployed: string
  owner: string
  plan: 'Basic' | 'Performance' | 'Elite'
  region: 'US' | 'EU' | 'AU'
}
