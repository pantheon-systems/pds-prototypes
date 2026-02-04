import { NextResponse } from 'next/server';

import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
	try {
		const metadataPath = path.join(
			process.cwd(),
			'projects',
			'.projects-metadata.json',
		);

		try {
			const content = await fs.readFile(metadataPath, 'utf-8');
			const projects = JSON.parse(content);
			return NextResponse.json(projects);
		} catch {
			return NextResponse.json([]);
		}
	} catch (error) {
		console.error('Error reading projects metadata:', error);
		return NextResponse.json([], { status: 500 });
	}
}
