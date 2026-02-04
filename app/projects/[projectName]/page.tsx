import { notFound } from 'next/navigation'
import Link from 'next/link'
import { promises as fs } from 'fs'
import path from 'path'
import dynamic from 'next/dynamic'
import { ProjectMetadata } from '@/types/project'
import styles from './page.module.css'

// Generate static paths for all projects
export async function generateStaticParams() {
  try {
    const projectsDir = path.join(process.cwd(), 'projects')
    const entries = await fs.readdir(projectsDir, { withFileTypes: true })

    // Filter for directories, exclude hidden files
    const directories = entries
      .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
      .map(entry => ({
        projectName: entry.name
      }))

    return directories
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// Get project metadata
async function getProjectMetadata(projectName: string): Promise<ProjectMetadata | null> {
  try {
    const metadataPath = path.join(process.cwd(), 'projects', projectName, 'metadata.json')
    const content = await fs.readFile(metadataPath, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    console.error(`Error reading metadata for ${projectName}:`, error)
    return null
  }
}

// Check if project has a page.tsx file
async function projectPageExists(projectName: string): Promise<boolean> {
  try {
    const pagePath = path.join(process.cwd(), 'projects', projectName, 'page.tsx')
    await fs.access(pagePath)
    return true
  } catch {
    return false
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectName: string }>
}) {
  const { projectName } = await params

  // Check if project exists and has required files
  const metadata = await getProjectMetadata(projectName)
  const hasPage = await projectPageExists(projectName)

  if (!metadata) {
    notFound()
  }

  // Dynamically import the project's page component
  let ProjectComponent = null

  if (hasPage) {
    try {
      // Dynamic import of the project's page component
      ProjectComponent = dynamic(
        () => import(`@/projects/${projectName}/page`),
        {
          loading: () => <p>Loading prototype...</p>,
          ssr: true,
        }
      )
    } catch (error) {
      console.error(`Error loading project component for ${projectName}:`, error)
    }
  }

  return (
    <div className={styles.projectPage}>
      {/* Back navigation */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.backLink}>
          ← Back to Projects
        </Link>
      </nav>

      {/* Project header */}
      <header className={styles.header}>
        <h1 className={styles.title}>{metadata.title}</h1>
        <div className={styles.meta}>
          <span className={styles.creator}>By {metadata.creator}</span>
          <span className={styles.separator}>•</span>
          <span className={styles.status}>{metadata.status}</span>
          <span className={styles.separator}>•</span>
          <span className={styles.template}>{metadata.template} template</span>
        </div>
        {metadata.description && (
          <p className={styles.description}>{metadata.description}</p>
        )}
      </header>

      {/* Project content */}
      <main className={styles.content}>
        {ProjectComponent ? (
          <ProjectComponent />
        ) : (
          <div className={styles.emptyState}>
            <h2>No page.tsx found</h2>
            <p>This project doesn&apos;t have a page.tsx file yet.</p>
            <p>Create a <code>page.tsx</code> file in <code>/projects/{projectName}/</code> to get started.</p>
          </div>
        )}
      </main>
    </div>
  )
}
