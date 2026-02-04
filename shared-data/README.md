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
Mock site data for testing dashboard views and site management interfaces.

**Fields:**
- `id` - Unique identifier
- `name` - Site name
- `siteType` - Site type (WordPress, Drupal, Next.js)
- `status` - Current status (live, development, frozen, inactive)
- `environment` - Deployment environment (production, staging, dev)
- `created` - Creation date
- `lastDeployed` - Last deployment date
- `owner` - Owner name
- `plan` - Pantheon plan (Basic, Performance, Elite)
- `region` - Geographic region (US, EU, AU)

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
          {site.name} - {site.siteType}
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
  getLiveSites,
  getSitesByType,
  getUserById,
  getSitesByOwner
} from '@/shared-data'

export default function Dashboard() {
  const activeUsers = getActiveUsers()
  const liveSites = getLiveSites()
  const wordPressSites = getSitesByType('WordPress')

  return (
    <div>
      <h2>Active Users: {activeUsers.length}</h2>
      <h2>Live Sites: {liveSites.length}</h2>
      <h2>WordPress Sites: {wordPressSites.length}</h2>
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
          <p>Type: {selectedSite.siteType}</p>
          <p>Plan: {selectedSite.plan}</p>
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
- Dates are in ISO format (YYYY-MM-DD)
- All data is typed for TypeScript autocomplete support
- Helper functions make it easy to filter and find specific data
- Site types match Pantheon's supported CMS platforms: WordPress, Drupal, and Next.js
