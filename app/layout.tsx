import type { Metadata } from 'next';

import FontPreconnect from './FontPreconnect';

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
			<body>
				<FontPreconnect />
				{children}
			</body>
		</html>
	);
}
