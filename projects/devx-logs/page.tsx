'use client'

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

export default function DevxLogs() {
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
}
