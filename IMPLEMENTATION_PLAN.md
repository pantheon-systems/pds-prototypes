# PDS Prototypes - Implementation Plan

## Project Overview

Create a Next.js-based prototyping playground for 5-6 designers to build prototypes using the PDS Toolkit React design system. Designers will use Claude Code/Cursor for development with minimal coding knowledge required.

### Key Requirements
- Next.js 15+ with TypeScript (App Router)
- CSS Modules for styling
- Self-contained projects in `/projects` directory
- CLI scaffolding tool using Plop
- Automated metadata aggregation
- PDS Toolkit React components
- Support for Pantheon multidev workflow

### User Workflow
1. Designer creates a branch for their work
2. Runs CLI script to scaffold a new project from template (dashboard/blank)
3. Works on prototype using Claude Code
4. Uses Pantheon multidev to preview
5. Either deletes branch when done OR merges to main to preserve

---

## Architecture

### Directory Structure

```
pds-prototypes/
├── app/
│   ├── page.tsx                    # Homepage - project listing ✅
│   ├── layout.tsx                  # Root layout with PDS imports ✅
│   ├── globals.css                 # Global styles ✅
│   ├── page.module.css             # Homepage styles ✅
│   ├── api/
│   │   └── projects/
│   │       └── route.ts            # API endpoint for projects ✅
│   └── projects/
│       └── [projectName]/
│           ├── page.tsx            # Dynamic route handler ⏳
│           └── layout.tsx          # Project-specific layout (optional) ⏳
├── projects/
│   ├── example-dashboard/          # Example project ⏳
│   │   ├── metadata.json           # Project metadata
│   │   ├── page.tsx                # Main prototype page
│   │   ├── page.module.css         # Page-specific styles
│   │   ├── components/             # Project components (optional)
│   │   ├── data/                   # Mock data (optional)
│   │   └── README.md               # Project notes
│   ├── test-project/               # Test project ✅
│   │   └── metadata.json
│   └── .projects-metadata.json     # Aggregated metadata (auto-generated) ✅
├── templates/
│   ├── blank/                      # Blank template ⏳
│   │   ├── page.tsx.hbs
│   │   ├── page.module.css.hbs
│   │   ├── metadata.json.hbs
│   │   └── README.md.hbs
│   └── dashboard/                  # Dashboard template ⏳
│       ├── page.tsx.hbs
│       ├── page.module.css.hbs
│       ├── metadata.json.hbs
│       └── README.md.hbs
├── shared-data/                    # Shared mock data ⏳
│   ├── users.json
│   ├── products.json
│   └── index.ts
├── scripts/
│   ├── aggregate-metadata.js       # Scans projects/ and updates metadata ✅
│   └── create-project.js           # Plop-based scaffolding ⏳
├── types/
│   └── project.ts                  # TypeScript types ✅
├── plopfile.js                     # Plop configuration ⏳
├── next.config.js                  # Next.js config ✅
├── tsconfig.json                   # TypeScript config ✅
├── package.json                    # Dependencies & scripts ✅
├── docs/                           # Documentation ⏳
│   ├── DESIGNER_GUIDE.md
│   └── GIT_WORKFLOW.md
└── README.md                       # Main documentation ⏳
```

**Legend:**
- ✅ Completed
- ⏳ To be implemented

---

## Implementation Status

### ✅ Phase 1: Next.js Foundation Setup (COMPLETED)

**Goal**: Bootstrap Next.js with TypeScript, PDS Toolkit, and basic structure

**Completed Tasks**:
1. ✅ Initialized Next.js 15+ with TypeScript (no Tailwind)
2. ✅ Installed dependencies:
   - `@pantheon-systems/pds-toolkit-react`
   - `@pantheon-systems/pds-design-tokens`
   - Development tools: `plop`, TypeScript types
3. ✅ Configured `next.config.js`
4. ✅ Created root layout (`app/layout.tsx`) with PDS CSS imports
5. ✅ Created homepage (`app/page.tsx`)
6. ✅ Updated `.gitignore` to exclude auto-generated files

**Files Created**:
- `package.json`
- `tsconfig.json`
- `next.config.js`
- `.eslintrc.json`
- `app/layout.tsx`
- `app/globals.css`
- `app/page.tsx`

---

### ✅ Phase 2: Metadata Schema & Aggregation (COMPLETED)

**Goal**: Define metadata structure and build aggregation system

**Metadata Schema** (`projects/{name}/metadata.json`):
```json
{
  "id": "unique-project-id",
  "title": "Project Display Title",
  "description": "Brief description of the prototype",
  "creator": "Designer Name",
  "createdDate": "2026-02-03",
  "lastUpdated": "2026-02-03T10:30:00Z",
  "status": "in-progress",
  "template": "dashboard"
}
```

**Status Options**:
- `in-progress`: Actively being worked on
- `review`: Ready for review/feedback
- `completed`: Finished prototype
- `archived`: No longer active but preserved

**Completed Tasks**:
1. ✅ Created TypeScript type definition (`types/project.ts`)
2. ✅ Built `scripts/aggregate-metadata.js`:
   - Scans all subdirectories in `/projects`
   - Reads each `metadata.json`
   - Gets `lastUpdated` from file system stats
   - Writes aggregated array to `/projects/.projects-metadata.json`
   - Validates metadata schema
   - Logs errors for invalid/missing metadata
3. ✅ Added npm scripts to `package.json`:
   ```json
   {
     "scripts": {
       "predev": "node scripts/aggregate-metadata.js",
       "prebuild": "node scripts/aggregate-metadata.js",
       "aggregate": "node scripts/aggregate-metadata.js"
     }
   }
   ```

**Files Created**:
- `types/project.ts`
- `scripts/aggregate-metadata.js`
- `projects/.projects-metadata.json` (auto-generated, gitignored)

---

### ✅ Phase 3: Homepage - Project Listing (COMPLETED)

**Goal**: Build homepage that displays all projects

**Completed Tasks**:
1. ✅ Created `app/page.tsx`:
   - Uses PDS Table component with `headers` and `rowData` props
   - Imports PDS StatusBadge, ButtonLink, EmptyStateCard
   - Fetches from `/api/projects` endpoint
   - Displays: Title, Description, Creator, Status, Template, Created Date, Last Updated
   - Status badges with indicators
   - Links to each project: `/projects/[projectName]`
   - Sorts by lastUpdated (most recent first)
   - Empty state when no projects exist
2. ✅ Created `app/page.module.css` with PDS design tokens
3. ✅ Created API route `app/api/projects/route.ts`
4. ✅ Implemented client-side data fetching with loading state

**PDS Components Used**:
- `Table` - for project listing
- `StatusBadge` - for status indicators
- `ButtonLink` - for view buttons
- `EmptyStateCard` - for empty state

**PDS Design Tokens Used**:
- `--pds-spacing-*` - for spacing
- `--pds-typography-*` - for fonts, sizes, weights
- `--pds-color-*` - for colors
- `--pds-border-*` - for borders and radii

**Files Created**:
- `app/page.tsx`
- `app/page.module.css`
- `app/api/projects/route.ts`

---

### ⏳ Phase 4: Dynamic Project Route (TO DO)

**Goal**: Create dynamic route to display individual projects

**Tasks**:
1. Create `app/projects/[projectName]/page.tsx`:
   ```typescript
   export async function generateStaticParams() {
     // Read all project directories
     // Return array of { projectName: 'dir-name' }
   }

   export default function ProjectPage({ params }) {
     // Dynamic import of /projects/{projectName}/page.tsx
     // Render the prototype
   }
   ```
2. Handle errors gracefully (project not found, invalid structure)
3. Add metadata display (optional header showing project info)
4. Create a "Back to Projects" navigation link
5. Handle dynamic imports properly with Next.js patterns

**Technical Considerations**:
- Use Next.js dynamic imports: `next/dynamic`
- Each project's `page.tsx` exports a default component
- Route handler imports and renders that component
- Support both build-time and runtime discovery

**Verification Steps**:
- Navigate to `/projects/test-project`
- Prototype content renders correctly
- Error handling works for non-existent projects

---

### ⏳ Phase 5: Shared Data Store (TO DO)

**Goal**: Provide common mock data for designers

**Tasks**:
1. Create `/shared-data` directory with:
   - `users.json`: Array of mock user objects
   - `products.json`: Array of mock product objects
   - `index.ts`: Export all data with TypeScript types
2. Create TypeScript interfaces for shared data
3. Document usage in README

**Sample Data Structure**:
```typescript
// users.json
[
  {
    "id": "1",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "Admin",
    "avatar": "https://i.pravatar.cc/150?img=1"
  }
]

// products.json
[
  {
    "id": "1",
    "name": "WordPress Site",
    "type": "CMS",
    "status": "active",
    "created": "2026-01-15"
  }
]
```

**Files to Create**:
- `shared-data/users.json`
- `shared-data/products.json`
- `shared-data/index.ts`
- `shared-data/types.ts`

**Verification Steps**:
- Import shared data in a test component
- Verify TypeScript types work correctly

---

### ⏳ Phase 6: Project Templates (TO DO)

**Goal**: Create reusable templates for scaffolding

#### Template: Blank

**Files to Create**:
- `templates/blank/page.tsx.hbs`:
  ```tsx
  import styles from './page.module.css';

  export default function {{pascalCase name}}() {
    return (
      <div className={styles.container}>
        <h1>{{title}}</h1>
        <p>Start building your prototype here.</p>
      </div>
    );
  }
  ```
- `templates/blank/page.module.css.hbs`: Basic container styles
- `templates/blank/metadata.json.hbs`: Metadata template
- `templates/blank/README.md.hbs`: Project instructions

#### Template: Dashboard

**User Preference**: Dashboard should have main page navigation already set up with an empty main content area that designers can work from.

**Files to Create**:
- `templates/dashboard/page.tsx.hbs`:
  - Import PDS navigation components (SideNav, DashboardNav, etc.)
  - Pre-built sidebar/header navigation structure
  - Empty main content area ready for designer work
  - Placeholder text/comments showing where to add content
  - Basic responsive layout
- `templates/dashboard/page.module.css.hbs`:
  - Layout structure (sidebar + main content grid)
  - Basic spacing and responsive styles
  - Using PDS design tokens
- `templates/dashboard/metadata.json.hbs`
- `templates/dashboard/README.md.hbs`

**Design Principles**:
- Navigation framework is set up and ready
- Main content area is empty canvas for designers
- Show best practices for PDS layout components
- Easy to understand and extend
- Include helpful comments explaining structure

---

### ⏳ Phase 7: CLI Scaffolding Tool (TO DO)

**Goal**: Create user-friendly CLI for project creation

**Tasks**:
1. Configure `plopfile.js`:
   ```javascript
   module.exports = function (plop) {
     plop.setGenerator('project', {
       description: 'Create a new prototype project',
       prompts: [
         {
           type: 'input',
           name: 'name',
           message: 'Project name (lowercase-with-dashes):',
           validate: (value) => {
             // Validate naming convention
             // Check for conflicts with existing projects
           }
         },
         {
           type: 'input',
           name: 'title',
           message: 'Project title (display name):'
         },
         {
           type: 'input',
           name: 'description',
           message: 'Project description:'
         },
         {
           type: 'input',
           name: 'creator',
           message: 'Your name:'
         },
         {
           type: 'list',
           name: 'template',
           message: 'Choose a template:',
           choices: ['blank', 'dashboard']
         },
         {
           type: 'list',
           name: 'status',
           message: 'Initial status:',
           choices: ['in-progress', 'review', 'completed', 'archived'],
           default: 'in-progress'
         }
       ],
       actions: [
         // Copy template files to /projects/{{name}}
         // Generate metadata.json with current date
         // Run aggregate-metadata script
         // Show success message with next steps
       ]
     });
   };
   ```

2. Create `scripts/create-project.js` for post-scaffolding tasks:
   - Validate project creation
   - Run metadata aggregation
   - Provide instructions for next steps

**User Experience**:
```bash
$ npm run new

? Project name (lowercase-with-dashes): my-dashboard
? Project title (display name): My Dashboard Prototype
? Project description: Testing new navigation patterns
? Your name: Jane Designer
? Choose a template: dashboard
? Initial status: in-progress

✔ Project created at /projects/my-dashboard
✔ Metadata aggregated
✔ Ready to start coding!

Next steps:
1. Navigate to /projects/my-dashboard
2. Run 'npm run dev' to start development server
3. Visit http://localhost:3000/projects/my-dashboard
```

**Files to Create**:
- `plopfile.js`
- `scripts/create-project.js`

**Verification Steps**:
- Run `npm run new` and create a test project
- Verify all files are scaffolded correctly
- Check metadata is valid and aggregated
- Visit the project URL and see it render

---

### ⏳ Phase 8: Example Projects (TO DO)

**Goal**: Create 1-2 example prototypes to demonstrate best practices

**Examples to Create**:

1. **Example: Simple Dashboard** (`projects/example-dashboard/`)
   - Uses dashboard template as base
   - Shows populated content in main area
   - Demonstrates common PDS components (Cards, Buttons, Tables, etc.)
   - Includes shared data usage
   - Well-commented code
   - Status: `completed`

2. **Example: Basic Form** (`projects/example-form/`) _(Optional)_
   - Uses blank template
   - Shows form layout with PDS form components
   - Demonstrates validation patterns
   - Status: `completed`

**Purpose**:
- Serve as reference implementations
- Show good coding practices
- Demonstrate component usage
- Help designers understand structure

**Tasks**:
1. Create example projects using the CLI tool (once Phase 7 is complete)
2. Build out complete prototypes with helpful comments
3. Ensure they showcase variety of PDS components
4. Mark as `completed` status

**Verification Steps**:
- Example projects appear on homepage
- Clicking "View" shows well-structured prototype
- Code is easy to read and understand

---

### ⏳ Phase 9: Documentation (TO DO)

**Goal**: Comprehensive documentation for designers

**Files to Create/Update**:

#### 1. Root `/README.md`
Contents:
- Project overview
- Quick start guide
- Prerequisites (Node.js version, git, etc.)
- Installation instructions
- Git workflow for designers (high-level)
- How to create a new project (`npm run new`)
- How to delete a project
- Project structure overview
- Troubleshooting common issues
- Links to detailed documentation
- Links to PDS documentation

#### 2. `/docs/DESIGNER_GUIDE.md`
Contents:
- Detailed walkthrough for designers
- Creating your first project (step-by-step)
- Working with Claude Code/Cursor
  - Using the PDS MCP server
  - Common prompts to use
  - How to ask Claude for help
- Using PDS components
  - Where to find component documentation
  - How to import components
  - Common component patterns
- Working with shared data
  - How to import shared data
  - Available data sets
  - Creating project-specific mock data
- Updating project metadata
  - When to update status
  - How to edit metadata.json
- Common patterns and examples
  - Building a page layout
  - Creating forms
  - Using navigation components
  - Styling with PDS tokens
- Publishing to Pantheon multidev
- Tips and best practices

#### 3. `/docs/GIT_WORKFLOW.md`
Contents:
- Git basics for designers
- Branch creation
  - Naming conventions
  - Creating a branch from main
  - Switching branches
- Making changes and committing
  - Staging files
  - Writing commit messages
  - Pushing to remote
- Pantheon multidev deployment
  - How multidev works
  - Accessing your preview URL
  - Troubleshooting deployment issues
- Merging vs deleting branches
  - When to merge to main (preserve work)
  - When to delete branch (temporary work)
  - How to create a pull request
- Resolving simple conflicts
  - What merge conflicts are
  - How to resolve them
  - When to ask for help
- Common git commands reference

#### 4. Template READMEs
- `templates/blank/README.md.hbs`
  - Explains blank template structure
  - How to get started
  - Where to add content
  - Available features

- `templates/dashboard/README.md.hbs`
  - Explains dashboard template structure
  - How navigation is set up
  - How to add content to main area
  - Customizing navigation
  - Available features

**Content Priorities**:
- Clear, step-by-step instructions
- Assume minimal coding knowledge
- Emphasize git branching workflow
- Show examples of common tasks
- Include screenshots/diagrams where helpful
- Use simple, friendly language
- Provide troubleshooting tips

**Verification Steps**:
- Have a designer (or someone unfamiliar with the project) follow the docs
- Identify pain points and unclear sections
- Iterate on documentation based on feedback

---

## Dependencies

```json
{
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@pantheon-systems/pds-toolkit-react": "latest",
    "@pantheon-systems/pds-design-tokens": "latest"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.7.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.1.0",
    "plop": "^4.0.0"
  }
}
```

---

## NPM Scripts

Current scripts in `package.json`:

```json
{
  "scripts": {
    "predev": "node scripts/aggregate-metadata.js",
    "dev": "next dev",
    "prebuild": "node scripts/aggregate-metadata.js",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "aggregate": "node scripts/aggregate-metadata.js",
    "new": "plop project",
    "new:project": "plop project"
  }
}
```

---

## Testing Strategy

### Phase Testing
Each phase includes verification steps to ensure functionality before moving forward.

### End-to-End Testing
1. Create a new project using CLI
2. Verify it appears on homepage
3. Navigate to project page
4. Modify project files
5. Verify changes appear
6. Update metadata
7. Verify homepage reflects changes
8. Create second project
9. Verify both appear correctly
10. Test with actual PDS components

### Designer Testing
- Have a designer create a project
- Observe pain points
- Iterate on documentation
- Improve CLI prompts if needed

---

## Future Enhancements (Out of Scope)

### Multi-Page Support for Projects
**Priority:** Medium
**Complexity:** Medium

Enable projects to have multiple pages with real routing instead of client-side tabs.

**Implementation Approach:**
- Update dynamic route from `/projects/[projectName]/page.tsx` to `/projects/[projectName]/[[...page]]/page.tsx`
- Support nested routes: `/projects/my-project/settings`, `/projects/my-project/users/123`
- Each page would be a separate component file in the project directory
- Update templates to include example multi-page structure
- Document routing patterns for designers

**Example Structure:**
```
projects/my-project/
├── page.tsx              # Main page (/)
├── settings/
│   └── page.tsx          # Settings page (/settings)
├── users/
│   ├── page.tsx          # Users list (/users)
│   └── [id]/
│       └── page.tsx      # User detail (/users/123)
└── metadata.json
```

**Benefits:**
- True deep linking to specific views
- Browser back/forward button support
- Better organization for complex prototypes
- More realistic multi-page app prototypes

**Considerations:**
- Slightly more complex for designers to understand
- Need clear documentation on routing patterns
- May require updates to CLI scaffolding

### Other Enhancements

- Pantheon-specific configuration (pantheon.yml, build hooks)
- Project search/filtering on homepage
- Project duplication feature
- More templates (content-publisher)
- Visual project preview thumbnails
- Collaboration notes/comments
- Analytics tracking
- Component usage statistics
- Automated screenshot generation
- Integration with design tools (Figma)

---

## Success Criteria

- ✅ Next.js builds successfully with PDS components
- ✅ Homepage displays projects using PDS Table
- ✅ Metadata aggregation works automatically
- ⏳ Designers can create a new project in < 2 minutes
- ⏳ Projects are completely self-contained
- ⏳ Deleting a project directory doesn't break the site
- ✅ Homepage always shows current project list
- ✅ PDS components work seamlessly
- ⏳ Minimal CLI knowledge required
- ⏳ Clear documentation for git workflow
- ⏳ Templates provide good starting points
- ⏳ Shared data is easy to use

---

## Implementation Notes

### PDS Component Usage

**Important Learnings**:
1. PDS components must be used in Client Components (`'use client'`)
2. Table component expects `headers` and `rowData` props, not children
3. StatusBadge uses `statusType` (not `status`) with specific values: `'success' | 'info' | 'warning' | 'critical' | 'discovery'`
4. ButtonLink requires `linkContent` prop containing the actual link element
5. EmptyStateCard uses `headingText`, `summary`, and `linkContent` props

### PDS Design Tokens

Available token categories:
- **Spacing**: `--pds-spacing-{size}` (5xs, 4xs, 3xs, 2xs, xs, s, m, l, xl, 2xl, 3xl, etc.)
- **Typography**:
  - Font families: `--pds-typography-ff-{type}` (default, mono, sans, serif)
  - Font sizes: `--pds-typography-size-{size}` (xs, s, m, l, xl, 2xl, etc.)
  - Font weights: `--pds-typography-fw-{weight}` (light, regular, medium, semibold, bold)
  - Line heights: `--pds-typography-lh-{size}` (s, m, l, xl)
- **Colors**:
  - Foreground: `--pds-color-fg-{type}` (default, default-secondary, reverse, etc.)
  - Background: `--pds-color-bg-{type}` (default, default-secondary, reverse, etc.)
  - Borders: `--pds-color-border-{type}` (default, input, separator, etc.)
- **Borders**:
  - Radius: `--pds-border-radius-{type}` (default, button, container, input, bar)
  - Width: `--pds-border-width-{type}` (default, double, triple, outline, stepper)

### Common Issues & Solutions

**Issue**: `require()` style imports fail in Next.js
- **Solution**: Use ES6 imports (`import fs from 'fs'`) or `promises as fs` for async file operations

**Issue**: PDS components cause "createContext is not a function" error
- **Solution**: Use `'use client'` directive for components using PDS React components

**Issue**: Table component shows "Cannot read properties of undefined (reading 'map')"
- **Solution**: Use `headers` and `rowData` props instead of children

---

## Quick Commands Reference

```bash
# Start development server
npm run dev

# Create a new project
npm run new

# Manually run metadata aggregation
npm run aggregate

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

---

## Contact & Support

For questions or issues:
1. Check this documentation
2. Review the example projects
3. Consult the PDS Toolkit React documentation
4. Ask in the team channel

---

**Last Updated**: February 3, 2026
**Version**: 1.0.0
**Status**: In Development (Phase 3 of 9 complete)
