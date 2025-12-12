import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SavedSnippets.css";

const API_URL = process.env.REACT_APP_API_BASE_URL;

export default function SavedSnippets() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all, published, draft
  const [languageFilter, setLanguageFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [snippetsPerPage] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMySnippets();
  }, []);

  const fetchMySnippets = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_URL}/api/code-snippets/my-snippets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.success) {
        setSnippets(result.data.snippets || []);
      } else {
        setError(result.message || "Failed to fetch snippets");
      }
    } catch (error) {
      console.error("Fetch snippets error:", error);
      setError("Failed to load snippets. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSnippet = async (snippetId, snippetName) => {
    if (!window.confirm(`Are you sure you want to delete "${snippetName}"?`)) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/code-snippets/${snippetId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("Snippet deleted successfully!");
        fetchMySnippets(); // Refresh the list
        // Reset to page 1 if current page becomes empty
        const filtered = getFilteredSnippets();
        const totalPages = Math.ceil(filtered.length / snippetsPerPage);
        if (currentPage > totalPages && totalPages > 0) {
          setCurrentPage(totalPages);
        } else if (totalPages === 0) {
          setCurrentPage(1);
        }
      } else {
        alert(`Failed to delete: ${result.message}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete snippet");
    }
  };

  const handlePublishToggle = async (snippetId, currentStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/code-snippets/${snippetId}/publish`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ publish: !currentStatus }),
        }
      );

      const result = await response.json();

      if (result.success) {
        fetchMySnippets(); // Refresh the list
      } else {
        alert(`Failed to update: ${result.message}`);
      }
    } catch (error) {
      console.error("Publish toggle error:", error);
      alert("Failed to update snippet");
    }
  };

  const handleLoadSnippet = (snippet) => {
    // Navigate to CodePlayground with snippet data
    navigate("/codeGround", {
      state: {
        loadSnippet: true,
        snippetData: {
          id: snippet.id,
          name: snippet.snippet_name,
          language: snippet.language,
          html: snippet.html_code,
          css: snippet.css_code,
          javascript: snippet.javascript_code,
          python: snippet.python_code,
          java: snippet.java_code,
          sql: snippet.sql_code,
        },
      },
    });
  };

  const getLanguageIcon = (lang) => {
    const icons = {
      html: (
        <img src="/assets/html5_logo.png" alt="HTML5" width="24" height="24" />
      ),
      css: (
        <img src="/assets/css3_logo.png" alt="CSS3" width="24" height="24" />
      ),
      javascript: (
        <img
          src="/assets/javascript_logo.png"
          alt="JavaScript"
          width="24"
          height="24"
        />
      ),
      javascript_standalone: (
        <img
          src="/assets/javascript_logo.png"
          alt="JavaScript"
          width="24"
          height="24"
        />
      ),
      python: (
        <img
          src="/assets/python_logo.png"
          alt="Python"
          width="24"
          height="24"
        />
      ),
      java: (
        <img src="/assets/java_logo.png" alt="Java" width="24" height="24" />
      ),
      sql: <img src="/assets/sql_logo.png" alt="SQL" width="44" height="24" />,
    };
    return icons[lang] || "🕸️";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getFilteredSnippets = () => {
    return snippets.filter((snippet) => {
      // Filter by publish status
      if (filter === "published" && !snippet.is_published) return false;
      if (filter === "draft" && snippet.is_published) return false;

      // Filter by language
      if (languageFilter !== "all" && snippet.language !== languageFilter)
        return false;

      return true;
    });
  };

  // Calculate pagination
  const filteredSnippets = getFilteredSnippets();
  const indexOfLastSnippet = currentPage * snippetsPerPage;
  const indexOfFirstSnippet = indexOfLastSnippet - snippetsPerPage;
  const currentSnippets = filteredSnippets.slice(
    indexOfFirstSnippet,
    indexOfLastSnippet
  );
  const totalPages = Math.ceil(filteredSnippets.length / snippetsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, languageFilter]);

  if (loading) {
    return (
      <div className="snippets-loading-container">
        <div className="loading-spinner"></div>
        <p>Loading snippets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="snippets-error-container">
        <div className="error-icon">⚠️</div>
        <h3>Error Loading Snippets</h3>
        <p>{error}</p>
        <button className="btn-retry" onClick={fetchMySnippets}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="saved-snippets-container">
      <div className="filters-container">
        <div className="filter-group">
          <label>Status:</label>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`filter-btn ${filter === "draft" ? "active" : ""}`}
              onClick={() => setFilter("draft")}
            >
              Draft
            </button>
          </div>
        </div>

        <div className="filter-group">
          <label>Language:</label>
          <select
            className="language-filter"
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
          >
            <option value="all">All Languages</option>
            <option value="web">Web</option>
            <option value="javascript_standalone">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="sql">SQL</option>
          </select>
        </div>
        <button
          className="btn-new-snippet"
          onClick={() => navigate("/codeGround")}
        >
          <span>+</span> New Snippet
        </button>
      </div>

      {currentSnippets.length === 0 ? (
        <div className="empty-snippets-state">
          <div className="empty-icon">📁</div>
          <h3>No snippets found</h3>
          <p>
            {filter !== "all" || languageFilter !== "all"
              ? "Try changing your filters"
              : "Save your first code snippet to see it here!"}
          </p>
          <button
            className="btn-create-snippet"
            onClick={() => navigate("/codeGround")}
          >
            Create Your First Snippet
          </button>
        </div>
      ) : (
        <>
          <div className="snippets-grid">
            {currentSnippets.map((snippet) => (
              <div key={snippet.id} className="snippet-card">
                <div className="snippet-card-header">
                  <div className="snippet-language-badge">
                    <span className="language-icon">
                      {getLanguageIcon(snippet.language)}
                    </span>
                    <span className="language-name">
                      {snippet.language === "javascript_standalone"
                        ? "JavaScript"
                        : snippet.language.toUpperCase()}
                    </span>
                  </div>
                  <div className="snippet-status">
                    <span className="status-draft">
                      <span className="status-dot"></span>
                      Draft
                    </span>
                  </div>
                </div>

                <div className="snippet-card-body">
                  <h3 className="snippet-title">{snippet.snippet_name}</h3>

                  {snippet.description && (
                    <p className="snippet-description">
                      {snippet.description.length > 100
                        ? `${snippet.description.substring(0, 100)}...`
                        : snippet.description}
                    </p>
                  )}

                  <div className="snippet-meta">
                    <div className="meta-item">
                      <span className="meta-label">Created:</span>
                      <span className="meta-value">
                        {formatDate(snippet.created_at)}
                      </span>
                    </div>

                    <div className="meta-item">
                      <span className="meta-label">Updated:</span>
                      <span className="meta-value">
                        {formatDate(snippet.updated_at)}
                      </span>
                    </div>

                    {snippet.tags && snippet.tags.length > 0 && (
                      <div className="snippet-tags">
                        {snippet.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="tag">
                            {tag}
                          </span>
                        ))}
                        {snippet.tags.length > 3 && (
                          <span className="tag-more">
                            +{snippet.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="snippet-card-actions">
                  <button
                    className="btn-action btn-load"
                    onClick={() => handleLoadSnippet(snippet)}
                    title="Load in Code Playground"
                  >
                    <span className="action-icon"></span>
                    Open
                  </button>

                  <button
                    className="btn-action btn-delete"
                    onClick={() =>
                      handleDeleteSnippet(snippet.id, snippet.snippet_name)
                    }
                    title="Delete snippet"
                  >
                    <span className="action-icon"></span>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination-container">
              <div className="pagination-info">
                Showing {indexOfFirstSnippet + 1} to{" "}
                {Math.min(indexOfLastSnippet, filteredSnippets.length)} of{" "}
                {filteredSnippets.length} snippets
              </div>
              <div className="pagination-controls">
                <button
                  className="pagination-btn prev-btn"
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                <div className="page-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (number) => (
                      <button
                        key={number}
                        className={`page-number ${
                          currentPage === number ? "active" : ""
                        }`}
                        onClick={() => paginate(number)}
                      >
                        {number}
                      </button>
                    )
                  )}
                </div>

                <button
                  className="pagination-btn next-btn"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <div className="snippets-footer">
        <p className="footer-note">
          💡 Tip: You can also access your snippets from the Code Playground
        </p>
      </div>
    </div>
  );
}
