import { PRIORITIES } from '../constants'

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const priority = PRIORITIES.find((p) => p.id === task.priority) || PRIORITIES[1]

  return (
    <div className="task-card">
      <div className="task-card-header">
        <span className="priority-badge" style={{ backgroundColor: priority.color }}>
          {priority.label}
        </span>
        <div className="task-card-actions">
          <button className="icon-btn" onClick={() => onEdit(task)} title="Edit task">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button className="icon-btn icon-btn-danger" onClick={() => onDelete(task.id)} title="Delete task">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>

      <h3 className="task-card-title">{task.title}</h3>

      {task.description && (
        <p className="task-card-description">{task.description}</p>
      )}

      <div className="task-card-footer">
        <select
          className="status-select"
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          aria-label="Change task status"
        >
          <option value="Pending">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  )
}
