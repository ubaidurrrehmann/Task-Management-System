export default function Header({ onAddTask, taskCount }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-brand">
          <div className="header-logo">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div>
            <h1 className="header-title">Task Management System</h1>
            <p className="header-subtitle">{taskCount} tasks total</p>
          </div>
        </div>
        <button className="btn btn-primary" onClick={onAddTask}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Task
        </button>
      </div>
    </header>
  )
}
