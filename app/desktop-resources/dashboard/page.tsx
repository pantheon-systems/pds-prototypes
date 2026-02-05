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
					description='Create dashboard mockups with Claude Desktop using PDS components.'
					title='Dashboard Template'
				/>

				<ResourceUsageInstructions />

				<section className={styles.section}>
					<h2 className='pds-ts-2xl pds-mar-block-end-l'>
						What This Resource Provides
					</h2>
					<p className='pds-mar-block-end-m'>
						Use this resource to create visual dashboard mockups with authentic
						PDS components. Iterate on designs without writing code.
					</p>
					<ul className={styles.list}>
						<li>
							Reference code showing PDS DashboardGlobal structure with sidebar
							navigation, workspace selector, and top navbar
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
						Install Claude Desktop and configure the PDS MCP server before using
						this resource.
					</p>
					<ButtonLink
						linkContent={
							<Link href='/documentation/claude-desktop-setup'>
								View setup guide
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
						Use this code as reference for Claude. It shows the proper structure
						for a PDS dashboard layout.
					</p>

					<h3 className='pds-ts-xl pds-mar-block-end-m'>page.tsx</h3>
					<CodeBlock
						hasCopyButton
						hasLineNumbers
						code={`'use client'

import {
  GlobalWrapper,
  DashboardGlobal,
  DashboardInner,
  DashboardNav,
  Navbar,
  WorkspaceSelector,
  DashboardSearch,
  MenuButton,
  UserMenu,
  SiteFooter,
} from '@pantheon-systems/pds-toolkit-react'
import styles from './page.module.css'

// Sample navigation data
const dashboardNavItems = [
  {
    icon: 'house' as const,
    linkContent: <a href='#'>Home</a>,
  },
  {
    icon: 'laptopCode' as const,
    linkContent: 'Sites',
    links: [
      {
        linkContent: <a href='#'>Site list</a>,
      },
      {
        linkContent: <a href='#'>Create new site</a>,
      },
      {
        linkContent: <a href='#'>Migrate existing site</a>,
      },
    ],
  },
  {
    icon: 'users' as const,
    linkContent: <a href='#'>Team</a>,
    isActive: true,
  },
  {
    icon: 'robot' as const,
    linkContent: <a href='#'>Autopilot</a>,
  },
  {
    icon: 'chartNetwork' as const,
    linkContent: <a href='#'>Edge</a>,
  },
  {
    icon: 'lifeRing' as const,
    linkContent: <a href='#'>Support</a>,
  },
  {
    icon: 'gear' as const,
    linkContent: 'Settings',
    links: [
      {
        linkContent: <a href='#'>Subscriptions</a>,
      },
      {
        linkContent: <a href='#'>Invoices</a>,
      },
      {
        linkContent: <a href='#'>Payment methods</a>,
      },
    ],
  },
]

const workspaces = [
  {
    displayName: 'Acme Corporation',
    workspaceId: 'acme-corp',
    workspaceLink: <a href='#' />,
    isActive: true,
  },
  {
    displayName: 'Tech Startup Inc',
    workspaceId: 'tech-startup',
    workspaceLink: <a href='#' />,
  },
  {
    displayName: 'Design Agency',
    workspaceId: 'design-agency',
    workspaceLink: <a href='#' />,
  },
]

const sampleSites = [
  {
    id: 'marketing-site',
    name: 'Marketing Site',
    url: 'https://marketing.example.com',
  },
  {
    id: 'blog',
    name: 'Blog',
    url: 'https://blog.example.com',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Store',
    url: 'https://store.example.com',
  },
]

const helpMenuItems = [
  {
    isLink: true,
    linkContent: <a href='https://docs.pantheon.io'>Documentation</a>,
  },
  {
    isLink: true,
    linkContent: <a href='https://pantheon.io/support'>Support</a>,
  },
  {
    isLink: true,
    linkContent: <a href='https://status.pantheon.io'>Status</a>,
  },
]

const userMenuItems = [
  {
    isLink: true,
    linkContent: <a href='#'>Profile</a>,
  },
  {
    isLink: true,
    linkContent: <a href='#'>Settings</a>,
  },
  {
    isLink: true,
    linkContent: <a href='#'>Sign out</a>,
  },
]

export default function DashboardPage() {
  return (
    <GlobalWrapper>
      <DashboardGlobal
        sidebarToggleLabel='Toggle sidebar'
        skiplinkText='Skip to content'
      >
        {/* Sidebar Navigation */}
        <DashboardNav
          slot='sidebar'
          ariaLabel='Dashboard Navigation'
          menuItems={dashboardNavItems}
        />

        {/* Top Navbar */}
        <Navbar
          slot='header'
          hideBorder
          hideLogo
          colorType='transparent'
          containerWidth='full'
        >
          <WorkspaceSelector
            slot='items-left'
            workspaceList={workspaces}
            createWorkspaceLink={<a href='#'>Create workspace</a>}
          />
          <DashboardSearch
            slot='items-right'
            id='dashboard-search'
            label='Search sites'
            placeholder='Search sites'
            siteList={sampleSites}
          />
          <MenuButton
            slot='items-right'
            id='help-menu-button'
            label='Help'
            menuItems={helpMenuItems}
            variant='navbar'
          />
          <UserMenu
            slot='items-right'
            ariaLabel='User menu'
            menuItems={userMenuItems}
            userEmail='designer@example.com'
            userName='Designer Name'
            userImageSrc='https://i.pravatar.cc/150?img=1'
          />
        </Navbar>

        {/* Main Content Area */}
        <DashboardInner slot='main'>
          <div slot='content' className={styles.mainContent}>
            {/*
              🎨 DESIGNER WORKSPACE - START BUILDING HERE!

              This is where you add your prototype content.

              Tips:
              - Import more PDS components as needed
              - Use shared data: import { users, sites } from '@/shared-data'
              - Add your own components in a /components folder
              - This entire dashboard chrome will stay consistent
            */}
            <h1>Start building your dashboard here</h1>
            <p>Replace this placeholder with your prototype content.</p>
          </div>
        </DashboardInner>

        {/* Footer */}
        <SiteFooter
          slot='footer'
          containerWidth='full'
          legalLinks={[
            'privacy',
            'cookiePolicy',
            'termsOfUse',
            'acceptableUse',
            'accessibilityStatement',
          ]}
        />
      </DashboardGlobal>
    </GlobalWrapper>
  )
}`}
						language='tsx'
					/>

					<h3 className='pds-ts-xl pds-mar-block-end-m pds-mar-block-start-xl'>
						page.module.css
					</h3>
					<CodeBlock
						hasCopyButton
						hasLineNumbers
						code={`/* Dashboard Design - Using PDS DashboardGlobal Layout */

/* Main content area - where designers work */
.mainContent {
  /* DashboardInner provides all necessary layout and spacing */
  /* No extra padding needed - matches actual Pantheon dashboard */
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
						Share this resource URL with Claude Desktop or paste the template
						code. Use a prompt like this:
					</p>
					<CodeBlock
						hasCopyButton
						code={`I want to create a dashboard mockup using the PDS Toolkit React design system.

Use the PDS MCP server to review available components and create a visual artifact
showing a dashboard with:
- DashboardGlobal layout with sidebar navigation
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
							provides access to component documentation
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
							<Link href='/desktop-resources'>Back to desktop resources</Link>
						}
						size='sm'
						variant='subtle'
					/>
				</footer>
			</article>
		</PageLayout>
	);
}
