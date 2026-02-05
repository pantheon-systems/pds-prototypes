'use client';

import Link from 'next/link';

import {
	EmptyStateCard,
	SectionMessage,
} from '@pantheon-systems/pds-toolkit-react';

import { PageHeader, PageLayout } from '../components';

import styles from './page.module.css';

const resources = [
	{
		id: 'dashboard',
		title: 'Dashboard Template',
		description:
			'Dashboard template with sidebar navigation and PDS components. Optimized for Claude Desktop.',
		path: '/desktop-resources/dashboard',
	},
];

export default function ResourcesPage() {
	return (
		<PageLayout>
			<PageHeader
				description='Create visual mockups with Claude Desktop using PDS component templates.'
				title='Claude Desktop Resources'
			/>

			<SectionMessage
				className='pds-mar-block-end-2xl'
				message={
					<>
						Install Claude Desktop and configure the PDS MCP server with our{' '}
						<Link href='/documentation/claude-desktop-setup'>setup guide</Link>.
					</>
				}
				title='New to Claude Desktop?'
				type='info'
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
					<strong>Usage:</strong> Share the resource URL with Claude Desktop or
					copy the template. The PDS MCP server gives Claude direct access to
					component documentation.
				</p>
			</footer>
		</PageLayout>
	);
}
