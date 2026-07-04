import TaskCard from './TaskCard'

export default function TaskColumn({ status, label, color, tasks, onEdit, onDelete, onStatusChange }) {
  return (
    <div className="task-column">
      <div className="column-header">
        <span className="column-status-dot" style={{ backgroundColor: color }} />
        <h2 className="column-title">{label}</h2>
        <span className="column-count">{tasks.length}</span>
      </div>

      <div className="column-tasks">
        {tasks.length === 0 ? (
          <p className="column-empty">No tasks</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </div>
    </div>
  )
}
