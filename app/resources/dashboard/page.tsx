'use client';

import Link from 'next/link';

import { PageHeader, PageLayout } from '../../components';

import styles from './page.module.css';

export default function DashboardResourcePage() {
	return (
		<PageLayout>
			<article className={styles.resource}>
				<PageHeader
					description='Complete starter template for building dashboard prototypes with AppLayout, sidebar navigation, and PDS components.'
					title='Dashboard Template'
				/>

				<section className={styles.section}>
					<h2 className='pds-ts-2xl pds-mar-block-end-l'>
						What You&apos;ll Get
					</h2>
					<ul className={styles.list}>
						<li>Complete PDS AppLayout with sidebar and main content area</li>
						<li>Pre-configured GlobalWrapper for PDS component context</li>
						<li>Navbar with branding</li>
						<li>AppNav sidebar with sample navigation items</li>
						<li>Responsive layout ready for your prototype content</li>
						<li>CSS Module setup with PDS design tokens</li>
					</ul>
				</section>

				<section className={styles.section}>
					<h2 className='pds-ts-2xl pds-mar-block-end-l'>Prerequisites</h2>
					<ul className={styles.list}>
						<li>
							<strong>Claude Enterprise</strong> with access to MCP servers
						</li>
						<li>
							<strong>PDS MCP Server configured</strong> - Add the
							pds-toolkit-react MCP server to your Claude configuration
						</li>
						<li>
							<strong>Next.js project</strong> (App Router with TypeScript)
						</li>
					</ul>
				</section>

				<section className={styles.section}>
					<h2 className='pds-ts-2xl pds-mar-block-end-l'>Setting Up PDS MCP</h2>
					<p className='pds-mar-block-end-m'>
						Add the following to your Claude Enterprise MCP configuration:
					</p>
					<pre className={styles.codeBlock}>
						<code>
							{`{
  "mcpServers": {
    "pds-toolkit-react": {
      "command": "npx",
      "args": [
        "-y",
        "@pantheon-systems/pds-toolkit-react-mcp-server@latest"
      ]
    }
  }
}`}
						</code>
					</pre>
				</section>

				<section className={styles.section}>
					<h2 className='pds-ts-2xl pds-mar-block-end-l'>Template Code</h2>

					<h3 className='pds-ts-xl pds-mar-block-end-m'>page.tsx</h3>
					<pre className={styles.codeBlock}>
						<code>
							{`'use client';

import Link from 'next/link';

import {
  AppLayout,
  AppNav,
  Container,
  GlobalWrapper,
  Navbar,
} from '@pantheon-systems/pds-toolkit-react';

import styles from './page.module.css';

// Navigation items for sidebar
const navItems = [
  {
    icon: 'gauge' as const,
    linkContent: <Link href='/'>Dashboard</Link>,
    isActive: true,
  },
  {
    icon: 'folder' as const,
    linkContent: <Link href='/sites'>Sites</Link>,
  },
  {
    icon: 'users' as const,
    linkContent: <Link href='/team'>Team</Link>,
  },
  {
    icon: 'gear' as const,
    linkContent: <Link href='/settings'>Settings</Link>,
  },
];

export default function DashboardPage() {
  return (
    <GlobalWrapper>
      <Navbar
        containerWidth='full'
        logoDisplayType='sub-brand'
        logoSubBrand='Your App Name'
      />
      <AppLayout>
        {/* Sidebar Navigation */}
        <AppNav
          ariaLabel='Main Navigation'
          menuItems={navItems}
          slot='sidebar'
        />

        {/* Main Content Area */}
        <Container
          className='pds-mar-block-3xl'
          slot='main'
          width='x-wide'
        >
          <h1 className='pds-ts-2xl pds-mar-block-end-xl'>
            Dashboard
          </h1>

          {/* Add your prototype content here */}
          <p>Start building your dashboard prototype here.</p>
        </Container>
      </AppLayout>
    </GlobalWrapper>
  );
}`}
						</code>
					</pre>

					<h3 className='pds-ts-xl pds-mar-block-end-m pds-mar-block-start-xl'>
						page.module.css
					</h3>
					<pre className={styles.codeBlock}>
						<code>
							{`/* Add your custom styles here using PDS design tokens */

.container {
  padding: var(--pds-spacing-xl);
}

/* Example: Card grid layout */
.cardGrid {
  display: grid;
  gap: var(--pds-spacing-l);
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

/* Example: Section spacing */
.section {
  margin-block-end: var(--pds-spacing-2xl);
}`}
						</code>
					</pre>
				</section>

				<section className={styles.section}>
					<h2 className='pds-ts-2xl pds-mar-block-end-l'>
						Using with Claude Enterprise
					</h2>

					<h3 className='pds-ts-xl pds-mar-block-end-m'>
						Step 1: Set Up Your Project
					</h3>
					<ol className={styles.list}>
						<li>Create a Next.js project with App Router and TypeScript</li>
						<li>
							Install PDS Toolkit:{' '}
							<code className={styles.inlineCode}>
								npm install @pantheon-systems/pds-toolkit-react
							</code>
						</li>
						<li>Copy the template code above into your page file</li>
						<li>Create the corresponding CSS module file</li>
					</ol>

					<h3 className='pds-ts-xl pds-mar-block-end-m pds-mar-block-start-xl'>
						Step 2: Start a Conversation with Claude
					</h3>
					<p className='pds-mar-block-end-m'>
						Share this resource URL with Claude Enterprise, or paste the
						template code and say:
					</p>
					<pre className={styles.promptBlock}>
						<code>
							{`I'm building a dashboard prototype using the PDS Toolkit React design system.
I've set up the starter template above. Please help me iterate on this prototype.

Before we start, please use the PDS MCP server to:
1. Review available PDS components
2. Understand the component documentation

Then help me add [describe what you want to build].`}
						</code>
					</pre>
				</section>

				<section className={styles.section}>
					<h2 className='pds-ts-2xl pds-mar-block-end-l'>
						Example Prompts to Try
					</h2>

					<div className={styles.promptExample}>
						<h3 className='pds-ts-l pds-mar-block-end-s'>
							Adding a Data Table
						</h3>
						<pre className={styles.promptBlock}>
							<code>
								{`Add a Table component to display a list of sites.
The table should show: Site Name, Status (with IndicatorBadge), Plan, and a View button.
Use mock data for now.`}
							</code>
						</pre>
					</div>

					<div className={styles.promptExample}>
						<h3 className='pds-ts-l pds-mar-block-end-s'>
							Creating a Card Grid
						</h3>
						<pre className={styles.promptBlock}>
							<code>
								{`Create a grid of Cards showing site statistics.
Each card should have an icon, a metric number, a label, and use PDS design tokens for spacing and colors.`}
							</code>
						</pre>
					</div>

					<div className={styles.promptExample}>
						<h3 className='pds-ts-l pds-mar-block-end-s'>
							Adding a Form with Validation
						</h3>
						<pre className={styles.promptBlock}>
							<code>
								{`Add a form to create a new site. Include TextInput fields for site name and description,
a Select for choosing a framework, and a Button to submit.
Add basic validation using PDS form components.`}
							</code>
						</pre>
					</div>

					<div className={styles.promptExample}>
						<h3 className='pds-ts-l pds-mar-block-end-s'>
							Styling with PDS Tokens
						</h3>
						<pre className={styles.promptBlock}>
							<code>
								{`Review the current layout and ensure all spacing, typography, and colors
use PDS design tokens. Update the CSS module to follow PDS patterns.`}
							</code>
						</pre>
					</div>
				</section>

				<section className={styles.section}>
					<h2 className='pds-ts-2xl pds-mar-block-end-l'>
						Important Guidelines
					</h2>
					<ul className={styles.list}>
						<li>
							<strong>Always use PDS components first</strong> - Before building
							custom UI, check if a PDS component exists
						</li>
						<li>
							<strong>Read component docs before using</strong> - Have Claude
							fetch the component documentation from the MCP server
						</li>
						<li>
							<strong>Use PDS design tokens</strong> - Never hard-code colors,
							spacing, or typography values
						</li>
						<li>
							<strong>CSS Modules only</strong> - Use CSS Modules for custom
							styles, not Tailwind or inline styles
						</li>
						<li>
							<strong>Keep it client-side</strong> - All PDS components require
							&apos;use client&apos; directive
						</li>
					</ul>
				</section>

				<section className={styles.section}>
					<h2 className='pds-ts-2xl pds-mar-block-end-l'>Next Steps</h2>
					<ol className={styles.list}>
						<li>Set up your Next.js project with the template code above</li>
						<li>Configure the PDS MCP server in Claude Enterprise</li>
						<li>
							Start a conversation with Claude and share this resource URL
						</li>
						<li>
							Ask Claude to help you build your prototype using PDS components
						</li>
						<li>Iterate and refine based on feedback</li>
					</ol>
				</section>

				<footer className={styles.footer}>
					<Link href='/resources'>← Back to Resources</Link>
				</footer>
			</article>
		</PageLayout>
	);
}
