'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ButtonLink, IndicatorBadge, IconButton } from '@pantheon-systems/pds-toolkit-react'
import { ProjectMetadata, STATUS_CONFIG } from '@/types/project'
import styles from './page.module.css'

interface ProjectHeaderProps {
  metadata: ProjectMetadata
  template: string
}

export default function ProjectHeader({ metadata, template }: ProjectHeaderProps) {
  const [isHidden, setIsHidden] = useState(false)

  // Load hidden state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('projectHeaderHidden')
    if (saved !== null) {
      setIsHidden(saved === 'true')
    }
  }, [])

  // Save hidden state to localStorage
  const toggleHeader = () => {
    const newState = !isHidden
    setIsHidden(newState)
    localStorage.setItem('projectHeaderHidden', String(newState))
  }

  const headerClass = template === 'dashboard' ? styles.projectHeaderDashboard : styles.projectHeaderDefault

  return (
    <div className={styles.headerWrapper}>
      <nav className={`${styles.projectHeader} ${headerClass} ${isHidden ? styles.projectHeaderHidden : ''}`}>
        <div className={styles.projectHeaderLeft}>
          <ButtonLink
            variant="subtle"
            displayType="icon-start"
            iconName="angleLeft"
            linkContent={<Link href="/">Back to Projects</Link>}
            size="sm"
          />
        </div>

        <div className={styles.projectHeaderRight}>
          <span className={styles.projectTitle}>{metadata.title}</span>
          <span className={styles.metaSeparator}>•</span>
          <span className={styles.projectCreator}>{metadata.creator}</span>
          <span className={styles.metaSeparator}>•</span>
          <IndicatorBadge
            color={STATUS_CONFIG[metadata.status].color}
            label={STATUS_CONFIG[metadata.status].label}
            size="sm"
          />
        </div>
      </nav>

      <div className={`${styles.projectHeaderToggle} ${isHidden ? styles.toggleHidden : ''}`}>
        <IconButton
          iconName={isHidden ? 'angleDown' : 'angleUp'}
          onClick={toggleHeader}
          ariaLabel={isHidden ? 'Show project info' : 'Hide project info'}
          size="sm"
        />
      </div>
    </div>
  )
}
