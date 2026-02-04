# Site Dashboard

**Creator:** mel-miller
**Created:** 2026-02-04
**Template:** Dashboard
**Status:** in-progress

## Description

Design for future site dashboard template

## Getting Started

This project was created from the dashboard template. It includes pre-built navigation with a sidebar and empty content area ready for your prototype.

### Project Structure

```
site-dashboard/
├── page.tsx           # Main dashboard page with navigation
├── page.module.css    # Dashboard layout styles
├── metadata.json      # Project metadata
└── README.md          # This file
```

### Dashboard Features

✅ **Sidebar Navigation** - Pre-configured with 4 nav items (Overview, Sites, Users, Settings)
✅ **Active State Management** - Navigation highlights the active section
✅ **Responsive Layout** - Works on mobile and desktop
✅ **Empty Content Areas** - Ready for you to add your content
✅ **PDS Design Tokens** - All styles use PDS tokens

### How to Customize

1. **Modify Navigation Items**
   - Edit the nav buttons in `page.tsx`
   - Add/remove sections as needed
   - Update the `activeNav` state handling

2. **Add Content to Sections**
   - Find the section you want to edit (e.g., `{activeNav === 'sites' && ...}`)
   - Replace placeholder content with your prototype
   - Import PDS components and shared data as needed

3. **Change Layout**
   - Edit `page.module.css` to adjust the sidebar width, spacing, etc.
   - All styles use PDS design tokens for consistency

### Example: Adding a Sites Table

```typescript
import { Table } from '@pantheon-systems/pds-toolkit-react'
import { sites } from '@/shared-data'

// In your component:
{activeNav === 'sites' && (
  <div>
    <h2>Sites</h2>
    <Table
      headers={[
        { title: 'Name' },
        { title: 'Type' },
        { title: 'Status' }
      ]}
      rowData={sites.map(site => [
        site.name,
        site.siteType,
        site.status
      ])}
    />
  </div>
)}
```

### Helpful Resources

- [PDS Toolkit React Components](https://www.npmjs.com/package/@pantheon-systems/pds-toolkit-react)
- [Shared Data Documentation](/shared-data/README.md)
- [Designer Guide](/docs/DESIGNER_GUIDE.md)

### Viewing Your Prototype

Run the development server:
```bash
npm run dev
```

Then visit: http://localhost:3000/projects/site-dashboard
