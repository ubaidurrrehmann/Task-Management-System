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
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Pull the key from Vite's env
    const apiKey = 'pub_c1a4c7a0e1ba42baa43f4212b9a5e72d';
    const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&language=en`; // added English filter as an example

    const fetchNews = async () => {
      try {
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // NewsData.io returns articles inside a "results" array
        if (data.results) {
          setArticles(data.results);
        } else {
          setArticles([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (isLoading) return <p>Loading latest news...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;


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
