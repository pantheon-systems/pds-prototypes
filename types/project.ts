/**
 * Project metadata schema
 */

export interface ProjectMetadata {
  /** Unique identifier (typically the directory name) */
  id: string

  /** Display title for the project */
  title: string

  /** Brief description of the prototype */
  description: string

  /** Name of the designer who created this project */
  creator: string

  /** ISO date string when the project was created */
  createdDate: string

  /** ISO timestamp when the project was last modified */
  lastUpdated: string

  /** Current status of the project */
  status: ProjectStatus

  /** Template used to create this project */
  template: 'blank' | 'dashboard'
}

export type ProjectStatus = 'in-progress' | 'review' | 'ready' | 'archived'

export const PROJECT_STATUSES: readonly ProjectStatus[] = [
  'in-progress',
  'review',
  'ready',
  'archived',
] as const

/**
 * PDS IndicatorBadge color types
 */
export type PDSBadgeColor = 'critical' | 'info' | 'success' | 'warning' | 'neutral' | 'brand' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'default'

/**
 * Status display configuration for UI
 */
export const STATUS_CONFIG: Record<ProjectStatus, { label: string; color: PDSBadgeColor }> = {
  'in-progress': {
    label: 'In progress',
    color: 'info',  // Blue badge
  },
  'review': {
    label: 'In review',
    color: 'warning',  // Yellow/orange badge
  },
  'ready': {
    label: 'Ready for handoff',
    color: 'success',  // Green badge
  },
  'archived': {
    label: 'Archived',
    color: 'neutral',  // Gray badge
  },
}
