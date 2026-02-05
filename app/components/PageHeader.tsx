import styles from './PageHeader.module.css';

interface PageHeaderProps {
	description: string;
	title: string;
}

export function PageHeader({ description, title }: PageHeaderProps) {
	return (
		<header className={styles.header}>
			<h1 className='pds-ts-3xl pds-mar-block-end-m'>{title}</h1>
			<p className='pds-ts-l pds-color-fg-default-secondary'>{description}</p>
		</header>
	);
}
