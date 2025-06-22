// Created By Deepak Kushwaha (IIT MANDI)

import React, { useState, useEffect } from 'react';
import { Clock, User, MapPin, Tag, Image, X } from 'lucide-react';

const LocalNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [imageErrors, setImageErrors] = useState({});
  const [selectedArticle, setSelectedArticle] = useState(null);
  const articlesPerPage = 12;

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/news');
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data = await response.json();
      setNews(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleImageError = (articleId) => {
    setImageErrors(prev => ({ ...prev, [articleId]: true }));
  };

  const openFullArticle = (article) => {
    setSelectedArticle(article);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  const closeFullArticle = () => {
    setSelectedArticle(null);
    document.body.style.overflow = 'unset'; // Restore scroll
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const filteredNews = news.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredNews.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = filteredNews.slice(startIndex, startIndex + articlesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingContent}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading local news...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorContent}>
          <div style={styles.errorIcon}>⚠️</div>
          <p style={styles.errorText}>Error loading news: {error}</p>
          <button onClick={fetchNews} style={styles.retryButton}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerTop}>
            <div style={styles.headerLeft}>
              <div style={styles.badge}>
                📰 Local News
              </div>
              <h1 style={styles.title}>Community Stories</h1>
            </div>
            <div style={styles.headerRight}>
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={styles.statsBar}>
        <div style={styles.statsContent}>
          <div style={styles.statsLeft}>
            <span style={styles.stat}>
              📊 Total Articles: <strong>{news.length}</strong>
            </span>
            <span style={styles.stat}>
              🔍 Showing: <strong>{currentArticles.length}</strong> articles
            </span>
          </div>
          <div style={styles.statsRight}>
            📄 Page: <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div style={styles.mainContent}>
        {currentArticles.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📰</div>
            <h3 style={styles.emptyTitle}>No news found</h3>
            <p style={styles.emptyText}>
              {searchTerm ? 'Try adjusting your search terms' : 'No local news articles available yet'}
            </p>
          </div>
        ) : (
          <div style={styles.newsGrid}>
            {currentArticles.map((article) => (
              <div key={article._id} style={styles.newsCard}>
                {/* Article Image */}
                {article.imageUrl && (
                  <div style={styles.imageContainer}>
                    {!imageErrors[article._id] ? (
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        style={styles.articleImage}
                        onError={() => handleImageError(article._id)}
                      />
                    ) : (
                      <div style={styles.imagePlaceholder}>
                        <Image style={styles.placeholderIcon} />
                        <span style={styles.placeholderText}>Image unavailable</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Article Header */}
                <div style={styles.cardHeader}>
                  <div style={styles.cardHeaderTop}>
                    <span style={styles.sourceTag}>
                      {article.source || 'Local News'}
                    </span>
                    {article.isLocal && (
                      <span style={styles.localTag}>🏠 Local</span>
                    )}
                  </div>
                  
                  <h2 style={styles.cardTitle}>
                    {article.title}
                  </h2>
                  
                  <p style={styles.cardContent}>
                    {truncateText(article.content, 150)}
                  </p>
                </div>

                {/* Article Footer */}
                <div style={styles.cardFooter}>
                  <div style={styles.metaInfo}>
                    <div style={styles.metaItem}>
                      <User style={styles.metaIcon} />
                      <span>{article.author}</span>
                    </div>
                    
                    <div style={styles.metaItem}>
                      <Tag style={styles.metaIcon} />
                      <span style={{textTransform: 'capitalize'}}>{article.category}</span>
                    </div>
                    
                    {article.location && (
                      <div style={styles.metaItem}>
                        <MapPin style={styles.metaIcon} />
                        <span>{article.location}</span>
                      </div>
                    )}
                    
                    <div style={styles.metaItem}>
                      <Clock style={styles.metaIcon} />
                      <span>{formatDate(article.publishedAt || article.createdAt)}</span>
                    </div>
                  </div>

                  <button 
                    style={styles.readButton}
                    onClick={() => openFullArticle(article)}
                  >
                    📖 Read Full Article
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={styles.pagination}>
            <div style={styles.paginationContent}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  ...styles.paginationButton,
                  ...(currentPage === 1 ? styles.paginationButtonDisabled : {})
                }}
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  style={{
                    ...styles.paginationButton,
                    ...(page === currentPage ? styles.paginationButtonActive : {})
                  }}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  ...styles.paginationButton,
                  ...(currentPage === totalPages ? styles.paginationButtonDisabled : {})
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Full Article Modal */}
      {selectedArticle && (
        <div style={styles.modalOverlay} onClick={closeFullArticle}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div style={styles.modalHeader}>
              <div style={styles.modalHeaderContent}>
                <div style={styles.modalHeaderTop}>
                  <span style={styles.sourceTag}>
                    {selectedArticle.source || 'Local News'}
                  </span>
                  {selectedArticle.isLocal && (
                    <span style={styles.localTag}>🏠 Local</span>
                  )}
                </div>
                <button style={styles.closeButton} onClick={closeFullArticle}>
                  <X style={styles.closeIcon} />
                </button>
              </div>
              
              <h1 style={styles.modalTitle}>{selectedArticle.title}</h1>
              
              <div style={styles.modalMeta}>
                <div style={styles.metaItem}>
                  <User style={styles.metaIcon} />
                  <span>{selectedArticle.author}</span>
                </div>
                
                <div style={styles.metaItem}>
                  <Tag style={styles.metaIcon} />
                  <span style={{textTransform: 'capitalize'}}>{selectedArticle.category}</span>
                </div>
                
                {selectedArticle.location && (
                  <div style={styles.metaItem}>
                    <MapPin style={styles.metaIcon} />
                    <span>{selectedArticle.location}</span>
                  </div>
                )}
                
                <div style={styles.metaItem}>
                  <Clock style={styles.metaIcon} />
                  <span>{formatDate(selectedArticle.publishedAt || selectedArticle.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Modal Image */}
            {selectedArticle.imageUrl && (
              <div style={styles.modalImageContainer}>
                {!imageErrors[selectedArticle._id] ? (
                  <img
                    src={selectedArticle.imageUrl}
                    alt={selectedArticle.title}
                    style={styles.modalImage}
                    onError={() => handleImageError(selectedArticle._id)}
                  />
                ) : (
                  <div style={styles.modalImagePlaceholder}>
                    <Image style={styles.placeholderIcon} />
                    <span style={styles.placeholderText}>Image unavailable</span>
                  </div>
                )}
              </div>
            )}

            {/* Modal Body */}
            <div style={styles.modalBody}>
              <div style={styles.modalText}>
                {selectedArticle.content.split('\n').map((paragraph, index) => (
                  <p key={index} style={styles.modalParagraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },
  
  // Loading and Error States
  loadingContainer: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingContent: {
    textAlign: 'center'
  },
  spinner: {
    width: '48px',
    height: '48px',
    border: '4px solid #e2e8f0',
    borderTop: '4px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 16px'
  },
  loadingText: {
    color: '#64748b',
    fontSize: '16px',
    margin: 0
  },
  errorContainer: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorContent: {
    textAlign: 'center'
  },
  errorIcon: {
    fontSize: '48px',
    marginBottom: '16px'
  },
  errorText: {
    color: '#64748b',
    fontSize: '16px',
    marginBottom: '16px'
  },
  retryButton: {
    padding: '8px 16px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s'
  },
  
  // Created By Deepak Kushwaha (IIT MANDI)
  
  // Header
  header: {
    backgroundColor: 'white',
    borderBottom: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    marginTop: '70px'
  },
  headerContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '24px 16px'
  },
  headerTop: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  badge: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  searchInput: {
    padding: '8px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    width: '300px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s'
  },
  
  // Stats Bar
  statsBar: {
    backgroundColor: 'white',
    borderBottom: '1px solid #e2e8f0'
  },
  statsContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#64748b'
  },
  statsLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  },
  stat: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  statsRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  
  // Main Content
  mainContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '32px 16px'
  },
  
  // Empty State
  emptyState: {
    textAlign: 'center',
    padding: '48px 0'
  },
  emptyIcon: {
    fontSize: '96px',
    color: '#d1d5db',
    marginBottom: '16px'
  },
  emptyTitle: {
    fontSize: '20px',
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: '8px'
  },
  emptyText: {
    color: '#64748b',
    fontSize: '16px'
  },
  
  // News Grid
  newsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '24px'
  },
  
  // News Cards
  newsCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s, transform 0.2s',
    overflow: 'hidden'
  },

  // Image Styles
  imageContainer: {
    width: '100%',
    height: '200px',
    overflow: 'hidden'
  },
  articleImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s'
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f1f5f9',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#64748b'
  },
  placeholderIcon: {
    width: '48px',
    height: '48px',
    marginBottom: '8px',
    color: '#94a3b8'
  },
  placeholderText: {
    fontSize: '14px',
    color: '#64748b'
  },

  cardHeader: {
    padding: '24px',
    borderBottom: '1px solid #f1f5f9'
  },
  cardHeaderTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px'
  },
  sourceTag: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 10px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: '500',
    backgroundColor: '#dcfce7',
    color: '#166534'
  },
  localTag: {
    fontSize: '12px',
    color: '#64748b'
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '12px',
    lineHeight: '1.4',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  cardContent: {
    fontSize: '14px',
    color: '#64748b',
    lineHeight: '1.5',
    marginBottom: '16px'
  },
  
  // Card Footer
  cardFooter: {
    padding: '24px'
  },
  metaInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '16px'
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#64748b'
  },
  metaIcon: {
    width: '16px',
    height: '16px'
  },
  readButton: {
    width: '100%',
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s'
  },
  
  // Pagination
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '48px'
  },
  paginationContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  paginationButton: {
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    backgroundColor: 'white',
    color: '#374151',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s, border-color 0.2s'
  },
  paginationButtonActive: {
    backgroundColor: '#3b82f6',
    color: 'white',
    borderColor: '#3b82f6'
  },
  paginationButtonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed'
  },

  // Modal Styles
 modalOverlay: {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '20px',
  paddingTop: '80px'  // Add this line - adjust the value based on your navbar height
},
modalContent: {
  backgroundColor: 'white',
  borderRadius: '12px',
  maxWidth: '900px',
  width: '100%',
  maxHeight: 'calc(90vh - 60px)',  // Modify this line to account for top padding
  overflow: 'auto',
  position: 'relative',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  marginTop: '0'  // Add this line to ensure no extra margin
},
  modalHeader: {
    padding: '32px 32px 24px',
    borderBottom: '1px solid #e2e8f0',
    position: 'sticky',
    top: 0,
    backgroundColor: 'white',
    zIndex: 1001
  },
  modalHeaderContent: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '16px'
  },
  modalHeaderTop: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s'
  },
  closeIcon: {
    width: '24px',
    height: '24px',
    color: '#64748b'
  },
  modalTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1f2937',
    lineHeight: '1.3',
    marginBottom: '16px',
    margin: 0
  },
  modalMeta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px'
  },
  modalImageContainer: {
    width: '100%',
    height: '400px',
    overflow: 'hidden'
  },
  modalImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  modalImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f1f5f9',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#64748b'
  },
  modalBody: {
    padding: '32px'
  },
  modalText: {
    fontSize: '16px',
    lineHeight: '1.7',
    color: '#374151'
  },
  modalParagraph: {
    marginBottom: '16px',
    margin: '0 0 16px 0'
  },

  

  
};

// Add keyframes for spinner animation and hover effects
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @media (min-width: 768px) {
    .header-top {
      flex-direction: row !important;
      align-items: center !important;
      justify-content: space-between !important;
    }
  }
  
  /* Hover effects */
  .news-card:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
    transform: translateY(-2px) !important;
  }
  
  .news-card:hover .article-image {
    transform: scale(1.05) !important;
  }
  
  .read-button:hover {
    background-color: #2563eb !important;
  }
  
  .pagination-button:hover:not(:disabled) {
    background-color: #f9fafb !important;
  }
  
  .search-input:focus {
    border-color: #3b82f6 !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
  }
  
  .retry-button:hover {
    background-color: #2563eb !important;
  }
  
  .close-button:hover {
    background-color: #f1f5f9 !important;
  }
    
`;
document.head.appendChild(styleSheet);

export default LocalNews;