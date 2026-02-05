'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { ProjectMetadata, STATUS_CONFIG } from '@/types/project';
import {
	ButtonLink,
	EmptyStateCard,
	IndicatorBadge,
	Table,
} from '@pantheon-systems/pds-toolkit-react';

import { PageHeader, PageLayout } from './components';

import styles from './page.module.css';

function formatDate(isoString: string): string {
	const date = new Date(isoString);
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
}

export default function HomePage() {
	const [projects, setProjects] = useState<ProjectMetadata[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadProjects() {
			try {
				const response = await fetch('/api/projects');
				const data = await response.json();
				setProjects(data);
			} catch (error) {
				console.error('Error loading projects:', error);
			} finally {
				setLoading(false);
			}
		}
		loadProjects();
	}, []);

	// Prepare table headers
	const headers = [
		{ title: 'Title' },
		{ title: 'Description' },
		{ title: 'Creator' },
		{ title: 'Status' },
		{ title: 'Template' },
		{ title: 'Created' },
		{ title: 'Last Updated' },
		{ title: 'Action' },
	];

	// Prepare table row data
	const rowData = projects.map((project) => [
		<strong key={`${project.id}-title`}>{project.title}</strong>,
		<span key={`${project.id}-desc`} className={styles.descriptionCell}>
			{project.description}
		</span>,
		project.creator,
		<IndicatorBadge
			key={`${project.id}-status`}
			color={STATUS_CONFIG[project.status].color}
			label={STATUS_CONFIG[project.status].label}
			size='sm'
		/>,
		<span key={`${project.id}-template`} className={styles.templateBadge}>
			{project.template}
		</span>,
		formatDate(project.createdDate),
		formatDate(project.lastUpdated),
		<ButtonLink
			key={`${project.id}-action`}
			linkContent={<Link href={`/projects/${project.id}`}>View</Link>}
			size='sm'
			variant='secondary'
		/>,
	]);

	return (
		<PageLayout>
			<PageHeader
				description='Interactive prototypes built by designers using the PDS Prototypes playground. Each project is a self-contained page within this prototype environment, created with Claude Code.'
				title='Projects'
			/>

			{loading ? (
				<p>Loading projects...</p>
			) : projects.length === 0 ? (
				<EmptyStateCard
					headingText='No projects yet'
					linkContent={
						<div className={styles.emptyStateCta}>
							<code className={styles.code}>npm run new</code>
						</div>
					}
					summary='Create your first project to get started with prototyping. Run the command below in your terminal.'
				/>
			) : (
				<div className={styles.projectsSection}>
					<Table headers={headers} rowData={rowData} />
				</div>
			)}

			<footer className={styles.footer}>
				<p>
					To create a new project, run <code>npm run new</code> in your terminal
				</p>
			</footer>
		</PageLayout>
	);
}
