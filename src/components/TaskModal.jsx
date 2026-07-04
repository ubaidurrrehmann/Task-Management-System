import { useState, useEffect } from 'react'
import { STATUSES, STATUS_CONFIG, PRIORITIES } from '../constants'

const emptyForm = {
  title: '',
  description: '',
  status: STATUSES.TODO,
  priority: 'medium',
}

export default function TaskModal({ isOpen, onClose, onSave, task }) {
  const [form, setForm] = useState(emptyForm)
  const isEditing = Boolean(task)

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
      })
    } else {
      setForm(emptyForm)
    }
  }, [task, isOpen])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    onSave(form)
    onClose()
  }

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditing ? 'Edit Task' : 'Create Task'}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              type="text"
              value={form.title}
              onChange={handleChange('title')}
              placeholder="Enter task title"
              autoFocus
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={form.description}
              onChange={handleChange('description')}
              placeholder="Add a description..."
              rows={4}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select id="status" value={form.status} onChange={handleChange('status')}>
                {STATUS_CONFIG.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select id="priority" value={form.priority} onChange={handleChange('priority')}>
                {PRIORITIES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
