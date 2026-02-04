# PDS Prototypes

A prototyping playground for designers to build interactive prototypes using the Pantheon Design System (PDS).

## Overview

This Next.js application provides a collaborative space for designers to create, share, and iterate on prototypes using real PDS components. Each designer may work on their own branch, and can use Pantheon multidev environments to preview and share their work.

## Quick Start

### Prerequisites

- Node.js 22 or higher
- Git installed and configured
- Access to this repository

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/pantheon-systems/pds-prototypes.git
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

### Working with Claude Code

This project is designed to work seamlessly with Claude Code. The PDS MCP server is configured, so Claude has direct access to all PDS components and their documentation.

#### Building with PDS Components

Ask Claude to build UI elements using PDS components. Here are example prompts:

**Basic Components:**

- "Add a Button component with the label 'Submit'"
- "Create a Card component with a heading and description"
- "Add a Container component to wrap this page content"

**Data Display:**

- "Create a Table component showing all active sites"
- "Add an IndicatorBadge to show the site status"
- "Build a card layout displaying user information"
- "Create a list of sites with their name, plan, and status"

**Styling:**

- "Style this heading using PDS design tokens"
- "Update the spacing to use PDS spacing tokens"
- "Change the button variant to 'primary'"

Claude will automatically:

- Import the correct PDS components
- Use proper TypeScript types
- Handle all setup (templates already include `'use client'` and `GlobalWrapper`)

All PDS components will work out of the box - no additional setup needed.

#### Using Shared Data

Ask Claude to use the shared mock data available in `/shared-data/`:

**Site Data:**

- "Display a table of all sites from shared data"
- "Show only the active sites in a card grid"
- "Create a list of sites grouped by framework"
- "Filter sites by plan tier and display them"

**User Data:**

- "Show a list of all users with their roles"
- "Create user profile cards using shared data"
- "Display team members in a table"

**Example Prompts:**

- "Use the sites data to create a dashboard showing site metrics"
- "Build a user directory using the shared user data"
- "Show the 5 most recently updated sites from shared data"

Claude will automatically import the data and helper functions you need.

See `/shared-data/README.md` for available data and helper functions.

## Git Workflow

### Stage 1: Work Locally

Start building your prototype on a local branch. Preview at http://localhost:3000:

**Terminal:**

```bash
# Make changes to your project
# ...

# Commit your changes locally
git add .
git commit -m "Add site management interface"
```

**GitHub Desktop:**

1. Make changes to your project files
2. GitHub Desktop will show your changes in the left sidebar
3. Add a commit message in the bottom left
4. Click "Commit to your-name/project-name"

Continue iterating locally without pushing. This is perfect for exploration and early development.

### Stage 2: Share In-Progress Work

When you're ready to share your prototype with others:

1. **Push your branch** to GitHub:

   **Terminal:**

   ```bash
   git push origin your-name/project-name
   ```

   **GitHub Desktop:**

   - Click "Push origin" button in the top toolbar

2. **Create a Draft Pull Request**:

   - Go to the repository on GitHub in your web browser
   - Click "Pull requests" → "New pull request"
   - Select your branch to merge into `main`
   - Add a title and description of what you're working on
   - Click "Create **draft** pull request" (use the dropdown arrow)

   Alternatively, in **GitHub Desktop**:

   - Click "Preview Pull Request" button
   - Review changes and click "Create pull request"
   - This opens GitHub in your browser where you can make it a draft

3. **Multidev environment created**:

   - A multidev environment is automatically created for your PR
   - You'll receive a URL to share with teammates and PMs
   - Continue pushing updates as you iterate
   - The multidev URL updates automatically with each push

4. **Collaborate and iterate**:

   - Share the multidev URL for feedback
   - Make changes based on feedback
   - Push updates:

   **Terminal:** `git push origin your-name/project-name`

   **GitHub Desktop:** Click "Push origin" button

   No approval needed yet - this is your working space

### Stage 3: Final Handoff or Archive

When your prototype is ready for final handoff or to be archived:

1. **Request approval**:

   - Mark your draft PR as "Ready for review"
   - **Request a review from `mel-miller`**
   - Add final context about what this prototype demonstrates

2. **Merge to main**:
   - After approval, merge the PR
   - Your prototype is now on the main URL
   - Use the main URL for stakeholder demos and handoffs
   - The multidev branch will be cleaned up automatically

### Temporary/Exploratory Work

If you were just exploring and don't want to share or keep the prototype:

1. **Don't create a PR** - just work locally
2. When you're done, delete your local branch:

   **Terminal:**

   ```bash
   git checkout main
   git pull origin main
   git branch -D your-name/project-name
   ```

   **GitHub Desktop:**

   - Switch to the `main` branch using the branch dropdown
   - Click "Fetch origin" then "Pull origin" to get latest changes
   - Right-click your branch in the branch list
   - Select "Delete..."

### Keeping Projects in Sync

Periodically pull the latest changes from main to see other designers' work:

**Terminal:**

```bash
git checkout main
git pull origin main
```

**GitHub Desktop:**

1. Switch to the `main` branch using the branch dropdown
2. Click "Fetch origin" to check for updates
3. Click "Pull origin" to download the latest changes

See `/docs/GIT_WORKFLOW.md` for more details.

## Advanced Use

For developers who prefer to write code directly instead of using Claude Code:

### Using PDS Components Directly

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

**Important Notes:**

- All templates already include `'use client'` and `GlobalWrapper` - you don't need to add these
- The code example above shows the structure for reference
- Import only the components you need to optimize bundle size

### Using Shared Data Directly

Import data and helper functions:

```typescript
import { sites, users, getActiveSites } from '@/shared-data'

export default function MyPrototype() {
	const activeSites = getActiveSites()

	return (
		<div>
			{activeSites.map((site) => (
				<div key={site.id}>
					{site.name} - {site.upstream} - {site.plan}
				</div>
			))}
		</div>
	)
}
```

**Available Data:**

- `sites` - Array of 40 mock Pantheon sites with realistic data
- `users` - Array of mock user objects
- `getActiveSites()` - Helper to filter only active sites
- `getSitesByFramework()` - Helper to group sites by framework

See `/shared-data/README.md` for the complete data schema and all available helpers.

## Code Formatting

This project uses Prettier and ESLint to maintain consistent code style.

### VSCode Auto-Formatting

If you're using VSCode, formatting will happen automatically:

- **On Save** - Files are formatted with Prettier every time you save
- **On Commit** - Pre-commit hook runs Prettier and ESLint fixes

The project includes VSCode workspace settings (`.vscode/settings.json`) that enable format-on-save. When you open the project, VSCode will prompt you to install the recommended extensions:

- Prettier - Code formatter
- ESLint - JavaScript/TypeScript linter

### Manual Formatting

You can also format code manually:

```bash
# Format all files and fix lint issues
npm run format:fix

# Run ESLint only
npm run eslint:all
```

### Code Style

- **Quotes:** Single quotes (including JSX)
- **Indentation:** Tabs (not spaces)
- **Semicolons:** Required
- **Import sorting:** Automatic (React/Next first, then external, then internal)
- **JSX props:** Sorted alphabetically
- **CSS properties:** Sorted alphabetically

## Deleting a Project

To remove a project completely:

1. Delete the project folder:

   **Terminal:**

   ```bash
   rm -rf projects/your-project-name
   ```

   **Finder (macOS) / File Explorer (Windows):**

   - Navigate to the `projects` folder in your code editor or file browser
   - Right-click the project folder (e.g., `your-project-name`)
   - Select "Move to Trash" (macOS) or "Delete" (Windows)

2. The homepage will automatically update when you restart the dev server

## Available Commands

| Command              | Description                          |
| -------------------- | ------------------------------------ |
| `npm run dev`        | Start development server             |
| `npm run build`      | Build for production                 |
| `npm run start`      | Start production server              |
| `npm run new`        | Create a new project                 |
| `npm run aggregate`  | Manually update project metadata     |
| `npm run lint`       | Run Next.js linter                   |
| `npm run eslint:all` | Run ESLint on all files              |
| `npm run format:fix` | Format all files and fix lint issues |

## Documentation

- **[Designer Guide](/docs/DESIGNER_GUIDE.md)** - Detailed walkthrough for designers
- **[Git Workflow](/docs/GIT_WORKFLOW.md)** - Git basics and branching strategy
- **[Shared Data](/shared-data/README.md)** - Available mock data

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

**Using Claude Code (Recommended):**

Ask Claude to fix the issue:

- "This component isn't working, can you fix it?"
- "Check if all imports are correct"

**Note:** All project templates already include the required setup (`'use client'` and `GlobalWrapper`), so components should work immediately. If you're still having issues, ask Claude to troubleshoot.

If you're writing code directly, see the "Advanced Use" section for examples.

## Contributing

This is an internal tool for designers. If you have suggestions for improvements:

1. Create an issue on GitHub
2. Discuss with the team
3. Submit a pull request
