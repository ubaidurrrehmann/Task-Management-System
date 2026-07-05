import { useState, useEffect } from 'react';
// Keeping your imports intact, though not used in this view
import { STATUSES, STATUS_CONFIG, PRIORITIES } from '../constants';

export default function NewsModal({ onClose }) {
  const [isLoading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = 'pub_c1a4c7a0e1ba42baa43f4212b9a5e72d';
    const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&language=en`;

    const fetchNews = async () => {
      setLoading(true); // Ensure loading state is activated
      try {
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
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

  // Format date helper to make pubDate look standard (optional)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString.replace(' ', 'T')); // Handles the API's 'YYYY-MM-DD HH:MM:SS' format safely
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <h2>Latest Updates</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="modal-form">
          {isLoading ? (
            <div className="news-loading">
              <div className="spinner"></div>
              <span>Loading news...</span>
            </div>
          ) : error ? (
            <div className="news-error">Error fetching news: {error}</div>
          ) : articles.length === 0 ? (
            <div className="news-empty">No latest news available right now.</div>
          ) : (
            <div className="news-container">
              {articles.map((article, index) => (
                <a 
                  key={article.article_id || index}
                  href={article.link}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="news-card"
                >
                  {article.image_url && (
                    <div className="news-card-image">
                      <img src={article.image_url} alt={article.title} loading="lazy" />
                    </div>
                  )}
                  <div className="news-card-content">
                    <span className="news-date">{formatDate(article.pubDate)}</span>
                    <h3 className="news-title">{article.title}</h3>
                    {article.description && (
                      <p className="news-description">{article.description}</p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}