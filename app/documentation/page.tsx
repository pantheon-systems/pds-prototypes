'use client';

import Link from 'next/link';

import { EmptyStateCard } from '@pantheon-systems/pds-toolkit-react';

import { PageHeader, PageLayout } from '../components';

import styles from './page.module.css';

const docs = [
	{
		title: 'Project README',
		description: 'Quick start guide, setup instructions, and project overview.',
		href: 'https://github.com/pantheon-systems/pds-prototypes/blob/main/README.md',
		isExternal: true,
	},
	{
		title: 'Claude Desktop Setup',
		description: 'Install Claude Desktop and configure the PDS MCP server.',
		path: '/documentation/claude-desktop-setup',
		isExternal: false,
	},
	{
		title: 'PDS Toolkit React',
		description:
			'Official PDS component library documentation with interactive examples and API reference.',
		href: 'https://pds-react.pantheon.io/',
		isExternal: true,
	},
];

export default function DocumentationPage() {
	return (
		<PageLayout>
			<PageHeader
				description='Guides and references for the PDS Prototypes playground.'
				title='Documentation'
			/>

			<div className={styles.docGrid}>
				{docs.map((doc) => (
					<EmptyStateCard
						key={doc.title}
						headingText={doc.title}
						isLinkExternal={doc.isExternal}
						linkContent={
							doc.isExternal ? (
								<a href={doc.href} rel='noopener noreferrer' target='_blank'>
									View Documentation
								</a>
							) : (
								<Link href={doc.path!}>View Guide</Link>
							)
						}
						summary={doc.description}
					/>
				))}
			</div>
		</PageLayout>
	);
}
