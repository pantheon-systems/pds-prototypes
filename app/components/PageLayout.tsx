'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import {
	AppLayout,
	GlobalWrapper,
	Navbar,
	SiteFooter,
} from '@pantheon-systems/pds-toolkit-react';

import { AppNavigation } from './AppNavigation';

import styles from './PageLayout.module.css';

const SIDEBAR_COLLAPSED_KEY = 'pds-prototypes-sidebar-collapsed';

interface PageLayoutProps {
	children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
	// Always start with false to match server-side rendering
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

	// Load saved state from localStorage after mount (client-side only)
	useEffect(() => {
		const saved = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
		if (saved !== null) {
			setSidebarCollapsed(JSON.parse(saved));
		}
	}, []);

	// Save to localStorage whenever state changes
	useEffect(() => {
		localStorage.setItem(
			SIDEBAR_COLLAPSED_KEY,
			JSON.stringify(sidebarCollapsed),
		);
	}, [sidebarCollapsed]);

	const handleSidebarToggle = () => {
		setSidebarCollapsed((prev: boolean) => !prev);
	};

	return (
		<div className={styles.layout}>
			<GlobalWrapper>
				<Navbar
					containerWidth='x-wide'
					logoDisplayType='sub-brand'
					logoLinkContent={<Link href='/'>Home</Link>}
					logoSubBrand='PDS Prototypes'
				/>
				<AppLayout
					hasSidebarToggle
					containerWidth='x-wide'
					isSidebarCollapsed={sidebarCollapsed}
					onSidebarToggle={handleSidebarToggle}
					sidebarExpandedWidthMin={12.75}
				>
					<AppNavigation isSidebarCollapsed={sidebarCollapsed} slot='sidebar' />
					{children}
				</AppLayout>
				<SiteFooter hasTopBorder containerWidth='x-wide' legalLinks={[]} />
			</GlobalWrapper>
		</div>
	);
}
