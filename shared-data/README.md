# Shared Mock Data

This directory contains mock data that can be used across all prototypes in this project.

## Available Data

### Users
Mock user data for testing user lists, profiles, and authentication flows.

**Fields:**
- `id` - Unique identifier
- `name` - Full name
- `email` - Email address
- `role` - User role (Admin, Developer, Designer, Manager)
- `organization` - Company/organization name
- `avatar` - Avatar image URL
- `status` - Account status (active, inactive)
- `joinDate` - Account creation date

### Sites
Mock site data for testing dashboard views and site management interfaces. **40 total sites** with varied configurations.

**Fields:**
- `id` - Unique identifier
- `name` - Site name
- `created` - Creation date (formatted as "Month Day, Year")
- `userInCharge` - Name of user managing the site
- `upstream` - CMS/framework type (WordPress, Drupal variants, Next.js 15, Empty Upstream)
- `plan` - Pantheon plan (Sandbox, Basic, Performance variants, Elite variants)
- `monthlyVisitsUsed` - Current monthly visits (or "N/A")
- `monthlyVisitsAllowed` - Monthly visit limit (or "N/A")
- `status` - Current status (Active, Frozen)

**Upstream Options:**
- Drupal (Composer Managed)
- WordPress
- WordPress Multisite
- Drupal 7, Drupal 8
- nextjs 15
- Empty Upstream
- blank (empty string)

## Usage

### Import All Data

\`\`\`typescript
import { users, sites } from '@/shared-data'

export default function MyComponent() {
  return (
    <div>
      <h2>Sites ({sites.length})</h2>
      {sites.map(site => (
        <div key={site.id}>
          {site.name} - {site.upstream} - {site.plan}
        </div>
      ))}
    </div>
  )
}
\`\`\`

### Use Helper Functions

\`\`\`typescript
import {
  getActiveUsers,
  getActiveSites,
  getFrozenSites,
  getSitesByUser,
  getSitesByUpstream,
  getSitesByPlan,
  getUserById,
  getSiteById
} from '@/shared-data'

export default function Dashboard() {
  const activeUsers = getActiveUsers()
  const activeSites = getActiveSites()
  const wordPressSites = getSitesByUpstream('WordPress')
  const sarahsSites = getSitesByUser('Sarah Chen')
  const performanceSites = getSitesByPlan('Performance Large')

  return (
    <div>
      <h2>Active Users: {activeUsers.length}</h2>
      <h2>Active Sites: {activeSites.length}</h2>
      <h2>WordPress Sites: {wordPressSites.length}</h2>
      <h2>Sarah&apos;s Sites: {sarahsSites.length}</h2>
      <h2>Performance Large Sites: {performanceSites.length}</h2>
    </div>
  )
}
\`\`\`

### Import Types

\`\`\`typescript
import type { User, Site } from '@/shared-data'

interface MyComponentProps {
  user: User
  sites: Site[]
}

export default function MyComponent({ user, sites }: MyComponentProps) {
  // Your component code
}
\`\`\`

### Client Component Example

\`\`\`typescript
'use client'

import { useState } from 'react'
import { sites } from '@/shared-data'
import type { Site } from '@/shared-data'

export default function SiteList() {
  const [selectedSite, setSelectedSite] = useState<Site | null>(null)

  return (
    <div>
      {sites.map(site => (
        <button
          key={site.id}
          onClick={() => setSelectedSite(site)}
        >
          {site.name}
        </button>
      ))}

      {selectedSite && (
        <div>
          <h3>{selectedSite.name}</h3>
          <p>Upstream: {selectedSite.upstream}</p>
          <p>Plan: {selectedSite.plan}</p>
          <p>User: {selectedSite.userInCharge}</p>
          <p>Status: {selectedSite.status}</p>
          <p>Traffic: {selectedSite.monthlyVisitsUsed} / {selectedSite.monthlyVisitsAllowed}</p>
        </div>
      )}
    </div>
  )
}
\`\`\`

## Adding Your Own Data

You can add project-specific mock data in your project directory:

1. Create a `data` folder in your project: `/projects/my-project/data/`
2. Add JSON files with your custom data
3. Import them in your project components

Example:
\`\`\`typescript
// In your project
import customData from './data/my-custom-data.json'
\`\`\`

## Tips

- Use this data as a starting point - feel free to modify it for your needs
- Avatar URLs use https://i.pravatar.cc for placeholder images
- All data is typed for TypeScript autocomplete support
- Helper functions make it easy to filter and find specific data
- Site upstreams match Pantheon's supported platforms: WordPress, Drupal variants, Next.js, and more
- The 40 sites represent a diverse mix of plans, upstreams, and traffic levels
- Some sites have "N/A" for traffic (Sandbox plans and Frozen sites typically don't track visits)
