/**
 * Shared data type definitions
 */

export interface User {
	avatar: string;
	email: string;
	id: string;
	joinDate: string;
	name: string;
	organization: string;
	role: string;
	status: 'active' | 'inactive';
}

export type SiteUpstream =
	| 'Drupal (Composer Managed)'
	| 'WordPress'
	| 'Drupal 7'
	| 'Drupal 8'
	| 'WordPress Multisite'
	| 'Empty Upstream'
	| 'nextjs 15'
	| ''; // blank

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
	| 'Elite Starter';

export type SiteStatus = 'Frozen' | 'Active';

export interface Site {
	created: string;
	id: string;
	monthlyVisitsAllowed: string;
	monthlyVisitsUsed: string;
	name: string;
	plan: SitePlan;
	status: SiteStatus;
	upstream: SiteUpstream;
	// e.g., "February 15th, 2023"
	userInCharge: string;
}
