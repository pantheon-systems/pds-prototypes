# PDS Prototypes

A prototyping playground for designers to build interactive prototypes using the Pantheon Design System (PDS).

## Overview

This Next.js application provides a collaborative space for designers to create, share, and iterate on prototypes using real PDS components. Each designer works on their own branch, and can use Pantheon multidev environments to preview and share their work.

## Quick Start

### Prerequisites

- Node.js 18 or higher
- Git installed and configured
- Access to this repository

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd pds-prototypes
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000 in your browser

## Creating a New Project

### Step 1: Create Your Branch

```bash
git checkout main
git pull origin main
git checkout -b your-name/project-name
```

### Step 2: Run the Project Generator

```bash
npm run new
```

You'll be prompted for:
- **Project name** - lowercase-with-dashes (e.g., `user-dashboard`)
- **Project title** - Display name (e.g., `User Dashboard`)
- **Description** - What you're prototyping
- **Your name** - For attribution
- **Template** - Choose `dashboard` or `blank`
- **Status** - Usually `in-progress`

### Step 3: Start Building

Your new project will be created at `/projects/your-project-name/`

Navigate to http://localhost:3000/projects/your-project-name to see it!

## Working on Your Prototype

### Project Structure

Each project is self-contained:

```
projects/your-project-name/
├── page.tsx           # Your prototype React component
├── page.module.css    # Styles using PDS tokens
├── metadata.json      # Project information
├── README.md          # Project-specific notes
├── components/        # (Optional) Custom components
└── data/              # (Optional) Project-specific mock data
```

### Using PDS Components

Import components from the PDS library:

```typescript
'use client'

import { Button, Card, Container, GlobalWrapper } from '@pantheon-systems/pds-toolkit-react'

export default function MyPrototype() {
  return (
    <GlobalWrapper>
      <Container>
        <Card>
          <h2>Hello PDS!</h2>
          <Button>Click Me</Button>
        </Card>
      </Container>
    </GlobalWrapper>
  )
}
```

**Note:** Some PDS components require `GlobalWrapper` for context. Add `'use client'` at the top of files using PDS components.

### Using Shared Data

We provide mock data for common scenarios:

```typescript
import { users, sites, getActiveSites } from '@/shared-data'

export default function MyPrototype() {
  const activeSites = getActiveSites()

  return (
    <div>
      {activeSites.map(site => (
        <div key={site.id}>
          {site.name} - {site.upstream} - {site.plan}
        </div>
      ))}
    </div>
  )
}
```

See `/shared-data/README.md` for details.

### Working with Claude Code

This project has the PDS MCP server configured. You can ask Claude to:

- "Add a table showing all active sites"
- "Create a card layout with user information"
- "Style this heading using PDS design tokens"
- "Add an IndicatorBadge to show site status"
- "Wrap this page in GlobalWrapper and Container"

## Git Workflow

### Committing Your Changes

```bash
git add .
git commit -m "Add site management interface"
git push origin your-name/project-name
```

### Deploying to Multidev

When you push your branch, Pantheon will automatically create a multidev environment for preview.

### Keeping Your Work

**Option 1: Merge to Main** (to preserve long-term)
```bash
# Create a pull request on GitHub
# After approval, your work will be on main
```

**Option 2: Delete Your Branch** (for temporary prototypes)
```bash
git checkout main
git branch -D your-name/project-name
git push origin --delete your-name/project-name
```

Deleting your branch will remove your project from the multidev environment.

See `/docs/GIT_WORKFLOW.md` for more details.

## Deleting a Project

To remove a project completely:

1. Delete the project folder:
   ```bash
   rm -rf projects/your-project-name
   ```

2. The homepage will automatically update when you restart the dev server

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run new` | Create a new project |
| `npm run aggregate` | Manually update project metadata |
| `npm run lint` | Run ESLint |

## Documentation

- **[Designer Guide](/docs/DESIGNER_GUIDE.md)** - Detailed walkthrough for designers
- **[Git Workflow](/docs/GIT_WORKFLOW.md)** - Git basics and branching strategy
- **[Shared Data](/shared-data/README.md)** - Available mock data
- **[Implementation Plan](/IMPLEMENTATION_PLAN.md)** - Technical implementation details

## Resources

- [PDS Toolkit React on NPM](https://www.npmjs.com/package/@pantheon-systems/pds-toolkit-react)
- [PDS Design Tokens](https://www.npmjs.com/package/@pantheon-systems/pds-design-tokens)
- [Next.js Documentation](https://nextjs.org/docs)
- [Claude Code Documentation](https://docs.anthropic.com/claude/docs)

## Project Status

Current implementation status:

- ✅ Phase 1: Next.js foundation with PDS
- ✅ Phase 2: Metadata system
- ✅ Phase 3: Homepage with project listing
- ✅ Phase 4: Dynamic project routes
- ✅ Phase 5: Shared data store
- ✅ Phase 6: Project templates (blank & dashboard)
- ✅ Phase 7: CLI scaffolding tool
- ⏳ Phase 8: Example projects (optional)
- ✅ Phase 9: Documentation

## Troubleshooting

### Port Already in Use

If you see "Port 3000 is in use", Next.js will automatically use the next available port (3001, 3002, etc.).

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Metadata Not Updating

```bash
# Manually run aggregation
npm run aggregate
```

### PDS Components Not Working

Make sure you're using them in a Client Component with GlobalWrapper:

```typescript
'use client'

import { Button, GlobalWrapper } from '@pantheon-systems/pds-toolkit-react'

export default function MyPage() {
  return (
    <GlobalWrapper>
      <Button>Click Me</Button>
    </GlobalWrapper>
  )
}
```

Some components (Navbar, Modal, Popover) require GlobalWrapper for context.

## Support

For questions or issues:

1. Check the documentation above
2. Review the example projects (when available)
3. Ask in the team channel
4. Consult with the team lead

## Contributing

This is an internal tool for designers. If you have suggestions for improvements:

1. Create an issue on GitHub
2. Discuss with the team
3. Submit a pull request

---

**Version:** 1.0.0
**Last Updated:** February 4, 2026
