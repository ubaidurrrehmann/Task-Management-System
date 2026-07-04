export const STATUSES = {
  TODO: 'Pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
}

export const STATUS_CONFIG = [
  { id: STATUSES.TODO, label: 'To Do', color: '#42526E' },
  { id: STATUSES.IN_PROGRESS, label: 'In Progress', color: '#0052CC' },
  { id: STATUSES.COMPLETED, label: 'Completed', color: '#00875A' },
]

export const PRIORITIES = [
  { id: 'low', label: 'Low', color: '#006644' },
  { id: 'medium', label: 'Medium', color: '#FF991F' },
  { id: 'high', label: 'High', color: '#DE350B' },
]
