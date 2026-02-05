'use client';

import Link from 'next/link';

import { EmptyStateCard } from '@pantheon-systems/pds-toolkit-react';

import { PageHeader, PageLayout } from '../components';

import styles from './page.module.css';

const resources = [
	{
		id: 'dashboard',
		title: 'Dashboard Template',
		description:
			'Complete starter template for building dashboard prototypes with AppLayout, sidebar navigation, and PDS components.',
		path: '/resources/dashboard',
	},
];

export default function ResourcesPage() {
	return (
		<PageLayout>
			<PageHeader
				description='Complete template starter code and instructions optimized for use with Claude Enterprise. Each resource includes everything you need to start building prototypes using the PDS MCP server.'
				title='Claude Enterprise Resources'
			/>

			<div className={styles.resourceGrid}>
				{resources.map((resource) => (
					<EmptyStateCard
						key={resource.id}
						headingText={resource.title}
						linkContent={<Link href={resource.path}>View Resource</Link>}
						summary={resource.description}
					/>
				))}
			</div>

			<footer className={styles.footer}>
				<p>
					<strong>Usage:</strong> You can either share the resource URL directly
					with Claude Enterprise (it will fetch the content automatically), or
					open the resource page and copy the template code to paste into your
					conversation.
				</p>
			</footer>
		</PageLayout>
	);
}
