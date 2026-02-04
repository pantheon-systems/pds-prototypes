# Designer Guide

Welcome! This guide will help you create prototypes using the Pantheon Design System (PDS).

## Your First Project

### Prerequisites

Make sure you have:

- [ ] Node.js installed (version 22 or higher)
- [ ] Git configured with your name and email
- [ ] Access to this repository
- [ ] A code editor (VS Code recommended)
- [ ] Claude Code CLI installed (optional but recommended)

### Creating Your First Prototype

1. **Set up the project:**

   ```bash
   git clone https://github.com/pantheon-systems/pds-prototypes.git
   cd pds-prototypes
   npm install
   ```

2. **Create your branch:**

   ```bash
   git checkout -b your-name/my-first-prototype
   ```

3. **Generate your project:**

   ```bash
   npm run new
   ```

4. **Start the dev server:**

   ```bash
   npm run dev
   ```

5. **View your prototype:**
   Open http://localhost:3000/projects/your-project-name

Congrats! You've created your first prototype! 🎉

## Working with Claude Code

Claude Code is your AI pair programmer. It knows about PDS components and can help you build faster.

### Setting Up Claude Code

If you have Claude Code installed, the PDS MCP server is already configured for this project.

### Example Prompts

**Adding Components:**

> "Add a Table component showing all sites from shared data"

> "Create a Card with a user's name, email, and avatar"

> "Add a Button that says 'Create New Site'"

**Styling:**

> "Style this heading using PDS design tokens"

> "Add spacing between these elements using PDS spacing tokens"

> "Make this layout responsive"

**Using Data:**

> "Import the sites data and display it in a list"

> "Filter the sites to only show WordPress sites"

> "Show the first 5 users in a grid"

**Debugging:**

> "Why isn't this component rendering?"

> "Fix the TypeScript error in this file"

> "This table looks broken, can you help?"

## Understanding Templates

### Blank Template

Use this when you're starting from scratch or want maximum flexibility.

**What you get:**

- Empty page component
- Basic CSS file with PDS tokens
- Helpful comments
- README with tips

**Best for:**

- Custom layouts
- Experimental UIs
- Learning PDS components

### Dashboard Template

Use this when you need a standard dashboard layout with navigation.

**What you get:**

- Complete PDS DashboardGlobal layout
- Pre-built sidebar navigation with sample menu items
- Top navbar with workspace selector, search, help menu, and user menu
- Footer with legal links
- Empty main content area ready for your work
- Fully responsive and accessible

**Best for:**

- Admin interfaces
- Management dashboards
- Site/user listings
- Any page that needs standard Pantheon dashboard chrome

## Using PDS Components

### Finding Components

The PDS Toolkit React library includes many components. Common ones:

| Component        | Purpose             | Example                                             |
| ---------------- | ------------------- | --------------------------------------------------- |
| `Button`         | Buttons and actions | `<Button>Click me</Button>`                         |
| `Card`           | Content containers  | `<Card>Content</Card>`                              |
| `Table`          | Data tables         | `<Table headers={...} rowData={...} />`             |
| `IndicatorBadge` | Status indicators   | `<IndicatorBadge label="Active" color="success" />` |
| `Container`      | Layout container    | `<Container>...</Container>`                        |
| `GlobalWrapper`  | Context provider    | `<GlobalWrapper>...</GlobalWrapper>`                |
| `Navbar`         | Navigation bar      | `<Navbar logoDisplayType="sub-brand" />`            |
| `Modal`          | Dialogs             | `<Modal>...</Modal>`                                |
| `TextInput`      | Form inputs         | `<TextInput label="Name" />`                        |

**Finding more:** Ask Claude "What PDS components are available?" or check the NPM package.

### Importing Components

```typescript
import { Button, Card, Table } from '@pantheon-systems/pds-toolkit-react';
```

### Client vs Server Components

PDS components need to be used in **Client Components**. All project templates already include the `'use client'` directive at the top, so you don't need to add it yourself.

If you create additional component files, add this at the top:

```typescript
'use client';

import { Button } from '@pantheon-systems/pds-toolkit-react';
// ... rest of your code
```

### GlobalWrapper (Already Included)

All project templates include **GlobalWrapper** by default, which provides necessary context for PDS components like Navbar, Modal, and Popover.

You don't need to add GlobalWrapper yourself - it's already wrapping your page content in the template:

```typescript
'use client'

import { GlobalWrapper, Container } from '@pantheon-systems/pds-toolkit-react'

export default function MyPage() {
  return (
    <GlobalWrapper>  {/* ← Already included in templates */}
      <Container>
        <h1>My Content</h1>
      </Container>
    </GlobalWrapper>
  )
}
```

**What you need to know:**

- GlobalWrapper is already set up in all templates
- PDS components will work immediately without additional setup
- Only add GlobalWrapper if you create new page files outside the template structure

## Working with Shared Data

We provide mock data so you don't have to create it from scratch.

### Available Data

**Users:** 5 mock users with names, emails, roles, avatars
**Sites:** 40 mock sites (WordPress, Drupal variants, Next.js, etc.)

### Importing Data

```typescript
import { users, sites } from '@/shared-data'

export default function MyComponent() {
  return (
    <div>
      {sites.map(site => (
        <div key={site.id}>{site.name}</div>
      ))}
    </div>
  )
}
```

### Helper Functions

```typescript
import {
	getActiveUsers, // Filter to active users
	getActiveSites, // Filter to active sites
	getFrozenSites, // Filter to frozen sites
	getSitesByUser, // Filter by user in charge
	getSitesByUpstream, // Filter by upstream (WordPress, Drupal, etc.)
	getSitesByPlan, // Filter by plan (Performance, Elite, etc.)
} from '@/shared-data';
```

### Creating Your Own Data

1. Create a `data` folder in your project
2. Add JSON files with your mock data
3. Import them in your components

```typescript
import customData from './data/my-data.json';
```

## Styling with PDS Tokens

Use PDS design tokens instead of hard-coded values.

### Common Tokens

**Spacing:**

```css
padding: var(--pds-spacing-m);
margin-bottom: var(--pds-spacing-xl);
```

**Typography:**

```css
font-size: var(--pds-typography-size-l);
font-weight: var(--pds-typography-fw-semibold);
color: var(--pds-color-fg-default);
```

**Colors:**

```css
color: var(--pds-color-fg-default);
background: var(--pds-color-bg-default);
border-color: var(--pds-color-border-default);
```

**Borders:**

```css
border-radius: var(--pds-border-radius-default);
border-width: var(--pds-border-width-default);
```

###Token Sizes

Spacing: `5xs`, `4xs`, `3xs`, `2xs`, `xs`, `s`, `m`, `l`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`

Typography: `xs`, `s`, `m`, `l`, `xl`, `2xl`, `3xl`, `4xl`

## Common Patterns

### Displaying a List of Sites

```typescript
'use client'

import { Table, IndicatorBadge } from '@pantheon-systems/pds-toolkit-react'
import { sites } from '@/shared-data'

export default function SiteList() {
  const headers = [
    { title: 'Name' },
    { title: 'Upstream' },
    { title: 'Plan' },
    { title: 'Status' }
  ]

  const rowData = sites.map(site => [
    site.name,
    site.upstream,
    site.plan,
    <IndicatorBadge
      key={site.id}
      label={site.status}
      color={site.status === 'Active' ? 'success' : 'neutral'}
    />
  ])

  return <Table headers={headers} rowData={rowData} />
}
```

### Creating a Card Grid

```typescript
'use client'

import { Card } from '@pantheon-systems/pds-toolkit-react'
import { users } from '@/shared-data'
import styles from './page.module.css'

export default function UserGrid() {
  return (
    <div className={styles.grid}>
      {users.map(user => (
        <Card key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>{user.role}</p>
        </Card>
      ))}
    </div>
  )
}
```

```css
/* page.module.css */
.grid {
	display: grid;
	gap: var(--pds-spacing-m);
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
```

### Adding Navigation

The dashboard template includes navigation. To customize it:

1. Edit the nav items in `page.tsx`
2. Update the `activeNav` state
3. Add content for each section

## Publishing Your Work

### Viewing Locally

```bash
npm run dev
```

Visit: http://localhost:3000/projects/your-project

### Sharing via Multidev

**Work locally first:**

```bash
git add .
git commit -m "Add site management interface"
```

**When ready to share:**

1. Push your branch:

   ```bash
   git push origin your-branch-name
   ```

2. Create a Draft Pull Request on GitHub:

   - Go to the repository on GitHub
   - Click "Pull requests" → "New pull request"
   - Select your branch to merge into `main`
   - Click "Create **draft** pull request"

3. A multidev environment will be created automatically for your PR

4. Share the multidev URL with your team for feedback!

**For final handoff:**

- Mark your draft PR as "Ready for review"
- Request a review from `mel-miller`
- After approval, your prototype will be merged to main

### Updating Metadata

Edit your project's `metadata.json`:

```json
{
	"status": "review" // Options: "in-progress", "review", "ready", "archived"
}
```

**Status Options:**

- `in-progress` - Actively working on it
- `review` - Ready for feedback
- `ready` - Ready for handoff
- `archived` - No longer active

Restart the dev server to see changes on the homepage.

## Troubleshooting

### Component Not Rendering

All templates include `'use client'` and `GlobalWrapper` by default, so components should work immediately.

If a component isn't rendering:

- Check the browser console for errors
- Verify the component is imported correctly
- Ask Claude to help troubleshoot: "This component isn't rendering, can you help?"

### Styles Not Applying

Check that you're using the correct token names:

```css
/* ✅ Correct */
padding: var(--pds-spacing-m);

/* ❌ Wrong */
padding: var(--pds-spacing-medium);
```

### Data Not Showing

Make sure you imported it correctly:

```typescript
// ✅ Correct
import { sites } from '@/shared-data';

// ❌ Wrong
import sites from '@/shared-data/sites.json';
```

### Build Errors

Clear the cache and rebuild:

```bash
rm -rf .next
npm run build
```

## Getting Help

1. **Check the docs** - Start here!
2. **Ask Claude** - If using Claude Code, ask for help
3. **Check the example projects** - See how others did it
4. **Ask the team** - Post in the team channel
5. **Review shared data** - Check `/shared-data/README.md`

## Tips for Success

- ✅ Commit often with clear messages
- ✅ Start simple, add complexity gradually
- ✅ Use shared data when possible
- ✅ Follow PDS patterns and components
- ✅ Ask for help when stuck
- ✅ Share your work early for feedback

## Next Steps

Now that you know the basics:

1. Create a simple prototype using the blank template
2. Try the dashboard template for a more complex layout
3. Experiment with different PDS components
4. Build something real that solves a design problem
5. Share it with the team!

Happy prototyping! 🚀
