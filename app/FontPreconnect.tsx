'use client';

import { useEffect } from 'react';

export default function FontPreconnect() {
	useEffect(() => {
		// Add preconnect links for Google Fonts if not already present
		if (!document.querySelector('link[href="https://fonts.googleapis.com"]')) {
			const link1 = document.createElement('link');
			link1.rel = 'preconnect';
			link1.href = 'https://fonts.googleapis.com';
			document.head.appendChild(link1);

			const link2 = document.createElement('link');
			link2.rel = 'preconnect';
			link2.href = 'https://fonts.gstatic.com';
			link2.crossOrigin = 'anonymous';
			document.head.appendChild(link2);
		}
	}, []);

	return null;
}
