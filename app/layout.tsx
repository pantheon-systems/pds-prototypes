import type { Metadata } from 'next';

import { aleo, inter, poppins, sourceCodePro } from './fonts';

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
		<html
			className={`${poppins.variable} ${inter.variable} ${aleo.variable} ${sourceCodePro.variable}`}
			lang='en'
		>
			<body>{children}</body>
		</html>
	);
}
