'use client';

import { useState } from 'react';
import { Avatar, Button, TextInput } from '@pantheon-systems/pds-toolkit-react';
import styles from './SpacesMenu.module.css';

interface Space {
	id: string;
	name: string;
	logo: string;
	isCurrent?: boolean;
}

interface SpacesMenuProps {
	userName: string;
	userEmail: string;
	userAvatar: string;
	currentSpace: Space;
	otherSpaces: Space[];
}

export function SpacesMenu({
	userName,
	userEmail,
	userAvatar,
	currentSpace,
	otherSpaces,
}: SpacesMenuProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');

	const filteredSpaces = otherSpaces.filter((space) =>
		space.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<div className={styles.container}>
			<button
				className={styles.trigger}
				onClick={() => setIsOpen(!isOpen)}
				aria-label='User menu'
			>
				<Avatar size='md' uniqueId='janedoe123@pantheon.io' />
			</button>

			{isOpen && (
				<>
					<div className={styles.backdrop} onClick={() => setIsOpen(false)} />
					<div className={styles.menu}>
						{/* User Info Section */}
						<div className={styles.userInfo}>
							<Avatar size='md' uniqueId='janedoe123@pantheon.io' />
							<div className={styles.userDetails}>
								<div className={styles.userName}>{userName}</div>
								<div className={styles.userEmail}>{userEmail}</div>
								<a href='#' className={styles.logoutLink}>
									<svg
										width='16'
										height='16'
										viewBox='0 0 16 16'
										fill='currentColor'
										className={styles.logoutIcon}
									>
										<path d='M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6M10.6667 11.3333L14 8M14 8L10.6667 4.66667M14 8H6' />
									</svg>
									Log out
								</a>
							</div>
						</div>

						{/* Current Space Section */}
						<div className={styles.currentSpaceSection}>
							<div className={styles.sectionLabel}>Current space</div>
							<a href='#' className={styles.spaceItem}>
								<Avatar
									size='sm'
									imageSrc={currentSpace.logo}
									uniqueId={currentSpace.id}
								/>
								<span className={styles.spaceName}>{currentSpace.name}</span>
							</a>
						</div>

						{/* Other Spaces Section */}
						<div className={styles.otherSpacesSection}>
							<div className={styles.sectionLabel}>Other spaces</div>
							<div className={styles.searchWrapper}>
								<TextInput
									id='space-search'
									label='Search'
									placeholder='Search'
									showLabel={false}
									type='search'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
							</div>
							<div className={styles.spacesList}>
								{filteredSpaces.map((space) => (
									<a key={space.id} href='#' className={styles.spaceItem}>
										<Avatar
											size='sm'
											imageSrc={space.logo}
											uniqueId={space.id}
										/>
										<span className={styles.spaceName}>{space.name}</span>
									</a>
								))}
							</div>
						</div>

						{/* Create Space Footer */}
						<div className={styles.footer}>
							<Button
								variant='subtle'
								size='sm'
								displayType='icon-start'
								iconName='plus'
								label='Create your own space'
								onClick={() => console.log('Create space')}
							/>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
