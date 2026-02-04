'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { ProjectMetadata, STATUS_CONFIG } from '@/types/project';
import {
	ButtonLink,
	IconButton,
	IndicatorBadge,
} from '@pantheon-systems/pds-toolkit-react';

import styles from './page.module.css';

interface ProjectHeaderProps {
	metadata: ProjectMetadata;
	template: string;
}

export default function ProjectHeader({
	metadata,
	template,
}: ProjectHeaderProps) {
	const [isHidden, setIsHidden] = useState(false);

	// Load hidden state from localStorage
	useEffect(() => {
		const saved = localStorage.getItem('projectHeaderHidden');
		if (saved !== null) {
			setIsHidden(saved === 'true');
		}
	}, []);

	// Save hidden state to localStorage
	const toggleHeader = (e: React.MouseEvent<HTMLButtonElement>) => {
		const newState = !isHidden;
		setIsHidden(newState);
		localStorage.setItem('projectHeaderHidden', String(newState));

		// Remove focus when hiding so button becomes invisible
		if (newState) {
			e.currentTarget.blur();
		}
	};

	const headerClass =
		template === 'dashboard'
			? styles.projectHeaderDashboard
			: styles.projectHeaderDefault;

	return (
		<div className={styles.headerWrapper}>
			<nav
				className={`${styles.projectHeader} ${headerClass} ${isHidden ? styles.projectHeaderHidden : ''}`}
			>
				<div className={styles.projectHeaderLeft}>
					<ButtonLink
						displayType='icon-start'
						iconName='angleLeft'
						linkContent={<Link href='/'>Back to Projects</Link>}
						size='sm'
						variant='subtle'
					/>
				</div>

				<div className={styles.projectHeaderRight}>
					<span className={styles.projectTitle}>{metadata.title}</span>
					<span className={styles.metaSeparator}>•</span>
					<span className={styles.projectCreator}>{metadata.creator}</span>
					<span className={styles.metaSeparator}>•</span>
					<IndicatorBadge
						color={STATUS_CONFIG[metadata.status].color}
						label={STATUS_CONFIG[metadata.status].label}
						size='sm'
					/>
				</div>
			</nav>

			<div
				className={`${styles.projectHeaderToggle} ${isHidden ? styles.toggleHidden : ''}`}
			>
				<IconButton
					ariaLabel={isHidden ? 'Show project info' : 'Hide project info'}
					iconName={isHidden ? 'angleDown' : 'angleUp'}
					onClick={toggleHeader}
					size='sm'
				/>
			</div>
		</div>
	);
}
