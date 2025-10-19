import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './index.css';
import { useNavigate } from 'react-router-dom';

const Contacters = () => {
  const [submissions, setSubmissions] = useState([]);
  const [paymentCount, setPaymentCount] = useState(0); // New state for payment count
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Contact Submissions | Zorvixe Admin";
    fetchSubmissions();
    fetchPaymentCount(); // Fetch payment count

  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://zorvixelocalbackend.onrender.com/api/contacts');

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch submissions');
      }

      const data = await response.json();
      setSubmissions(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // NEW FUNCTION: Fetch total payment count
  const fetchPaymentCount = async () => {
    try {
      const response = await fetch(
        'https://zorvixelocalbackend.onrender.com/api/admin/payments?page=1&limit=1'
      );

      if (response.ok) {
        const data = await response.json();
        setPaymentCount(data.pagination.total);
      }
    } catch (error) {
      console.error('Error fetching payment count:', error);
    }
  };

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch =
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.phone.includes(searchTerm) ||
      submission.subject.toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === 'today') {
      const today = new Date().toLocaleDateString();
      return matchesSearch && new Date(submission.created_at).toLocaleDateString() === today;
    }

    if (filter === 'contacted') {
      return matchesSearch && submission.contacted;
    }

    if (filter === 'pending') {
      return matchesSearch && !submission.contacted;
    }

    return matchesSearch;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSubmissions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);

  const markAsContacted = async (id) => {
    try {
      setSubmissions(prev => prev.map(sub =>
        sub.id === id ? { ...sub, contacted: true } : sub
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const openModal = (submission) => {
    setSelectedSubmission(submission);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSubmission(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h3>Unable to Load Data</h3>
        <p>{error}</p>
        <button onClick={fetchSubmissions} className="retry-btn">
          <span>🔄</span> Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="contact-submissions-admin">
      <Helmet>
        <title>Contact Submissions | Zorvixe Admin</title>
      </Helmet>
      {/* Stats Dashboard */}
      <div className="stats-dashboard">
        <div className="stat-card total">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Total Submissions</h3>
            <p className="stat-number">{submissions.length}</p>
          </div>
        </div>
        <div className="stat-card today">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>Today's Submissions</h3>
            <p className="stat-number">
              {submissions.filter(s =>
                new Date(s.created_at).toLocaleDateString() === new Date().toLocaleDateString()
              ).length}
            </p>
          </div>
        </div>
        <div className="stat-card pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>Pending Contact</h3>
            <p className="stat-number">{submissions.filter(s => !s.contacted).length}</p>
          </div>
        </div>
        <div className="stat-card contacted">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Contacted</h3>
            <p className="stat-number">{submissions.filter(s => s.contacted).length}</p>
          </div>
        </div>
        <div className="stat-card paymenst" onClick={() => navigate('/zorvixe/payments')}>
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Payments</h3>
            <p className="stat-number">{paymentCount}</p> {/* Display payment count here */}
          </div>
        </div>

      </div>

      {/* Controls Section */}
      <div className="controls-section">
        <div className="search-container">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by name, email, phone, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        <div className="filter-container">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Submissions</option>
            <option value="today">Today</option>
            <option value="contacted">Contacted</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Submissions Grid */}
      <div className="submissions-grid">
        {currentItems.length > 0 ? (
          currentItems.map((submission, index) => (
            <div
              key={submission.id}
              className={`submission-card ${submission.contacted ? 'contacted' : 'pending'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-header">
                <div className="contact-info">
                  <h3 className="contact-name">{submission.name}</h3>
                  <p className="contact-date">{formatDate(submission.created_at)}</p>
                </div>
                <div className={`status-badge ${submission.contacted ? 'contacted' : 'pending'}`}>
                  {submission.contacted ? '✅ Contacted' : '⏳ Pending'}
                </div>
              </div>

              <div className="card-body">
                <div className="contact-details">
                  <div className="detail-item">
                    <span className="detail-icon">📧</span>
                    <a href={`mailto:${submission.email}`} className="detail-link">
                      {submission.email}
                    </a>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">📞</span>
                    <a href={`tel:${submission.phone}`} className="detail-link">
                      {submission.phone}
                    </a>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">🏷️</span>
                    <span className="detail-text">{submission.subject}</span>
                  </div>
                </div>

                <div className="message-preview">
                  <p>{submission.message.length > 100 ?
                    `${submission.message.substring(0, 100)}...` :
                    submission.message
                  }</p>
                </div>
              </div>

              <div className="card-actions">
                <button
                  onClick={() => openModal(submission)}
                  className="action-btn view-btn"
                >
                  <span className="btn-icon">👁️</span>
                  View Details
                </button>
                {!submission.contacted && (
                  <button
                    onClick={() => markAsContacted(submission.id)}
                    className="action-btn contact-btn"
                  >
                    <span className="btn-icon">✅</span>
                    Mark Contacted
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <div className="no-results-icon">📭</div>
            <h3>No submissions found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            ← Previous
          </button>

          <div className="pagination-info">
            <span>Page {currentPage} of {totalPages}</span>
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next →
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && selectedSubmission && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Contact Details</h2>
              <button onClick={closeModal} className="close-btn">×</button>
            </div>
            <div className="modal-body">
              <div className="modal-section">
                <h3>Contact Information</h3>
                <div className="modal-details">
                  <p><strong>Name:</strong> {selectedSubmission.name}</p>
                  <p><strong>Email:</strong>
                    <a href={`mailto:${selectedSubmission.email}`} className="modal-link">
                      {selectedSubmission.email}
                    </a>
                  </p>
                  <p><strong>Phone:</strong>
                    <a href={`tel:${selectedSubmission.phone}`} className="modal-link">
                      {selectedSubmission.phone}
                    </a>
                  </p>
                  <p><strong>Subject:</strong> {selectedSubmission.subject}</p>
                  <p><strong>Date:</strong> {formatDate(selectedSubmission.created_at)}</p>
                </div>
              </div>
              <div className="modal-section">
                <h3>Message</h3>
                <div className="message-full">
                  {selectedSubmission.message}
                </div>
              </div>
            </div>
            <div className="modal-actions">
              {!selectedSubmission.contacted && (
                <button
                  onClick={() => {
                    markAsContacted(selectedSubmission.id);
                    closeModal();
                  }}
                  className="modal-btn primary"
                >
                  Mark as Contacted
                </button>
              )}
              <button onClick={closeModal} className="modal-btn secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacters;
