'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Table, IndicatorBadge, ButtonLink, EmptyStateCard, Container, Navbar, GlobalWrapper } from '@pantheon-systems/pds-toolkit-react'
import { ProjectMetadata, STATUS_CONFIG } from '@/types/project'
import styles from './page.module.css'

function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export default function HomePage() {
  const [projects, setProjects] = useState<ProjectMetadata[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch('/api/projects')
        const data = await response.json()
        setProjects(data)
      } catch (error) {
        console.error('Error loading projects:', error)
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  // Prepare table headers
  const headers = [
    { title: 'Title' },
    { title: 'Description' },
    { title: 'Creator' },
    { title: 'Status' },
    { title: 'Template' },
    { title: 'Created' },
    { title: 'Last Updated' },
    { title: 'Action' },
  ]

  // Prepare table row data
  const rowData = projects.map((project) => [
    <strong key={`${project.id}-title`}>{project.title}</strong>,
    <span key={`${project.id}-desc`} className={styles.descriptionCell}>{project.description}</span>,
    project.creator,
    <IndicatorBadge
      key={`${project.id}-status`}
      color={STATUS_CONFIG[project.status].color}
      label={STATUS_CONFIG[project.status].label}
      size="sm"
    />,
    <span key={`${project.id}-template`} className={styles.templateBadge}>
      {project.template}
    </span>,
    formatDate(project.createdDate),
    formatDate(project.lastUpdated),
    <ButtonLink
      key={`${project.id}-action`}
      linkContent={<Link href={`/projects/${project.id}`}>View</Link>}
      variant="secondary"
      size="sm"
    />
  ])

  if (loading) {
    return (
      <GlobalWrapper>
        <Navbar
          logoDisplayType="sub-brand"
          logoSubBrand="PDS Prototypes"
          containerWidth="x-wide"
        />
        <main>
          <Container className='pds-mar-block-3xl' width="x-wide">
            <p>Loading projects...</p>
          </Container>
        </main>
      </GlobalWrapper>
    )
  }

  return (
    <GlobalWrapper>
      <Navbar
        logoDisplayType="sub-brand"
        logoSubBrand="PDS Prototypes"
        containerWidth="x-wide"
      />
      <main>
        <Container className='pds-mar-block-3xl' width="x-wide">
          {projects.length === 0 ? (
            <EmptyStateCard
              headingText="No projects yet"
              summary="Create your first project to get started with prototyping. Run the command below in your terminal."
              linkContent={
                <div className={styles.emptyStateCta}>
                  <code className={styles.code}>npm run new</code>
                </div>
              }
            />
          ) : (
            <div className={styles.projectsSection}>
              <div className={styles.projectsHeader}>
                <h1 className='pds-ts-2xl pds-mar-block-end-xl'>All Projects</h1>
              </div>

              <Table headers={headers} rowData={rowData} />
            </div>
          )}

          <footer className={styles.footer}>
            <p>
              To create a new project, run <code>npm run new</code> in your terminal
            </p>
          </footer>
        </Container>
      </main>
    </GlobalWrapper>
  )
}
