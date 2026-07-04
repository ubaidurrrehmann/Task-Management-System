import { STATUS_CONFIG } from '../constants'
import TaskColumn from './TaskColumn'

export default function TaskBoard({ tasks, onEdit, onDelete, onStatusChange }) {
  return (
    <div className="task-board">
      {STATUS_CONFIG.map((status) => (
        <TaskColumn
          key={status.id}
          status={status.id}
          label={status.label}
          color={status.color}
          tasks={tasks.filter((t) => t.status === status.id)}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  )
}
