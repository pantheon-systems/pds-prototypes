import { Aleo, Inter, Poppins, Source_Code_Pro } from 'next/font/google';

export const poppins = Poppins({
	weight: ['300', '400', '500', '600', '700'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-poppins',
});

export const inter = Inter({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
});

export const aleo = Aleo({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-aleo',
});

export const sourceCodePro = Source_Code_Pro({
	weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-source-code-pro',
});
