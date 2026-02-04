/**
 * Shared mock data for prototyping
 *
 * Import this data in your project to get started quickly:
 *
 * @example
 * import { users, sites } from '@/shared-data'
 *
 * export default function MyPrototype() {
 *   return (
 *     <div>
 *       {sites.map(site => (
 *         <div key={site.id}>{site.name}</div>
 *       ))}
 *     </div>
 *   )
 * }
 */

import usersData from './users.json'
import sitesData from './sites.json'
import type { User, Site } from './types'

// Export typed data
export const users: User[] = usersData as User[]
export const sites: Site[] = sitesData as Site[]

// Export types
export type { User, Site }

// Export individual utilities
export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id)
}

export const getSiteById = (id: string): Site | undefined => {
  return sites.find(site => site.id === id)
}

export const getActiveUsers = (): User[] => {
  return users.filter(user => user.status === 'active')
}

export const getLiveSites = (): Site[] => {
  return sites.filter(site => site.status === 'live')
}

export const getSitesByOwner = (ownerName: string): Site[] => {
  return sites.filter(site => site.owner === ownerName)
}

export const getSitesByType = (siteType: 'WordPress' | 'Drupal' | 'Next.js'): Site[] => {
  return sites.filter(site => site.siteType === siteType)
}
