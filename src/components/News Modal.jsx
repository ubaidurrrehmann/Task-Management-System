import { useState, useEffect } from 'react'
import { STATUSES, STATUS_CONFIG, PRIORITIES } from '../constants'

const emptyForm = {
  title: '',
  description: '',
  status: STATUSES.TODO,
  priority: 'medium',
}

export default function NewsModal({ onClose }) {
  const [isLoading, setLoading] = useState(false)

  // useEffect(() => {
  
  // }, [])

  const fetchNews = (e) => {
    // e.preventDefault()
    // if (!form.title.trim()) return
    // onSave(form)
    // onClose()
  }


  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{'Latest Updates'}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="modal-form">
          {
            isLoading ? 
            <span>Loading news...</span>
            :
            <div>
              news are here
            </div>
          }
        </div>

        {/* <form onSubmit={handleSubmit} className="modal-form"> */}
          

          {/* <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Save Changes' : 'Create Task'}
            </button>
          </div> */}
        {/* </form> */}
      </div>
    </div>
  )
}
