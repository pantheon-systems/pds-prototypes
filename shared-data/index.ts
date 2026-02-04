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

import sitesData from './sites.json';
import type { Site, User } from './types';
import usersData from './users.json';

// Export typed data
export const users: User[] = usersData as User[];
export const sites: Site[] = sitesData as Site[];

// Export types
export type { Site, User };

// Export individual utilities
export const getUserById = (id: string): User | undefined => {
	return users.find((user) => user.id === id);
};

export const getSiteById = (id: string): Site | undefined => {
	return sites.find((site) => site.id === id);
};

export const getActiveUsers = (): User[] => {
	return users.filter((user) => user.status === 'active');
};

export const getActiveSites = (): Site[] => {
	return sites.filter((site) => site.status === 'Active');
};

export const getFrozenSites = (): Site[] => {
	return sites.filter((site) => site.status === 'Frozen');
};

export const getSitesByUser = (userName: string): Site[] => {
	return sites.filter((site) => site.userInCharge === userName);
};

export const getSitesByUpstream = (upstream: string): Site[] => {
	return sites.filter((site) => site.upstream === upstream);
};

export const getSitesByPlan = (plan: string): Site[] => {
	return sites.filter((site) => site.plan === plan);
};
