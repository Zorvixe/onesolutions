// pages/admin/FeedbackManagement.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Filter,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Calendar,
  User,
  TrendingUp,
  BarChart3,
  Download,
  RefreshCw,
  Eye,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import "./FeedbackManagement.css";

const API_BASE = process.env.REACT_APP_API_APP_URL;

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    subtopicId: "",
    moduleName: "",
    rating: "",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 1,
  });

  const fetchFeedbacks = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`https://api.onesolutionsekam.in/api/admin/feedback`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page,
          limit: pagination.limit,
          search: searchTerm,
          subtopicId: filters.subtopicId || undefined,
          moduleName: filters.moduleName || undefined,
          rating: filters.rating || undefined,
        },
      });

      setFeedbacks(response.data.data.feedbacks);
      setPagination(response.data.data.pagination);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`https://api.onesolutionsekam.in/api/admin/feedback/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(response.data.data.stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
    fetchStats();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFeedbacks(1);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      fetchFeedbacks(newPage);
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return "feedb-rating-high";
    if (rating >= 3) return "feedb-rating-medium";
    return "feedb-rating-low";
  };

  const getRatingBgColor = (rating) => {
    if (rating >= 4) return "feedb-rating-bg-high";
    if (rating >= 3) return "feedb-rating-bg-medium";
    return "feedb-rating-bg-low";
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={`feedb-star ${
          i < rating ? "feedb-star-filled" : "feedb-star-empty"
        }`}
      />
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="feedb-container">
      {/* Header */}
      <div className="feedb-header">
        <div className="feedb-header-content">
          <div>
            <h1 className="feedb-title">Feedback Management</h1>
            <p className="feedb-subtitle">
              View and analyze student feedback for classes
            </p>
          </div>
          <div className="feedb-header-actions">
            <button
              onClick={() => {
                fetchFeedbacks();
                fetchStats();
              }}
              className="feedb-btn feedb-btn-secondary"
            >
              <RefreshCw size={18} />
              <span>Refresh</span>
            </button>
            <button className="feedb-btn feedb-btn-primary">
              <Download size={18} />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="feedb-stats-grid">
          <div className="feedb-stat-card">
            <div className="feedb-stat-content">
              <div>
                <p className="feedb-stat-label">Total Feedbacks</p>
                <p className="feedb-stat-value">
                  {stats[0]?.total_feedbacks || 0}
                </p>
              </div>
              <div className="feedb-stat-icon feedb-stat-icon-blue">
                <MessageSquare size={24} />
              </div>
            </div>
          </div>

          <div className="feedb-stat-card">
            <div className="feedb-stat-content">
              <div>
                <p className="feedb-stat-label">Avg. Understanding</p>
                <p className="feedb-stat-value">
                  {stats[0]?.avg_understanding || 0}/5
                </p>
              </div>
              <div className="feedb-stat-icon feedb-stat-icon-green">
                <TrendingUp size={24} />
              </div>
            </div>
          </div>

          <div className="feedb-stat-card">
            <div className="feedb-stat-content">
              <div>
                <p className="feedb-stat-label">Avg. Instructor Rating</p>
                <p className="feedb-stat-value">
                  {stats[0]?.avg_instructor || 0}/5
                </p>
              </div>
              <div className="feedb-stat-icon feedb-stat-icon-purple">
                <User size={24} />
              </div>
            </div>
          </div>

          <div className="feedb-stat-card">
            <div className="feedb-stat-content">
              <div>
                <p className="feedb-stat-label">Avg. Pace Rating</p>
                <p className="feedb-stat-value">
                  {stats[0]?.avg_pace || 0}/5
                </p>
              </div>
              <div className="feedb-stat-icon feedb-stat-icon-yellow">
                <BarChart3 size={24} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="feedb-filters-card">
        <div className="feedb-filters-content">
          <form onSubmit={handleSearch} className="feedb-search-form">
            <div className="feedb-search-container">
              <Search className="feedb-search-icon" size={20} />
              <input
                type="text"
                placeholder="Search feedback by student, subtopic, or content..."
                className="feedb-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>

          <div className="feedb-filters-grid">
            <div>
              <label className="feedb-filter-label">Subtopic ID</label>
              <input
                type="text"
                placeholder="Enter subtopic ID"
                className="feedb-filter-input"
                value={filters.subtopicId}
                onChange={(e) =>
                  handleFilterChange("subtopicId", e.target.value)
                }
              />
            </div>

            <div>
              <label className="feedb-filter-label">Module Name</label>
              <input
                type="text"
                placeholder="Enter module name"
                className="feedb-filter-input"
                value={filters.moduleName}
                onChange={(e) =>
                  handleFilterChange("moduleName", e.target.value)
                }
              />
            </div>

            <div>
              <label className="feedb-filter-label">Minimum Rating</label>
              <select
                className="feedb-filter-select"
                value={filters.rating}
                onChange={(e) => handleFilterChange("rating", e.target.value)}
              >
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
                <option value="1">1+ Stars</option>
              </select>
            </div>
          </div>

          <div className="feedb-filters-actions">
            <button
              onClick={() => fetchFeedbacks(1)}
              className="feedb-btn feedb-btn-primary feedb-btn-apply"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="feedb-table-container">
        {loading ? (
          <div className="feedb-loading">
            <div className="feedb-spinner"></div>
          </div>
        ) : feedbacks.length === 0 ? (
          <div className="feedb-empty">
            <MessageSquare size={48} className="feedb-empty-icon" />
            <h3 className="feedb-empty-title">No feedback found</h3>
            <p className="feedb-empty-text">
              No feedback matches your search criteria.
            </p>
          </div>
        ) : (
          <div className="feedb-table-wrapper">
            <table className="feedb-table">
              <thead className="feedb-table-head">
                <tr>
                  <th>Student & Class</th>
                  <th>Ratings</th>
                  <th>Feedback</th>
                  <th>Submitted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="feedb-table-body">
                {feedbacks.map((feedback) => (
                  <tr key={feedback.id} className="feedb-table-row">
                    <td>
                      <div className="feedb-student-info">
                        <div className="feedb-avatar">
                          <span className="feedb-avatar-text">
                            {feedback.first_name?.[0] || "S"}
                          </span>
                        </div>
                        <div className="feedb-student-details">
                          <p className="feedb-student-name">
                            {feedback.first_name} {feedback.last_name}
                          </p>
                          <p className="feedb-batch-info">
                            {feedback.batch_month} {feedback.batch_year}
                          </p>
                          <div className="feedb-class-info">
                            <p className="feedb-module-name">
                              {feedback.module_name || "No module"}
                            </p>
                            <p className="feedb-subtopic">
                              Subtopic: {feedback.subtopic_id}
                            </p>
                            {feedback.topic_name && (
                              <p className="feedb-topic">
                                Topic: {feedback.topic_name}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="feedb-ratings">
                        <div className="feedb-rating-item">
                          <span className="feedb-rating-label">Understanding:</span>
                          <div className="feedb-rating-display">
                            {renderStars(feedback.rating_understanding)}
                            <span
                              className={`feedb-rating-badge ${getRatingColor(
                                feedback.rating_understanding
                              )} ${getRatingBgColor(
                                feedback.rating_understanding
                              )}`}
                            >
                              {feedback.rating_understanding}/5
                            </span>
                          </div>
                        </div>
                        <div className="feedb-rating-item">
                          <span className="feedb-rating-label">Instructor:</span>
                          <div className="feedb-rating-display">
                            {renderStars(feedback.rating_instructor)}
                            <span
                              className={`feedb-rating-badge ${getRatingColor(
                                feedback.rating_instructor
                              )} ${getRatingBgColor(
                                feedback.rating_instructor
                              )}`}
                            >
                              {feedback.rating_instructor}/5
                            </span>
                          </div>
                        </div>
                        <div className="feedb-rating-item">
                          <span className="feedb-rating-label">Pace:</span>
                          <div className="feedb-rating-display">
                            {renderStars(feedback.rating_pace)}
                            <span
                              className={`feedb-rating-badge ${getRatingColor(
                                feedback.rating_pace
                              )} ${getRatingBgColor(
                                feedback.rating_pace
                              )}`}
                            >
                              {feedback.rating_pace}/5
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="feedb-feedback-text">
                        {feedback.feedback_text ? (
                          <p className="feedb-text-content">
                            {feedback.feedback_text}
                          </p>
                        ) : (
                          <p className="feedb-no-feedback">
                            No written feedback
                          </p>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="feedb-date-display">
                        <div className="feedb-date">
                          {formatDate(feedback.submitted_at)}
                        </div>
                        <div className="feedb-time">
                          {new Date(feedback.submitted_at).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          alert(
                            feedback.feedback_text || "No written feedback"
                          );
                        }}
                        className="feedb-btn feedb-btn-view"
                      >
                        <Eye size={14} />
                        <span>View Details</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && feedbacks.length > 0 && (
          <div className="feedb-pagination">
            <div className="feedb-pagination-info">
              Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
              {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
              of {pagination.total} feedbacks
            </div>
            <div className="feedb-pagination-controls">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="feedb-pagination-btn feedb-pagination-prev"
              >
                Previous
              </button>
              {Array.from(
                { length: Math.min(5, pagination.pages) },
                (_, i) => {
                  let pageNum;
                  if (pagination.pages <= 5) {
                    pageNum = i + 1;
                  } else if (pagination.page <= 3) {
                    pageNum = i + 1;
                  } else if (pagination.page >= pagination.pages - 2) {
                    pageNum = pagination.pages - 4 + i;
                  } else {
                    pageNum = pagination.page - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`feedb-pagination-btn feedb-pagination-number ${
                        pagination.page === pageNum
                          ? "feedb-pagination-active"
                          : ""
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
              )}
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
                className="feedb-pagination-btn feedb-pagination-next"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackManagement;