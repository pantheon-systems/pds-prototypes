'use client';

import Link from 'next/link';

import { ButtonLink, CodeBlock } from '@pantheon-systems/pds-toolkit-react';

import {
	PageHeader,
	PageLayout,
	ResourceUsageInstructions,
} from '../../components';

import styles from './page.module.css';

export default function DashboardResourcePage() {
	return (
		<PageLayout>
			<article className={styles.resource}>
				<PageHeader
					description='Reference templates and guidance for creating dashboard mockups with Claude Desktop using PDS components.'
					title='Dashboard Template'
				/>

				<ResourceUsageInstructions />

				<section className={styles.section}>
					<h2 className='pds-ts-2xl pds-mar-block-end-l'>
						What This Resource Provides
					</h2>
					<p className='pds-mar-block-end-m'>
						This resource gives Claude Desktop the context it needs to create
						visual dashboard mockups using authentic PDS components. You&apos;ll
						be able to iterate on design prototypes without writing any code.
					</p>
					<ul className={styles.list}>
						<li>
							Reference code showing PDS AppLayout structure with sidebar
							navigation
						</li>
						<li>Example patterns for using PDS components in dashboards</li>
						<li>Template prompts to help you start designing</li>
						<li>
							Context for Claude to understand PDS component usage and patterns
						</li>
					</ul>
				</section>

				<section className={styles.section}>
					<h2 className='pds-ts-2xl pds-mar-block-end-l'>Before You Start</h2>
					<p className='pds-mar-block-end-m'>
						Make sure you have Claude Desktop installed and configured with the
						PDS MCP server.
					</p>
					<ButtonLink
						linkContent={
							<Link href='/documentation/claude-desktop-setup'>
								Follow the Claude Desktop Setup guide
							</Link>
						}
						size='sm'
						variant='secondary'
					/>
				</section>

				<section className={styles.section}>
					<h2 className='pds-ts-2xl pds-mar-block-end-l'>
						Reference Template Code
					</h2>
					<p className='pds-mar-block-end-m'>
						Use this code as reference context for Claude. It shows the proper
						structure and component usage for a PDS dashboard layout.
					</p>

					<h3 className='pds-ts-xl pds-mar-block-end-m'>page.tsx</h3>
					<CodeBlock
						hasCopyButton
						hasLineNumbers
						code={`'use client';

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
						language='tsx'
					/>

					<h3 className='pds-ts-xl pds-mar-block-end-m pds-mar-block-start-xl'>
						page.module.css
					</h3>
					<CodeBlock
						hasCopyButton
						hasLineNumbers
						code={`/* Add your custom styles here using PDS design tokens */

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
						language='css'
					/>
				</section>

				<section className={styles.section}>
					<h2 className='pds-ts-2xl pds-mar-block-end-l'>
						Creating Mockups with Claude Desktop
					</h2>

					<h3 className='pds-ts-xl pds-mar-block-end-m'>
						Step 1: Start a Conversation
					</h3>
					<p className='pds-mar-block-end-m'>
						Open Claude Desktop and share this resource URL, or paste the
						template code below as reference. Then use a prompt like this:
					</p>
					<CodeBlock
						hasCopyButton
						code={`I want to create a dashboard mockup using the PDS Toolkit React design system.

Use the PDS MCP server to review available components and create a visual artifact
showing a dashboard with:
- AppLayout with sidebar navigation
- A main content area with [describe what you want to show]
- Proper PDS styling and components

Use the template code above as a starting point for the structure.`}
					/>

					<h3 className='pds-ts-xl pds-mar-block-end-m pds-mar-block-start-xl'>
						Step 2: Iterate on Your Mockup
					</h3>
					<p className='pds-mar-block-end-m'>
						Claude will create a visual artifact. You can then ask it to refine
						the design, add features, or adjust the layout. The artifact will
						update in real-time as you iterate.
					</p>
				</section>

				<section className={styles.section}>
					<h2 className='pds-ts-2xl pds-mar-block-end-l'>
						Example Prompts to Try
					</h2>

					<div className={styles.promptExample}>
						<h3 className='pds-ts-l pds-mar-block-end-s'>
							Adding a Data Table
						</h3>
						<CodeBlock
							hasCopyButton
							code={`Update the mockup to show a Table component displaying a list of sites.
The table should show: Site Name, Status (with IndicatorBadge), Plan, and a View button.
Use realistic mock data.`}
						/>
					</div>

					<div className={styles.promptExample}>
						<h3 className='pds-ts-l pds-mar-block-end-s'>
							Creating a Card Grid
						</h3>
						<CodeBlock
							hasCopyButton
							code={`Add a grid of Cards above the table showing site statistics.
Each card should have an icon, a metric number, and a label using PDS design tokens.`}
						/>
					</div>

					<div className={styles.promptExample}>
						<h3 className='pds-ts-l pds-mar-block-end-s'>
							Adding a Modal Dialog
						</h3>
						<CodeBlock
							hasCopyButton
							code={`Show what it would look like when a user clicks "Create New Site".
Display a Modal with a form including TextInput fields, a Select dropdown, and action buttons.`}
						/>
					</div>

					<div className={styles.promptExample}>
						<h3 className='pds-ts-l pds-mar-block-end-s'>
							Refining the Design
						</h3>
						<CodeBlock
							hasCopyButton
							code={`Review the mockup and suggest improvements for:
- Better spacing and visual hierarchy
- More effective use of PDS components
- Improved information architecture`}
						/>
					</div>
				</section>

				<section className={styles.section}>
					<h2 className='pds-ts-2xl pds-mar-block-end-l'>
						Tips for Better Mockups
					</h2>
					<ul className={styles.list}>
						<li>
							<strong>Ask Claude to use PDS components</strong> - The MCP server
							gives Claude access to authentic component documentation
						</li>
						<li>
							<strong>Be specific about interactions</strong> - Describe what
							happens when users click buttons, open menus, etc.
						</li>
						<li>
							<strong>Request multiple states</strong> - Ask to see loading
							states, error states, empty states, etc.
						</li>
						<li>
							<strong>Iterate gradually</strong> - Start with basic layout, then
							add details and refinements
						</li>
						<li>
							<strong>Use realistic content</strong> - Ask for realistic mock
							data to better evaluate the design
						</li>
					</ul>
				</section>

				<footer className={styles.footer}>
					<ButtonLink
						displayType='icon-start'
						iconName='angleLeft'
						linkContent={
							<Link href='/resources'>Back to Desktop Resources</Link>
						}
						size='sm'
						variant='subtle'
					/>
				</footer>
			</article>
		</PageLayout>
	);
}
