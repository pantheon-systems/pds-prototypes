'use client';

import { useEffect, useState } from 'react';

import {
	ClipboardButton,
	SectionMessage,
} from '@pantheon-systems/pds-toolkit-react';

export function ResourceUsageInstructions() {
	const [currentUrl, setCurrentUrl] = useState('');

	useEffect(() => {
		setCurrentUrl(window.location.href);
	}, []);

	return (
		<SectionMessage
			className='pds-mar-block-end-xl'
			message='Copy this page URL and provide it to Claude Desktop when creating a new design prototype. Claude will use the context from this resource to generate authentic PDS component mockups.'
			title='How to use this resource'
			type='info'
		/>
	);
}
