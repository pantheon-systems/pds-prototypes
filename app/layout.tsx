import type { Metadata } from 'next';

import '@pantheon-systems/pds-toolkit-react/css/pds-core.css';
import './globals.css';

export const metadata: Metadata = {
	title: 'PDS Prototypes',
	description: 'Designer prototyping playground using Pantheon Design System',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<head>
				<link href='https://fonts.googleapis.com' rel='preconnect' />
				<link
					crossOrigin='anonymous'
					href='https://fonts.gstatic.com'
					rel='preconnect'
				/>
			</head>
			<body>{children}</body>
		</html>
	);
}
