'use client';

import { ButtonLink, Card } from '@pantheon-systems/pds-toolkit-react';

import { PageHeader, PageLayout } from '../components';

import styles from './page.module.css';

const docs = [
	{
		title: 'PDS Toolkit React',
		description:
			'Official PDS component library documentation with interactive examples and API reference.',
		href: 'https://pds-react.pantheon.io/',
	},
	{
		title: 'Project README',
		description: 'Quick start guide, setup instructions, and project overview.',
		href: 'https://github.com/pantheon-systems/pds-prototypes/blob/main/README.md',
	},
];

export default function DocumentationPage() {
	return (
		<PageLayout>
			<PageHeader
				description='Guides and references for working with the PDS Prototypes playground.'
				title='Documentation'
			/>

			<div className={styles.docGrid}>
				{docs.map((doc) => (
					<Card key={doc.title} className={styles.docCard}>
						<h2 className='pds-ts-xl pds-mar-block-end-m'>{doc.title}</h2>
						<p className='pds-mar-block-end-l'>{doc.description}</p>
						<div className={styles.cardActions}>
							<ButtonLink
								linkContent={
									<a href={doc.href} rel='noopener noreferrer' target='_blank'>
										View Documentation
									</a>
								}
								variant='primary'
							/>
						</div>
					</Card>
				))}
			</div>
		</PageLayout>
	);
}
