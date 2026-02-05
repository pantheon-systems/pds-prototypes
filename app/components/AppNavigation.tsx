'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
	SideNavGlobal,
	type SideNavGlobalItemProps,
} from '@pantheon-systems/pds-toolkit-react';

interface AppNavigationProps {
	isSidebarCollapsed?: boolean;
	slot?: string;
}

export function AppNavigation({
	isSidebarCollapsed,
	slot,
}: AppNavigationProps) {
	const pathname = usePathname();

	const menuItems: SideNavGlobalItemProps[] = [
		{
			linkContent: <Link href='/'>Projects</Link>,
			isActive: pathname === '/',
			icon: 'folderTree',
		},
		{
			linkContent: <Link href='/desktop-resources'>Desktop Resources</Link>,
			isActive: pathname?.startsWith('/desktop-resources') ?? false,
			icon: 'sparkles',
		},
		{
			linkContent: <Link href='/documentation'>Documentation</Link>,
			isActive: pathname === '/documentation',
			icon: 'books',
		},
	];

	return (
		<SideNavGlobal
			ariaLabel='Main Navigation'
			isSidebarCollapsed={isSidebarCollapsed}
			menuItems={menuItems}
			slot={slot}
		/>
	);
}
