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
			'Complete starter template for building dashboard prototypes with AppLayout, sidebar navigation, and PDS components. Optimized for Claude Desktop with PDS MCP server.',
		path: '/resources/dashboard',
	},
];

export default function ResourcesPage() {
	return (
		<PageLayout>
			<PageHeader
				description='Template starter code and guidance for creating visual mockups with Claude Desktop. Each resource provides context for the PDS MCP server to generate authentic prototypes using PDS components.'
				title='Claude Desktop Resources'
			/>

			<SectionMessage
				className='pds-mar-block-end-2xl'
				message={
					<>
						Follow the{' '}
						<Link href='/documentation/claude-desktop-setup'>
							Claude Desktop Setup guide
						</Link>{' '}
						to install the app and configure the PDS MCP server.
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
					<strong>Usage:</strong> Share each resource URL directly with Claude
					Desktop or copy the template into your conversation. The PDS MCP
					server provides Claude with direct access to component documentation
					for more accurate mockups.
				</p>
			</footer>
		</PageLayout>
	);
}
