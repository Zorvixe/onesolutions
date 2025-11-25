import React, { useState, useEffect, useCallback } from "react";
import "./AdminFeedbackPanel.css";

const AdminFeedbackPanel = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    subtopicId: "",
    moduleName: "",
    rating: "",
  });
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadFeedbacks();
    loadStats();
  }, [filters]);

  const loadFeedbacks = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(filters);
      const response = await fetch(
        `https://api.onesolutionsekam.in/api/admin/feedback?${queryParams}`,
        {
          headers: {
            "x-admin-token": localStorage.getItem("adminToken"),
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFeedbacks(data.data.feedbacks);
      }
    } catch (error) {
      console.error("Error loading feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch(
        "https://api.onesolutionsekam.in/api/admin/feedback/stats",
        {
          headers: {
            "x-admin-token": localStorage.getItem("adminToken"),
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setStats(data.data.stats);
      }
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const renderRatingStars = (rating) => {
    return (
      <div className="feed-star-rating">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`feed-star ${
              index < rating ? "feed-filled" : "feed-empty"
            }`}
          >
            {index < rating ? "★" : "☆"}
          </span>
        ))}
      </div>
    );
  };

  const filteredFeedbacks = useCallback(() => {
    let filtered = feedbacks;

    // Filter by active tab
    if (activeTab !== "all") {
      filtered = filtered.filter((feedback) => {
        if (activeTab === "positive") return feedback.rating_understanding >= 4;
        if (activeTab === "negative") return feedback.rating_understanding <= 2;
        if (activeTab === "withComments")
          return feedback.feedback_text && feedback.feedback_text.trim() !== "";
        return true;
      });
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (feedback) =>
          feedback.first_name.toLowerCase().includes(query) ||
          feedback.last_name.toLowerCase().includes(query) ||
          feedback.email.toLowerCase().includes(query) ||
          feedback.module_name.toLowerCase().includes(query) ||
          (feedback.feedback_text &&
            feedback.feedback_text.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [feedbacks, activeTab, searchQuery]);

  const clearFilters = () => {
    setFilters({
      page: 1,
      limit: 20,
      subtopicId: "",
      moduleName: "",
      rating: "",
    });
    setActiveTab("all");
    setSearchQuery("");
  };

  if (loading && feedbacks.length === 0) {
    return (
      <div className="feed-admin-panel">
        <div className="feed-loading-container">
          <div className="feed-loading-spinner"></div>
          <p>Loading feedback data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="feed-admin-panel">
      <div className="feed-panel-header">
        <div className="feed-header-content">
          <h1>Student Feedback Dashboard</h1>
          <p>Monitor and analyze student feedback across all courses</p>
        </div>
        <div className="feed-header-actions">
          <button className="feed-refresh-btn" onClick={loadFeedbacks}>
            <span className="feed-refresh-icon">↻</span>
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Section */}
      {stats && (
        <div className="feed-stats-section">
          <div className="feed-stats-header">
            <h2>Performance Overview</h2>
            <div className="feed-stats-period">Last 30 days</div>
          </div>
          <div className="feed-stats-grid">
            <div className="feed-stat-card feed-primary">
              <div className="feed-stat-icon">📊</div>
              <div className="feed-stat-content">
                <div className="feed-stat-value">{stats.total_feedbacks}</div>
                <div className="feed-stat-label">Total Feedbacks</div>
              </div>
            </div>
            <div className="feed-stat-card">
              <div className="feed-stat-icon">🧠</div>
              <div className="feed-stat-content">
                <div className="feed-stat-value">
                  {stats.avg_understanding}/5
                </div>
                <div className="feed-stat-label">Understanding</div>
                <div className="feed-rating-display">
                  {renderRatingStars(Math.round(stats.avg_understanding))}
                </div>
              </div>
            </div>
            <div className="feed-stat-card">
              <div className="feed-stat-icon">👨‍🏫</div>
              <div className="feed-stat-content">
                <div className="feed-stat-value">{stats.avg_instructor}/5</div>
                <div className="feed-stat-label">Instructor</div>
                <div className="feed-rating-display">
                  {renderRatingStars(Math.round(stats.avg_instructor))}
                </div>
              </div>
            </div>
            <div className="feed-stat-card">
              <div className="feed-stat-icon">⏱️</div>
              <div className="feed-stat-content">
                <div className="feed-stat-value">{stats.avg_pace}/5</div>
                <div className="feed-stat-label">Pace</div>
                <div className="feed-rating-display">
                  {renderRatingStars(Math.round(stats.avg_pace))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Controls Section */}
      <div className="feed-controls-section">
        <div className="feed-search-container">
          <div className="feed-search-input-wrapper">
            <span className="feed-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by name, email, module, or comment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="feed-search-input"
            />
            {searchQuery && (
              <button
                className="feed-clear-search"
                onClick={() => setSearchQuery("")}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="feed-filter-controls">
          <div className="feed-filter-tabs">
            <button
              className={`feed-tab-btn ${
                activeTab === "all" ? "feed-active" : ""
              }`}
              onClick={() => setActiveTab("all")}
            >
              All Feedbacks
            </button>
            <button
              className={`feed-tab-btn ${
                activeTab === "positive" ? "feed-active" : ""
              }`}
              onClick={() => setActiveTab("positive")}
            >
              Positive (4+ Stars)
            </button>
            <button
              className={`feed-tab-btn ${
                activeTab === "negative" ? "feed-active" : ""
              }`}
              onClick={() => setActiveTab("negative")}
            >
              Needs Attention (≤2 Stars)
            </button>
            <button
              className={`feed-tab-btn ${
                activeTab === "withComments" ? "feed-active" : ""
              }`}
              onClick={() => setActiveTab("withComments")}
            >
              With Comments
            </button>
          </div>

          <div className="feed-filter-actions">
            <div className="feed-filter-inputs">
              <select
                value={filters.rating}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, rating: e.target.value }))
                }
                className="feed-filter-select"
              >
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>

              <input
                type="text"
                placeholder="Module"
                value={filters.moduleName}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    moduleName: e.target.value,
                  }))
                }
                className="feed-filter-input"
              />

              <input
                type="text"
                placeholder="Subtopic ID"
                value={filters.subtopicId}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    subtopicId: e.target.value,
                  }))
                }
                className="feed-filter-input"
              />
            </div>

            <button className="feed-clear-filters" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="feed-feedbacks-section">
        <div className="feed-section-header">
          <h3>
            Student Feedbacks
            <span className="feed-feedback-count">
              ({filteredFeedbacks().length}{" "}
              {filteredFeedbacks().length === 1 ? "result" : "results"})
            </span>
          </h3>
          <div className="feed-view-options">
            <span>View:</span>
            <button className="feed-view-option feed-active">Detailed</button>
            <button className="feed-view-option">Compact</button>
          </div>
        </div>

        {filteredFeedbacks().length === 0 ? (
          <div className="feed-empty-state">
            <div className="feed-empty-icon">📝</div>
            <h4>No feedbacks found</h4>
            <p>Try adjusting your filters or search terms</p>
            <button className="feed-reset-btn" onClick={clearFilters}>
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="feed-feedbacks-grid">
            {filteredFeedbacks().map((feedback) => (
              <div key={feedback.id} className="feed-feedback-card">
                <div className="feed-card-header">
                  <div className="feed-student-avatar">
                    {feedback.first_name.charAt(0)}
                    {feedback.last_name.charAt(0)}
                  </div>
                  <div className="feed-student-info">
                    <h4>
                      {feedback.first_name} {feedback.last_name}
                    </h4>
                    <p>{feedback.email}</p>
                    <div className="feed-batch-info">
                      Batch: {feedback.batch_month} {feedback.batch_year}
                    </div>
                  </div>
                  <div className="feed-feedback-meta">
                    <div className="feed-module-tag">
                      {feedback.module_name}
                    </div>
                    <div className="feed-date">
                      {new Date(feedback.submitted_at).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </div>
                  </div>
                </div>

                <div className="feed-ratings-section">
                  <div className="feed-rating-item">
                    <span className="feed-rating-label">Understanding</span>
                    <div className="feed-rating-value">
                      {renderRatingStars(feedback.rating_understanding)}
                      <span className="feed-rating-number">
                        {feedback.rating_understanding}/5
                      </span>
                    </div>
                  </div>
                  <div className="feed-rating-item">
                    <span className="feed-rating-label">Instructor</span>
                    <div className="feed-rating-value">
                      {renderRatingStars(feedback.rating_instructor)}
                      <span className="feed-rating-number">
                        {feedback.rating_instructor}/5
                      </span>
                    </div>
                  </div>
                  <div className="feed-rating-item">
                    <span className="feed-rating-label">Pace</span>
                    <div className="feed-rating-value">
                      {renderRatingStars(feedback.rating_pace)}
                      <span className="feed-rating-number">
                        {feedback.rating_pace}/5
                      </span>
                    </div>
                  </div>
                </div>

                {feedback.feedback_text && (
                  <div className="feed-comments-section">
                    <div className="feed-comments-header">
                      <span className="feed-comments-icon">💬</span>
                      <span>Student Comments</span>
                    </div>
                    <p className="feed-comment-text">
                      {feedback.feedback_text}
                    </p>
                  </div>
                )}

                <div className="feed-card-actions">
                  <button className="feed-action-btn">Reply</button>
                  <button className="feed-action-btn">Flag</button>
                  <button className="feed-action-btn">Export</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredFeedbacks().length > 0 && (
        <div className="feed-pagination-section">
          <div className="feed-pagination-info">
            Showing {filteredFeedbacks().length} of {feedbacks.length} feedbacks
          </div>
          <div className="feed-pagination-controls">
            <button
              className="feed-pagination-btn"
              disabled={filters.page === 1}
            >
              Previous
            </button>
            <div className="feed-page-numbers">
              <span className="feed-current-page">{filters.page}</span>
              <span className="feed-total-pages">
                of {Math.ceil(feedbacks.length / filters.limit)}
              </span>
            </div>
            <button
              className="feed-pagination-btn"
              disabled={
                filters.page >= Math.ceil(feedbacks.length / filters.limit)
              }
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFeedbackPanel;
