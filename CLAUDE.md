# Claude Instructions for PDS Prototypes

## Project Purpose

This is a **prototyping playground** for designers to build interactive prototypes using the **Pantheon Design System (PDS)**. Designers use Claude Code to quickly create prototypes without writing code manually.

**Primary Goal:** Enable designers to build high-fidelity prototypes using real PDS components, not custom implementations.

## Critical Rules

### 1. ALWAYS Use PDS Components First

**Before creating ANY UI element, check if a PDS component exists.**

- ✅ Use existing PDS components (Button, Card, Table, Modal, etc.)
- ❌ DO NOT create custom buttons, cards, tables, or other common UI elements
- ❌ DO NOT use HTML elements when a PDS component exists

**How to check:**

1. Search the PDS MCP server for available components
2. Review component documentation and props before using
3. Only create custom components if NO suitable PDS component exists

### 2. ALWAYS Use PDS Design Tokens

**Before writing ANY custom CSS values, check if a PDS token exists.**

- ✅ Use PDS tokens for spacing, colors, typography, borders, etc.
- ❌ DO NOT use hard-coded values like `16px`, `#333`, `1rem`, etc.

**Examples:**

```css
/* ✅ CORRECT - Use PDS tokens */
padding: var(--pds-spacing-m);
color: var(--pds-color-fg-default);
font-size: var(--pds-typography-size-l);
border-radius: var(--pds-border-radius-default);

/* ❌ WRONG - Hard-coded values */
padding: 16px;
color: #333;
font-size: 18px;
border-radius: 4px;
```

**Available token categories:**

- **Spacing:** `--pds-spacing-{5xs|4xs|3xs|2xs|xs|s|m|l|xl|2xl|3xl|4xl|5xl}`
- **Typography:** `--pds-typography-size-{xs|s|m|l|xl|2xl|3xl|4xl}`
- **Colors:** `--pds-color-{fg|bg|border}-{default|secondary|reverse|etc}`
- **Borders:** `--pds-border-radius-{default|container|etc}`
- **Line height:** `--pds-typography-lh-{s|m|l}`
- **Font weight:** `--pds-typography-fw-{regular|medium|semibold|bold}`

### 3. Read PDS Component Documentation

**NEVER assume component props or usage patterns.**

Before using any PDS component:

1. **Look up the component in the PDS MCP server** to see available props
2. **Read the documentation** to understand correct usage
3. **Check for required vs optional props**
4. **Verify prop types** (string, boolean, JSX element, etc.)

**Common mistakes to avoid:**

```typescript
// ❌ WRONG - Assuming props
<Button icon="check">Submit</Button>

// ✅ CORRECT - Using actual props
<Button iconName="check" displayType="icon-start">Submit</Button>

// ❌ WRONG - Assuming structure
<ButtonLink href="/page">Link</ButtonLink>

// ✅ CORRECT - Using linkContent prop
<ButtonLink linkContent={<Link href="/page">Link</Link>} />
```

### 4. NO Tailwind CSS

**This project does NOT use Tailwind CSS.**

- ❌ DO NOT use Tailwind classes (`className="flex items-center p-4"`)
- ❌ DO NOT suggest installing Tailwind
- ✅ Use CSS Modules with PDS design tokens

### 5. CSS Modules for Custom Styles

**All custom styles must use CSS Modules, never inline styles or global CSS.**

```typescript
// ✅ CORRECT - CSS Modules
import styles from './page.module.css'

<div className={styles.customLayout}>
  {/* content */}
</div>
```

```css
/* page.module.css */
.customLayout {
	background: var(--pds-color-bg-default);
	display: grid;
	gap: var(--pds-spacing-m);
	padding: var(--pds-spacing-l);
}
```

## Project Structure

### Templates Already Include:

- ✅ `'use client'` directive
- ✅ `GlobalWrapper` wrapping all content
- ✅ Basic imports and structure

**DO NOT tell users to add these** - they're already set up.

### File Organization:

```
projects/project-name/
├── page.tsx              # Main component (already has 'use client' + GlobalWrapper)
├── page.module.css       # Styles using PDS tokens
├── components/           # Optional custom components
├── data/                 # Optional project-specific data
└── README.md            # Project notes
```

## Common Workflows

### Adding a PDS Component:

1. **Look up the component** in PDS MCP server
2. **Read the props documentation**
3. **Import and use correctly:**

```typescript
'use client'

import { Button, Card, Container } from '@pantheon-systems/pds-toolkit-react'
import styles from './page.module.css'

export default function MyPage() {
	return (
		<Container>
			<Card>
				<h2>Title</h2>
				<Button variant="primary">Click Me</Button>
			</Card>
		</Container>
	)
}
```

### Using Shared Data:

The project provides mock data for prototyping:

```typescript
import { sites, users, getActiveSites } from '@/shared-data'

export default function Dashboard() {
	const activeSites = getActiveSites()

	return (
		<div>
			{activeSites.map((site) => (
				<div key={site.id}>{site.name}</div>
			))}
		</div>
	)
}
```

### Creating Custom Styles:

**Only when no PDS component exists:**

```css
/* page.module.css */
.customGrid {
	display: grid;
	gap: var(--pds-spacing-m);
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	padding: var(--pds-spacing-l);
}

.customCard {
	background: var(--pds-color-bg-default-secondary);
	border: 1px solid var(--pds-color-border-default);
	border-radius: var(--pds-border-radius-container);
	padding: var(--pds-spacing-m);
}
```

## Code Style

### Formatting:

- **Quotes:** Single quotes (including JSX)
- **Indentation:** Tabs
- **Semicolons:** Required
- **Import sorting:** Automatic (React/Next first, then external, then internal)
- **JSX props:** Sorted alphabetically

Prettier and ESLint are configured - code will auto-format on save in VSCode.

### TypeScript:

- Use proper types for components and data
- Import types from PDS and shared-data when available

```typescript
import type { Site, User } from '@/shared-data';

interface MyComponentProps {
	sites: Site[];
	user: User;
}
```

## What NOT to Do

❌ **DO NOT create custom buttons** - Use `<Button>` from PDS
❌ **DO NOT create custom modals** - Use `<Modal>` from PDS
❌ **DO NOT create custom tables** - Use `<Table>` from PDS
❌ **DO NOT create custom form inputs** - Use PDS form components
❌ **DO NOT use hard-coded spacing values** - Use `--pds-spacing-*` tokens
❌ **DO NOT use hard-coded colors** - Use `--pds-color-*` tokens
❌ **DO NOT use Tailwind classes** - Use CSS Modules with PDS tokens
❌ **DO NOT add GlobalWrapper or 'use client'** - Templates already include these
❌ **DO NOT assume component props** - Always check PDS documentation first

## When Users Ask For Help

### "Add a button":

1. Look up `Button` component in PDS MCP
2. Check available props (variant, size, iconName, etc.)
3. Use the correct props:

```typescript
<Button variant="primary" size="lg">Submit</Button>
```

### "Make this look better":

1. Use PDS components instead of HTML elements
2. Apply PDS spacing tokens for consistent layout
3. Use PDS typography tokens for text styling
4. Use PDS color tokens for backgrounds and borders

### "Add a table of sites":

1. Use PDS `<Table>` component
2. Import sites from `@/shared-data`
3. Format data correctly for Table props

```typescript
import { Table } from '@pantheon-systems/pds-toolkit-react'
import { sites } from '@/shared-data'

const headers = [{ title: 'Name' }, { title: 'Plan' }]
const rowData = sites.map((site) => [site.name, site.plan])

<Table headers={headers} rowData={rowData} />
```

## Templates

### Blank Template:

- Minimal starting point
- Already includes `'use client'` and `GlobalWrapper`
- Empty content area ready for building

### Dashboard Template:

- Complete `DashboardGlobal` layout from PDS
- Pre-configured sidebar navigation, navbar, footer
- Sample data for workspace selector, search, menus
- Blank main content area for prototype work

## Remember

🎯 **This is a design prototyping tool** - Help designers build quickly using real PDS components

📚 **PDS components are the source of truth** - Don't reinvent what already exists

🎨 **Design tokens ensure consistency** - Never hard-code values that have tokens

📖 **Documentation over assumptions** - Always check component props before using

🚫 **No Tailwind** - CSS Modules with PDS tokens only

✨ **Make it easy for designers** - They're using Claude Code to build without writing code manually

---

**When in doubt:** Check if a PDS component exists → Read its documentation → Use it correctly
