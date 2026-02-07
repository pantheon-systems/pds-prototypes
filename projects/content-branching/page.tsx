'use client';

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import {
	Avatar,
	Button,
	CTALink,
	DashboardGlobal,
	DashboardInner,
	DashboardNav,
	DashboardSearch,
	GlobalWrapper,
	LinkNewWindow,
	MenuButton,
	Navbar,
	Panel,
	ProgressBar,
	Select,
	SiteFooter,
	StatusIndicator,
	TextInput,
} from '@pantheon-systems/pds-toolkit-react';
import { SpacesMenu } from './components/SpacesMenu';
import styles from './page.module.css';

// Sample navigation data
const dashboardNavItems = [
	{
		icon: 'house' as const,
		linkContent: <a href='#'>Home</a>,
	},
	{
		icon: 'rocketLaunch' as const,
		linkContent: <a href='#'>Projects</a>,
	},
	{
		icon: 'users' as const,
		linkContent: <a href='#'>Accounts</a>,
	},
	{
		icon: 'keySkeleton' as const,
		linkContent: <a href='#'>Tokens</a>,
	},
];

const sampleSites = [
	{
		id: 'marketing-site',
		name: 'Marketing Site',
		url: 'https://marketing.example.com',
	},
	{
		id: 'blog',
		name: 'Blog',
		url: 'https://blog.example.com',
	},
	{
		id: 'ecommerce',
		name: 'E-commerce Store',
		url: 'https://store.example.com',
	},
];

const helpMenuItems = [
	{
		isLink: true,
		linkContent: <a href='https://docs.pantheon.io'>Documentation</a>,
	},
	{
		isLink: true,
		linkContent: <a href='https://pantheon.io/support'>Support</a>,
	},
	{
		isLink: true,
		linkContent: <a href='https://status.pantheon.io'>Status</a>,
	},
];

// Spaces data
const currentSpace = {
	id: 'uc-davis',
	name: 'UC Davis',
	logo: '/logos/UC Davis.png',
};

const otherSpaces = [
	{
		id: 'umich',
		name: 'University of Michigan',
		logo: '/logos/UMich.png',
	},
	{
		id: 'harvard',
		name: 'Harvard University',
		logo: '/logos/Harvard.png',
	},
	{
		id: 'acme',
		name: 'ACME',
		logo: '/logos/ACME.png',
	},
	{
		id: 'human-made',
		name: 'Human Made',
		logo: '/logos/Human Made.png',
	},
	{
		id: 'amtrak',
		name: 'Amtrak',
		logo: '/logos/Amtrak.png',
	},
];

// Mock collections data
const mockCollections = [
	{
		id: '1',
		name: 'Pantheon.io Playground',
		thumbnailUrl: null,
		owner: {
			name: 'Jane Doe',
			email: 'jane.doe@pantheon.io',
			isCurrentUser: true,
		},
		url: 'https://pantheon-playground.pantheonsite.io',
		status: 'Active' as const,
	},
	{
		id: '2',
		name: 'Summer 2024 Campaign',
		thumbnailUrl: null,
		owner: {
			name: 'John Smith',
			email: 'john.smith@pantheon.io',
			isCurrentUser: false,
		},
		url: 'https://summer-campaign-2024.pantheonsite.io',
		status: 'Inactive' as const,
	},
	{
		id: '3',
		name: 'CatTales For Me',
		thumbnailUrl: null,
		owner: {
			name: 'Sarah Chen',
			email: 'sarah.chen@ucdavis.edu',
			isCurrentUser: false,
		},
		url: 'https://cattales.example.com',
		status: 'Active' as const,
	},
	{
		id: '4',
		name: 'Marketing Hub',
		thumbnailUrl: null,
		owner: {
			name: 'Mike Johnson',
			email: 'mjohnson@humanmade.com',
			isCurrentUser: false,
		},
		url: 'https://marketing-hub.pantheonsite.io',
		status: 'Active' as const,
	},
	{
		id: '5',
		name: 'Design System Docs',
		thumbnailUrl: null,
		owner: {
			name: 'Jane Doe',
			email: 'jane.doe@pantheon.io',
			isCurrentUser: true,
		},
		url: 'https://design-docs.pantheonsite.io',
		status: 'Active' as const,
	},
	{
		id: '6',
		name: 'Engineering Wiki',
		thumbnailUrl: null,
		owner: {
			name: 'Emily Rodriguez',
			email: 'emily.r@umich.edu',
			isCurrentUser: false,
		},
		url: 'https://engineering-wiki.umich.edu',
		status: 'Inactive' as const,
	},
	{
		id: '7',
		name: 'Product Catalog',
		thumbnailUrl: null,
		owner: {
			name: 'David Lee',
			email: 'dlee@acme.com',
			isCurrentUser: false,
		},
		url: 'https://catalog.acme.com',
		status: 'Active' as const,
	},
	{
		id: '8',
		name: 'University News Portal',
		thumbnailUrl: null,
		owner: {
			name: 'Lisa Anderson',
			email: 'landerson@harvard.edu',
			isCurrentUser: false,
		},
		url: 'https://news.harvard.edu',
		status: 'Active' as const,
	},
	{
		id: '9',
		name: 'Product Launch Materials',
		thumbnailUrl: null,
		owner: {
			name: 'Robert Taylor',
			email: 'rtaylor@pantheon.io',
			isCurrentUser: false,
		},
		url: 'https://product-launch.pantheonsite.io',
		status: 'Inactive' as const,
	},
	{
		id: '10',
		name: 'Blog Platform',
		thumbnailUrl: null,
		owner: {
			name: 'Jane Doe',
			email: 'jane.doe@pantheon.io',
			isCurrentUser: true,
		},
		url: 'https://blog.pantheonsite.io',
		status: 'Active' as const,
	},
	{
		id: '11',
		name: 'Customer Support Portal',
		thumbnailUrl: null,
		owner: {
			name: 'Maria Garcia',
			email: 'mgarcia@amtrak.com',
			isCurrentUser: false,
		},
		url: 'https://support.amtrak.com',
		status: 'Active' as const,
	},
	{
		id: '12',
		name: 'Blog Archives',
		thumbnailUrl: null,
		owner: {
			name: 'Kevin White',
			email: 'kwhite@pantheon.io',
			isCurrentUser: false,
		},
		url: 'https://blog-archive.pantheonsite.io',
		status: 'Inactive' as const,
	},
	{
		id: '13',
		name: 'Developer Documentation',
		thumbnailUrl: null,
		owner: {
			name: 'James Brown',
			email: 'jbrown@humanmade.com',
			isCurrentUser: false,
		},
		url: 'https://dev-docs.example.com',
		status: 'Active' as const,
	},
	{
		id: '14',
		name: 'E-Learning Platform',
		thumbnailUrl: null,
		owner: {
			name: 'Amanda Wilson',
			email: 'awilson@ucdavis.edu',
			isCurrentUser: false,
		},
		url: 'https://elearning.ucdavis.edu',
		status: 'Active' as const,
	},
	{
		id: '15',
		name: 'Sales Playbook',
		thumbnailUrl: null,
		owner: {
			name: 'Chris Martinez',
			email: 'cmartinez@pantheon.io',
			isCurrentUser: false,
		},
		url: 'https://sales-playbook.pantheonsite.io',
		status: 'Inactive' as const,
	},
	{
		id: '16',
		name: 'Community Forum',
		thumbnailUrl: null,
		owner: {
			name: 'Nicole Thompson',
			email: 'nthompson@harvard.edu',
			isCurrentUser: false,
		},
		url: 'https://forum.harvard.edu',
		status: 'Active' as const,
	},
	{
		id: '17',
		name: 'Travel Booking Site',
		thumbnailUrl: null,
		owner: {
			name: 'Daniel Kim',
			email: 'dkim@amtrak.com',
			isCurrentUser: false,
		},
		url: 'https://booking.amtrak.com',
		status: 'Active' as const,
	},
	{
		id: '18',
		name: 'Email Templates',
		thumbnailUrl: null,
		owner: {
			name: 'Rachel Green',
			email: 'rgreen@pantheon.io',
			isCurrentUser: false,
		},
		url: 'https://email-templates.pantheonsite.io',
		status: 'Inactive' as const,
	},
	{
		id: '19',
		name: 'Agency Portfolio',
		thumbnailUrl: null,
		owner: {
			name: 'Tom Harris',
			email: 'tharris@humanmade.com',
			isCurrentUser: false,
		},
		url: 'https://portfolio.humanmade.com',
		status: 'Active' as const,
	},
	{
		id: '20',
		name: 'Research Database',
		thumbnailUrl: null,
		owner: {
			name: 'Sophie Turner',
			email: 'sturner@umich.edu',
			isCurrentUser: false,
		},
		url: 'https://research.umich.edu',
		status: 'Active' as const,
	},
	{
		id: '21',
		name: 'Brand Refresh Project',
		thumbnailUrl: null,
		owner: {
			name: 'Alex Cooper',
			email: 'acooper@pantheon.io',
			isCurrentUser: false,
		},
		url: 'https://brand-refresh.pantheonsite.io',
		status: 'Inactive' as const,
	},
	{
		id: '22',
		name: 'Corporate Website',
		thumbnailUrl: null,
		owner: {
			name: 'Jennifer Davis',
			email: 'jdavis@acme.com',
			isCurrentUser: false,
		},
		url: 'https://www.acme.com',
		status: 'Active' as const,
	},
	{
		id: '23',
		name: 'Alumni Network',
		thumbnailUrl: null,
		owner: {
			name: 'Matthew Scott',
			email: 'mscott@harvard.edu',
			isCurrentUser: false,
		},
		url: 'https://alumni.harvard.edu',
		status: 'Active' as const,
	},
	{
		id: '24',
		name: 'API Reference Docs',
		thumbnailUrl: null,
		owner: {
			name: 'Olivia Parker',
			email: 'oparker@pantheon.io',
			isCurrentUser: false,
		},
		url: 'https://api-docs.pantheonsite.io',
		status: 'Inactive' as const,
	},
	{
		id: '25',
		name: 'Events Calendar',
		thumbnailUrl: null,
		owner: {
			name: 'Jane Doe',
			email: 'jane.doe@pantheon.io',
			isCurrentUser: true,
		},
		url: 'https://events.pantheonsite.io',
		status: 'Active' as const,
	},
	{
		id: '26',
		name: 'Mobile App Landing',
		thumbnailUrl: null,
		owner: {
			name: 'Brian Foster',
			email: 'bfoster@humanmade.com',
			isCurrentUser: false,
		},
		url: 'https://app.example.com',
		status: 'Active' as const,
	},
	{
		id: '27',
		name: 'Training Materials',
		thumbnailUrl: null,
		owner: {
			name: 'Emma Watson',
			email: 'ewatson@pantheon.io',
			isCurrentUser: false,
		},
		url: 'https://training.pantheonsite.io',
		status: 'Inactive' as const,
	},
	{
		id: '28',
		name: 'Student Resources',
		thumbnailUrl: null,
		owner: {
			name: 'William Clark',
			email: 'wclark@ucdavis.edu',
			isCurrentUser: false,
		},
		url: 'https://resources.ucdavis.edu',
		status: 'Active' as const,
	},
	{
		id: '29',
		name: 'Online Store',
		thumbnailUrl: null,
		owner: {
			name: 'Laura Mitchell',
			email: 'lmitchell@acme.com',
			isCurrentUser: false,
		},
		url: 'https://store.acme.com',
		status: 'Active' as const,
	},
	{
		id: '30',
		name: 'HR Resources',
		thumbnailUrl: null,
		owner: {
			name: 'Ryan Phillips',
			email: 'rphillips@pantheon.io',
			isCurrentUser: false,
		},
		url: 'https://hr-resources.pantheonsite.io',
		status: 'Inactive' as const,
	},
	{
		id: '31',
		name: 'Faculty Directory',
		thumbnailUrl: null,
		owner: {
			name: 'Hannah Adams',
			email: 'hadams@umich.edu',
			isCurrentUser: false,
		},
		url: 'https://faculty.umich.edu',
		status: 'Active' as const,
	},
	{
		id: '32',
		name: 'Trip Planner',
		thumbnailUrl: null,
		owner: {
			name: 'Marcus Bell',
			email: 'mbell@amtrak.com',
			isCurrentUser: false,
		},
		url: 'https://planner.amtrak.com',
		status: 'Active' as const,
	},
	{
		id: '33',
		name: 'Customer Stories',
		thumbnailUrl: null,
		owner: {
			name: 'Victoria Lee',
			email: 'vlee@pantheon.io',
			isCurrentUser: false,
		},
		url: 'https://customer-stories.pantheonsite.io',
		status: 'Inactive' as const,
	},
	{
		id: '34',
		name: 'Press Room',
		thumbnailUrl: null,
		owner: {
			name: 'George Hall',
			email: 'ghall@acme.com',
			isCurrentUser: false,
		},
		url: 'https://press.acme.com',
		status: 'Active' as const,
	},
	{
		id: '35',
		name: 'Campus Map',
		thumbnailUrl: null,
		owner: {
			name: 'Sophia Robinson',
			email: 'srobinson@harvard.edu',
			isCurrentUser: false,
		},
		url: 'https://map.harvard.edu',
		status: 'Active' as const,
	},
	{
		id: '36',
		name: 'Mobile App Content',
		thumbnailUrl: null,
		owner: {
			name: 'Nathan Young',
			email: 'nyoung@pantheon.io',
			isCurrentUser: false,
		},
		url: 'https://mobile-app-content.pantheonsite.io',
		status: 'Inactive' as const,
	},
	{
		id: '37',
		name: 'Client Showcase',
		thumbnailUrl: null,
		owner: {
			name: 'Isabella King',
			email: 'iking@humanmade.com',
			isCurrentUser: false,
		},
		url: 'https://showcase.humanmade.com',
		status: 'Active' as const,
	},
	{
		id: '38',
		name: 'Library Catalog',
		thumbnailUrl: null,
		owner: {
			name: 'Andrew Wright',
			email: 'awright@ucdavis.edu',
			isCurrentUser: false,
		},
		url: 'https://library.ucdavis.edu',
		status: 'Active' as const,
	},
	{
		id: '39',
		name: 'Press Kit',
		thumbnailUrl: null,
		owner: {
			name: 'Mia Lopez',
			email: 'mlopez@pantheon.io',
			isCurrentUser: false,
		},
		url: 'https://press-kit.pantheonsite.io',
		status: 'Inactive' as const,
	},
	{
		id: '40',
		name: 'Help Center',
		thumbnailUrl: null,
		owner: {
			name: 'Jane Doe',
			email: 'jane.doe@pantheon.io',
			isCurrentUser: true,
		},
		url: 'https://help.pantheonsite.io',
		status: 'Active' as const,
	},
	{
		id: '41',
		name: 'Investor Relations',
		thumbnailUrl: null,
		owner: {
			name: 'Charles Hill',
			email: 'chill@acme.com',
			isCurrentUser: false,
		},
		url: 'https://investors.acme.com',
		status: 'Active' as const,
	},
	{
		id: '42',
		name: 'Dashboard UI Copy',
		thumbnailUrl: null,
		owner: {
			name: 'Grace Turner',
			email: 'gturner@pantheon.io',
			isCurrentUser: false,
		},
		url: 'https://dashboard-ui.pantheonsite.io',
		status: 'Inactive' as const,
	},
	{
		id: '43',
		name: 'Admissions Portal',
		thumbnailUrl: null,
		owner: {
			name: 'Joseph Campbell',
			email: 'jcampbell@umich.edu',
			isCurrentUser: false,
		},
		url: 'https://admissions.umich.edu',
		status: 'Active' as const,
	},
	{
		id: '44',
		name: 'Route Schedules',
		thumbnailUrl: null,
		owner: {
			name: 'Ava Martinez',
			email: 'amartinez@amtrak.com',
			isCurrentUser: false,
		},
		url: 'https://schedules.amtrak.com',
		status: 'Active' as const,
	},
	{
		id: '45',
		name: 'Legal Templates',
		thumbnailUrl: null,
		owner: {
			name: 'Ethan Baker',
			email: 'ebaker@pantheon.io',
			isCurrentUser: false,
		},
		url: 'https://legal-templates.pantheonsite.io',
		status: 'Inactive' as const,
	},
	{
		id: '46',
		name: 'Case Studies',
		thumbnailUrl: null,
		owner: {
			name: 'Chloe Adams',
			email: 'cadams@humanmade.com',
			isCurrentUser: false,
		},
		url: 'https://cases.humanmade.com',
		status: 'Active' as const,
	},
	{
		id: '47',
		name: 'Department Sites',
		thumbnailUrl: null,
		owner: {
			name: 'Lucas Nelson',
			email: 'lnelson@harvard.edu',
			isCurrentUser: false,
		},
		url: 'https://departments.harvard.edu',
		status: 'Active' as const,
	},
	{
		id: '48',
		name: 'Landing Pages',
		thumbnailUrl: null,
		owner: {
			name: 'Zoe Carter',
			email: 'zcarter@pantheon.io',
			isCurrentUser: false,
		},
		url: 'https://landing-pages.pantheonsite.io',
		status: 'Inactive' as const,
	},
	{
		id: '49',
		name: 'Product Training',
		thumbnailUrl: null,
		owner: {
			name: 'Mason Rivera',
			email: 'mrivera@acme.com',
			isCurrentUser: false,
		},
		url: 'https://training.acme.com',
		status: 'Active' as const,
	},
	{
		id: '50',
		name: 'Course Management',
		thumbnailUrl: null,
		owner: {
			name: 'Ella Collins',
			email: 'ecollins@ucdavis.edu',
			isCurrentUser: false,
		},
		url: 'https://courses.ucdavis.edu',
		status: 'Active' as const,
	},
];

export default function ContentBranching() {
	const [searchQuery, setSearchQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');
	const [displayedCount, setDisplayedCount] = useState(10);
	const [isLoading, setIsLoading] = useState(false);
	const loadMoreRef = useRef<HTMLDivElement>(null);

	// Filter collections based on search and status
	const filteredCollections = useMemo(() => {
		return mockCollections.filter((collection) => {
			// Search filter
			const matchesSearch =
				searchQuery === '' ||
				collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				collection.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
				collection.owner.email
					.toLowerCase()
					.includes(searchQuery.toLowerCase());

			// Status filter
			const matchesStatus =
				statusFilter === 'all' ||
				collection.status.toLowerCase() === statusFilter.toLowerCase();

			return matchesSearch && matchesStatus;
		});
	}, [searchQuery, statusFilter]);

	// Get displayed collections (only show up to displayedCount)
	const displayedCollections = useMemo(() => {
		return filteredCollections.slice(0, displayedCount);
	}, [filteredCollections, displayedCount]);

	// Check if there are more collections to load
	const hasMore = displayedCount < filteredCollections.length;

	// Load more collections
	const loadMore = useCallback(() => {
		if (isLoading || !hasMore) return;

		setIsLoading(true);
		// Simulate loading delay
		setTimeout(() => {
			setDisplayedCount((prev) => prev + 10);
			setIsLoading(false);
		}, 300);
	}, [isLoading, hasMore]);

	// Set up Intersection Observer for infinite scroll
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore && !isLoading) {
					loadMore();
				}
			},
			{ threshold: 0.1, rootMargin: '200px' },
		);

		const currentRef = loadMoreRef.current;
		if (currentRef) {
			observer.observe(currentRef);
		}

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef);
			}
		};
	}, [hasMore, isLoading, loadMore]);

	// Reset displayed count when filters change
	useEffect(() => {
		setDisplayedCount(10);
	}, [searchQuery, statusFilter]);

	return (
		<GlobalWrapper>
			<DashboardGlobal
				sidebarToggleLabel='Toggle sidebar'
				skiplinkText='Skip to content'
			>
				{/* Sidebar Navigation */}
				<DashboardNav
					slot='sidebar'
					ariaLabel='Dashboard Navigation'
					menuItems={dashboardNavItems}
				/>

				{/* Top Navbar */}
				<Navbar
					slot='header'
					hideBorder
					hideLogo
					colorType='transparent'
					containerWidth='full'
				>
					<DashboardSearch
						slot='items-right'
						id='dashboard-search'
						label='Search sites'
						placeholder='Search sites'
						siteList={sampleSites}
					/>
					<MenuButton
						slot='items-right'
						id='help-menu-button'
						label='Help'
						menuItems={helpMenuItems}
						variant='navbar'
					/>
					<div slot='items-right'>
						<SpacesMenu
							userName='Jane Doe'
							userEmail='janedoe123@pantheon.io'
							userAvatar='/logos/user-profile.svg'
							currentSpace={currentSpace}
							otherSpaces={otherSpaces}
						/>
					</div>
				</Navbar>

				{/* Main Content Area */}
				<DashboardInner slot='main'>
					<div slot='content' className={styles.mainContent}>
						{/* Two-column layout */}
						<div className={styles.twoColumnLayout}>
							{/* LEFT COLUMN */}
							<div className={styles.leftColumn}>
								{/* Collections heading */}
								<h1 className={styles.pageTitle}>Collections</h1>

								{/* Filters Row with Search + Status + Button */}
								<div className={styles.filtersRow}>
									<div className={styles.searchInput}>
										<TextInput
											id='collections-search'
											label='Search collections'
											type='search'
											searchIcon='search'
											placeholder='Search collections by name, URL, or account'
											hasClearButton={true}
											showLabel={false}
											value={searchQuery}
											onChange={(e) => setSearchQuery(e.target.value)}
										/>
									</div>
									<div className={styles.statusFilter}>
										<Select
											id='status-filter'
											label='Status'
											options={[
												{ label: 'All statuses', value: 'all' },
												{ label: 'Active', value: 'active' },
												{ label: 'Inactive', value: 'inactive' },
											]}
											value={statusFilter}
											onOptionSelect={(option) => setStatusFilter(option.value)}
											showLabel={false}
										/>
									</div>
									<Button
										label='+ New collection'
										variant='primary'
										size='md'
									/>
								</div>

								{/* Collections Grid */}
								<div className={styles.collectionsGrid}>
									{displayedCollections.map((collection) => (
										<div key={collection.id} className={styles.collectionCard}>
											{/* Thumbnail */}
											<div className={styles.thumbnail}>
												<svg
													width='124'
													height='80'
													viewBox='0 0 124 80'
													fill='none'
													xmlns='http://www.w3.org/2000/svg'
												>
													<path
														d='M0 3C0 1.34315 1.34315 0 3 0H121C122.657 0 124 1.34315 124 3V77C124 78.6569 122.657 80 121 80H3C1.34314 80 0 78.6569 0 77V3Z'
														fill='#F4F4F4'
													/>
													<path
														d='M92 64.7773H32V14.5H92V64.7773ZM33.4639 63.3135H90.5361V25.7266H33.4639V63.3135ZM47.3662 59.7988H37.6094V58.334H47.3662V59.7988ZM71.7559 59.7988H52.2432V58.334H71.7559V59.7988ZM86.374 59.0664H76.6182V47.3516H86.374V59.0664ZM78.0811 57.6016H84.9102V48.8154H78.0811V57.6016ZM71.7559 52.3955V53.8594H37.6094V52.3955H71.7559ZM57.1221 48.002H37.6094V46.5381H57.1221V48.002ZM71.7559 48.002H62V46.5381H71.7559V48.002ZM71.7559 41.4287H37.6094V29.7139H71.7559V41.4287ZM86.374 41.4287H76.6182V29.7139H86.374V41.4287ZM39.0732 39.9639H70.293V31.1777H39.0732V39.9639ZM78.0811 39.9639H84.9102V31.1777H78.0811V39.9639ZM33.4639 24.2627H90.5361V15.9648H33.4639V24.2627ZM37.6094 18.8936C38.2828 18.8936 38.829 19.4394 38.8291 20.1133C38.8291 20.7872 38.2829 21.334 37.6094 21.334C36.936 21.3338 36.3906 20.7871 36.3906 20.1133C36.3907 19.4395 36.9361 18.8938 37.6094 18.8936ZM42.4873 18.8936C43.1607 18.8936 43.7069 19.4394 43.707 20.1133C43.707 20.7872 43.1608 21.334 42.4873 21.334C41.8139 21.3339 41.2676 20.7872 41.2676 20.1133C41.2677 19.4395 41.814 18.8937 42.4873 18.8936ZM47.3818 18.8936C48.0553 18.8936 48.6015 19.4394 48.6016 20.1133C48.6016 20.7872 48.0554 21.334 47.3818 21.334C46.7083 21.334 46.1621 20.7872 46.1621 20.1133C46.1622 19.4394 46.7084 18.8936 47.3818 18.8936Z'
														fill='#C3C5C9'
													/>
												</svg>
											</div>

											{/* Content Area - Single vertical container */}
											<div className={styles.contentArea}>
												<h3 className={styles.collectionName}>
													{collection.name}
												</h3>

												<div className={styles.ownerInfo}>
													<Avatar
														uniqueId={collection.owner.email}
														size='sm'
														hasUserFallback={true}
													/>
													<div className={styles.ownerDetails}>
														<div className={styles.ownerName}>
															{collection.owner.name}
															{collection.owner.isCurrentUser && ' (You)'}
														</div>
														<div className={styles.ownerEmail}>
															{collection.owner.email}
														</div>
													</div>
												</div>

												<div className={styles.divider}></div>

												<div className={styles.bottomRow}>
													<div className={styles.linkWrapper}>
														<LinkNewWindow url={collection.url} fontSize='sm'>
															{collection.url}
														</LinkNewWindow>
													</div>
													<StatusIndicator
														label={collection.status}
														type={
															collection.status === 'Active'
																? 'success'
																: 'neutral'
														}
														size='sm'
													/>
												</div>
											</div>
										</div>
									))}
								</div>

								{/* Loading indicator and observer target */}
								{hasMore && (
									<div ref={loadMoreRef} className={styles.loadMoreTrigger}>
										{isLoading && (
											<div className={styles.loadingMessage}>
												Loading more collections...
											</div>
										)}
									</div>
								)}

								{/* No more collections message */}
								{!hasMore && displayedCollections.length > 0 && (
									<div className={styles.endMessage}>
										All collections loaded ({displayedCollections.length} total)
									</div>
								)}
							</div>

							{/* RIGHT COLUMN */}
							<div className={styles.rightColumn}>
								{/* Outer Sunken Panel */}
								<Panel variant='sunken' padding='m'>
									<div className={styles.usagePanelContainer}>
										{/* White Panel 1: Usage + Plan Capacity */}
										<Panel variant='default' padding='l'>
											<div className={styles.whitePanel}>
												{/* Usage Header with View Details button */}
												<div className={styles.usageHeader}>
													<div className={styles.usageInfo}>
														<div className={styles.boldM}>Usage</div>
														<p className={styles.subtext}>Free plan</p>
													</div>
													<Button
														label='View Details'
														variant='secondary'
														size='sm'
													/>
												</div>

												{/* Plan Capacity */}
												<div className={styles.capacitySection}>
													<div className={styles.capacityHeader}>
														<span
															className={`${styles.subtext} ${styles.capacityHeaderText}`}
														>
															Plan Capacity
														</span>
														<div className={styles.capacityHeaderDivider}></div>
													</div>
													<div className={styles.capacityList}>
														<div className={styles.capacityRow}>
															<span className={styles.capacityLabel}>
																Collections:
															</span>
															<div className={styles.capacityValue}>
																<span
																	className={`${styles.valueText} ${styles.valueAtLimit}`}
																>
																	1/1
																</span>
																<div className={styles.progressBarWrapper}>
																	<ProgressBar
																		percentage={100}
																		label='Collections usage'
																		colorBreakpoints={[
																			{ colorType: 'critical', percentage: 0 },
																		]}
																		showLabel={false}
																		showPercentage={false}
																		size='sm'
																	/>
																</div>
															</div>
														</div>
														<div className={styles.capacityRow}>
															<span className={styles.capacityLabel}>
																Docs:
															</span>
															<div className={styles.capacityValue}>
																<span className={styles.valueText}>30/50</span>
																<div className={styles.progressBarWrapper}>
																	<ProgressBar
																		percentage={60}
																		label='Docs usage'
																		colorBreakpoints={[
																			{ colorType: 'success', percentage: 0 },
																		]}
																		showLabel={false}
																		showPercentage={false}
																		size='sm'
																	/>
																</div>
															</div>
														</div>
														<div className={styles.capacityRow}>
															<span className={styles.capacityLabel}>
																Administrator seats:
															</span>
															<div className={styles.capacityValue}>
																<span
																	className={`${styles.valueText} ${styles.valueAtLimit}`}
																>
																	1/1
																</span>
																<div className={styles.progressBarWrapper}>
																	<ProgressBar
																		percentage={100}
																		label='Administrator seats usage'
																		colorBreakpoints={[
																			{ colorType: 'critical', percentage: 0 },
																		]}
																		showLabel={false}
																		showPercentage={false}
																		size='sm'
																	/>
																</div>
															</div>
														</div>
														<div className={styles.capacityRow}>
															<span className={styles.capacityLabel}>
																Contributor seats:
															</span>
															<div className={styles.capacityValue}>
																<span className={styles.valueText}>0/5</span>
																<div className={styles.progressBarWrapper}>
																	<ProgressBar
																		percentage={0}
																		label='Contributor seats usage'
																		colorBreakpoints={[
																			{ colorType: 'neutral', percentage: 0 },
																		]}
																		showLabel={false}
																		showPercentage={false}
																		size='sm'
																	/>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</Panel>

										{/* White Panel 2: Want to connect your site */}
										<Panel variant='default' padding='l'>
											<div className={styles.whitePanel}>
												<div className={styles.boldM}>
													Want to connect your site?
												</div>
												<p className={styles.subtext}>
													You can connect any site like WordPress, Drupal,
													Next.js, or other technologies.
												</p>
												<CTALink
													linkContent={<a href='#'>Learn how</a>}
													size='sm'
												/>
											</div>
										</Panel>

										{/* White Panel 3: Get Content Publisher */}
										<Panel variant='default' padding='l'>
											<div className={styles.whitePanel}>
												<div className={styles.boldM}>
													Get Content Publisher
												</div>
												<div className={styles.publisherLinks}>
													<div className={styles.linkWithIcon}>
														<svg
															width='18'
															height='18'
															viewBox='0 0 18 18'
															fill='none'
															xmlns='http://www.w3.org/2000/svg'
														>
															<path
																d='M9.18359 7.36365V10.8491H14.1261C13.9091 11.97 13.2578 12.9192 12.281 13.5573L15.2615 15.8237C16.9981 14.2529 18 11.9456 18 9.20466C18 8.56648 17.9415 7.95278 17.833 7.36375L9.18359 7.36365Z'
																fill='#4285F4'
															/>
															<path
																d='M4.03705 10.7131L3.36482 11.2174L0.985352 13.0337C2.4965 15.971 5.5937 18.0001 9.1837 18.0001C11.6633 18.0001 13.7421 17.1983 15.2616 15.8238L12.2811 13.5574C11.4629 14.0974 10.4193 14.4247 9.1837 14.4247C6.79593 14.4247 4.76721 12.8456 4.0408 10.7183L4.03705 10.7131Z'
																fill='#34A853'
															/>
															<path
																d='M0.985097 4.96637C0.358965 6.17724 0 7.54363 0 8.99997C0 10.4563 0.358965 11.8227 0.985097 13.0336C0.985097 13.0417 4.04084 10.7099 4.04084 10.7099C3.85717 10.1699 3.7486 9.59723 3.7486 8.99988C3.7486 8.40253 3.85717 7.82983 4.04084 7.28983L0.985097 4.96637Z'
																fill='#FBBC05'
															/>
															<path
																d='M9.21709 3.58365C10.5696 3.58365 11.7718 4.04183 12.732 4.92548L15.3618 2.34823C13.7672 0.891879 11.6967 0 9.21709 0C5.6271 0 2.5297 2.02092 1.01855 4.9664L4.07421 7.29005C4.80052 5.16274 6.82932 3.58365 9.21709 3.58365Z'
																fill='#EA4335'
															/>
														</svg>
														<CTALink
															linkContent={<a href='#'>Try with Google Docs</a>}
															size='sm'
														/>
													</div>
													<div className={styles.linkWithIcon}>
														<svg
															width='18'
															height='18'
															viewBox='0 0 18 18'
															fill='none'
															xmlns='http://www.w3.org/2000/svg'
														>
															<g clipPath='url(#clip0_69_6927)'>
																<path
																	d='M18.0003 0H9.37793V8.62232H18.0003V0Z'
																	fill='#80BC06'
																/>
																<path
																	d='M8.62232 0H0V8.62232H8.62232V0Z'
																	fill='#F25325'
																/>
																<path
																	d='M8.62232 9.37769H0V18H8.62232V9.37769Z'
																	fill='#05A6F0'
																/>
																<path
																	d='M9.37793 9.37769H18.0003V18H9.37793V9.37769Z'
																	fill='#FEBA08'
																/>
															</g>
															<defs>
																<clipPath id='clip0_69_6927'>
																	<rect width='18' height='18' fill='white' />
																</clipPath>
															</defs>
														</svg>
														<CTALink
															linkContent={
																<a href='#'>Try with Microsoft Word</a>
															}
															size='sm'
														/>
													</div>
												</div>
											</div>
										</Panel>
									</div>
								</Panel>
							</div>
						</div>
					</div>
				</DashboardInner>

				{/* Footer */}
				<SiteFooter
					slot='footer'
					containerWidth='full'
					legalLinks={[
						'privacy',
						'cookiePolicy',
						'termsOfUse',
						'acceptableUse',
						'accessibilityStatement',
					]}
				/>
			</DashboardGlobal>
		</GlobalWrapper>
	);
}
