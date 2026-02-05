'use client';

import { GlobalWrapper } from '@pantheon-systems/pds-toolkit-react';

import styles from './page.module.css';

export default function TestProject() {
	return (
		<GlobalWrapper>
			<div className={styles.container}>
				<h2>Test Project</h2>
				<p>
					This is a test project to verify the dynamic routing works correctly.
				</p>
				<p>You can now start building your prototype here!</p>
			</div>
		</GlobalWrapper>
	);
}
